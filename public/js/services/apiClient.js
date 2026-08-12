/**
 * PLANIX UNIFIED API CLIENT
 * High-performance fetch wrapper with Auth token header injection and sync
 */

class APIClient {
  constructor() {
    this.baseUrl = '/api';
    this.syncQueue = JSON.parse(localStorage.getItem('planix_sync_queue') || '[]');
    
    // Listen for online event to flush queue
    window.addEventListener('online', () => this.flushQueue());
  }

  getAuthToken() {
    return localStorage.getItem('planix_token') || '';
  }

  saveQueue() {
    localStorage.setItem('planix_sync_queue', JSON.stringify(this.syncQueue));
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getAuthToken();

    const headers = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (!navigator.onLine && options.method !== 'GET') {
      this.syncQueue.push({ endpoint, options });
      this.saveQueue();
      if (window.showToast) window.showToast('Offline mode. Changes saved locally.', 'info');
      return { success: true, offline: true, queued: true };
    }

    try {
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        // Token expired
        console.warn('Authentication token expired or invalid.');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      if (options.method !== 'GET') {
        this.syncQueue.push({ endpoint, options });
        this.saveQueue();
      }
      console.warn(`[APIClient] Network issue on ${endpoint}, falling back to local state:`, err.message);
      return { success: false, offline: true, error: err.message };
    }
  }

  async flushQueue() {
    if (this.syncQueue.length === 0 || !navigator.onLine) return;
    
    const queue = [...this.syncQueue];
    this.syncQueue = [];
    this.saveQueue();
    
    let successCount = 0;
    const token = this.getAuthToken();
    
    for (const item of queue) {
      try {
        const url = `${this.baseUrl}${item.endpoint}`;
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...item.options.headers
        };
        await fetch(url, { ...item.options, headers });
        successCount++;
      } catch (e) {
        this.syncQueue.push(item);
      }
    }
    
    this.saveQueue();
    if (successCount > 0 && window.showToast) {
      window.showToast(`Synced ${successCount} offline changes`, 'success');
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    const isFormData = body instanceof FormData;
    return this.request(endpoint, { method: 'POST', body: isFormData ? body : JSON.stringify(body) });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

window.apiClient = new APIClient();
