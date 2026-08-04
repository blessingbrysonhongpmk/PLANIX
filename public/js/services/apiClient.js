/**
 * PLANIX UNIFIED API CLIENT
 * High-performance fetch wrapper with offline queueing and sync
 */

class APIClient {
  constructor() {
    this.baseUrl = '/api';
    this.syncQueue = JSON.parse(localStorage.getItem('planix_sync_queue') || '[]');
    
    // Listen for online event to flush queue
    window.addEventListener('online', () => this.flushQueue());
  }

  saveQueue() {
    localStorage.setItem('planix_sync_queue', JSON.stringify(this.syncQueue));
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (!navigator.onLine && options.method !== 'GET') {
      // Offline mutation - queue it
      this.syncQueue.push({ endpoint, options });
      this.saveQueue();
      if (window.showToast) window.showToast('Offline mode. Changes saved locally.', 'info');
      return { success: true, offline: true, queued: true };
    }

    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      return await res.json();
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
    
    for (const item of queue) {
      try {
        const url = `${this.baseUrl}${item.endpoint}`;
        const headers = { 'Content-Type': 'application/json', ...item.options.headers };
        await fetch(url, { ...item.options, headers });
        successCount++;
      } catch (e) {
        // If it fails again, re-queue
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

