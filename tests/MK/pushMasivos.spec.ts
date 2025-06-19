import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de push masivas", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "push_masivos");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "push_masivos");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth", "push_masivos");
    });

    await test.step("Hacer click en Push Masivos", async () => {
      const PushMasive = page.getByRole('link', { name: 'Push masivos' });
      await expect(PushMasive).toBeVisible({ timeout: 10000 });
      await PushMasive.click();
      await capturarPaso(page, "04_push_masivos", "push_masivos");
    });

    await test.step("Crear un Push Masivo de prueba", async () => {
      const nuevoPushBtn = page.getByRole('button', { name: 'Nuevo push masivo' });
      await expect(nuevoPushBtn).toBeVisible({ timeout: 15000 });
      await nuevoPushBtn.click();
      await page.waitForTimeout(2000);
      await capturarPaso(page, "05_formulario_abierto", "push_masivos");

      const tipoPush = page.getByLabel('Tipo push');
      await expect(tipoPush).toBeVisible();
      await tipoPush.selectOption({ label: 'Push Masiva' });
      await page.waitForTimeout(1000);

      const titulo = page.getByLabel('Título');
      await expect(titulo).toBeVisible();
      await titulo.type('prueba qa automatizada', { delay: 100 });

      const tipoEnvio = page.getByLabel('Tipo de envío');
      await expect(tipoEnvio).toBeVisible();
      await tipoEnvio.selectOption({ label: 'Envío inmediato' });
      await page.waitForTimeout(1000);

      const textoPush = page.getByRole('textbox', { name: 'Texto push' });
      await expect(textoPush).toBeVisible();
      await textoPush.type('esto es una prueba qa de automatizacion', { delay: 80 });

      await capturarPaso(page, "06_formulario_lleno", "push_masivos");

      const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
      await capturarPaso(page, "07_formulario_cancelado", "push_masivos");
    });
  });
});
