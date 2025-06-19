import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; // 👈 función centralizada

test.describe("Sub Módulo Marketing y Growth", () => {
  test("Validar módulo Códigos QR", async ({ page }) => {

    await test.step("Login", async () => {
      await login(page);
      await capturarPaso(page, "01_login_exitoso", "codigos-qr");
    });

    await test.step("Abrir barra lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral", "codigos-qr");
    });

    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
      await capturarPaso(page, "03_click_marketing_growth", "codigos-qr");
    });

    await test.step("Click en Códigos QR", async () => {
      const qrModule = page.getByRole("link", { name: "Códigos QR" });
      await expect(qrModule).toBeVisible({ timeout: 10000 });
      await qrModule.click();
      await capturarPaso(page, "04_click_codigos_qr", "codigos-qr");
    });

    await test.step("Llenar filtro de búsqueda y buscar", async () => {
      const nombreQR = page.getByRole("textbox", { name: "Nombre QR" });
      await expect(nombreQR).toBeVisible();
      await nombreQR.fill("Testeo");

      const clientSelect = page.locator("#client");
      await expect(clientSelect).toBeVisible();
      await clientSelect.selectOption({ label: "2c7f267b -> Testeo 2" });

      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();

      await capturarPaso(page, "05_filtro_busqueda_aplicado", "codigos-qr");
    });

    await test.step("Limpiar resultados", async () => {
      const limpiarButton = page.getByRole("button", { name: "Limpiar" });
      await expect(limpiarButton).toBeVisible();
      await limpiarButton.click();
      await capturarPaso(page, "06_filtro_limpiado", "codigos-qr");
    });

    await test.step("Validar formulario Crear QR y volver", async () => {
      const crearQRButton = page.getByRole("button", { name: "Crear QR" });
      await expect(crearQRButton).toBeVisible();
      await crearQRButton.click();

      const formVisible = page.getByText("Selecciona el tipo de QR que necesitas", { exact: true });
      await expect(formVisible).toBeVisible({ timeout: 10000 });

      await capturarPaso(page, "07_formulario_crear_qr", "codigos-qr");

      const volverButton = page.getByRole("button", { name: "volver" }).first();
      await volverButton.scrollIntoViewIfNeeded();
      await expect(volverButton).toBeVisible();
      await volverButton.click();

      await capturarPaso(page, "08_click_volver", "codigos-qr");
    });
  });
});
