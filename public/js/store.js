/**
 * PLANIX REACTIVE STORE
 * Production-Ready State Management with Real API Sync & Local Storage
 */

class Store {
  constructor() {
    this.state = {
      tasks: [],
      notes: [],
      journal: [],
      habits: [],
      routine: [],
      goals: [],
      user: {
        name: 'User',
        xp: 0,
        level: 1,
        levelTitle: 'Focus Starter',
        streak: 0,
        theme: 'dark'
      },
      audioPlayer: {
        isPlaying: false,
        soundType: 'rain',
        volume: 0.5
      },
      currentView: 'dashboard',
      activeNoteId: null,
      isAiDrawerOpen: false,
      isCommandPaletteOpen: false,
      isMobileSidebarOpen: false
    };

    this.listeners = [];
    this.loadLocalCache();
  }

  loadLocalCache() {
    try {
      const cached = localStorage.getItem('planix_v5_state');
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
      localStorage.setItem('planix_v5_state', JSON.stringify({
        tasks: this.state.tasks,
        notes: this.state.notes,
        journal: this.state.journal,
        habits: this.state.habits,
        routine: this.state.routine,
        goals: this.state.goals,
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
    try {
      const [tasksRes, notesRes, journalRes, habitsRes, statsRes] = await Promise.all([
        window.apiClient.get('/tasks'),
        window.apiClient.get('/notes'),
        window.apiClient.get('/journal'),
        window.apiClient.get('/habits'),
        window.apiClient.get('/analytics/overview')
      ]);

      this.setState(prev => ({
        tasks: (tasksRes && tasksRes.tasks) ? tasksRes.tasks : prev.tasks,
        notes: (notesRes && notesRes.notes) ? notesRes.notes : prev.notes,
        journal: (journalRes && journalRes.journal) ? journalRes.journal : prev.journal,
        habits: (habitsRes && habitsRes.habits) ? habitsRes.habits : prev.habits,
        user: { ...prev.user, ...((statsRes && statsRes.stats) || {}) }
      }));
    } catch (e) {
      console.log('Backend sync status:', e);
    }
  }
}

window.store = new Store();
