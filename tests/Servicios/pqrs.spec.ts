import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Navegación al módulo de PQRs", () => {
  test("Acceder a la sección de PQRs", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "servicios");
    });

    // Paso 2: Abrir el menú lateral
    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "servicios");
    });

    // Paso 3: Esperar a que "Servicios" sea interactuable y hacer clic
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
      await capturarPaso(page, "03_modulo_servicios", "servicios");
    });

    // Paso 4: Hacer clic en "PQRs"
    await test.step("Seleccionar submódulo PQRs", async () => {
      const pqrs = page.getByRole("link", { name: "PQRs" });
      await expect(pqrs).toBeVisible({ timeout: 10000 });
      await pqrs.click();
      await capturarPaso(page, "04_submodulo_pqrs", "servicios");
    });

    // Paso 5: Validar que la página se cargó correctamente verificando la URL
    await test.step("Validar carga de la página de PQRs", async () => {
      const expectedUrl = "https://admin.picap.io/pqrs";
      await expect(page).toHaveURL(expectedUrl, { timeout: 10000 });
      await capturarPaso(page, "05_url_pqrs", "servicios");
    });
  });
});
