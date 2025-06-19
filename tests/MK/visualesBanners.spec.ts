import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de visuales - Banners", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "visuales-banners");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "visuales-banners");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_modulo_marketing", "visuales-banners");
    });

    await test.step("Ir a la sección Banners", async () => {
      const visualesApp = page.getByText('Visuales app');
      await expect(visualesApp).toBeVisible({ timeout: 10000 });
      await visualesApp.hover();

      const bannersLink = page.getByRole('link', { name: 'Banners' });
      await expect(bannersLink).toBeVisible({ timeout: 10000 });
      await bannersLink.click();

      await page.waitForTimeout(10000);
      await capturarPaso(page, "04_banners_abierto", "visuales-banners");
    });

    await test.step("Crear configuración de slider de prueba", async () => {
      const nuevoSliderBtn = page.getByRole('button', { name: 'Nueva configuración de Slider' });
      await expect(nuevoSliderBtn).toBeVisible({ timeout: 10000 });
      await nuevoSliderBtn.click();

      await page.waitForTimeout(3000);

      const nombreInput = page.getByLabel('Nombre');
      await expect(nombreInput).toBeVisible();
      await nombreInput.type('Prueba QA', { delay: 100 });

      const deeplinkInput = page.getByRole('textbox', { name: 'Deeplink' });
      await expect(deeplinkInput).toBeVisible();
      await deeplinkInput.type('prueba QA deeplink', { delay: 100 });

      const paisCombo = page.getByLabel('País');
      await expect(paisCombo).toBeVisible();
      await paisCombo.selectOption({ label: 'Colombia' });
      await page.waitForTimeout(1500);

      const ciudadSelector = page.locator('div:nth-child(6) > .ts-wrapper > .ts-control');
      await expect(ciudadSelector).toBeVisible();
      await ciudadSelector.click();
      await page.keyboard.type('Bogota', { delay: 100 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();

      await capturarPaso(page, "05_creacion_cancelada", "visuales-banners");
    });

    await test.step("Buscar configuración por nombre", async () => {
      const buscarNombreInput = page.getByRole('textbox', { name: 'Nombre' });
      await expect(buscarNombreInput).toBeVisible();
      await buscarNombreInput.fill('');
      await buscarNombreInput.type('Retiro Nicaragua Pilotos', { delay: 80 });

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();

      await capturarPaso(page, "06_busqueda_retiro", "visuales-banners");
    });

  });
});
