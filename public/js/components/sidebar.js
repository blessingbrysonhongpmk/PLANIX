/**
 * PLANIX SIDEBAR — Product-Quality Navigation System
 * 6 clean sections: HOME, PLANNING, PRODUCTIVITY, LEARNING, CAREER, PERSONAL
 * Maximum depth: Sidebar → Section → Page (never deeper)
 */

class SidebarComponent {
  render(state) {
    const sections = [
      {
        label: 'Home',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
        ]
      },
      {
        label: 'Planning',
        items: [
          { id: 'goals', label: 'Goals', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
          { id: 'tasks', label: 'Tasks', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', badge: state.tasks.filter(t => !t.completed).length || null },
          { id: 'calendar', label: 'Calendar', icon: 'M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M16 2v4 M8 2v4 M1 10h22' },
        ]
      },
      {
        label: 'Productivity',
        items: [
          { id: 'habits', label: 'Habits', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
          { id: 'study', label: 'Focus Mode', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2' },
          { id: 'projects', label: 'Projects', icon: 'M2 7l10-5 10 5-10 5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5' },
          { id: 'routine', label: 'Routine', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 6v6l4 2' },
        ]
      },
      {
        label: 'Learning',
        items: [
          { id: 'learning', label: 'Learning Hub', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
          { id: 'coding', label: 'Coding Tracker', icon: 'M16 18l6-6-6-6 M8 6l-6 6 6 6' },
          { id: 'engineering', label: 'Engineering Hub', icon: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5' },
        ]
      },
      {
        label: 'Career',
        items: [
          { id: 'placement', label: 'Placements', icon: 'M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
          { id: 'devworkspace', label: 'Dev Workspace', icon: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' },
          { id: 'resources', label: 'Resources', icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' },
        ]
      },
      {
        label: 'Personal',
        items: [
          { id: 'analytics', label: 'Analytics', icon: 'M18 20V10 M12 20V4 M6 20v-6' },
          { id: 'journal', label: 'Journal', icon: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' },
          { id: 'notes', label: 'Notes', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8' },
        ]
      },
    ];

    const isMobileOpen = state.isMobileSidebarOpen;

    return `
      <div class="sidebar-backdrop ${isMobileOpen ? 'open' : ''}" onclick="window.store.setState({ isMobileSidebarOpen: false })"></div>
      <aside class="sidebar ${isMobileOpen ? 'mobile-open' : ''}">

        <!-- Brand -->
        <div class="sidebar-header">
          <a href="#" class="brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard', isMobileSidebarOpen: false })">
            <div class="brand-emblem">P</div>
            <div class="brand-text-lg"><span class="word-plan">PLAN</span><span class="word-ix">IX</span></div>
          </a>
          <button class="btn btn-icon sidebar-mobile-close" onclick="window.store.setState({ isMobileSidebarOpen: false })" aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          ${sections.map(section => `
            <div class="nav-section-label">${section.label}</div>
            ${section.items.map(item => `
              <a class="nav-item ${state.currentView === item.id ? 'active' : ''}"
                 onclick="window.store.setState({ currentView: '${item.id}', isMobileSidebarOpen: false })"
                 tabindex="0"
                 role="button"
                 onkeydown="if(event.key==='Enter') this.click()">
                <span class="nav-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${item.icon}"/></svg>
                </span>
                <span class="nav-label">${item.label}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
              </a>
            `).join('')}
          `).join('')}
        </nav>

        <!-- User Footer -->
        <div class="sidebar-footer" onclick="window.store.setState({ isSettingsModalOpen: true })" tabindex="0" role="button" onkeydown="if(event.key==='Enter') this.click()">
          <div class="avatar">${(state.user.name || 'A').charAt(0)}</div>
          <div class="user-info">
            <div class="user-name">${state.user.name || 'User'}</div>
            <div style="font-size: 11px; color: var(--accent-primary); font-weight: 600;">Level ${state.user.level || 1}</div>
          </div>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="flex-shrink:0"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </div>
      </aside>
    `;
  }
}

window.sidebarComponent = new SidebarComponent();
