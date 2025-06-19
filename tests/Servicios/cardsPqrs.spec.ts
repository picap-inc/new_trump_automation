import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Mover card de Cerrado a Reconsideración", () => {
  test("Realizar movimiento de card de Cerrado a Reconsideración", async ({ page }) => {
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "servicios");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "servicios");
    });

    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
      await capturarPaso(page, "03_modulo_servicios", "servicios");
    });

    await test.step("Seleccionar submódulo PQRs", async () => {
      const pqrs = page.getByRole("link", { name: "PQRs" });
      await expect(pqrs).toBeVisible({ timeout: 10000 });
      await pqrs.click();
      await capturarPaso(page, "04_submodulo_pqrs", "servicios");
    });

    await test.step("Hacer clic en Buscar", async () => {
      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeVisible({ timeout: 10000 });
      await buscarBtn.click();
      await capturarPaso(page, "05_buscar", "servicios");
    });

    await test.step("Esperar la aparición de la tarjeta", async () => {
      await page.waitForSelector("a:has-text('Testeo 2')", { timeout: 15000 });
      await capturarPaso(page, "06_card_visible", "servicios");
    });

    await test.step("Mover card de Cerrado a Reconsideración", async () => {
      const cardCerrado = page.locator("a:has-text('Testeo 2')").first();
      const columnaReconsideracion = page.locator("#pqrs_list > .grid > div:nth-child(5)");

      await expect(cardCerrado).toBeVisible({ timeout: 10000 });
      await expect(columnaReconsideracion).toBeVisible({ timeout: 10000 });

      await cardCerrado.hover();
      await page.mouse.down();
      await columnaReconsideracion.hover();
      await page.mouse.up();

      await page.waitForTimeout(3000);
      await capturarPaso(page, "07_card_movida", "servicios");
    });

    await test.step("Verificar que la card está en Reconsideración", async () => {
      const cardReconsideracion = page.locator("#pqrs_list > .grid > div:nth-child(5)");
      await expect(cardReconsideracion).toContainText("Testeo 2");
      await capturarPaso(page, "08_card_reconsideracion", "servicios");
    });
  });
});
