/**
 * Test: Validación del módulo App - Versiones
 * 
 * NOTA: Este test está comentado porque la funcionalidad no existe en nuevo Trump
 * TODO: Habilitar cuando se implemente "Versiones de la app" en la plataforma
 */

/*
import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo App', () => {
  test('Validar flujo completo modulo App - Versiones', async ({ 
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

    // And: entro a Versiones de la app
    await test.step('Entrar a Versiones de la app', async () => {
      await appPage.navigateToVersionesApp();
      await loginPage.takeScreenshot(testInfo, '03 - Versiones');
      
      // Then: debería estar en la URL correcta
      await expect(page).toHaveURL('https://admin.picap.io/app_versions', { timeout: 10000 });
    });
  });
});
*/
