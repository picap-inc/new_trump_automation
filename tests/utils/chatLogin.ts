// funciones/loginToChat.ts
import { Page } from '@playwright/test';

export async function loginToChat(page: Page) {
  await page.goto('https://chat.picap.app/users/sign_in');

  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('automatizador@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Picap4321');
  await page.getByRole('button', { name: 'Log in' }).click();
}
