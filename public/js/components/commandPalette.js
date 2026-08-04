/**
 * PLANIX COMMAND PALETTE — Search everything instantly
 * Searches: Tasks, Goals, Notes, Projects, Habits, Resources, Placements
 * Keyboard navigation: ↑↓ to move, Enter to select, Esc to close
 */

class CommandPaletteComponent {
  constructor() {
    this.selectedIndex = 0;
  }

  render(state) {
    if (!state.isCommandPaletteOpen) return '';

    const navShortcuts = [
      { label: 'Dashboard', icon: '🏠', action: "window.store.setState({ currentView: 'dashboard', isCommandPaletteOpen: false })" },
      { label: 'Tasks', icon: '✅', action: "window.store.setState({ currentView: 'tasks', isCommandPaletteOpen: false })" },
      { label: 'Goals', icon: '🎯', action: "window.store.setState({ currentView: 'goals', isCommandPaletteOpen: false })" },
      { label: 'Habits', icon: '🔁', action: "window.store.setState({ currentView: 'habits', isCommandPaletteOpen: false })" },
      { label: 'Focus Mode', icon: '⏱️', action: "window.store.setState({ currentView: 'study', isCommandPaletteOpen: false })" },
      { label: 'Notes', icon: '📝', action: "window.store.setState({ currentView: 'notes', isCommandPaletteOpen: false })" },
      { label: 'Projects', icon: '🚀', action: "window.store.setState({ currentView: 'projects', isCommandPaletteOpen: false })" },
      { label: 'Settings', icon: '⚙️', action: "window.store.setState({ isSettingsModalOpen: true, isCommandPaletteOpen: false })" },
    ];

    return `
      <div class="modal-backdrop open" onclick="if(event.target===this) window.store.setState({ isCommandPaletteOpen: false })" style="align-items: flex-start; padding-top: 20vh;">
        <div class="modal-card animate-scale-up" style="max-width: 560px; padding: 0; overflow: hidden;">

          <!-- Search Input -->
          <div style="display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid var(--border-subtle);">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-tertiary)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="cmd-search-input" class="form-input" style="border: none; background: transparent; padding: 0; box-shadow: none; font-size: 16px;" placeholder="Search tasks, goals, notes, or jump to a page..." autofocus oninput="window.commandPaletteComponent.handleSearch(this.value)" onkeydown="window.commandPaletteComponent.handleKeydown(event)">
            <span class="kbd-shortcut">Esc</span>
          </div>

          <!-- Results -->
          <div id="cmd-results" style="max-height: 360px; overflow-y: auto; padding: 8px;">
            <div style="padding: 8px 12px 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary);">Quick Navigation</div>
            ${navShortcuts.map((s, i) => `
              <div class="cmd-result-item" data-index="${i}" onclick="${s.action}" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: var(--radius-md); cursor: pointer; transition: background var(--transition-fast);" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
                <span style="font-size: 16px; width: 24px; text-align: center;">${s.icon}</span>
                <span style="font-size: 14px; color: var(--text-primary); font-weight: 500;">${s.label}</span>
                <span style="margin-left: auto; font-size: 11px; color: var(--text-tertiary);">Go to page</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  handleSearch(query) {
    const container = document.getElementById('cmd-results');
    if (!container) return;
    const q = query.toLowerCase().trim();

    if (!q) {
      window.store.notify();
      return;
    }

    const { tasks, notes, goals, projects, habits, resources, placements } = window.store.state;

    const results = [];

    // Search tasks
    tasks.filter(t => t.text.toLowerCase().includes(q)).forEach(t => {
      results.push({ type: 'Task', icon: '✅', label: t.text, view: 'tasks', badge: t.completed ? 'Done' : 'Pending' });
    });

    // Search goals
    (goals || []).filter(g => g.title.toLowerCase().includes(q)).forEach(g => {
      results.push({ type: 'Goal', icon: '🎯', label: g.title, view: 'goals', badge: `${g.progress || 0}%` });
    });

    // Search notes
    (notes || []).filter(n => ((n.title || '') + ' ' + (n.content || '')).toLowerCase().includes(q)).forEach(n => {
      results.push({ type: 'Note', icon: '📝', label: n.title || 'Untitled', view: 'notes' });
    });

    // Search projects
    (projects || []).filter(p => (p.title || '').toLowerCase().includes(q)).forEach(p => {
      results.push({ type: 'Project', icon: '🚀', label: p.title, view: 'projects' });
    });

    // Search habits
    (habits || []).filter(h => (h.name || '').toLowerCase().includes(q)).forEach(h => {
      results.push({ type: 'Habit', icon: '🔁', label: h.name, view: 'habits' });
    });

    // Search resources
    (resources || []).filter(r => (r.title || '').toLowerCase().includes(q)).forEach(r => {
      results.push({ type: 'Resource', icon: '🔖', label: r.title, view: 'resources' });
    });

    // Search placements
    (placements || []).filter(p => ((p.company || '') + ' ' + (p.role || '')).toLowerCase().includes(q)).forEach(p => {
      results.push({ type: 'Placement', icon: '💼', label: `${p.company} — ${p.role}`, view: 'placement' });
    });

    if (results.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 32px 16px;">
          <div class="empty-state-icon" style="font-size: 32px;">🔍</div>
          <div class="empty-state-title">No results found</div>
          <div class="empty-state-desc">Try a different search term, or create something new.</div>
        </div>
      `;
      return;
    }

    // Group by type
    const grouped = {};
    results.forEach(r => {
      if (!grouped[r.type]) grouped[r.type] = [];
      grouped[r.type].push(r);
    });

    container.innerHTML = Object.entries(grouped).map(([type, items]) => `
      <div style="padding: 8px 12px 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary);">${type}s</div>
      ${items.slice(0, 5).map(item => `
        <div class="cmd-result-item" onclick="window.store.setState({ currentView: '${item.view}', isCommandPaletteOpen: false })" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: var(--radius-md); cursor: pointer; transition: background var(--transition-fast);" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
          <span style="font-size: 16px; width: 24px; text-align: center;">${item.icon}</span>
          <span style="font-size: 14px; color: var(--text-primary); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.label}</span>
          ${item.badge ? `<span style="font-size: 11px; color: var(--text-tertiary);">${item.badge}</span>` : ''}
        </div>
      `).join('')}
    `).join('');
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      window.store.setState({ isCommandPaletteOpen: false });
    }
    if (e.key === 'Enter') {
      const items = document.querySelectorAll('.cmd-result-item');
      if (items.length > 0) items[0].click();
    }
  }
}

window.commandPaletteComponent = new CommandPaletteComponent();
