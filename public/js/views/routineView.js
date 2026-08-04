/**
 * PLANIX ROUTINE VIEW — Time blocking and daily schedule generator
 */

class RoutineView {
  render(state) {
    const blocks = state.routineBlocks || [];
    
    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Routine</h1>
            <p class="page-description">Design your perfect day with time-blocking. Stay structured without being rigid.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.routineView.addBlock()">+ Add Time Block</button>
          </div>
        </div>

        ${blocks.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">⏱️</div>
            <div class="empty-state-title">No routine set</div>
            <div class="empty-state-desc">Time blocking helps you focus by assigning a specific job to every hour of your day.</div>
            <button class="btn btn-primary" onclick="window.routineView.addBlock()">Create First Time Block</button>
          </div></div>
        ` : `
          <div class="card" style="padding: var(--spacing-4);">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${blocks.sort((a,b) => a.time.localeCompare(b.time)).map(b => `
                <div style="display: flex; align-items: center; gap: 16px; padding: 14px 16px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent-primary);">
                  <div style="width: 70px; font-size: 15px; font-weight: 800; color: var(--text-primary);">${b.time}</div>
                  <div style="flex: 1;">
                    <div style="font-size: 15px; font-weight: 600; color: var(--text-primary);">${b.title}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">${b.duration || '60m'}</div>
                  </div>
                  <button class="btn btn-icon" onclick="window.routineView.deleteBlock('${b.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                </div>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  }

  addBlock() {
    const title = prompt('Block name (e.g. Deep Work, Workout):');
    if (!title) return;
    const time = prompt('Start time (e.g. 09:00):') || '09:00';
    const duration = prompt('Duration (e.g. 90m):') || '60m';
    window.store.setState(prev => ({ routineBlocks: [...(prev.routineBlocks || []), { id: `rb_${Date.now()}`, title, time, duration }] }));
  }

  deleteBlock(id) {
    if (!confirm('Delete this time block?')) return;
    window.store.setState({ routineBlocks: (window.store.state.routineBlocks || []).filter(b => b.id !== id) });
  }
}

window.routineView = new RoutineView();
