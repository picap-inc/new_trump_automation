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
    await this.goto('/');
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginBtn);
    
    // Esperar que el login sea exitoso
    await this.verifyLoginSuccess();
  }

  /**
   * Verifica que el login fue exitoso
   * Espera el mensaje de bienvenida en el dashboard
   * Mensaje actualizado: "Bienvenido(a) a Nuevo Trump"
   */
  async verifyLoginSuccess(): Promise<void> {
    await this.waitForText('Bienvenido(a) a Nuevo Trump', testConfig.timeouts.medium);
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

