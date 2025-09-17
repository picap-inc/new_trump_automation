import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { piboxDashboard } from "../utils/pibox";
import { barraPibox } from "../utils/barraPibox";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación de modulo Peticion de operaciones", () => {
  test("Validación completa con filtros y navegación", async ({ page, context }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "operaciones");
    });

    // Paso 2: Abrir menú lateral general
    await test.step("Abrir menú lateral general", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "operaciones");
    });

    // Paso 3: Ir a Pibox Dashboard
    await test.step("Ir a Pibox Dashboard", async () => {
      await piboxDashboard(page, "03_pibox_dashboard", "operaciones");
    });

    // Paso 4: Abrir menú lateral de Pibox
    await test.step("Abrir menú lateral de Pibox", async () => {
      await barraPibox(page, "04_menu_pibox", "operaciones");
    });

    // Paso 5: Entrar a Petición de operaciones
    await test.step("Entrar al módulo Petición de operaciones", async () => {
      const peticionLink = page.getByRole('link', { name: 'Peticiones de operaciones' });
      await expect(peticionLink).toBeVisible({ timeout: 10000 });
      await peticionLink.click();
      await page.waitForTimeout(6000);
      await capturarPaso(page, "05_modulo_operaciones", "operaciones");
    });

    // Paso 6: Recorrer secciones y volver a "Todas"
    await test.step("Validar navegación por secciones", async () => {
      const secciones = [
        { name: 'Aceptadas', screenshot: '06_aceptadas' },
        { name: 'Rechazadas', screenshot: '07_rechazadas' },
        { name: 'Reconsideración', screenshot: '08_reconsideracion' },
        { name: 'Aplazadas', screenshot: '09_aplazadas' },
      ];

      for (const seccion of secciones) {
        const seccionLink = page.getByRole('link', { name: seccion.name });
        await expect(seccionLink).toBeVisible({ timeout: 10000 });
        await seccionLink.click();
        await page.waitForTimeout(3000);

        await capturarPaso(page, seccion.screenshot, "operaciones");

        const todasLink = page.getByRole('link', { name: 'Todas' });
        await expect(todasLink).toBeVisible({ timeout: 10000 });
        await todasLink.click();

        await page.waitForTimeout(3000);
        await capturarPaso(page, `${seccion.screenshot}_todas`, "operaciones");
      }
    });

    // Paso 7: Aplicar filtros y buscar compañía
    await test.step("Aplicar filtros para buscar compañía", async () => {
      // Seleccionar ciudad
      await page.locator('#city_id').selectOption({ label: 'Bogota' });

      // Escribir nombre de la compañía
      await page.getByRole('textbox', { name: 'Nombre de la compañía' })
        .fill('Cruz Verde Mostrador Nacional');

      // Seleccionar tipo de negociación
      await page.locator('#negotiation_type_cd').selectOption({ label: 'Bajo demanda' });

      await capturarPaso(page, "10_filtros_aplicados", "operaciones");

      // Click en "Buscar"
      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 10000 });
      await buscarBtn.click();

      // Esperar resultados
      await page.waitForTimeout(3000);
      await capturarPaso(page, "11_resultados_busqueda", "operaciones");
    });

    // Paso 8: Seleccionar primer resultado
    await test.step("Seleccionar primer resultado de la tabla", async () => {
      const primerResultado = page
        .getByRole('cell', {
          name: 'Estado: Pendiente Ciudad: Bogota Nombre de la compañía: Cruz Verde Mostrador'
        })
        .getByRole('link');

      await expect(primerResultado).toBeVisible({ timeout: 10000 });
      await primerResultado.click();

      // Esperar que se abra una nueva pestaña
      const nuevaPagina = await context.waitForEvent('page');

      // Validar que la URL sea la esperada
      await nuevaPagina.waitForLoadState('domcontentloaded');
      await expect(nuevaPagina).toHaveURL('https://admin.picap.io/pibox/companies/624dd6cdac8991004cafc881');

      await capturarPaso(nuevaPagina, "12_detalle_compania", "operaciones");
    });
  });
});
