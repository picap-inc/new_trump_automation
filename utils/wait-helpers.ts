import { Page, Locator, expect } from '@playwright/test';
import { testConfig } from '../config/test-config';

/**
 * WaitHelpers - Estrategias de espera centralizadas
 * Separar de Page Objects permite configurar políticas de retry globalmente
 */
export class WaitHelpers {
  constructor(private page: Page) {}

  /**
   * Espera elemento visible + enabled
   * Previene clicks fallidos en SPAs donde elemento aparece pero no es interactuable
   */
  async waitForElement(locator: Locator, timeout = testConfig.timeouts.medium): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
  }

  /**
   * Espera networkidle para cargas completas
   * Crítico en SPAs: DOM renderiza antes que los datos
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Retry con backoff exponencial (1s, 2s, 3s...)
   * Para elementos dinámicos: modals, toasts, loaders
   */
  async waitWithRetry<T>(
    action: () => Promise<T>,
    maxAttempts = testConfig.retries.element
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.page.waitForTimeout(1000 * attempt);
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Espera por texto visible en la página
   */
  async waitForText(text: string, timeout = testConfig.timeouts.medium): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible({ timeout });
  }

  /**
   * Espera por URL específica o patrón
   */
  async waitForURL(pattern: string | RegExp, timeout = testConfig.timeouts.long): Promise<void> {
    await this.page.waitForURL(pattern, { timeout });
  }

  /**
   * Espera fija (usar solo cuando sea absolutamente necesario)
   * Preferir esperas dinámicas cuando sea posible
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}

