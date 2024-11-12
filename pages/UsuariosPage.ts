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
  private readonly historialLink: Locator;
  private readonly cerrarHistorialButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usuariosLink = page.getByRole('link', { name: 'users Usuarios' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.tablaUsuarios = page.getByRole('table');
    this.historialLink = page.getByRole('link', { name: 'Historial de cambios' });
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
        await this.waitHelpers.wait(500);
        if (i === maxAttempts - 1) throw e;
      }
    }

    await this.waitForLoading();
  }

  async navigateToUsuarios(): Promise<void> {
    await expect(this.usuariosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickWithRetry(this.usuariosLink);
    
    await expect(this.tablaUsuarios).toBeVisible({ timeout: 15000 });
    await expect(this.emailInput).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  async searchByEmail(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill('');
    await this.emailInput.type(email, { delay: 100 });
    
    await expect(this.buscarButton).toBeEnabled({ timeout: 15000 });
    await this.clickElement(this.buscarButton);
    await this.waitHelpers.wait(2000);
  }

  async openHistorial(): Promise<void> {
    await expect(this.historialLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickWithRetry(this.historialLink);
  }

  async closeHistorial(): Promise<void> {
    await expect(this.cerrarHistorialButton).toBeVisible({ timeout: 5000 });
    await this.clickElement(this.cerrarHistorialButton);
  }

  async navigateToSeccion(seccionName: string, exact = false): Promise<void> {
    const link = this.page.getByRole('link', { name: seccionName, exact });
    await expect(link).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickWithRetry(link);
    await this.waitHelpers.wait(1000);
  }

  async clickActionInFirstRow(actionIndex: number = 3): Promise<void> {
    const tabla = this.page.getByRole('table');
    await expect(tabla).toBeVisible({ timeout: 140000 });
    
    const accion = this.page.locator('table tbody tr').first().locator('a').nth(actionIndex);
    await expect(accion).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(accion);
  }
}

