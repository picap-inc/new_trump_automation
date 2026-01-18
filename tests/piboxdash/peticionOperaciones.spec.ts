/**
 * Test: Validación de Pibox Dashboard - Petición de Operaciones
 * 
 * Valida: Acceso a sección Petición de Operaciones
 * Flujo: Login → Menú → Pibox → Menú Pibox → Petición de Operaciones
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación de Pibox Dashboard - Petición de Operaciones', () => {
  test('Ingresar a Petición de Operaciones', async ({ 
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

    await test.step('Entrar a Petición de Operaciones', async () => {
      await piboxDashboardPage.navigateToPeticionOperaciones();
      await loginPage.takeScreenshot(testInfo, '05 - Petición Operaciones');
    });
  });
});
