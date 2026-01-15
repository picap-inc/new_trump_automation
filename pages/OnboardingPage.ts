import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * OnboardingPage - Módulo de Onboarding
 */
export class OnboardingPage extends BasePage {
  private readonly onboardingModule: Locator;
  private readonly onboardingDashboardLink: Locator;

  constructor(page: Page) {
    super(page);
    this.onboardingModule = this.sideNav.getByText('Onboarding', { exact: true });
    this.onboardingDashboardLink = this.sideNav.getByRole('link', { name: /Onboarding dashboard/i });
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

  async applyDashboardFilters(country: string, city: string, activationDate: string, newDriversDate: string, monthStatus: string): Promise<void> {
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
    await this.clickAndWaitForURL(usuariosLink, 'https://admin.picap.io/onboardings', 17000);
  }

  async filterUsuariosOnboarding(country: string, city: string, vehicleType: string): Promise<void> {
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
    const exportButton = this.page.getByRole('link', { name: 'Exportar listado' });
    await expect(exportButton).toBeVisible();
    await this.clickElement(exportButton);
  }
}

