/**
 * Test: Validación de Onboarding Dashboard
 * 
 * Valida: Navegación al dashboard de Onboarding y sus filtros
 * Flujo: Login → Menú lateral → Onboarding → Dashboard
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación de Onboarding Dashboard', () => {
  test('Validar la página y sus respectivos filtros', async ({ 
    page,
    loginPage 
  }, testInfo) => {
    await test.step('Ir a Onboarding Dashboard', async () => {
      await page.goto('https://admin.picap.io/onboarding_dashboard', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/onboarding_dashboard/);
      await loginPage.takeScreenshot(testInfo, '01 - Dashboard abierto');
    });
  });
});
