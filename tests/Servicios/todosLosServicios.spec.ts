import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas"; 

test.describe("Navegación al módulo de Todos los Servicios", () => {
  test("Acceder a la sección de Todos los Servicios", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "servicios");
    });

    // Paso 2: Abrir el menú lateral
    await test.step("Abrir menú lateral", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "servicios");
    });

    // Paso 3: Hacer clic en módulo Servicios
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
      await capturarPaso(page, "03_modulo_servicios", "servicios");
    });

    // Paso 4: Hacer clic en "Todos los Servicios"
    await test.step("Seleccionar submódulo Todos los Servicios", async () => {
      const todosLosServicios = page.getByRole("link", { name: "Todos los servicios" });
      await expect(todosLosServicios).toBeVisible({ timeout: 10000 });
      await todosLosServicios.click();
      await capturarPaso(page, "04_todos_servicios", "servicios");
    });

    // Paso 5: Validar la URL cargada
    await test.step("Validar carga de la página de Todos los Servicios", async () => {
      const expectedUrl = 'https://admin.picap.io/bookings';
      await expect(page).toHaveURL(expectedUrl, { timeout: 10000 });
      await capturarPaso(page, "05_url_bookings", "servicios");
    });
  });
});
