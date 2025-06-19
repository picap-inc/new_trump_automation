import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar módulo tutoriales", async ({ page }) => {

    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "tutoriales");
    });

    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra", "tutoriales");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_modulo_marketing", "tutoriales");
    });

    await test.step("Click en Tutoriales", async () => {
      const tutorialModule = page.getByRole("link", { name: "Tutoriales" });
      await expect(tutorialModule).toBeVisible({ timeout: 10000 });
      await tutorialModule.click();
      await capturarPaso(page, "04_click_tutoriales", "tutoriales");
    });

    await test.step("Llenar filtros y buscar", async () => {
      const nombreInput = page.getByRole("textbox", { name: "Nombre del tutorial" });
      await expect(nombreInput).toBeVisible();
      await nombreInput.fill("¡Gestiona tu ruta!");

      const categoria = page.locator("#category");
      await expect(categoria).toBeVisible();
      await categoria.selectOption({ label: "Pibox" });

      const estado = page.locator("#enabled");
      await expect(estado).toBeVisible();
      await estado.selectOption({ label: "Activo" });

      const tipoUsuario = page.locator("#video_for_cd");
      await expect(tipoUsuario).toBeVisible();
      await tipoUsuario.selectOption({ label: "Piloto" });

      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();

      const limpiarBtn = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarBtn).toBeVisible();
      await limpiarBtn.click();

      await capturarPaso(page, "05_filtros_aplicados", "tutoriales");
    });

    await test.step("Llenar formulario para crear tutorial", async () => {
      const crearBtn = page.getByRole('button', { name: 'Crear nuevo tutorial' });
      await expect(crearBtn).toBeVisible();
      await crearBtn.click();

      const nombre = page.getByRole("textbox", { name: "Nombre", exact: true });
      await expect(nombre).toBeVisible();
      await nombre.fill("prueba QA tutorial");

      const categoriaCombo = page.getByLabel("Categorías");
      await expect(categoriaCombo).toBeVisible();
      await categoriaCombo.selectOption({ label: "QA" });

      const descripcion = page.getByRole("textbox", { name: "Descripción:" });
      await expect(descripcion).toBeVisible();
      await descripcion.fill("PRUEBA QA MIGUEL");

      const paisCombo = page.getByLabel("Seleccionar País");
      await expect(paisCombo).toBeVisible();
      await paisCombo.selectOption({ label: "Colombia" });

      const servicioCombo = page.getByLabel("Servicio");
      await expect(servicioCombo).toBeVisible();
      await servicioCombo.selectOption({ label: "Piloto" });

      const urlInput = page.getByRole("textbox", { name: "URL del video" });
      await expect(urlInput).toBeVisible();
      await urlInput.fill("https://www.picap.com");

      await capturarPaso(page, "06_formulario_lleno", "tutoriales");

      const cancelarBtn = page.getByRole("button", { name: "Cancelar" });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
    });
  });
});
