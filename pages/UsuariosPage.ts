import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * UsuariosPage - Módulo de Usuarios
 * Maneja búsqueda de usuarios, filtros y navegación por secciones
 */
export class UsuariosPage extends BasePage {
  private readonly usuariosLink: Locator;
  private readonly emailInput: Locator;
  private readonly buscarButton: Locator;
  private readonly tablaUsuarios: Locator;
  private readonly cerrarHistorialButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usuariosLink = this.sideNav.getByRole('link', { name: /Usuarios/i });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.tablaUsuarios = page.getByRole('table');
    this.cerrarHistorialButton = page.locator('span:nth-child(3) > .w-6 > path');
  }

  /**
   * Espera a que el loader desaparezca
   * Trump tiene un loader específico que puede bloquear interacciones
   */
  private async waitForLoading(): Promise<void> {
    try {
      await this.page.waitForFunction(() => {
        const el = document.querySelector('#loading_screen') as HTMLElement | null;
        if (!el) return true;
        const style = window.getComputedStyle(el);
        return (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          el.offsetParent === null
        );
      }, { timeout: 9000 });
    } catch (_) {
      // Silenciar error si loader no existe o ya desapareció
    }
  }

  /**
   * Click robusto que espera loader y reintenta
   */
  private async clickWithRetry(locator: Locator, maxAttempts = 3): Promise<void> {
    await this.waitForLoading();

    for (let i = 0; i < maxAttempts; i++) {
      try {
        await locator.click({ timeout: 10000 });
        break;
      } catch (e) {
        await this.waitForLoading();
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        if (i === maxAttempts - 1) throw e;
      }
    }

    await this.waitForLoading();
  }

  async navigateToUsuarios(): Promise<void> {
    await expect(this.usuariosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickWithRetry(this.usuariosLink);
    
    const tablaVisible = await this.tablaUsuarios.isVisible().catch(() => false);
    if (!tablaVisible) {
      await this.page.waitForLoadState('networkidle').catch(() => undefined);
    }
    await expect(this.emailInput).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  async searchByEmail(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill('');
    await this.emailInput.type(email, { delay: 100 });
    
    await expect(this.buscarButton).toBeEnabled({ timeout: 15000 });
    await this.clickElement(this.buscarButton);

    const resultsRow = this.page.locator('table tbody tr').first();
    const emptyState = this.page.getByText(/sin resultados|no hay resultados|no records|no data/i);

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(resultsRow).toBeVisible({ timeout: testConfig.timeouts.long }),
        expect(emptyState).toBeVisible({ timeout: testConfig.timeouts.long })
      ]);
    }, 2);
  }

  async openHistorial(): Promise<void> {
    const historialLink = this.page
      .locator('table tbody tr')
      .first()
      .getByRole('link', { name: 'Historial de cambios' });

    await expect(historialLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickWithRetry(historialLink);
  }

  async closeHistorial(): Promise<void> {
    await expect(this.cerrarHistorialButton).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.cerrarHistorialButton);
  }

  async navigateToSeccion(seccionName: string, exact = false): Promise<void> {
    if (!(await this.sideNav.isVisible().catch(() => false))) {
      const menuButton = this.page.locator('#ham-menu');
      if (await menuButton.isVisible().catch(() => false)) {
        await menuButton.click({ force: true });
        await expect(this.sideNav).toBeVisible({ timeout: testConfig.timeouts.long });
      }
    }

    const sideNavLink = this.sideNav.getByRole('link', { name: seccionName, exact });
    if (await sideNavLink.count() > 0) {
      await sideNavLink.first().scrollIntoViewIfNeeded();
      await expect(sideNavLink.first()).toBeVisible({ timeout: testConfig.timeouts.long });
      await this.clickWithRetry(sideNavLink.first());
      await this.page.waitForLoadState('networkidle').catch(() => undefined);
      return;
    }

    const pageLink = this.page.getByRole('link', { name: seccionName, exact });
    const pageButton = this.page.getByRole('button', { name: seccionName, exact });
    const target = (await pageLink.count()) > 0 ? pageLink.first() : pageButton.first();

    await expect(target).toBeVisible({ timeout: testConfig.timeouts.long });
    await this.clickWithRetry(target);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async clickActionInFirstRow(actionIndex: number = 3): Promise<void> {
    const tabla = this.page.getByRole('table');
    await expect(tabla).toBeVisible({ timeout: 140000 });
    
    const accion = this.page.locator('table tbody tr').first().locator('a').nth(actionIndex);
    await expect(accion).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(accion);
  }
}

