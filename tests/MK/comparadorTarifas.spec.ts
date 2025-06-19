import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub Módulo Marketing y Growth", () => {
  test("Validar módulo Comparador de Tarifas", async ({ page }) => {

    await test.step("Login", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "comparador-tarifas");
    });

    await test.step("Abrir barra lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral", "comparador-tarifas");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_click_marketing_growth", "comparador-tarifas");
    });

    await test.step("Click en Comparador de Tarifas", async () => {
      const comparadorTarifas = page.getByRole('link', { name: 'Comparador de tarifas' });
      await expect(comparadorTarifas).toBeVisible({ timeout: 10000 });
      await comparadorTarifas.click();
      await capturarPaso(page, "04_click_comparador_tarifas", "comparador-tarifas");
    });

    await test.step("Seleccionar ciudad y buscar", async () => {
      const citySelect = page.locator('#city_id');
      await expect(citySelect).toBeVisible({ timeout: 5000 });
      await citySelect.selectOption({ label: 'Bogota - Colombia' });

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible({ timeout: 5000 });
      await botonBuscar.click();

      await capturarPaso(page, "05_busqueda_bogota", "comparador-tarifas");
    });

    await test.step("Click en Limpiar", async () => {
      const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
      await expect(botonLimpiar).toBeVisible({ timeout: 5000 });
      await botonLimpiar.click();
      await capturarPaso(page, "06_click_limpiar", "comparador-tarifas");
    });

    await test.step("Esperar que se limpie el formulario", async () => {
      const citySelect = page.locator('#city_id');
      await expect(citySelect).toHaveValue('', { timeout: 5000 });
      await capturarPaso(page, "07_formulario_limpio", "comparador-tarifas");
    });

    await test.step("Click en Realizar comparación y validar URL", async () => {
      const botonComparar = page.getByRole('button', { name: 'Realizar comparación' });
      await expect(botonComparar).toBeVisible({ timeout: 5000 });
      await botonComparar.click();

      await expect(page).toHaveURL('https://admin.picap.io/benchmark_comparators/rate_report');
      await capturarPaso(page, "08_resultado_comparacion", "comparador-tarifas");
    });
  });
});
