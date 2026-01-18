/**
 * Test: Smoke de Marketing - Rachas
 *
 * Valida: Acceso a Rachas (sin crear data)
 * Flujo: Login → Menú → Marketing → Rachas
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Smoke de Marketing', () => {
  test('Acceder a Rachas', async ({
    page,
    loginPage
  }, testInfo) => {
    await test.step('Ir a Rachas', async () => {
      await gotoMarketingLink(page, /Rachas/i, '/streak_configs');
      await expect(page).toHaveURL(/\/streak_configs/);
      await loginPage.takeScreenshot(testInfo, '01 - Rachas');
    });
  });
});
