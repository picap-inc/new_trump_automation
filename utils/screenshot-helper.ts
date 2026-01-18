import { Page } from '@playwright/test';
import fs from 'fs';
import { testConfig } from '../config/test-config';

/**
 * ScreenshotHelper - Centraliza captura de pantallas
 * Maneja tanto capturas durante tests como attachments en reportes
 */
export class ScreenshotHelper {
  /**
   * Captura pantalla y adjunta al reporte de Playwright
   * Preferir este método en tests nuevos (integración nativa con reportes)
   */
  static async attach(
    page: Page,
    testInfo: any,
    label: string,
    fullPage = testConfig.screenshots.fullPage
  ): Promise<void> {
    if (process.env.CI && !testConfig.screenshots.onSuccess) return;

    const screenshot = await page.screenshot({ fullPage });
    
    await testInfo.attach(label, {
      body: screenshot,
      contentType: 'image/png',
    });
  }

  /**
   * Captura pantalla en carpeta específica
   * Mantiene compatibilidad con sistema anterior de screenshots
   * 
   * @deprecated Preferir attach() para mejor integración con reportes
   */
  static async capture(
    page: Page,
    fileName: string,
    folder: string = 'default',
    fullPage = testConfig.screenshots.fullPage
  ): Promise<void> {
    if (process.env.CI) return;

    const path = `screenshots/${folder}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    await page.screenshot({
      path: `${path}/${fileName}.png`,
      fullPage,
    });
  }

  /**
   * Captura pantalla con retry en caso de fallo
   * Útil para capturas en momentos de transición
   */
  static async captureWithRetry(
    page: Page,
    fileName: string,
    folder: string = 'default',
    maxAttempts = testConfig.retries.screenshot
  ): Promise<void> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.capture(page, fileName, folder);
        return;
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await page.waitForLoadState('domcontentloaded').catch(() => undefined);
        }
      }
    }

    if (lastError) {
      console.warn(`Failed to capture screenshot after ${maxAttempts} attempts:`, lastError.message);
    }
  }
}

