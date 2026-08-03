/**
 * PLANIX NOTES VIEW
 * Unified Notes & Knowledge Manager with Category Folders and REST API CRUD
 */

class NotesView {
  constructor() {
    this.selectedCategory = 'all';
  }

  render(state) {
    const activeNote = state.notes.find(n => n.id === state.activeNoteId) || state.notes[0] || null;
    let filteredNotes = state.notes;
    if (this.selectedCategory !== 'all') {
      filteredNotes = state.notes.filter(n => n.category === this.selectedCategory);
    }

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>📝</span> My Notes
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Write study notes, daily ideas, and keep your important thoughts saved.
            </p>
          </div>

          <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.notesView.createNewNote()">
            + New Note
          </button>
        </div>

        <!-- Main Notes Layout -->
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 20px; min-height: 520px;">
          
          <!-- Notes Sidebar List -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 16px; display: flex; flex-direction: column;">
            
            <!-- Category Filter Pills -->
            <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid #27272A;">
              <button class="badge" style="background: ${this.selectedCategory === 'all' ? '#E50914' : '#27272A'}; color: white; border: none; padding: 4px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;" onclick="window.notesView.setCategory('all')">All</button>
              <button class="badge" style="background: ${this.selectedCategory === 'study' ? '#E50914' : '#27272A'}; color: white; border: none; padding: 4px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;" onclick="window.notesView.setCategory('study')">Study</button>
              <button class="badge" style="background: ${this.selectedCategory === 'personal' ? '#E50914' : '#27272A'}; color: white; border: none; padding: 4px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;" onclick="window.notesView.setCategory('personal')">Personal</button>
            </div>

            <!-- Notes List -->
            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto;">
              ${filteredNotes.map(n => `
                <div style="padding: 12px; border-radius: 10px; cursor: pointer; border: 1px solid ${n.id === (activeNote?.id) ? '#E50914' : '#27272A'}; background: ${n.id === (activeNote?.id) ? 'rgba(229,9,20,0.1)' : '#1C1C21'};" onclick="window.store.setState({ activeNoteId: '${n.id}' })">
                  <div style="font-size: 14px; font-weight: 600; color: #FFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n.title}</div>
                  <div style="font-size: 11px; color: #A1A1AA; margin-top: 4px;">${n.category ? n.category.toUpperCase() : 'NOTE'}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Note Editor Area -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            ${activeNote ? `
              <div style="display: flex; flex-direction: column; gap: 16px; flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <input type="text" id="edit-note-title" class="form-input" value="${activeNote.title}" style="font-size: 20px; font-weight: 700; background: transparent; border: none; color: white; width: 100%;" onchange="window.notesView.saveCurrentNote()">
                  <button class="btn" style="background: transparent; color: #71717A; border: none; font-size: 18px;" title="Delete note" onclick="window.notesView.deleteNote('${activeNote.id}')">🗑️</button>
                </div>

                <textarea id="edit-note-content" class="form-input" style="flex: 1; min-height: 340px; background: #1C1C21; border: 1px solid #27272A; color: white; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; resize: vertical;" placeholder="Write your notes here...">${activeNote.content}</textarea>
              </div>

              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #27272A; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; color: #71717A;">Saved automatically in Local & Cloud storage</span>
                <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 700; cursor: pointer;" onclick="window.notesView.saveCurrentNote()">
                  Save Note 💾
                </button>
              </div>
            ` : `
              <div style="text-align: center; padding: 60px; color: #71717A;">
                Select a note or create a new note to start writing.
              </div>
            `}
          </div>

        </div>

      </div>
    `;
  }

  setCategory(cat) {
    this.selectedCategory = cat;
    window.store.notify();
  }

  async createNewNote() {
    const title = prompt("Enter Note Title:") || "Untitled Note";
    const newNote = {
      id: `n_${Date.now()}`,
      title,
      category: 'study',
      content: 'Write your notes here...',
      updatedAt: new Date().toISOString()
    };

    window.store.setState(prev => ({
      notes: [newNote, ...prev.notes],
      activeNoteId: newNote.id
    }));
    await window.apiClient.post('/notes', newNote);
  }

  async saveCurrentNote() {
    const activeNoteId = window.store.state.activeNoteId;
    const titleInput = document.getElementById('edit-note-title');
    const contentInput = document.getElementById('edit-note-content');

    if (!activeNoteId || !titleInput || !contentInput) return;

    const title = titleInput.value;
    const content = contentInput.value;

    const notes = window.store.state.notes.map(n => {
      if (n.id === activeNoteId) return { ...n, title, content, updatedAt: new Date().toISOString() };
      return n;
    });

    window.store.setState({ notes });
    await window.apiClient.put(`/notes/${activeNoteId}`, { title, content });
  }

  async deleteNote(noteId) {
    const notes = window.store.state.notes.filter(n => n.id !== noteId);
    const activeNoteId = notes.length > 0 ? notes[0].id : null;
    window.store.setState({ notes, activeNoteId });
    await window.apiClient.delete(`/notes/${noteId}`);
  }
}

window.notesView = new NotesView();
