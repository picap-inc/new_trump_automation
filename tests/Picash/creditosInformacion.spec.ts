/**
 * Test: Validación del módulo Picash - Créditos Información
 * 
 * Valida: Acceso a sección de Créditos Información
 * Flujo: Login → Menú → Picash → Menú Picash → Créditos Información
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo Picash - Créditos Información', () => {
  test('Ingresar a Créditos Información', async ({ 
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

    await test.step('Ingresar a Créditos Información', async () => {
      await picashPage.navigateToCreditosInformacion();
      await loginPage.takeScreenshot(testInfo, '05 - Créditos Información');
    });
  });
});
