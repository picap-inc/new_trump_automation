import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de códigos promocionales", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "codigos-promocionales");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral_abierta", "codigos-promocionales");
    });

    await test.step("Entrar a Marketing y Growth", async () => {
      const marketingGrowth = page.getByText("Marketing y growth");
      await expect(marketingGrowth).toBeVisible({ timeout: 10000 });
      await marketingGrowth.click();
      await capturarPaso(page, "03_click_marketing_growth", "codigos-promocionales");
    });

    await test.step("Hover sobre Códigos promocionales", async () => {
      const codigos = page.getByText("Códigos promocionales").first();
      await expect(codigos).toBeVisible({ timeout: 10000 });
      await codigos.hover();
      await capturarPaso(page, "04_hover_codigos_promocionales", "codigos-promocionales");
    });

    await test.step("Entrar a Campañas promocodes", async () => {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }),
        page.getByRole("link", { name: "Campañas promocodes" }).click(),
      ]);
      await capturarPaso(page, "05_campanas_promocodes", "codigos-promocionales");
    });

    await test.step("Validar URL de campañas promocodes", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/promo_code_campaigns", { timeout: 10000 });
      await capturarPaso(page, "06_url_correcta", "codigos-promocionales");
    });

    await test.step("Ingresar texto en campo Nombre", async () => {
      const campoNombre = page.getByRole("textbox", { name: "Nombre" });
      await campoNombre.fill("ACTIVAR COD MICRO-INFL");
      await capturarPaso(page, "07_nombre_ingresado", "codigos-promocionales");
    });

    await test.step("Hacer clic en Buscar", async () => {
      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await buscarBtn.click();
      await capturarPaso(page, "08_click_buscar", "codigos-promocionales");
    });

    await test.step("Seleccionar campaña específica", async () => {
      const fila = page.getByRole("row", { name: "ACTIVAR COD MICRO-INFL" });
      await expect(fila).toBeVisible({ timeout: 10000 });
      await fila.getByRole("link").click();
      await capturarPaso(page, "09_click_en_campana", "codigos-promocionales");
    });

    await test.step("Guardar cambios", async () => {
      const guardar = page.getByRole("button", { name: "Guardar Cambios" });
      await expect(guardar).toBeVisible({ timeout: 10000 });
      await guardar.click();
      await capturarPaso(page, "10_guardar_cambios", "codigos-promocionales");
    });
  });
});
