import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub Módulo Marketing y Growth", () => {
  test("Validar módulo Códigos QR", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir menú lateral
    await Barra(page);

    // Paso 3: Seleccionar módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer click en "Comparador de tarifas"
    await test.step("Click en comparador de tarifas", async () => {
      const comparadorTarifas = page.getByRole('link', { name: 'Comparador de tarifas' });
      await expect(comparadorTarifas).toBeVisible({ timeout: 10000 });
      await comparadorTarifas.click();
    });

    // Paso 5: Seleccionar ciudad y hacer click en buscar
    await test.step("Seleccionar ciudad y buscar", async () => {
      const citySelect = page.locator('#city_id');
      await expect(citySelect).toBeVisible({ timeout: 5000 });
      await citySelect.selectOption({ label: 'Bogota - Colombia' });

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible({ timeout: 5000 });
      await botonBuscar.click();
    });


    // Paso 6: Click en "Limpiar"
    await test.step("Click en Limpiar", async () => {
      const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
      await expect(botonLimpiar).toBeVisible({ timeout: 5000 });
      await botonLimpiar.click();
    });

    // Paso 7: Esperar que el formulario se limpie
    await test.step("Esperar que se limpie el formulario", async () => {
      const citySelect = page.locator('#city_id');
      await expect(citySelect).toHaveValue('', { timeout: 5000 });
    });

    // Paso 8: Click en "Realizar comparación" y validar URL
    await test.step("Click en Realizar comparación y validar URL", async () => {
      const botonComparar = page.getByRole('button', { name: 'Realizar comparación' });
      await expect(botonComparar).toBeVisible({ timeout: 5000 });
      await botonComparar.click();

      // Validar URL
      await expect(page).toHaveURL('https://admin.picap.io/benchmark_comparators/rate_report');
    });
  });
});
