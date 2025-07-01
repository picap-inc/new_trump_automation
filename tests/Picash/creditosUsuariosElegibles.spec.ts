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

    await test.step("Ingresar a Usuarios Elegibles desde Créditos", async () => {
      const creditos = page.locator('a').filter({ hasText: /^Créditos$/ });
      await expect(creditos).toBeVisible({ timeout: 7000 });
      await creditos.click();

      const elegiblesUsuarios = page.getByRole('link', { name: 'Usuarios elegibles' });
      await expect(elegiblesUsuarios).toBeVisible({ timeout: 7000 });
      await elegiblesUsuarios.click();

      await expect(page).toHaveURL("https://admin.picap.io/picash/credits/passengers", {
        timeout: 10000,
      });

      await capturarPaso(page, "05_usuarios_elegibles", "picash");
    });

    await test.step("Buscar usuario elegible por número de billetera", async () => {
      const inputBilletera = page.getByRole('textbox', { name: 'Número de billetera' });
      await expect(inputBilletera).toBeVisible({ timeout: 5000 });

      const numeroBilletera = '3027099869';
      for (const char of numeroBilletera) {
        await inputBilletera.type(char, { delay: 300 }); // Escritura lenta
      }

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible({ timeout: 5000 });
      await botonBuscar.click();

      await capturarPaso(page, "06_busqueda_usuario_billetera", "picash");
    });
  });
});
