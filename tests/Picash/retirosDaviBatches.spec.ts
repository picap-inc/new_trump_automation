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
      await expect(page).toHaveURL("https://admin.picap.io/picash/", {
        timeout: 10000,
      });
      await capturarPaso(page, "03_click_modulo_picash", "picash");
    });

    await test.step("Abrir menú lateral de Picash y validar", async () => {
      const headingPicash = await barraPicash(page); 
      await expect(headingPicash).toBeVisible({ timeout: 7000 }); 
      await capturarPaso(page, "04_barra_picash_abierta", "picash");
    });

    await test.step("Ingresar a Daviplata Batches desde Retiros", async () => {
      // Click en 'Retiros'
      const retiros = page.locator('a').filter({ hasText: 'Retiros' });
      await expect(retiros).toBeVisible({ timeout: 7000 });
      await retiros.click();

      // Click en 'Daviplata Batches'
      const daviplataBatches = page.getByRole('link', { name: 'Daviplata Batches' });
      await expect(daviplataBatches).toBeVisible({ timeout: 7000 });
      await daviplataBatches.click();

      // Validar URL
      await expect(page).toHaveURL("https://admin.picap.io/picash/withdrawals_daviplata_batches", {
        timeout: 10000,
      });

      // Captura de pantalla
      await capturarPaso(page, "05_daviplata_batches", "picash");
    });
  });
});
