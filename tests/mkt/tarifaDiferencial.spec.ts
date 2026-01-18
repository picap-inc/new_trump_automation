/**
 * Test: Smoke de Marketing - Tarifa diferencial
 *
 * Valida: Acceso a Tarifa diferencial (sin crear data)
 * Flujo: Login → Menú → Marketing → Tarifa diferencial
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';
import { ScreenshotHelper } from '../../utils/screenshot-helper';

test.describe('Smoke de Marketing', () => {
  test('Acceder a Tarifa diferencial', async ({
    page,
    loginPage,
    navigationPage,
    marketingPageExtended
  }, testInfo) => {
    test.setTimeout(180000);
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Ir a Tarifa diferencial', async () => {
      const targetPage = await marketingPageExtended.navigateToTarifaDiferencial();
      await expect(targetPage).toHaveURL(/\/(pricing\/sensitivity_scores|benchmark_routes)/);
      const keyElement = targetPage.locator('table').first();
      await expect(keyElement).toBeVisible();
      await ScreenshotHelper.attach(targetPage, testInfo, '02 - Tarifa diferencial');
    });
  });
});
