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

  constructor(page: Page) {
    super(page);
    this.marketingModule = page.locator('#mySidenav').getByText('Marketing y growth');
    this.campaignsLink = page.getByRole('link', { name: 'Campañas' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard', exact: true });
    this.fromDateInput = page.getByRole('textbox', { name: 'Desde' });
    this.toDateInput = page.getByRole('textbox', { name: 'Hasta' });
    this.campaignStatusSelect = page.locator('#campaign_status');
    this.searchButton = page.getByRole('button', { name: 'Buscar' });
  }

  /**
   * Navega al módulo de Marketing desde el menú lateral
   */
  async navigateToMarketing(): Promise<void> {
    await expect(this.marketingModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.marketingModule);
    // Esperar a que se expanda el submenú
    await this.waitHelpers.wait(1000);
  }

  /**
   * Navega a la sección de Campañas
   */
  async navigateToCampaigns(): Promise<void> {
    await expect(this.campaignsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.campaignsLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
    await this.expectURL('https://admin.picap.io/campaigns');
  }

  /**
   * Navega al Dashboard de Marketing
   */
  async navigateToDashboard(): Promise<void> {
    await expect(this.dashboardLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.dashboardLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
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
    const dashboardHeading = this.page.getByRole('heading', { name: 'Usuarios registrados' });
    await expect(dashboardHeading).toBeVisible({ timeout: testConfig.timeouts.medium });
  }
}

