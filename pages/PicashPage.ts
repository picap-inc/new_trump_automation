import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * PicashPage - Funcionalidades del módulo Picash
 * Separado de PicashNavigationPage para mantener responsabilidades claras
 */
export class PicashPage extends BasePage {
  // Links de secciones
  private readonly comprasLink: Locator;
  private readonly creditosInformacionLink: Locator;
  private readonly creditosUsuariosLink: Locator;
  private readonly dispositivosBloqueadosLink: Locator;
  private readonly errorCargaLink: Locator;
  private readonly ingresoPicashLink: Locator;

  constructor(page: Page) {
    super(page);
    this.comprasLink = page.getByRole('link', { name: 'Compras' });
    this.creditosInformacionLink = page.getByRole('link', { name: 'Créditos información' });
    this.creditosUsuariosLink = page.getByRole('link', { name: 'Créditos usuarios elegibles' });
    this.dispositivosBloqueadosLink = page.getByRole('link', { name: 'Dispositivos bloqueados' });
    this.errorCargaLink = page.getByRole('link', { name: 'Error de carga' });
    this.ingresoPicashLink = page.getByRole('link', { name: 'Ingreso de Picash' });
  }

  async navigateToCompras(): Promise<void> {
    await expect(this.comprasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.comprasLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToCreditosInformacion(): Promise<void> {
    await expect(this.creditosInformacionLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.creditosInformacionLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToCreditosUsuarios(): Promise<void> {
    await expect(this.creditosUsuariosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.creditosUsuariosLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToDispositivosBloqueados(): Promise<void> {
    await expect(this.dispositivosBloqueadosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.dispositivosBloqueadosLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToErrorCarga(): Promise<void> {
    await expect(this.errorCargaLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.errorCargaLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }

  async navigateToIngresoPicash(): Promise<void> {
    await expect(this.ingresoPicashLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.ingresoPicashLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }
}

