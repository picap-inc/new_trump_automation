/**
 * Test: Navegación a PQRS y validación de página
 * 
 * Valida: Acceso correcto al módulo de PQRS
 * Flujo: Login → Menú → Servicios → PQRS → Verificar carga
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Navegación a módulo de PQRS', () => {
  test('Acceder y validar carga de PQRS', async ({ 
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

    // And: navego a Servicios → PQRS
    await test.step('Seleccionar módulo Servicios', async () => {
      await serviciosPage.navigateToServicios();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Servicios');
    });

    await test.step('Seleccionar submódulo PQRS', async () => {
      await serviciosPage.navigateToPQRS();
      await loginPage.takeScreenshot(testInfo, '04 - PQRS');
    });

    // Then: debería verificar que la página de PQRS cargó correctamente
    await test.step('Verificar carga de página PQRS', async () => {
      await expect(page).toHaveURL('https://admin.picap.io/pqrs');
      await loginPage.takeScreenshot(testInfo, '05 - Página PQRS verificada');
    });
  });
});
