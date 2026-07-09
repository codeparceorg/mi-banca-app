const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_GATEWAY || 'http://microservicio.sis-main-ms.lab';
const TIMEOUT_MS = 15000;

class HttpClientError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'HttpClientError';
    this.status = status;
    this.data = data;
  }
}

function getDefaultHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('accessToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(response) {
  if (response.status === 204) return null;

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || 'Ha ocurrido un error inesperado.';
    throw new HttpClientError(message, response.status, data);
  }

  return data;
}

export async function request(endpoint, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const url = `${BASE_URL}${endpoint}`;
  const config = {
    method: options.method || 'GET',
    headers: { ...getDefaultHeaders(), ...options.headers },
    signal: controller.signal,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    return handleResponse(response);
  } catch (err) {
    if (err instanceof HttpClientError) throw err;

    if (err.name === 'AbortError') {
      throw new HttpClientError('No fue posible conectar con el servidor.', 0, null);
    }

    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new HttpClientError('No fue posible conectar con el servidor.', 0, null);
    }

    throw new HttpClientError('Ha ocurrido un error inesperado.', 0, null);
  } finally {
    clearTimeout(timeout);
  }
}
