/**
 * Test: Validar módulo Perfilamiento Pasajeros
 * 
 * Valida: Acceso a Perfilamiento Pasajeros
 * Flujo: Login → Menú → Marketing → Perfilamiento Pasajeros
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Perfilamiento Pasajeros', () => {
  test('Validar módulo Perfilamiento Pasajeros', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Perfilamiento Pasajeros', async () => {
      await gotoMarketingLink(page, /Perfilamiento.*Pasajeros/i, '/passenger_profiles');
      await loginPage.takeScreenshot(testInfo, '01 - Perfilamiento Pasajeros');
    });
  });
});
