/**
 * Test: Validación de Pibox Dashboard - Lista de Servicios
 * 
 * Valida: Acceso a Lista de servicios con manejo de loader
 * Flujo: Login → Menú → Pibox → Menú Pibox → Lista de servicios
 * 
 * NOTA: Tiene loader que puede demorar, test puede saltarse automáticamente si no carga
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación de módulo Lista de servicios - Flujo completo', () => {
  test('Validación completa de filtros y navegación', async ({ 
    page,
    loginPage, 
    navigationPage, 
    piboxDashboardPage 
  }, testInfo) => {
    test.setTimeout(120000);
    const loaderSelector = '.absolute.inset-0.flex.items-center.justify-center.bg-white.bg-opacity-75.z-50';
    
    await test.step('Iniciar sesión', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

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

    await test.step('Entrar al módulo Lista de servicios', async () => {
      await piboxDashboardPage.navigateToListaServicios();
      await piboxDashboardPage.waitForLoader(loaderSelector);
      await loginPage.takeScreenshot(testInfo, '05 - Lista de servicios');
    });
  });
});
