/**
 * Test: Validar módulo Regla de Referidos
 * 
 * Valida: Acceso a Regla de Referidos
 * Flujo: Login → Menú → Marketing → Regla de Referidos
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Regla de Referidos', () => {
  test('Validar módulo Regla de Referidos', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Regla de Referidos', async () => {
      await gotoMarketingLink(page, /Referidos/i, '/referral_code_rules');
      await loginPage.takeScreenshot(testInfo, '01 - Regla de Referidos');
    });
  });
});
