/**
 * Test: Validar módulo Bicitaxi
 * 
 * Valida: Acceso a Bicitaxi y aplicación de filtros
 * Flujo: Login → Menú → Marketing → Bicitaxi → Filtros
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth', () => {
  test('Validar módulo Bicitaxi', async ({ 
    page,
    loginPage, 
    navigationPage, 
    marketingPageExtended 
  }, testInfo) => {
    
    await test.step('Login en la plataforma', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Seleccionar módulo Marketing y Growth', async () => {
      await marketingPageExtended.navigateToMarketing();
      await loginPage.takeScreenshot(testInfo, '03 - Marketing');
    });

    await test.step('Click en Bicitaxi', async () => {
      await marketingPageExtended.navigateToBicitaxi();
      await loginPage.takeScreenshot(testInfo, '04 - Bicitaxi');
    });

    await test.step('Aplicar filtros y validarlos', async () => {
      await marketingPageExtended.filterBicitaxi('Centro Suba', 'Activa', 'Bogota - Colombia');
      await loginPage.takeScreenshot(testInfo, '05 - Filtros aplicados');
    });
  });
});
