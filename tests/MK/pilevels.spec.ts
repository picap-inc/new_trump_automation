import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar módulo Pilevels", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "pilevels");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "pilevels");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth", "pilevels");
    });

    await test.step("Hacer clic en Pilevels", async () => {
      const pilevelModule = page.getByRole("link", { name: "Pilevels" });
      await expect(pilevelModule).toBeVisible({ timeout: 10000 });
      await pilevelModule.click();
      await capturarPaso(page, "04_pilevels", "pilevels");
    });

    await test.step("Seleccionar país Colombia", async () => {
      const countrySelect = page.getByRole("combobox", { name: "País" });
      await countrySelect.click();
      await expect(countrySelect).toBeEnabled({ timeout: 5000 });
      await countrySelect.fill("Colombia");

      const optionColombia = page.locator('div[role="option"]', { hasText: "Colombia" });
      await expect(optionColombia).toBeVisible({ timeout: 5000 });
      await optionColombia.click();
      await capturarPaso(page, "05_pais_colombia", "pilevels");
    });

    await test.step("Seleccionar tipo de visual y usuario, luego buscar y limpiar", async () => {
      const tipoVisualSelect = page.getByRole("combobox", { name: "Tipo de visual" });
      await tipoVisualSelect.click();
      await expect(tipoVisualSelect).toBeEnabled({ timeout: 5000 });
      await tipoVisualSelect.fill("Pilevel");

      const tipoVisualOption = page.getByRole("option", { name: "Pilevel" }).nth(1);
      await expect(tipoVisualOption).toBeVisible({ timeout: 5000 });
      await tipoVisualOption.click();

      const tipoUsuarioSelect = page.getByRole("combobox", { name: "Tipo de usuario" });
      await tipoUsuarioSelect.click();
      await expect(tipoUsuarioSelect).toBeEnabled({ timeout: 5000 });
      await tipoUsuarioSelect.fill("Pasajero");

      const tipoUsuarioOption = page.getByRole("option", { name: "Pasajero" }).nth(1);
      await expect(tipoUsuarioOption).toBeVisible({ timeout: 5000 });
      await tipoUsuarioOption.click();

      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeEnabled({ timeout: 5000 });
      await buscarButton.click();

      const limpiarButton = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarButton).toBeEnabled({ timeout: 5000 });
      await limpiarButton.click();

      await capturarPaso(page, "06_busqueda_limpieza", "pilevels");
    });

  });
});
