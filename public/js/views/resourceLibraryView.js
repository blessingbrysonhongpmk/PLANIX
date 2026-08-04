/**
 * PLANIX RESOURCE LIBRARY — Bookmarked learning resources with search
 */

class ResourceLibraryView {
  constructor() { this.searchQuery = ''; }

  render(state) {
    let resources = state.resources || [];
    if (this.searchQuery) resources = resources.filter(r => (r.title || '').toLowerCase().includes(this.searchQuery.toLowerCase()));

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Resources</h1>
            <p class="page-description">Save useful articles, videos, and documentation links in one place.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.resourceLibraryView.addResource()">+ Add Resource</button>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <input type="text" class="form-input" placeholder="Search resources..." style="max-width: 300px;" value="${this.searchQuery}" oninput="window.resourceLibraryView.searchQuery = this.value; window.store.notify()">
        </div>

        ${resources.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">🔖</div>
            <div class="empty-state-title">${this.searchQuery ? 'No matching resources' : 'No resources saved'}</div>
            <div class="empty-state-desc">Save useful links, articles, and documentation so you can find them quickly later.</div>
            ${!this.searchQuery ? `<button class="btn btn-primary" onclick="window.resourceLibraryView.addResource()">Add First Resource</button>` : ''}
          </div></div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${resources.map(r => `
              <div class="card" style="padding: var(--spacing-4); display: flex; align-items: center; gap: 14px;">
                <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--bg-input); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">${r.type === 'video' ? '🎥' : r.type === 'article' ? '📄' : '🔗'}</div>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-size: 15px; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.title}</div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">${r.category || 'General'}</div>
                </div>
                ${r.url ? `<a href="${r.url}" target="_blank" class="btn btn-secondary" style="font-size: 12px;">Open ↗</a>` : ''}
                <button class="btn btn-icon" onclick="window.resourceLibraryView.deleteResource('${r.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  addResource() {
    const title = prompt('Resource name:');
    if (!title) return;
    const url = prompt('Link (URL):') || '';
    window.store.setState(prev => ({ resources: [...(prev.resources || []), { id: `res_${Date.now()}`, title, url, type: 'link', category: 'General' }] }));
    if (window.showToast) window.showToast('Resource saved!', 'success');
  }

  deleteResource(id) {
    if (!confirm('Remove this resource?')) return;
    window.store.setState({ resources: (window.store.state.resources || []).filter(r => r.id !== id) });
  }
}

window.resourceLibraryView = new ResourceLibraryView();
