import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * LoginPage - Flujo de autenticación en Trump
 */
export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly welcomeHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#username');
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    this.loginBtn = page.getByRole('button', { name: 'Ingresar' });
    this.welcomeHeading = page.getByRole('heading', { name: 'Bienvenido(a) a Nuevo Trump' });
  }

  /**
   * Ejecuta flujo completo de login
   * 
   * Promise.all: Sincroniza click con navegación (evita race condition)
   * Timeout 20s: Backend puede tardar en responder
   */
  async login(email: string, password: string): Promise<void> {
    for (let attempt = 1; attempt <= 2; attempt++) {
      await this.goto('/');
      const userMenuButton = this.page.getByRole('button', { name: /Abrir menú de usuario/i });
      const sideNav = this.page.locator('#mySidenav');
      const alreadyLoggedIn = (await Promise.all([
        this.welcomeHeading.isVisible().catch(() => false),
        userMenuButton.isVisible().catch(() => false),
        sideNav.isVisible().catch(() => false)
      ])).some(Boolean);

      if (alreadyLoggedIn) {
        return;
      }

      try {
        await this.emailInput.waitFor({ state: 'visible', timeout: testConfig.timeouts.long });
      } catch (error) {
        if (attempt === 2) {
          throw error;
        }
        await this.page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
        continue;
      }

      await this.fillInput(this.emailInput, email);
      await this.fillInput(this.passwordInput, password);
      await this.waitHelpers.waitForElement(this.loginBtn);
      await this.loginBtn.click({ noWaitAfter: true });

      try {
        await this.verifyLoginSuccess();
        return;
      } catch (error) {
        if (attempt === 2) throw error;
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        const stillLoggedIn = (await Promise.all([
          this.welcomeHeading.isVisible().catch(() => false),
          userMenuButton.isVisible().catch(() => false),
          sideNav.isVisible().catch(() => false)
        ])).some(Boolean);
        if (stillLoggedIn) {
          return;
        }
        await this.page.goto('https://admin.picap.io/sessions/new', { waitUntil: 'domcontentloaded' }).catch(() => {});
        await this.emailInput.waitFor({ state: 'visible', timeout: testConfig.timeouts.medium });
      }
    }
  }

  /**
   * Verifica que el login fue exitoso
   * Espera el mensaje de bienvenida en el dashboard
   * Mensaje actualizado: "Bienvenido(a) a Nuevo Trump"
   */
  async verifyLoginSuccess(): Promise<void> {
    const userMenuButton = this.page.getByRole('button', { name: /Abrir menú de usuario/i });
    const sideNav = this.page.locator('#mySidenav');

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        this.welcomeHeading.waitFor({ state: 'visible', timeout: testConfig.timeouts.medium }),
        userMenuButton.waitFor({ state: 'visible', timeout: testConfig.timeouts.medium }),
        sideNav.waitFor({ state: 'visible', timeout: testConfig.timeouts.medium }),
        this.page.waitForURL((url) => !url.pathname.includes('/sessions'), { timeout: testConfig.timeouts.medium })
      ]);
    }, 3);
  }

  /**
   * Verifica que estamos en la página de login
   */
  async verifyLoginPage(): Promise<void> {
    await this.waitHelpers.waitForElement(this.emailInput);
  }

  /**
   * Solo navega a login sin hacer login
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/');
  }
}

