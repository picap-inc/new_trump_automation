/**
 * Test: Validar módulo Comparador de Tarifas
 * 
 * Valida: Acceso a Comparador de Tarifas
 * Flujo: Login → Menú → Marketing → Comparador de Tarifas
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Comparador de Tarifas', () => {
  test('Validar módulo Comparador de Tarifas', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Comparador de Tarifas', async () => {
      await gotoMarketingLink(page, /Comparador/i, '/benchmark_routes');
      await loginPage.takeScreenshot(testInfo, '01 - Comparador de Tarifas');
    });
  });
});
