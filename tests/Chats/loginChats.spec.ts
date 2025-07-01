import { test, expect } from '@playwright/test';

test.describe('Módulo de Chats - Validar acceso y login', () => {
  test('Debe abrir la página de login, iniciar sesión y mostrar el texto "Chat Central"', async ({ page }) => {
    // Navegar a la página de login del módulo de chats
    await page.goto('https://chat.picap.app/users/sign_in');

    // Validar que la URL es la esperada
    await expect(page).toHaveURL(/.*chat\.picap\.app\/users\/sign_in/);

    // Llenar el campo de correo
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('automatizador@gmail.com');

    // Llenar el campo de contraseña
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Picap4321');

    // Clic en el botón "Log in"
    await page.getByRole('button', { name: 'Log in' }).click();

    // Validar que el texto "Chat Central" se muestre después de iniciar sesión
    await expect(page.getByText('Chat Central')).toBeVisible();
  });
});
