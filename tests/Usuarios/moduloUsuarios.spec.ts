import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Usuarios", () => {
  test("Flujo completo de búsqueda y navegación por filtros de estado", async ({ page }) => {
    test.setTimeout(120000); // Timeout extendido

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

      // Esperar que desaparezca el loading si aparece
      const loading = page.locator("#loading_screen");
      if (await loading.isVisible({ timeout: 5000 }).catch(() => false)) {
        await loading.waitFor({ state: "hidden", timeout: 15000 });
      }

      // Esperar tabla y filtros
      const tablaUsuarios = page.getByRole("table");
      await expect(tablaUsuarios).toBeVisible({ timeout: 15000 });

      const inputEmail = page.getByRole("textbox", { name: "Email" });
      await expect(inputEmail).toBeVisible({ timeout: 10000 });

      await capturarPaso(page, "04_tabla_usuarios_cargada", "usuarios");
    });

    // Paso 4: Filtro por Email y ver historial
    await test.step("Filtrar por Email, abrir y cerrar historial", async () => {
      const inputEmail = page.getByRole("textbox", { name: "Email" });
      await inputEmail.click();
      await inputEmail.fill("");
      await inputEmail.type("davilaprod@gmail.com", { delay: 100 });

      const btnBuscar = page.getByRole("button", { name: "Buscar" });
      await expect(btnBuscar).toBeEnabled({ timeout: 15000 });
      await btnBuscar.click();

      await page.waitForTimeout(2000);
      await capturarPaso(page, "05_filtro_email", "usuarios");

      const linkHistorial = page.getByRole("link", { name: "Historial de cambios" });
      await expect(linkHistorial).toBeVisible({ timeout: 10000 });
      await linkHistorial.click();
      await capturarPaso(page, "06_historial_abierto", "usuarios");

      const btnCerrarHistorial = page.locator('span:nth-child(3) > .w-6 > path');
      await expect(btnCerrarHistorial).toBeVisible({ timeout: 5000 });
      await btnCerrarHistorial.click();
      await capturarPaso(page, "07_historial_cerrado", "usuarios");
    });

    // Paso 5: Navegar por otras secciones
    await test.step("Navegar por otras secciones del módulo", async () => {
      const secciones = [
        { name: "Pasajeros", id: "08_pasajeros" },
        { name: "Conductores", id: "09_conductores", options: { exact: true } },
        { name: "Conductores por activar", id: "10_por_activar" },
        { name: "Suspendidos", id: "11_suspendidos" },
        { name: "Expulsados", id: "12_expulsados" },
      ];

      for (const seccion of secciones) {
        const link = page.getByRole("link", { name: seccion.name, ...seccion.options });
        await expect(link).toBeVisible({ timeout: 10000 });

        const loading = page.locator("#loading_screen");
        if (await loading.isVisible({ timeout: 3000 }).catch(() => false)) {
          await loading.waitFor({ state: "hidden", timeout: 15000 });
        }

        await link.click();

        if (await loading.isVisible({ timeout: 3000 }).catch(() => false)) {
          await loading.waitFor({ state: "hidden", timeout: 15000 });
        }

        await page.waitForTimeout(1000);
        await capturarPaso(page, seccion.id, "usuarios");
      }
    });

    // Paso 6: Volver a "Conductores por activar" y hacer clic en acción
    await test.step("Validar resultados y dar clic en acción de la primera fila", async () => {
      const linkPorActivar = page.getByRole("link", { name: "Conductores por activar" });
      await expect(linkPorActivar).toBeVisible({ timeout: 10000 });

      const loading = page.locator("#loading_screen");
      if (await loading.isVisible({ timeout: 3000 }).catch(() => false)) {
        await loading.waitFor({ state: "hidden", timeout: 15000 });
      }

      await linkPorActivar.click();

      if (await loading.isVisible({ timeout: 3000 }).catch(() => false)) {
        await loading.waitFor({ state: "hidden", timeout: 15000 });
      }

      const tabla = page.getByRole("table");
      await expect(tabla).toBeVisible({ timeout: 10000 });
      await capturarPaso(page, "13_conductores_por_activar_resultados", "usuarios");

      const cuartaAccion = page.locator("table tbody tr").first().locator("a").nth(3);
      await expect(cuartaAccion).toBeVisible({ timeout: 10000 });
      await cuartaAccion.click();
      await capturarPaso(page, "14_click_accion_conductor", "usuarios");
    });
  });
});
