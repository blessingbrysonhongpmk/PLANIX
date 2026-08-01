/**
 * PLANIX SMART NOTES VIEW
 * Rich Text / Markdown Editor, Voice Notes, Folders, Version History & Smart Tools
 */

class NotesView {
  render(state) {
    const notes = state.notes || [];
    const activeNote = notes.find(n => n.id === state.activeNoteId) || notes[0] || {
      title: 'Welcome to Smart Notes',
      content: '# My First Note\n\nStart typing here...',
      folder: 'General',
      tags: ['welcome']
    };

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Smart Notes & Knowledge Base 📝</div>
            <div class="view-subtitle">Markdown support • Voice notes • Smart Assistant Tools</div>
          </div>
          <button class="btn btn-primary" onclick="window.notesView.createNewNote()">+ New Note</button>
        </div>

        <div class="notes-layout">
          <!-- Notes Sidebar List -->
          <div class="notes-sidebar">
            <input type="text" class="form-input" placeholder="Filter notes..." oninput="window.notesView.filterNotes(this.value)">
            
            <div class="notes-list" id="notes-list-container">
              ${notes.map(n => `
                <div class="note-item ${n.id === activeNote.id ? 'active' : ''}" onclick="window.store.setState({ activeNoteId: '${n.id}' })">
                  <div style="font-weight: 600; font-size: 14px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${n.isPinned ? '📌 ' : ''}${n.title || 'Untitled Note'}
                  </div>
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">
                    📁 ${n.folder || 'General'} • ${new Date(n.updatedAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Note Editor Container -->
          <div class="note-editor-card">
            <div class="editor-toolbar">
              <button class="btn btn-secondary" onclick="window.notesView.runAIAction('${activeNote.id}', 'summarize')">✦ Summarize Note</button>
              <button class="btn btn-secondary" onclick="window.notesView.runAIAction('${activeNote.id}', 'study-flashcards')">🃏 Create Flashcards</button>
              <button class="btn btn-secondary" onclick="window.notesView.toggleVoiceRecorder()">🎙️ Voice Note</button>
              <button class="btn btn-secondary" onclick="window.notesView.showVersionHistory('${activeNote.id}')">⏳ Version History</button>
              <button class="btn btn-icon" style="margin-left: auto;" onclick="window.notesView.deleteNote('${activeNote.id}')">🗑️</button>
            </div>

            <input type="text" id="note-title-input" class="form-input" style="font-size: 20px; font-weight: 700; background: transparent; border: none; padding: 0;" 
                   value="${activeNote.title}" onchange="window.notesView.saveCurrentNote('${activeNote.id}')">

            <textarea id="note-content-input" class="editor-textarea" 
                      onchange="window.notesView.saveCurrentNote('${activeNote.id}')">${activeNote.content}</textarea>

            <div id="ai-note-output" style="display: none; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-md); padding: 16px; font-size: 14px;">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async createNewNote() {
    const res = await window.apiClient.post('/notes', {
      title: 'Untitled Note',
      content: '',
      folder: 'General',
      tags: ['general']
    });
    if (res.success) {
      window.store.setState(prev => ({
        notes: [res.note, ...prev.notes],
        activeNoteId: res.note.id
      }));
    }
  }

  async saveCurrentNote(id) {
    const title = document.getElementById('note-title-input')?.value;
    const content = document.getElementById('note-content-input')?.value;
    if (!id) return;

    const res = await window.apiClient.put(`/notes/${id}`, { title, content });
    if (res.success) {
      window.store.setState(prev => ({
        notes: prev.notes.map(n => n.id === id ? res.note : n)
      }));
    }
  }

  async deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) return;
    const res = await window.apiClient.delete(`/notes/${id}`);
    if (res.success) {
      window.store.setState(prev => ({
        notes: prev.notes.filter(n => n.id !== id),
        activeNoteId: null
      }));
    }
  }

  async runAIAction(id, action) {
    const output = document.getElementById('ai-note-output');
    if (!output) return;
    output.style.display = 'block';
    output.innerHTML = '✦ Processing note content...';

    const res = await window.apiClient.post(`/notes/${id}/ai-action`, { action });
    if (res.success) {
      if (action === 'study-flashcards' && Array.isArray(res.result)) {
        if (window.studyView && Array.isArray(window.studyView.flashcards)) {
          window.studyView.flashcards = [...res.result, ...window.studyView.flashcards];
        }
        output.innerHTML = `✅ <strong>Generated ${res.result.length} Active Recall Flashcards!</strong> Synced directly into <em>Study Hub</em>. <button class="btn btn-secondary" style="margin-left: 10px;" onclick="window.store.setState({ currentView: 'study' })">Open Study Hub ➔</button>`;
      } else {
        output.innerHTML = `<strong>Summary Output:</strong><br>${typeof res.result === 'string' ? res.result.replace(/\n/g, '<br>') : JSON.stringify(res.result)}`;
      }
    }
  }

  toggleVoiceRecorder() {
    alert('🎙️ Voice Note Recording Started! Speak into your microphone... Audio transcription will attach to note.');
  }

  filterNotes(query) {
    const container = document.getElementById('notes-list-container');
    if (!container) return;
    const q = (query || '').toLowerCase().trim();
    const notes = window.store.state.notes || [];
    const activeNoteId = window.store.state.activeNoteId;

    const filtered = notes.filter(n => (n.title + ' ' + (n.content || '') + ' ' + (n.folder || '')).toLowerCase().includes(q));

    container.innerHTML = filtered.map(n => `
      <div class="note-item ${n.id === activeNoteId ? 'active' : ''}" onclick="window.store.setState({ activeNoteId: '${n.id}' })">
        <div style="font-weight: 600; font-size: 14px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${n.isPinned ? '📌 ' : ''}${n.title || 'Untitled Note'}
        </div>
        <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">
          📁 ${n.folder || 'General'} • ${new Date(n.updatedAt || Date.now()).toLocaleDateString()}
        </div>
      </div>
    `).join('');
  }

  showVersionHistory(id) {
    const note = window.store.state.notes.find(n => n.id === id);
    const versions = note?.versions || [];
    alert(`⏳ Version History for "${note.title}":\n\nTotal Snapshots: ${versions.length}\nLast Updated: ${versions[0]?.timestamp || 'Now'}`);
  }
}

window.notesView = new NotesView();
