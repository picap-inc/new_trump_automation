import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
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
  await menuButton.click();

  console.log("⏳ Esperando que el menú se despliegue...");
  await page.waitForTimeout(1500); // breve pausa para animación

  if (await menuContenido.isVisible()) {
    console.log("✅ Menú lateral abierto y visible.");
  } else {
    throw new Error("❌ El menú no se mantuvo abierto.");
  }
}
