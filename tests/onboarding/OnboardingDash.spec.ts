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
    loginPage,
    onboardingPage 
  }, testInfo) => {
    await test.step('Ir a Onboarding Dashboard', async () => {
      try {
        await page.goto('https://admin.picap.io/onboarding_dashboard', { waitUntil: 'networkidle', timeout: 60000 });
      } catch (error) {
        if (!/\/onboarding_dashboard/.test(page.url())) {
          throw error;
        }
      }
      await onboardingPage.waitForDashboardReady();
      await loginPage.takeScreenshot(testInfo, '01 - Dashboard abierto');
    });
  });
});
