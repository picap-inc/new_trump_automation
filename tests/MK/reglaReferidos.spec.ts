import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar acceso y creación de regla para referidos", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "reglas_referidos");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "reglas_referidos");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth", "reglas_referidos");
    });

    await test.step("Hover sobre Códigos Promocionales", async () => {
      const hoverPromo = page.getByText("Códigos promocionales").first();
      await expect(hoverPromo).toBeVisible();
      await hoverPromo.hover();
      await capturarPaso(page, "04_hover_codigos", "reglas_referidos");
    });

    await test.step("Seleccionar Reglas para Referidos", async () => {
      const reglasReferidos = page.getByText("Reglas para referidos");
      await expect(reglasReferidos).toBeVisible({ timeout: 5000 });
      await reglasReferidos.click();
      await capturarPaso(page, "05_click_reglas", "reglas_referidos");
    });

    await test.step("Validar URL", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/referral_code_rules", { timeout: 10000 });
      await capturarPaso(page, "06_url_valida", "reglas_referidos");
    });

    await test.step("Ingresar código en el campo Nombre", async () => {
      const inputNombre = page.getByRole("textbox", { name: "Nombre" });
      await expect(inputNombre).toBeVisible({ timeout: 5000 });
      await inputNombre.fill("REFERIDOS-CARRO-BOG-MED-IBA-MARZO-2");
      await capturarPaso(page, "07_nombre_ingresado", "reglas_referidos");
    });

    await test.step("Hacer clic en Buscar", async () => {
      const btnBuscar = page.getByRole("button", { name: "Buscar" });
      await expect(btnBuscar).toBeVisible({ timeout: 5000 });
      await btnBuscar.click();
      await capturarPaso(page, "08_busqueda_hecha", "reglas_referidos");
    });

    await test.step("Esperar carga de búsqueda", async () => {
      await page.waitForTimeout(3000);
    });

    await test.step("Hacer clic en Limpiar", async () => {
      const btnLimpiar = page.getByRole("button", { name: "Limpiar" });
      await expect(btnLimpiar).toBeVisible({ timeout: 5000 });
      await btnLimpiar.click();
      await capturarPaso(page, "09_limpieza_hecha", "reglas_referidos");
    });

    await test.step("Clic en Nueva regla para referidos", async () => {
      const btnNuevaRegla = page.getByRole("button", { name: "Nueva regla para referidos" });
      await expect(btnNuevaRegla).toBeVisible({ timeout: 5000 });
      await btnNuevaRegla.click();
      await capturarPaso(page, "10_formulario_nueva_regla", "reglas_referidos");
    });
  });
});
