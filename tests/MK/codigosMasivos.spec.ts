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

    // Paso 4: Poner el cursor sobre "Códigos promocionales"
    await test.step("Hover sobre Códigos Promocionales", async () => {
        await page.getByText("Códigos promocionales").first().hover();
      });

    // Paso 5: Hacer click en "Codigos masivos"
    await test.step("Seleccionar Códigos masivos", async () => {
        const codigosMasivos = page.getByRole('link', { name: 'Códigos masivos' });
        await expect(codigosMasivos).toBeVisible({ timeout: 5000 });
        await codigosMasivos.click();

    // Paso 6: Escribir en el campo "Nombre" y buscar
    await test.step("Buscar y limpiar en Códigos masivos", async () => {
    // Localizar el campo de texto y escribir "PRUEBASQA"
    const inputNombre = page.getByRole('textbox', { name: 'Nombre' });
    await expect(inputNombre).toBeVisible({ timeout: 5000 });
    await inputNombre.fill("PRUEBASQA");
  
    // Hacer clic en "Buscar"
    const botonBuscar = page.getByRole('button', { name: 'Buscar' });
    await expect(botonBuscar).toBeVisible();
    await botonBuscar.click();
  
    // Esperar 3 segundos para ver los resultados
    await page.waitForTimeout(3000);
  
    // Hacer clic en "Limpiar"
    const botonLimpiar = page.getByRole('button', { name: 'Limpiar' });
    await expect(botonLimpiar).toBeVisible();
    await botonLimpiar.click();
  
    // Esperar 4 segundos para que la página cargue completamente después de limpiar
    await page.waitForTimeout(4000);
  });

   // Paso 7: Seleccionar "Finalizado" en el campo select y buscar nuevamente
    await test.step("Filtrar por estado 'Finalizado' usando el teclado y buscar", async () => {
    // Localizar el campo select y hacer clic para abrir las opciones
    const selectEstado = page.locator('#code_status');
    await expect(selectEstado).toBeVisible({ timeout: 5000 });
    await selectEstado.click();
  
    // Escribir "F" para filtrar la opción "Finalizado"
    await page.keyboard.press('F');
  
    // Confirmar la selección con Enter
    await page.keyboard.press('Enter');
  
    // Hacer clic en "Buscar" nuevamente
    const botonBuscar = page.getByRole('button', { name: 'Buscar' });
    await expect(botonBuscar).toBeVisible();
    await botonBuscar.click();
  });
  
      });
    });
  });
