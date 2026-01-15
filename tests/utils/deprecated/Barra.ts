import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator("#ham-menu");
  const menuContenido = page.locator(".mt-3");

  console.log("🔍 Esperando que el botón del menú esté disponible...");
  await expect(menuButton).toBeAttached({ timeout: 10000 });
  await expect(menuButton).toBeVisible({ timeout: 10000 });
  await expect(menuButton).toBeEnabled({ timeout: 10000 });

  // Asegurarse que no esté oculto por clases como 'hidden'
  await page.waitForFunction(() => {
    const el = document.getElementById('ham-menu');
    return el && !el.classList.contains('hidden');
  });

  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

  console.log("🖱️ Haciendo clic en el botón del menú...");
  await menuButton.click({ force: true });

  await expect(menuContenido).toBeVisible({ timeout: 10000 });
  console.log("✅ Menú lateral abierto y visible.");
}
