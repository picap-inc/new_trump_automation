/**
 * Test: Navegación al módulo de Todos los Servicios
 * 
 * Valida: Acceso al módulo de Servicios y navegación a subsección
 * Flujo: Login → Menú lateral → Servicios → Todos los servicios
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Navegación al módulo de Todos los Servicios', () => {
  test('Acceder a la sección de Todos los Servicios', async ({ 
    page,
    loginPage, 
    navigationPage, 
    serviciosPage 
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

    // And: navego al módulo Servicios
    await test.step('Seleccionar módulo Servicios', async () => {
      await serviciosPage.navigateToServicios();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Servicios');
    });

    // And: navego a Todos los Servicios
    await test.step('Seleccionar submódulo Todos los Servicios', async () => {
      await serviciosPage.navigateToTodosServicios();
      await loginPage.takeScreenshot(testInfo, '04 - Todos los servicios');
    });

    // Then: debería estar en la página correcta
    await test.step('Validar carga de la página de Todos los Servicios', async () => {
      await expect(page).toHaveURL('https://admin.picap.io/bookings', { timeout: 10000 });
      await loginPage.takeScreenshot(testInfo, '05 - URL validada');
    });
  });
});
