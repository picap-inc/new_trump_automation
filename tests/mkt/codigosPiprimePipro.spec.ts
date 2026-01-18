/**
 * Test: Validar módulo Códigos Piprime/Pipro
 * 
 * Valida: Acceso a Códigos Piprime/Pipro
 * Flujo: Login → Menú → Marketing → Códigos Piprime/Pipro
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Códigos Piprime/Pipro', () => {
  test('Validar módulo Códigos Piprime/Pipro', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Códigos Piprime/Pipro', async () => {
      await gotoMarketingLink(page, /Piprime|Pipro/i, '/promo_code_campaigns');
      await loginPage.takeScreenshot(testInfo, '01 - Códigos Piprime/Pipro');
    });
  });
});
