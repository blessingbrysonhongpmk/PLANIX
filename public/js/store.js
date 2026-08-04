/**
 * PLANIX REACTIVE STORE — V5 Mockup State Engine
 */

class Store {
  constructor() {
    this.state = {
      // User Profile & Systems
      user: {
        name: 'Blessing Bryson',
        role: 'AI & DS • Sem 5',
        xp: 3250,
        level: 8,
        streak: 12,
        theme: 'dark'
      },

      // Tasks Data (8 items, 3 completed)
      tasks: [
        { id: 't1', text: 'Fix Authentication Bug', priority: 'high', label: 'Campus Sentinel', est: '1h 30m', completed: false },
        { id: 't2', text: 'Study System Design', priority: 'medium', label: 'SDE Prep', est: '1h 00m', completed: false },
        { id: 't3', text: 'ML Model Training', priority: 'low', label: 'AI Project', est: '2h 00m', completed: false },
        { id: 't4', text: 'Write API Documentation', priority: 'medium', label: 'Campus Sentinel', est: '45m', completed: false },
        { id: 't5', text: 'DBMS Lab Record', priority: 'low', label: 'College', est: '1h 00m', completed: false },
        { id: 't6', text: 'LeetCode Daily Challenge', priority: 'medium', label: 'Coding', est: '30m', completed: true },
        { id: 't7', text: 'Refactor Database Schema', priority: 'high', label: 'Campus Sentinel', est: '1h 15m', completed: true },
        { id: 't8', text: 'Review PR #42', priority: 'low', label: 'Campus Sentinel', est: '20m', completed: true }
      ],

      // Strategic Goals
      goals: [
        { id: 'g1', title: 'Become AI Engineer', description: 'Master AI, ML, DS, System Design and build impactful projects.', priority: 'high', progress: 72, targetDate: 'Dec 2025', milestones: { completed: 4, total: 6 }, tags: ['Education', 'Career'], status: 'Active' },
        { id: 'g2', title: 'CGPA 9.0+', description: 'Maintain excellent academic performance.', priority: 'medium', progress: 84, targetDate: 'Apr 2026', milestones: { completed: 5, total: 6 }, tags: ['Academics', 'Semester'], status: 'Active' },
        { id: 'g3', title: 'Complete 5 Major Projects', description: 'Build real world projects and strengthen portfolio.', priority: 'low', progress: 40, targetDate: 'Dec 2025', milestones: { completed: 2, total: 5 }, tags: ['Projects', 'Portfolio'], status: 'Active' },
        { id: 'g4', title: 'Get Placed in Microsoft', description: 'Crack placement and join dream company.', priority: 'medium', progress: 25, targetDate: 'Aug 2026', milestones: { completed: 1, total: 4 }, tags: ['Career', 'Placement'], status: 'Active' }
      ],

      // Today's Focus Card Target
      todayFocus: {
        id: 'f1',
        title: 'Build Campus Sentinel – Backend',
        subtitle: 'Smart Campus Safety System',
        priority: 'HIGH PRIORITY',
        progress: 60,
        due: 'Due Tomorrow',
        estimated: '2h 30m estimated'
      },

      // Habits Data (5/6 Completed)
      habits: [
        { id: 'h1', name: 'Solve 2 DSA Problems', streak: 12, completedToday: true, category: 'coding' },
        { id: 'h2', name: 'Read Tech Articles', streak: 12, completedToday: true, category: 'mindset' },
        { id: 'h3', name: 'Workout / Gym', streak: 12, completedToday: true, category: 'health' },
        { id: 'h4', name: 'Code Review', streak: 12, completedToday: true, category: 'coding' },
        { id: 'h5', name: 'Journaling', streak: 12, completedToday: true, category: 'mindset' },
        { id: 'h6', name: 'System Design Study', streak: 11, completedToday: false, category: 'academics' }
      ],

      // Upcoming Calendar Events
      documents: [
        {
          id: 'doc_1',
          title: 'ML_Unit1_Introduction.pdf',
          filename: 'ML_Unit1_Introduction.pdf',
          fileType: 'pdf',
          fileSize: '4.2 MB',
          bytes: 4404019,
          pages: 34,
          subject: 'Machine Learning',
          docType: 'research',
          uploadedAt: 'Yesterday',
          lastOpened: 'Just now',
          isFavorite: true,
          isPinned: true,
          status: 'analyzed',
          analysis: {
            summary: 'Comprehensive introduction to Machine Learning fundamentals including Supervised, Unsupervised, and Reinforcement Learning paradigms, bias-variance tradeoff, and evaluation metrics.',
            topics: ['Supervised vs Unsupervised', 'Bias-Variance Tradeoff', 'Gradient Descent', 'Overfitting & Regularization'],
            definitions: [
              { term: 'Overfitting', def: 'When a model learns training data noise rather than general patterns.' },
              { term: 'Gradient Descent', def: 'Optimization algorithm used to minimize loss function.' }
            ],
            flashcards: [
              { q: 'What is the main goal of Supervised Learning?', a: 'To map input features to a target output label based on labeled training data.' },
              { q: 'What causes high variance in ML models?', a: 'Overly complex models fitting noise in the training dataset.' }
            ],
            mcqs: [
              { q: 'Which algorithm is typically used for classification?', options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'], correct: 1 }
            ]
          }
        },
        {
          id: 'doc_2',
          title: 'DSA_Notes_2025.pdf',
          filename: 'DSA_Notes_2025.pdf',
          fileType: 'pdf',
          fileSize: '2.8 MB',
          bytes: 2936012,
          pages: 28,
          subject: 'Data Structures',
          docType: 'question_paper',
          uploadedAt: '2 days ago',
          lastOpened: 'Yesterday',
          isFavorite: false,
          isPinned: true,
          status: 'analyzed',
          analysis: {
            summary: 'Comprehensive notes covering Tree Traversals, Graph Algorithms (BFS/DFS, Dijkstra), and Dynamic Programming patterns.',
            topics: ['Binary Search Trees', 'Graph Traversal', 'Dynamic Programming', 'Heaps & Priority Queues']
          }
        },
        {
          id: 'doc_3',
          title: 'Python_Lab_Manual.pdf',
          filename: 'Python_Lab_Manual.pdf',
          fileType: 'pdf',
          fileSize: '6.1 MB',
          bytes: 6396313,
          pages: 45,
          subject: 'Python Programming',
          docType: 'assignment',
          uploadedAt: '3 days ago',
          lastOpened: '3 days ago',
          isFavorite: true,
          isPinned: false,
          status: 'analyzed',
          analysis: {
            summary: 'Lab manual with 12 practical programs ranging from basic syntax to NumPy arrays, Pandas DataFrames, and Matplotlib plotting.'
          }
        },
        {
          id: 'doc_4',
          title: 'DBMS_Notes.pdf',
          filename: 'DBMS_Notes.pdf',
          fileType: 'pdf',
          fileSize: '3.5 MB',
          bytes: 3670016,
          pages: 32,
          subject: 'Database Systems',
          docType: 'general',
          uploadedAt: '5 days ago',
          lastOpened: '4 days ago',
          isFavorite: false,
          isPinned: false,
          status: 'ready'
        }
      ],

      calendarEvents: [
        { id: 'ev1', title: 'Internal Exam – DSA', date: '2025-08-06', type: 'urgent' },
        { id: 'ev2', title: 'AI Seminar Presentation', date: '2025-08-08', type: 'urgent' },
        { id: 'ev3', title: 'Database Lab Submission', date: '2025-08-10', type: 'work' },
        { id: 'ev4', title: 'Department Meeting', date: '2025-08-12', type: 'work' }
      ],

      // Projects
      projects: [
        { id: 'p1', title: 'Campus Sentinel Safety App', description: 'Smart AI Campus Safety & Alert Dispatch System', techStack: ['Python', 'FastAPI', 'React', 'PyTorch'], progress: 60, github: 'https://github.com/blessing/campus-sentinel' },
        { id: 'p2', title: 'AI Autonomous Code Reviewer', description: 'LLM Agent that automates PR reviews and security linting', techStack: ['Python', 'LangChain', 'Node.js'], progress: 85, github: 'https://github.com/blessing/ai-code-reviewer' }
      ],

      // Engineering Hub Attendance
      attendance: [
        { id: 'att1', subject: 'Data Structures & Algorithms', attended: 28, total: 32, target: 75 },
        { id: 'att2', subject: 'Database Management Systems', attended: 24, total: 30, target: 75 },
        { id: 'att3', subject: 'Operating Systems & System Programming', attended: 22, total: 28, target: 75 },
        { id: 'att4', subject: 'Machine Learning & Neural Networks', attended: 26, total: 30, target: 75 }
      ],

      // Placements
      placements: [
        { id: 'pl1', company: 'Microsoft', role: 'Software Development Engineer', status: 'interview', date: '2026-09-15', link: 'https://careers.microsoft.com' },
        { id: 'pl2', company: 'Google', role: 'AI / Software Engineering Intern', status: 'oa', date: '2026-08-20', link: 'https://careers.google.com' }
      ],

      // Coding Stats
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

      notes: [
        { 
          id: 'n1', 
          title: 'AI Roadmap 2025', 
          content: '1. Foundation (May – July 2025)\n- [x] Python Advanced\n- [x] Data Structures & Algorithms\n- [ ] Mathematics for ML\n- [ ] SQL & Databases\n\n2. Machine Learning (August – October 2025)\n- [ ] Supervised Learning\n- [ ] Unsupervised Learning\n- [ ] Deep Learning Basics\n- [ ] Hands-on Mini Projects\n\n3. Projects (November – January 2026)\n- [ ] End-to-End ML Project\n- [ ] Deploy ML Model\n- [ ] Build Portfolio', 
          folder: 'Study Notes',
          tags: ['ai', 'roadmap', 'career', 'learning'],
          isPinned: true,
          readTime: '5 min read',
          wordCount: 532,
          charCount: 3412,
          updatedAt: 'Just now',
          createdAt: 'May 4, 2025',
          description: 'Complete roadmap to become AI Engineer by 2025...'
        },
        { 
          id: 'n2', 
          title: 'Campus Sentinel – Ideas', 
          content: 'Core modules and smart features to implement for the safety application...',
          folder: 'Projects',
          tags: ['backend', 'design'],
          isPinned: true,
          readTime: '3 min read',
          wordCount: 210,
          charCount: 1100,
          updatedAt: 'Yesterday',
          createdAt: 'May 1, 2025',
          description: 'Core modules and smart features to implement...'
        },
        { 
          id: 'n3', 
          title: 'Python Important Notes', 
          content: 'List, Dictionaries, Lambda, Decorators, Generators...',
          folder: 'Study Notes',
          tags: ['python', 'code'],
          isPinned: true,
          readTime: '8 min read',
          wordCount: 840,
          charCount: 4500,
          updatedAt: 'May 4',
          createdAt: 'May 4, 2025',
          description: 'List, Dictionaries, Lambda, Decorators, Generators...'
        },
        { 
          id: 'n4', 
          title: 'ML Concepts', 
          content: 'Supervised vs Unsupervised Learning, Classification algorithms...',
          folder: 'Study Notes',
          tags: ['ml', 'theory'],
          isPinned: false,
          readTime: '4 min read',
          wordCount: 410,
          charCount: 2200,
          updatedAt: '2m ago',
          createdAt: 'May 5, 2025',
          description: 'Supervised vs Unsupervised Learning, Classification...'
        }
      ],
      journalEntries: [],
      routineBlocks: [
        { id: 'rb1', time: '07:00', title: 'Morning DSA & Problem Solving', duration: '90m' },
        { id: 'rb2', time: '09:00', title: 'Deep Work: Campus Sentinel Backend', duration: '150m' }
      ],
      resources: [],
      devSnippets: [],

      // Navigation & Modal State
      currentView: 'dashboard',
      activeModal: null,
      activeModalData: {},
      isAiDrawerOpen: false,
      isCommandPaletteOpen: false,
      isMobileSidebarOpen: false,
      isSettingsModalOpen: false
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
        habits: this.state.habits,
        goals: this.state.goals,
        projects: this.state.projects,
        attendance: this.state.attendance,
        placements: this.state.placements,
        coding: this.state.coding,
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
      const [tasksRes, notesRes, habitsRes] = await Promise.all([
        window.apiClient.get('/tasks'),
        window.apiClient.get('/notes'),
        window.apiClient.get('/habits')
      ]);

      this.setState(prev => ({
        tasks: (tasksRes && tasksRes.tasks && tasksRes.tasks.length) ? tasksRes.tasks : prev.tasks,
        notes: (notesRes && notesRes.notes && notesRes.notes.length) ? notesRes.notes : prev.notes,
        habits: (habitsRes && habitsRes.habits && habitsRes.habits.length) ? habitsRes.habits : prev.habits
      }));
    } catch (e) {
      console.log('Backend API sync status:', e);
    }
  }
}

window.store = new Store();
