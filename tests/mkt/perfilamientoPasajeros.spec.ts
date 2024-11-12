/**
 * Test: Validar módulo Perfilamiento Pasajeros
 * 
 * Valida: Acceso a Perfilamiento Pasajeros
 * Flujo: Login → Menú → Marketing → Perfilamiento Pasajeros
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Sub módulo Marketing y Growth - Perfilamiento Pasajeros', () => {
  test('Validar módulo Perfilamiento Pasajeros', async ({ 
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

    await test.step('Navegar a Perfilamiento Pasajeros', async () => {
      await marketingPageExtended.navigateToPerfilamientoPasajeros();
      await loginPage.takeScreenshot(testInfo, '04 - Perfilamiento Pasajeros');
    });
  });
});
