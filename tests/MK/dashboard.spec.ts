import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Dashboard - Marketing y Growth", () => {
  test("Validar acceso a Dashboard y opciones en el select", async ({ page }) => {

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "dashboard-marketing");
    });

    await test.step("Abrir barra lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral", "dashboard-marketing");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth_click", "dashboard-marketing");
    });

    await test.step("Seleccionar Dashboard", async () => {
      const dashboardLink = page.getByRole("link", { name: "Dashboard", exact: true });
      await expect(dashboardLink).toBeVisible({ timeout: 10000 });
      await dashboardLink.click();
      await capturarPaso(page, "04_dashboard_click", "dashboard-marketing");
    });

    await test.step("Validar página Dashboard", async () => {
      const dashboardHeading = page.getByRole("heading", { name: "Usuarios registrados" });
      await expect(dashboardHeading).toBeVisible({ timeout: 10000 });
      await capturarPaso(page, "05_dashboard_cargado", "dashboard-marketing");
    });

    await test.step("Hacer clic en 'Ver' y validar URL", async () => {
      const verButton = page.getByRole("link", { name: "Ver" }).getByRole("button");
      await expect(verButton).toBeVisible({ timeout: 10000 });
      await verButton.click();

      await expect(page).toHaveURL("https://admin.picap.io/campaigns", { timeout: 10000 });
      await capturarPaso(page, "06_click_ver_redireccion", "dashboard-marketing");
    });

  });
});
