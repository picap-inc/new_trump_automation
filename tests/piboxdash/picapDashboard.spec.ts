/**
 * Test: Smoke de Pibox - Picap Dashboard
 *
 * Valida: Acceso a Picap Dashboard desde menú Pibox
 * Flujo: Login → Menú → Pibox → Menú Pibox → Picap Dashboard
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Smoke de Pibox', () => {
  test('Acceder a Picap Dashboard', async ({
    page,
    loginPage,
    navigationPage,
    piboxDashboardPage
  }, testInfo) => {
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Pibox', async () => {
      await piboxDashboardPage.navigateToPibox();
      await loginPage.takeScreenshot(testInfo, '03 - Pibox');
    });

    await test.step('Abrir menú Pibox', async () => {
      await piboxDashboardPage.openPiboxSideMenu();
      await loginPage.takeScreenshot(testInfo, '04 - Menú Pibox');
    });

    await test.step('Ir a Picap Dashboard', async () => {
      await piboxDashboardPage.navigateToPicapDashboard();
      await expect(page).toHaveURL(/\/$/);
      await loginPage.takeScreenshot(testInfo, '05 - Picap Dashboard');
    });
  });
});
