/**
 * PLANIX SIDEBAR — Product-Quality Navigation System
 * Matches exact PLANIX V5 UI spec with 6 core sections & user profile footer.
 */

class SidebarComponent {
  render(state) {
    const sections = [
      {
        label: 'HOME',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' }
        ]
      },
      {
        label: 'PLANNING',
        items: [
          { id: 'goals', label: 'Goals', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
          { id: 'tasks', label: 'Tasks', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', badge: (state.tasks || []).filter(t => !t.completed).length || null },
          { id: 'calendar', label: 'Calendar', icon: 'M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M16 2v4 M8 2v4 M1 10h22' },
          { id: 'journal', label: 'Inbox', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', badge: 7 }
        ]
      },
      {
        label: 'PRODUCTIVITY',
        items: [
          { id: 'habits', label: 'Habits', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
          { id: 'study', label: 'Focus Mode', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2' },
          { id: 'projects', label: 'Projects', icon: 'M2 7l10-5 10 5-10 5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5' },
          { id: 'routine', label: 'Routine', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 6v6l4 2' }
        ]
      },
      {
        label: 'LEARNING',
        items: [
          { id: 'notes', label: 'Study Planner', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8' },
          { id: 'learning', label: 'Learning Hub', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
          { id: 'coding', label: 'Coding Tracker', icon: 'M16 18l6-6-6-6 M8 6l-6 6 6 6' },
          { id: 'engineering', label: 'Engineering Hub', icon: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5' }
        ]
      },
      {
        label: 'ACADEMIC',
        items: [
          { id: 'academic', label: 'Academic Hub', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-1.5c0-.69l-2-1v-2l2-1v-1' },
          { id: 'subjects', label: 'Subjects', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' },
          { id: 'assignments', label: 'Assignments', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8' },
          { id: 'exams', label: 'Exams', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
          { id: 'attendance', label: 'Attendance', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
          { id: 'cgpa', label: 'CGPA', icon: 'M18 20V10 M12 20V4 M6 20v-6' }
        ]
      },
      {
        label: 'DOCUMENTS',
        items: [
          { id: 'intelligence', label: 'PDF Library', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8' }
        ]
      },
      {
        label: 'CAREER',
        items: [
          { id: 'placement', label: 'Placements', icon: 'M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
          { id: 'devworkspace', label: 'Internships', icon: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' },
          { id: 'resources', label: 'Hackathons', icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' }
        ]
      },
      {
        label: 'PERSONAL',
        items: [
          { id: 'analytics', label: 'Analytics', icon: 'M18 20V10 M12 20V4 M6 20v-6' },
          { id: 'journal', label: 'Templates', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
          { id: 'settings', label: 'Settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' }
        ]
      }
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
              <a class="nav-item ${state.currentView === item.id || (item.id==='settings' && state.isSettingsModalOpen) ? 'active' : ''}"
                 onclick="${item.id === 'settings' ? 'window.store.setState({ isSettingsModalOpen: true, isMobileSidebarOpen: false })' : `window.store.setState({ currentView: '${item.id}', isMobileSidebarOpen: false })`}"
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

        <!-- AI Assistant Widget -->
        <div style="margin: 16px 12px 8px 12px; background: linear-gradient(135deg, rgba(229, 9, 20, 0.15) 0%, rgba(20, 20, 28, 0.9) 100%); border: 1px solid rgba(229, 9, 20, 0.3); border-radius: 12px; padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <div>
            <div style="font-size: 13px; font-weight: 800; color: #FFF;">AI Assistant</div>
            <div style="font-size: 10px; color: var(--text-tertiary); margin-bottom: 8px;">Your AI study companion</div>
            <button class="btn btn-primary" style="background: #E50914; padding: 4px 10px; font-size: 10px; font-weight: 700;" onclick="window.store.setState({ isAiDrawerOpen: true })">
              Ask AI Anything
            </button>
          </div>
          <div style="font-size: 32px;">🤖</div>
        </div>

        <!-- User Footer -->
        <div class="sidebar-footer" onclick="window.store.setState({ isSettingsModalOpen: true })" tabindex="0" role="button">
          <div class="avatar" style="background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%);">B</div>
          <div class="user-info">
            <div class="user-name">${state.user?.name || window.store.getUserDisplayName()}</div>
            <div style="font-size: 11px; color: var(--text-tertiary); font-weight: 500;">${state.user?.role || 'AI & DS • Sem 5'}</div>
          </div>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="margin-left: auto; flex-shrink:0;"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </aside>
    `;
  }
}

window.sidebarComponent = new SidebarComponent();
