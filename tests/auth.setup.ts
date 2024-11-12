/**
 * Auth Setup - Configuración global de autenticación
 * 
 * Se ejecuta una vez antes de todos los tests
 * Guarda el estado de sesión en .auth/user.json para reutilizar
 * 
 * Ventaja: No hacer login en cada test (ahorra tiempo y requests)
 */

import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../config/environments';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Realizar el login usando Page Object
  await loginPage.login(users.admin.email, users.admin.password);

  // Validar que el login fue exitoso
  await loginPage.verifyLoginSuccess();

  // Guardar el estado de autenticación
  await page.context().storageState({ path: authFile });
  
  console.log('✅ Autenticación completada y guardada en:', authFile);
});
