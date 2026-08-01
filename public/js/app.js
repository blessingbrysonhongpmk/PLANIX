/**
 * PLANIX 4.0 MAIN SPA APPLICATION ROUTER
 * Timeless Minimalist Architecture
 */

class App {
  constructor() {
    this.init();
  }

  async init() {
    // 1. Subscribe store to view updates
    window.store.subscribe((state) => this.render(state));

    // 2. Register global hotkeys (Cmd+K / Ctrl+K)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.store.setState({ isCommandPaletteOpen: !window.store.state.isCommandPaletteOpen });
      }
    });

    // 3. Initial data fetch from server
    await window.store.fetchAll();
    this.render(window.store.state);
  }

  render(state) {
    const root = document.getElementById('app-root');
    if (!root) return;

    // Render Minimal Workspace Mode with Floating Sidebar & Topbar
    root.innerHTML = `
      <div class="app-container">
        <!-- Floating Collapsible Sidebar -->
        ${window.sidebarComponent.render(state)}

        <!-- Main Content Area -->
        <main class="main-content">
          <!-- Topbar Header -->
          <header class="topbar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <button class="btn btn-icon topbar-hamburger" onclick="window.store.setState({ isMobileSidebarOpen: !window.store.state.isMobileSidebarOpen })" aria-label="Open Navigation">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              
              <a href="#" class="mobile-brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard' })">
                <span class="brand-emblem" style="width: 28px; height: 28px; font-size: 14px;">P</span>
                <span class="brand-text-lg" style="font-size: 20px;">
                  <span class="word-plan">PLAN</span><span class="word-ix">IX</span>
                </span>
              </a>
            </div>

            <div class="search-trigger" onclick="window.store.setState({ isCommandPaletteOpen: true })">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span class="search-label">Search PLANIX...</span>
              <span class="kbd-shortcut">⌘K</span>
            </div>

            <div class="topbar-actions" style="display: flex; gap: 10px; align-items: center;">
              <button class="btn btn-secondary btn-ai-toggle" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span class="btn-ai-label">AI Assistant</span>
              </button>
            </div>
          </header>

          <!-- Dynamic Active View -->
          <div class="content-wrapper">
            ${this.renderActiveView(state)}
          </div>
        </main>

        <!-- Floating Mobile Bottom Navigation Bar -->
        <nav class="mobile-bottom-nav">
          <a class="mobile-nav-item ${state.currentView === 'dashboard' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'dashboard' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'tasks' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'tasks' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            <span>Tasks</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'notes' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'notes' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span>Notes</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'habits' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'habits' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <span>Habits</span>
          </a>
          <a class="mobile-nav-item ${state.isAiDrawerOpen ? 'active' : ''}" onclick="window.store.setState({ isAiDrawerOpen: !window.store.state.isAiDrawerOpen })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <span>AI</span>
          </a>
          <a class="mobile-nav-item ${state.isMobileSidebarOpen ? 'active' : ''}" onclick="window.store.setState({ isMobileSidebarOpen: !window.store.state.isMobileSidebarOpen })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Menu</span>
          </a>
        </nav>

        <!-- Command Palette Modal -->
        ${window.commandPaletteComponent ? window.commandPaletteComponent.render(state) : ''}

        <!-- Assistant Drawer -->
        ${window.aiDrawerComponent ? window.aiDrawerComponent.render(state) : ''}
      </div>
    `;
  }

  renderActiveView(state) {
    switch (state.currentView) {
      case 'dashboard': return window.dashboardView ? window.dashboardView.render(state) : '';
      case 'brain': return window.secondBrainView ? window.secondBrainView.render(state) : '';
      case 'notes': return window.notesView ? window.notesView.render(state) : '';
      case 'tasks': return window.tasksView ? window.tasksView.render(state) : '';
      case 'gps': return window.lifeGpsView ? window.lifeGpsView.render(state) : '';
      case 'timeline': return window.lifeTimelineView ? window.lifeTimelineView.render(state) : '';
      case 'routine': return window.routineView ? window.routineView.render(state) : '';
      case 'predictions': return window.predictionsView ? window.predictionsView.render(state) : '';
      case 'journal': return window.journalView ? window.journalView.render(state) : '';
      case 'study': return window.studyView ? window.studyView.render(state) : '';
      case 'habits': return window.habitsView ? window.habitsView.render(state) : '';
      case 'calendar': return window.calendarView ? window.calendarView.render(state) : '';
      case 'analytics': return window.analyticsView ? window.analyticsView.render(state) : '';
      case 'gamification': return window.gamificationView ? window.gamificationView.render(state) : '';
      default: return window.dashboardView ? window.dashboardView.render(state) : '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
