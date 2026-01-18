/**
 * Test: Validar módulo Campañas Codes
 * 
 * Valida: Acceso a Campañas Codes
 * Flujo: Login → Menú → Marketing → Campañas Codes
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Campañas Codes', () => {
  test('Validar módulo Campañas Codes', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Campañas Codes', async () => {
      await gotoMarketingLink(page, /Campañas Codes/i, '/promo_code_campaigns');
      await loginPage.takeScreenshot(testInfo, '01 - Campañas Codes');
    });
  });
});
