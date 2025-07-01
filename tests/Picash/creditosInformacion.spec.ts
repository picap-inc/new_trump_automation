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

    await test.step("Ingresar a Informacion de creditos desde Creditos", async () => {
      const creditos = page.locator('a').filter({ hasText: /^Créditos$/ });
      await expect(creditos).toBeVisible({ timeout: 7000 });
      await creditos.click();

      const infoCreditos = page.getByRole('link', { name: 'Información de créditos' });
      await expect(infoCreditos).toBeVisible({ timeout: 7000 });
      await infoCreditos.click();

      await expect(page).toHaveURL("https://admin.picap.io/picash/credits", {
        timeout: 10000,
      });

      await capturarPaso(page, "05_info_creditos", "picash");
    });

    await test.step("Filtrar información de créditos", async () => {
      const inputDocumento = page.getByRole('textbox', { name: 'Número de documento' });
      await expect(inputDocumento).toBeVisible({ timeout: 7000 });
      await inputDocumento.fill('184004234');

      const inputBilletera = page.getByRole('textbox', { name: 'Número de billetera' });
      await expect(inputBilletera).toBeVisible({ timeout: 7000 });
      await inputBilletera.fill('3245649054');

      const estadoSelect = page.locator('#active');
      await expect(estadoSelect).toBeVisible({ timeout: 7000 });
      await estadoSelect.selectOption({ label: 'Detenido' });

      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeVisible({ timeout: 7000 });
      await botonBuscar.click();

      await page.waitForTimeout(2000);

      await capturarPaso(page, "06_filtro_creditos", "picash");
    });

    await test.step("Ver primer resultado y cerrar modal", async () => {
      // Clic en botón del primer resultado (dinámico)
      const primerResultado = page.getByRole('row').first().getByRole('button');
      await expect(primerResultado).toBeVisible({ timeout: 7000 });
      await primerResultado.click();

      // Esperar que el modal cargue
      const botonCerrarModal = page.getByRole('button', { name: 'Cerrar modal' });
      await expect(botonCerrarModal).toBeVisible({ timeout: 10000 });

      // Captura del modal abierto (opcional)
      await capturarPaso(page, "07_modal_abierto", "picash");

      // Cerrar el modal
      await botonCerrarModal.click();

      // Validar que el modal se haya cerrado (esperar que desaparezca)
      await expect(botonCerrarModal).toBeHidden({ timeout: 7000 });
    });
  });
});
