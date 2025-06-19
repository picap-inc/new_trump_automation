import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Validación de Sub módulo Alertas", () => {
  test("Validar módulo Alertas", async ({ page }) => {
    await test.step("Login y menú lateral", async () => {
      await login(page);
      await Barra(page);
      await capturarPaso(page, "01_login_barra", "alertas");
    });

    await test.step("Seleccionar Módulo Monitoreo", async () => {
      const moduloMonitoreo = page.getByText("Monitoreo");
      await expect(moduloMonitoreo).toBeVisible({ timeout: 10000 });
      await moduloMonitoreo.click();
      await capturarPaso(page, "02_monitoreo", "alertas");
    });

    await test.step("Clic en Alertas", async () => {
      const alertasModule = page.getByRole("link", { name: "Alertas" });
      await expect(alertasModule).toBeVisible({ timeout: 10000 });
      await alertasModule.click();
      await capturarPaso(page, "03_alertas", "alertas");
    });

    await test.step("Aplicar filtros en Alertas", async () => {
      const fechaInput = page.getByRole("textbox", { name: "Fecha de creación" });
      await fechaInput.fill("2025-06-01");

      const statusSelect = page.locator("#status_cd");
      await statusSelect.selectOption({ label: "Activa" });

      const nombreAlertaInput = page.getByRole("textbox", { name: "Nombre de la alerta" });
      await nombreAlertaInput.fill("");
      for (const char of "Alerta de fraude") {
        await nombreAlertaInput.type(char, { delay: 100 });
      }

      const alertForSelect = page.locator("#alert_for_cd");
      await alertForSelect.selectOption({ label: "Conductor" });

      await capturarPaso(page, "04_filtros_alerta", "alertas");
    });

    await test.step("Buscar y limpiar filtros", async () => {
      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();

      const limpiarButton = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarButton).toBeVisible();
      await limpiarButton.click();

      await page.waitForTimeout(1000);
      await capturarPaso(page, "05_busqueda_limpiar", "alertas");
    });

    await test.step("Navegar a Bandeja y Alertas creadas", async () => {
      const bandejaLink = page.getByRole("link", { name: "Bandeja de conversaciones" });
      await expect(bandejaLink).toBeVisible({ timeout: 10000 });
      await bandejaLink.click();

      const alertasCreadasLink = page.getByRole("link", { name: "Alertas creadas" });
      await expect(alertasCreadasLink).toBeVisible({ timeout: 10000 });
      await alertasCreadasLink.click();

      await page.waitForTimeout(5000);
      await capturarPaso(page, "06_alertas_creadas", "alertas");
    });

    await test.step("Formulario nueva alerta", async () => {
      const crearNuevaAlertaBtn = page.getByRole("button", { name: "Crear nueva alerta" });
      await expect(crearNuevaAlertaBtn).toBeVisible({ timeout: 10000 });
      await crearNuevaAlertaBtn.click();

      const inputNombreAlerta = page.getByRole("textbox", { name: "Nombre de la alerta" });
      await expect(inputNombreAlerta).toBeVisible({ timeout: 5000 });
      await capturarPaso(page, "07_formulario_visible", "alertas");
    });

    await test.step("Llenar formulario y cancelar", async () => {
      const nombreInput = page.getByRole("textbox", { name: "Nombre", exact: true });
      await nombreInput.fill("Prueba QA");

      const alertaParaSelect = page.locator("#text_based_alert_alert_for_cd");
      await alertaParaSelect.selectOption({ label: "Pasajero" });

      const tipoAlertaSelect = page.locator("#text_based_alert_alert_kind_cd");
      await tipoAlertaSelect.selectOption({ label: "Chat" });

      const descripcionInput = page.getByRole("textbox", { name: "Descripción" });
      await descripcionInput.fill("Prueba QA Automated");

      const mensajeInput = page.getByRole("textbox", { name: "Mensaje o palabra clave (" });
      await mensajeInput.fill("Mensaje de prueba;palabra clave");

      await page.waitForTimeout(2000);
      await capturarPaso(page, "08_formulario_lleno", "alertas");

      const cancelarBtn = page.getByRole("button", { name: "Cancelar" });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
    });
  });
});
