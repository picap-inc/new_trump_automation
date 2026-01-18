/**
 * Test: Validación del módulo Usuarios
 * 
 * Valida: Búsqueda de usuarios, historial y navegación por secciones
 * Flujo: Login → Usuarios → Búsqueda → Historial → Secciones
 * 
 * Timeout 250s: Test extenso con múltiples navegaciones
 */

import { test, expect } from '../../fixtures/pages';

test.describe('Validación del módulo Usuarios', () => {
  test('Flujo completo de búsqueda y navegación por filtros de estado', async ({ 
    page,
    loginPage, 
    navigationPage, 
    usuariosPage 
  }, testInfo) => {
    test.setTimeout(250000);

    // When: abro el menú lateral
    await test.step('Abrir barra lateral de navegación', async () => {
      await navigationPage.openSideMenu();
      await loginPage.takeScreenshot(testInfo, '02 - Menú lateral');
    });

    // And: navego al módulo Usuarios
    await test.step('Navegar al módulo Usuarios', async () => {
      await usuariosPage.navigateToUsuarios();
      await loginPage.takeScreenshot(testInfo, '03 - Módulo Usuarios');
      await loginPage.takeScreenshot(testInfo, '04 - Tabla cargada');
    });

    // And: filtro por Email
    await test.step('Filtrar por Email, abrir y cerrar historial', async () => {
      await usuariosPage.searchByEmail('davilaprod@gmail.com');
      await loginPage.takeScreenshot(testInfo, '05 - Filtro email');

      await usuariosPage.openHistorial();
      await loginPage.takeScreenshot(testInfo, '06 - Historial abierto');

      await usuariosPage.closeHistorial();
      await loginPage.takeScreenshot(testInfo, '07 - Historial cerrado');
    });

    // Then: debería poder navegar por secciones
    await test.step('Navegar por otras secciones del módulo', async () => {
      const secciones = [
        { name: 'Pasajeros', id: '08' },
        { name: 'Conductores', id: '09', exact: true },
        { name: 'Conductores por activar', id: '10' },
        { name: 'Suspendidos', id: '11' },
        { name: 'Expulsados', id: '12' },
      ];

      for (const seccion of secciones) {
        await test.step(`Ir a sección: ${seccion.name}`, async () => {
          await usuariosPage.navigateToSeccion(seccion.name, seccion.exact || false);
          await loginPage.takeScreenshot(testInfo, `${seccion.id} - ${seccion.name}`);
        });
      }
    });

    // And: valido resultados en Conductores por activar
    await test.step('Validar resultados y dar clic en acción de la primera fila', async () => {
      await usuariosPage.navigateToSeccion('Conductores por activar');
      await loginPage.takeScreenshot(testInfo, '13 - Conductores por activar');

      await usuariosPage.clickActionInFirstRow(3);
      await loginPage.takeScreenshot(testInfo, '14 - Click acción conductor');
    });
  });
});
