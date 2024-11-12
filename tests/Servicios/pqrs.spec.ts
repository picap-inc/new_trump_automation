/**
 * Test: Navegación al módulo de PQRs
 * 
 * Valida: Acceso a la sección de PQRs
 * Flujo: Login → Menú → Servicios → PQRs → Validar URL
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Navegación al módulo de PQRs', () => {
  test('Acceder a la sección de PQRs', async ({ 
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

    // And: navego a Servicios
    await test.step('Seleccionar módulo Servicios', async () => {
      await serviciosPage.navigateToServicios();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Servicios');
    });

    // Then: debería acceder a PQRs
    await test.step('Seleccionar submódulo PQRs', async () => {
      await serviciosPage.navigateToPQRS();
      await loginPage.takeScreenshot(testInfo, '04 - PQRs');
      
      await expect(page).toHaveURL('https://admin.picap.io/pqrs');
    });
  });
});
