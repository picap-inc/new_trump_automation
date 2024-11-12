/**
 * login - Helper de compatibilidad con sistema anterior
 * 
 * @deprecated Este helper está deprecado. Usar LoginPage desde fixtures.
 * Se mantiene para compatibilidad con tests no refactorizados.
 * 
 * IMPORTANTE: El login SIEMPRE es prerequisito para todos los tests.
 * El auth.setup.ts se ejecuta primero y guarda la sesión en .auth/user.json
 * 
 * Uso en tests refactorizados:
 * import { test } from '../../fixtures/pages';
 * test('mi test', async ({ loginPage }) => {
 *   await loginPage.login(users.admin.email, users.admin.password);
 * });
 */

import { Page, expect } from "@playwright/test";

export async function login(page: Page): Promise<void> {
  await page.goto("https://admin.picap.io/");
  await page.locator("#username").fill("automatizador@gmail.com");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("Picap321");
  await page.getByRole("button", { name: "Ingresar" }).click();

  // Validar que el login fue exitoso
  await expect(page.getByRole("heading", { name: "Bienvenido(a) a Nuevo Trump" })).toBeVisible({ timeout: 10000 });
}

