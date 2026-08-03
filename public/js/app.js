/**
 * PLANIX MAIN SPA APPLICATION ROUTER
 * Router for 16 Specialized Engineering & Productivity Views
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

    // 3. Listen for PWA Install Prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
    });

    // 4. Initial data fetch from backend server
    await window.store.fetchAll();
    this.render(window.store.state);
  }

  render(state) {
    const root = document.getElementById('app-root');
    if (!root) return;

    root.innerHTML = `
      <div class="app-container">
        <!-- Floating Collapsible Sidebar -->
        ${window.sidebarComponent ? window.sidebarComponent.render(state) : ''}

        <!-- Main Content Area -->
        <main class="main-content">
          <!-- Topbar Header -->
          <header class="topbar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <button class="btn btn-icon topbar-hamburger" onclick="window.store.setState({ isMobileSidebarOpen: !window.store.state.isMobileSidebarOpen })" aria-label="Open Navigation">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              
              <a href="#" class="mobile-brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard' })">
                <span class="brand-emblem" style="width: 28px; height: 28px; font-size: 14px; background: linear-gradient(135deg, #3B82F6, #8B5CF6);">P</span>
                <span class="brand-text-lg" style="font-size: 20px;">
                  <span style="color: #FFF;">PLAN</span><span style="color: #3B82F6;">IX</span>
                </span>
              </a>
            </div>

            <div class="search-trigger" onclick="window.store.setState({ isCommandPaletteOpen: true })">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span class="search-label">Search tasks, notes, coding topics, or commands...</span>
              <span class="kbd-shortcut">⌘K</span>
            </div>

            <div class="topbar-actions" style="display: flex; gap: 10px; align-items: center;">
              <button class="btn btn-secondary" style="background: #18181B; border-color: rgba(255,255,255,0.12); color: white;" title="Settings & Data Ownership" onclick="window.store.setState({ isSettingsModalOpen: true })">
                <span>⚙️</span>
              </button>

              <button class="btn btn-secondary btn-ai-toggle" style="background: #18181B; border-color: rgba(255,255,255,0.12); color: white;" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <span style="margin-right: 4px;">🤖</span>
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
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>Home</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'tasks' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'tasks' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline></svg>
            <span>Tasks</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'engineering' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'engineering' })">
            <span style="font-size: 18px;">🎓</span>
            <span>Academic</span>
          </a>
          <a class="mobile-nav-item ${state.currentView === 'study' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'study' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path></svg>
            <span>Focus</span>
          </a>
          <a class="mobile-nav-item ${state.isAiDrawerOpen ? 'active' : ''}" onclick="window.store.setState({ isAiDrawerOpen: !window.store.state.isAiDrawerOpen })">
            <span style="font-size: 18px;">🤖</span>
            <span>AI</span>
          </a>
        </nav>

        <!-- Command Palette Modal -->
        ${window.commandPaletteComponent ? window.commandPaletteComponent.render(state) : ''}

        <!-- Assistant Drawer -->
        ${window.aiDrawerComponent ? window.aiDrawerComponent.render(state) : ''}

        <!-- Settings & Data Backup Modal -->
        ${window.settingsModalComponent ? window.settingsModalComponent.render(state) : ''}

        <!-- Toast Container -->
        <div id="toast-container" style="position: fixed; bottom: 80px; right: 24px; z-index: 300; display: flex; flex-direction: column; gap: 8px;"></div>
      </div>
    `;
  }

  renderActiveView(state) {
    switch (state.currentView) {
      case 'dashboard': return window.dashboardView ? window.dashboardView.render(state) : '';
      case 'goals': return window.goalsView ? window.goalsView.render(state) : '';
      case 'tasks': return window.tasksView ? window.tasksView.render(state) : '';
      case 'habits': return window.habitsView ? window.habitsView.render(state) : '';
      case 'projects': return window.projectsView ? window.projectsView.render(state) : '';
      case 'notes': return window.notesView ? window.notesView.render(state) : '';
      case 'calendar': return window.calendarView ? window.calendarView.render(state) : '';
      case 'engineering': return window.engineeringHubView ? window.engineeringHubView.render(state) : '';
      case 'placement': return window.placementHubView ? window.placementHubView.render(state) : '';
      case 'coding': return window.codingHubView ? window.codingHubView.render(state) : '';
      case 'learning': return window.learningHubView ? window.learningHubView.render(state) : '';
      case 'resources': return window.resourceLibraryView ? window.resourceLibraryView.render(state) : '';
      case 'routine': return window.routineView ? window.routineView.render(state) : '';
      case 'study': return window.studyView ? window.studyView.render(state) : '';
      case 'devworkspace': return window.devWorkspaceView ? window.devWorkspaceView.render(state) : '';
      case 'analytics': return window.analyticsView ? window.analyticsView.render(state) : '';
      default: return window.dashboardView ? window.dashboardView.render(state) : '';
    }
  }
}

// Global Toast System
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #18181B;
    color: white;
    border: 1px solid ${type === 'success' ? '#10B981' : type === 'danger' ? '#EF4444' : '#3B82F6'};
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    animation: fadeIn 0.2s ease-out;
  `;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
