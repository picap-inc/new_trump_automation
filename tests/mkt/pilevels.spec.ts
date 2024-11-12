/**
 * Test: Validar módulo Pilevels
 * 
 * Valida: Acceso a Pilevels
 * Flujo: Login → Menú → Marketing → Pilevels
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth - Pilevels', () => {
  test('Validar módulo Pilevels', async ({ 
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

    await test.step('Navegar a Pilevels', async () => {
      await marketingPageExtended.navigateToPilevels();
      await loginPage.takeScreenshot(testInfo, '04 - Pilevels');
    });
  });
});
