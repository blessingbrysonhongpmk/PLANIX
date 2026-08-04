/**
 * PLANIX V5 RESOURCE LIBRARY VIEW — Bookmarked Learning Links & Guides
 */

class ResourceLibraryView {
  constructor() { this.searchQuery = ''; }

  render(state) {
    let resources = state.resources || [];
    if (this.searchQuery) {
      resources = resources.filter(r => ((r.title || '') + (r.category || '')).toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Resources</h1>
            <p class="page-description">Curate and search documentation links, research papers, and technical articles.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.modalComponent.open('resource')">+ Save Resource</button>
          </div>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom: 20px;">
          <input type="text" class="form-input" placeholder="Search resources by title or category..." style="max-width: 320px;" value="${this.searchQuery}" oninput="window.resourceLibraryView.searchQuery = this.value; window.store.notify()">
        </div>

        ${resources.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">🔖</div>
              <div class="empty-state-title">${this.searchQuery ? 'No matching resources' : 'No resources saved yet'}</div>
              <div class="empty-state-desc">Save documentation links and guides to build your personal engineering knowledge hub.</div>
              ${!this.searchQuery ? `<button class="btn btn-primary" onclick="window.modalComponent.open('resource')">Save First Resource</button>` : ''}
            </div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${resources.map(r => `
              <div class="card" style="padding: var(--spacing-4); display: flex; align-items: center; gap: 14px;">
                <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--bg-input); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🔗</div>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-size: 15px; font-weight: 700; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.title}</div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Category: ${r.category || 'General'}</div>
                </div>
                ${r.url ? `<a href="${r.url}" target="_blank" class="btn btn-secondary" style="font-size: 12px;">Open ↗</a>` : ''}
                <button class="btn btn-icon" onclick="window.resourceLibraryView.confirmDelete('${r.id}')" title="Delete resource">
                  <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Remove Resource',
      message: 'Are you sure you want to remove this resource link?',
      onConfirm: () => {
        window.store.setState({ resources: (window.store.state.resources || []).filter(r => r.id !== id) });
        if (window.showToast) window.showToast('Resource removed', 'info');
      }
    });
  }
}

window.resourceLibraryView = new ResourceLibraryView();
