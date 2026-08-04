/**
 * PLANIX NOTES VIEW — Smart notes with search and quick creation
 */

class NotesView {
  constructor() { this.searchQuery = ''; this.activeNoteId = null; }

  render(state) {
    const notes = state.notes || [];
    let filtered = this.searchQuery ? notes.filter(n => ((n.title || '') + (n.content || '')).toLowerCase().includes(this.searchQuery.toLowerCase())) : notes;
    const active = this.activeNoteId ? notes.find(n => n.id === this.activeNoteId) : null;

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Notes</h1>
            <p class="page-description">Write quick notes, ideas, and meeting summaries. Search across all notes instantly.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.notesView.addNote()">+ New Note</button>
          </div>
        </div>

        <!-- Search -->
        <div style="margin-bottom: 20px;">
          <input type="text" class="form-input" placeholder="Search notes..." style="max-width: 320px;" value="${this.searchQuery}" oninput="window.notesView.searchQuery = this.value; window.store.notify()">
        </div>

        ${notes.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <div class="empty-state-title">No notes yet</div>
            <div class="empty-state-desc">Notes are your personal scratchpad. Write anything — ideas, summaries, code snippets.</div>
            <button class="btn btn-primary" onclick="window.notesView.addNote()">Create First Note</button>
          </div></div>
        ` : `
          <div class="notes-layout">
            <!-- Notes List -->
            <div class="notes-sidebar">
              <div class="notes-list">
                ${filtered.map(n => `
                  <div class="note-item ${this.activeNoteId === n.id ? 'active' : ''}" onclick="window.notesView.selectNote('${n.id}')">
                    <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.title || 'Untitled'}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(n.content || '').substring(0, 50)}</div>
                  </div>
                `).join('')}
                ${filtered.length === 0 && this.searchQuery ? `<div style="padding: 20px; text-align: center; color: var(--text-tertiary); font-size: 13px;">No matches found</div>` : ''}
              </div>
            </div>

            <!-- Editor -->
            <div class="note-editor-card">
              ${active ? `
                <input type="text" class="form-input" value="${active.title || ''}" placeholder="Note title..." style="font-size: 18px; font-weight: 700; border: none; background: transparent; padding: 0;" oninput="window.notesView.updateNote('${active.id}', 'title', this.value)">
                <textarea class="editor-textarea" placeholder="Start writing..." oninput="window.notesView.updateNote('${active.id}', 'content', this.value)">${active.content || ''}</textarea>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                  <span style="font-size: 11px; color: var(--text-tertiary);">Auto-saved</span>
                  <button class="btn btn-ghost" style="color: var(--color-danger); font-size: 12px;" onclick="window.notesView.deleteNote('${active.id}')">Delete Note</button>
                </div>
              ` : `
                <div class="empty-state" style="padding: 40px;">
                  <div class="empty-state-icon">📄</div>
                  <div class="empty-state-title">Select a note</div>
                  <div class="empty-state-desc">Choose a note from the left to view and edit it.</div>
                </div>
              `}
            </div>
          </div>
        `}
      </div>
    `;
  }

  addNote() {
    const id = `note_${Date.now()}`;
    window.store.setState(prev => ({ notes: [{ id, title: 'Untitled Note', content: '', createdAt: new Date().toISOString() }, ...prev.notes] }));
    this.activeNoteId = id;
  }

  selectNote(id) { this.activeNoteId = id; window.store.notify(); }

  updateNote(id, field, value) {
    const notes = window.store.state.notes.map(n => n.id === id ? { ...n, [field]: value } : n);
    window.store.setState({ notes });
  }

  deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    this.activeNoteId = null;
    window.store.setState({ notes: window.store.state.notes.filter(n => n.id !== id) });
  }
}

window.notesView = new NotesView();
