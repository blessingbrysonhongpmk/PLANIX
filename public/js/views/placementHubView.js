/**
 * PLANIX PLACEMENT HUB — Company application pipeline tracker
 */

class PlacementHubView {
  render(state) {
    const placements = state.placements || [];
    const statusColors = { applied: 'var(--text-tertiary)', oa: 'var(--accent-secondary)', interview: 'var(--accent-primary)', offer: 'var(--color-success)' };

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Placements</h1>
            <p class="page-description">Track company applications through every stage — from application to offer.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.placementHubView.addCompany()">+ Add Application</button>
          </div>
        </div>

        ${placements.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">💼</div>
            <div class="empty-state-title">No applications tracked</div>
            <div class="empty-state-desc">Start tracking your job applications to see your pipeline progress at a glance.</div>
            <button class="btn btn-primary" onclick="window.placementHubView.addCompany()">Add First Application</button>
          </div></div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
            ${placements.map(p => `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0;">${p.company}</h3>
                    <button class="btn btn-icon" onclick="window.placementHubView.deleteCompany('${p.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                  </div>
                  <div style="font-size: 13px; color: var(--accent-primary); font-weight: 600; margin-top: 4px;">${p.role}</div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 6px;">Applied: ${p.date || 'N/A'}</div>
                </div>
                <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 11px; padding: 4px 10px; border-radius: var(--radius-full); font-weight: 700; color: ${statusColors[p.status] || statusColors.applied}; background: ${p.status === 'offer' ? 'rgba(16,185,129,0.15)' : 'var(--bg-input)'}; border: 1px solid var(--border-subtle);">
                    ${(p.status || 'applied').toUpperCase()}
                  </span>
                  <select class="form-input" style="width: auto; padding: 4px 8px; font-size: 11px; min-height: auto;" onchange="window.placementHubView.updateStatus('${p.id}', this.value)">
                    <option value="applied" ${p.status === 'applied' ? 'selected' : ''}>Applied</option>
                    <option value="oa" ${p.status === 'oa' ? 'selected' : ''}>Online Assessment</option>
                    <option value="interview" ${p.status === 'interview' ? 'selected' : ''}>Interview</option>
                    <option value="offer" ${p.status === 'offer' ? 'selected' : ''}>Offer</option>
                  </select>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  addCompany() {
    const company = prompt('Company name:');
    if (!company) return;
    const role = prompt('Role:') || 'Software Developer';
    window.store.setState(prev => ({ placements: [...prev.placements, { id: `pl_${Date.now()}`, company, role, status: 'applied', date: new Date().toISOString().slice(0, 10) }] }));
    if (window.showToast) window.showToast('Application tracked!', 'success');
  }

  updateStatus(id, status) {
    window.store.setState({ placements: window.store.state.placements.map(p => p.id === id ? { ...p, status } : p) });
    if (status === 'offer' && window.showToast) window.showToast('🎉 Congratulations on the offer!', 'success');
  }

  deleteCompany(id) {
    if (!confirm('Remove this application?')) return;
    window.store.setState({ placements: window.store.state.placements.filter(p => p.id !== id) });
  }
}

window.placementHubView = new PlacementHubView();
