/**
 * PLANIX COMMAND PALETTE COMPONENT
 * Global launcher modal for quick search & instant action creation
 */

class CommandPaletteComponent {
  render(state) {
    if (!state.isCommandPaletteOpen) return '';

    return `
      <div class="modal-backdrop open" onclick="if(event.target===this) window.store.setState({ isCommandPaletteOpen: false })">
        <div class="modal-card animate-scale-up" style="max-width: 640px;">
          <div style="display: flex; align-items: center; gap: 12px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
            <span style="font-size: 18px;">🔍</span>
            <input type="text" id="cmd-input" class="form-input" placeholder="Search tasks, notes, habits or type a command..." autofocus oninput="window.commandPaletteComponent.handleSearch(this.value)">
            <button class="btn btn-secondary" onclick="window.store.setState({ isCommandPaletteOpen: false })">Esc</button>
          </div>

          <div style="margin-top: 16px; max-height: 320px; overflow-y: auto;" id="cmd-results">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 10px;">Quick Actions</div>
            <div class="nav-item" onclick="window.commandPaletteComponent.quickCreateTask()">
              <span>⚡</span> <span>Add New Task</span> <span class="kbd-shortcut">Enter</span>
            </div>
            <div class="nav-item" onclick="window.store.setState({ currentView: 'notes', isCommandPaletteOpen: false })">
              <span>📝</span> <span>Create Smart Note</span>
            </div>
            <div class="nav-item" onclick="window.store.setState({ currentView: 'routine', isCommandPaletteOpen: false })">
              <span>🔄</span> <span>Build Smart Schedule Flow</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleSearch(query) {
    const resultsContainer = document.getElementById('cmd-results');
    if (!resultsContainer) return;
    const q = query.toLowerCase().trim();
    if (!q) return;

    const { tasks, notes } = window.store.state;
    const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(q));
    const filteredNotes = notes.filter(n => (n.title + ' ' + n.content).toLowerCase().includes(q));

    resultsContainer.innerHTML = `
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 10px;">Search Results for "${query}"</div>
      ${filteredTasks.map(t => `
        <div class="nav-item" onclick="window.store.setState({ currentView: 'tasks', isCommandPaletteOpen: false })">
          <span>✅</span> <span>[Task] ${t.text}</span>
        </div>
      `).join('')}
      ${filteredNotes.map(n => `
        <div class="nav-item" onclick="window.store.setState({ currentView: 'notes', isCommandPaletteOpen: false })">
          <span>📝</span> <span>[Note] ${n.title}</span>
        </div>
      `).join('')}
      ${filteredTasks.length === 0 && filteredNotes.length === 0 ? '<div style="padding: 12px; color: var(--text-tertiary); font-size: 13px;">No direct matches. Press Enter to create task.</div>' : ''}
    `;
  }

  async quickCreateTask() {
    const input = document.getElementById('cmd-input');
    const text = input ? input.value : '';
    if (!text.trim()) return;

    const res = await window.apiClient.post('/tasks', { text });
    if (res.success) {
      window.store.setState(prev => ({
        tasks: [res.task, ...prev.tasks],
        isCommandPaletteOpen: false
      }));
    }
  }
}

window.commandPaletteComponent = new CommandPaletteComponent();
