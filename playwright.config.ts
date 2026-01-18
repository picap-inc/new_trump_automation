import { defineConfig, devices } from '@playwright/test';

/**
 * https://admin-st.picap.io/
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts',
  timeout: 60000, // 60 segundos por prueba
  fullyParallel: false, // Deshabilitado: ejecutar tests secuencialmente
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Reintenta una vez en local, dos veces en CI
  workers: 1, // SIEMPRE usar solo 1 navegador a la vez
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    actionTimeout: 15000, // 15s de espera máxima por acción
    navigationTimeout: 30000, // 30s de espera máxima para navegación
    headless: true, // Siempre headless para no abrir ventanas
    storageState: 'auth.json',
    //screenshot: 'only-on-failure', // Capturas
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

