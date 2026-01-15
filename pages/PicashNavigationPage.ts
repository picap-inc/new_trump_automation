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
    this.picashModuleLink = this.sideNav.getByRole('link', { name: /Picash/i });
  }

  /**
   * Navega al módulo Picash desde el menú principal
   */
  async navigateToPicashModule(): Promise<void> {
    await this.clickAndWaitForURL(this.picashModuleLink, /\/picash\/?$/);
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
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle', { timeout: testConfig.timeouts.long }).catch(() => {});

      console.log('🟢 Botón visible. Intentando abrir menú...');
      await this.menuButton.scrollIntoViewIfNeeded();
      await this.menuButton.hover();
      
      // Click con force para evitar problemas con data-action
      await this.menuButton.click({ force: true });
    } else {
      console.log('ℹ️ Botón de menú no visible. Posiblemente ya está abierto.');
    }

    console.log('🔍 Validando contexto Picash...');
    const picashLink = this.page.getByRole('link', { name: /Compras|Créditos|Dispositivos|Picash/i }).first();

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        this.picashHeading.waitFor({ state: 'visible', timeout: 7000 }),
        picashLink.waitFor({ state: 'visible', timeout: 7000 }),
        this.page.waitForURL(/\/picash/, { timeout: 7000 })
      ]);
    }, 2);

    console.log('✅ Menú lateral de Picash verificado correctamente.');
  }

  /**
   * Navega a una subsección de Picash
   */
  async navigateToSubsection(subsectionName: string): Promise<void> {
    const subsectionLink = this.page.getByRole('link', { name: subsectionName }).first();

    if (await subsectionLink.isVisible().catch(() => false)) {
      await this.clickElement(subsectionLink);
      return;
    }

    const href = await subsectionLink.getAttribute('href').catch(() => null);
    if (href) {
      await this.goto(href);
      await this.waitHelpers.waitForPageLoad();
      return;
    }

    const links = await this.page.locator('a').evaluateAll((elements) =>
      elements
        .map((el) => {
          const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
          const hrefValue = (el as HTMLAnchorElement).getAttribute('href') || '';
          return `${text} -> ${hrefValue}`.trim();
        })
        .filter((value) => value && value !== '->')
    );
    console.warn(`⚠️ [Picash] Enlaces disponibles:\n${links.join('\n')}`);

    throw new Error(`No se encontró la subsección "${subsectionName}" en Picash.`);
  }

  /**
   * Verifica que el heading de Picash esté visible
   */
  async verifyPicashMenuOpen(): Promise<void> {
    await expect(this.picashHeading).toBeVisible({ timeout: 7000 });
  }
}

