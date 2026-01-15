import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * ChatsPage - Módulo de Chats
 */
export class ChatsPage extends BasePage {
  private readonly chatsModule: Locator;
  private readonly misChatsLink: Locator;
  private readonly todosChatsLink: Locator;
  private readonly agentesLink: Locator;
  private readonly reclamacionesLink: Locator;
  private readonly chatCentralLink: Locator;

  constructor(page: Page) {
    super(page);
    this.chatsModule = this.sideNav.getByText('Chats', { exact: true });
    this.misChatsLink = this.sideNav.getByRole('link', { name: /Mis Chats/i });
    this.todosChatsLink = this.sideNav.getByRole('link', { name: /Todos los chats/i });
    this.agentesLink = this.sideNav.getByRole('link', { name: /Agentes/i });
    this.reclamacionesLink = this.sideNav.getByRole('link', { name: /Reclamaciones inbox/i });
    this.chatCentralLink = this.sideNav.getByRole('link', { name: /Chat central inbox/i });
  }

  async navigateToChats(): Promise<void> {
    await expect(this.chatsModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.chatsModule);
  }

  private async navigateToChatPath(path: string): Promise<void> {
    await this.goto(path);
    await this.waitHelpers.waitForPageLoad();
  }

  private async ensureChatsExpanded(): Promise<void> {
    if (await this.misChatsLink.isVisible().catch(() => false)) {
      return;
    }
    if (await this.chatsModule.isVisible().catch(() => false)) {
      await this.navigateToChats();
      await expect(this.misChatsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
      return;
    }
    await this.navigateToChatPath('/chats/my_chats');
  }

  async navigateToMisChats(): Promise<void> {
    await this.ensureChatsExpanded();
    if (await this.misChatsLink.isVisible().catch(() => false)) {
      await this.clickElement(this.misChatsLink);
      await this.page.waitForLoadState('networkidle');
      return;
    }
    await this.navigateToChatPath('/chats/my_chats');
  }

  async navigateToTodosChats(): Promise<void> {
    await this.ensureChatsExpanded();
    if (await this.todosChatsLink.isVisible().catch(() => false)) {
      await this.clickElement(this.todosChatsLink);
      await this.page.waitForLoadState('networkidle');
      return;
    }
    await this.navigateToChatPath('/chats/index');
  }

  async navigateToAgentes(): Promise<void> {
    await this.ensureChatsExpanded();
    if (await this.agentesLink.isVisible().catch(() => false)) {
      await this.clickElement(this.agentesLink);
      await this.page.waitForLoadState('networkidle');
      return;
    }
    await this.navigateToChatPath('/chats/agents_index');
  }

  async navigateToReclamaciones(): Promise<void> {
    await this.ensureChatsExpanded();
    if (await this.reclamacionesLink.isVisible().catch(() => false)) {
      await this.clickElement(this.reclamacionesLink);
      await this.page.waitForLoadState('networkidle');
      return;
    }
    await this.navigateToChatPath('/chats/claims');
  }

  async navigateToChatCentralInbox(): Promise<void> {
    await this.ensureChatsExpanded();
    if (await this.chatCentralLink.isVisible().catch(() => false)) {
      await this.clickElement(this.chatCentralLink);
      await this.page.waitForLoadState('networkidle');
      return;
    }
    await this.navigateToChatPath('/chats/central');
  }
}

