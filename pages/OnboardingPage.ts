import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * OnboardingPage - Módulo de Onboarding
 */
export class OnboardingPage extends BasePage {
  private readonly onboardingModule: Locator;
  private readonly onboardingDashboardLink: Locator;
  private readonly metricasRegistroLink: Locator;

  constructor(page: Page) {
    super(page);
    this.onboardingModule = this.sideNav.getByText('Onboarding', { exact: true });
    this.onboardingDashboardLink = this.sideNav.getByRole('link', { name: /Onboarding dashboard/i });
    this.metricasRegistroLink = this.sideNav.getByRole('link', { name: /Métricas de Registro/i });
  }

  /**
   * Navega al módulo de Onboarding desde el menú lateral
   */
  async navigateToOnboarding(): Promise<void> {
    await this.forceClick(this.onboardingModule);
    await this.waitHelpers.waitWithRetry(async () => {
      await expect(this.onboardingDashboardLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    }, 3);
  }

  /**
   * Navega al Dashboard de Onboarding
   * Espera a que el enlace sea visible después de desplegar el módulo
   */
  async navigateToDashboard(): Promise<void> {
    await this.clickAndWaitForURL(this.onboardingDashboardLink, 'https://admin.picap.io/onboarding_dashboard');
  }

  async waitForDashboardReady(): Promise<void> {
    await this.page
      .waitForResponse((response) => /onboarding_dashboard|countries|cities/i.test(response.url()), {
        timeout: testConfig.timeouts.medium
      })
      .catch(() => undefined);
    const countrySelect = this.page.locator('#country');
    const citySelect = this.page.locator('#city');
    await expect(countrySelect).toBeAttached({ timeout: testConfig.timeouts.long });
    await expect(countrySelect).toBeVisible({ timeout: testConfig.timeouts.long });
    await expect(citySelect).toBeAttached({ timeout: testConfig.timeouts.long });
    await expect(citySelect).toBeVisible({ timeout: testConfig.timeouts.long });
    await this.page.waitForFunction(
      () => {
        const country = document.querySelector('#country') as HTMLSelectElement | null;
        const city = document.querySelector('#city') as HTMLSelectElement | null;
        return Boolean(country && country.options.length > 1 && city && city.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    );
  }

  private async waitForDashboardFiltersReady(): Promise<void> {
    await this.page
      .waitForResponse((response) => /countries|cities|onboarding_dashboard/i.test(response.url()), {
        timeout: testConfig.timeouts.medium
      })
      .catch(() => undefined);
    await this.waitForDashboardReady();
    await this.page.waitForFunction(
      () => {
        const select = document.querySelector('#country') as HTMLSelectElement | null;
        return Boolean(select && select.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    );
  }

  async applyDashboardFilters(country: string, city: string, activationDate: string, newDriversDate: string, monthStatus: string): Promise<void> {
    await this.waitForDashboardFiltersReady();
    await this.page.locator('#country').selectOption({ label: country });
    await this.page.waitForFunction(
      () => {
        const select = document.querySelector('#city') as HTMLSelectElement | null;
        return Boolean(select && select.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    );
    await this.page.locator('#city').selectOption({ label: city });
    await this.page.locator('#activation_date_two').fill(activationDate);
    await this.page.locator('#new_drivers_date_two').fill(newDriversDate);
    await this.page.locator('#month_status_onboarding').selectOption({ label: monthStatus });
  }

  async navigateToUsuariosOnboarding(): Promise<void> {
    const usuariosLink = this.sideNav.getByRole('link', { name: /Usuarios onboarding/i });
    const href = await usuariosLink.getAttribute('href').catch(() => null);
    try {
      await this.clickAndWaitForURL(usuariosLink, /\/onboardings/, testConfig.timeouts.long);
    } catch (_) {
      if (href) {
        const resolved = new URL(href, this.page.url()).toString();
        await this.page.goto(resolved, { waitUntil: 'domcontentloaded', timeout: testConfig.timeouts.long });
      } else {
        await this.goto('/onboardings');
      }
    }
  }

  async navigateToMetricasRegistro(): Promise<void> {
    await this.ensurePageAlive();
    try {
      await this.clickAndWaitForURL(
        this.metricasRegistroLink,
        /\/driver_registration_metrics/,
        testConfig.timeouts.long
      );
    } catch (_) {
      await this.safeGotoUrl('https://admin.picap.io/driver_registration_metrics', {
        waitForUrl: /\/driver_registration_metrics/,
        timeout: testConfig.timeouts.long
      });
    }
  }

  async waitForMetricasRegistroReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: testConfig.timeouts.long }).catch(() => undefined);
    const heading = this.page.getByRole('heading', { name: /Métricas de Registro|Registro/i }).first();
    const table = this.page.locator('table').first();
    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(heading).toBeVisible({ timeout: testConfig.timeouts.medium }),
        expect(table).toBeVisible({ timeout: testConfig.timeouts.medium })
      ]);
    }, 2);
  }

