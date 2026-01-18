/**
 * Test: Filtros en PQRs
 * 
 * Valida: Aplicación de filtros de fecha en PQRs
 * Flujo: Login → Menú → Servicios → PQRs → Aplicar filtros
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Filtros en módulo PQRs', () => {
  test('Aplicar filtros de fecha en PQRs', async ({ 
    page,
    loginPage, 
    navigationPage, 
    serviciosPage 
  }, testInfo) => {
    
    // When: abro el menú lateral
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    // And: navego a Servicios → PQRs
    await test.step('Navegar a PQRs', async () => {
      await serviciosPage.navigateToServicios();
      await serviciosPage.navigateToPQRS();
      await loginPage.takeScreenshot(testInfo, '03 - PQRs');
    });

    // Then: debería poder aplicar filtros
    await test.step('Aplicar filtros de fecha', async () => {
      const fechaHoy = new Date().toISOString().split('T')[0];
      await serviciosPage.applyPQRSFilters('2025-01-01', fechaHoy);
      await loginPage.takeScreenshot(testInfo, '04 - Filtros aplicados');
    });
  });
});
