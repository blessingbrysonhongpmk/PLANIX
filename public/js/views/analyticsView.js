/**
 * PLANIX ANALYTICS VIEW — Productivity trends and insights
 */

class AnalyticsView {
  render(state) {
    const tasks = state.tasks || [];
    const habits = state.habits || [];
    const goals = state.goals || [];
    const done = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const habitsDone = habits.filter(h => h.completedToday).length;

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Analytics</h1>
            <p class="page-description">See your productivity trends, habit consistency, and goal progress at a glance.</p>
          </div>
        </div>

        <!-- Overview Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-primary);">${done}/${total}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Tasks Completed</div>
            <div class="progress-track" style="margin-top: 10px;"><div class="progress-fill" style="width: ${pct}%;"></div></div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--color-success);">${habitsDone}/${habits.length}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Habits Today</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-secondary);">${goals.length}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Active Goals</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-indigo);">🔥 ${state.user.streak || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Day Streak</div>
          </div>
        </div>

        <!-- Goal Progress -->
        <div class="card" style="padding: var(--spacing-5);">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">Goal Progress</h3>
          ${goals.length === 0 ? `
            <div class="empty-state" style="padding: 24px;">
              <div class="empty-state-icon">📊</div>
              <div class="empty-state-title">No goals to analyze</div>
              <div class="empty-state-desc">Create goals first to see progress charts here.</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${goals.map(g => `
                <div style="display: flex; align-items: center; gap: 14px; padding: 12px; background: var(--bg-input); border-radius: var(--radius-md);">
                  <span style="flex: 1; font-size: 14px; font-weight: 500; color: var(--text-primary);">${g.title}</span>
                  <span style="font-size: 13px; font-weight: 700; color: ${(g.progress || 0) >= 80 ? 'var(--color-success)' : 'var(--accent-primary)'}; min-width: 42px; text-align: right;">${g.progress || 0}%</span>
                  <div class="progress-track" style="width: 120px;"><div class="progress-fill" style="width: ${g.progress || 0}%;"></div></div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

window.analyticsView = new AnalyticsView();
