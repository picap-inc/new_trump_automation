import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * TrumpPage - Módulo TRUMP (Pilot Safe)
 */
export class TrumpPage extends BasePage {
  private readonly trumpModule: Locator;
  private readonly pilotSafeLink: Locator;
  private readonly paisSelect: Locator;
  private readonly estadoSelect: Locator;
  private readonly tipoServicioSelect: Locator;
  private readonly buscarButton: Locator;
  private readonly limpiarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.trumpModule = page.locator('#mySidenav').getByText('TRUMP', { exact: true });
    this.pilotSafeLink = page.getByRole('link', { name: 'Pilot Safe' });
    this.paisSelect = page.getByLabel('País');
    this.estadoSelect = page.getByLabel('Estado');
    this.tipoServicioSelect = page.getByLabel('Tipos de servicio');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.limpiarButton = page.getByRole('button', { name: 'Limpiar' });
  }

  async navigateToTrump(): Promise<void> {
    await expect(this.trumpModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.trumpModule);
    // Esperar a que se expanda el submenú
    await this.waitHelpers.wait(1000);
  }

  async navigateToPilotSafe(): Promise<void> {
    await expect(this.pilotSafeLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.pilotSafeLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async applyFilters(pais: string, estado: string, tipoServicio: string): Promise<void> {
    await this.paisSelect.selectOption(pais);
    await this.estadoSelect.selectOption(estado);
    await this.tipoServicioSelect.selectOption(tipoServicio);
    
    await this.clickElement(this.buscarButton);
    await this.waitHelpers.wait(5000); // Esperar resultados
  }

  async clearFilters(): Promise<void> {
    await this.clickElement(this.limpiarButton);
  }
}

