import { request } from './httpClient';

export const api = {
  async signup(email, password) {
    try {
      return await request('/auth/signup', {
        method: 'POST',
        body: { email, password },
      });
    } catch (err) {
      throw new Error(err.message || 'Ha ocurrido un error inesperado.');
    }
  },

  async login(email, password) {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
    } catch (err) {
      if (err.status === 401) {
        throw new Error('Correo o contraseña incorrectos.');
      }
      throw new Error(err.message || 'Ha ocurrido un error inesperado.');
    }
  },

  async getDashboard() {
    return request('/dashboard');
  },

  async postTransfer(data) {
    return request('/transfer', {
      method: 'POST',
      body: data,
    });
  },
};
