import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo App", () => {
  test("Validar flujo completo modulo App", async ({ page }) => {

    await test.step("Login y menú lateral", async () => {
      await login(page);
      await Barra(page);
      await capturarPaso(page, "01_login_barra", "Calidad");
    });

    await test.step("Seleccionar módulo App", async () => {
      const moduloApp = page.getByText('App', { exact: true });
      await expect(moduloApp).toBeVisible({ timeout: 10000 });
      await moduloApp.click();
      await capturarPaso(page, "02_App", "App");
    });

    await test.step("Entrar a Direcciones reportadas", async () => {
      const direReportadas = page.getByRole('link', { name: 'Direcciones reportadas' });
      await expect(direReportadas).toBeVisible({ timeout: 10000 });
      await direReportadas.click();
      await capturarPaso(page, "03_Direcciones", "App");
    });

    await test.step("Aplicar filtros de búsqueda", async () => {
      await page.getByPlaceholder('Fecha inicial').fill('2025-06-01');
      await page.getByPlaceholder('Fecha final').fill('2025-06-30');        
      await page.getByPlaceholder('Ciudad').fill('Bogotá, D.C.');
      await page.getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(2000); 
      await page.getByRole('link', { name: 'Limpiar' }).click();
    });

    await test.step("Crear nueva dirección (sin guardar)", async () => {
      await page.getByText('Crear nueva dirección').click();
      await expect(page.locator('#create-modal')).toBeVisible({ timeout: 5000 });

      // Llenado lento de campos
      await page.getByRole('textbox', { name: 'País' }).fill('Colombia');
      await page.locator('#create-modal #city').fill('Bogotá');
      await page.getByRole('textbox', { name: 'Localidad' }).fill('Chapinero');
      await page.getByRole('textbox', { name: 'Barrio' }).fill('La Salle');
      await page.getByRole('textbox', { name: 'Dirección', exact: true }).fill('Cra 7 #45-30');
      await page.getByRole('textbox', { name: 'Etiqueta o lugar de dirección' }).nth(0).fill('Casa');
      await page.getByRole('spinbutton', { name: 'Latitud' }).fill('4.648283');
      await page.getByRole('spinbutton', { name: 'Longitud' }).fill('-74.063924');

      await page.getByText('Salir sin crear').click();
    });
  });
});
