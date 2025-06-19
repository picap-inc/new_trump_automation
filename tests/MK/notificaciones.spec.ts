import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar página Notificaciones y sus funciones", async ({ page }) => {
    const URL_NOTIFICACIONES = "https://admin.picap.io/notifications";

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "marketing-notificaciones");
    });

    await test.step("Abrir barra lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "marketing-notificaciones");
    });

    await test.step("Click en módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 1000 });
      await marketingModule.click();
      await capturarPaso(page, "03_marketing", "marketing-notificaciones");
    });

    await test.step("Click en Notificaciones", async () => {
      const notificacionesLink = page.getByRole("link", { name: "Notificaciones" });
      await expect(notificacionesLink).toBeVisible({ timeout: 10000 });
      await notificacionesLink.click();
      await expect(page).toHaveURL(URL_NOTIFICACIONES, { timeout: 5000 });
      await capturarPaso(page, "04_notificaciones_url", "marketing-notificaciones");
    });

    await test.step("Aplicar filtro de fechas y buscar", async () => {
      const desdeInput = page.getByRole("textbox", { name: "Desde" });
      await expect(desdeInput).toBeVisible();
      await desdeInput.fill("2025-03-01");

      const hastaInput = page.getByRole("textbox", { name: "Hasta" });
      await expect(hastaInput).toBeVisible();
      const currentDate = new Date().toISOString().split("T")[0];
      await hastaInput.fill(currentDate);

      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();

      await page.waitForTimeout(3000);
      await capturarPaso(page, "05_filtro_busqueda", "marketing-notificaciones");
    });

    await test.step("Limpiar filtros y aplicar búsqueda por estado/título", async () => {
      const limpiarButton = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarButton).toBeVisible();
      await limpiarButton.click();

      await page.locator("#status_cd").selectOption({ label: "Deshabilitado" });
      const titulo = page.getByRole("textbox", { name: "Título" });
      await expect(titulo).toBeVisible();
      await titulo.fill("Tu Pipro NO ha podido renovarse");

      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();

      await capturarPaso(page, "06_filtrado_estado_titulo", "marketing-notificaciones");
    });

    await test.step("Crear nueva notificación y cancelar", async () => {
      const crearBtn = page.getByRole("button", { name: "Crear nueva notificación" });
      await expect(crearBtn).toBeVisible();
      await crearBtn.click();

      await page.getByLabel("Título").fill("Prueba QA");
      await page.getByRole("textbox", { name: "Descripción" }).fill("Automation QA");

      const cancelarBtn = page.getByRole("button", { name: "Cancelar" });
      await cancelarBtn.scrollIntoViewIfNeeded();
      await cancelarBtn.click();

      await capturarPaso(page, "07_crear_cancelar", "marketing-notificaciones");
    });
  });
});
