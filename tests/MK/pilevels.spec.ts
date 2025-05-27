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
    await test.step("Paso 3: Seleccionar módulo Marketing y Growth", async () => {
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
    });
  });
