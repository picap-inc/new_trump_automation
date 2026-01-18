/**
 * Test: Validar módulo Visuales - Mapa
 * 
 * Valida: Acceso a Visuales - Mapa
 * Flujo: Login → Menú → Marketing → Visuales - Mapa
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Visuales - Mapa', () => {
  test('Validar módulo Visuales - Mapa', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Visuales - Mapa', async () => {
      await gotoMarketingLink(page, /Mapa/i, '/countries');
      await loginPage.takeScreenshot(testInfo, '01 - Visuales - Mapa');
    });
  });
});
