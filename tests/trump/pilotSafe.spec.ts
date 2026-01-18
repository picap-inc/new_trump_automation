/**
 * Test: Navegación al módulo Trump - Pilot Safe
 * 
 * Valida: Acceso a Pilot Safe y aplicación de filtros
 * Flujo: Login → Menú → Trump → Pilot Safe → Filtros
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Navegación al módulo Trump', () => {
  test('Ingresar a Pilot Safe y validar filtros', async ({ 
    page,
    loginPage, 
    navigationPage, 
    trumpPage 
  }, testInfo) => {
    
    // When: abro el menú lateral
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    // And: navego al módulo Trump
    await test.step('Click en módulo Trump', async () => {
      await trumpPage.navigateToTrump();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Trump');
    });

    // And: entro a Pilot Safe
    await test.step('Click en Pilot Safe', async () => {
      await trumpPage.navigateToPilotSafe();
      await expect(page).not.toHaveURL(/\/sessions\/new/);
      await loginPage.takeScreenshot(testInfo, '04 - Pilot Safe');
    });

    // Then: debería poder aplicar filtros
    await test.step('Aplicar filtros de búsqueda', async () => {
      await expect(page).not.toHaveURL(/\/sessions\/new/);
      await trumpPage.applyFilters('Colombia', 'Inactiva', 'Picap Carro');
      await loginPage.takeScreenshot(testInfo, '05 - Filtros aplicados');
      
      await trumpPage.clearFilters();
      await loginPage.takeScreenshot(testInfo, '06 - Filtros limpiados');
    });
  });
});
