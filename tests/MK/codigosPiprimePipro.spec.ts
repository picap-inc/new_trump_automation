import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar acceso a codigos masivos y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer click en la opcion "Códigos Piprime y Pipro"
    await test.step("Hacer click en Códigos Piprime y Pipro", async () => {
      const codesPiprimePro = page.getByRole('link', { name: 'Códigos Piprime y Pipro' });
      await expect(codesPiprimePro).toBeVisible({ timeout: 10000 });
      await codesPiprimePro.click();
    })

   // Paso 5: Llenar los filtros de búsqueda y buscar
await test.step("Completar filtros de búsqueda y ejecutar búsqueda", async () => {
    // Escribir en el campo "Nombre"
    const inputNombre = page.getByRole('textbox', { name: 'Nombre' });
    await expect(inputNombre).toBeVisible({ timeout: 5000 });
    await inputNombre.fill("CALZADO ADRENALINA");
  
    // Escribir la fecha "4 marzo de 2025" en el campo "Desde" con formato YYYY-MM-DD
    const inputFechaDesde = page.getByRole('textbox', { name: 'Desde' });
    await expect(inputFechaDesde).toBeVisible({ timeout: 5000 });
    await inputFechaDesde.fill("2025-03-04"); // Formato correcto para <input type="date">
  
    // Seleccionar la opción del campo tipo select con la letra "U"
    const selectTipoCodigo = page.locator('#code_type');
    await expect(selectTipoCodigo).toBeVisible({ timeout: 5000 });
    await selectTipoCodigo.click(); // Abre el select
    
    // Escribir "U" para filtrar la opción correspondiente
    await page.keyboard.press('U');
  
    // Confirmar selección con Enter
    await page.keyboard.press('Enter');
  
    // Hacer clic en "Buscar"
    const botonBuscar = page.getByRole('button', { name: 'Buscar' });
    await expect(botonBuscar).toBeVisible();
    await botonBuscar.click();
  });

  // Paso 6: Limpiar los filtros después de la búsqueda
    await test.step("Esperar y limpiar los filtros de búsqueda", async () => {
    // Esperar 3 segundos para visualizar los resultados antes de limpiar
    await page.waitForTimeout(3000);
  
    // Hacer clic en el botón "Limpiar"
    const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
    await expect(botonLimpiar).toBeVisible();
    await botonLimpiar.click();
  });
  

 })
});