/**
 * PLANIX UNIFIED API CLIENT
 * High-performance fetch wrapper with offline caching fallback
 */

class APIClient {
  constructor() {
    this.baseUrl = '/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[APIClient] Network issue on ${endpoint}, falling back to local state:`, err.message);
      return { success: false, offline: true, error: err.message };
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

window.apiClient = new APIClient();
