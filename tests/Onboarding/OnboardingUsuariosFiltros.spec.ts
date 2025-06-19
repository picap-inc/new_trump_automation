import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de Onboarding Dashboard", () => {
  test("Validar la página, filtros y exportación de listado", async ({ page }) => {
    test.setTimeout(60000); 

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral");
    });

    await test.step("Desplegar módulo Onboarding", async () => {
      await page.getByText('Onboarding', { exact: true }).click();
      await capturarPaso(page, "03_desplegar_onboarding");
    });

    await test.step("Esperar enlace 'Usuarios onboarding'", async () => {
      await page.waitForSelector('text= Usuarios onboarding', { state: 'visible' });
      await capturarPaso(page, "04_enlace_usuarios_onboarding");
    });

    await test.step("Ir a Usuarios onboarding", async () => {
      await page.getByRole('link', { name: 'Usuarios onboarding' }).click();
      await page.waitForURL("https://admin.picap.io/onboardings", { timeout: 15000 });
      await expect(page).toHaveURL("https://admin.picap.io/onboardings");
      await capturarPaso(page, "05_pagina_usuarios_onboarding");
    });

    await test.step("Seleccionar país Colombia", async () => {
      const paisSelect = page.locator('#country');
      await expect(paisSelect).toBeVisible();
      await paisSelect.selectOption({ label: 'Colombia' });
      await capturarPaso(page, "06_pais_colombia");
    });

    await test.step("Seleccionar ciudad Armenia usando teclado", async () => {
      const ciudadSelect = page.locator('#city');
      await expect(ciudadSelect).toBeVisible();
      await ciudadSelect.click();
      await page.keyboard.press('A');
      await page.keyboard.press('Enter');
      await capturarPaso(page, "07_ciudad_armenia");
    });

    await test.step("Seleccionar tipo de vehículo", async () => {
      const vehicleSelect = page.locator('#vehicle_type');
      await expect(vehicleSelect).toBeVisible();
      await vehicleSelect.selectOption({ label: 'Carro' });
      await capturarPaso(page, "08_tipo_vehiculo_carro");
    });

    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
      await capturarPaso(page, "09_busqueda_realizada");
    });

    await test.step("Esperar 15 segundos para reflejar búsqueda", async () => {
      await page.waitForTimeout(15000);
      await capturarPaso(page, "10_resultados_cargados");
    });

    await test.step("Exportar listado", async () => {
      const exportButton = page.getByRole('link', { name: 'Exportar listado' });
      await expect(exportButton).toBeVisible();
      await exportButton.click();
      await capturarPaso(page, "11_exportar_listado");
    });
  });
});
