import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Automatización de filtros con valores específicos", () => {
  test("Flujo completo de búsqueda y navegación por filtros de estado", async ({ page }) => {
    test.setTimeout(120000); // Se aumenta el timeout por si el entorno es lento

    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Seleccionar módulo Servicios
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
    });

    // Paso 4: Seleccionar submódulo Todos los Servicios
    await test.step("Seleccionar submódulo Todos los Servicios", async () => {
      const todosLosServicios = page.getByRole("link", { name: "Todos los servicios" });
      await expect(todosLosServicios).toBeVisible({ timeout: 15000 });
      await todosLosServicios.click();
    });

    await page.waitForLoadState("load");

    // Paso 5: Llenar filtros y buscar
    await test.step("Llenar filtros y buscar", async () => {
      await page.locator("#city").click();
      await page.locator("#city").type("Cali");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);

      await page.locator("#service_type").click();
      await page.locator("#service_type").type("Moto");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);

      await page.locator("#initialDateInput").fill("2025-06-01");
      await page.keyboard.press("Enter");

      await page.locator("#finalDateInput").fill("2025-06-15");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);

      await page.locator("#status").click();
      await page.locator("#status").type("Finalizado por conductor");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(1000);

      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeEnabled({ timeout: 10000 });
      await buscarBtn.click();
      await page.waitForTimeout(10000);
    });

    // Paso 6: Abrir detalle y cerrar
    await test.step("Abrir detalle y cerrar pestaña", async () => {
      const [detallePage] = await Promise.all([
        page.context().waitForEvent("page"),
        page.locator("tr.bg-white.border-b-2.border-gray-200 a").first().click(),
      ]);
      await detallePage.waitForLoadState();
      await detallePage.close();
    });

    // Paso 7: Validar retorno a la pantalla de todos los servicios
    await test.step("Validar texto 'Todos los servicios'", async () => {
      const textoVisible = page.getByRole("paragraph").filter({ hasText: "Todos los servicios" });
      await expect(textoVisible).toBeVisible({ timeout: 10000 });
    });

    // Paso 8: Click en "Activos" y buscar por ciudad
    await test.step("Buscar en Activos", async () => {
      await page.getByRole("link", { name: "Activos" }).click();
      await page.waitForTimeout(3000);

      const ciudadInput = page.locator("#city");
      await ciudadInput.click();
      await ciudadInput.type("Cali");
      await page.keyboard.press("Enter");

      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeEnabled({ timeout: 10000 });
      await buscarBtn.click();
      await page.waitForTimeout(5000);
    });

    // Paso 9: Navegar por cada estado
    const estados = ["Finalizados con éxito", "Cancelados", "Por verificar", "En riesgo"];
    for (const estado of estados) {
      await test.step(`Navegar a estado: ${estado}`, async () => {
        await page.getByRole("link", { name: estado }).click();
        await page.waitForLoadState("networkidle");
      });
    }

    // Paso 10: Abrir detalle del servicio y luego perfil del pasajero desde sección
await test.step("Abrir detalle del servicio y luego perfil del pasajero desde sección", async () => {
  await page.getByRole('link', { name: 'Todos los servicios' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Seleccionar el enlace al perfil del pasajero
  const enlacePasajero = page.locator('a.text-picap-purple-link[href*="/passengers/"]').first();
  await expect(enlacePasajero).toBeVisible({ timeout: 10000 });
  await enlacePasajero.click();

  // Validar que se abrió el perfil correctamente
  await expect(page.getByText("Versión Instalada:")).toBeVisible({ timeout: 10000 });
});

// Paso 11: Clic en íconos del perfil del pasajero para mostrar información
await test.step("Interactuar con íconos de información en el perfil del pasajero", async () => {
  // Clic en ícono del casco (helmet)
  await page.getByRole('img', { name: 'helmet' }).click();
  await page.waitForTimeout(2000);

  // Clic en primer ícono dentro del contenedor #services
  const primerIconoServices = page.locator('#services').getByRole('img').nth(0);
  await primerIconoServices.click();
  await page.waitForTimeout(2000);

  // Clic en segundo ícono dentro del contenedor #services
  const segundoIconoServices = page.locator('#services div');
  await segundoIconoServices.click();
  await page.waitForTimeout(2000);

  // Clic en ícono de usuarios
  await page.getByRole('img', { name: 'users' }).click();
  await page.waitForTimeout(2000);

  // Clic en boton X
  await page.locator('span:nth-child(3) > .w-6').click();
  await page.waitForTimeout(2000);
});


  });
});
