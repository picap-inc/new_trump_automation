import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  const URL_FRAUDE = "https://admin.picap.io/campaigns/fraud_verify";

  test("Validar filtros en la página de Verificaciones de Fraude", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "verificaciones-fraude");
    });

    await test.step("Abrir el menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "verificaciones-fraude");
    });

    await test.step("Hacer clic en Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_modulo_marketing", "verificaciones-fraude");
    });

    await test.step("Ir a Verificaciones de Fraude", async () => {
      const fraudVerificationLink = page.getByRole("link", { name: "Verificaciones de Fraude" });
      await expect(fraudVerificationLink).toBeVisible({ timeout: 10000 });
      await fraudVerificationLink.click();

      await expect(page).toHaveURL(URL_FRAUDE, { timeout: 10000 });
      await capturarPaso(page, "04_pagina_fraude", "verificaciones-fraude");
    });

    await test.step("Llenar filtros y buscar", async () => {
      const desdeInput = page.getByRole('textbox', { name: 'Desde' });
      await expect(desdeInput).toBeVisible({ timeout: 10000 });
      await desdeInput.fill("2025-02-01");

      const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hastaInput).toBeVisible({ timeout: 10000 });
      const currentDate = new Date().toISOString().split('T')[0];
      await hastaInput.fill(currentDate);

      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible({ timeout: 10000 });
      await buscarButton.click();

      await page.waitForTimeout(2000);
      await capturarPaso(page, "05_resultados_busqueda", "verificaciones-fraude");
    });

  });
});
