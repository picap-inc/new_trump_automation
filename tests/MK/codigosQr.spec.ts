import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub Módulo Marketing y Growth", () => {
  test("Validar módulo Códigos QR", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir menú lateral
    await Barra(page);

    // Paso 3: Seleccionar módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer click en "Códigos QR"
    await test.step("Click en Códigos QR", async () => {
      const qrModule = page.getByRole("link", { name: "Códigos QR" });
      await expect(qrModule).toBeVisible({ timeout: 10000 });
      await qrModule.click();
    });

    // Paso 5: Completar formulario de búsqueda
    await test.step("Llenar filtro de búsqueda y buscar", async () => {
      // Escribir en el campo 'Nombre QR'
      const nombreQR = page.getByRole("textbox", { name: "Nombre QR" });
      await expect(nombreQR).toBeVisible();
      await nombreQR.fill("Testeo");

      // Seleccionar cliente del combo
      const clientSelect = page.locator("#client");
      await expect(clientSelect).toBeVisible();
      await clientSelect.selectOption({ label: "2c7f267b -> Testeo 2" });

      // Click en el botón Buscar
      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
    });

    // Paso 6: Click en botón Limpiar
    await test.step("Limpiar resultados", async () => {
      const limpiarButton = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarButton).toBeVisible();
      await limpiarButton.click();
    });

    // Paso 7: Validar botón Crear QR y hacer click en Volver
    await test.step("Validar formulario Crear QR", async () => {
      const crearQRButton = page.getByRole("button", { name: "Crear QR" });
      await expect(crearQRButton).toBeVisible();
      await crearQRButton.click();

      // Validar que el formulario se muestre
      const formVisible = page.getByText("Selecciona el tipo de QR que necesitas", { exact: true });
      await expect(formVisible).toBeVisible({ timeout: 10000 });

      // Hacer scroll hasta el botón Volver y hacer clic
      const volverButton = page.getByRole("button", { name: "volver" }).first();
      await volverButton.scrollIntoViewIfNeeded();
      await expect(volverButton).toBeVisible();
      await volverButton.click();
    });
  });
});
