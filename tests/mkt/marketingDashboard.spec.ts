/**
 * Test: Smoke de Marketing - Dashboard
 *
 * Valida: Acceso y filtro de ciudad en dashboard
 * Flujo: Login → Menú → Marketing → Dashboard
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Marketing', () => {
  test('Acceder al Dashboard y filtrar por ciudad', async ({
    page,
    loginPage,
    navigationPage,
    marketingPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Dashboard', async () => {
      await marketingPage.navigateToMarketing();
      await marketingPage.navigateToDashboard();
      await marketingPage.verifyDashboardLoaded();
      await expect(page).toHaveURL(/\/marketing_dashboard/);
      await loginPage.takeScreenshot(testInfo, '03 - Dashboard');
    });

    await test.step('Aplicar filtro de ciudad', async () => {
      await marketingPage.filterDashboardByCity('Bogota');
      await loginPage.takeScreenshot(testInfo, '04 - Filtro ciudad');
    });
  });
});
