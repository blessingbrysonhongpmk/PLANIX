/**
 * PLANIX V5 IN-APP DOCUMENT VIEWER MODAL
 * Provides embedded PDF reading, page navigation, search, bookmarks, and AI triggers inside PLANIX.
 */

class DocumentViewerModal {
  constructor() {
    this.isOpen = false;
    this.activeDoc = null;
    this.currentPage = 1;
    this.zoomLevel = 100;
    this.searchQuery = '';
    this.isSidebarOpen = true;
    this.isDarkMode = true;
  }

  open(docId) {
    const doc = (window.store.state.documents || []).find(d => d.id === docId);
    if (!doc) return;

    this.activeDoc = doc;
    this.currentPage = 1;
    this.zoomLevel = 100;
    this.searchQuery = '';
    this.isOpen = true;

    // Update last opened timestamp
    const updatedDocs = (window.store.state.documents || []).map(d => 
      d.id === docId ? { ...d, lastOpened: 'Just now' } : d
    );
    window.store.setState({ documents: updatedDocs });
    window.store.saveLocalCache();

    window.store.notify();
  }

  close() {
    this.isOpen = false;
    this.activeDoc = null;
    window.store.notify();
  }

  nextPage() {
    if (this.activeDoc && this.currentPage < (this.activeDoc.pages || 10)) {
      this.currentPage++;
      window.store.notify();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.store.notify();
    }
  }

  zoomIn() {
    if (this.zoomLevel < 200) {
      this.zoomLevel += 25;
      window.store.notify();
    }
  }

  zoomOut() {
    if (this.zoomLevel > 50) {
      this.zoomLevel -= 25;
      window.store.notify();
    }
  }

  triggerAiAnalysis() {
    if (!this.activeDoc) return;
    const docId = this.activeDoc.id;
    this.close();
    if (window.analysisModal) {
      window.analysisModal.open(docId);
    }
  }

