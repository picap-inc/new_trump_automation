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
      await barraPicash(page);
      await capturarPaso(page, "04_barra_picash_abierta", "picash");
    });

    await test.step("Navegar al submódulo Wallet Países y validar URL", async () => {
      const walletPaises = page.getByRole('link', { name: 'Wallet Países' });
      await expect(walletPaises).toBeVisible({ timeout: 10000 });
      await walletPaises.click();
      await expect(page).toHaveURL("https://admin.picap.io/picash/country_wallet", {
        timeout: 10000,
      });
      await capturarPaso(page, "05_wallet_paises_url", "picash");
    });
  });
});
