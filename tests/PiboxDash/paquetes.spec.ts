import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { piboxDashboard } from "../utils/pibox";
import { barraPibox } from "../utils/barraPibox";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación de módulo paquetes", () => {
  test("Validación de módulo paquetes desde Compañías", async ({ page }) => {

    // PASO 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "paquetes");
    });

    // PASO 2: Abrir menú lateral general
    await test.step("Abrir menú lateral general", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "paquetes");
    });

    // PASO 3: Ir a Pibox Dashboard
    await test.step("Ir a Pibox Dashboard", async () => {
      await piboxDashboard(page, "03_pibox_dashboard", "paquetes");
    });

    // PASO 4: Abrir menú lateral de Pibox
    await test.step("Abrir menú lateral de Pibox", async () => {
      await barraPibox(page, "04_menu_pibox", "companias");
    });

    // PASO 5: Entrar al módulo Compañías
    await test.step("Entrar al módulo Compañías", async () => {
      const companiasLink = page.getByRole("link", { name: "Compañías Compañías" });
      await expect(companiasLink).toBeVisible({ timeout: 10000 });
      await companiasLink.click();

      await page.waitForTimeout(3000);
      await capturarPaso(page, "05_modulo_companias", "companias");
    });

    // PASO 6: Buscar compañía "Cruz Verde"
    await test.step("Buscar compañía Cruz Verde", async () => {
      const buscador = page.getByRole('textbox', { name: 'Nombre' });
      await expect(buscador).toBeVisible({ timeout: 10000 });

      await buscador.fill("Cruz Verde");
      await buscador.press("Enter");

      await page.waitForTimeout(3000);
      await capturarPaso(page, "06_busqueda_cruz_verde", "companias");
    });

    // PASO 7: Seleccionar compañía Cruz Verde Mostrador Nacional
    await test.step("Seleccionar compañía Cruz Verde Mostrador Nacional", async () => {
      const linkCruzVerde = page.getByRole('link', { name: 'Cruz Verde Mostrador Nacional' });
      await expect(linkCruzVerde).toBeVisible({ timeout: 10000 });

      await linkCruzVerde.click();
      await page.waitForTimeout(5000);
    });

    // PASO 8: Ir a la pestaña Paquetes con hover + click
    await test.step("Ir a la pestaña Paquetes", async () => {
      // Esperar que la página termine de cargar
      await page.waitForLoadState('networkidle');

      // Buscar el enlace que contiene "/packages" en cualquier parte del href
      const tabPaquetes = page.locator('a[href*="/packages"]');

      // Verificar que existe en el DOM
      const count = await tabPaquetes.count();
      console.log(`🔍 Número de elementos encontrados con href*="/packages": ${count}`);
      expect(count).toBeGreaterThan(0);

      // Hacer hover para simular interacción real
      await tabPaquetes.hover();

      // Pequeña espera para que se active cualquier animación de hover
      await page.waitForTimeout(1000);

      // Hacer click (force por si hay overlay)
      await tabPaquetes.click({ force: true });

      // Esperar que cargue la nueva vista
      await page.waitForTimeout(3000);

      // Captura de evidencia
      await capturarPaso(page, "08_tab_paquetes", "companias");
    });

    // PASO 9: Aplicar filtro de Paquetes (Entregado)
    await test.step("Aplicar filtro status_cd = Entregado", async () => {
      const statusDropdown = page.locator('#status_cd');
      await expect(statusDropdown).toBeVisible({ timeout: 10000 });

      await statusDropdown.selectOption({ label: "Entregado" });
      await statusDropdown.press("Enter");

      await page.waitForTimeout(3000);
      await capturarPaso(page, "09_filtro_entregado", "companias");
    });

    // PASO 10: Validar resultados
    await test.step("Validar que haya resultados en la tabla", async () => {
      const resultados = await page.locator('table tbody tr').count();
      console.log(`📦 Resultados encontrados: ${resultados}`);
      expect(resultados).toBeGreaterThan(0);
    });
  });
});
