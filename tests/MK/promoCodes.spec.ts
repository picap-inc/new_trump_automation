import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de códigos promocionales", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "codigos_promocionales");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "codigos_promocionales");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth", "codigos_promocionales");
    });

    await test.step("Hover sobre Códigos Promocionales", async () => {
      const promoCodes = page.getByText("Códigos promocionales").first();
      await expect(promoCodes).toBeVisible({ timeout: 10000 });
      await promoCodes.hover();
      await capturarPaso(page, "04_hover_codigos", "codigos_promocionales");
    });

    await test.step("Seleccionar Códigos Promocionales", async () => {
      const promoCodesLink = page.getByRole("link", { name: "Códigos promocionales" });
      await expect(promoCodesLink).toBeVisible({ timeout: 10000 });
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }),
        promoCodesLink.click(),
      ]);
      await capturarPaso(page, "05_codigos_promocionales_link", "codigos_promocionales");
    });

    await test.step("Esperar la carga completa de la página", async () => {
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(15000);
      await capturarPaso(page, "06_pagina_cargada", "codigos_promocionales");
    });

    await test.step("Ingresar fecha Desde", async () => {
      const desdeInput = page.getByRole("textbox", { name: "Desde" });
      await expect(desdeInput).toBeVisible({ timeout: 10000 });
      await desdeInput.fill("2025-03-10");
      await capturarPaso(page, "07_desde", "codigos_promocionales");
    });

    await test.step("Ingresar fecha Hasta", async () => {
      const hastaInput = page.getByRole("textbox", { name: "Hasta" });
      await expect(hastaInput).toBeVisible({ timeout: 10000 });
      await hastaInput.fill("2025-03-15");
      await capturarPaso(page, "08_hasta", "codigos_promocionales");
    });

    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible({ timeout: 10000 });
      await buscarButton.click();
      await capturarPaso(page, "09_buscar", "codigos_promocionales");
    });

  });
});
