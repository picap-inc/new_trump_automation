/**
 * Test: Smoke de Marketing - Dashboard
 *
 * Valida: Acceso y filtro de ciudad en dashboard
 * Flujo: Login → Menú → Marketing → Dashboard
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Smoke de Marketing', () => {
  test('Acceder al Dashboard y filtrar por ciudad', async ({
    page,
    loginPage,
    marketingPage
  }, testInfo) => {
    await test.step('Ir a Dashboard', async () => {
      await page.goto('https://admin.picap.io/marketing_dashboard', { waitUntil: 'domcontentloaded' });
      await marketingPage.verifyDashboardLoaded();
      await expect(page).toHaveURL(/\/marketing_dashboard/);
      await loginPage.takeScreenshot(testInfo, '01 - Dashboard');
    });

    await test.step('Aplicar filtro de ciudad', async () => {
      await marketingPage.filterDashboardByCity('Bogota');
      await loginPage.takeScreenshot(testInfo, '02 - Filtro ciudad');
    });
  });
});
