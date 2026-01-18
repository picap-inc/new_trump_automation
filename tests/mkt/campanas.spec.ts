/**
 * Test: Validar filtros en la página de Campañas
 * 
 * Valida: Navegación a Campañas y aplicación de filtros
 * Flujo: Login → Menú lateral → Marketing → Campañas → Filtros
 * 
 * TODO: Verificar permisos de usuario (actualmente retorna "Acceso denegado")
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth', () => {
  test('Validar filtros en la página de Campañas', async ({ 
    page,
    loginPage, 
    marketingPage 
  }, testInfo) => {
    
    // Given: navego directo a Campañas
    await test.step('Seleccionar Campañas', async () => {
      await gotoMarketingLink(page, /Campañas/i, '/campaigns');
      await loginPage.takeScreenshot(testInfo, '01 - Página de Campañas');
    });

    // Then: debería estar en la página correcta
    await test.step('Validar página Campañas', async () => {
      await expect(page).toHaveURL('https://admin.picap.io/campaigns', { timeout: 10000 });
      await loginPage.takeScreenshot(testInfo, '02 - URL validada');
    });

    // When: aplico filtros de fecha
    await test.step('Seleccionar fecha "Desde" y "Hasta"', async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      await marketingPage.filterByDateRange('2025-02-01', currentDate);
      await loginPage.takeScreenshot(testInfo, '03 - Fechas filtradas');
    });

    // And: selecciono estado de campaña
    await test.step('Seleccionar estado "Activa" con teclado', async () => {
      await marketingPage.selectCampaignStatus('Activa');
      await loginPage.takeScreenshot(testInfo, '07 - Estado Activa seleccionado');
    });

    // And: ejecuto la búsqueda
    await test.step('Hacer clic en el botón Buscar', async () => {
      await marketingPage.search();
      await loginPage.takeScreenshot(testInfo, '08 - Búsqueda aplicada');
    });

    // Note: Test puede fallar con "Acceso denegado" dependiendo de permisos del usuario
  });
});
