import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * PoliticasPage - Módulo de Políticas (T&C)
 */
export class PoliticasPage extends BasePage {
  private readonly politicasModule: Locator;
  private readonly tcLink: Locator;

  constructor(page: Page) {
    super(page);
    this.politicasModule = this.sideNav.getByText('Políticas internas', { exact: true });
    this.tcLink = this.sideNav.getByRole('link', { name: /T&C/i });
  }

  async navigateToPoliticas(): Promise<void> {
    await expect(this.politicasModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.politicasModule);
    await expect(this.tcLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  async navigateToTC(): Promise<void> {
    await expect(this.tcLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.tcLink);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/terms_and_conditions/, { timeout: testConfig.timeouts.long });
  }
}

