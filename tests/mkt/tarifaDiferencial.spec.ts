/**
 * Test: Smoke de Marketing - Tarifa diferencial
 *
 * Valida: Acceso a Tarifa diferencial (sin crear data)
 * Flujo: Login → Menú → Marketing → Tarifa diferencial
 */

import { test, expect } from '../../fixtures/pages';
import { ScreenshotHelper } from '../../utils/screenshot-helper';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Smoke de Marketing', () => {
  test('Acceder a Tarifa diferencial', async ({
    page,
    loginPage
  }, testInfo) => {
    test.setTimeout(180000);
    await test.step('Ir a Tarifa diferencial', async () => {
      await gotoMarketingLink(page, /Tarifa diferencial/i, '/benchmark_routes');
      await expect(page).toHaveURL(/\/(pricing\/sensitivity_scores|benchmark_routes)/);
      const keyElement = page.locator('table').first();
      await expect(keyElement).toBeVisible();
      await ScreenshotHelper.attach(page, testInfo, '01 - Tarifa diferencial');
    });
  });
});
