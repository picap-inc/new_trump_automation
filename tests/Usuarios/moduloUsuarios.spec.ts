import { test, expect, Page, Locator } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { capturarPaso } from "../utils/capturas";

//Función para verificar si la página sigue activa
function isPageActive(page: Page): boolean {
  return !page.isClosed();
}

//Función robusta con espera de loader y reintentos
async function clickConLoading(link: Locator, page: Page) {
  const esperarLoading = async () => {
    try {
      await page.waitForFunction(() => {
        const el = document.querySelector("#loading_screen") as HTMLElement | null;
        if (!el) return true;
        const style = window.getComputedStyle(el);
        return (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0" ||
          el.offsetParent === null
        );
      }, { timeout: 9000 });
    } catch (_) {
    
    }
  };

  await esperarLoading();

  for (let i = 0; i < 3; i++) {
    try {
      await link.click({ timeout: 10000 });
      break;
    } catch (e) {
      await esperarLoading();

      if (!isPageActive(page)) {
        console.warn("⚠️ Página cerrada durante clickConLoading.");
        break;
      }

      await page.waitForTimeout(500);

      if (i === 2) throw e;
    }
  }

  await esperarLoading();
}

test.describe("Validación del módulo Usuarios", () => {
  test("Flujo completo de búsqueda y navegación por filtros de estado", async ({ page }) => {
    test.setTimeout(250000); // ⏱ Timeout global ampliado a 4 minutos

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
      await clickConLoading(usuarios, page);
      await capturarPaso(page, "03_click_modulo_usuarios", "usuarios");

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
      await clickConLoading(linkHistorial, page);
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
        await test.step(`Ir a sección: ${seccion.name}`, async () => {
          try {
            const link = page.getByRole("link", { name: seccion.name, ...seccion.options });
            await expect(link).toBeVisible({ timeout: 10000 });
            await clickConLoading(link, page);
            await page.waitForTimeout(1000);
            await capturarPaso(page, seccion.id, "usuarios");
          } catch (error) {
            console.warn(`⚠️ Sección omitida "${seccion.name}" por timeout o error:`, error);
          }
        });
      }
    });

    // Paso 6: Volver a "Conductores por activar" y hacer clic en acción
    await test.step("Validar resultados y dar clic en acción de la primera fila", async () => {
      const linkPorActivar = page.getByRole("link", { name: "Conductores por activar" });
      await expect(linkPorActivar).toBeVisible({ timeout: 20000 });
      await clickConLoading(linkPorActivar, page);

      const tabla = page.getByRole("table");
      await expect(tabla).toBeVisible({ timeout: 140000 });
      await capturarPaso(page, "13_conductores_por_activar_resultados", "usuarios");

      const cuartaAccion = page.locator("table tbody tr").first().locator("a").nth(3);
      await expect(cuartaAccion).toBeVisible({ timeout: 10000 });
      await cuartaAccion.click();
      await capturarPaso(page, "14_click_accion_conductor", "usuarios");
    });
  });
});
