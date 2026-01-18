/**
 * Test: Validar módulo Perfilamiento Piloto
 * 
 * Valida: Acceso a Perfilamiento Piloto
 * Flujo: Login → Menú → Marketing → Perfilamiento Piloto
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Perfilamiento Piloto', () => {
  test('Validar módulo Perfilamiento Piloto', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Perfilamiento Piloto', async () => {
      await gotoMarketingLink(page, /Perfilamiento.*Piloto/i, '/driver_profiles');
      await loginPage.takeScreenshot(testInfo, '01 - Perfilamiento Piloto');
    });
  });
});
