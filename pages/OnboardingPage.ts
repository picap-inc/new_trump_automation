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
    this.onboardingModule = page.locator('#mySidenav').getByText('Onboarding', { exact: true });
    this.onboardingDashboardLink = page.getByRole('link', { name: 'Onboarding dashboard' });
  }

  /**
   * Navega al módulo de Onboarding desde el menú lateral
   */
  async navigateToOnboarding(): Promise<void> {
    await this.clickElement(this.onboardingModule);
    // Esperar a que se expanda el submenú
    await this.waitHelpers.wait(1000);
  }

  /**
   * Navega al Dashboard de Onboarding
   * Espera a que el enlace sea visible después de desplegar el módulo
   */
  async navigateToDashboard(): Promise<void> {
    await this.page.waitForSelector('text=Onboarding dashboard', { state: 'visible' });
    await this.clickElement(this.onboardingDashboardLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
    await this.waitForURL('https://admin.picap.io/onboarding_dashboard', 5000);
    await this.expectURL('https://admin.picap.io/onboarding_dashboard');
  }

  async applyDashboardFilters(country: string, city: string, activationDate: string, newDriversDate: string, monthStatus: string): Promise<void> {
    await this.page.locator('#country').selectOption({ label: country });
    await this.waitHelpers.wait(1000);
    await this.page.locator('#city').selectOption({ label: city });
    await this.page.locator('#activation_date_two').fill(activationDate);
    await this.page.locator('#new_drivers_date_two').fill(newDriversDate);
    await this.page.locator('#month_status_onboarding').selectOption({ label: monthStatus });
  }

  async navigateToUsuariosOnboarding(): Promise<void> {
    await this.page.waitForSelector('text= Usuarios onboarding', { state: 'visible' });
    const usuariosLink = this.page.getByRole('link', { name: 'Usuarios onboarding' });
    await this.clickElement(usuariosLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
    await this.waitForURL('https://admin.picap.io/onboardings', 17000);
    await this.expectURL('https://admin.picap.io/onboardings');
  }

  async filterUsuariosOnboarding(country: string, city: string, vehicleType: string): Promise<void> {
    const paisSelect = this.page.locator('#country');
    await expect(paisSelect).toBeVisible();
    await paisSelect.selectOption({ label: country });

    const ciudadSelect = this.page.locator('#city');
    await expect(ciudadSelect).toBeVisible();
    await ciudadSelect.click();
    await this.page.keyboard.press(city.charAt(0).toUpperCase());
    await this.page.keyboard.press('Enter');

    const vehicleSelect = this.page.locator('#vehicle_type');
    await expect(vehicleSelect).toBeVisible();
    await vehicleSelect.selectOption({ label: vehicleType });

    const buscarButton = this.page.getByRole('button', { name: 'Buscar' });
    await expect(buscarButton).toBeVisible();
    await this.clickElement(buscarButton);
    
    await this.waitHelpers.wait(15000); // Esperar resultados
  }

  async exportList(): Promise<void> {
    const exportButton = this.page.getByRole('link', { name: 'Exportar listado' });
    await expect(exportButton).toBeVisible();
    await this.clickElement(exportButton);
  }
}

