/**
 * Test: Validar módulo Visuales - Banners
 * 
 * Valida: Acceso a Visuales - Banners
 * Flujo: Login → Menú → Marketing → Visuales - Banners
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Visuales - Banners', () => {
  test('Validar módulo Visuales - Banners', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Visuales - Banners', async () => {
      await gotoMarketingLink(page, /Banners/i, '/home_sliders');
      await loginPage.takeScreenshot(testInfo, '01 - Visuales - Banners');
    });
  });
});
