/**
 * PLANIX PRODUCTION STORE — Reactive State Engine
 * Zero dummy data. All state sourced from real authenticated backend API.
 */

class Store {
  constructor() {
    this.state = {
      // Auth & User Session
      isAuthenticated: false,
      user: null,
      authToken: null,

      // Real Data Entities (empty until loaded from backend)
      tasks: [],
      goals: [],
      habits: [],
      documents: [],
      calendarEvents: [],
      projects: [],
      notes: [],
      journalEntries: [],
      routineBlocks: [],
      attendance: [],
      subjects: [],
      exams: [],
      assignments: [],
      flashcards: [],
      resources: [],
      devSnippets: [],

      // UI Navigation & Modal State
      currentView: 'dashboard',
      activeModal: null,
      activeModalData: {},
      isAiDrawerOpen: false,
      isCommandPaletteOpen: false,
      isMobileSidebarOpen: false,
      isSettingsModalOpen: false
    };

    this.listeners = [];
    this.restoreSession();
  }

  // --- Authentication Methods ---
  async restoreSession() {
    const token = localStorage.getItem('planix_token');
    if (!token) {
      this.state.isAuthenticated = false;
      this.state.user = null;
      return;
    }

    this.state.authToken = token;

    try {
      const res = await window.apiClient.get('/auth/me');
      if (res.success && res.user) {
        this.state.isAuthenticated = true;
        this.state.user = res.user;
        this.state.authToken = token;
        await this.fetchAll();
      } else {
        this.state.isAuthenticated = false;
        this.state.user = null;
        localStorage.removeItem('planix_token');
      }
    } catch {
      this.state.isAuthenticated = false;
      this.state.user = null;
    }

    this.notify();
  }

  async login(email, password) {
    try {
      const res = await window.apiClient.post('/auth/login', { email, password });
      if (res.success && res.token) {
        localStorage.setItem('planix_token', res.token);
        this.setState({
          isAuthenticated: true,
          user: res.user,
          authToken: res.token
        });
        await this.fetchAll();
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || 'Login failed' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async register(data) {
    try {
      const res = await window.apiClient.post('/auth/register', data);
      if (res.success && res.token) {
        localStorage.setItem('planix_token', res.token);
        this.setState({
          isAuthenticated: true,
          user: res.user,
          authToken: res.token
        });
        await this.fetchAll();
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || 'Registration failed' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  logout() {
    localStorage.removeItem('planix_token');
    this.setState({
      isAuthenticated: false,
      user: null,
      authToken: null,
      tasks: [],
      goals: [],
      habits: [],
      documents: [],
      calendarEvents: [],
      projects: [],
      notes: [],
      journalEntries: [],
      routineBlocks: [],
      attendance: [],
      subjects: [],
      exams: [],
      assignments: [],
      flashcards: [],
      currentView: 'dashboard'
    });
    if (window.showToast) window.showToast('Logged out successfully.', 'info');
  }

  // --- Data Loading ---
  async fetchAll() {
    try {
      const [tasksRes, notesRes, habitsRes, goalsRes, docsRes, academicsRes] = await Promise.all([
        window.apiClient.get('/tasks'),
        window.apiClient.get('/notes'),
        window.apiClient.get('/habits'),
        window.apiClient.get('/goals'),
        window.apiClient.get('/documents'),
        window.apiClient.get('/academics/overview')
      ]);

      this.setState({
        tasks: tasksRes?.tasks || [],
        notes: notesRes?.notes || [],
        habits: habitsRes?.habits || [],
        goals: goalsRes?.goals || [],
        documents: docsRes?.documents || [],
        subjects: academicsRes?.subjects || [],
        exams: academicsRes?.exams || [],
        assignments: academicsRes?.assignments || [],
        attendance: academicsRes?.attendance || [],
        routineBlocks: academicsRes?.routineBlocks || [],
        calendarEvents: academicsRes?.calendarEvents || []
      });
    } catch (e) {
      console.log('Backend API sync status:', e);
    }
  }

  // --- Reactive State Management ---
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
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

  // --- Utility Helpers ---
  saveLocalCache() {
    // No-op: all persistence is now via backend API
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  }

  getUserDisplayName() {
    return this.state.user?.name || 'User';
  }

  getUserInitial() {
    const name = this.state.user?.name || 'U';
    return name.charAt(0).toUpperCase();
  }
}

window.store = new Store();
