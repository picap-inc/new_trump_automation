/**
 * Test: Validación de Onboarding Dashboard - Filtros
 * 
 * Valida: Aplicación de filtros en el dashboard
 * Flujo: Login → Menú → Onboarding → Dashboard → Filtros
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación de Onboarding Dashboard', () => {
  test('Validar la página y sus respectivos filtros', async ({ 
    page,
    loginPage, 
    onboardingPage 
  }, testInfo) => {

    // When: accedo directo al Dashboard
    await test.step('Abrir Onboarding Dashboard', async () => {
      await page.goto('https://admin.picap.io/onboarding_dashboard', { waitUntil: 'networkidle', timeout: 60000 });
      await onboardingPage.waitForDashboardReady();
      await loginPage.takeScreenshot(testInfo, '01 - Dashboard cargado');
    });

    // Then: debería poder aplicar filtros
    await test.step('Aplicar filtros del dashboard', async () => {
      await onboardingPage.applyDashboardFilters(
        'Colombia',
        'Bogota',
        '2025-01-21',
        '2025-01-22',
        'Noviembre 2024'
      );
      await loginPage.takeScreenshot(testInfo, '02 - Filtros aplicados');
    });
  });
});
