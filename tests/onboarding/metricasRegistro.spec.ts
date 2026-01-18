/**
 * Test: Smoke de Onboarding - Métricas de Registro
 *
 * Valida: Acceso a Métricas de Registro
 * Flujo: Login → Menú → Onboarding → Métricas de Registro
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Smoke de Onboarding', () => {
  test('Acceder a Métricas de Registro', async ({
    page,
    loginPage
  }, testInfo) => {
    await test.step('Ir a Métricas de Registro', async () => {
      await page.goto('https://admin.picap.io/driver_registration_metrics', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(/\/driver_registration_metrics/);
      await loginPage.takeScreenshot(testInfo, '01 - Métricas de Registro');
    });
  });
});
