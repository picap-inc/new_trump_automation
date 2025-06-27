import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Calidad", () => {
  test("Validar flujo completo de Calidad", async ({ page }) => {

    await test.step("Login y menú lateral", async () => {
      await login(page);
      await Barra(page);
      await capturarPaso(page, "01_login_barra", "Calidad");
    });

    await test.step("Seleccionar módulo Calidad", async () => {
      const moduloCalidad = page.getByText('Calidad', { exact: true });
      await expect(moduloCalidad).toBeVisible({ timeout: 10000 });
      await moduloCalidad.click();
      await capturarPaso(page, "02_Calidad", "Calidad");
    });

    await test.step("Entrar a Dashboard Calidad", async () => {
      const dashboardLink = page.getByRole('link', { name: 'Dashboard Calidad' });
      await expect(dashboardLink).toBeVisible({ timeout: 10000 });
      await dashboardLink.click();
      await capturarPaso(page, "03_Dashboard", "Calidad");
    });

    await test.step("Ingresar rango de fechas dinámicamente (día 1 al día actual)", async () => {
      const fechaActual = new Date();
      const diaActual = fechaActual.getDate();
      const mesIngles = fechaActual.toLocaleString('en-US', { month: 'long' }); // se deja dinamico para que siempre seleccione el mes actual.

      const dateTrigger = page.locator('[data-quality-dashboard-target="AuditsQuantityDate"]');
      await expect(dateTrigger).toBeVisible({ timeout: 10000 });
      await dateTrigger.click();

      // Asegura que el calendario esté visible
      const calendar = page.locator('.flatpickr-calendar.open');
      await expect(calendar).toBeVisible({ timeout: 5000 });

      const labelDia1 = `${mesIngles} 1,`; // mes dinamico
      const labelDiaActual = `${mesIngles} ${diaActual},`; // mes dinamico 

      const dia1 = page.getByLabel(labelDia1).first();
      const diaHoy = page.getByLabel(labelDiaActual).first();

      await expect(dia1).toBeVisible({ timeout: 5000 });
      await dia1.click();

      await expect(diaHoy).toBeVisible({ timeout: 5000 });
      await diaHoy.click();

      await capturarPaso(page, "04_Fecha_Dinamica_Label", "Calidad");
      await page.waitForTimeout(2000);
    });

    await test.step("Ir a Gestionar Áreas", async () => {
      const gestionarAreas = page.getByRole('link', { name: 'Gestionar Áreas' });
      await gestionarAreas.click();
      await capturarPaso(page, "05_Gestionar_Areas", "Calidad");
    });

    await test.step("Volver a Dashboard", async () => {
      const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
      await dashboardLink.click();
      await capturarPaso(page, "06_Volver_Dashboard", "Calidad");
    });

    await test.step("Seleccionar agente: Estefany Carvajal", async () => {
      const comboAgente = page.locator('#comparative-agent-select');
      await comboAgente.selectOption({ label: "Estefany Carvajal" });
      await capturarPaso(page, "07_Agente_Estefany", "Calidad");
    });

    await test.step("Seleccionar atributo: Atención al usuario", async () => {
      const comboAtributo = page.locator('#comparative-attribute-select');
      await comboAtributo.selectOption({ label: "Atención al usuario" });
      await capturarPaso(page, "08_Atributo_AtencionUsuario", "Calidad");
    });

  });
});
