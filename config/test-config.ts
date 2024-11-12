/**
 * Configuración global de timeouts y retries
 * 
 * Timeouts basados en métricas reales del sistema Trump
 */
export const testConfig = {
  timeouts: {
    short: 5000,      // Elementos simples
    medium: 10000,    // Acciones con backend
    long: 30000,      // Operaciones complejas (geocodificación, etc.)
    extraLong: 60000  // Flujos E2E completos
  },
  
  retries: {
    api: 3,           // Rate limiting temporal
    element: 2,       // Loaders, modals dinámicos
    screenshot: 1
  },
  
  screenshots: {
    onFailure: true,
    onSuccess: false,
    fullPage: true
  },

  waits: {
    afterLogin: 5000,      // Espera post-login para carga completa
    menuAnimation: 1500,    // Animación de menú lateral
    shortDelay: 1000        // Delays cortos generales
  }
};

