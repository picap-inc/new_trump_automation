/**
 * Test: Validar módulo Tutoriales
 * 
 * Valida: Acceso a Tutoriales
 * Flujo: Login → Menú → Marketing → Tutoriales
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Tutoriales', () => {
  test('Validar módulo Tutoriales', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Tutoriales', async () => {
      await gotoMarketingLink(page, /Tutoriales/i, '/v2_tutorials');
      await loginPage.takeScreenshot(testInfo, '01 - Tutoriales');
    });
  });
});
