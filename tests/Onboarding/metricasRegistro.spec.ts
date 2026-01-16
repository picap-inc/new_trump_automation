/**
 * Test: Smoke de Onboarding - Métricas de Registro
 *
 * Valida: Acceso a Métricas de Registro
 * Flujo: Login → Menú → Onboarding → Métricas de Registro
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Smoke de Onboarding', () => {
  test('Acceder a Métricas de Registro', async ({
    page,
    loginPage,
    navigationPage,
    onboardingPage
  }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    await test.step('Abrir menú lateral', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    await test.step('Ir a Métricas de Registro', async () => {
      await onboardingPage.navigateToOnboarding();
      await onboardingPage.navigateToMetricasRegistro();
      await expect(page).toHaveURL(/\/driver_registration_metrics/);
      await loginPage.takeScreenshot(testInfo, '03 - Métricas de Registro');
    });
  });
});
