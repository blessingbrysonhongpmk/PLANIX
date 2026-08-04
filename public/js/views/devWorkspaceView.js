/**
 * PLANIX V5 DEV WORKSPACE VIEW — Quick Terminal Commands & Code Snippets
 */

class DevWorkspaceView {
  render(state) {
    const snippets = state.devSnippets || state.snippets || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Dev Workspace</h1>
            <p class="page-description">Quick repository of commands, terminal shortcuts, and code templates.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.modalComponent.open('snippet')">+ Save Snippet</button>
          </div>
        </div>

        ${snippets.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">💻</div>
              <div class="empty-state-title">No code snippets saved</div>
              <div class="empty-state-desc">Save your most frequently used Git commands, PyTorch templates, or Docker scripts for instant 1-click copy.</div>
              <button class="btn btn-primary" onclick="window.modalComponent.open('snippet')">Save First Snippet</button>
            </div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${snippets.map(s => `
              <div class="card" style="padding: var(--spacing-4);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0;">${s.title}</h3>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px; min-height: auto;" onclick="navigator.clipboard.writeText(\`${(s.code || '').replace(/`/g, '\\`')}\`); if(window.showToast) window.showToast('Copied to clipboard! 📋', 'success')">Copy Code</button>
                    <button class="btn btn-icon" onclick="window.devWorkspaceView.confirmDelete('${s.id}')" title="Delete snippet">
                      <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <pre style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); overflow-x: auto; white-space: pre-wrap;">${s.code || ''}</pre>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Snippet',
      message: 'Are you sure you want to delete this snippet?',
      onConfirm: () => {
        const listKey = window.store.state.devSnippets ? 'devSnippets' : 'snippets';
        window.store.setState({ [listKey]: (window.store.state[listKey] || []).filter(s => s.id !== id) });
        if (window.showToast) window.showToast('Snippet deleted', 'info');
      }
    });
  }
}

window.devWorkspaceView = new DevWorkspaceView();
