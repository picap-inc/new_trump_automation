/**
 * Test: Validación del módulo Calidad - Matriz de Calidad
 * 
 * Valida: Acceso a Matriz y filtros por proceso
 * Flujo: Login → Menú → Calidad → Matriz → Filtros → Auditorías
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación del módulo Calidad', () => {
  test('Validar flujo completo de Calidad', async ({ 
    page,
    loginPage, 
    navigationPage, 
    calidadPage 
  }, testInfo) => {
    
    // Given: menú lateral disponible
    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '01 - Menú lateral');
    });

    // When: navego al módulo Calidad
    await test.step('Seleccionar módulo Calidad', async () => {
      await calidadPage.navigateToCalidad();
      await loginPage.takeScreenshot(testInfo, '02 - Módulo Calidad');
    });

    // And: entro a Matriz de Calidad
    await test.step('Entrar a Matriz Calidad', async () => {
      await calidadPage.navigateToMatriz();
      await loginPage.takeScreenshot(testInfo, '03 - Matriz Calidad');
    });

    // Then: debería poder filtrar y ver auditorías
    await test.step('Filtrar por Marketing y abrir auditorías', async () => {
      await calidadPage.filterByProcesoAndOpenAuditorias('Marketing');
      await loginPage.takeScreenshot(testInfo, '04 - Filtro Marketing Auditorías');
    });
  });
});
