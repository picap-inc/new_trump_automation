import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar modulo Bicitaxi", async ({ page }) => {
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

    // Paso 4: Hacer clic en Bicitaxi
    await test.step("Click en Bicitaxi", async () => {
      const biciModule = page.getByRole('link', { name: 'Bicitaxi', exact: true });
      await expect(biciModule).toBeVisible({ timeout: 10000 });
      await biciModule.click();
    });

    // Paso 5: Validación de filtros
    await test.step("Aplicar filtros y validarlos", async () => {
      // Zona: seleccionar "Centro Suba"
      const zonaSelect = page.locator('#name');
      await expect(zonaSelect).toBeVisible();
      await zonaSelect.selectOption({ label: 'Centro Suba' });

      // Estado: seleccionar "Activa"
      const estadoSelect = page.locator('#is_enabled');
      await expect(estadoSelect).toBeVisible();
      await estadoSelect.selectOption({ label: 'Activa' });

      // Ciudad: seleccionar "Bogota - Colombia"
      const ciudadSelect = page.locator('#city_id');
      await expect(ciudadSelect).toBeVisible();
      await ciudadSelect.selectOption({ label: 'Bogota - Colombia' });

      // Clic en Buscar
      const buscarBtn = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarBtn).toBeVisible();
      await buscarBtn.click();

      // Esperar resultados (puedes ajustar el selector según el resultado esperado)
      await page.waitForTimeout(2000); // o reemplazar por un locator esperado

      // Clic en Limpiar
      const limpiarBtn = page.getByRole('button', { name: 'Limpiar' });
      await expect(limpiarBtn).toBeVisible();
      await limpiarBtn.click();

      // Paso 6: Validación de Crear Zona
await test.step("Crear una nueva zona y cancelar", async () => {
    // Click en botón "Crear zona"
    const crearZonaBtn = page.getByRole('button', { name: 'Crear zona' });
    await expect(crearZonaBtn).toBeVisible();
    await crearZonaBtn.click();
  
    // Esperar a que aparezca el formulario
    const nombreZonaInput = page.getByRole('textbox', { name: 'Nombre de la zona' });
    await expect(nombreZonaInput).toBeVisible();
  
    // Ingresar nombre de zona
    await nombreZonaInput.fill('Prueba QA');
  
    // Seleccionar país: Colombia
    const paisSelect = page.getByLabel('País');
    await expect(paisSelect).toBeVisible();
    await paisSelect.selectOption({ label: 'Colombia' });
  
    // Seleccionar ciudad: Bogotá manualmente
    const ciudadDropdown = page.locator('.ts-control');
    await expect(ciudadDropdown).toBeVisible();
    await ciudadDropdown.click();
    await ciudadDropdown.type('Bogota');
    await page.keyboard.press('Enter');
  
    // Ingresar latitud
    const latitudInput = page.getByRole('textbox', { name: 'Latitud' });
    await expect(latitudInput).toBeVisible();
    await latitudInput.fill('4.710989'); // ejemplo: Latitud de Bogotá
  
    // Ingresar longitud
    const longitudInput = page.getByRole('textbox', { name: 'Longitud' });
    await expect(longitudInput).toBeVisible();
    await longitudInput.fill('-74.072090'); // ejemplo: Longitud de Bogotá
  
    // Click en Cancelar
    const cancelarBtn = page.getByRole('button', { name: 'Cancelar' });
    await expect(cancelarBtn).toBeVisible();
    await cancelarBtn.click();
       });      
      });
    });
  });
