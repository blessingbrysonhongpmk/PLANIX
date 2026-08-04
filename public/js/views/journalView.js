/**
 * PLANIX V5 JOURNAL VIEW — Daily Reflection & Mindset Tracker
 */

class JournalView {
  constructor() { this.activeEntryId = null; }

  render(state) {
    const entries = state.journalEntries || state.journal || [];
    const active = this.activeEntryId ? entries.find(e => e.id === this.activeEntryId) : (entries.length > 0 ? entries[0] : null);
    if (active && !this.activeEntryId) this.activeEntryId = active.id;

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Journal & Reflection</h1>
            <p class="page-description">Daily engineering reflection, mindset logging, and mood tracking.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.journalView.addEntry()">+ New Entry</button>
          </div>
        </div>

        ${entries.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📖</div>
              <div class="empty-state-title">No reflection entries yet</div>
              <div class="empty-state-desc">Reflecting on daily wins and challenges builds mental resilience and self-discipline.</div>
              <button class="btn btn-primary" onclick="window.journalView.addEntry()">Start First Journal Entry</button>
            </div>
          </div>
        ` : `
          <div class="notes-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 480px;">
            <!-- Sidebar -->
            <div class="card" style="padding: 12px; display: flex; flex-direction: column; gap: 6px; max-height: 560px; overflow-y: auto;">
              ${entries.map(e => `
                <div class="card-sm ${this.activeEntryId === e.id ? 'active' : ''}" style="background: ${this.activeEntryId === e.id ? 'var(--bg-selected)' : 'var(--bg-input)'}; border: 1px solid ${this.activeEntryId === e.id ? 'var(--accent-primary)' : 'var(--border-subtle)'}; cursor: pointer; padding: 10px 12px; border-radius: var(--radius-md);"
                     onclick="window.journalView.selectEntry('${e.id}')">
                  <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${new Date(e.date || Date.now()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 4px; display: flex; align-items: center; gap: 6px;">
                    <span>${e.mood === 'great' ? '🤩' : e.mood === 'good' ? '🙂' : e.mood === 'meh' ? '😐' : '😫'}</span>
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(e.content || 'Empty entry').substring(0, 30)}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Editor Card -->
            <div class="card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
              ${active ? `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                  <div style="font-size: 18px; font-weight: 800;">${new Date(active.date || Date.now()).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                  
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 12px; color: var(--text-tertiary);">Mood:</span>
                    <select class="form-input" style="width: auto; padding: 4px 12px; min-height: auto; border-radius: var(--radius-full);" onchange="window.journalView.updateEntry('${active.id}', 'mood', this.value)">
                      <option value="great" ${active.mood === 'great' ? 'selected' : ''}>🤩 Great</option>
                      <option value="good" ${active.mood === 'good' ? 'selected' : ''}>🙂 Good</option>
                      <option value="meh" ${active.mood === 'meh' ? 'selected' : ''}>😐 Meh</option>
                      <option value="bad" ${active.mood === 'bad' ? 'selected' : ''}>😫 Bad</option>
                    </select>
                  </div>
                </div>

                <textarea class="form-textarea" style="flex: 1; min-height: 280px; font-size: 14px; line-height: 1.6;" placeholder="How was your day? What went well? What engineering challenge did you overcome?" oninput="window.journalView.updateEntry('${active.id}', 'content', this.value)">${active.content || ''}</textarea>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                  <span style="font-size: 11px; color: var(--text-tertiary);">Auto-saved locally</span>
                  <button class="btn btn-ghost" style="color: var(--color-danger); font-size: 12px;" onclick="window.journalView.confirmDelete('${active.id}')">Delete Entry</button>
                </div>
              ` : `
                <div class="empty-state" style="padding: 40px;">
                  <div class="empty-state-icon">✍️</div>
                  <div class="empty-state-title">Select an entry</div>
                  <div class="empty-state-desc">Select an entry from the list to read or edit your reflection.</div>
                </div>
              `}
            </div>
          </div>
        `}
      </div>
    `;
  }

  addEntry() {
    const id = `jrn_${Date.now()}`;
    const date = new Date().toISOString();
    const newEntry = { id, date, mood: 'good', content: '' };
    const listKey = window.store.state.journalEntries ? 'journalEntries' : 'journal';
    window.store.setState(prev => ({ [listKey]: [newEntry, ...(prev[listKey] || [])] }));
    this.activeEntryId = id;
    window.store.notify();
  }

  selectEntry(id) {
    this.activeEntryId = id;
    window.store.notify();
  }

  updateEntry(id, field, value) {
    const listKey = window.store.state.journalEntries ? 'journalEntries' : 'journal';
    const list = window.store.state[listKey] || [];
    window.store.setState({ [listKey]: list.map(e => e.id === id ? { ...e, [field]: value } : e) });
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Journal Entry',
      message: 'Are you sure you want to delete this reflection entry?',
      onConfirm: () => {
        this.activeEntryId = null;
        const listKey = window.store.state.journalEntries ? 'journalEntries' : 'journal';
        const list = window.store.state[listKey] || [];
        window.store.setState({ [listKey]: list.filter(e => e.id !== id) });
        if (window.showToast) window.showToast('Entry deleted', 'info');
      }
    });
  }
}

window.journalView = new JournalView();
