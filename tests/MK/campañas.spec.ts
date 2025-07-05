/*
import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar filtros en la página de Campañas", async ({ page }) => {

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "campanas");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral_abierta", "campanas");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing_growth_click", "campanas");
    });

    await test.step("Seleccionar Campañas", async () => {
      const campaignsLink = page.getByRole("link", { name: "Campañas" });
      await expect(campaignsLink).toBeVisible({ timeout: 10000 });
      await campaignsLink.click();
      await capturarPaso(page, "04_click_campanas", "campanas");
    });

    await test.step("Validar página Campañas", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/campaigns", { timeout: 10000 });
      await capturarPaso(page, "05_pagina_campanas_cargada", "campanas");
    });

    await test.step("Seleccionar fecha 'Desde' y 'Hasta'", async () => {
      const desdeInput = page.getByRole('textbox', { name: 'Desde' });
      await expect(desdeInput).toBeVisible();
      await desdeInput.fill('2025-02-01');

      const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hastaInput).toBeVisible();
      const currentDate = new Date().toISOString().split('T')[0];
      await hastaInput.fill(currentDate);

      await capturarPaso(page, "06_fechas_filtradas", "campanas");
    });

    await test.step("Seleccionar estado 'Activa' con teclado", async () => {
      const campaignStatusSelect = page.locator('#campaign_status');
      await expect(campaignStatusSelect).toBeVisible();
      await campaignStatusSelect.click();
      await campaignStatusSelect.press('A');
      await campaignStatusSelect.press('Enter');
      await capturarPaso(page, "07_estado_activa", "campanas");
    });

    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
      await capturarPaso(page, "08_busqueda_aplicada", "campanas");

(SE COMENTA EL CODIGO PORQUE ME DICE ACCESO DENEGADO)
    });
  });
});
*/
