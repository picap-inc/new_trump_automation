import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";
import { barraPicash } from "../utils/barraPicash";
import { capturarPaso } from "../utils/capturas";

test.describe("Validación del módulo Picash", () => {
  test("Ingresar a Picash", async ({ page }) => {
    test.setTimeout(120000);

    await test.step("Login en la plataforma", async () => {
      await login(page);
      await capturarPaso(page, "01_login", "picash");
    });

    await test.step("Abrir barra lateral general de navegación", async () => {
      await Barra(page);
      await capturarPaso(page, "02_barra_general", "picash");
    });

    await test.step("Navegar al módulo Picash y validar URL", async () => {
      const picash = page.getByRole('link', { name: 'home Picash' });
      await expect(picash).toBeVisible({ timeout: 10000 });
      await picash.click();
      await expect(page).toHaveURL("https://admin.picap.io/picash/", {
        timeout: 10000,
      });
      await capturarPaso(page, "03_click_modulo_picash", "picash");
    });

    await test.step("Abrir menú lateral de Picash y validar", async () => {
      const headingPicash = await barraPicash(page); 
      await expect(headingPicash).toBeVisible({ timeout: 7000 }); 
      await capturarPaso(page, "04_barra_picash_abierta", "picash");
    });

    await test.step("Ingresar a Dispositivos Bloqueados", async () => {
      const dispoBloqueado = page.getByRole('link', { name: 'Dispositivos bloqueados' });
      await expect(dispoBloqueado).toBeVisible({ timeout: 7000 });
      await dispoBloqueado.click();
      await expect(page).toHaveURL("https://admin.picap.io/picash/locked_sessions", {
        timeout: 10000,
      });
      await capturarPaso(page, "05_dispositivo_bloqueado", "picash");
    });

    await test.step("Filtrar dispositivos bloqueados por IMEI/UUID y sistema operativo", async () => {
      // Ingresar el IMEI/UUID
      const imeiInput = page.getByRole('textbox', { name: 'IMEI/UUID' });
      await expect(imeiInput).toBeVisible({ timeout: 5000 });
      await imeiInput.fill("6E:B3:83:14:DD:A0:0F:73:64:AB:4A:81:68:F6:B7:B2:BF:3D:45:FB:10:FA:C6:CD:78:37:13:2C:35:A7:01:56");

      // Click en Buscar
      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible({ timeout: 5000 });
      await buscarBtn.click();

      // Esperar resultados visibles
      const tablaResultados = page.locator("table tbody tr");
      await expect(tablaResultados.first()).toBeVisible({ timeout: 10000 });

      // Click en Limpiar
      const limpiarBtn = page.getByRole('button', { name: 'Limpiar' });
      await expect(limpiarBtn).toBeVisible({ timeout: 5000 });
      await limpiarBtn.click();

      // Seleccionar sistema operativo iOS
      const osSelect = page.locator('#os');
      await expect(osSelect).toBeVisible({ timeout: 5000 });
      await osSelect.selectOption({ label: 'iOS' });

      // Buscar por sistema operativo
      await buscarBtn.click();

      // Validar que aparecen resultados
      await expect(tablaResultados.first()).toBeVisible({ timeout: 10000 });

      // Click en Limpiar nuevamente
      await limpiarBtn.click();

      // Captura final
      await capturarPaso(page, "06_filtrado_dispositivos", "picash");
    });
  });
});
