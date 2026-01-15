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

  async goto(path: string = ''): Promise<void> {
    const url = `${currentEnv.baseURL}${path}`;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.page.goto(url);
        await this.waitHelpers.waitForPageLoad();
        return;
      } catch (error) {
        if (attempt === 3) {
          throw error;
        }
        await this.page.waitForTimeout(1000 * attempt);
      }
    }
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

  /**
   * MPC: click sincronizado con cambio de URL y carga estable
   */
  async clickAndWaitForURL(
    locator: Locator,
    url: string | RegExp,
    timeout = testConfig.timeouts.long
  ): Promise<void> {
    await this.waitHelpers.waitForElement(locator);
    await Promise.all([
      this.page.waitForURL(url, { timeout }),
      locator.click()
    ]);
    await this.page.waitForLoadState('networkidle');
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

