/**
 * Test: Filtros y descargas por vista
 *
 * Valida: filtros visibles + botones de descarga (si existen)
 * Regla: no ejecutar CRUD
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';
import { applyVisibleFilters, validateDownloadButtons } from '../utils/filter-downloads';

const pages = [
  { name: 'Servicios - Bookings', url: 'https://admin.picap.io/bookings' },
  { name: 'Servicios - PQRs', url: 'https://admin.picap.io/pqrs' },
  { name: 'Usuarios', url: 'https://admin.picap.io/passengers', downloads: true },
  { name: 'Onboarding - Dashboard', url: 'https://admin.picap.io/onboarding_dashboard' },
  { name: 'Onboarding - Usuarios', url: 'https://admin.picap.io/onboardings', downloads: true, timeout: 120000, skipNetworkIdle: true, customFilters: 'onboardingUsuarios', customDownloads: 'hrefOnly' },
  { name: 'Onboarding - Métricas', url: 'https://admin.picap.io/driver_registration_metrics', timeout: 90000 },
  { name: 'Marketing - Dashboard', url: 'https://admin.picap.io/marketing_dashboard' },
  { name: 'Marketing - Campañas', url: 'https://admin.picap.io/campaigns' },
  { name: 'Marketing - Verificaciones Fraude', url: 'https://admin.picap.io/campaigns/fraud_verify' },
  { name: 'Marketing - Rachas', url: 'https://admin.picap.io/streak_configs' },
  { name: 'Marketing - Campañas Promocodes', url: 'https://admin.picap.io/promo_code_campaigns' },
  { name: 'Marketing - Promo Codes', url: 'https://admin.picap.io/promo_codes' },
  { name: 'Marketing - Notificaciones', url: 'https://admin.picap.io/notifications' },
  { name: 'Marketing - Push masivos', url: 'https://admin.picap.io/push_notification_tasks', timeout: 90000, skipNetworkIdle: true },
  { name: 'Marketing - Visuales Banners', url: 'https://admin.picap.io/home_sliders' },
  { name: 'Marketing - Comparador tarifas', url: 'https://admin.picap.io/benchmark_routes' },
  { name: 'Marketing - Códigos QR', url: 'https://admin.picap.io/qr_code_users' },
  { name: 'Marketing - Tutoriales', url: 'https://admin.picap.io/v2_tutorials' },
  { name: 'Marketing - Bicitaxi', url: 'https://admin.picap.io/bicitaxi_working_areas' },
  { name: 'Marketing - Pilevels', url: 'https://admin.picap.io/pilevel_gamification_confs' },
  { name: 'Marketing - Tarifa diferencial', url: 'https://admin.picap.io/pricing/sensitivity_scores', timeout: 90000, useMarketingMenu: true },
  { name: 'Marketing - Perfilamiento Pasajeros', url: 'https://admin.picap.io/passenger_profiles', downloads: true, timeout: 90000, skipNetworkIdle: true },
  { name: 'Marketing - Perfilamiento Pilotos', url: 'https://admin.picap.io/driver_profiles', downloads: true },
  { name: 'Monitoreo - Alertas', url: 'https://admin.picap.io/text_based_alerts' },
  { name: 'Monitoreo - Revalidación', url: 'https://admin.picap.io/revalidation_queues' },
  { name: 'Picash - Dashboard', url: 'https://admin.picap.io/picash' },
  { name: 'Picash - Créditos', url: 'https://admin.picap.io/picash/credits', downloads: true },
  { name: 'Picash - Créditos elegibles', url: 'https://admin.picap.io/picash/credits/passengers' },
  { name: 'Picash - Dispositivos bloqueados', url: 'https://admin.picap.io/picash/locked_sessions' },
  { name: 'Calidad - Dashboard', url: 'https://admin.picap.io/quality', downloads: true },
  { name: 'Calidad - Matriz', url: 'https://admin.picap.io/quality/process_entities/matrices', downloads: true },
  { name: 'App - Direcciones reportadas', url: 'https://admin.picap.io/feedback_directions' },
  { name: 'Pibox - Compañías', url: 'https://admin.picap.io/pibox/companies' },
  { name: 'Pibox - Lista servicios', url: 'https://admin.picap.io/pibox/overview', customFilters: 'piboxOverview' },
  { name: 'Pibox - Peticiones operaciones', url: 'https://admin.picap.io/pibox/operation_request', downloads: true, timeout: 120000, skipNetworkIdle: true, customFilters: 'piboxOperationRequest', customDownloads: 'hrefOnly' },
  { name: 'Pibox - Monitoreo', url: 'https://admin.picap.io/pibox/monitoring' }
];

test.describe('Filtros y descargas', () => {
  for (const pageConfig of pages) {
    test(`${pageConfig.name} - filtros`, async ({ page, loginPage, navigationPage, marketingPageExtended }, testInfo) => {
      test.setTimeout(pageConfig.timeout ?? 60000);

      await test.step('Login', async () => {
        await loginPage.login(users.admin.email, users.admin.password);
        await loginPage.takeScreenshot(testInfo, '01 - Login');
      });

      await test.step(`Abrir ${pageConfig.url}`, async () => {
        const timeout = pageConfig.timeout ?? 45000;
        if (pageConfig.useMarketingMenu) {
          await navigationPage.openSideMenu();
          await marketingPageExtended.navigateToMarketing();
          await marketingPageExtended.navigateToTarifaDiferencial();
        } else {
          try {
            await page.goto(pageConfig.url, { waitUntil: 'domcontentloaded', timeout });
          } catch (_) {
            await page.goto('https://admin.picap.io/', { waitUntil: 'domcontentloaded', timeout });
            await page.goto(pageConfig.url, { waitUntil: 'domcontentloaded', timeout });
          }
        }
        if (!pageConfig.skipNetworkIdle) {
          await page.waitForLoadState('networkidle').catch(() => undefined);
        }
        await loginPage.takeScreenshot(testInfo, '02 - Vista');
      });

      await test.step('Aplicar filtros visibles', async () => {
        if (pageConfig.customFilters === 'piboxOperationRequest') {
          const companyInput = page.locator('#company_name');
          if (await companyInput.isVisible().catch(() => false)) {
            await companyInput.fill('test');
          }
        } else if (pageConfig.customFilters === 'onboardingUsuarios') {
          const emailInput = page.locator('#email');
          if (await emailInput.isVisible().catch(() => false)) {
            await emailInput.fill('test@example.com');
          }
        } else if (pageConfig.customFilters === 'piboxOverview') {
          const companyInput = page.locator('#company_ids');
          if (await companyInput.isVisible().catch(() => false)) {
            await companyInput.fill('test');
          }
        } else {
          await applyVisibleFilters(page);
        }
        await page.waitForLoadState('domcontentloaded').catch(() => undefined);
        await loginPage.takeScreenshot(testInfo, '03 - Filtros aplicados');
      });

      if (pageConfig.downloads) {
        await test.step('Validar descargas', async () => {
          if (pageConfig.customDownloads === 'hrefOnly') {
            const downloadButtons = page.locator('button, a').filter({ hasText: /(descargar|exportar|reporte|informe|excel|csv|xls|pdf|download)/i });
            const count = await downloadButtons.count();
            expect(count).toBeGreaterThan(0);
            for (let i = 0; i < count; i += 1) {
              await expect(downloadButtons.nth(i)).toBeVisible();
            }
          } else {
            await validateDownloadButtons(page);
          }
          await loginPage.takeScreenshot(testInfo, '04 - Descargas');
        });
      }
    });
  }
});
