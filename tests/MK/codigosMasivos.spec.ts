import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar acceso a Códigos Masivos y sus respectivas funciones", async ({ page }) => {
    
    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "codigos-masivos");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral_abierta", "codigos-masivos");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_click_marketing_growth", "codigos-masivos");
    });

    await test.step("Hover sobre Códigos Promocionales", async () => {
      const codigos = page.getByText("Códigos promocionales").first();
      await expect(codigos).toBeVisible({ timeout: 10000 });
      await codigos.hover();
      await capturarPaso(page, "04_hover_codigos_promocionales", "codigos-masivos");
    });

    await test.step("Seleccionar Códigos masivos", async () => {
      const codigosMasivos = page.getByRole('link', { name: 'Códigos masivos' });
      await expect(codigosMasivos).toBeVisible({ timeout: 5000 });
      await codigosMasivos.click();
      await capturarPaso(page, "05_click_codigos_masivos", "codigos-masivos");
    });

    await test.step("Buscar y limpiar en Códigos masivos", async () => {
      const inputNombre = page.getByRole('textbox', { name: 'Nombre' });
      await expect(inputNombre).toBeVisible({ timeout: 5000 });
      await inputNombre.fill("PRUEBASQA");

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible();
      await botonBuscar.click();
      await page.waitForTimeout(3000);
      await capturarPaso(page, "06_busqueda_por_nombre", "codigos-masivos");

      const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
      await expect(botonLimpiar).toBeVisible();
      await botonLimpiar.click();
      await page.waitForTimeout(4000);
      await capturarPaso(page, "07_busqueda_limpiada", "codigos-masivos");
    });

    await test.step("Filtrar por estado 'Finalizado' y buscar", async () => {
      const selectEstado = page.locator('#code_status');
      await expect(selectEstado).toBeVisible({ timeout: 5000 });
      await selectEstado.click();
      await page.keyboard.press('F'); // Filtra por "Finalizado"
      await page.keyboard.press('Enter');

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible();
      await botonBuscar.click();
      await capturarPaso(page, "08_estado_finalizado_filtrado", "codigos-masivos");
    });
  });
});
