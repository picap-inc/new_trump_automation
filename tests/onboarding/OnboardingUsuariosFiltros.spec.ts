/**
 * Test: Validación de Onboarding - Usuarios y Filtros
 * 
 * Valida: Filtros de usuarios onboarding y exportación
 * Flujo: Login → Menú → Onboarding → Usuarios → Filtros → Exportar
 * 
 * Timeout 60s: Búsqueda puede tardar ~15s
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación de Onboarding Dashboard', () => {
  test('Validar la página, filtros y exportación de listado', async ({ 
    page,
    loginPage, 
    onboardingPage 
  }, testInfo) => {
    test.setTimeout(90000);

    // When: entro directo a Usuarios onboarding
    await test.step('Abrir Usuarios onboarding', async () => {
      try {
        await page.goto('https://admin.picap.io/onboardings', { waitUntil: 'networkidle', timeout: 60000 });
      } catch (error) {
        if (!/\/onboardings/.test(page.url())) {
          throw error;
        }
      }
      await expect(page).toHaveURL(/\/onboardings/);
      await loginPage.takeScreenshot(testInfo, '02 - Usuarios onboarding');
    });

    // And: aplico filtros
    await test.step('Aplicar filtros de búsqueda', async () => {
      await onboardingPage.filterUsuariosOnboarding('Colombia', 'Armenia', 'Carro');
      await loginPage.takeScreenshot(testInfo, '03 - Filtros aplicados');
      await loginPage.takeScreenshot(testInfo, '04 - Resultados cargados');
    });

    // Then: debería poder exportar
    await test.step('Exportar listado', async () => {
      await onboardingPage.exportList();
      await loginPage.takeScreenshot(testInfo, '05 - Exportar listado');
    });
  });
});