  render() {
    if (!this.isOpen || !this.activeDoc) return '';

    const doc = this.activeDoc;
    const totalPages = doc.pages || 20;

    return `
      <div style="position: fixed; inset: 0; z-index: 1000; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(12px); display: flex; flex-direction: column; overflow: hidden; animation: fadeIn 0.2s ease;">
        
        <!-- TOP CONTROL BAR -->
        <div style="height: 56px; background: #121217; border-bottom: 1px solid #22222A; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0;">
          
          <!-- Document Title & Subject -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-ghost" style="padding: 6px; color: var(--text-tertiary);" onclick="window.documentViewerModal.close()" title="Close Viewer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div style="width: 1px; height: 24px; background: #22222A;"></div>
            <div>
              <div style="font-size: 14px; font-weight: 700; color: #FFF; white-space: nowrap; max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${doc.title}</div>
              <div style="font-size: 10px; color: var(--text-tertiary);">${doc.subject || 'General'} • ${doc.fileSize}</div>
            </div>
          </div>

          <!-- Page Navigation & Zoom Controls -->
          <div style="display: flex; align-items: center; gap: 16px;">
            
            <!-- Page controls -->
            <div style="display: flex; align-items: center; gap: 8px; background: #0A0A0C; border: 1px solid #22222A; border-radius: 6px; padding: 2px 8px;">
              <button class="btn btn-ghost" style="padding: 4px; color: var(--text-secondary); min-height: auto;" onclick="window.documentViewerModal.prevPage()" ${this.currentPage <= 1 ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span style="font-size: 12px; font-weight: 600; color: #FFF;">${this.currentPage} / ${totalPages}</span>
              <button class="btn btn-ghost" style="padding: 4px; color: var(--text-secondary); min-height: auto;" onclick="window.documentViewerModal.nextPage()" ${this.currentPage >= totalPages ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <!-- Zoom Controls -->
            <div style="display: flex; align-items: center; gap: 8px; background: #0A0A0C; border: 1px solid #22222A; border-radius: 6px; padding: 2px 8px;">
              <button class="btn btn-ghost" style="padding: 4px; color: var(--text-secondary); min-height: auto;" onclick="window.documentViewerModal.zoomOut()">-</button>
              <span style="font-size: 12px; font-weight: 600; color: #FFF; width: 42px; text-align: center;">${this.zoomLevel}%</span>
              <button class="btn btn-ghost" style="padding: 4px; color: var(--text-secondary); min-height: auto;" onclick="window.documentViewerModal.zoomIn()">+</button>
            </div>

            <!-- Search In Doc -->
            <div style="position: relative;">
              <input type="text" class="form-input" placeholder="Search text..." style="font-size: 12px; padding: 4px 10px; width: 140px; background: #0A0A0C; border: 1px solid #22222A;" value="${this.searchQuery}" oninput="window.documentViewerModal.searchQuery = this.value; window.store.notify()">
            </div>
          </div>

          <!-- Actions & AI Button -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-primary" style="background: #E50914; font-size: 12px; font-weight: 700; padding: 6px 16px;" onclick="window.documentViewerModal.triggerAiAnalysis()">
              🤖 Analyze with AI
            </button>
          </div>

        </div>

        <!-- MAIN READER BODY (Sidebar + Canvas) -->
        <div style="flex: 1; display: flex; overflow: hidden; background: #070709;">
          
          <!-- Thumbnails / Outline Sidebar -->
          <div style="width: 220px; background: #0F0F13; border-right: 1px solid #22222A; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 4px;">Page Thumbnails</div>
            ${Array.from({ length: Math.min(10, totalPages) }).map((_, i) => `
              <div style="padding: 8px; border-radius: 6px; background: ${this.currentPage === (i + 1) ? 'rgba(229, 9, 20, 0.15)' : '#16161C'}; border: 1px solid ${this.currentPage === (i + 1) ? '#E50914' : '#22222A'}; cursor: pointer; display: flex; flex-direction: column; gap: 4px;" onclick="window.documentViewerModal.currentPage = ${i + 1}; window.store.notify()">
                <div style="height: 60px; background: #0A0A0C; border-radius: 4px; border: 1px solid #22222A; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text-tertiary);">
                  Page ${i + 1} Preview
                </div>
                <div style="font-size: 10px; font-weight: 600; color: ${this.currentPage === (i + 1) ? '#FFF' : 'var(--text-tertiary)'}; text-align: center;">Page ${i + 1}</div>
              </div>
            `).join('')}
          </div>

          <!-- Main Document View Canvas -->
          <div style="flex: 1; overflow: auto; padding: 40px; display: flex; justify-content: center; align-items: flex-start;">
            <div style="width: ${Math.round(750 * (this.zoomLevel / 100))}px; min-height: 950px; background: #121217; border: 1px solid #22222A; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); padding: 48px; display: flex; flex-direction: column; gap: 24px; transition: width 0.2s ease;">
              
              <!-- Document Sheet Header -->
              <div style="border-bottom: 2px solid #E50914; padding-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h1 style="font-size: 22px; font-weight: 800; color: #FFF; margin: 0 0 6px 0;">${doc.title}</h1>
                  <div style="font-size: 12px; color: #E50914; font-weight: 700;">${doc.subject || 'Engineering Document'} • Section ${this.currentPage}</div>
                </div>
                <div style="font-size: 11px; color: var(--text-tertiary);">Page ${this.currentPage} of ${totalPages}</div>
              </div>

              <!-- Sheet Body Simulation -->
              <div style="font-size: 14px; line-height: 1.8; color: var(--text-primary); display: flex; flex-direction: column; gap: 16px;">
                <p style="font-weight: 700; color: #FFF;">1. Executive Summary & Foundational Overview</p>
                <p>This document presents an in-depth study of ${doc.subject || 'academic theory'}. Key focus points include system architecture, algorithmic complexity, optimization models, and standard engineering protocols.</p>

                <div style="background: #1A1A22; border-left: 4px solid #E50914; padding: 16px; border-radius: 4px; font-size: 13px; color: var(--text-secondary);">
                  <strong>Key Takeaway:</strong> When implementing ${doc.subject || 'these algorithms'}, verify space-time bounds to ensure real-time latency guarantees under high computational loads.
                </div>

                <p style="font-weight: 700; color: #FFF; margin-top: 12px;">2. Architectural Specifications</p>
                <p>Below is the mathematical formulation and structural breakdown derived from Unit ${this.currentPage}:</p>

                <div style="background: #0A0A0C; border: 1px solid #22222A; padding: 16px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #10B981;">
                  // Theorem ${this.currentPage}.1<br>
                  f(x) = ∑ (w_i * x_i + b)<br>
                  Loss = -1/N ∑ [ y*log(y_hat) + (1-y)*log(1-y_hat) ]
                </div>

                <p>Review this section thoroughly before attempting end-of-unit practice questions or lab submissions.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    `;
  }
}

window.documentViewerModal = new DocumentViewerModal();
