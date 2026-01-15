import { Page, expect, Locator } from "@playwright/test";

export async function barraPicash(page: Page): Promise<Locator> {
  const menuButton = page.locator("#ham-menu");
  const headingPicash = page.getByRole('heading', { name: 'Picash', exact: true });

  console.log("📦 Verificando estado del menú lateral de Picash...");

  const isVisible = await menuButton.isVisible();

  if (isVisible) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

    console.log("🟢 Botón visible. Intentando abrir menú...");
    await menuButton.scrollIntoViewIfNeeded();
    await menuButton.hover();
    await menuButton.click({ force: true });
  } else {
    console.log("ℹ️ Botón de menú no visible. Posiblemente ya está abierto.");
  }

  console.log("🔍 Esperando validación por heading 'Picash'...");
  await expect(headingPicash).toBeVisible({ timeout: 7000 });

  console.log("✅ Menú lateral de Picash verificado correctamente mediante heading.");

  return headingPicash; 
}
