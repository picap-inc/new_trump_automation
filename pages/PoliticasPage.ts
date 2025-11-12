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
    this.politicasModule = page.locator('#mySidenav').getByText('Políticas', { exact: true });
    this.tcLink = page.getByRole('link', { name: 'T&C' });
  }

  async navigateToPoliticas(): Promise<void> {
    await expect(this.politicasModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.politicasModule);
    // Esperar a que se expanda el submenú
    await this.waitHelpers.wait(1000);
  }

  async navigateToTC(): Promise<void> {
    await expect(this.tcLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.tcLink);
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(1500);
  }
}

