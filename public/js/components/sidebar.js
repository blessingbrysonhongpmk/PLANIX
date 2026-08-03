/**
 * PLANIX FLOATING SIDEBAR COMPONENT
 * Simple, clean English navigation system
 */

class SidebarComponent {
  render(state) {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
      { id: 'tasks', label: 'My Tasks', icon: '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>', badge: state.tasks.filter(t=>!t.completed).length || null },
      { id: 'habits', label: 'Daily Habits', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', badge: state.habits.length || null },
      { id: 'routine', label: 'Daily Routine', icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' },
      { id: 'study', label: 'Focus & Study', icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>' },
      { id: 'notes', label: 'My Notes', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', badge: state.notes.length || null },
      { id: 'calendar', label: 'Calendar', icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' },
      { id: 'journal', label: 'Daily Journal', icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>' },
      { id: 'analytics', label: 'My Progress', icon: '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>' },
    ];

    const isMobileOpen = state.isMobileSidebarOpen;

    return `
      <div class="sidebar-backdrop ${isMobileOpen ? 'open' : ''}" onclick="window.store.setState({ isMobileSidebarOpen: false })"></div>
      <aside class="sidebar ${isMobileOpen ? 'mobile-open' : ''}">
        <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="#" class="brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard', isMobileSidebarOpen: false })">
            <div class="brand-emblem" style="background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%);">P</div>
            <div class="brand-text-lg">
              <span class="word-plan" style="color: #FFF;">PLAN</span><span class="word-ix" style="color: #E50914;">IX</span>
            </div>
          </a>
          <button class="btn btn-icon sidebar-mobile-close" onclick="window.store.setState({ isMobileSidebarOpen: false })" aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-title text-helper" style="padding: 0 12px 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-tertiary); font-size: 11px;">
            Main Menu
          </div>
          ${navItems.map(item => `
            <a class="nav-item ${state.currentView === item.id ? 'active' : ''}" 
               onclick="window.store.setState({ currentView: '${item.id}', isMobileSidebarOpen: false })">
              <span class="nav-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
              </span>
              <span class="nav-label" style="font-size: 14px; font-weight: 500;">${item.label}</span>
              ${item.badge ? `<span class="nav-badge" style="margin-left: auto; background: var(--accent-red); color: white; border-radius: 99px; padding: 2px 7px; font-size: 11px; font-weight: 700;">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        </nav>

        <div class="sidebar-footer" style="padding: 16px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; margin: 12px;">
          <div class="avatar" style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #E50914, #990000); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white;">
            ${state.user.name ? state.user.name.charAt(0) : 'A'}
          </div>
          <div class="user-info" style="flex: 1; overflow: hidden;">
            <div class="user-name" style="font-weight: 600; font-size: 14px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${state.user.name}</div>
            <div style="font-size: 11px; color: #E50914; font-weight: 600;">Lvl ${state.user.level} • ${state.user.levelTitle}</div>
          </div>
        </div>
      </aside>
    `;
  }
}

window.sidebarComponent = new SidebarComponent();
