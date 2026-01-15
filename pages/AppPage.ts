import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * AppPage - Módulo App
 */
export class AppPage extends BasePage {
  private readonly appModule: Locator;
  private readonly direccionesReportadasLink: Locator;
  private readonly versionesAppLink: Locator;
  private readonly chatCentralLink: Locator;
  private readonly fechaInicialInput: Locator;
  private readonly fechaFinalInput: Locator;
  private readonly buscarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.appModule = this.sideNav.getByText('App', { exact: true });
    this.direccionesReportadasLink = this.sideNav.getByRole('link', { name: 'Direcciones reportadas', exact: true });
    this.versionesAppLink = this.sideNav.getByRole('link', { name: 'Versiones app', exact: true });
    this.chatCentralLink = this.sideNav.getByRole('link', { name: /Chat central/i });
    this.fechaInicialInput = page.getByPlaceholder('Fecha inicial');
    this.fechaFinalInput = page.getByPlaceholder('Fecha final');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
  }

  private async ensureAppMenuExpanded(): Promise<void> {
    await expect(this.appModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.appModule.scrollIntoViewIfNeeded();

    const isExpanded = await this.direccionesReportadasLink.isVisible().catch(() => false);
    if (!isExpanded) {
      await this.clickElement(this.appModule);
    }

    await expect(this.direccionesReportadasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  private async resolveSelectByOptionLabel(label: string): Promise<Locator | null> {
    const selectByText = this.page.locator('select').filter({ hasText: new RegExp(label, 'i') }).first();
    if (await selectByText.count() > 0 && await selectByText.isVisible().catch(() => false)) {
      return selectByText;
    }

    const combobox = this.page.getByRole('combobox', { name: new RegExp(label, 'i') }).first();
    if (await combobox.count() > 0 && await combobox.isVisible().catch(() => false)) {
      return combobox;
    }

    return null;
  }

  async navigateToApp(): Promise<void> {
    await this.ensureAppMenuExpanded();
  }

  async navigateToDireccionesReportadas(): Promise<void> {
    await this.ensureAppMenuExpanded();
    await this.clickElement(this.direccionesReportadasLink);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToVersionesApp(): Promise<void> {
    await this.ensureAppMenuExpanded();
    await this.clickElement(this.versionesAppLink);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToChatCentral(): Promise<void> {
    await this.ensureAppMenuExpanded();
    if (await this.chatCentralLink.isVisible().catch(() => false)) {
      await this.clickElement(this.chatCentralLink);
      await this.page.waitForLoadState('networkidle');
    } else {
      await this.goto('/app_central_chats');
      await this.waitHelpers.waitForPageLoad();
    }
    await this.page.waitForURL(/app_central_chats/, { timeout: testConfig.timeouts.long });
  }

  async filterDireccionesByDateAndCity(fechaInicial: string, fechaFinal: string, ciudad: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: /Direcciones reportadas/i });
    await expect(heading).toBeVisible({ timeout: testConfig.timeouts.medium });

    const fallbackInputs = this.page
      .locator('main input:not([type="hidden"])')
      .filter({ hasNot: this.page.locator('[name="search"]') });

    const fechaInicialInput = (await this.fechaInicialInput.isVisible().catch(() => false))
      ? this.fechaInicialInput
      : fallbackInputs.nth(0);
    const fechaFinalInput = (await this.fechaFinalInput.isVisible().catch(() => false))
      ? this.fechaFinalInput
      : fallbackInputs.nth(1);

    await this.fillInput(fechaInicialInput, fechaInicial);
    await this.fillInput(fechaFinalInput, fechaFinal);

    const paisSelect = this.page.locator('#country');
    if (await paisSelect.isVisible().catch(() => false)) {
      await paisSelect.selectOption({ label: 'Colombia' }).catch(() => undefined);
    }

    const paisSelectFallback = await this.resolveSelectByOptionLabel('País');
    if (paisSelectFallback && (await paisSelectFallback.isVisible().catch(() => false))) {
      await paisSelectFallback.selectOption({ label: 'Colombia' }).catch(() => undefined);
    }

    const ciudadSelect = this.page.locator('#city');
    if (await ciudadSelect.isVisible().catch(() => false)) {
      await this.page.waitForFunction(
        (selector) => {
          const select = document.querySelector(selector) as HTMLSelectElement | null;
          return Boolean(select && select.options.length > 1);
        },
        '#city',
        { timeout: testConfig.timeouts.long }
      );

      try {
        await ciudadSelect.selectOption({ label: ciudad });
      } catch (_) {
        const cityValue = await this.page.evaluate(({ selector, optionLabel }) => {
          const normalize = (value: string) =>
            value
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9]+/g, ' ')
              .trim();
          const select = document.querySelector(selector) as HTMLSelectElement | null;
          if (!select) return null;
          const target = normalize(optionLabel);
          const primaryToken = target.split(' ')[0];
          const match = Array.from(select.options).find((option) =>
            normalize(option.label).includes(primaryToken)
          );
          return match ? match.value : null;
        }, { selector: '#city', optionLabel: ciudad });

        if (!cityValue) {
          throw new Error(`No se encontró la ciudad "${ciudad}" en el selector.`);
        }
        await ciudadSelect.selectOption({ value: cityValue });
      }
    } else {
      const ciudadSelectFallback = await this.resolveSelectByOptionLabel('Ciudad');
      if (!ciudadSelectFallback) {
        throw new Error('No se encontró el selector de ciudad en Direcciones reportadas.');
      }
      await ciudadSelectFallback.selectOption({ label: ciudad });
    }
    
    await expect(this.buscarButton).toBeVisible({ timeout: 5000 });
    await expect(this.buscarButton).toBeEnabled({ timeout: 5000 });
    await this.clickElement(this.buscarButton);

    const resultsRow = this.page.locator('table tbody tr').first();
    const emptyState = this.page.getByText(/sin resultados|no hay resultados|no records|no data/i);

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(resultsRow).toBeVisible({ timeout: testConfig.timeouts.long }),
        expect(emptyState).toBeVisible({ timeout: testConfig.timeouts.long })
      ]);
    }, 2);
  }
}

