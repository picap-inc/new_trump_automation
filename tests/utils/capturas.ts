/**
 * capturarPaso - Helper de compatibilidad con sistema anterior
 * 
 * @deprecated Preferir usar ScreenshotHelper.attach() o BasePage.takeScreenshot()
 * Este helper se mantiene para compatibilidad con tests no refactorizados
 * 
 * Uso en tests refactorizados:
 * await loginPage.takeScreenshot(testInfo, 'label');
 */

import { Page } from '@playwright/test';
import { ScreenshotHelper } from '../../utils/screenshot-helper';

export async function capturarPaso(
  page: Page, 
  nombre: string, 
  carpeta: string = 'default'
): Promise<void> {
  await ScreenshotHelper.capture(page, nombre, carpeta);
}
