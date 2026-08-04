/**
 * PLANIX V5 NOTES VIEW — Premium Markdown Editor
 * 3-Pane Layout, Stable Caret Fix, True 60fps Typing.
 */

class NotesView {
  constructor() {
    this.searchQuery = '';
    this.activeNoteId = null;
    this.filterTab = 'all'; // all, pinned, favorites
    this.autosaveTimeout = null;
  }

  render(state) {
    const notes = state.notes || [];
    let filtered = notes;
    if (this.filterTab === 'pinned') filtered = filtered.filter(n => n.isPinned);
    if (this.searchQuery) {
      filtered = filtered.filter(n => ((n.title || '') + (n.content || '')).toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    const pinnedNotes = notes.filter(n => n.isPinned);
    const recentNotes = notes.filter(n => !n.isPinned).slice(0, 5);

    const active = this.activeNoteId ? notes.find(n => n.id === this.activeNoteId) : (notes.length > 0 ? notes[0] : null);
    if (active && !this.activeNoteId) this.activeNoteId = active.id;

    return `
      <!-- Container matches app body bg exactly so no border flashes -->
      <div class="view-container animate-fade-in" style="padding: 0; display: grid; grid-template-columns: 280px 1fr 300px; gap: 0; min-height: 100vh; margin-top: -20px; background: var(--bg-body);">

        <!-- ============================================== -->
        <!-- 1. LEFT SIDEBAR: Notes Directory -->
        <!-- ============================================== -->
        <div style="border-right: 1px solid var(--border-subtle); padding: 24px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; height: 100vh;">
          
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1 style="font-size: 24px; font-weight: 800; color: #FFFFFF; margin: 0;">Notes</h1>
            <button class="btn btn-primary" style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; background: rgba(229, 9, 20, 0.15); color: #E50914; border: 1px solid rgba(229, 9, 20, 0.3); border-radius: 6px;" onclick="window.notesView.addNote()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
          </div>

          <!-- Search Notes -->
          <div style="position: relative;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="position: absolute; left: 12px; top: 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="form-input" placeholder="Search notes..." style="padding-left: 36px; font-size: 13px; background: var(--bg-input); border: 1px solid #2A2A32;" value="${this.searchQuery}" oninput="window.notesView.searchQuery = this.value; window.store.notify()">
          </div>

          <!-- Filter Tabs -->
          <div style="display: flex; gap: 12px; font-size: 12px; font-weight: 600; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <div style="cursor: pointer; padding: 4px 10px; border-radius: 4px; ${this.filterTab === 'all' ? 'background: #E50914; color: #FFF;' : 'color: var(--text-tertiary);'}" onclick="window.notesView.filterTab = 'all'; window.store.notify()">All Notes</div>
            <div style="cursor: pointer; padding: 4px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px; ${this.filterTab === 'pinned' ? 'background: #E50914; color: #FFF;' : 'color: var(--text-tertiary);'}" onclick="window.notesView.filterTab = 'pinned'; window.store.notify()">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg> Pinned
            </div>
            <div style="cursor: pointer; padding: 4px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px; ${this.filterTab === 'favorites' ? 'background: #E50914; color: #FFF;' : 'color: var(--text-tertiary);'}" onclick="window.notesView.filterTab = 'favorites'; window.store.notify()">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Favorites
            </div>
          </div>

          <!-- Folders Directory -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700; color: var(--text-tertiary); margin-bottom: 10px; text-transform: uppercase;">
              <span>Folders</span>
              <span style="font-size: 14px; cursor: pointer;">+</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-secondary);">
              <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <span style="display: flex; align-items: center; gap: 8px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#E50914" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Study Notes</span>
                <span style="font-size: 11px; color: var(--text-tertiary);">24</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <span style="display: flex; align-items: center; gap: 8px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Projects</span>
                <span style="font-size: 11px; color: var(--text-tertiary);">18</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <span style="display: flex; align-items: center; gap: 8px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Personal</span>
                <span style="font-size: 11px; color: var(--text-tertiary);">12</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <span style="display: flex; align-items: center; gap: 8px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Ideas</span>
                <span style="font-size: 11px; color: var(--text-tertiary);">8</span>
              </div>
            </div>
          </div>

          <!-- Pinned Notes -->
          <div style="margin-top: 10px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); margin-bottom: 10px; text-transform: uppercase;">Pinned</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${pinnedNotes.map(n => `
                <div style="padding: 12px; border-radius: 8px; cursor: pointer; border: 1px solid ${this.activeNoteId === n.id ? '#E50914' : 'var(--border-subtle)'}; background: ${this.activeNoteId === n.id ? 'linear-gradient(135deg, rgba(229, 9, 20, 0.1) 0%, rgba(229, 9, 20, 0.0) 100%)' : 'var(--bg-input)'};" onclick="window.notesView.selectNote('${n.id}')">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                    <div style="font-size: 13px; font-weight: 700; color: #FFF; line-height: 1.3;">${n.title || 'Untitled'}</div>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E50914" stroke-width="2" style="flex-shrink: 0;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </div>
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 6px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${n.description || n.content?.substring(0, 50) || 'Empty note...'}</div>
                  <div style="font-size: 10px; color: var(--text-tertiary);">${n.updatedAt || 'Today'}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Recent Notes -->
          <div style="margin-top: 10px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); margin-bottom: 10px; text-transform: uppercase;">Recent Notes</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${recentNotes.map(n => `
                <div style="padding: 12px; border-radius: 8px; cursor: pointer; border: 1px solid ${this.activeNoteId === n.id ? '#E50914' : 'var(--border-subtle)'}; background: ${this.activeNoteId === n.id ? 'linear-gradient(135deg, rgba(229, 9, 20, 0.1) 0%, rgba(229, 9, 20, 0.0) 100%)' : 'var(--bg-input)'};" onclick="window.notesView.selectNote('${n.id}')">
                  <div style="font-size: 13px; font-weight: 700; color: #FFF; margin-bottom: 4px; line-height: 1.3;">${n.title || 'Untitled'}</div>
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 6px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${n.description || n.content?.substring(0, 50) || 'Empty note...'}</div>
                  <div style="font-size: 10px; color: var(--text-tertiary);">${n.updatedAt || 'Today'}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>


        <!-- ============================================== -->
        <!-- 2. MAIN EDITOR AREA: Obsidian / Notion Style -->
        <!-- ============================================== -->
        <div style="padding: 32px 40px; display: flex; flex-direction: column; overflow-y: auto; height: 100vh;">
          ${active ? `
            
            <!-- Editor Title & Metadata -->
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <input type="text" class="form-input" value="${active.title || ''}" placeholder="Untitled Note" style="font-size: 28px; font-weight: 800; border: none; background: transparent; padding: 0; color: #FFFFFF;" oninput="window.notesView.silentUpdate('${active.id}', 'title', this.value)">
                
                <div style="display: flex; gap: 12px; color: var(--text-tertiary);">
                  <div style="cursor: pointer;" onclick="window.notesView.togglePin('${active.id}')" title="Pin Note">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="${active.isPinned ? '#E50914' : 'currentColor'}" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </div>
                  <div style="cursor: pointer;" title="Share">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                  </div>
                  <div style="cursor: pointer;" title="More Options" onclick="window.notesView.confirmDelete('${active.id}')">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                ${(active.tags || []).map(tag => `
                  <span style="font-size: 11px; font-weight: 600; color: #8B5CF6; background: rgba(139, 92, 246, 0.1); padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.2);">#${tag}</span>
                `).join('')}
                <span style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); background: var(--bg-input); padding: 4px 10px; border-radius: 12px; border: 1px solid var(--border-subtle); cursor: pointer;">+</span>
              </div>

              <!-- Meta row -->
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 600; color: var(--text-tertiary); border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <span style="display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> ${active.folder || 'Study Notes'}</span>
                  <span style="display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Updated ${active.updatedAt || 'just now'}</span>
                  <span style="display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> ${active.readTime || '5 min read'}</span>
                </div>
                <div id="autosave-indicator" style="display: flex; align-items: center; gap: 6px; color: var(--color-success);">
                  ✓ Autosaved
                </div>
              </div>
            </div>

            <!-- Rich Text Toolbar -->
            <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 20px; overflow-x: auto;">
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Undo"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Redo"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg></button>
              <div style="width: 1px; height: 16px; background: var(--border-subtle);"></div>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; font-weight: 800;" title="Bold">B</button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; font-style: italic; font-weight: 600;" title="Italic">I</button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; text-decoration: underline; font-weight: 600;" title="Underline">U</button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; text-decoration: line-through; font-weight: 600;" title="Strikethrough">S</button>
              <div style="width: 1px; height: 16px; background: var(--border-subtle);"></div>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; font-family: var(--font-mono); font-size: 11px; font-weight: 700;" title="Code">&lt;/&gt;</button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 2px;" title="Heading">H1 <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
              <div style="width: 1px; height: 16px; background: var(--border-subtle);"></div>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Bullet List"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Numbered List"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M4 18h2"></path><path d="M6 14h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5H6v1c0 .3-.2.5-.5.5H4"></path></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Task List"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></button>
              <div style="width: 1px; height: 16px; background: var(--border-subtle);"></div>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Quote"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Table"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Image"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></button>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="Link"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
              <div style="width: 1px; height: 16px; background: var(--border-subtle);"></div>
              <button class="btn btn-ghost" style="padding: 4px; min-height: auto; color: #E50914; font-weight: 800; display: flex; align-items: center; gap: 2px;" title="Highlight">A <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
              <div style="margin-left: auto;">
                <button class="btn btn-ghost" style="padding: 4px; min-height: auto;" title="More"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
              </div>
            </div>

            <!-- Main Typing Area -->
            <!-- Using silentUpdate oninput to prevent full DOM rebuild and fix caret jumping! -->
            <textarea id="active-note-textarea" class="form-textarea" style="flex: 1; font-family: var(--font-sans); line-height: 1.8; font-size: 15px; border: none; background: transparent; padding: 0; box-shadow: none; color: #FFFFFF; resize: none;" placeholder="Start writing technical notes, markdown, or ideas..." oninput="window.notesView.silentUpdate('${active.id}', 'content', this.value)">${active.content || ''}</textarea>

          ` : `
            <div class="empty-state" style="padding: 60px 24px; margin: auto;">
              <div class="empty-state-icon">📄</div>
              <div class="empty-state-title">Select a note</div>
              <div class="empty-state-desc">Choose a note from the left sidebar to view and edit.</div>
            </div>
          `}
        </div>

        <!-- ============================================== -->
        <!-- 3. RIGHT SIDEBAR: Metadata & AI Intelligence -->
        <!-- ============================================== -->
        <div style="border-left: 1px solid var(--border-subtle); padding: 24px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; height: 100vh;">
          
          ${active ? `
            <!-- AI Summary Card -->
            <div class="card" style="padding: 16px; background: linear-gradient(135deg, rgba(229, 9, 20, 0.05) 0%, rgba(229, 9, 20, 0) 100%); border: 1px solid rgba(229, 9, 20, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #FFFFFF;">
                  <span style="color: #E50914;">✨</span> AI Summary
                </div>
                <div style="cursor: pointer; color: var(--text-tertiary);" title="Copy">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>
              <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin: 0 0 12px 0;">
                This note is about the roadmap to become an AI Engineer. It includes foundations, ML, projects and career preparation.
              </p>
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px; width: 100%; border: 1px solid rgba(229, 9, 20, 0.3);">Generate More</button>
            </div>

            <!-- Tags Card -->
            <div class="card" style="padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> Tags
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${(active.tags || []).map((tag, i) => {
                  const colors = ['#E50914', '#8B5CF6', '#10B981', '#F59E0B'];
                  const c = colors[i % colors.length];
                  return `<span style="font-size: 10px; font-weight: 600; color: ${c}; background: ${c}15; padding: 2px 8px; border-radius: 12px; border: 1px solid ${c}30;">${tag}</span>`;
                }).join('')}
                <span style="font-size: 10px; font-weight: 600; color: var(--text-tertiary); background: var(--bg-input); padding: 2px 8px; border-radius: 12px; border: 1px solid var(--border-subtle); cursor: pointer;">+</span>
              </div>
            </div>

            <!-- Related Notes -->
            <div class="card" style="padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> Related Notes
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; cursor: pointer;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg> ML Concepts</span>
                  <span style="color: var(--text-tertiary);">2 days ago</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; cursor: pointer;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg> DSA Notes</span>
                  <span style="color: var(--text-tertiary);">5 days ago</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; cursor: pointer;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg> System Design Basics</span>
                  <span style="color: var(--text-tertiary);">1 week ago</span>
                </div>
              </div>
              
              <div style="margin-top: 14px; text-align: center;">
                <a href="#" style="font-size: 10px; color: #E50914; text-decoration: none; font-weight: 600;">View all notes →</a>
              </div>
            </div>

            <!-- Note Info Stats -->
            <div class="card" style="padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> Note Info
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Created</span>
                  <span style="color: var(--text-tertiary);">${active.createdAt || 'May 4, 2025'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg> Last updated</span>
                  <span style="color: var(--text-tertiary);">${active.updatedAt || 'Just now'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg> Word count</span>
                  <span style="color: var(--text-tertiary);">${active.wordCount || 532}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg> Characters</span>
                  <span style="color: var(--text-tertiary);">${active.charCount || '3,412'}</span>
                </div>
              </div>
            </div>

          ` : ''}

        </div>
      </div>
    `;
  }

  addNote() {
    const id = `note_${Date.now()}`;
    const newNote = { id, title: 'Untitled Note', content: '', isPinned: false, createdAt: 'Just now', updatedAt: 'Just now', folder: 'Study Notes', tags: [] };
    window.store.setState(prev => ({ notes: [newNote, ...prev.notes] }));
    this.activeNoteId = id;
    window.store.notify(); // Safe to rebuild DOM when switching/creating notes
  }

  selectNote(id) {
    this.activeNoteId = id;
    window.store.notify(); // Rebuild DOM to show new note editor
  }

  // FIXED: No longer calls store.notify(), preventing full app re-renders on keystroke.
  // This guarantees the textarea keeps focus and cursor caret position perfectly stable!
  silentUpdate(id, field, value) {
    const note = window.store.state.notes.find(n => n.id === id);
    if (!note) return;
    
    // Mutate state in place
    note[field] = value;
    note.updatedAt = 'Just now';
    
    // Persist to local storage silently
    window.store.saveLocalCache();

    // Visual feedback in DOM
    const indicator = document.getElementById('autosave-indicator');
    if (indicator) {
      indicator.innerHTML = '<span style="color: #10B981; font-weight: 700;">✓ Saving...</span>';
      
      clearTimeout(this.autosaveTimeout);
      this.autosaveTimeout = setTimeout(() => {
        if(indicator) indicator.innerHTML = '<span style="color: #10B981; font-weight: 700;">✓ Autosaved</span>';
      }, 600);
    }
  }

  togglePin(id) {
    const notes = window.store.state.notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n);
    window.store.setState({ notes });
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Note',
      message: 'Are you sure you want to delete this note?',
      onConfirm: () => {
        this.activeNoteId = null;
        window.store.setState({ notes: window.store.state.notes.filter(n => n.id !== id) });
        if (window.showToast) window.showToast('Note deleted', 'info');
      }
    });
  }
}

window.notesView = new NotesView();
