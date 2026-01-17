/**
 * Test: Validación del módulo Calidad
 * 
 * Valida: Navegación al dashboard de Calidad y filtros de fecha dinámicos
 * Flujo: Login → Menú lateral → Calidad → Dashboard → Filtros de fecha
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo Calidad', () => {
  test('Validar flujo completo de Calidad', async ({ 
    page,
    loginPage, 
    navigationPage, 
    calidadPage 
  }, testInfo) => {
    
    // Given: que estoy autenticado en el sistema
    await test.step('Login y menú lateral', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '01 - Login y menú');
    });

    // When: navego al módulo de Calidad
    await test.step('Seleccionar módulo Calidad', async () => {
      await calidadPage.navigateToCalidad();
      await loginPage.takeScreenshot(testInfo, '02 - Módulo Calidad');
    });

    // And: entro al Dashboard
    await test.step('Entrar a Dashboard Calidad', async () => {
      await calidadPage.navigateToDashboard();
      await loginPage.takeScreenshot(testInfo, '03 - Dashboard Calidad');
    });

    // Then: debería poder aplicar filtros de fecha dinámicos
    await test.step('Ingresar rango de fechas dinámicamente (día 1 al día actual)', async () => {
      await calidadPage.selectCurrentMonthDateRange();
      await loginPage.takeScreenshot(testInfo, '04 - Filtro de fecha aplicado');
    });
  });
});
