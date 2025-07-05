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

    await test.step("Llenar filtros y buscar", async () => {
      await page.getByPlaceholder('Fecha inicial').fill('2025-06-01');
      await page.getByPlaceholder('Fecha final').fill('2025-06-30');        
      await page.getByPlaceholder('Ciudad').fill('Bogotá, D.C.');

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 5000 });
      await expect(buscarBtn).toBeEnabled({ timeout: 5000 });
      await buscarBtn.click();

      await page.waitForTimeout(3000); // Esperar resultados
    });

  });
});
