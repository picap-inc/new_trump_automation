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
  private readonly codigosPromocionalesLink: Locator;

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

  // Rachas
  private readonly rachasLink: Locator;

  // Tutoriales
  private readonly tutorialesLink: Locator;

  // Verificaciones Fraude
  private readonly verificacionesFraudeLink: Locator;

  // Visuales
  private readonly visualesBannersLink: Locator;
  private readonly visualesMapaLink: Locator;

  // Comparador Tarifas
  private readonly comparadorTarifasLink: Locator;
  private readonly tarifaDiferencialLink: Locator;
  private readonly tarifaDiferencialTextLink: Locator;

  // Toggles de grupos en menú lateral
  private readonly codigosGroupToggle: Locator;
  private readonly visualesGroupToggle: Locator;
  private readonly perfilamientoGroupToggle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Bicitaxi
    this.bicitaxiLink = this.sideNav.getByRole('link', { name: 'Bicitaxi', exact: true });
    this.zonaSelect = page.locator('#name');
    this.estadoBiciSelect = page.locator('#is_enabled');
    this.ciudadSelect = page.locator('#city_id');

    // Códigos
    this.codigosQrLink = this.sideNav.getByRole('link', { name: /Códigos\s*QR/i });
    this.codigosMasivosLink = this.sideNav.getByRole('link', { name: /Códigos\s*masivos/i });
    this.codigosPiprimePiproLink = this.sideNav.getByRole('link', { name: /Códigos\s*Piprime\s*(\/|y)\s*Pipro/i });
    this.campanasCodesLink = this.sideNav.getByRole('link', { name: /Campañas\s*promocodes/i });
    this.codigosPromocionalesLink = this.sideNav.getByRole('link', { name: /Códigos promocionales/i });

    // Notificaciones y Push
    this.notificacionesLink = this.sideNav.getByRole('link', { name: 'Notificaciones', exact: true });
    this.pushMasivosLink = this.sideNav.getByRole('link', { name: /Push\s*masivos/i });

    // Perfilamientos
    this.perfilamientoPasajerosLink = this.sideNav.getByRole('link', { name: /Pasajeros/i });
    this.perfilamientoPilotoLink = this.sideNav.getByRole('link', { name: /Pilotos/i });

    // Pilevels
    this.pilevelsLink = this.sideNav.getByRole('link', { name: /Pilevels/i });

    // Promo Codes
    this.promoCodesLink = this.sideNav.getByRole('link', { name: /Códigos promocionales/i });

    // Reglas y Referidos
    this.reglaReferidosLink = this.sideNav.getByRole('link', { name: /Reglas para referidos/i });

    // Rachas
    this.rachasLink = this.sideNav.getByRole('link', { name: /Rachas/i });

    // Tutoriales
    this.tutorialesLink = this.sideNav.getByRole('link', { name: 'Tutoriales', exact: true });

    // Verificaciones Fraude
    this.verificacionesFraudeLink = this.sideNav.getByRole('link', { name: /Verificaciones de fraude/i });

    // Visuales
    this.visualesBannersLink = this.sideNav.getByRole('link', { name: /Banners/i });
    this.visualesMapaLink = this.sideNav.getByRole('link', { name: /Vehículos en el mapa/i });

    // Comparador Tarifas
    this.comparadorTarifasLink = this.sideNav.locator('a[href*="/benchmark_routes"]').first();
    this.tarifaDiferencialLink = this.sideNav.locator('a[href*="/pricing/sensitivity_scores"]').first();
    this.tarifaDiferencialTextLink = this.sideNav.getByRole('link', { name: /Tarifa diferencial/i });

    // Toggles de grupos
    this.codigosGroupToggle = this.sideNav
      .locator('a[data-layout-target="submenuActive"]')
      .filter({ hasText: 'Códigos promocionales' })
      .first();
    this.visualesGroupToggle = this.sideNav
      .locator('a[data-layout-target="submenuActive"]')
      .filter({ hasText: 'Visuales app' })
      .first();
    this.perfilamientoGroupToggle = this.sideNav
      .locator('a[data-layout-target="submenuActive"]')
      .filter({ hasText: 'Perfilamiento' })
      .first();
  }

  private async resolveVisibleTarget(candidates: Locator[]): Promise<Locator | null> {
    for (const candidate of candidates) {
      if (await candidate.isVisible().catch(() => false)) {
        return candidate;
      }
    }
    return null;
  }

  private async logSideNavLinks(context: string): Promise<void> {
    const links = await this.sideNav.locator('a').evaluateAll((elements) =>
      elements
        .map((el) => {
          const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
          const href = (el as HTMLAnchorElement).getAttribute('href') || '';
          return `${text} -> ${href}`.trim();
        })
        .filter(Boolean)
    );
    console.warn(`⚠️ [Marketing] Enlaces disponibles (${context}):\n${links.join('\n')}`);
  }

  private async ensureGroupExpanded(
    groupToggle: Locator,
    linkToReveal?: Locator,
    fallbackLink?: Locator
  ): Promise<void> {
    await this.ensureMarketingExpanded();
    if (linkToReveal && (await linkToReveal.isVisible().catch(() => false))) {
      return;
    }

    if (await groupToggle.isVisible().catch(() => false)) {
      await this.forceClick(groupToggle);
      if (linkToReveal) {
        await this.waitHelpers.waitWithRetry(async () => {
          await expect(linkToReveal).toBeVisible({ timeout: testConfig.timeouts.medium });
        }, 2).catch(() => undefined);
      }
      return;
    }

    if (fallbackLink && (await fallbackLink.isVisible().catch(() => false))) {
      await fallbackLink.click();
    }
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

    const resultsRow = this.page.locator('table tbody tr').first();
    const emptyState = this.page.getByText(/sin resultados|no hay resultados|no records|no data/i);

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(resultsRow).toBeVisible({ timeout: testConfig.timeouts.long }),
        expect(emptyState).toBeVisible({ timeout: testConfig.timeouts.long })
      ]);
    }, 2);
  }

  // Códigos
  async navigateToCodigosQR(): Promise<void> {
    await expect(this.codigosQrLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.codigosQrLink);
  }

  async navigateToCodigosMasivos(): Promise<void> {
    await this.ensureGroupExpanded(this.codigosGroupToggle, this.codigosMasivosLink, this.codigosPromocionalesLink);
    const target = await this.resolveVisibleTarget([this.codigosMasivosLink, this.codigosPromocionalesLink]);
    if (!target) {
      await this.logSideNavLinks('Codigos Masivos');
      await this.goto('/promo_code_campaigns/massives');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  async navigateToCodigosPiprimePipro(): Promise<void> {
    await this.ensureGroupExpanded(this.codigosGroupToggle, this.codigosPiprimePiproLink, this.codigosPromocionalesLink);
    await this.clickElement(this.codigosPiprimePiproLink);
  }

  async navigateToCampanasCodes(): Promise<void> {
    await this.ensureGroupExpanded(this.codigosGroupToggle, this.campanasCodesLink, this.codigosPromocionalesLink);
    const target = await this.resolveVisibleTarget([this.campanasCodesLink, this.codigosPromocionalesLink]);
    if (!target) {
      await this.logSideNavLinks('Campañas Codes');
      await this.goto('/promo_code_campaigns');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
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
    await this.ensureGroupExpanded(this.perfilamientoGroupToggle, this.perfilamientoPasajerosLink);
    const target = await this.resolveVisibleTarget([this.perfilamientoPasajerosLink]);
    if (!target) {
      await this.logSideNavLinks('Perfilamiento Pasajeros');
      await this.goto('/passenger_profiles');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  async navigateToPerfilamientoPiloto(): Promise<void> {
    await this.ensureGroupExpanded(this.perfilamientoGroupToggle, this.perfilamientoPilotoLink);
    const target = await this.resolveVisibleTarget([this.perfilamientoPilotoLink]);
    if (!target) {
      await this.logSideNavLinks('Perfilamiento Piloto');
      await this.goto('/driver_profiles');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  // Pilevels
  async navigateToPilevels(): Promise<void> {
    await expect(this.pilevelsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.pilevelsLink);
  }

  // Promo Codes
  async navigateToPromoCodes(): Promise<void> {
    await this.ensureGroupExpanded(this.codigosGroupToggle, this.promoCodesLink, this.codigosPromocionalesLink);
    const target = await this.resolveVisibleTarget([this.promoCodesLink, this.codigosPromocionalesLink]);
    if (!target) {
      await this.logSideNavLinks('Promo Codes');
      await this.goto('/promo_codes');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  // Reglas y Referidos
  async navigateToReglaReferidos(): Promise<void> {
    await this.ensureGroupExpanded(this.codigosGroupToggle, this.reglaReferidosLink, this.codigosPromocionalesLink);
    const target = await this.resolveVisibleTarget([this.reglaReferidosLink, this.codigosPromocionalesLink]);
    if (!target) {
      await this.logSideNavLinks('Regla de Referidos');
      await this.goto('/referral_code_rules');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  // Rachas
  async navigateToRachas(): Promise<void> {
    await expect(this.rachasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.rachasLink);
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
    await this.ensureGroupExpanded(this.visualesGroupToggle, this.visualesBannersLink);
    const bannersFallback = this.sideNav.getByRole('link', { name: /Banners/i }).first();
    const target = await this.resolveVisibleTarget([this.visualesBannersLink, bannersFallback]);
    if (!target) {
      await this.logSideNavLinks('Visuales Banners');
      await this.goto('/home_sliders');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  async navigateToVisualesMapa(): Promise<void> {
    await this.ensureGroupExpanded(this.visualesGroupToggle, this.visualesMapaLink);
    const mapaFallback = this.sideNav.getByRole('link', { name: /Mapa/i }).first();
    const target = await this.resolveVisibleTarget([this.visualesMapaLink, mapaFallback]);
    if (!target) {
      await this.logSideNavLinks('Visuales Mapa');
      await this.goto('/countries');
      await this.waitHelpers.waitForPageLoad();
      return;
    }
    await this.clickElement(target);
  }

  // Comparador Tarifas
  async navigateToComparadorTarifas(): Promise<void> {
    await expect(this.comparadorTarifasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.comparadorTarifasLink);
  }

  async navigateToTarifaDiferencial(): Promise<Page> {
    await this.ensurePageAlive();
    await this.ensureMarketingExpanded();
    const target = await this.resolveVisibleTarget([this.tarifaDiferencialLink, this.tarifaDiferencialTextLink]);
    if (!target) {
      await this.logSideNavLinks('Tarifa diferencial');
      await this.safeGoto('https://admin.picap.io/pricing/sensitivity_scores', {
        waitForUrl: /\/(pricing\/sensitivity_scores|benchmark_routes)/
      });
      return this.getLivePage();
    }
    await expect(target).toBeVisible({ timeout: testConfig.timeouts.medium });
    const context = this.page.context();
    const popupPromise = context.waitForEvent('page').catch(() => null);
    const navigationPromise = this.page
      .waitForURL(/\/(pricing\/sensitivity_scores|benchmark_routes)/, { timeout: testConfig.timeouts.long })
      .catch(() => null);

    await target.scrollIntoViewIfNeeded().catch(() => undefined);
    await target.click({ force: true });

    const popup = await popupPromise;
    if (popup) {
      await popup.waitForLoadState('domcontentloaded').catch(() => undefined);
      await popup.waitForLoadState('networkidle').catch(() => undefined);
      return popup;
    }

    await navigationPromise;
    const livePage = await this.getLivePage();
    await livePage.waitForLoadState('domcontentloaded').catch(() => undefined);
    return livePage;
  }
}

