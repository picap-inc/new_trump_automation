/**
 * barraPibox - Helper de compatibilidad con sistema anterior
 * 
 * @deprecated Este helper está deprecado. Crear PiboxNavigationPage cuando sea necesario.
 * Se mantiene para compatibilidad con tests no refactorizados.
 * 
 * TODO: Crear pages/PiboxNavigationPage.ts cuando se refactoricen tests de Pibox
 */

import { Page, expect } from "@playwright/test";

export async function barraPibox(page: Page, screenshotName?: string, folder?: string): Promise<void> {
  const menuButton = page.locator("#ham-menu");
  const sideNav = page.locator("#mySidenav");
  
  console.log("📦 Verificando estado del menú lateral de Pibox...");

  const isVisible = await menuButton.isVisible();

  if (isVisible) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    console.log("🟢 Botón visible. Intentando abrir menú...");
    await menuButton.scrollIntoViewIfNeeded();
    await menuButton.hover();
    // Force click: data-action puede interferir
    await menuButton.click({ force: true });
    await expect(sideNav).toBeVisible({ timeout: 10000 });
  } else {
    console.log("ℹ️ Botón de menú no visible. Posiblemente ya está abierto.");
  }

  console.log("✅ Menú lateral abierto.");
  
  // Captura opcional para compatibilidad
  if (screenshotName && folder) {
    const { capturarPaso } = await import('./capturas');
    await capturarPaso(page, screenshotName, folder);
  }
}
