/**
 * Test: Smoke de Picash - Dashboard filtros
 *
 * Valida: Acceso a dashboard y filtros básicos (sin crear data)
 * Flujo: Login → Menú → Picash → Dashboard
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Picash', () => {
  test('Aplicar filtros en dashboard Picash', async ({
    page,
    loginPage,
    navigationPage,
    picashNavigationPage,
    picashPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    await test.step('Abrir barra lateral general de navegación', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Navegar al módulo Picash', async () => {
      await picashNavigationPage.navigateToPicashModule();
      await expect(page).toHaveURL(/\/picash\/?$/);
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Picash');
    });

    await test.step('Aplicar filtros en dashboard', async () => {
      await picashPage.navigateToIngresoPicash();
      await picashPage.applyDashboardFilters('Piprime', 'México');
      await loginPage.takeScreenshot(testInfo, '04 - Filtros dashboard');
    });
  });
});
