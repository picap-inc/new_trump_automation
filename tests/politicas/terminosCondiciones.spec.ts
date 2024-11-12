/**
 * Test: Navegación al módulo Políticas Internas - T&C
 * 
 * Valida: Acceso a Términos y Condiciones
 * Flujo: Login → Menú → Políticas → T&C → Validar URL
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Navegación al módulo Políticas Internas', () => {
  test('Ingresar a T&C y validar URL', async ({ 
    page,
    loginPage, 
    navigationPage, 
    politicasPage 
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

    // And: navego a Políticas internas
    await test.step('Click en módulo Políticas internas', async () => {
      await politicasPage.navigateToPoliticas();
      await loginPage.takeScreenshot(testInfo, '03 - Políticas internas');
    });

    // And: entro a T&C
    await test.step('Click en T&C', async () => {
      await politicasPage.navigateToTC();
      await loginPage.takeScreenshot(testInfo, '04 - T&C');
    });

    // Then: debería estar en la URL correcta
    await test.step('Validar URL de T&C', async () => {
      await expect(page).toHaveURL('https://admin.picap.io/application_settings/terms_and_conditions?lang=es');
    });
  });
});
