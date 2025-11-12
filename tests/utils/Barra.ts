/**
 * Barra - Helper de compatibilidad con sistema anterior
 * 
 * @deprecated Este helper está deprecado. Usar NavigationPage desde fixtures.
 * Se mantiene para compatibilidad con tests no refactorizados.
 * 
 * Uso en tests refactorizados:
 * import { test } from '../../fixtures/pages';
 * test('mi test', async ({ navigationPage }) => {
 *   await navigationPage.openSideMenu();
 * });
 */

import { Page, expect } from "@playwright/test";

export async function Barra(page: Page): Promise<void> {
  const menuButton = page.locator("#ham-menu");
  const menuContenido = page.locator(".mt-3");

  console.log("🔍 Esperando que el botón del menú esté disponible...");
  await expect(menuButton).toBeAttached({ timeout: 10000 });

  // Asegurarse que no esté oculto por clases como 'hidden'
  await page.waitForFunction(() => {
    const el = document.getElementById('ham-menu');
    return el && !el.classList.contains('hidden');
  });

  console.log("⏳ Esperando 5 segundos para que cargue completamente la vista post-login...");
  await page.waitForTimeout(5000); // ← espera adicional antes de tocar el menú

  console.log("🖱️ Haciendo clic en el botón del menú...");
  // Force click: data-action puede interferir con eventos
  await menuButton.click({ force: true });

  console.log("⏳ Esperando que el menú se despliegue...");
  await page.waitForTimeout(1500); // breve pausa para animación

  if (await menuContenido.isVisible()) {
    console.log("✅ Menú lateral abierto y visible.");
  } else {
    throw new Error("❌ El menú no se mantuvo abierto.");
  }
}

