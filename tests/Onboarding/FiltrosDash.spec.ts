/**
 * Test: Validación de Onboarding Dashboard - Filtros
 * 
 * Valida: Aplicación de filtros en el dashboard
 * Flujo: Login → Menú → Onboarding → Dashboard → Filtros
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación de Onboarding Dashboard', () => {
  test('Validar la página y sus respectivos filtros', async ({ 
    page,
    loginPage, 
    navigationPage, 
    onboardingPage 
  }, testInfo) => {
    
    // Given: que estoy autenticado
    await test.step('Login y barra lateral', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '01 - Login y menú');
    });

    // When: abro el menú Onboarding
    await test.step('Abrir menú Onboarding', async () => {
      await onboardingPage.navigateToOnboarding();
      await loginPage.takeScreenshot(testInfo, '02 - Menú Onboarding');
    });

    // And: accedo al Dashboard
    await test.step('Acceder a Onboarding Dashboard', async () => {
      await onboardingPage.navigateToDashboard();
      await loginPage.takeScreenshot(testInfo, '03 - Dashboard cargado');
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
      await loginPage.takeScreenshot(testInfo, '04 - Filtros aplicados');
    });
  });
});
