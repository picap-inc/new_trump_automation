/**
 * Test: Validación del módulo Picash - Comercios
 * 
 * Valida: Navegación al módulo Picash y acceso a Comercios
 * Flujo: Login → Menú lateral → Picash → Menú Picash → Comercios
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación del módulo Picash', () => {
  test('Ingresar a Picash - Comercios', async ({ 
    page,
    loginPage, 
    navigationPage, 
    picashNavigationPage,
    picashPage
  }, testInfo) => {
    test.setTimeout(120000);

    // Given: que estoy autenticado en el sistema
    await test.step('Login en la plataforma', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login exitoso');
    });

    // When: abro el menú lateral general
    await test.step('Abrir barra lateral general de navegación', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral general');
    });

    // And: navego al módulo Picash
    await test.step('Navegar al módulo Picash y validar URL', async () => {
      await picashNavigationPage.navigateToPicashModule();
      await expect(page).toHaveURL('https://admin.picap.io/picash/', { timeout: 10000 });
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Picash');
    });

    // And: abro el menú lateral de Picash
    await test.step('Abrir menú lateral de Picash y validar', async () => {
      await picashNavigationPage.openPicashSideMenu();
      await picashNavigationPage.verifyPicashMenuOpen();
      await loginPage.takeScreenshot(testInfo, '04 - Menú Picash abierto');
    });

    // Then: debería poder acceder a un módulo disponible en Picash
    await test.step('Ingresar a Información de créditos', async () => {
      await picashPage.navigateToCreditosInformacion();

      // Validar URL
      await expect(page).toHaveURL('https://admin.picap.io/picash/credits', { timeout: 10000 });

      await loginPage.takeScreenshot(testInfo, '05 - Créditos Picash');
    });
  });
});
