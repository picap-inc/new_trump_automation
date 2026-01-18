/**
 * Test: Validar módulo Pilevels
 * 
 * Valida: Acceso a Pilevels
 * Flujo: Login → Menú → Marketing → Pilevels
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Pilevels', () => {
  test('Validar módulo Pilevels', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Pilevels', async () => {
      await gotoMarketingLink(page, /Pilevels/i, '/pilevel_gamification_confs');
      await loginPage.takeScreenshot(testInfo, '01 - Pilevels');
    });
  });
});
