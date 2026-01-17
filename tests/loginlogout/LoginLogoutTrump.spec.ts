/**
 * Test: Login y Logout completo en Trump
 * 
 * Valida: Autenticación exitosa, navegación a módulo, y cierre de sesión
 * Flujo: Login → Navegar a Marketing → Logout → Validar redirección
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validar el login de trumpDev', () => {
  test('Completar el login con email y contraseña válidos', async ({ 
    page, 
    loginPage, 
    navigationPage,
    marketingPage 
  }, testInfo) => {
    
    // Given: que tengo acceso a la página de login
    await test.step('Abrir la página de TrumpProduccion', async () => {
      await loginPage.navigateToLogin();
      await loginPage.takeScreenshot(testInfo, '01 - Página de login');
    });

    // When: lleno los campos de login
    await test.step('Llenar los campos de login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '02 - Login exitoso');
    });

    // Then: debería ver el dashboard
    await test.step('Validar autenticación exitosa', async () => {
      await loginPage.verifyLoginSuccess();
      await loginPage.takeScreenshot(testInfo, '03 - Dashboard cargado');
    });

    // When: abro el menú de usuario
    await test.step('Abrir el menú de usuario', async () => {
      await navigationPage.openUserMenu();
      await loginPage.takeScreenshot(testInfo, '04 - Menú usuario abierto');
    });

    // And: navego a Marketing y Growth
    await test.step('Ir a Marketing y growth', async () => {
      // Cerrar menú de usuario primero
      await navigationPage.closeUserMenuIfOpen();
      
      // Abrir menú lateral
      await navigationPage.openSideMenu();
      
      // Navegar a Marketing
      await marketingPage.navigateToMarketing();
      await loginPage.takeScreenshot(testInfo, '05 - Marketing y growth');
    });

    // When: hago logout
    await test.step('Hacer clic en cerrar sesión', async () => {
      await navigationPage.logout();
      await loginPage.takeScreenshot(testInfo, '06 - Click cerrar sesión');
    });

    // Then: debería redirigir al login
    await test.step('Validar que el usuario cerró sesión', async () => {
      await loginPage.verifyLoginPage();
      await loginPage.takeScreenshot(testInfo, '07 - Login post logout');
    });
  });
});
