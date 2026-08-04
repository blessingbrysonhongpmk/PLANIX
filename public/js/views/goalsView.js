/**
 * PLANIX GOALS VIEW — Long-term goal tracker with milestones and deadlines
 */

class GoalsView {
  render(state) {
    const goals = state.goals || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Goals</h1>
            <p class="page-description">Set long-term targets, track milestone progress, and stay on course.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.goalsView.addGoal()">+ Create Goal</button>
          </div>
        </div>

        ${goals.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">🎯</div>
              <div class="empty-state-title">No goals yet</div>
              <div class="empty-state-desc">Goals give your daily work direction. Create your first goal to start tracking progress toward something meaningful.</div>
              <button class="btn btn-primary" onclick="window.goalsView.addGoal()">Create Your First Goal</button>
            </div>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
            ${goals.map(g => `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; flex: 1;">${g.title}</h3>
                    <button class="btn btn-icon" onclick="window.goalsView.deleteGoal('${g.id}')" title="Delete goal"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                  </div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 14px;">Deadline: ${g.targetDate || 'Not set'}</div>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                    <span>Progress</span>
                    <span style="font-weight: 700; color: ${(g.progress || 0) >= 80 ? 'var(--color-success)' : 'var(--accent-primary)'};">${g.progress || 0}%</span>
                  </div>
                  <div class="progress-track" style="margin-bottom: 14px;">
                    <div class="progress-fill" style="width: ${g.progress || 0}%;"></div>
                  </div>
                  <button class="btn btn-secondary" style="width: 100%; font-size: 13px;" onclick="window.goalsView.updateProgress('${g.id}')">+ Update Progress</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  addGoal() {
    const title = prompt('What is your goal? (e.g. Get placed at Google, Score 9.0 CGPA)');
    if (!title) return;
    const targetDate = prompt('Target deadline (YYYY-MM-DD):') || '';
    window.store.setState(prev => ({ goals: [...prev.goals, { id: `g_${Date.now()}`, title, targetDate, progress: 0 }] }));
    if (window.showToast) window.showToast('Goal created!', 'success');
  }

  updateProgress(id) {
    const val = prompt('Enter new progress percentage (0-100):');
    if (val === null) return;
    const num = Math.min(100, Math.max(0, parseInt(val) || 0));
    const goals = window.store.state.goals.map(g => g.id === id ? { ...g, progress: num } : g);
    window.store.setState({ goals });
    if (num >= 100 && window.showToast) window.showToast('🎉 Goal completed! Amazing!', 'success');
  }

  deleteGoal(id) {
    if (!confirm('Delete this goal? This cannot be undone.')) return;
    window.store.setState({ goals: window.store.state.goals.filter(g => g.id !== id) });
  }
}

window.goalsView = new GoalsView();
