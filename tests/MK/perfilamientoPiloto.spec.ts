import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de perfilamiento pilotos", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "perfilamiento-pilotos");
    });

    await test.step("Abrir el menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "perfilamiento-pilotos");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing", "perfilamiento-pilotos");
    });

    await test.step("Ir a la sección Perfilamiento > Pilotos", async () => {
      const Perfilamiento = page.getByText("Perfilamiento");
      await expect(Perfilamiento).toBeVisible({ timeout: 10000 });
      await Perfilamiento.hover();

      const perfiPilotos = page.getByRole("link", { name: "Pilotos" });
      await expect(perfiPilotos).toBeVisible({ timeout: 10000 });
      await perfiPilotos.click();

      await page.waitForTimeout(5000);
      await capturarPaso(page, "04_perfilamiento_pilotos", "perfilamiento-pilotos");
    });

  });
});
