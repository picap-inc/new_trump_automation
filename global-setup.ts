import { chromium, type FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { users } from './config/environments';

const authFile = 'auth.json';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.login(users.admin.email, users.admin.password);
  await loginPage.verifyLoginSuccess();

  const livePage = await loginPage.getLivePage();
  const liveContext = livePage.context();
  const storage = await liveContext.storageState();
  if (livePage.url().includes('/sessions') || storage.cookies.length === 0) {
    throw new Error('Autenticación incompleta: URL o cookies inválidas.');
  }

  await liveContext.storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
