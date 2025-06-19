import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar acceso a Códigos Piprime y Pipro y sus funciones", async ({ page }) => {

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "codigos-piprime-pipro");
    });

    await test.step("Abrir barra lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral_abierta", "codigos-piprime-pipro");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_click_marketing_growth", "codigos-piprime-pipro");
    });

    await test.step("Hacer click en Códigos Piprime y Pipro", async () => {
      const codesPiprimePro = page.getByRole('link', { name: 'Códigos Piprime y Pipro' });
      await expect(codesPiprimePro).toBeVisible({ timeout: 10000 });
      await codesPiprimePro.click();
      await capturarPaso(page, "04_click_codigos_piprime_pipro", "codigos-piprime-pipro");
    });

    await test.step("Completar filtros y buscar", async () => {
      const inputNombre = page.getByRole('textbox', { name: 'Nombre' });
      await expect(inputNombre).toBeVisible({ timeout: 5000 });
      await inputNombre.fill("CALZADO ADRENALINA");

      const inputFechaDesde = page.getByRole('textbox', { name: 'Desde' });
      await expect(inputFechaDesde).toBeVisible({ timeout: 5000 });
      await inputFechaDesde.fill("2025-03-04");

      const selectTipoCodigo = page.locator('#code_type');
      await expect(selectTipoCodigo).toBeVisible({ timeout: 5000 });
      await selectTipoCodigo.click();
      await page.keyboard.press('U');
      await page.keyboard.press('Enter');

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible();
      await botonBuscar.click();

      await capturarPaso(page, "05_filtros_aplicados_busqueda", "codigos-piprime-pipro");
    });

    await test.step("Limpiar filtros", async () => {
      await page.waitForTimeout(3000);

      const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
      await expect(botonLimpiar).toBeVisible();
      await botonLimpiar.click();

      await capturarPaso(page, "06_filtros_limpiados", "codigos-piprime-pipro");
    });
  });
});
