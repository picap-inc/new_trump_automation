import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { barraPicash } from "../utils/barraPicash";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Picash", () => {
  test("Ingresar a Picash", async ({ page }) => {
    test.setTimeout(120000);

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "picash");
    });

    await test.step("Abrir barra lateral general de navegación", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_general", "picash");
    });

    await test.step("Navegar al módulo Picash y validar URL", async () => {
      const picash = page.getByRole('link', { name: 'home Picash' });
      await expect(picash).toBeVisible({ timeout: 10000 });
      await picash.click();
      await expect(page).toHaveURL("https://admin.picap.io/picash/", { timeout: 10000 });
      await capturarPaso(page, "03_click_modulo_picash", "picash");
    });

    await test.step("Abrir menú lateral de Picash y validar", async () => {
      const headingPicash = await barraPicash(page); 
      await expect(headingPicash).toBeVisible({ timeout: 7000 }); 
      await capturarPaso(page, "04_barra_picash_abierta", "picash");
    });

    await test.step("Ingresar a Validación de Certificados desde Retiros", async () => {
      const retiros = page.locator('a').filter({ hasText: 'Retiros' });
      await expect(retiros).toBeVisible({ timeout: 7000 });
      await retiros.click();

      const validacionCerti = page.getByRole('link', { name: 'Validación Certificados' });
      await expect(validacionCerti).toBeVisible({ timeout: 7000 });
      await validacionCerti.click();

      await expect(page).toHaveURL("https://admin.picap.io/picash/cashout/cashout_dashboard", {
        timeout: 10000,
      });
    });

    await test.step("Seleccionar banco y estado, luego Buscar", async () => {
      const bancoSelect = page.locator('select[name="bank_id"]');
      await expect(bancoSelect).toBeVisible({ timeout: 5000 });
      await bancoSelect.selectOption({ label: 'BBVA' });

      const estadoSelect = page.locator('select[name="status"]');
      await expect(estadoSelect).toBeVisible({ timeout: 5000 });
      await estadoSelect.selectOption({ label: 'Rejected' });

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 5000 });
      await buscarBtn.click();

      await capturarPaso(page, "05_filtros_aplicados_busqueda", "picash");
    });

    await test.step("Seleccionar checkbox y rechazar solicitud", async () => {
      // Esperar a que al menos un checkbox esté visible
      const checkbox = page.locator('#select_account_').first();
      await expect(checkbox).toBeVisible({ timeout: 10000 });
      await checkbox.check();

      // Escuchar y validar la alerta nativa del navegador
      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toBe("Ingrese un comentario para el rechazo:");
        await dialog.dismiss(); // Cambia a .accept() si se debe aceptar
      });

      // Clic en botón Rechazar
      const rechazarBtn = page.getByRole('button', { name: 'Rechazar' });
      await expect(rechazarBtn).toBeVisible({ timeout: 5000 });
      await rechazarBtn.click();

      await capturarPaso(page, "06_rechazo_alerta", "picash");
    });
  });
});
