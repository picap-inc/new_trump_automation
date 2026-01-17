/**
 * Test: Validación del módulo Picash - Créditos Usuarios Elegibles
 * 
 * Valida: Acceso a sección de Créditos Usuarios Elegibles
 * Flujo: Login → Menú → Picash → Menú Picash → Créditos Usuarios Elegibles
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo Picash - Créditos Usuarios Elegibles', () => {
  test('Ingresar a Créditos Usuarios Elegibles', async ({ 
    page,
    loginPage, 
    navigationPage, 
    picashNavigationPage,
    picashPage
  }, testInfo) => {
    
    await test.step('Login en la plataforma', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    await test.step('Abrir barra lateral general de navegación', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Navegar al módulo Picash', async () => {
      await picashNavigationPage.navigateToPicashModule();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Picash');
    });

    await test.step('Abrir menú lateral de Picash', async () => {
      await picashNavigationPage.openPicashSideMenu();
      await loginPage.takeScreenshot(testInfo, '04 - Menú Picash');
    });

    await test.step('Ingresar a Créditos Usuarios Elegibles', async () => {
      await picashPage.navigateToCreditosUsuarios();
      await loginPage.takeScreenshot(testInfo, '05 - Créditos Usuarios');
    });
  });
});
