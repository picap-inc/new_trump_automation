/**
 * Test: Validar módulo Códigos QR
 * 
 * Valida: Acceso a Códigos QR
 * Flujo: Login → Menú → Marketing → Códigos QR
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Códigos QR', () => {
  test('Validar módulo Códigos QR', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Códigos QR', async () => {
      await gotoMarketingLink(page, /Códigos QR/i, '/qr_code_users');
      await loginPage.takeScreenshot(testInfo, '01 - Códigos QR');
    });
  });
});
