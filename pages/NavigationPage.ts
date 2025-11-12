import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * NavigationPage - Manejo de navegación principal y menú lateral
 */
export class NavigationPage extends BasePage {
  private readonly menuButton: Locator;
  private readonly menuContent: Locator;
  private readonly profileButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#ham-menu');
    this.menuContent = page.locator('#mySidenav');
    this.profileButton = page.getByRole('button', { name: 'Abrir menú de usuario' });
    this.logoutLink = page.getByRole('link', { name: 'Cerrar sesión' });
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
    
    // Esperar que el botón esté en el DOM y visible
    await expect(this.menuButton).toBeAttached({ timeout: testConfig.timeouts.medium });
    
    // Asegurar que no esté oculto por clases CSS
    await this.page.waitForFunction(() => {
      const el = document.getElementById('ham-menu');
      return el && !el.classList.contains('hidden');
    }, { timeout: testConfig.timeouts.medium });

    console.log('⏳ Esperando carga completa post-login (5s)...');
    await this.waitHelpers.wait(testConfig.waits.afterLogin);

    // Scroll al elemento para asegurar visibilidad
    await this.menuButton.scrollIntoViewIfNeeded();

    console.log('🖱️ Haciendo clic en el botón del menú...');
    
    // Intentar click con retry y force si es necesario
    let clickSuccess = false;
    for (let i = 0; i < 3; i++) {
      try {
        if (i === 0) {
          // Primer intento: click normal
          await this.menuButton.click({ timeout: 5000 });
        } else {
          // Reintentos: force click (data-action puede bloquear)
          await this.menuButton.click({ force: true, timeout: 5000 });
        }
        clickSuccess = true;
        break;
      } catch (error) {
        console.warn(`Click intento ${i + 1} falló, reintentando...`);
        if (i < 2) {
          await this.waitHelpers.wait(1000);
        }
      }
    }

    if (!clickSuccess) {
      throw new Error('❌ No se pudo hacer click en el menú después de 3 intentos');
    }

    console.log('⏳ Esperando animación del menú (1.5s)...');
    await this.waitHelpers.wait(testConfig.waits.menuAnimation);

    // Verificar que el menú esté visible
    const menuVisible = await this.menuContent.isVisible().catch(() => false);
    if (menuVisible) {
      console.log('✅ Menú lateral abierto y visible.');
    } else {
      console.warn('⚠️ El menú puede no estar visible, continuando...');
    }
  }

  /**
   * Navega a un módulo específico del menú
   */
  async navigateToModule(moduleName: string): Promise<void> {
    const moduleLink = this.page.getByText(moduleName);
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
        await this.waitHelpers.wait(testConfig.waits.shortDelay);
        
        if (await this.logoutLink.isVisible()) {
          break;
        }
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
      // Click fuera del menú para cerrarlo
      await this.page.locator('div').filter({ hasText: 'Automatizacion BdbdAbrir men' }).nth(2).click();
    }
  }
}

