/**
 * Test: Validación del módulo App - Direcciones Reportadas
 * 
 * Valida: Navegación y filtros de direcciones reportadas
 * Flujo: Login → Menú → App → Direcciones reportadas → Filtros
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo App', () => {
  test('Validar flujo completo modulo App', async ({ 
    page,
    loginPage, 
    navigationPage, 
    appPage 
  }, testInfo) => {
    
    // Given: que estoy autenticado
    await test.step('Login y menú lateral', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '01 - Login y menú');
    });

    // When: navego al módulo App
    await test.step('Seleccionar módulo App', async () => {
      await appPage.navigateToApp();
      await loginPage.takeScreenshot(testInfo, '02 - Módulo App');
    });

    // And: entro a Direcciones reportadas
    await test.step('Entrar a Direcciones reportadas', async () => {
      await appPage.navigateToDireccionesReportadas();
      await loginPage.takeScreenshot(testInfo, '03 - Direcciones reportadas');
    });

    // Then: debería poder aplicar filtros
    await test.step('Llenar filtros y buscar', async () => {
      await appPage.filterDireccionesByDateAndCity('2025-06-01', '2025-06-30', 'Bogotá, D.C.');
    });
  });
});
