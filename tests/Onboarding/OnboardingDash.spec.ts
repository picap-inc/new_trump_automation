import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación de Onboarding Dashboard", () => {
  test("Validar la página y sus respectivos filtros", async ({ page }) => {
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral");
    });

    await test.step("Desplegar módulo Onboarding", async () => {
      await page.getByText('Onboarding', { exact: true }).click();
      await capturarPaso(page, "03_desplegar_onboarding");
    });

    await test.step("Esperar enlace 'Onboarding Dashboard'", async () => {
      await page.waitForSelector('text=Onboarding dashboard', { state: 'visible' });
      await capturarPaso(page, "04_esperar_dashboard_link");
    });

    await test.step("Ir a Onboarding Dashboard", async () => {
      await page.getByRole('link', { name: 'Onboarding dashboard' }).click();
      await page.waitForURL("https://admin.picap.io/onboarding_dashboard", { timeout: 5000 });
      await expect(page).toHaveURL("https://admin.picap.io/onboarding_dashboard");
      await capturarPaso(page, "05_dashboard_abierto");
    });
  });
});
