import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar modulo tutoriales", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer click en Tutoriales
    await test.step("Click en Tutoriales", async () => {
      const tutorialModule = page.getByRole("link", { name: "Tutoriales" });
      await expect(tutorialModule).toBeVisible({ timeout: 10000 });
      await tutorialModule.click();
    });

    // Paso 5: Validación de filtros
    await test.step("Llenar filtros y buscar", async () => {
      const nombreInput = page.getByRole("textbox", { name: "Nombre del tutorial" });
      await expect(nombreInput).toBeVisible();
      await nombreInput.fill("¡Gestiona tu ruta!");
      await page.waitForTimeout(500);

      const categoria = page.locator("#category");
      await expect(categoria).toBeVisible();
      await categoria.selectOption({ label: "Pibox" });
      await page.waitForTimeout(500);

      const estado = page.locator("#enabled");
      await expect(estado).toBeVisible();
      await estado.selectOption({ label: "Activo" });
      await page.waitForTimeout(500);

      const tipoUsuario = page.locator("#video_for_cd");
      await expect(tipoUsuario).toBeVisible();
      await tipoUsuario.selectOption({ label: "Piloto" });
      await page.waitForTimeout(500);

      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();

      const limpiarBtn = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarBtn).toBeVisible();
      await limpiarBtn.click();
    });

    // Paso 6: Validación módulo Crear nuevo tutorial
    await test.step("Llenar formulario para crear tutorial", async () => {
      
      //Click en Crear nuevo tutorial 
      const crearBtn = page.getByRole('button', { name: 'Crear nuevo tutorial' });
      await expect(crearBtn).toBeVisible();
      await crearBtn.click();


      // Nombre
      const nombre = page.getByRole("textbox", { name: "Nombre", exact: true });
      await expect(nombre).toBeVisible();
      await nombre.fill("prueba QA tutorial");
      await page.waitForTimeout(500);

      // Categoría
      const categoriaCombo = page.getByLabel("Categorías");
      await expect(categoriaCombo).toBeVisible();
      await categoriaCombo.selectOption({ label: "QA" });
      await page.waitForTimeout(500);

      // Descripción
      const descripcion = page.getByRole("textbox", { name: "Descripción:" });
      await expect(descripcion).toBeVisible();
      await descripcion.fill("PRUEBA QA MIGUEL");
      await page.waitForTimeout(500);

      // Seleccionar País
      const paisCombo = page.getByLabel("Seleccionar País");
      await expect(paisCombo).toBeVisible();
      await paisCombo.selectOption({ label: "Colombia" });
      await page.waitForTimeout(500);

      // Servicio
      const servicioCombo = page.getByLabel("Servicio");
      await expect(servicioCombo).toBeVisible();
      await servicioCombo.selectOption({ label: "Piloto" });
      await page.waitForTimeout(500);

      // URL del video
      const urlInput = page.getByRole("textbox", { name: "URL del video" });
      await expect(urlInput).toBeVisible();
      await urlInput.fill("https://www.picap.com"); 
      await page.waitForTimeout(1000);

      // Botón Cancelar
      const cancelarBtn = page.getByRole("button", { name: "Cancelar" });
      await expect(cancelarBtn).toBeVisible();
      await cancelarBtn.click();
    });
  });
});
