/**
 * Test: Validar módulo Promo Codes
 * 
 * Valida: Acceso a Promo Codes
 * Flujo: Login → Menú → Marketing → Promo Codes
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth - Promo Codes', () => {
  test('Validar módulo Promo Codes', async ({ 
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

    await test.step('Navegar a Promo Codes', async () => {
      await marketingPageExtended.navigateToPromoCodes();
      await loginPage.takeScreenshot(testInfo, '04 - Promo Codes');
    });
  });
});
