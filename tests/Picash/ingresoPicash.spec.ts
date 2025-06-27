import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Picash", () => {
  test("Ingresar a Picash", async ({ page }) => {
    test.setTimeout(120000); // Timeout extendido

    // Paso 1: Iniciar sesión
    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "picash");
    });

    // Paso 2: Abrir barra lateral
    await test.step("Abrir barra lateral de navegación", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral", "picash");
    });

    // Paso 3: Ingresar al módulo Picash y validar URL
    await test.step("Navegar al módulo Picash y validar URL", async () => {
      const picash = page.getByRole('link', { name: 'home Picash' });
      await expect(picash).toBeVisible({ timeout: 10000 });
      await picash.click();

      // Validar URL después del clic
      await expect(page).toHaveURL("https://admin.picap.io/picash/", {
        timeout: 10000,
      });

      await capturarPaso(page, "03_click_modulo_picash", "picash");
    });
  });
});
