import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar módulo Pilevels", async ({ page }) => {
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

    // Paso 4: Hacer clic en "Pilevels"
    await test.step("Paso 4: Hacer clic en Pilevels", async () => {
      const pilevelModule = page.getByRole('link', { name: 'Pilevels' });
      await expect(pilevelModule).toBeVisible({ timeout: 10000 });
      await pilevelModule.click();
    });

    // Paso 5: Seleccionar País "Colombia" en el select tipo combobox
    await test.step("Seleccionar país Colombia", async () => {
      const countrySelect = page.getByRole('combobox', { name: 'País' });
      await countrySelect.click();
      await expect(countrySelect).toBeEnabled({ timeout: 5000 });
      await countrySelect.fill('Colombia');

      const optionColombia = page.locator('div[role="option"]', { hasText: 'Colombia' });
      await expect(optionColombia).toBeVisible({ timeout: 5000 });
      await optionColombia.click();
    });

    // Paso 6: Seleccionar Tipo de visual "Pilevel" y Tipo de usuario "Pasajero" y luego buscar
    await test.step("Seleccionar Tipo de visual, Tipo de usuario y buscar", async () => {
      // Tipo de visual
      const tipoVisualSelect = page.getByRole('combobox', { name: 'Tipo de visual' });
      await tipoVisualSelect.click();
      await expect(tipoVisualSelect).toBeEnabled({ timeout: 5000 });
      await tipoVisualSelect.fill('Pilevel');
      const tipoVisualOption = page.getByRole('option', { name: 'Pilevel' }).nth(1);
      await expect(tipoVisualOption).toBeVisible({ timeout: 5000 });
      await tipoVisualOption.click();

      // Tipo de usuario
      const tipoUsuarioSelect = page.getByRole('combobox', { name: 'Tipo de usuario' });
      await tipoUsuarioSelect.click();
      await expect(tipoUsuarioSelect).toBeEnabled({ timeout: 5000 });
      await tipoUsuarioSelect.fill('Pasajero');
      const tipoUsuarioOption = page.getByRole('option', { name: 'Pasajero' }).nth(1);
      await expect(tipoUsuarioOption).toBeVisible({ timeout: 5000 });
      await tipoUsuarioOption.click();

      // Botón Buscar
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeEnabled({ timeout: 5000 });
      await buscarButton.click();

      // Boton Limpiar
      const limpiarButton = page.getByRole('button', { name: 'Limpiar' });
      await expect(limpiarButton).toBeEnabled({ timeout: 5000});
      await limpiarButton.click();
    });
  });
});
