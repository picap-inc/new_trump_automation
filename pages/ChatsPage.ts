import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * ChatsPage - Módulo de Chats
 */
export class ChatsPage extends BasePage {
  private readonly chatsModule: Locator;

  constructor(page: Page) {
    super(page);
    this.chatsModule = page.locator('#mySidenav').getByText('Chats', { exact: true });
  }

  async navigateToChats(): Promise<void> {
    await expect(this.chatsModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.chatsModule);
  }
}

