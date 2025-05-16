import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Validacion de visuales banners", () => {
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

    // Paso 4: Hover sobre "Visuales app" y clic en "Banners"
    await test.step("Ir a la sección Banners", async () => {
      const visualesApp = page.getByText('Visuales app');
      await expect(visualesApp).toBeVisible({ timeout: 10000 });
      await visualesApp.hover();

      const bannersLink = page.getByRole('link', { name: 'Banners' });
      await expect(bannersLink).toBeVisible({ timeout: 10000 });
      await bannersLink.click();

      await page.waitForTimeout(10000); // Esperar carga de página
    });

    // Paso 5: Crear nueva configuración de Slider
    await test.step("Crear configuración de slider de prueba", async () => {
      const nuevoSliderBtn = page.getByRole('button', { name: 'Nueva configuración de Slider' });
      await expect(nuevoSliderBtn).toBeVisible({ timeout: 10000 });
      await nuevoSliderBtn.click();

      await page.waitForTimeout(3000); // Esperar que cargue el formulario

      // Campo Nombre
      const nombreInput = page.getByLabel('Nombre');
      await expect(nombreInput).toBeVisible();
      await nombreInput.type('Prueba QA', { delay: 100 });
      await page.waitForTimeout(1000);

      // Campo Deeplink
      const deeplinkInput = page.getByRole('textbox', { name: 'Deeplink' });
      await expect(deeplinkInput).toBeVisible();
      await deeplinkInput.type('prueba QA deeplink', { delay: 100 });
      await page.waitForTimeout(1000);

      // Seleccionar País: Colombia
      const paisCombo = page.getByLabel('País');
      await expect(paisCombo).toBeVisible();
      await paisCombo.selectOption({ label: 'Colombia' });
      await page.waitForTimeout(1500); // Espera que aparezcan las ciudades

      // Seleccionar ciudad: Bogotá
      const ciudadSelector = page.locator('div:nth-child(6) > .ts-wrapper > .ts-control');
      await expect(ciudadSelector).toBeVisible();
      await ciudadSelector.click();
      await page.keyboard.type('Bogota', { delay: 100 });
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      // Click en Cancelar
      const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
    });

    // Paso 6: Buscar "Retiro Nicaragua Pilotos"
    await test.step('Buscar configuración por nombre', async () => {
      const buscarNombreInput = page.getByRole('textbox', { name: 'Nombre' });
      await expect(buscarNombreInput).toBeVisible({ timeout: 10000 });
      await buscarNombreInput.fill('');
      await buscarNombreInput.type('Retiro Nicaragua Pilotos', { delay: 80 });
      await page.waitForTimeout(1000);

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();
    });
  });
});
