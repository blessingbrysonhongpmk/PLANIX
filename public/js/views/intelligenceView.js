/**
 * PLANIX V5 ACADEMIC INTELLIGENCE CENTER & DOCUMENT LIBRARY
 * Responsive Document Library & Drag and Drop Uploader.
 */

class IntelligenceView {
  constructor() {
    this.isDragging = false;
    this.uploadingFile = null;
    this.uploadProgress = 0;
    this.searchQuery = '';
    this.selectedSubject = 'all';
    this.selectedType = 'all';

    // Paste listener setup
    if (!window._pasteListenerAttached) {
      window.addEventListener('paste', (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].kind === 'file') {
            const file = items[i].getAsFile();
            if (file) this.handleFileUpload(file);
          }
        }
      });
      window._pasteListenerAttached = true;
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    if (!this.isDragging) {
      this.isDragging = true;
      window.store.notify();
    }
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.isDragging = false;
    window.store.notify();
  }

  async handleDrop(e) {
    e.preventDefault();
    this.isDragging = false;
    window.store.notify();

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        await this.handleFileUpload(files[i]);
      }
    }
  }

  async handleFileInputChange(input) {
    const files = input.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        await this.handleFileUpload(files[i]);
      }
      input.value = '';
    }
  }

  async handleFileUpload(file) {
    this.uploadingFile = file;
    this.uploadProgress = 0;
    window.store.notify();

    try {
      await window.documentService.uploadFile(file, (percent) => {
        this.uploadProgress = percent;
        window.store.notify();
      });

      if (window.showToast) window.showToast(`"${file.name}" uploaded successfully!`, 'success');
    } catch (err) {
      if (window.showToast) window.showToast(err.message, 'error');
    } finally {
      this.uploadingFile = null;
      this.uploadProgress = 0;
      window.store.notify();
    }
  }

  toggleFavorite(id) {
    const updated = (window.store.state.documents || []).map(d =>
      d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
    );
    window.store.setState({ documents: updated });
    window.store.saveLocalCache();
  }

  togglePin(id) {
    const updated = (window.store.state.documents || []).map(d =>
      d.id === id ? { ...d, isPinned: !d.isPinned } : d
    );
    window.store.setState({ documents: updated });
    window.store.saveLocalCache();
  }

  renameDoc(id) {
    const doc = (window.store.state.documents || []).find(d => d.id === id);
    if (!doc) return;
    const newName = prompt('Enter new document title:', doc.title);
    if (newName && newName.trim()) {
      const updated = (window.store.state.documents || []).map(d =>
        d.id === id ? { ...d, title: newName.trim() } : d
      );
      window.store.setState({ documents: updated });
      window.store.saveLocalCache();
      if (window.showToast) window.showToast('Document renamed', 'info');
    }
  }

  deleteDoc(id) {
    if (confirm('Are you sure you want to delete this document?')) {
      const updated = (window.store.state.documents || []).filter(d => d.id !== id);
      window.store.setState({ documents: updated });
      window.store.saveLocalCache();
      if (window.showToast) window.showToast('Document deleted', 'info');
    }
  }

  render(state) {
    let docs = state.documents || [];

    // Filter by search
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      docs = docs.filter(d => d.title.toLowerCase().includes(q) || (d.subject && d.subject.toLowerCase().includes(q)));
    }

    // Filter by subject
    if (this.selectedSubject !== 'all') {
      docs = docs.filter(d => d.subject === this.selectedSubject);
    }

    // Filter by type
    if (this.selectedType === 'favorites') docs = docs.filter(d => d.isFavorite);
    if (this.selectedType === 'pinned') docs = docs.filter(d => d.isPinned);

    const subjectsList = Array.from(new Set((state.documents || []).map(d => d.subject).filter(Boolean)));

    return `
      <style>
        .intelligence-hub {
          --bg-main: #0B0B0F;
          --bg-card: #121217;
          --border-color: #22222A;
          --text-main: #FFFFFF;
          --text-muted: #8E8E9E;
          --accent-red: #FF2D2D;
          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--bg-main);
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
        }

        .upload-zone {
          background: ${this.isDragging ? 'rgba(255, 45, 45, 0.05)' : 'var(--bg-card)'};
          border: 2px dashed ${this.isDragging ? 'var(--accent-red)' : 'var(--border-color)'};
          border-radius: 16px;
          padding: 30px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .upload-zone:hover {
          border-color: rgba(255, 45, 45, 0.4);
          background: rgba(255, 45, 45, 0.02);
        }

        .doc-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 14px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
      </style>

      <div class="view-container animate-fade-in intelligence-hub">
        
        <!-- PAGE HEADER -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h1 style="font-size: 22px; font-weight: 800; color: #FFF; margin: 0 0 4px 0;">Academic Intelligence Center & Library</h1>
            <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Upload, analyze, and manage your academic PDFs and assignments.</p>
          </div>
          <div>
            <button class="btn btn-primary" style="background: var(--accent-red); font-weight: 700; padding: 10px 16px; font-size: 12px;" onclick="document.getElementById('library-upload-input').click()">
              + Upload Document
            </button>
            <input type="file" id="library-upload-input" style="display: none;" multiple onchange="window.intelligenceView.handleFileInputChange(this)">
          </div>
        </div>

        <!-- UPLOAD ZONE -->
        <div class="upload-zone" style="margin-bottom: 24px;"
             ondragover="window.intelligenceView.handleDragOver(event)"
             ondragleave="window.intelligenceView.handleDragLeave(event)"
             ondrop="window.intelligenceView.handleDrop(event)">
          
          ${this.uploadingFile ? `
            <div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
              <div style="font-size: 13px; font-weight: 700; color: #FFF;">Uploading "${this.uploadingFile.name}"...</div>
              <div style="height: 6px; background: #0A0A0C; border-radius: 3px; overflow: hidden; border: 1px solid var(--border-color);">
                <div style="height: 100%; width: ${this.uploadProgress}%; background: var(--accent-red); transition: width 0.1s ease;"></div>
              </div>
              <div style="font-size: 11px; color: var(--text-muted);">${this.uploadProgress}% completed</div>
            </div>
          ` : `
            <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(255,45,45,0.1); color: var(--accent-red); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
                📚
              </div>
              <div style="text-align: center;">
                <div style="font-size: 14px; font-weight: 700; color: #FFF;">Drop files here, browse, or paste from clipboard (Ctrl+V)</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Supported: PDF, DOCX, PPTX, PNG, JPG, ZIP (Max 100 MB)</div>
              </div>
            </div>
          `}
        </div>

        <!-- CONTROLS & FILTERS BAR -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; background: var(--bg-card); padding: 12px 14px; border-radius: 12px; border: 1px solid var(--border-color);">
          
          <!-- Search Input -->
          <div style="position: relative; flex: 1; min-width: 200px;">
            <input type="text" class="form-input" placeholder="Search title or subject..." style="padding-left: 36px; font-size: 12px; background: #0A0A0C; border: 1px solid #22222A; width: 100%;" value="${this.searchQuery}" oninput="window.intelligenceView.searchQuery = this.value; window.store.notify()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--text-muted)" stroke-width="2" style="position: absolute; left: 12px; top: 10px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <!-- Subject & Type Filters -->
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <select class="form-input" style="font-size: 11px; background: #0A0A0C; border: 1px solid #22222A; color: #FFF; padding: 6px 10px; width: auto;" onchange="window.intelligenceView.selectedSubject = this.value; window.store.notify()">
              <option value="all">All Subjects</option>
              ${subjectsList.map(s => `<option value="${s}" ${this.selectedSubject === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>

            <div style="display: flex; gap: 4px; background: #0A0A0C; padding: 3px; border-radius: 6px; border: 1px solid #22222A;">
              <button class="btn" style="padding: 4px 10px; font-size: 11px; font-weight: 600; border-radius: 4px; background: ${this.selectedType === 'all' ? 'var(--accent-red)' : 'transparent'}; color: ${this.selectedType === 'all' ? '#FFF' : 'var(--text-muted)'}; border: none;" onclick="window.intelligenceView.selectedType = 'all'; window.store.notify()">All (${(state.documents || []).length})</button>
              <button class="btn" style="padding: 4px 10px; font-size: 11px; font-weight: 600; border-radius: 4px; background: ${this.selectedType === 'favorites' ? 'var(--accent-red)' : 'transparent'}; color: ${this.selectedType === 'favorites' ? '#FFF' : 'var(--text-muted)'}; border: none;" onclick="window.intelligenceView.selectedType = 'favorites'; window.store.notify()">Starred</button>
            </div>
          </div>

        </div>

        <!-- DOCUMENT GRID -->
        ${docs.length === 0 ? `
          <div class="card" style="padding: 50px 20px; text-align: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px;">
            <div style="font-size: 32px; margin-bottom: 12px;">📂</div>
            <div style="font-size: 15px; font-weight: 700; color: #FFF;">No documents found</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Try broadening your search or upload a new file.</div>
          </div>
        ` : `
          <div class="ah-doc-grid" style="padding-bottom: 40px;">
            ${docs.map(d => `
              <div class="doc-card">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                  <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: var(--accent-red); color: #FFF; text-transform: uppercase;">${d.fileType || 'PDF'}</span>
                    ${d.status === 'analyzed' ? `<span style="font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3);">✓ Analyzed</span>` : ''}
                  </div>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn btn-ghost" style="padding: 2px; color: ${d.isFavorite ? '#FFD700' : 'var(--text-muted)'}; min-height: auto;" onclick="window.intelligenceView.toggleFavorite('${d.id}')" title="Star">
                      ★
                    </button>
                    <button class="btn btn-ghost" style="padding: 2px; color: ${d.isPinned ? 'var(--accent-red)' : 'var(--text-muted)'}; min-height: auto;" onclick="window.intelligenceView.togglePin('${d.id}')" title="Pin">
                      📌
                    </button>
                  </div>
                </div>

                <div style="margin-bottom: 14px;">
                  <div style="font-size: 13px; font-weight: 700; color: #FFF; line-height: 1.3; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${d.title}
                  </div>
                  <div style="font-size: 10px; color: var(--text-muted);">${d.subject || 'General'} • ${d.pages || 10} Pages • ${d.fileSize}</div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #22222A; padding-top: 10px; margin-top: auto; flex-wrap: wrap; gap: 6px;">
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 10px; font-weight: 700;" onclick="window.documentViewerModal.open('${d.id}')">
                      👁️ Open
                    </button>
                    <button class="btn btn-primary" style="padding: 4px 10px; font-size: 10px; font-weight: 700; background: var(--accent-red);" onclick="window.analysisModal.open('${d.id}')">
                      🤖 Analyze
                    </button>
                  </div>

                  <div style="display: flex; gap: 4px;">
                    <button class="btn btn-ghost" style="padding: 4px; color: var(--text-muted); min-height: auto;" onclick="window.intelligenceView.renameDoc('${d.id}')" title="Rename">✏️</button>
                    <button class="btn btn-ghost" style="padding: 4px; color: var(--text-muted); min-height: auto;" onclick="window.intelligenceView.deleteDoc('${d.id}')" title="Delete">🗑️</button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}

      </div>
    `;
  }
}

window.intelligenceView = new IntelligenceView();
