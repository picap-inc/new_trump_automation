import { test, expect } from "@playwright/test";
import { capturarPaso } from "../utils/capturas"; // ✅ Utilidad común

test.describe("Validar el login de trumpDev", () => {
  test("Completar el login con email y contraseña válidos", async ({ page }) => {
    // Paso 1: Navegar a la página de login
    await test.step("Abrir la página de TrumpProduccion", async () => {
      await page.goto("https://admin.picap.io/");
      await capturarPaso(page, "01_pagina_login", "login");
    });

    // Paso 2: Llenar los campos de email y contraseña
    await test.step("Llenar los campos de login", async () => {
      await page.locator('#username').fill("automatizador@gmail.com");
      await page.getByRole('textbox', { name: 'Contraseña' }).fill("Picap321");
      await capturarPaso(page, "02_campos_llenos", "login");
    });

    // Paso 3: Hacer clic en el botón "Ingresar"
    await test.step("Hacer clic en el botón de login", async () => {
      await page.getByRole('button', { name: 'Ingresar' }).click();
      await capturarPaso(page, "03_click_ingresar", "login");
    });

    // Paso 4: Esperar hasta que el dashboard cargue correctamente
    await test.step("Esperar hasta que el usuario esté autenticado", async () => {
      const mensajeBienvenida = page.getByRole('heading', { name: 'Bienvenido(a) a Trump' });
      await expect(mensajeBienvenida).toBeVisible({ timeout: 10000 });
      await capturarPaso(page, "04_dashboard_cargado", "login");
    });

    // Paso 5: Hacer clic en la foto de perfil para abrir el menú de usuario
    await test.step("Abrir el menú de usuario", async () => {
      const fotoPerfil = page.getByRole('button', { name: 'Abrir menú de usuario' });
      await fotoPerfil.waitFor({ state: 'visible' });
      await fotoPerfil.scrollIntoViewIfNeeded();

      let intentos = 3;
      for (let i = 0; i < intentos; i++) {
        try {
          await fotoPerfil.click();
          await page.waitForTimeout(1000);
          if (await page.getByRole('link', { name: 'Cerrar sesión' }).isVisible()) {
            break;
          }
        } catch (error) {
          console.warn(`Intento ${i + 1} fallido al hacer clic en la foto de perfil.`);
          if (i === intentos - 1) throw error;
        }
      }

      await capturarPaso(page, "05_menu_usuario_abierto", "login");
    });

    // Paso adicional: Abrir menú y navegar a "Marketing y growth"
    await test.step("Ir a Marketing y growth", async () => {
      await page.locator('div').filter({ hasText: 'Automatizacion BdbdAbrir men' }).nth(2).click();
      await page.locator('#ham-menu').click();
      await page.getByText('Marketing y growth').click();
      await capturarPaso(page, "06_marketing_growth", "login");
    });

    // Paso 6: Hacer clic en "Cerrar sesión"
    await test.step("Hacer clic en cerrar sesión", async () => {
      const botonCerrarSesion = page.getByRole('link', { name: 'Cerrar sesión' });
      await botonCerrarSesion.waitFor({ state: 'visible' });
      await botonCerrarSesion.click();
      await capturarPaso(page, "07_click_cerrar_sesion", "login");
    });

    // Paso 7: Validar que el usuario fue redirigido al login
    await test.step("Validar que el usuario cerró sesión", async () => {
      await expect(page.locator('#username')).toBeVisible({ timeout: 5000 });
      await capturarPaso(page, "08_login_post_logout", "login");
    });
  });
});
