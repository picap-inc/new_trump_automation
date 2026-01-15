/**
 * Fixtures para inyección automática de Page Objects en tests
 * 
 * Ventajas:
 * - Lazy initialization: Page Objects solo se crean cuando se usan
 * - Auto-cleanup: Playwright maneja el ciclo de vida
 * - Type-safe: TypeScript valida en tiempo de compilación
 * 
 * Uso en tests:
 * import { test, expect } from '../fixtures/pages';
 * 
 * test('mi test', async ({ loginPage, navigationPage }) => {
 *   await loginPage.login(email, password);
 *   await navigationPage.openSideMenu();
 * });
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { MarketingPage } from '../pages/MarketingPage';
import { MarketingPageExtended } from '../pages/MarketingPageExtended';
import { ServiciosPage } from '../pages/ServiciosPage';
import { PicashNavigationPage } from '../pages/PicashNavigationPage';
import { PicashPage } from '../pages/PicashPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { CalidadPage } from '../pages/CalidadPage';
import { MonitoreoPage } from '../pages/MonitoreoPage';
import { AppPage } from '../pages/AppPage';
import { UsuariosPage } from '../pages/UsuariosPage';
import { TrumpPage } from '../pages/TrumpPage';
import { PiboxDashboardPage } from '../pages/PiboxDashboardPage';
import { PoliticasPage } from '../pages/PoliticasPage';
import { ChatsPage } from '../pages/ChatsPage';
import { TechnicalSupportPage } from '../pages/TechnicalSupportPage';

type PageFixtures = {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  marketingPage: MarketingPage;
  marketingPageExtended: MarketingPageExtended;
  serviciosPage: ServiciosPage;
  picashNavigationPage: PicashNavigationPage;
  picashPage: PicashPage;
  onboardingPage: OnboardingPage;
  calidadPage: CalidadPage;
  monitoreoPage: MonitoreoPage;
  appPage: AppPage;
  usuariosPage: UsuariosPage;
  trumpPage: TrumpPage;
  piboxDashboardPage: PiboxDashboardPage;
  politicasPage: PoliticasPage;
  chatsPage: ChatsPage;
  technicalSupportPage: TechnicalSupportPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  marketingPage: async ({ page }, use) => {
    await use(new MarketingPage(page));
  },

  marketingPageExtended: async ({ page }, use) => {
    await use(new MarketingPageExtended(page));
  },

  serviciosPage: async ({ page }, use) => {
    await use(new ServiciosPage(page));
  },

  picashNavigationPage: async ({ page }, use) => {
    await use(new PicashNavigationPage(page));
  },

  picashPage: async ({ page }, use) => {
    await use(new PicashPage(page));
  },

  onboardingPage: async ({ page }, use) => {
    await use(new OnboardingPage(page));
  },

  calidadPage: async ({ page }, use) => {
    await use(new CalidadPage(page));
  },

  monitoreoPage: async ({ page }, use) => {
    await use(new MonitoreoPage(page));
  },

  appPage: async ({ page }, use) => {
    await use(new AppPage(page));
  },

  usuariosPage: async ({ page }, use) => {
    await use(new UsuariosPage(page));
  },

  trumpPage: async ({ page }, use) => {
    await use(new TrumpPage(page));
  },

  piboxDashboardPage: async ({ page }, use) => {
    await use(new PiboxDashboardPage(page));
  },

  politicasPage: async ({ page }, use) => {
    await use(new PoliticasPage(page));
  },

  chatsPage: async ({ page }, use) => {
    await use(new ChatsPage(page));
  },

  technicalSupportPage: async ({ page }, use) => {
    await use(new TechnicalSupportPage(page));
  },
});

export { expect } from '@playwright/test';
