import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * TechnicalSupportPage - Módulo Technical support
 */
export class TechnicalSupportPage extends BasePage {
  private readonly technicalSupportModule: Locator;
  private readonly scriptsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.technicalSupportModule = this.sideNav.getByText('Technical support', { exact: true });
    this.scriptsLink = this.sideNav.getByRole('link', { name: /Scripts/i });
  }

  private async ensureTechnicalSupportExpanded(): Promise<void> {
    if (await this.scriptsLink.isVisible().catch(() => false)) {
      return;
    }
    await expect(this.technicalSupportModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.technicalSupportModule);
    await expect(this.scriptsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  async navigateToScripts(): Promise<void> {
    await this.ensureTechnicalSupportExpanded();
    await this.clickElement(this.scriptsLink);
    await this.page.waitForLoadState('networkidle');
  }
}
