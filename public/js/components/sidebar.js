/**
 * PLANIX 4.0 FLOATING SIDEBAR COMPONENT
 * Clean, SVG icons, strict design system implementation
 */

class SidebarComponent {
  render(state) {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
      { id: 'brain', label: 'Second Brain', icon: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>' },
      { id: 'notes', label: 'Notes', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', badge: state.notes.length || null },
      { id: 'tasks', label: 'Tasks', icon: '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>' },
      { id: 'routine', label: 'Routine', icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' },
      { id: 'calendar', label: 'Calendar', icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' },
      { id: 'journal', label: 'Journal', icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>' },
      { id: 'study', label: 'Study Hub', icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>' },
      { id: 'habits', label: 'Habits', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>' },
      { id: 'timeline', label: 'Life Timeline', icon: '<line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="18" y1="20" x2="18" y2="10"></line>' },
      { id: 'gps', label: 'Life GPS', icon: '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line>' },
    ];

    const isMobileOpen = state.isMobileSidebarOpen;

    return `
      <div class="sidebar-backdrop ${isMobileOpen ? 'open' : ''}" onclick="window.store.setState({ isMobileSidebarOpen: false })"></div>
      <aside class="sidebar ${isMobileOpen ? 'mobile-open' : ''}">
        <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="#" class="brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard', isMobileSidebarOpen: false })">
            <div class="brand-emblem">P</div>
            <div class="brand-text-lg">
              <span class="word-plan">PLAN</span><span class="word-ix">IX</span>
            </div>
          </a>
          <button class="btn btn-icon sidebar-mobile-close" onclick="window.store.setState({ isMobileSidebarOpen: false })" aria-label="Close navigation">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-title text-helper" style="padding: 0 12px 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Workspace</div>
          ${navItems.map(item => `
            <a class="nav-item ${state.currentView === item.id ? 'active' : ''}" 
               onclick="window.store.setState({ currentView: '${item.id}', isMobileSidebarOpen: false })">
              <span class="nav-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
              </span>
              <span class="nav-label">${item.label}</span>
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        </nav>

        <div class="sidebar-footer">
          <div class="avatar">${state.user.name ? state.user.name.charAt(0) : 'U'}</div>
          <div class="user-info">
            <div class="user-name">${state.user.name || 'User'}</div>
            <div class="text-helper" style="margin-top: 2px;">Settings</div>
          </div>
        </div>
      </aside>
    `;
  }
}

window.sidebarComponent = new SidebarComponent();
