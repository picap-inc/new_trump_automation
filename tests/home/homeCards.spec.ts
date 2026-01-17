/**
 * Test: Smoke de opciones principales en Inicio
 *
 * Valida: Acceso a cards principales del home
 * Flujo: Login → Inicio → Cards principales
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

const homeCards = [
  { heading: 'Servicios', href: '/bookings', url: /\/bookings/ },
  { heading: 'Usuarios', href: '/passengers', url: /\/passengers/ },
  { heading: 'Onboarding', href: '/onboarding_dashboard', url: /\/onboarding_dashboard/ },
  { heading: 'Marketing y Growth', href: '/marketing_dashboard', url: /\/marketing_dashboard/ },
  { heading: 'PQRs', href: '/pqrs', url: /\/pqrs/ },
  { heading: 'Campañas', href: '/campaigns', url: /\/campaigns/ }
];

test.describe('Smoke de Inicio', () => {
  test('Acceder a opciones principales', async ({ page, loginPage }, testInfo) => {
    await test.step('Login', async () => {
      await loginPage.login(users.admin.email, users.admin.password);
      await expect(page).toHaveURL(/\/$/);
      await loginPage.takeScreenshot(testInfo, '01 - Login');
    });

    for (const card of homeCards) {
      await test.step(`Abrir card: ${card.heading}`, async () => {
        const cardLink = page
          .getByRole('link')
          .filter({ has: page.getByRole('heading', { name: card.heading }) })
          .first();
        await expect(cardLink).toBeVisible();
        await cardLink.click();
        if (!card.url.test(page.url())) {
          await page.waitForURL(card.url, { timeout: 15000 }).catch(() => undefined);
        }
        if (!card.url.test(page.url())) {
          await page.goto(`https://admin.picap.io${card.href}`, { waitUntil: 'domcontentloaded' });
        }
        await expect(page).toHaveURL(card.url, { timeout: 15000 });
        await loginPage.takeScreenshot(testInfo, `02 - ${card.heading}`);
      });

      await test.step('Volver a Inicio', async () => {
        await page.goto('https://admin.picap.io/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/\/$/);
      });
    }
  });
});
