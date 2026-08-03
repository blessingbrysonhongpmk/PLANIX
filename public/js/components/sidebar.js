/**
 * PLANIX FLOATING SIDEBAR COMPONENT
 * Crimson Red & Obsidian Theme Navigation System
 */

class SidebarComponent {
  render(state) {
    const mainNav = [
      { id: 'dashboard', label: 'Dashboard', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' },
      { id: 'goals', label: 'Goals & Milestones', icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path>' },
      { id: 'tasks', label: 'My Tasks', icon: '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>', badge: state.tasks.filter(t=>!t.completed).length || null },
      { id: 'habits', label: 'Daily Habits', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', badge: state.habits.length || null },
      { id: 'projects', label: 'Projects Workspace', icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>' },
      { id: 'notes', label: 'My Notes', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>' },
      { id: 'calendar', label: 'Calendar', icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' },
    ];

    const hubsNav = [
      { id: 'engineering', label: 'Engineering Hub', icon: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>' },
      { id: 'placement', label: 'Placement Hub', icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>' },
      { id: 'coding', label: 'Coding & LeetCode', icon: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' },
      { id: 'learning', label: 'Learning Hub', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
      { id: 'resources', label: 'Resource Library', icon: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>' },
    ];

    const toolsNav = [
      { id: 'routine', label: 'Routine Builder', icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' },
      { id: 'study', label: 'Focus Mode', icon: '<path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>' },
      { id: 'devworkspace', label: 'Developer Workspace', icon: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>' },
      { id: 'analytics', label: 'My Progress', icon: '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>' },
    ];

    const isMobileOpen = state.isMobileSidebarOpen;

    return `
      <div class="sidebar-backdrop ${isMobileOpen ? 'open' : ''}" onclick="window.store.setState({ isMobileSidebarOpen: false })"></div>
      <aside class="sidebar ${isMobileOpen ? 'mobile-open' : ''}">
        <!-- Sidebar Brand Header -->
        <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="#" class="brand-logo" onclick="event.preventDefault(); window.store.setState({ currentView: 'dashboard', isMobileSidebarOpen: false })">
            <div class="brand-emblem" style="background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%); width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 18px;">P</div>
            <div class="brand-text-lg" style="font-size: 24px; font-weight: 900;">
              <span style="color: #FFF;">PLAN</span><span style="color: #E50914;">IX</span>
            </div>
          </a>
          <button class="btn btn-icon sidebar-mobile-close" onclick="window.store.setState({ isMobileSidebarOpen: false })" aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Sidebar Navigation Sections -->
        <nav class="sidebar-nav" style="padding-right: 4px;">
          
          <!-- Section 1: Main Workspace -->
          <div class="nav-section-title" style="padding: 12px 12px 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-tertiary); font-size: 11px;">
            Workspace
          </div>
          ${this.renderNavGroup(mainNav, state)}

          <!-- Section 2: Student & Dev Hubs -->
          <div class="nav-section-title" style="padding: 16px 12px 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-tertiary); font-size: 11px;">
            Student & Dev Hubs
          </div>
          ${this.renderNavGroup(hubsNav, state)}

          <!-- Section 3: Execution Tools -->
          <div class="nav-section-title" style="padding: 16px 12px 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-tertiary); font-size: 11px;">
            Execution Tools
          </div>
          ${this.renderNavGroup(toolsNav, state)}

        </nav>

        <!-- Sidebar User Profile Footer -->
        <div class="sidebar-footer" style="padding: 12px 14px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.02); border-radius: 12px; margin-top: 12px; cursor: pointer;" onclick="window.store.setState({ isSettingsModalOpen: true })">
          <div class="avatar" style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #E50914, #B91C2D); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white;">
            ${state.user.name ? state.user.name.charAt(0) : 'A'}
          </div>
          <div class="user-info" style="flex: 1; overflow: hidden;">
            <div class="user-name" style="font-weight: 600; font-size: 13px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${state.user.name}</div>
            <div style="font-size: 11px; color: #E50914; font-weight: 600;">Lvl ${state.user.level} • ${state.user.levelTitle}</div>
          </div>
          <span style="color: #71717A; font-size: 14px;">⚙️</span>
        </div>
      </aside>
    `;
  }

  renderNavGroup(items, state) {
    return items.map(item => `
      <a class="nav-item ${state.currentView === item.id ? 'active' : ''}" 
         onclick="window.store.setState({ currentView: '${item.id}', isMobileSidebarOpen: false })">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
        </span>
        <span class="nav-label" style="font-size: 13.5px; font-weight: 500;">${item.label}</span>
        ${item.badge ? `<span class="nav-badge" style="margin-left: auto; background: rgba(229,9,20,0.2); color: #FF4D4D; border: 1px solid rgba(229,9,20,0.3); border-radius: 99px; padding: 2px 7px; font-size: 11px; font-weight: 700;">${item.badge}</span>` : ''}
      </a>
    `).join('');
  }
}

window.sidebarComponent = new SidebarComponent();
