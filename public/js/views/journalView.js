/**
 * PLANIX JOURNAL VIEW — Daily reflection and mood tracking
 */

class JournalView {
  constructor() { this.activeEntryId = null; }

  render(state) {
    const entries = state.journalEntries || [];
    const active = this.activeEntryId ? entries.find(e => e.id === this.activeEntryId) : null;

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Journal</h1>
            <p class="page-description">Reflect on your day, track your mood, and clear your mind.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.journalView.addEntry()">+ New Entry</button>
          </div>
        </div>

        ${entries.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">📖</div>
            <div class="empty-state-title">No journal entries</div>
            <div class="empty-state-desc">Writing down your thoughts helps clear your mind and improve focus. Start your first entry today.</div>
            <button class="btn btn-primary" onclick="window.journalView.addEntry()">Start Journaling</button>
          </div></div>
        ` : `
          <div class="notes-layout">
            <!-- Sidebar -->
            <div class="notes-sidebar">
              <div class="notes-list">
                ${entries.map(e => `
                  <div class="note-item ${this.activeEntryId === e.id ? 'active' : ''}" onclick="window.journalView.selectEntry('${e.id}')">
                    <div style="font-size: 14px; font-weight: 600; color: var(--text-primary);">${new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 4px; display: flex; align-items: center; gap: 6px;">
                      <span>${e.mood === 'great' ? '🤩' : e.mood === 'good' ? '🙂' : e.mood === 'meh' ? '😐' : '😫'}</span>
                      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(e.content || 'Empty entry').substring(0, 30)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Editor -->
            <div class="note-editor-card">
              ${active ? `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-size: 18px; font-weight: 700;">${new Date(active.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                  <select class="form-input" style="width: auto; padding: 6px 12px; min-height: auto; border-radius: var(--radius-full);" onchange="window.journalView.updateEntry('${active.id}', 'mood', this.value)">
                    <option value="great" ${active.mood === 'great' ? 'selected' : ''}>🤩 Great</option>
                    <option value="good" ${active.mood === 'good' ? 'selected' : ''}>🙂 Good</option>
                    <option value="meh" ${active.mood === 'meh' ? 'selected' : ''}>😐 Meh</option>
                    <option value="bad" ${active.mood === 'bad' ? 'selected' : ''}>😫 Bad</option>
                  </select>
                </div>
                
                <textarea class="editor-textarea" placeholder="How was your day? What went well? What could be better?" oninput="window.journalView.updateEntry('${active.id}', 'content', this.value)">${active.content || ''}</textarea>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                  <span style="font-size: 11px; color: var(--text-tertiary);">Auto-saved</span>
                  <button class="btn btn-ghost" style="color: var(--color-danger); font-size: 12px;" onclick="window.journalView.deleteEntry('${active.id}')">Delete Entry</button>
                </div>
              ` : `
                <div class="empty-state" style="padding: 40px;">
                  <div class="empty-state-icon">✍️</div>
                  <div class="empty-state-title">Select an entry</div>
                  <div class="empty-state-desc">Select an entry from the sidebar to reflect on your day.</div>
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
    window.store.setState(prev => ({ journalEntries: [{ id, date, mood: 'good', content: '' }, ...(prev.journalEntries || [])] }));
    this.activeEntryId = id;
  }

  selectEntry(id) { this.activeEntryId = id; window.store.notify(); }

  updateEntry(id, field, value) {
    window.store.setState({ journalEntries: window.store.state.journalEntries.map(e => e.id === id ? { ...e, [field]: value } : e) });
  }

  deleteEntry(id) {
    if (!confirm('Delete this journal entry?')) return;
    this.activeEntryId = null;
    window.store.setState({ journalEntries: window.store.state.journalEntries.filter(e => e.id !== id) });
  }
}

window.journalView = new JournalView();
