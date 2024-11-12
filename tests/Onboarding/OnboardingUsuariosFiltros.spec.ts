/**
 * Test: Validación de Onboarding - Usuarios y Filtros
 * 
 * Valida: Filtros de usuarios onboarding y exportación
 * Flujo: Login → Menú → Onboarding → Usuarios → Filtros → Exportar
 * 
 * Timeout 60s: Búsqueda puede tardar ~15s
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación de Onboarding Dashboard', () => {
  test('Validar la página, filtros y exportación de listado', async ({ 
    page,
    loginPage, 
    navigationPage, 
    onboardingPage 
  }, testInfo) => {
    test.setTimeout(60000);

    // Given: que estoy autenticado
    await test.step('Iniciar sesión', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    // When: abro el menú lateral
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    // And: despliego Onboarding
    await test.step('Desplegar módulo Onboarding', async () => {
      await onboardingPage.navigateToOnboarding();
      await loginPage.takeScreenshot(testInfo, '03 - Onboarding desplegado');
    });

    // And: espero y navego a Usuarios onboarding
    await test.step('Ir a Usuarios onboarding', async () => {
      await onboardingPage.navigateToUsuariosOnboarding();
      await loginPage.takeScreenshot(testInfo, '04 - Usuarios onboarding');
    });

    // And: aplico filtros
    await test.step('Aplicar filtros de búsqueda', async () => {
      await onboardingPage.filterUsuariosOnboarding('Colombia', 'Armenia', 'Carro');
      await loginPage.takeScreenshot(testInfo, '05 - Filtros aplicados');
      await loginPage.takeScreenshot(testInfo, '06 - Resultados cargados');
    });

    // Then: debería poder exportar
    await test.step('Exportar listado', async () => {
      await onboardingPage.exportList();
      await loginPage.takeScreenshot(testInfo, '07 - Exportar listado');
    });
  });
});
