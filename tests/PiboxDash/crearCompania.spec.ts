import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { piboxDashboard } from "../utils/pibox";
import { barraPibox } from "../utils/barraPibox";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación de creación y edición de compañías en Pibox", () => {
  test("Crear, filtrar y editar compañía en Pibox", async ({ page, context }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "companias");
    });

    // Paso 2: Abrir menú lateral general
    await test.step("Abrir menú lateral general", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "companias");
    });

    // Paso 3: Ir a Pibox Dashboard
    await test.step("Ir a Pibox Dashboard", async () => {
      await piboxDashboard(page, "03_pibox_dashboard", "companias");
    });

    // Paso 4: Abrir menú lateral de Pibox
    await test.step("Abrir menú lateral de Pibox", async () => {
      await barraPibox(page, "04_menu_pibox", "companias");
    });

    // Paso 5: Entrar a Compañías
    await test.step("Entrar al módulo Compañías", async () => {
      const companiasLink = page.getByRole("link", { name: "Compañías Compañías" });
      await expect(companiasLink).toBeVisible({ timeout: 10000 });
      await companiasLink.click();
      await page.waitForTimeout(4000);
      await capturarPaso(page, "05_modulo_companias", "companias");
    });

    // Paso 6: Click en "Nueva compañía"
    await test.step("Click en Nueva compañía", async () => {
      const nuevaBtn = page.getByRole("button", { name: "Nueva compañía" });
      await expect(nuevaBtn).toBeVisible({ timeout: 10000 });
      await nuevaBtn.click();
      await page.waitForTimeout(2000);
      await capturarPaso(page, "06_formulario_creacion", "companias");
    });

    // Paso 7: Llenar el formulario de manera lenta
    await test.step("Llenar formulario de nueva compañía", async () => {
      await page.getByLabel("Nombre").first().fill("Prueba QA");
      await page.waitForTimeout(500);

      await page.getByRole("textbox", { name: "Razón social" }).fill("prueba qa automation");
      await page.waitForTimeout(500);

      await page.getByRole("textbox", { name: "E-mail coorporativo" }).fill("correo.corporativo@prueba.com");
      await page.waitForTimeout(500);

      await page.getByRole("textbox", { name: "E-mail facturación" }).fill("correo.facturacion@prueba.com");
      await page.waitForTimeout(500);

      await page.getByRole("textbox", { name: "Sitio web" }).fill("https://www.google.com/search?q=pibox");
      await page.waitForTimeout(500);

      await page.getByRole("textbox", { name: "Máximo valor declarado" }).fill("50000");
      await page.waitForTimeout(500);

      await capturarPaso(page, "07_formulario_lleno", "companias");
    });

    // Paso 8: Salir del formulario
    await test.step("Salir del formulario", async () => {
      const salirBtn = page.getByRole("link", { name: "Salir" });
      await expect(salirBtn).toBeVisible({ timeout: 5000 });
      await salirBtn.click();
      await capturarPaso(page, "08_salir_formulario", "companias");
    });

    // Paso 9: Aplicar filtros de búsqueda
    await test.step("Aplicar filtros de búsqueda", async () => {
      await page.getByPlaceholder("Nombre").fill("SUPRA GROUP");
      await page.waitForTimeout(500);

      const paisFiltro = page.locator("#geo_fence_id");
      await paisFiltro.selectOption({ label: "Colombia" });
      await page.waitForTimeout(500);

      const estadoFiltro = page.locator("#status");
      await estadoFiltro.selectOption({ label: "Aprobada" });
      await page.waitForTimeout(500);

      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await buscarBtn.click();
      await page.waitForTimeout(4000);

      await capturarPaso(page, "09_filtros_aplicados", "companias");

      const filas = page.locator("table tbody tr");
      await expect(filas.first()).toBeVisible({ timeout: 5000 });
    });

    // Paso 10: Abrir SUPRA GROUP en nueva pestaña
    await test.step("Abrir SUPRA GROUP en nueva pestaña", async () => {
      const [nuevaPestana] = await Promise.all([
        context.waitForEvent("page"),
        page.getByRole("link", { name: "SUPRA GROUP" }).click(),
      ]);

      await nuevaPestana.waitForLoadState("domcontentloaded");
      expect(nuevaPestana.url()).toContain("/pibox/companies/");
      await nuevaPestana.waitForTimeout(4000);
      await capturarPaso(nuevaPestana, "10_supra_group", "companias");

      // Paso 11: Click en Editar compañía
      const editarBtn = nuevaPestana.getByRole("button", { name: "Editar compañía" });
      await expect(editarBtn).toBeVisible({ timeout: 10000 });
      await editarBtn.click();
      await nuevaPestana.waitForTimeout(8000);

      // Paso 12: Click en Guardar cambios
      const guardarBtn = nuevaPestana.getByRole("button", { name: "Guardar Cambios" });
      await expect(guardarBtn).toBeVisible({ timeout: 10000 });
      await guardarBtn.click();
      await nuevaPestana.waitForTimeout(3000);

      await capturarPaso(nuevaPestana, "11_guardar_cambios", "companias");
    });
  });
});
