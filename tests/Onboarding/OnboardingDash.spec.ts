/**
 * Test: Validación de Onboarding Dashboard
 * 
 * Valida: Navegación al dashboard de Onboarding y sus filtros
 * Flujo: Login → Menú lateral → Onboarding → Dashboard
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
    
    // Given: que estoy autenticado en el sistema
    await test.step('Iniciar sesión', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    // When: abro el menú lateral
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral abierto');
    });

    // And: despliego el módulo Onboarding
    await test.step('Desplegar módulo Onboarding', async () => {
      await onboardingPage.navigateToOnboarding();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Onboarding desplegado');
    });

    // And: espero el enlace del Dashboard
    await test.step('Esperar enlace "Onboarding Dashboard"', async () => {
      await page.waitForSelector('text=Onboarding dashboard', { state: 'visible' });
      await loginPage.takeScreenshot(testInfo, '04 - Dashboard link visible');
    });

    // Then: debería acceder al Dashboard
    await test.step('Ir a Onboarding Dashboard', async () => {
      await onboardingPage.navigateToDashboard();
      await loginPage.takeScreenshot(testInfo, '05 - Dashboard abierto');
    });
  });
});
