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

    await test.step("Entrar a Matriz Calidad", async () => {
      const matrizLink = page.getByRole('link', { name: 'Matriz de Calidad' });
      await expect(matrizLink).toBeVisible({ timeout: 10000 });
      await matrizLink.click();
      await capturarPaso(page, "03_Matriz", "Calidad");
    });

    await test.step("Filtrar por Marketing y abrir auditorías", async () => {
      const selectProceso = page.locator('#list_matrix_audit_frame #quality_process_id');
      await expect(selectProceso).toBeVisible({ timeout: 10000 });

      // Seleccionar opción "Marketing"
      await selectProceso.selectOption({ label: 'Marketing' });

      // Click en Buscar
      const botonBuscar = page.getByRole('button', { name: 'Buscar' });
      await expect(botonBuscar).toBeEnabled();
      await botonBuscar.click();

      // Esperar que aparezca el botón Auditorías
      const botonAuditorias = page.getByRole('button', { name: 'Auditorías' });
      await expect(botonAuditorias).toBeVisible({ timeout: 10000 });

      // Click en Auditorías
      await botonAuditorias.click();

      await capturarPaso(page, "04_Filtro_Marketing_Auditorias", "Calidad");
    });
  });
});
