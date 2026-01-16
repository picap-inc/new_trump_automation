import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * PiboxDashboardPage - Módulo Pibox Dashboard
 */
export class PiboxDashboardPage extends BasePage {
  private readonly piboxLink: Locator;
  private readonly menuButton: Locator;
  private readonly picapDashboardLink: Locator;
  private readonly companiasLink: Locator;
  private readonly monitoreoLink: Locator;
  private readonly listaServiciosLink: Locator;
  private readonly crearCompaniaLink: Locator;
  private readonly paquetesLink: Locator;
  private readonly peticionOperacionesLink: Locator;

  constructor(page: Page) {
    super(page);
    this.piboxLink = page.getByRole('link', { name: /Pibox Dashboard/i });
    this.menuButton = page.locator('#ham-menu');
    this.picapDashboardLink = page.getByRole('link', { name: /Picap Dashboard/i });
    this.companiasLink = page.getByRole('link', { name: /Compañías/i });
    this.monitoreoLink = page.getByRole('link', { name: /Monitoreo/i });
    this.listaServiciosLink = page.getByRole('link', { name: /Lista de servicios/i });
    this.crearCompaniaLink = page.getByRole('link', { name: /Crear compañía/i });
    this.paquetesLink = page.getByRole('link', { name: /Paquetes/i });
    this.peticionOperacionesLink = page.getByRole('link', { name: /Peticiones de operaciones/i });
  }

  private async waitForHref(href: string | null): Promise<void> {
    if (!href) return;
    const safeHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matcher = new RegExp(safeHref);
    if (matcher.test(this.page.url())) return;
    await this.page.waitForURL(matcher, { timeout: testConfig.timeouts.long }).catch(() => undefined);
  }

  async navigateToPibox(): Promise<void> {
    if (await this.piboxLink.isVisible().catch(() => false)) {
      const href = await this.piboxLink.getAttribute('href').catch(() => null);
      await this.piboxLink.scrollIntoViewIfNeeded();
      try {
        await this.forceClick(this.piboxLink);
      } catch (_) {
        if (href) {
          await this.goto(href);
          await this.waitHelpers.waitForPageLoad();
          return;
        }
      }
      await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
      await this.waitForHref(href);
      return;
    }

    await this.goto('/pibox');
    await this.waitHelpers.waitForPageLoad();
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
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle', { timeout: testConfig.timeouts.long }).catch(() => {});
      await this.menuButton.scrollIntoViewIfNeeded();
      await this.menuButton.hover();
      
      // Click con force para evitar problemas con data-action
      await this.menuButton.click({ force: true });
      await expect(this.sideNav).toBeVisible({ timeout: testConfig.timeouts.long });
    }
  }

  async navigateToListaServicios(): Promise<void> {
    await expect(this.listaServiciosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    const href = await this.listaServiciosLink.getAttribute('href').catch(() => null);
    try {
      await this.forceClick(this.listaServiciosLink);
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    } catch (_) {
      if (href) {
        await this.goto(href);
        await this.waitHelpers.waitForPageLoad();
      }
    }
  }

  async navigateToCrearCompania(): Promise<void> {
    await expect(this.crearCompaniaLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    const href = await this.crearCompaniaLink.getAttribute('href').catch(() => null);
    try {
      await this.forceClick(this.crearCompaniaLink);
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    } catch (_) {
      if (href) {
        await this.goto(href);
        await this.waitHelpers.waitForPageLoad();
      }
    }
  }

  async navigateToPaquetes(): Promise<void> {
    if (await this.paquetesLink.isVisible().catch(() => false)) {
      const href = await this.paquetesLink.getAttribute('href').catch(() => null);
      try {
        await this.forceClick(this.paquetesLink);
      } catch (_) {
        if (href) {
          await this.goto(href);
          await this.waitHelpers.waitForPageLoad();
          return;
        }
      }
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    }

    if (await this.companiasLink.isVisible().catch(() => false)) {
      const href = await this.companiasLink.getAttribute('href').catch(() => null);
      try {
        await this.forceClick(this.companiasLink);
      } catch (_) {
        if (href) {
          await this.goto(href);
          await this.waitHelpers.waitForPageLoad();
          return;
        }
      }
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    }

    await this.goto('/pibox/companies');
    await this.waitHelpers.waitForPageLoad();
  }

  async navigateToCompanias(): Promise<void> {
    if (await this.companiasLink.isVisible().catch(() => false)) {
      const href = await this.companiasLink.getAttribute('href').catch(() => null);
      try {
        await this.forceClick(this.companiasLink);
      } catch (_) {
        if (href) {
          await this.goto(href);
          await this.waitHelpers.waitForPageLoad();
          return;
        }
      }
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    }

    await this.goto('/pibox/companies');
    await this.waitHelpers.waitForPageLoad();
  }

  async navigateToPeticionOperaciones(): Promise<void> {
    await expect(this.peticionOperacionesLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    const href = await this.peticionOperacionesLink.getAttribute('href').catch(() => null);
    try {
      await this.forceClick(this.peticionOperacionesLink);
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    } catch (_) {
      if (href) {
        await this.goto(href);
        await this.waitHelpers.waitForPageLoad();
      }
    }
  }

  async navigateToMonitoreo(): Promise<void> {
    await expect(this.monitoreoLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    const href = await this.monitoreoLink.getAttribute('href').catch(() => null);
    try {
      await this.forceClick(this.monitoreoLink);
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    } catch (_) {
      if (href) {
        await this.goto(href);
        await this.waitHelpers.waitForPageLoad();
      }
    }
  }

  async navigateToPicapDashboard(): Promise<void> {
    await expect(this.picapDashboardLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    const href = await this.picapDashboardLink.getAttribute('href').catch(() => null);
    try {
      await this.forceClick(this.picapDashboardLink);
      await this.page.waitForLoadState('networkidle');
      await this.waitForHref(href);
      return;
    } catch (_) {
      if (href) {
        await this.goto(href);
        await this.waitHelpers.waitForPageLoad();
      }
    }
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

