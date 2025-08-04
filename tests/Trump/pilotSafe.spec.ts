import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Navegación al módulo Trump", () => {
  test("Ingresar a Pilot Safe y validar filtros", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "trump");
    });

    // Paso 2: Abrir el menú lateral
    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "trump");
    });

    // Paso 3: Click en módulo Trump
    await test.step("Click en módulo Trump", async () => {
      const trump = page.getByText("TRUMP", { exact: true });
      await expect(trump).toBeVisible({ timeout: 10000 });
      await trump.click();
      await capturarPaso(page, "03_modulo_trump", "trump");
    });

    // Paso 4: Click en Pilot Safe
    await test.step("Click en Pilot Safe", async () => {
      const pilotSafe = page.getByRole("link", { name: "Pilot Safe" });
      await expect(pilotSafe).toBeVisible({ timeout: 10000 });
      await pilotSafe.click();
      await capturarPaso(page, "04_pilot_safe", "trump");
    });

    // Paso 5: Aplicar filtros de búsqueda
    await test.step("Aplicar filtros de búsqueda", async () => {
      // Seleccionar País: Colombia
      const pais = page.getByLabel("País");
      await pais.selectOption("Colombia");


      // Seleccionar Estado: Inactiva
      const estado = page.getByLabel("Estado");
      await estado.selectOption("Inactiva");

      // Seleccionar Tipo de Servicio: Picap Carro
      const tipoServicio = page.getByLabel("Tipos de servicio");
      await tipoServicio.selectOption("Picap Carro");

      // Click en Buscar
      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await buscarBtn.click();
      await page.waitForTimeout(5000); // Esperar que carguen los resultados
      await capturarPaso(page, "05_filtros_busqueda", "trump");

      // Click en Limpiar
      const limpiarBtn = page.getByRole("button", { name: "Limpiar" });
      await limpiarBtn.click();
      await capturarPaso(page, "06_limpiar_filtros", "trump");
    });
  });
});
