/**
 * Test: Validación del módulo Picash - Compras
 * 
 * Valida: Acceso a sección de Compras
 * Flujo: Login → Menú → Picash → Menú Picash → Compras
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación del módulo Picash - Compras', () => {
  test('Ingresar a Compras', async ({ 
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

    await test.step('Ingresar a Compras', async () => {
      await picashPage.navigateToCompras();
      await loginPage.takeScreenshot(testInfo, '05 - Compras');
    });
  });
});