  private async waitForUsuariosFiltersReady(): Promise<void> {
    await this.page
      .waitForResponse((response) => /onboardings|countries|cities/i.test(response.url()), {
        timeout: testConfig.timeouts.medium
      })
      .catch(() => undefined);
    const paisSelect = this.page.locator('#country');
    const ciudadSelect = this.page.locator('#city');
    await expect(paisSelect).toBeAttached({ timeout: testConfig.timeouts.long });
    await expect(paisSelect).toBeVisible({ timeout: testConfig.timeouts.long });
    await expect(ciudadSelect).toBeAttached({ timeout: testConfig.timeouts.long });
    await expect(ciudadSelect).toBeVisible({ timeout: testConfig.timeouts.long });
    await this.page.waitForFunction(
      () => {
        const select = document.querySelector('#city') as HTMLSelectElement | null;
        return Boolean(select && select.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    );
  }

  async filterUsuariosOnboarding(country: string, city: string, vehicleType: string): Promise<void> {
    await this.ensurePageAlive();
    if (!/\/onboardings/.test(this.page.url())) {
      await this.safeGoto('/onboardings', { waitForUrl: /\/onboardings/ });
    }
    await this.waitForLoadingOverlay();
    await this.waitForUsuariosFiltersReady();
    const paisSelect = this.page.locator('#country');
    await expect(paisSelect).toBeVisible();
    await paisSelect.selectOption({ label: country });

    const ciudadSelect = this.page.locator('#city');
    await expect(ciudadSelect).toBeVisible();
    await this.page.waitForFunction(
      () => {
        const select = document.querySelector('#city') as HTMLSelectElement | null;
        return Boolean(select && select.options.length > 1);
      },
      { timeout: testConfig.timeouts.long }
    );
    try {
      await ciudadSelect.selectOption({ label: city });
    } catch (_) {
      await ciudadSelect.click();
      await this.page.keyboard.press(city.charAt(0).toUpperCase());
      await this.page.keyboard.press('Enter');
    }

    const vehicleSelect = this.page.locator('#vehicle_type');
    await expect(vehicleSelect).toBeVisible();
    await vehicleSelect.selectOption({ label: vehicleType });

    const buscarButton = this.page.getByRole('button', { name: 'Buscar' });
    await expect(buscarButton).toBeVisible();
    await this.clickElement(buscarButton);

    const resultsRow = this.page.locator('table tbody tr').first();
    const emptyState = this.page.getByText(/sin resultados|no hay resultados|no records|no data/i);

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(resultsRow).toBeVisible({ timeout: testConfig.timeouts.long }),
        expect(emptyState).toBeVisible({ timeout: testConfig.timeouts.long })
      ]);
    }, 2);
  }

  async exportList(): Promise<void> {
    await this.ensurePageAlive();
    const exportButton = this.page.getByRole('link', { name: 'Exportar listado' });
    await expect(exportButton).toBeVisible();
    await this.clickElement(exportButton);
    await this.page.waitForEvent('download', { timeout: testConfig.timeouts.long }).catch(() => undefined);
  }
}

