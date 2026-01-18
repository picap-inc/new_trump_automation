/**
 * Test: Validar módulo Push Masivos
 * 
 * Valida: Acceso a Push Masivos
 * Flujo: Login → Menú → Marketing → Push Masivos
 */

import { test, expect } from '../../fixtures/pages';
import { gotoMarketingLink } from '../utils/marketing-links';

test.describe('Sub módulo Marketing y Growth - Push Masivos', () => {
  test('Validar módulo Push Masivos', async ({ 
    page,
    loginPage 
  }, testInfo) => {
    await test.step('Navegar a Push Masivos', async () => {
      await gotoMarketingLink(page, /Push masivos/i, '/push_notification_tasks');
      await loginPage.takeScreenshot(testInfo, '01 - Push Masivos');
    });
  });
});
