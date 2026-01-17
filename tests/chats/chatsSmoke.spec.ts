/**
 * Test: Smoke del módulo Chats
 *
 * Valida: Acceso a secciones principales de Chats
 * Flujo: Login → Menú → Chats → Submódulos
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de módulo Chats', () => {
  test('Acceder a secciones principales de Chats', async ({
    page,
    loginPage,
    navigationPage,
    chatsPage
  }, testInfo) => {
    test.setTimeout(120000);

    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Mis chats', async () => {
      await chatsPage.navigateToMisChats();
      await expect(page).toHaveURL(/\/chats\/my_chats/);
      await loginPage.takeScreenshot(testInfo, '03 - Mis chats');
    });

    await test.step('Ir a Todos los chats', async () => {
      await chatsPage.navigateToTodosChats();
      await expect(page).toHaveURL(/\/chats\/index/);
      await loginPage.takeScreenshot(testInfo, '04 - Todos los chats');
    });

    await test.step('Ir a Agentes', async () => {
      await chatsPage.navigateToAgentes();
      await expect(page).toHaveURL(/\/chats\/agents_index/);
      await loginPage.takeScreenshot(testInfo, '05 - Agentes');
    });

    await test.step('Ir a Reclamaciones inbox', async () => {
      await chatsPage.navigateToReclamaciones();
      await expect(page).toHaveURL(/\/chats\/claims/);
      await loginPage.takeScreenshot(testInfo, '06 - Reclamaciones inbox');
    });

    await test.step('Ir a Chat central inbox', async () => {
      await chatsPage.navigateToChatCentralInbox();
      await expect(page).toHaveURL(/\/chats\/central/);
      await loginPage.takeScreenshot(testInfo, '07 - Chat central inbox');
    });
  });
});
