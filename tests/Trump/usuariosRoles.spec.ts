/**
 * Test: Smoke de TRUMP - Usuarios/Roles
 *
 * Valida: Acceso a Usuarios/Roles
 * Flujo: Login → Menú → TRUMP → Usuarios/Roles
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de TRUMP', () => {
  test('Acceder a Usuarios/Roles', async ({
    page,
    loginPage,
    navigationPage,
    trumpPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Usuarios/Roles', async () => {
      await trumpPage.navigateToTrump();
      await trumpPage.navigateToUsuariosRoles();
      await expect(page).toHaveURL(/\/usuarios-roles/);
      await loginPage.takeScreenshot(testInfo, '03 - Usuarios Roles');
    });
  });
});
