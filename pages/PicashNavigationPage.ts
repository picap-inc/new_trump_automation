import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * PicashNavigationPage - Navegación específica del módulo Picash
 */
export class PicashNavigationPage extends BasePage {
  private readonly menuButton: Locator;
  private readonly picashHeading: Locator;
  private readonly picashModuleLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#ham-menu');
    this.picashHeading = page.getByRole('heading', { name: 'Picash', exact: true });
    this.picashModuleLink = page.getByRole('link', { name: 'home Picash' });
  }

  /**
   * Navega al módulo Picash desde el menú principal
   */
  async navigateToPicashModule(): Promise<void> {
    await expect(this.picashModuleLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.picashModuleLink);
    await this.expectURL('https://admin.picap.io/picash/');
  }

  /**
   * Abre el menú lateral específico de Picash
   * 
   * Botón: <svg id="ham-menu" data-action="click->layout#openSidenav">
   * Force click: data-action puede interferir con eventos normales
   */
  async openPicashSideMenu(): Promise<void> {
    console.log('📦 Verificando estado del menú lateral de Picash...');

    const isVisible = await this.menuButton.isVisible();

    if (isVisible) {
      console.log('⏳ Esperando carga completa de la página (5s)...');
      await this.waitHelpers.wait(testConfig.waits.afterLogin);

      console.log('🟢 Botón visible. Intentando abrir menú...');
      await this.menuButton.scrollIntoViewIfNeeded();
      await this.menuButton.hover();
      
      // Click con force para evitar problemas con data-action
      await this.menuButton.click({ force: true });
      await this.waitHelpers.wait(testConfig.waits.menuAnimation);
    } else {
      console.log('ℹ️ Botón de menú no visible. Posiblemente ya está abierto.');
    }

    console.log('🔍 Esperando validación por heading "Picash"...');
    await expect(this.picashHeading).toBeVisible({ timeout: 7000 });

    console.log('✅ Menú lateral de Picash verificado correctamente.');
  }

  /**
   * Navega a una subsección de Picash
   */
  async navigateToSubsection(subsectionName: string): Promise<void> {
    const subsectionLink = this.page.getByRole('link', { name: subsectionName });
    await expect(subsectionLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(subsectionLink);
  }

  /**
   * Verifica que el heading de Picash esté visible
   */
  async verifyPicashMenuOpen(): Promise<void> {
    await expect(this.picashHeading).toBeVisible({ timeout: 7000 });
  }
}

