const API_BASE_URL = import.meta.env.VITE_API_GATEWAY || 'http://microservicio.sis-main-ms.lab';

export const api = {
  async signup(fullName, email, password) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
        signal: controller.signal,
      });

      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Solicitud inválida.');
      }

      if (response.status === 500) {
        throw new Error('Ha ocurrido un error inesperado.');
      }

      if (!response.ok) {
        throw new Error('Ha ocurrido un error inesperado.');
      }

      return response.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('No fue posible conectar con el servidor.');
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  },

  async login(email, password) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      if (response.status === 401) {
        throw new Error('Correo o contraseña incorrectos.');
      }

      if (response.status === 500) {
        throw new Error('Ha ocurrido un error inesperado.');
      }

      if (!response.ok) {
        throw new Error('Ha ocurrido un error inesperado.');
      }

      return response.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('No fue posible conectar con el servidor.');
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  },

  async getDashboard() {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Error al cargar el dashboard');
    }
    return response.json();
  },

  async postTransfer(data) {
    const response = await fetch(`${API_BASE_URL}/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Error al realizar la transferencia');
    }
    return response.json();
  },
};
