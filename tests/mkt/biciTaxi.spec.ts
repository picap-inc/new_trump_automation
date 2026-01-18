/**
 * Test: Validar módulo Bicitaxi
 * 
 * Valida: Acceso a Bicitaxi y aplicación de filtros
 * Flujo: Login → Menú → Marketing → Bicitaxi → Filtros
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth', () => {
  test('Validar módulo Bicitaxi', async ({ 
    page,
    loginPage, 
    marketingPageExtended 
  }, testInfo) => {
    await test.step('Click en Bicitaxi', async () => {
      await gotoMarketingLink(page, /Bicitaxi/i, '/bicitaxi_working_areas');
      await loginPage.takeScreenshot(testInfo, '01 - Bicitaxi');
    });

    await test.step('Aplicar filtros y validarlos', async () => {
      await marketingPageExtended.filterBicitaxi('Centro Suba', 'Activa', 'Bogota - Colombia');
      await loginPage.takeScreenshot(testInfo, '02 - Filtros aplicados');
    });
  });
});
