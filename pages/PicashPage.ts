import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

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
    this.comprasLink = page.getByRole('link', { name: 'Compras', exact: true });
    this.creditosInformacionLink = page.getByRole('link', { name: /Créditos información/i });
    this.creditosUsuariosLink = page.getByRole('link', { name: /Créditos usuarios elegibles/i });
    this.dispositivosBloqueadosLink = page.getByRole('link', { name: /Dispositivos bloqueados/i });
    this.errorCargaLink = page.getByRole('link', { name: /Error de carga/i });
    this.ingresoPicashLink = page.getByRole('link', { name: /Ingreso de Picash/i });
  }

  private async navigateUsingLinkOrHref(link: Locator, fallbackPath: string): Promise<void> {
    if (await link.isVisible().catch(() => false)) {
      await this.clickElement(link);
      await this.page.waitForLoadState('networkidle');
      return;
    }

    const href = await link.first().getAttribute('href').catch(() => null);
    if (href) {
      await this.goto(href);
      await this.waitHelpers.waitForPageLoad();
      return;
    }

    await this.goto(fallbackPath);
    await this.waitHelpers.waitForPageLoad();
  }

  async navigateToCompras(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.comprasLink, '/picash/purchases');
  }

  async navigateToCreditosInformacion(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.creditosInformacionLink, '/picash/credits');
  }

  async navigateToCreditosUsuarios(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.creditosUsuariosLink, '/picash/credits/passengers');
  }

  async navigateToDispositivosBloqueados(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.dispositivosBloqueadosLink, '/picash/locked_sessions');
  }

  async navigateToErrorCarga(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.errorCargaLink, '/picash/credits/load_file_errors');
  }

  async navigateToIngresoPicash(): Promise<void> {
    await this.navigateUsingLinkOrHref(this.ingresoPicashLink, '/picash');
  }
}

