/**
 * Test: Smoke de Technical support - Scripts
 *
 * Valida: Acceso a Scripts en Technical support
 * Flujo: Login → Menú → Technical support → Scripts
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Technical support', () => {
  test('Acceder a Scripts', async ({
    page,
    loginPage,
    navigationPage,
    technicalSupportPage
  }, testInfo) => {
    test.setTimeout(60000);

    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Scripts', async () => {
      await technicalSupportPage.navigateToScripts();
      await expect(page).toHaveURL(/\/tech_support\/scripts/);
      await loginPage.takeScreenshot(testInfo, '03 - Scripts');
    });
  });
});
