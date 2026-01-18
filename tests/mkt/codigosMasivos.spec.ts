/**
 * Test: Validar módulo Códigos Masivos
 * 
 * Valida: Acceso a Códigos Masivos
 * Flujo: Login → Menú → Marketing → Códigos Masivos
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Códigos Masivos', () => {
  test('Validar módulo Códigos Masivos', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Códigos Masivos', async () => {
      await gotoMarketingLink(page, /Códigos masivos/i, '/promo_code_campaigns/massives');
      await loginPage.takeScreenshot(testInfo, '01 - Códigos Masivos');
    });
  });
});
