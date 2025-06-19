import { expect, test } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; // 

test.describe("Automatizar filtros con fechas, tipo de solicitud y ver detalle de la card", () => {
  test("Ingresar fechas, seleccionar tipo de solicitud, realizar búsqueda y ver detalles de la card", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "servicios");
    });

    // Paso 2: Abrir el menú lateral
    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu", "servicios");
    });

    // Paso 3: Seleccionar el módulo de "Servicios"
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
      await capturarPaso(page, "03_modulo_servicios", "servicios");
    });

    // Paso 4: Seleccionar submódulo PQRs
    await test.step("Seleccionar submódulo PQRs", async () => {
      const pqrs = page.getByRole("link", { name: "PQRs" });
      await expect(pqrs).toBeVisible({ timeout: 10000 });
      await pqrs.click();
      await capturarPaso(page, "04_submodulo_pqrs", "servicios");
    });

    // Paso 5: Ingresar las fechas en los filtros
    await test.step("Ingresar fechas en los filtros", async () => {
      const desde = page.getByRole('textbox', { name: 'Desde' });
      await expect(desde).toBeVisible();
      await desde.fill("2025-01-30");

      const hasta = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hasta).toBeVisible();
      const today = new Date().toISOString().split('T')[0];
      await hasta.fill(today);

      await capturarPaso(page, "05_fechas", "servicios");
    });

    // Paso 6: Seleccionar el tipo de solicitud
    await test.step("Seleccionar tipo de solicitud", async () => {
      const tipoSolicitud = page.locator('#type_of_request_cd');
      await expect(tipoSolicitud).toBeVisible();
      await tipoSolicitud.selectOption({ label: 'Problemas con la entrega' });
      await capturarPaso(page, "06_tipo_solicitud", "servicios");
    });

    // Paso 7: Dar click en el botón "Buscar"
    await test.step("Dar click en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
      await capturarPaso(page, "07_resultado_busqueda", "servicios");
    });

    // Paso 8: Hacer click en uno de los resultados de búsqueda
    await test.step("Seleccionar uno de los resultados", async () => {
      const resultado = page.locator('div:nth-child(5) > div > a').first();
      await page.waitForSelector('div:nth-child(5) > div > a', { timeout: 30000 });
      await expect(resultado).toBeVisible();
      await capturarPaso(page, "08_resultado_visible", "servicios");
      await resultado.click();
    });
  });
});
