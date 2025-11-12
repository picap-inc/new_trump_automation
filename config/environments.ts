/**
 * Configuración de ambientes y credenciales
 * 
 * Actualmente solo producción (no existe staging).
 * TODO: Mover credenciales a variables de entorno cuando haya CI/CD
 */

export interface Environment {
  baseURL: string;
  name: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export const environment: Environment = {
  baseURL: 'https://admin.picap.io',
  name: 'production'
};

export const users = {
  admin: {
    email: 'automatizador@gmail.com',
    password: 'Picap321'
  }
};

export const currentEnv = environment;

