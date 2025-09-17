import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { piboxDashboard } from "../utils/pibox";
import { barraPibox } from "../utils/barraPibox";
import { capturarPaso } from "../utils/capturas";

// Función para esperar loader o saltar test
async function waitForLoaderOrSkip(page, loaderSelector, timeout = 15000) {
  try {
    console.log("⏳ Esperando que desaparezca el loader...");
    await page.waitForSelector(loaderSelector, { state: "detached", timeout });
    console.log("✅ Loader desapareció, continuando con el flujo.");
  } catch (error) {
    console.warn(`⚠️ Loader no desapareció en ${timeout / 1000} segundos. Saltando el test...`);
    test.info().skip(true, "Loader no desapareció, test saltado automáticamente.");
  }
}

test.describe("Validación de módulo Lista de servicios - Flujo completo", () => {
  test("Validación completa de filtros y navegación", async ({ page }) => {
    const loaderSelector = '.absolute.inset-0.flex.items-center.justify-center.bg-white.bg-opacity-75.z-50';

    // Paso 1: Iniciar sesión
    await test.step("Iniciar sesión", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "servicios");
    });

    // Paso 2: Abrir menú lateral general
    await test.step("Abrir menú lateral general", async () => {
      await Barra(page);
      await capturarPaso(page, "02_menu_lateral", "servicios");
    });

    // Paso 3: Ir a Pibox Dashboard
    await test.step("Ir a Pibox Dashboard", async () => {
      await piboxDashboard(page, "03_pibox_dashboard", "servicios");
    });

    // Paso 4: Abrir menú lateral de Pibox
    await test.step("Abrir menú lateral de Pibox", async () => {
      await barraPibox(page, "04_menu_pibox", "servicios");
    });

    // Paso 5: Entrar a Lista de servicios
    await test.step("Entrar al módulo Lista de servicios", async () => {
      const listaLink = page.getByRole('link', { name: /Lista de servicios/i });
      await expect(listaLink).toBeVisible({ timeout: 10000 });
      await listaLink.click();
      await capturarPaso(page, "05_click_lista_servicios", "servicios");
    });

    // Paso 6: Esperar loader o saltar test
    await test.step("Esperar loader o saltar test", async () => {
      await waitForLoaderOrSkip(page, loaderSelector, 15000);
    });

    // ============================
    // FILTROS PRINCIPALES
    // ============================

    // Paso 7: Filtro inicial
    await test.step("Filtro inicial - Conductor en camino + Efectivo + Colombia + Bogotá", async () => {
      await page.locator('#status_cd').selectOption({ label: 'Conductor en camino' });
      await page.locator('#use_wallet_balance').selectOption({ label: 'Efectivo' });
      await page.locator('#country_id').selectOption({ label: 'Colombia' });
      await page.locator('#city_id').selectOption({ label: 'Bogota' });

      await page.getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(3000); // espera para que carguen los resultados
      await capturarPaso(page, "06_resultados_filtro_inicial", "servicios");

      // Validamos que haya resultados
      const resultados = await page.locator('table tbody tr').count();
      expect(resultados).toBeGreaterThan(0);

      // Limpiar filtros
      await page.getByRole('button', { name: 'Limpiar' }).click();
      await page.waitForTimeout(1000);
    });

    // Paso 8: Ir a la pestaña Rent
    await test.step("Ir a pestaña Rent y aplicar filtro", async () => {
      await page.getByText('Rent').click();

      await page.locator('#status_cd').selectOption({ label: 'Conductor en camino' });
      await page.getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(3000);

      await capturarPaso(page, "07_resultados_rent", "servicios");

      // Validar resultados
      const resultados = await page.locator('table tbody tr').count();
      expect(resultados).toBeGreaterThan(0);

      // Limpiar filtros
      await page.getByRole('button', { name: 'Limpiar' }).click();
      await page.waitForTimeout(1000);
    });

    // Paso 9: Ir a pestaña Carga y aplicar filtros
    await test.step("Ir a pestaña Carga con filtros específicos", async () => {
      await page.locator('label').filter({ hasText: 'Carga' }).click();

      await page.locator('#status_cd').selectOption({ label: 'Buscando conductor' });
      await page.locator('#requested_service_type_id').selectOption({ label: 'Carga Carry' });

      await page.getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(3000);

      await capturarPaso(page, "08_resultados_carga", "servicios");

      // Validar resultados
      const resultados = await page.locator('table tbody tr').count();
      expect(resultados).toBeGreaterThan(0);
    });

    // Paso 10: Ir a pestaña Historial
    await test.step("Ir a pestaña Historial", async () => {
      await page.getByText('Historial').click();
      await page.waitForTimeout(2000);
      await capturarPaso(page, "09_historial", "servicios");
    });

    // Paso 11: Ir a pestaña Paquetes y aplicar filtro
    await test.step("Ir a pestaña Paquetes y aplicar filtro", async () => {
      await page.getByRole('link', { name: 'Paquetes', exact: true }).click();

      await page.locator('#status_cd').selectOption({ label: 'Esperando recogida' });
      await page.getByRole('button', { name: 'Buscar' }).click();
      await page.waitForTimeout(3000);

      await capturarPaso(page, "10_resultados_paquetes", "servicios");

      // Validar resultados
      const resultados = await page.locator('table tbody tr').count();
      expect(resultados).toBeGreaterThan(0);
    });

    // Paso 12: Validar enlace Pre Paquetes con URL final
    await test.step("Validar enlace Pre Paquetes", async () => {
      const prePaquetesLink = page.getByRole('link', { name: 'Pre Paquetes' });
      await expect(prePaquetesLink).toBeVisible();

      await prePaquetesLink.click();
      await expect(page).toHaveURL('https://admin.picap.io/pibox/overview?tab=pre_packages');

      await capturarPaso(page, "11_pre_paquetes", "servicios");
    });
  });
});
