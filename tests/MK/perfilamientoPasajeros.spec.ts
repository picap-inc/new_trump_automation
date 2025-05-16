import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Validación de perfilamiento pasajeros", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hover sobre "Perfilamiento" y clic en "Piloto"
    await test.step("Ir a la sección Perfilamiento", async () => {
      const Perfilamiento = page.getByText('Perfilamiento');
      await expect(Perfilamiento).toBeVisible({ timeout: 10000 });
      await Perfilamiento.hover();

      const perfiPasajero = page.getByRole('link', { name: 'Pasajeros' });
      await expect(perfiPasajero).toBeVisible({ timeout: 10000 });
      await perfiPasajero.click();

      await page.waitForTimeout(10000); // Esperar que cargue la página
    })
  })
});