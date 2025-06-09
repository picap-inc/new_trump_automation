import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Validacion de Sub modulo alertas", () => {
  test("Validar módulo Alertas", async ({ page }) => {
    await login(page);
    await Barra(page);

    await test.step("Seleccionar Modulo Monitoreo", async () => {
      const moduloMonitoreo = page.getByText('Monitoreo');
      await expect(moduloMonitoreo).toBeVisible({ timeout: 10000 });
      await moduloMonitoreo.click();
    });

    await test.step("Click en Alertas", async () => {
      const alertasModule = page.getByRole('link', { name: 'Alertas' });
      await expect(alertasModule).toBeVisible({ timeout: 10000 });
      await alertasModule.click();
    });

    await test.step("Seleccionar fecha 01 Junio 2025", async () => {
      const fechaInput = page.getByRole('textbox', { name: 'Fecha de creación' });
      await fechaInput.fill('2025-06-01');
    });

    await test.step("Seleccionar Estado Activa", async () => {
      const statusSelect = page.locator('#status_cd');
      await statusSelect.selectOption({ label: 'Activa' });
    });

    await test.step("Escribir Nombre de la alerta", async () => {
      const nombreAlertaInput = page.getByRole('textbox', { name: 'Nombre de la alerta' });
      await nombreAlertaInput.fill('');
      for (const char of 'Alerta de fraude') {
        await nombreAlertaInput.type(char, { delay: 100 });
      }
    });

    await test.step("Seleccionar alerta para Conductor", async () => {
      const alertForSelect = page.locator('#alert_for_cd');
      await alertForSelect.selectOption({ label: 'Conductor' });
    });

    await test.step("Click en Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
    });

    await test.step("Click en Limpiar", async () => {
      const limpiarButton = page.getByRole('button', { name: 'Limpiar' });
      await expect(limpiarButton).toBeVisible();
      await limpiarButton.click();
    });

    await test.step("Esperar 1 segundo después de limpiar", async () => {
      await page.waitForTimeout(1000);
    });

    await test.step("Ir a Bandeja de conversaciones", async () => {
      const bandejaLink = page.getByRole('link', { name: 'Bandeja de conversaciones' });
      await expect(bandejaLink).toBeVisible({ timeout: 10000 });
      await bandejaLink.click();
    });

    await test.step("Ir a Alertas creadas", async () => {
      const alertasCreadasLink = page.getByRole('link', { name: 'Alertas creadas' });
      await expect(alertasCreadasLink).toBeVisible({ timeout: 10000 });
      await alertasCreadasLink.click();

      // Esperar 5 segundos para que cargue completamente la página
      await page.waitForTimeout(5000);
    });

    await test.step("Click en 'Crear nueva alerta'", async () => {
      const crearNuevaAlertaBtn = page.getByRole('button', { name: 'Crear nueva alerta' });
      await expect(crearNuevaAlertaBtn).toBeVisible({ timeout: 10000 });
      await expect(crearNuevaAlertaBtn).toBeEnabled();
      await crearNuevaAlertaBtn.scrollIntoViewIfNeeded();
      await crearNuevaAlertaBtn.click();

      // Esperar que el formulario esté visible
      const inputNombreAlerta = page.getByRole('textbox', { name: 'Nombre de la alerta' });
      await expect(inputNombreAlerta).toBeVisible({ timeout: 5000 });
    });

    await test.step("Llenar formulario de nueva alerta", async () => {
      // Nombre
      const nombreInput = page.getByRole('textbox', { name: 'Nombre', exact: true });
      await nombreInput.fill('Prueba QA');

      // Alerta para - Pasajero
      const alertaParaSelect = page.locator('#text_based_alert_alert_for_cd');
      await alertaParaSelect.selectOption({ label: 'Pasajero' });

      // Tipo de alerta - Chat
      const tipoAlertaSelect = page.locator('#text_based_alert_alert_kind_cd');
      await tipoAlertaSelect.selectOption({ label: 'Chat' });

      // Descripción
      const descripcionInput = page.getByRole('textbox', { name: 'Descripción' });
      await descripcionInput.fill('Prueba QA Automated');

      // Mensaje o palabra clave
      const mensajeInput = page.getByRole('textbox', { name: 'Mensaje o palabra clave (' });
      await mensajeInput.fill('Mensaje de prueba;palabra clave');

      // Pausa para visualizar el formulario lleno
      await page.waitForTimeout(5000);

      // Cancelar
      const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
    });
  });
});
