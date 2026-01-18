/**
 * Test: Validar módulo Verificaciones de Fraude
 * 
 * Valida: Acceso a Verificaciones de Fraude
 * Flujo: Login → Menú → Marketing → Verificaciones de Fraude
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Verificaciones de Fraude', () => {
  test('Validar módulo Verificaciones de Fraude', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Verificaciones de Fraude', async () => {
      await gotoMarketingLink(page, /Verificaciones de fraude/i, '/campaigns/fraud_verify');
      await loginPage.takeScreenshot(testInfo, '01 - Verificaciones de Fraude');
    });
  });
});
