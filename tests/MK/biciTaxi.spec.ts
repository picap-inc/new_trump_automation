import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar módulo Bicitaxi", async ({ page }) => {

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "bicitaxi");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral_abierta", "bicitaxi");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth_click", "bicitaxi");
    });

    await test.step("Click en Bicitaxi", async () => {
      const biciModule = page.getByRole('link', { name: 'Bicitaxi', exact: true });
      await expect(biciModule).toBeVisible({ timeout: 10000 });
      await biciModule.click();
      await capturarPaso(page, "04_bicitaxi_click", "bicitaxi");
    });

    await test.step("Aplicar filtros y validarlos", async () => {
      const zonaSelect = page.locator('#name');
      await expect(zonaSelect).toBeVisible();
      await zonaSelect.selectOption({ label: 'Centro Suba' });

      const estadoSelect = page.locator('#is_enabled');
      await expect(estadoSelect).toBeVisible();
      await estadoSelect.selectOption({ label: 'Activa' });

      const ciudadSelect = page.locator('#city_id');
      await expect(ciudadSelect).toBeVisible();
      await ciudadSelect.selectOption({ label: 'Bogota - Colombia' });

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();
      await page.waitForTimeout(2000);

      await capturarPaso(page, "05_filtros_aplicados", "bicitaxi");

      const limpiarBtn = page.getByRole('button', { name: 'Limpiar' });
      await expect(limpiarBtn).toBeVisible();
      await limpiarBtn.click();

      await capturarPaso(page, "06_filtros_limpiados", "bicitaxi");
    });

    await test.step("Crear una nueva zona y cancelar", async () => {
      const crearZonaBtn = page.getByRole('button', { name: 'Crear zona' });
      await expect(crearZonaBtn).toBeVisible();
      await crearZonaBtn.click();

      const nombreZonaInput = page.getByRole('textbox', { name: 'Nombre de la zona' });
      await expect(nombreZonaInput).toBeVisible();
      await nombreZonaInput.fill('Prueba QA');

      const paisSelect = page.getByLabel('País');
      await expect(paisSelect).toBeVisible();
      await paisSelect.selectOption({ label: 'Colombia' });

      const ciudadDropdown = page.locator('.ts-control');
      await expect(ciudadDropdown).toBeVisible();
      await ciudadDropdown.click();
      await ciudadDropdown.type('Bogota');
      await page.keyboard.press('Enter');

      const latitudInput = page.getByRole('textbox', { name: 'Latitud' });
      await expect(latitudInput).toBeVisible();
      await latitudInput.fill('4.710989');

      const longitudInput = page.getByRole('textbox', { name: 'Longitud' });
      await expect(longitudInput).toBeVisible();
      await longitudInput.fill('-74.072090');

      await capturarPaso(page, "07_formulario_zona_completo", "bicitaxi");

      const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();

      await capturarPaso(page, "08_zona_cancelada", "bicitaxi");
    });
  });
});
