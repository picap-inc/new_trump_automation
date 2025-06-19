import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Usuarios", () => {
  test("Flujo completo de búsqueda y navegación por filtros de estado", async ({ page }) => {
    test.setTimeout(120000); // Se aumenta el timeout por si el entorno es lento

    // Paso 1: Iniciar sesión
    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "usuarios");
    });

    // Paso 2: Abrir barra lateral
    await test.step("Abrir barra lateral de navegación", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_lateral", "usuarios");
    });

    // Paso 3: Ingresar al módulo de Usuarios
    await test.step("Navegar al módulo Usuarios", async () => {
      const usuarios = page.getByRole("link", { name: "users Usuarios" });
      await expect(usuarios).toBeVisible({ timeout: 10000 });
      await usuarios.click();
      await capturarPaso(page, "03_click_modulo_usuarios", "usuarios");

      const tablaUsuarios = page.getByRole("table");
      await expect(tablaUsuarios).toBeVisible({ timeout: 15000 });
      await capturarPaso(page, "04_tabla_usuarios_cargada", "usuarios");
    });
  });
});
