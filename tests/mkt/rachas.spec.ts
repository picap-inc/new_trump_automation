/**
 * Test: Smoke de Marketing - Rachas
 *
 * Valida: Acceso a Rachas (sin crear data)
 * Flujo: Login → Menú → Marketing → Rachas
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Marketing', () => {
  test('Acceder a Rachas', async ({
    page,
    loginPage,
    navigationPage,
    marketingPageExtended
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Rachas', async () => {
      await marketingPageExtended.navigateToMarketing();
      await marketingPageExtended.navigateToRachas();
      await expect(page).toHaveURL(/\/streak_configs/);
      await loginPage.takeScreenshot(testInfo, '03 - Rachas');
    });
  });
});
