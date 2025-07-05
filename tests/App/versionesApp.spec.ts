/*

import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo App", () => {
  test("Validar flujo completo modulo App", async ({ page }) => {

    await test.step("Login y menú lateral", async () => {
      await login(page);
      await Barra(page);
      await capturarPaso(page, "01_login_barra", "Calidad");
    });

    await test.step("Seleccionar módulo App", async () => {
      const moduloApp = page.getByText('App', { exact: true });
      await expect(moduloApp).toBeVisible({ timeout: 10000 });
      await moduloApp.click();
      await capturarPaso(page, "02_App", "App");
    });

    await test.step("Entrar a Versiones de la app", async () => {
      const verApp = page.getByRole('link', { name: 'Versiones de la app' });
      await expect(verApp).toBeVisible({ timeout: 12000 });
      await verApp.click();
      await capturarPaso(page, "03_Version", "App");

    // Validar URL
      await expect(page).toHaveURL("https://admin.picap.io/app_versions", {
      timeout: 10000,

//SE COMENTA EL CODIGO PORQUE NO SE VE REFLEJADA LA OPCION EN NUEVO TRUMP
    });
  });
 });
});
*/
