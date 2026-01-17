/**
 * Test: Smoke de Monitoreo - Revalidación
 *
 * Valida: Acceso a la cola de revalidación
 * Flujo: Login → Menú → Monitoreo → Revalidación
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Monitoreo', () => {
  test('Acceder a Revalidación', async ({
    page,
    loginPage,
    navigationPage,
    monitoreoPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Revalidación', async () => {
      await monitoreoPage.navigateToRevalidacion();
      await expect(page).toHaveURL(/\/revalidation_queues/);
      await loginPage.takeScreenshot(testInfo, '03 - Revalidación');
    });
  });
});
