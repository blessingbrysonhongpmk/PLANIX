/**
 * PLANIX REACTIVE STORE
 * State Management & Data Layer for Engineering Students & Builders
 * Decoupled & Future AI-Plugin Ready Architecture
 */

class Store {
  constructor() {
    this.state = {
      // Core Productivity Models
      tasks: [],
      notes: [],
      journal: [],
      habits: [],
      routine: [],
      goals: [],

      // Engineering & Academic Hub Models
      projects: [],
      attendance: [
        { id: 'att1', subject: 'Data Structures & Algorithms', attended: 28, total: 32, target: 75 },
        { id: 'att2', subject: 'Database Management Systems', attended: 24, total: 30, target: 75 },
        { id: 'att3', subject: 'Operating Systems & System Programming', attended: 22, total: 28, target: 75 },
        { id: 'att4', subject: 'Machine Learning & Neural Networks', attended: 26, total: 30, target: 75 }
      ],
      placements: [
        { id: 'pl1', company: 'Microsoft', role: 'Software Development Engineer', status: 'interview', date: '2026-09-15', link: 'https://careers.microsoft.com' },
        { id: 'pl2', company: 'Google', role: 'AI / Software Engineering Intern', status: 'oa', date: '2026-08-20', link: 'https://careers.google.com' }
      ],
      coding: {
        leetcodeSolved: 142,
        codeforcesRating: 1450,
        githubStreak: 14,
        dsaTopics: [
          { name: 'Array & Two Pointers', completed: true },
          { name: 'Sliding Window', completed: true },
          { name: 'Binary Search & Trees', completed: true },
          { name: 'Dynamic Programming', completed: false },
          { name: 'Graph & BFS/DFS', completed: false }
        ]
      },
      learning: [
        { id: 'sk1', skill: 'Python & PyTorch', level: 'Intermediate', progress: 80, category: 'AI/ML' },
        { id: 'sk2', skill: 'React & Next.js', level: 'Advanced', progress: 90, category: 'Web' },
        { id: 'sk3', skill: 'System Design & Distributed Systems', level: 'Beginner', progress: 40, category: 'Backend' }
      ],
      resources: [
        { id: 'res1', title: 'PyTorch Official Documentation & Tutorials', type: 'Docs', url: 'https://pytorch.org/docs', tag: 'AI' },
        { id: 'res2', title: 'NeetCode 150 DSA Roadmap', type: 'Guide', url: 'https://neetcode.io', tag: 'DSA' }
      ],
      snippets: [
        { id: 'snp1', title: 'Binary Search Template (Python)', code: 'def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1', language: 'python' }
      ],

      // User Profile & System
      user: {
        name: 'Alex',
        xp: 2150,
        level: 5,
        levelTitle: 'Senior Systems Architect',
        streak: 12,
        theme: 'dark'
      },
      audioPlayer: {
        isPlaying: false,
        soundType: 'rain',
        volume: 0.5
      },

      // Navigation & Modals
      currentView: 'dashboard',
      activeNoteId: null,
      isAiDrawerOpen: false,
      isCommandPaletteOpen: false,
      isMobileSidebarOpen: false,
      isSettingsModalOpen: false,

      // Future AI Plugin Architecture Hooks (Decoupled interface)
      aiHooks: {
        isAiActive: true,
        aiMemoryEnabled: true,
        aiGoalPlannerReady: true,
        aiTaskGeneratorReady: true,
        aiAnalyticsReady: true
      }
    };

    this.listeners = [];
    this.loadLocalCache();
  }

  loadLocalCache() {
    try {
      const cached = localStorage.getItem('planix_v6_state');
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
      localStorage.setItem('planix_v6_state', JSON.stringify({
        tasks: this.state.tasks,
        notes: this.state.notes,
        journal: this.state.journal,
        habits: this.state.habits,
        routine: this.state.routine,
        goals: this.state.goals,
        projects: this.state.projects,
        attendance: this.state.attendance,
        placements: this.state.placements,
        coding: this.state.coding,
        learning: this.state.learning,
        resources: this.state.resources,
        snippets: this.state.snippets,
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
      console.log('Backend API sync status:', e);
    }
  }
}

window.store = new Store();
