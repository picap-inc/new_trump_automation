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
  private readonly fechaInicialInput: Locator;
  private readonly fechaFinalInput: Locator;
  private readonly ciudadInput: Locator;
  private readonly buscarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.appModule = page.locator('#mySidenav').getByText('App', { exact: true });
    this.direccionesReportadasLink = page.getByRole('link', { name: 'Direcciones reportadas' });
    this.versionesAppLink = page.getByRole('link', { name: 'Versiones app' });
    this.fechaInicialInput = page.getByPlaceholder('Fecha inicial');
    this.fechaFinalInput = page.getByPlaceholder('Fecha final');
    this.ciudadInput = page.getByPlaceholder('Ciudad');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
  }

  async navigateToApp(): Promise<void> {
    await expect(this.appModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.appModule);
    // Esperar a que se expanda el submenú
    await this.waitHelpers.wait(1000);
  }

  async navigateToDireccionesReportadas(): Promise<void> {
    await expect(this.direccionesReportadasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.direccionesReportadasLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToVersionesApp(): Promise<void> {
    await expect(this.versionesAppLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.versionesAppLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async filterDireccionesByDateAndCity(fechaInicial: string, fechaFinal: string, ciudad: string): Promise<void> {
    await this.fillInput(this.fechaInicialInput, fechaInicial);
    await this.fillInput(this.fechaFinalInput, fechaFinal);
    await this.fillInput(this.ciudadInput, ciudad);
    
    await expect(this.buscarButton).toBeVisible({ timeout: 5000 });
    await expect(this.buscarButton).toBeEnabled({ timeout: 5000 });
    await this.clickElement(this.buscarButton);
    
    await this.waitHelpers.wait(3000); // Esperar resultados
  }
}

