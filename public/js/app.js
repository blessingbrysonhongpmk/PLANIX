/**
 * PLANIX MAIN SPA APPLICATION ROUTER
 * Crimson Red & Obsidian Dark Theme Router for 16 Specialized Engineering Views
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
        <!-- Mobile Compact Top Header Bar -->
        <header class="mobile-header-bar">
          <a href="#" class="mobile-brand" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard' })">
            <div class="mobile-brand-emblem">P</div>
            <div class="mobile-brand-title"><span style="color:#FFF;">PLAN</span><span style="color:#E50914;">IX</span></div>
          </a>
          <div class="mobile-header-actions">
            <button class="mobile-touch-icon" onclick="window.store.setState({ isCommandPaletteOpen: true })" aria-label="Search">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button class="mobile-touch-icon" onclick="window.store.setState({ isAiDrawerOpen: true })" aria-label="AI Assistant">
              <span style="font-size: 18px;">🤖</span>
            </button>
            <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #E50914, #B91C2D); color: #FFF; font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="window.store.setState({ isSettingsModalOpen: true })">
              B
            </div>
          </div>
        </header>

        <!-- Floating Collapsible Sidebar -->
        ${window.sidebarComponent ? window.sidebarComponent.render(state) : ''}

        <!-- Main Content Area -->
        <main class="main-content">
          <!-- Topbar Header -->
          <header class="topbar" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; border-bottom: 1px solid var(--border-subtle); background: var(--bg-body);">
            <!-- Mobile Menu & Brand -->
            <div style="display: flex; align-items: center; gap: 10px;">
              <button class="btn btn-icon topbar-hamburger" onclick="window.store.setState({ isMobileSidebarOpen: !window.store.state.isMobileSidebarOpen })" aria-label="Open Navigation">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
              
              <a href="#" class="mobile-brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard' })">
                <span class="brand-emblem" style="width: 28px; height: 28px; font-size: 14px; background: #E50914; border-radius: 6px;">P</span>
                <span class="brand-text-lg" style="font-size: 20px;">
                  <span style="color: #FFF;">PLAN</span><span style="color: #E50914;">IX</span>
                </span>
              </a>
            </div>

            <!-- Search Bar -->
            <div class="search-trigger" style="flex: 1; max-width: 450px; background: #161619; border: 1px solid #2A2A32; border-radius: 6px; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: var(--text-tertiary); margin: 0 24px;" onclick="window.store.setState({ isCommandPaletteOpen: true })">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>Search tasks, notes, goals...</span>
              </div>
              <span class="kbd-shortcut" style="background: #222228; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; color: var(--text-secondary);">⌘K</span>
            </div>

            <!-- Right Actions -->
            <div class="topbar-actions" style="display: flex; gap: 16px; align-items: center;">
              <!-- Add Button -->
              <button class="btn btn-primary" style="width: 32px; height: 32px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 400; background: #E50914;" onclick="window.modalComponent.open('task')">
                +
              </button>

              <!-- Notifications -->
              <div style="position: relative; cursor: pointer; color: var(--text-secondary);" title="Notifications">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span style="position: absolute; top: -4px; right: -4px; background: #E50914; color: #FFF; font-size: 9px; font-weight: 800; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; outline: 2px solid var(--bg-body);">3</span>
              </div>

              <!-- Analytics -->
              <div style="cursor: pointer; color: var(--text-secondary);" title="Analytics" onclick="window.store.setState({ currentView: 'analytics' })">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>

              <!-- XP/Sparkles -->
              <div style="cursor: pointer; color: #FFD700; display: flex; align-items: center; gap: 4px;" title="XP">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>

              <!-- AI Assistant Button -->
              <button class="btn" style="background: transparent; border: 1px solid rgba(229, 9, 20, 0.4); border-radius: 20px; padding: 6px 14px; color: #FFF; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px;" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <span style="color: #E50914;">🤖</span> AI Assistant
              </button>
            </div>
          </header>

          <!-- Dynamic Active View -->
          <div class="content-wrapper">
            ${this.renderActiveView(state)}
          </div>
        </main>

        <!-- Floating Action Button (FAB) -->
        ${window.fabComponent ? window.fabComponent.render(state) : ''}

        <!-- Native Mobile Bottom Navigation Bar -->
        <nav class="mobile-bottom-nav">
          <a class="mobile-nav-tab ${state.currentView === 'dashboard' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'dashboard' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>Home</span>
          </a>

          <a class="mobile-nav-tab ${state.currentView === 'goals' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'goals' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Goals</span>
          </a>

          <!-- Elevated Center FAB Button -->
          <button class="mobile-fab-center" onclick="window.mobileBottomSheet.open('actions')" aria-label="Create item">
            +
          </button>

          <a class="mobile-nav-tab ${state.currentView === 'tasks' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'tasks' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline></svg>
            <span>Tasks</span>
          </a>

          <a class="mobile-nav-tab ${state.currentView === 'calendar' ? 'active' : ''}" onclick="window.store.setState({ currentView: 'calendar' })">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Calendar</span>
          </a>
        </nav>

        <!-- Command Palette Modal -->
        ${window.commandPaletteComponent ? window.commandPaletteComponent.render(state) : ''}

        <!-- Universal Modal Dialog & Bottom Sheet Engine -->
        ${window.modalComponent ? window.modalComponent.render(state) : ''}

        <!-- Assistant Drawer -->
        ${window.aiDrawerComponent ? window.aiDrawerComponent.render(state) : ''}

        <!-- Document Viewer Modal -->
        ${window.documentViewerModal ? window.documentViewerModal.render() : ''}

        <!-- AI Analysis Modal -->
        ${window.analysisModal ? window.analysisModal.render() : ''}

        <!-- Mobile Bottom Sheet Drawer -->
        ${window.mobileBottomSheet ? window.mobileBottomSheet.render(state) : ''}

        <!-- Settings & Data Backup Modal -->
        ${window.settingsModalComponent ? window.settingsModalComponent.render(state) : ''}

        <!-- Toast Container -->
        <div id="toast-container" style="position: fixed; bottom: 84px; right: 24px; z-index: 300; display: flex; flex-direction: column; gap: 8px;"></div>
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
      case 'academic': return window.academicView ? window.academicView.render(state) : '';
      case 'intelligence': return window.intelligenceView ? window.intelligenceView.render(state) : '';
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
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'danger' ? '⚠' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300); // Wait for exit animation
  }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
