/**
 * Test: Validar módulo Notificaciones
 * 
 * Valida: Acceso a Notificaciones
 * Flujo: Login → Menú → Marketing → Notificaciones
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Notificaciones', () => {
  test('Validar módulo Notificaciones', async ({ 
    page,
    loginPage
  }, testInfo) => {
    await test.step('Navegar a Notificaciones', async () => {
      await gotoMarketingLink(page, /Notificaciones/i, '/notifications');
      await loginPage.takeScreenshot(testInfo, '01 - Notificaciones');
    });
  });
});
