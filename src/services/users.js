import { request } from './httpClient';

export async function saveUser(data) {
  try {
    return await request('/users/save', {
      method: 'POST',
      body: data,
    });
  } catch (err) {
    if (err.status === 400) {
      throw new Error(err.message || 'Error de validación.');
    }
    if (err.status === 409) {
      throw new Error(err.message || 'El correo ya se encuentra registrado.');
    }
    throw new Error(err.message || 'Ha ocurrido un error inesperado.');
  }
}
