import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de Onboarding Dashboard", () => {
  test("Validar la página y sus respectivos filtros", async ({ page }) => {

    await test.step("Login y barra lateral", async () => {
      await login(page);
      await Barra(page);
      await capturarPaso(page, "01_login_barra", "onboarding");
    });

    await test.step("Abrir menú Onboarding", async () => {
      await page.getByText('Onboarding', { exact: true }).click();
      await capturarPaso(page, "02_menu_onboarding", "onboarding");
    });

    await test.step("Acceder a Onboarding Dashboard", async () => {
      await page.waitForSelector('text=Onboarding dashboard', { state: 'visible' });
      await page.getByRole('link', { name: 'Onboarding dashboard' }).click();
      await page.waitForURL("https://admin.picap.io/onboarding_dashboard", { timeout: 5000 });
      await expect(page).toHaveURL("https://admin.picap.io/onboarding_dashboard");
      await capturarPaso(page, "03_dashboard_cargado", "onboarding");
    });

    await test.step("Aplicar filtros del dashboard", async () => {
      await page.locator('#country').selectOption({ label: 'Colombia' });
      await page.waitForTimeout(1000);

      await page.locator('#city').selectOption({ label: 'Bogota' });

      await page.locator('#activation_date_two').fill('2025-01-21');
      await page.locator('#new_drivers_date_two').fill('2025-01-22');

      await page.locator('#month_status_onboarding').selectOption({ label: 'Noviembre 2024' });

      await capturarPaso(page, "04_filtros_aplicados", "onboarding");
    });
  });
});
