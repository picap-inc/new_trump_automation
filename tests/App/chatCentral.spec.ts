/**
 * Test: Smoke de App - Chat central
 *
 * Valida: Acceso a Chat central en App
 * Flujo: Login → Menú → App → Chat central
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de App', () => {
  test('Acceder a Chat central', async ({
    page,
    loginPage,
    navigationPage,
    appPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Chat central', async () => {
      await appPage.navigateToChatCentral();
      await expect(page).toHaveURL(/\/app_central_chats/);
      await loginPage.takeScreenshot(testInfo, '03 - Chat central');
    });
  });
});
