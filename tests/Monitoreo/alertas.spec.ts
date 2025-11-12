/**
 * Test: Validación de Sub módulo Alertas
 * 
 * Valida: Flujo completo de gestión de alertas (filtros, búsqueda, creación)
 * Flujo: Login → Monitoreo → Alertas → Filtros → Bandeja → Nueva Alerta
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación de Sub módulo Alertas', () => {
  test('Validar módulo Alertas', async ({ 
    page,
    loginPage, 
    navigationPage, 
    monitoreoPage 
  }, testInfo) => {
    
    // Given: que estoy autenticado en el sistema
    await test.step('Login y menú lateral', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '01 - Login y menú');
    });

    // When: navego al módulo de Monitoreo
    await test.step('Seleccionar Módulo Monitoreo', async () => {
      await monitoreoPage.navigateToMonitoreo();
      await loginPage.takeScreenshot(testInfo, '02 - Módulo Monitoreo');
    });

    // And: entro a Alertas
    await test.step('Clic en Alertas', async () => {
      await monitoreoPage.navigateToAlertas();
      await loginPage.takeScreenshot(testInfo, '03 - Sección Alertas');
    });

    // And: aplico filtros
    await test.step('Aplicar filtros en Alertas', async () => {
      await monitoreoPage.applyAlertFilters(
        '2025-06-01',
        'Activa',
        'Alerta de fraude',
        'Conductor'
      );
      await loginPage.takeScreenshot(testInfo, '04 - Filtros aplicados');
    });

    // And: busco y limpio filtros
    await test.step('Buscar y limpiar filtros', async () => {
      await monitoreoPage.search();
      await monitoreoPage.clearFilters();
      await loginPage.takeScreenshot(testInfo, '05 - Búsqueda y limpieza');
    });

    // When: navego a otras secciones
    await test.step('Navegar a Bandeja y Alertas creadas', async () => {
      await monitoreoPage.navigateToBandeja();
      await monitoreoPage.navigateToAlertasCreadas();
      await loginPage.takeScreenshot(testInfo, '06 - Alertas creadas');
    });

    // And: abro formulario de nueva alerta
    await test.step('Formulario nueva alerta', async () => {
      await monitoreoPage.openNewAlertForm();
      await loginPage.takeScreenshot(testInfo, '07 - Formulario visible');
    });

    // Then: debería poder llenar y cancelar el formulario
    await test.step('Llenar formulario y cancelar', async () => {
      await monitoreoPage.fillNewAlertForm(
        'Prueba QA',
        'Pasajero',
        'Chat',
        'Prueba QA Automated',
        'Mensaje de prueba;palabra clave'
      );
      await loginPage.takeScreenshot(testInfo, '08 - Formulario lleno');
      
      await monitoreoPage.cancelNewAlertForm();
    });
  });
});
