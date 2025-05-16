import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Validación de visuales en el mapa", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hover sobre "Visuales app" y clic en "Vehículos en el mapa"
    await test.step("Ir a la sección Vehículos en el mapa", async () => {
      const visualesApp = page.getByText('Visuales app');
      await expect(visualesApp).toBeVisible({ timeout: 10000 });
      await visualesApp.hover();

      const vehiculosMapa = page.getByRole('link', { name: 'Vehículos en el mapa' });
      await expect(vehiculosMapa).toBeVisible({ timeout: 10000 });
      await vehiculosMapa.click();

      await page.waitForTimeout(10000); // Esperar que cargue la página
    });

    // Paso 5: Seleccionar filtros y buscar
    await test.step("Aplicar filtros y buscar", async () => {
      // Seleccionar país: Colombia
      const paisSelect = page.locator('#country');
      await expect(paisSelect).toBeVisible({ timeout: 5000 });
      await paisSelect.selectOption({ label: 'Colombia' });
      await page.waitForTimeout(1000);

      // Seleccionar estado: Activo
      const estadoSelect = page.locator('#status');
      await expect(estadoSelect).toBeVisible({ timeout: 5000 });
      await estadoSelect.selectOption({ label: 'Activo' });
      await page.waitForTimeout(1000);

      // Click en botón Buscar
      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 5000 });
      await buscarBtn.click();

      await page.waitForTimeout(5000); // Esperar resultados


    // Paso 6: Ver detalles por país y buscar por tipo de vehículo
    await test.step("Ver detalles de Colombia y filtrar por tipo de vehículo", async () => {
        // Click en el enlace Colombia
        const linkColombia = page.getByRole('link', { name: 'Colombia' });
        await expect(linkColombia).toBeVisible({ timeout: 10000 });
        await linkColombia.click();
  
        // Esperar que cargue la nueva vista
        await page.waitForTimeout(5000);
  
        // Seleccionar tipo de vehículo: Moto
        const tipoVehiculo = page.locator('#vehicle_id');
        await expect(tipoVehiculo).toBeVisible({ timeout: 5000 });
        await tipoVehiculo.selectOption({ label: 'Moto' });
        await page.waitForTimeout(1000);
  
        // Clic en Buscar
        const buscarVehiculoBtn = page.getByRole('button', { name: 'Buscar' });
        await expect(buscarVehiculoBtn).toBeVisible({ timeout: 5000 });
        await buscarVehiculoBtn.click();
  
        await page.waitForTimeout(5000); // Espera después de buscar
      });
  
    });
  });
});
