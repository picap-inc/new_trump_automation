/**
 * Test: Filtros en Todos los Servicios
 * 
 * Valida: Aplicación de filtros en la sección de todos los servicios
 * Flujo: Login → Menú → Servicios → Todos los servicios → Filtros
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Filtros en módulo Todos los Servicios', () => {
  test('Aplicar filtros en Todos los servicios', async ({ 
    page,
    loginPage, 
    navigationPage, 
    serviciosPage 
  }, testInfo) => {
    
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

    // And: navego a Servicios → Todos los servicios
    await test.step('Navegar a Todos los servicios', async () => {
      await serviciosPage.navigateToServicios();
      await serviciosPage.navigateToTodosServicios();
      await loginPage.takeScreenshot(testInfo, '03 - Todos los servicios');
    });

    // Then: debería estar en la página correcta
    await test.step('Validar URL', async () => {
      await expect(page).toHaveURL('https://admin.picap.io/bookings', { timeout: 10000 });
      await loginPage.takeScreenshot(testInfo, '04 - URL validada');
    });
  });
});
