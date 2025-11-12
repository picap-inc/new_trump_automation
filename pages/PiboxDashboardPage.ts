import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * PiboxDashboardPage - Módulo Pibox Dashboard
 */
export class PiboxDashboardPage extends BasePage {
  private readonly piboxLink: Locator;
  private readonly menuButton: Locator;
  private readonly listaServiciosLink: Locator;
  private readonly crearCompaniaLink: Locator;
  private readonly paquetesLink: Locator;
  private readonly peticionOperacionesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.piboxLink = page.getByRole('link', { name: 'pibox Pibox Dashboard' });
    this.menuButton = page.locator('#ham-menu');
    this.listaServiciosLink = page.getByRole('link', { name: /Lista de servicios/i });
    this.crearCompaniaLink = page.getByRole('link', { name: 'Crear compañía' });
    this.paquetesLink = page.getByRole('link', { name: 'Paquetes' });
    this.peticionOperacionesLink = page.getByRole('link', { name: /Petición.*operaciones/i });
  }

  async navigateToPibox(): Promise<void> {
    await this.piboxLink.waitFor({ state: 'visible', timeout: testConfig.timeouts.medium });
    await this.clickElement(this.piboxLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
  }

  /**
   * Abre el menú lateral de Pibox
   * 
   * Botón: <svg id="ham-menu" data-action="click->layout#openSidenav">
   * Force click: data-action puede interferir con eventos normales
   */
  async openPiboxSideMenu(): Promise<void> {
    const isVisible = await this.menuButton.isVisible();

    if (isVisible) {
      await this.waitHelpers.wait(testConfig.waits.afterLogin);
      await this.menuButton.scrollIntoViewIfNeeded();
      await this.menuButton.hover();
      
      // Click con force para evitar problemas con data-action
      await this.menuButton.click({ force: true });
      await this.waitHelpers.wait(testConfig.waits.menuAnimation);
    }
  }

  async navigateToListaServicios(): Promise<void> {
    await expect(this.listaServiciosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.listaServiciosLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
  }

  async navigateToCrearCompania(): Promise<void> {
    await expect(this.crearCompaniaLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.crearCompaniaLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
  }

  async navigateToPaquetes(): Promise<void> {
    await expect(this.paquetesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.paquetesLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
  }

  async navigateToPeticionOperaciones(): Promise<void> {
    await expect(this.peticionOperacionesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.peticionOperacionesLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
  }

  /**
   * Espera a que desaparezca el loader si existe
   */
  async waitForLoader(loaderSelector: string, timeout = 15000): Promise<void> {
    try {
      await this.page.waitForSelector(loaderSelector, { state: 'detached', timeout });
    } catch (_) {
      // Loader no existe o ya desapareció
    }
  }
}

