/**
 * Test: Validar módulo Perfilamiento Piloto
 * 
 * Valida: Acceso a Perfilamiento Piloto
 * Flujo: Login → Menú → Marketing → Perfilamiento Piloto
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth - Perfilamiento Piloto', () => {
  test('Validar módulo Perfilamiento Piloto', async ({ 
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

    await test.step('Navegar a Perfilamiento Piloto', async () => {
      await marketingPageExtended.navigateToPerfilamientoPiloto();
      await loginPage.takeScreenshot(testInfo, '04 - Perfilamiento Piloto');
    });
  });
});
