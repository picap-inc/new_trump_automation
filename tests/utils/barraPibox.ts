import { Page, expect } from "@playwright/test";
import { capturarPaso } from "./capturas";

export async function barraPibox(
  page: Page,
  nombreCaptura: string = "menu_pibox",
  carpeta: string = "pibox"
): Promise<void> {
  const menuButton = page.locator("svg#ham-menu");

  console.log("🔍 Esperando que el botón del menú Pibox esté disponible...");
  await expect(menuButton).toBeAttached({ timeout: 10000 });

  // Esperamos que no esté oculto por 'hidden'
  await page.waitForFunction(() => {
    const el = document.getElementById("ham-menu");
    return el && !el.classList.contains("hidden");
  });

  console.log("🖱️ Haciendo clic en el botón del menú Pibox...");
  await menuButton.click({ force: true });

  console.log("⏳ Esperando que el link 'Compañías Compañías' sea visible...");
  await page.getByRole("link", { name: "Compañías Compañías" }).waitFor({ state: "visible", timeout: 5000 });

  console.log("✅ Menú lateral de Pibox abierto y visible.");
  await capturarPaso(page, nombreCaptura, carpeta);
}
