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

    await test.step("Abrir formulario de nueva matriz y cancelar", async () => {
      const crearMatriz = page.getByRole('link', { name: '+ Crear nueva matriz' });
      await expect(crearMatriz).toBeVisible({ timeout: 10000 });
      await crearMatriz.click();

      // Esperar un momento a que el formulario aparezca
      await page.waitForTimeout(1000);

      const cancelarBtn = page.getByText('Cancelar').first();
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();

      await capturarPaso(page, "04_Cancelar_Formulario_Matriz", "Calidad");
    });

    await test.step("Entrar a sección Auditorías", async () => {
      const auditoriasBtn = page.getByRole('button', { name: 'Auditorías' });
      await expect(auditoriasBtn).toBeVisible();
      await auditoriasBtn.click();
      await page.waitForTimeout(2000); // esperar que cargue la pantalla
      await capturarPaso(page, "05_Entrar_Auditorias", "Calidad");
    });

    await test.step("Seleccionar auditor y auditado y buscar", async () => {
      const auditado = page.locator('#auditee_id');
      await expect(auditado).toBeVisible();
      await auditado.selectOption({ label: 'Juliana Leal Páez Qa' });

      const auditor = page.locator('#auditor_id');
      await expect(auditor).toBeVisible();
      await auditor.selectOption({ label: 'Juliana Leal Qa' });

      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();

      await capturarPaso(page, "06_Busqueda_Auditorias", "Calidad");
    });

  });
});
