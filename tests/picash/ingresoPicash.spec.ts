/**
 * Test: Validación del módulo Picash - Ingreso de Picash
 * 
 * Valida: Acceso a sección de Ingreso de Picash
 * Flujo: Login → Menú → Picash → Menú Picash → Ingreso de Picash
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación del módulo Picash - Ingreso de Picash', () => {
  test('Ingresar a Ingreso de Picash', async ({ 
    page,
    loginPage, 
    navigationPage, 
    picashNavigationPage,
    picashPage
  }, testInfo) => {
    
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

    await test.step('Ingresar a Ingreso de Picash', async () => {
      await picashPage.navigateToIngresoPicash();
      await loginPage.takeScreenshot(testInfo, '05 - Ingreso de Picash');
    });
  });
});
