import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Valdiacion de push masivas", () => {
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

      // Paso 4: Hacer click en "Push Masivos"
      await test.step("Hacer click en Push Masivos", async () => {
        const PushMasive = page.getByRole('link', { name: 'Push masivos' });
        await expect(PushMasive).toBeVisible({ timeout: 10000 });
        await PushMasive.click();

        // Paso 5: Crear un Push Masivo de prueba con pausas
        await test.step("Crear un Push Masivo de prueba", async () => {
          // Esperar que el botón esté visible y dar click
          const nuevoPushBtn = page.getByRole('button', { name: 'Nuevo push masivo' });
          await expect(nuevoPushBtn).toBeVisible({ timeout: 15000 });
          await nuevoPushBtn.click();

          // Esperar que el formulario cargue (puede tardar)
          await page.waitForTimeout(2000); // Espera de 2 segundos

          // Seleccionar "Push Masiva"
          const tipoPush = page.getByLabel('Tipo push');
          await expect(tipoPush).toBeVisible();
          await tipoPush.selectOption({ label: 'Push Masiva' });
          await page.waitForTimeout(1000); // Espera de 1 segundo

          // Escribir el título lentamente
          const titulo = page.getByLabel('Título');
          await expect(titulo).toBeVisible();
          await titulo.type('prueba qa automatizada', { delay: 100 });
          await page.waitForTimeout(1000);

          // Seleccionar "Envío inmediato"
          const tipoEnvio = page.getByLabel('Tipo de envío');
          await expect(tipoEnvio).toBeVisible();
          await tipoEnvio.selectOption({ label: 'Envío inmediato' });
          await page.waitForTimeout(1000);

          // Escribir texto push lentamente
          const textoPush = page.getByRole('textbox', { name: 'Texto push' });
          await expect(textoPush).toBeVisible();
          await textoPush.type('esto es una prueba qa de automatizacion', { delay: 80 });
          await page.waitForTimeout(1500);

          // Click en "Cancelar"
          const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
          await expect(cancelarBtn).toBeVisible();
          await cancelarBtn.click();
        });
      });
    });
  });
});
