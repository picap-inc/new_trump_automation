import { Page, Locator, expect } from '@playwright/test';
import { MarketingPage } from './MarketingPage';
import { testConfig } from '../config/test-config';

/**
 * MarketingPageExtended - Extensión de MarketingPage para funcionalidades adicionales
 * Cubre: Bicitaxi, Códigos, Notificaciones, Perfilamientos, Pilevels, Promo Codes, Push, etc.
 */
export class MarketingPageExtended extends MarketingPage {
  // Bicitaxi
  private readonly bicitaxiLink: Locator;
  private readonly zonaSelect: Locator;
  private readonly estadoBiciSelect: Locator;
  private readonly ciudadSelect: Locator;

  // Códigos
  private readonly codigosQrLink: Locator;
  private readonly codigosMasivosLink: Locator;
  private readonly codigosPiprimePiproLink: Locator;
  private readonly campanasCodesLink: Locator;

  // Notificaciones y Push
  private readonly notificacionesLink: Locator;
  private readonly pushMasivosLink: Locator;

  // Perfilamientos
  private readonly perfilamientoPasajerosLink: Locator;
  private readonly perfilamientoPilotoLink: Locator;

  // Pilevels
  private readonly pilevelsLink: Locator;

  // Promo Codes
  private readonly promoCodesLink: Locator;

  // Reglas y Referidos
  private readonly reglaReferidosLink: Locator;

  // Tutoriales
  private readonly tutorialesLink: Locator;

  // Verificaciones Fraude
  private readonly verificacionesFraudeLink: Locator;

  // Visuales
  private readonly visualesBannersLink: Locator;
  private readonly visualesMapaLink: Locator;

  // Comparador Tarifas
  private readonly comparadorTarifasLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Bicitaxi
    this.bicitaxiLink = page.getByRole('link', { name: 'Bicitaxi', exact: true });
    this.zonaSelect = page.locator('#name');
    this.estadoBiciSelect = page.locator('#is_enabled');
    this.ciudadSelect = page.locator('#city_id');

    // Códigos
    this.codigosQrLink = page.getByRole('link', { name: 'Códigos QR' });
    this.codigosMasivosLink = page.getByRole('link', { name: 'Códigos masivos' });
    this.codigosPiprimePiproLink = page.getByRole('link', { name: 'Códigos Piprime / Pipro' });
    this.campanasCodesLink = page.getByRole('link', { name: 'Campañas codes' });

    // Notificaciones y Push
    this.notificacionesLink = page.getByRole('link', { name: 'Notificaciones' });
    this.pushMasivosLink = page.getByRole('link', { name: 'Push masivos' });

    // Perfilamientos
    this.perfilamientoPasajerosLink = page.getByRole('link', { name: 'Perfilamiento Pasajeros' });
    this.perfilamientoPilotoLink = page.getByRole('link', { name: 'Perfilamiento Piloto' });

    // Pilevels
    this.pilevelsLink = page.getByRole('link', { name: 'Pilevels' });

    // Promo Codes
    this.promoCodesLink = page.getByRole('link', { name: 'Promo codes' });

    // Reglas y Referidos
    this.reglaReferidosLink = page.getByRole('link', { name: 'Regla de referidos' });

    // Tutoriales
    this.tutorialesLink = page.getByRole('link', { name: 'Tutoriales' });

    // Verificaciones Fraude
    this.verificacionesFraudeLink = page.getByRole('link', { name: 'Verificaciones de fraude' });

    // Visuales
    this.visualesBannersLink = page.getByRole('link', { name: 'Visuales - Banners' });
    this.visualesMapaLink = page.getByRole('link', { name: 'Visuales - Mapa' });

    // Comparador Tarifas
    this.comparadorTarifasLink = page.getByRole('link', { name: 'Comparador de tarifas' });
  }

  // Bicitaxi
  async navigateToBicitaxi(): Promise<void> {
    await expect(this.bicitaxiLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.bicitaxiLink);
  }

  async filterBicitaxi(zona: string, estado: string, ciudad: string): Promise<void> {
    await expect(this.zonaSelect).toBeVisible();
    await this.zonaSelect.selectOption({ label: zona });
    
    await expect(this.estadoBiciSelect).toBeVisible();
    await this.estadoBiciSelect.selectOption({ label: estado });
    
    await expect(this.ciudadSelect).toBeVisible();
    await this.ciudadSelect.selectOption({ label: ciudad });
    
    await this.search();
    await this.waitHelpers.wait(2000);
  }

  // Códigos
  async navigateToCodigosQR(): Promise<void> {
    await expect(this.codigosQrLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.codigosQrLink);
  }

  async navigateToCodigosMasivos(): Promise<void> {
    await expect(this.codigosMasivosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.codigosMasivosLink);
  }

  async navigateToCodigosPiprimePipro(): Promise<void> {
    await expect(this.codigosPiprimePiproLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.codigosPiprimePiproLink);
  }

  async navigateToCampanasCodes(): Promise<void> {
    await expect(this.campanasCodesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.campanasCodesLink);
  }

  // Notificaciones
  async navigateToNotificaciones(): Promise<void> {
    await expect(this.notificacionesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.notificacionesLink);
  }

  async navigateToPushMasivos(): Promise<void> {
    await expect(this.pushMasivosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.pushMasivosLink);
  }

  // Perfilamientos
  async navigateToPerfilamientoPasajeros(): Promise<void> {
    await expect(this.perfilamientoPasajerosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.perfilamientoPasajerosLink);
  }

  async navigateToPerfilamientoPiloto(): Promise<void> {
    await expect(this.perfilamientoPilotoLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.perfilamientoPilotoLink);
  }

  // Pilevels
  async navigateToPilevels(): Promise<void> {
    await expect(this.pilevelsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.pilevelsLink);
  }

  // Promo Codes
  async navigateToPromoCodes(): Promise<void> {
    await expect(this.promoCodesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.promoCodesLink);
  }

  // Reglas y Referidos
  async navigateToReglaReferidos(): Promise<void> {
    await expect(this.reglaReferidosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.reglaReferidosLink);
  }

  // Tutoriales
  async navigateToTutoriales(): Promise<void> {
    await expect(this.tutorialesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.tutorialesLink);
  }

  // Verificaciones Fraude
  async navigateToVerificacionesFraude(): Promise<void> {
    await expect(this.verificacionesFraudeLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.verificacionesFraudeLink);
  }

  // Visuales
  async navigateToVisualesBanners(): Promise<void> {
    await expect(this.visualesBannersLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.visualesBannersLink);
  }

  async navigateToVisualesMapa(): Promise<void> {
    await expect(this.visualesMapaLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.visualesMapaLink);
  }

  // Comparador Tarifas
  async navigateToComparadorTarifas(): Promise<void> {
    await expect(this.comparadorTarifasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.comparadorTarifasLink);
  }
}

