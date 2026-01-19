import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * MarketingPage - Módulo Marketing y Growth
 */
export class MarketingPage extends BasePage {
  private readonly marketingModule: Locator;
  private readonly campaignsLink: Locator;
  private readonly dashboardLink: Locator;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly campaignStatusSelect: Locator;
  private readonly searchButton: Locator;
  private readonly dashboardDateInput: Locator;
  private readonly dashboardCitySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.marketingModule = this.sideNav.getByText('Marketing y growth', { exact: true });
    this.campaignsLink = this.sideNav.getByRole('link', { name: 'Campañas', exact: true });
    this.dashboardLink = this.sideNav.getByRole('link', { name: 'Dashboard', exact: true });
    this.fromDateInput = page.getByRole('textbox', { name: 'Desde' });
    this.toDateInput = page.getByRole('textbox', { name: 'Hasta' });
    this.campaignStatusSelect = page.locator('#campaign_status');
    this.searchButton = page.getByRole('button', { name: 'Buscar' });
    this.dashboardDateInput = page.getByRole('textbox', { name: /yyyy-MM-dd/i });
    this.dashboardCitySelect = page
      .getByRole('heading', { name: /Conductores en línea/i })
      .locator('..')
      .getByRole('combobox');
  }

  /**
   * Navega al módulo de Marketing desde el menú lateral
   */
  async navigateToMarketing(): Promise<void> {
    await this.ensureMarketingExpanded();
  }

  protected async ensureMarketingExpanded(): Promise<void> {
    if (await this.dashboardLink.isVisible().catch(() => false)) {
      return;
    }

    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
    if (!(await this.sideNav.isVisible().catch(() => false))) {
      const menuButton = this.page.locator('#ham-menu');
      if (await menuButton.isVisible().catch(() => false)) {
        await menuButton.click({ force: true });
        await expect(this.sideNav).toBeVisible({ timeout: testConfig.timeouts.medium });
      }
    }

    if (await this.marketingModule.isVisible().catch(() => false)) {
      await this.waitHelpers.waitWithRetry(async () => {
        if (!(await this.marketingModule.isVisible().catch(() => false))) {
          return;
        }
        await this.marketingModule.scrollIntoViewIfNeeded().catch(() => undefined);
        await this.forceClick(this.marketingModule);
      }, 2);
      try {
        await this.waitHelpers.waitWithRetry(async () => {
          await expect(this.dashboardLink).toBeVisible({ timeout: testConfig.timeouts.medium });
        }, 3);
        return;
      } catch (_) {
        // Si el submenú no aparece, ir directo al dashboard
        await this.page
          .goto('https://admin.picap.io/marketing_dashboard', {
            waitUntil: 'domcontentloaded',
            timeout: testConfig.timeouts.long
          })
          .catch(() => undefined);
        return;
      }
    }

    // Fallback: si el módulo no aparece (menú colapsado/oculto), navega al dashboard
    await this.page
      .goto('https://admin.picap.io/marketing_dashboard', {
        waitUntil: 'domcontentloaded',
        timeout: testConfig.timeouts.long
      })
      .catch(() => undefined);
  }

  /**
   * Navega a la sección de Campañas
   */
  async navigateToCampaigns(): Promise<void> {
    await this.clickAndWaitForURL(this.campaignsLink, /\/campaigns/);
  }

  /**
   * Navega al Dashboard de Marketing
   */
  async navigateToDashboard(): Promise<void> {
    await this.clickAndWaitForURL(this.dashboardLink, /\/marketing_dashboard/);
  }

  async openMarketingDashboard(): Promise<void> {
    await this.safeGotoUrl('https://admin.picap.io/marketing_dashboard', {
      waitForUrl: /\/marketing_dashboard/
    });
  }

  /**
   * Aplica filtros de fecha en campañas
   */
  async filterByDateRange(fromDate: string, toDate: string): Promise<void> {
    await expect(this.fromDateInput).toBeVisible();
    await this.fillInput(this.fromDateInput, fromDate);
    
    await expect(this.toDateInput).toBeVisible();
    await this.fillInput(this.toDateInput, toDate);
  }

  /**
   * Selecciona estado de campaña usando teclado
   * Material-UI select responde mejor a eventos de teclado
   */
  async selectCampaignStatus(status: string): Promise<void> {
    await expect(this.campaignStatusSelect).toBeVisible();
    await this.clickElement(this.campaignStatusSelect);
    
    // Navegar con teclado (más confiable que clicks en dropdown Material-UI)
    await this.campaignStatusSelect.press(status.charAt(0).toUpperCase());
    await this.campaignStatusSelect.press('Enter');
  }

  /**
   * Ejecuta búsqueda con filtros aplicados
   */
  async search(): Promise<void> {
    await expect(this.searchButton).toBeVisible();
    await this.clickElement(this.searchButton);
  }

  /**
   * Verifica que la página de Dashboard esté cargada
   */
  async verifyDashboardLoaded(): Promise<void> {
    await this.waitForDashboardReady();
  }

  async waitForDashboardReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: testConfig.timeouts.long }).catch(() => undefined);
    const dashboardHeading = this.page.getByRole('heading', { name: 'Usuarios registrados' });
    await expect(dashboardHeading).toBeVisible({ timeout: testConfig.timeouts.long });
    await expect(this.dashboardCitySelect).toBeAttached({ timeout: testConfig.timeouts.long });
  }

  private async waitForDashboardFiltersReady(): Promise<void> {
    await this.page
      .waitForResponse((response) => /marketing_dashboard|cities|drivers/i.test(response.url()), {
        timeout: testConfig.timeouts.medium
      })
      .catch(() => undefined);
    await expect(this.dashboardDateInput).toBeVisible({ timeout: testConfig.timeouts.long });
    await expect(this.dashboardCitySelect).toBeVisible({ timeout: testConfig.timeouts.long });
    await this.page.waitForFunction(
      () => {
        const select = document.querySelector('select') as HTMLSelectElement | null;
        return Boolean(select && select.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    ).catch(() => undefined);
  }

  /**
   * Aplica filtro de ciudad en el dashboard (smoke)
   */
  async filterDashboardByCity(cityLabel: string): Promise<void> {
    await this.waitForDashboardFiltersReady();
    await this.dashboardCitySelect.selectOption({ label: cityLabel });
  }
}

