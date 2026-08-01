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
            <div class="search-trigger" onclick="window.store.setState({ isCommandPaletteOpen: true })">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Search PLANIX...</span>
              <span class="kbd-shortcut">⌘K</span>
            </div>

            <div class="topbar-actions" style="display: flex; gap: 12px; align-items: center;">
              <button class="btn btn-secondary" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                AI Assistant
              </button>
            </div>
          </header>

          <!-- Dynamic Active View -->
          <div class="content-wrapper">
            ${this.renderActiveView(state)}
          </div>
        </main>

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
