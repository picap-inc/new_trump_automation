import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * NavigationPage - Manejo de navegación principal y menú lateral
 */
export class NavigationPage extends BasePage {
  private menuButton: Locator;
  private menuContent: Locator;
  private profileButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#ham-menu');
    this.menuContent = page.locator('#mySidenav');
    this.profileButton = page.getByRole('button', { name: 'Abrir menú de usuario' });
    this.logoutLink = page.getByRole('link', { name: 'Cerrar sesión' });
  }

  private refreshLocators(): void {
    this.menuButton = this.page.locator('#ham-menu');
    this.menuContent = this.page.locator('#mySidenav');
    this.profileButton = this.page.getByRole('button', { name: 'Abrir menú de usuario' });
    this.logoutLink = this.page.getByRole('link', { name: 'Cerrar sesión' });
  }

  /**
   * Abre el menú lateral de navegación
   * 
   * SVG botón: <svg id="ham-menu" data-action="click->layout#openSidenav">
   * Espera 5s post-login: UI necesita cargar completamente
   * Espera animación: Menú tiene transición CSS
   * Force click: data-action puede interferir con eventos normales
   */
  async openSideMenu(): Promise<void> {
    console.log('🔍 Esperando que el botón del menú esté disponible...');
    await this.ensurePageAlive();

    const currentUrl = this.page.url();
    if (currentUrl === 'about:blank' || currentUrl.includes('/sessions')) {
      await this.safeGoto('/', { waitForUrl: /\/(?!sessions)/ });
    }

    const hasVisibleLinks = await this.sideNav.getByRole('link').first().isVisible().catch(() => false);
    if (hasVisibleLinks) {
      console.log('✅ Menú lateral ya está visible.');
      return;
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: testConfig.timeouts.long }).catch(() => {});
    await this.page
      .waitForURL((url) => !url.pathname.includes('/sessions'), { timeout: testConfig.timeouts.long })
      .catch(() => {});
    if (this.page.url().includes('/sessions')) {
      throw new Error('❌ Sesión inválida: la página redirigió al login.');
    }
    
    // Esperar que el botón esté en el DOM y visible
    await expect(this.menuButton).toBeAttached({ timeout: testConfig.timeouts.long });
    await expect(this.menuButton).toBeVisible({ timeout: testConfig.timeouts.long });
    await expect(this.menuButton).toBeEnabled({ timeout: testConfig.timeouts.long });
    
    // Asegurar que no esté oculto por clases CSS
    await this.page.waitForFunction(() => {
      const el = document.getElementById('ham-menu');
      return el && !el.classList.contains('hidden');
    }, { timeout: testConfig.timeouts.medium });

    // Scroll al elemento para asegurar visibilidad
    await this.menuButton.scrollIntoViewIfNeeded();

    console.log('🖱️ Haciendo clic en el botón del menú...');
    
    try {
      await this.menuButton.click({ timeout: 5000 });
    } catch (error) {
      await this.recreatePage();
      this.refreshLocators();
      await this.menuButton.waitFor({ state: 'visible', timeout: testConfig.timeouts.long });
      await this.menuButton.click({ force: true, timeout: 5000 });
    }

    // Verificar que el menú esté visible (reintento si fue un toggle fallido)
    let menuVisible = await this.menuContent.isVisible().catch(() => false);
    if (!menuVisible) {
      for (let i = 0; i < 2; i++) {
        try {
          await this.menuButton.click({ force: true, timeout: 5000 });
          await expect(this.menuContent).toBeVisible({ timeout: testConfig.timeouts.medium });
          menuVisible = true;
          break;
        } catch (_) {
          await expect(this.menuButton).toBeVisible({ timeout: testConfig.timeouts.short });
        }
      }
    }

    if (!menuVisible) {
      const hasVisibleLinks = await this.sideNav.getByRole('link').first().isVisible().catch(() => false);
      if (!hasVisibleLinks) {
        throw new Error('❌ El menú lateral no quedó visible después de los reintentos.');
      }
      console.warn('⚠️ Menú no visible, pero hay enlaces accesibles.');
      return;
    }

    console.log('✅ Menú lateral abierto y visible.');
  }

  /**
   * Navega a un módulo específico del menú
   */
  async navigateToModule(moduleName: string): Promise<void> {
    const moduleLink = this.sideNav.getByText(moduleName, { exact: true });
    await expect(moduleLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(moduleLink);
  }

  /**
   * Abre el menú de usuario (foto de perfil)
   * 
   * Retry: Material-UI puede tener overlays temporales
   */
  async openUserMenu(): Promise<void> {
    await this.profileButton.waitFor({ state: 'visible' });
    await this.profileButton.scrollIntoViewIfNeeded();

    let maxAttempts = 3;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await this.clickElement(this.profileButton);
        await expect(this.logoutLink).toBeVisible({ timeout: testConfig.timeouts.short });
        break;
      } catch (error) {
        console.warn(`Intento ${i + 1} fallido al abrir menú de usuario.`);
        if (i === maxAttempts - 1) throw error;
      }
    }
  }

  /**
   * Cierra sesión del sistema
   * 
   * Promise.all: Sincroniza click con navegación de logout
   */
  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.clickElement(this.logoutLink);
  }

  /**
   * Cierra menú de usuario si está abierto
   */
  async closeUserMenuIfOpen(): Promise<void> {
    const isOpen = await this.logoutLink.isVisible().catch(() => false);
    if (isOpen) {
      // Intentar cerrar con toggle del botón, luego Escape y click fuera
      try {
        await this.profileButton.click({ timeout: testConfig.timeouts.short });
      } catch (_) {
        // Ignorar y continuar con otros métodos
      }

      if (await this.logoutLink.isVisible().catch(() => false)) {
        await this.page.keyboard.press('Escape').catch(() => {});
      }

      if (await this.logoutLink.isVisible().catch(() => false)) {
        await this.page.mouse.click(5, 5);
      }

      await expect(this.logoutLink).toBeHidden({ timeout: testConfig.timeouts.medium });
    }
  }
}

