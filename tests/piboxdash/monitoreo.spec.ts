/**
 * Test: Smoke de Pibox - Monitoreo
 *
 * Valida: Acceso a Monitoreo en Pibox
 * Flujo: Login → Menú → Pibox → Menú Pibox → Monitoreo
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Pibox', () => {
  test('Acceder a Monitoreo', async ({
    page,
    loginPage,
    navigationPage,
    piboxDashboardPage
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

    await test.step('Ir a Pibox', async () => {
      await piboxDashboardPage.navigateToPibox();
      await loginPage.takeScreenshot(testInfo, '03 - Pibox');
    });

    await test.step('Abrir menú Pibox', async () => {
      await piboxDashboardPage.openPiboxSideMenu();
      await loginPage.takeScreenshot(testInfo, '04 - Menú Pibox');
    });

    await test.step('Ir a Monitoreo', async () => {
      await piboxDashboardPage.navigateToMonitoreo();
      await expect(page).toHaveURL(/\/pibox\/monitoring/);
      await loginPage.takeScreenshot(testInfo, '05 - Monitoreo');
    });
  });
});
