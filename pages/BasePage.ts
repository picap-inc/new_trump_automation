import { Page, Locator, expect } from '@playwright/test';
import { WaitHelpers } from '../utils/wait-helpers';
import { ScreenshotHelper } from '../utils/screenshot-helper';
import { currentEnv } from '../config/environments';

/**
 * BasePage - Clase padre de todos los Page Objects
 * Centraliza operaciones comunes de UI
 */
export class BasePage {
  protected waitHelpers: WaitHelpers;

  constructor(protected page: Page) {
    this.waitHelpers = new WaitHelpers(page);
  }

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(`${currentEnv.baseURL}${path}`);
    await this.waitHelpers.waitForPageLoad();
  }

  async clickElement(locator: Locator): Promise<void> {
    await this.waitHelpers.waitForElement(locator);
    await locator.click();
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

