/*
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

    await test.step("Ingresar a Convenio con franquicias", async () => {
      const sScoring = page.getByRole('link', { name: 'Convenios con franquicias' });
      await expect(sScoring).toBeVisible({ timeout: 7000 });
      await sScoring.click();
      await expect(page).toHaveURL("https://admin.picap.io/picash/franchises", {
        timeout: 10000,
      });
      await capturarPaso(page, "05_convenio_franquicias", "picash");
    });
 });
});
*/