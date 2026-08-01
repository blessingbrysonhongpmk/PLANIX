/**
 * PLANIX 4.0 REACTIVE STORE
 * Minimal State store with direct dashboard routing
 */

class Store {
  constructor() {
    this.state = {
      tasks: [],
      notes: [],
      journal: [],
      habits: [],
      predictions: [],
      user: {
        name: 'Bryson',
        xp: 1420,
        level: 3,
        levelTitle: 'Focus Architect',
        streak: 7,
        theme: 'dark'
      },
      currentView: 'dashboard', // Default directly to dashboard workspace
      activeNoteId: null,
      isAiDrawerOpen: false,
      isCommandPaletteOpen: false,
    };
    this.listeners = [];
    this.loadLocalCache();
  }

  loadLocalCache() {
    try {
      const cached = localStorage.getItem('planix_state');
      if (cached) {
        const parsed = JSON.parse(cached);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
  }

  saveLocalCache() {
    try {
      localStorage.setItem('planix_state', JSON.stringify({
        tasks: this.state.tasks,
        notes: this.state.notes,
        journal: this.state.journal,
        habits: this.state.habits,
        user: this.state.user
      }));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveLocalCache();
    this.listeners.forEach(l => l(this.state));
  }

  setState(updater) {
    if (typeof updater === 'function') {
      this.state = { ...this.state, ...updater(this.state) };
    } else {
      this.state = { ...this.state, ...updater };
    }
    this.notify();
  }

  async fetchAll() {
    const [tasksRes, notesRes, journalRes, habitsRes, predRes, statsRes] = await Promise.all([
      window.apiClient.get('/tasks'),
      window.apiClient.get('/notes'),
      window.apiClient.get('/journal'),
      window.apiClient.get('/habits'),
      window.apiClient.get('/ai/predictions'),
      window.apiClient.get('/analytics/overview')
    ]);

    this.setState({
      tasks: tasksRes.tasks || this.state.tasks,
      notes: notesRes.notes || this.state.notes,
      journal: journalRes.journal || this.state.journal,
      habits: habitsRes.habits || this.state.habits,
      predictions: predRes.predictions || this.state.predictions,
      user: { ...this.state.user, ...(statsRes.stats || {}) }
    });
  }
}

window.store = new Store();
