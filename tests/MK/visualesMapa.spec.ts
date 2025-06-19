import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de visuales en el mapa", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "visuales-mapa");
    });

    await test.step("Abrir el menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "visuales-mapa");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth", "visuales-mapa");
    });

    await test.step("Acceder a Vehículos en el mapa", async () => {
      const visualesApp = page.getByText('Visuales app');
      await expect(visualesApp).toBeVisible({ timeout: 10000 });
      await visualesApp.hover();

      const vehiculosMapa = page.getByRole('link', { name: 'Vehículos en el mapa' });
      await expect(vehiculosMapa).toBeVisible({ timeout: 10000 });
      await vehiculosMapa.click();

      await page.waitForTimeout(10000);
      await capturarPaso(page, "04_vehiculos_mapa", "visuales-mapa");
    });

    await test.step("Aplicar filtros y buscar", async () => {
      const paisSelect = page.locator('#country');
      await expect(paisSelect).toBeVisible({ timeout: 5000 });
      await paisSelect.selectOption({ label: 'Colombia' });
      await page.waitForTimeout(1000);

      const estadoSelect = page.locator('#status');
      await expect(estadoSelect).toBeVisible({ timeout: 5000 });
      await estadoSelect.selectOption({ label: 'Activo' });
      await page.waitForTimeout(1000);

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 5000 });
      await buscarBtn.click();

      await page.waitForTimeout(5000);
      await capturarPaso(page, "05_busqueda_principal", "visuales-mapa");
    });

    await test.step("Ver detalles de Colombia y filtrar por tipo de vehículo", async () => {
      const linkColombia = page.getByRole('link', { name: 'Colombia' });
      await expect(linkColombia).toBeVisible({ timeout: 10000 });
      await linkColombia.click();

      await page.waitForTimeout(5000);

      const tipoVehiculo = page.locator('#vehicle_id');
      await expect(tipoVehiculo).toBeVisible({ timeout: 5000 });
      await tipoVehiculo.selectOption({ label: 'Moto' });
      await page.waitForTimeout(1000);

      const buscarVehiculoBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarVehiculoBtn).toBeVisible({ timeout: 5000 });
      await buscarVehiculoBtn.click();

      await page.waitForTimeout(5000);
      await capturarPaso(page, "06_filtro_tipo_vehiculo", "visuales-mapa");
    });
  });
});
