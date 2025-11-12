/**
 * Test: Validar módulo Regla de Referidos
 * 
 * Valida: Acceso a Regla de Referidos
 * Flujo: Login → Menú → Marketing → Regla de Referidos
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth - Regla de Referidos', () => {
  test('Validar módulo Regla de Referidos', async ({ 
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

    await test.step('Navegar a Regla de Referidos', async () => {
      await marketingPageExtended.navigateToReglaReferidos();
      await loginPage.takeScreenshot(testInfo, '04 - Regla de Referidos');
    });
  });
});
