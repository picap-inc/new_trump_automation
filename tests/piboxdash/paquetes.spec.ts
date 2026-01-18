/**
 * Test: Validación de Pibox Dashboard - Paquetes
 * 
 * Valida: Acceso a sección Paquetes
 * Flujo: Login → Menú → Pibox → Menú Pibox → Paquetes
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación de Pibox Dashboard - Paquetes', () => {
  test('Ingresar a Paquetes', async ({ 
    page,
    loginPage, 
    navigationPage, 
    piboxDashboardPage 
  }, testInfo) => {
    
    await test.step('Abrir menú lateral general', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Pibox Dashboard', async () => {
      await piboxDashboardPage.navigateToPibox();
      await loginPage.takeScreenshot(testInfo, '03 - Pibox Dashboard');
    });

    await test.step('Abrir menú lateral de Pibox', async () => {
      await piboxDashboardPage.openPiboxSideMenu();
      await loginPage.takeScreenshot(testInfo, '04 - Menú Pibox');
    });

    await test.step('Entrar a Paquetes', async () => {
      await piboxDashboardPage.navigateToPaquetes();
      await loginPage.takeScreenshot(testInfo, '05 - Paquetes');
    });
  });
});
