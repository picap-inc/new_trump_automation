import { Page, Locator, expect } from '@playwright/test';
import { WaitHelpers } from '../utils/wait-helpers';
import { ScreenshotHelper } from '../utils/screenshot-helper';
import { currentEnv } from '../config/environments';
import { testConfig } from '../config/test-config';

/**
 * BasePage - Clase padre de todos los Page Objects
 * Centraliza operaciones comunes de UI
 */
export class BasePage {
  protected waitHelpers: WaitHelpers;
  protected sideNav: Locator;

  constructor(protected page: Page) {
    this.waitHelpers = new WaitHelpers(page);
    this.sideNav = page.locator('#mySidenav');
  }

  /**
   * Garantiza que la página esté viva.
   * Si se cerró, crea una nueva página (y contexto si es necesario).
   */
  protected async ensurePageAlive(): Promise<void> {
    if (!this.page.isClosed()) return;

    const context = this.page.context();
    let newPage: Page | null = null;

    try {
      if (context && typeof (context as any).isClosed === 'function' && !(context as any).isClosed()) {
        newPage = await context.newPage();
      } else if (context?.browser?.()) {
        const newContext = await context.browser()!.newContext();
        newPage = await newContext.newPage();
      }
    } catch (_) {
      // Si no se puede crear página, se intentará nuevamente en la llamada siguiente
    }

    if (newPage) {
      this.page = newPage;
      this.waitHelpers = new WaitHelpers(this.page);
      this.sideNav = this.page.locator('#mySidenav');
    }
  }

  /**
   * Expone una página viva para uso en specs.
   */
  async getLivePage(): Promise<Page> {
    await this.ensurePageAlive();
    return this.page;
  }

  protected async waitForLoadingOverlay(): Promise<void> {
    const loadingScreen = this.page.locator('#loading_screen');
    if (await loadingScreen.isVisible().catch(() => false)) {
      await loadingScreen.waitFor({ state: 'hidden', timeout: testConfig.timeouts.long }).catch(() => undefined);
    }
    const loader = this.page.locator('.loading-indicator');
    if (await loader.isVisible().catch(() => false)) {
      await loader.waitFor({ state: 'hidden', timeout: testConfig.timeouts.long }).catch(() => undefined);
    }
  }

  protected async safeGotoUrl(
    url: string,
    options: { waitUntil?: 'domcontentloaded' | 'load'; timeout?: number; waitForUrl?: string | RegExp; retries?: number } = {}
  ): Promise<void> {
    const {
      waitUntil = 'domcontentloaded',
      timeout = testConfig.timeouts.long,
      waitForUrl,
      retries = 2
    } = options;

    for (let attempt = 1; attempt <= retries; attempt += 1) {
      await this.ensurePageAlive();
      try {
        await this.page.goto(url, { waitUntil, timeout });
        if (waitForUrl) {
          await this.page.waitForURL(waitForUrl, { timeout }).catch(() => undefined);
        }
        await this.waitHelpers.waitForPageLoad();
        return;
      } catch (error) {
        const message = String(error);
        const isRetryable =
          message.includes('net::ERR_ABORTED') ||
          message.includes('frame was detached') ||
          message.includes('Execution context was destroyed') ||
          message.includes('Timeout') ||
          message.includes('Target page, context or browser has been closed');
        if (attempt >= retries || !isRetryable) {
          return;
        }
        await this.ensurePageAlive();
        await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
        await this.page.reload({ waitUntil: 'domcontentloaded' }).catch(() => undefined);
      }
    }
  }

  async goto(path: string = ''): Promise<void> {
    const url = `${currentEnv.baseURL}${path}`;
    await this.safeGotoUrl(url);
  }

  async clickElement(locator: Locator): Promise<void> {
    await this.ensurePageAlive();
    try {
      await this.waitHelpers.waitForElement(locator);
      await this.waitForLoadingOverlay();
      await locator.click();
    } catch (error) {
      if (String(error).includes('intercepts pointer events')) {
        await this.waitForLoadingOverlay();
        await locator.click({ force: true });
      }
    }
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitHelpers.waitForElement(locator);
    await locator.fill(text);
  }

  async takeScreenshot(testInfo: any, label: string, fullPage = true): Promise<void> {
    await ScreenshotHelper.attach(this.page, testInfo, label, fullPage);
  }

  async waitForText(text: string, timeout = 10000): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible({ timeout });
  }

  async expectURL(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  async waitForURL(pattern: string | RegExp, timeout = 30000): Promise<void> {
    await this.page.waitForURL(pattern, { timeout });
  }

  /**
   * MPC: click sincronizado con cambio de URL y carga estable
   */
  async clickAndWaitForURL(
    locator: Locator,
    url: string | RegExp,
    timeout = testConfig.timeouts.long
  ): Promise<void> {
    await this.ensurePageAlive();
    await this.waitHelpers.waitForElement(locator);
    try {
      await Promise.all([
        this.page.waitForURL(url, { timeout }),
        locator.click()
      ]);
    } catch (error) {
      await this.ensurePageAlive();
      if (!this.page.isClosed() && (typeof url === 'string' ? this.page.url().includes(url) : url.test(this.page.url()))) {
        return;
      }
      const href = await locator.getAttribute('href').catch(() => null);
      if (href) {
        const resolved = new URL(href, this.page.url()).toString();
        await this.safeGotoUrl(resolved, { waitForUrl: url });
        return;
      }
      return;
    }
    await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Click con force: true
   * Usar solo cuando Material-UI u otros frameworks mantienen overlays
   */
  async forceClick(locator: Locator): Promise<void> {
    await this.waitHelpers.waitForElement(locator);
    await locator.click({ force: true });
  }

  /**
   * Scroll a elemento antes de interactuar
   * Útil para elementos fuera de viewport
   */
  async scrollAndClick(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await this.clickElement(locator);
  }
}

