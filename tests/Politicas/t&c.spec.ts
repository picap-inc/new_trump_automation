import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Navegación al módulo Políticas Internas", () => {
  test("Ingresar a T&C y validar URL", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "t&c");
    });

    // Paso 2: Abrir el menú lateral
    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "t&c");
    });

    // Paso 3: Click en módulo Políticas Internas
    await test.step("Click en módulo Políticas internas", async () => {
      const politicas = page.getByText("Políticas internas");
      await expect(politicas).toBeVisible({ timeout: 10000 });
      await politicas.click();
      await capturarPaso(page, "03_politicas_internas", "t&c");
    });

    // Paso 4: Click en T&C
    await test.step("Click en T&C", async () => {
      const terminos = page.getByRole("link", { name: "T&C" });
      await expect(terminos).toBeVisible({ timeout: 10000 });
      await terminos.click();
      await capturarPaso(page, "04_t&_c", "t&c");
    });

    // Paso 5: Validar URL de T&C
    await test.step("Validar URL de T&C", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/application_settings/terms_and_conditions?lang=es");
    });
  });
});
