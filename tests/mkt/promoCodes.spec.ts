/**
 * Test: Validar módulo Promo Codes
 * 
 * Valida: Acceso a Promo Codes
 * Flujo: Login → Menú → Marketing → Promo Codes
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Promo Codes', () => {
  test('Validar módulo Promo Codes', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Promo Codes', async () => {
      await gotoMarketingLink(page, /Promo Codes/i, '/promo_codes');
      await loginPage.takeScreenshot(testInfo, '01 - Promo Codes');
    });
  });
});
