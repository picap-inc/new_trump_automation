import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
    test("Validar pagina notificaciones y sus funciones", async ({ page }) => {
        const URL_NOTIFICACIONES = "https://admin.picap.io/notifications";

        //Paso 1: Iniciar sesion 
        await login(page);

        //Paso 2: Abrir el menu lateral
        await Barra(page);

        //Paso 3: Hacer click en el modulo  "Marketing y Growth"
        const marketingModule = page.getByText("Marketing y growth");
        await expect(marketingModule).toBeVisible({ timeout: 1000 });
        marketingModule.click();

        //Paso 4: Hacer click en nofiticaciones
        const notificacionesLink = page.getByRole('link', { name: 'Notificaciones' });
        await expect(notificacionesLink).toBeVisible({ timeout: 10000});
        await notificacionesLink.click();

        //Paso 5: Validar que la pagina de Notificaciones cargo correctamente
        await expect(page).toHaveURL(URL_NOTIFICACIONES, { timeout: 5000 });

        //Paso 6: Rellenar campo "Desde" con fecha
        const  desdeInput = page.getByRole('textbox', { name: 'Desde' });
        await expect(desdeInput).toBeVisible({ timeout: 10000 });
        await desdeInput.fill("2025-03-01")

        //Paso 7: Rellenar campo "Hasta" con fecha  actual
        const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
        await expect(hastaInput).toBeVisible({ timeout: 10000 });
        const currentDate = new Date().toISOString().split('T')[0];
        await hastaInput.fill(currentDate);

        //Paso 8: Hacer click en boton buscar
        const buscarButton = page.getByRole('button', { name: 'Buscar' });
        await expect(buscarButton).toBeVisible({ timeout: 10000 });
        await buscarButton.click();

         // Paso 9: Esperar a que la búsqueda se muestre
        await test.step("Esperar a que se cargue la búsqueda", async () => {
        await page.waitForTimeout(3000); 
      
  
        //Paso 10: Hacer click en limpiar 
        const limpiarButton = page.getByRole('button', { name: 'Limpiar' });
        await expect(limpiarButton).toBeVisible({ timeout: 10000});
        await limpiarButton.click();

        //Paso 11: Seleccionar Estado 'Deshabilitado' con teclado y Escribir Tu Pipro NO ha podido renovarse
        await page.locator('#status_cd').selectOption({ label: 'Deshabilitado' });
        const escribir = page.getByRole('textbox', { name: 'Título' });
        await expect(escribir).toBeVisible();
        await escribir.fill("Tu Pipro NO ha podido renovarse");

        //Paso 12: Dar click en buscar
        const buscarButton = page.getByRole('button', { name: 'Buscar' });
        await expect(buscarButton).toBeVisible({ timeout: 10000 });
        await buscarButton.click();

        //Paso 13: Dar click en Crear nueva notificacion y llenar campos
        const clickNotis = page.getByRole('button', { name: 'Crear nueva notificación' });
        await expect(clickNotis).toBeVisible({ timeout:10000 });
        await clickNotis.click();
        await page.getByLabel('Título').fill("Prueba QA");
        await page.getByRole('textbox', { name: 'Descripción' }).fill("Automation QA");

        //Paso 14: Dar click en cancelar 
        await page.getByRole('button', { name: 'Cancelar' }).scrollIntoViewIfNeeded();
        await page.getByRole('button', { name: 'Cancelar' }).click(); 



    })
  })
});
