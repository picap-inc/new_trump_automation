import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de perfilamiento pasajeros", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "perfilamiento-pasajeros");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "perfilamiento-pasajeros");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing", "perfilamiento-pasajeros");
    });

    await test.step("Ir a la sección Perfilamiento > Pasajeros", async () => {
      const Perfilamiento = page.getByText("Perfilamiento");
      await expect(Perfilamiento).toBeVisible({ timeout: 10000 });
      await Perfilamiento.hover();

      const perfiPasajero = page.getByRole("link", { name: "Pasajeros" });
      await expect(perfiPasajero).toBeVisible({ timeout: 10000 });
      await perfiPasajero.click();

      await page.waitForTimeout(5000);
      await capturarPaso(page, "04_perfilamiento_pasajeros", "perfilamiento-pasajeros");
    });

  });
});
