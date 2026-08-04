/**
 * PLANIX V5 ANALYTICS VIEW — Productivity Analytics & Growth Velocity
 * Task completion trends, habit consistency rate, goal progress charts.
 */

class AnalyticsView {
  render(state) {
    const tasks = state.tasks || [];
    const habits = state.habits || [];
    const goals = state.goals || [];
    const doneTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const taskPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    const habitsDone = habits.filter(h => h.completedToday).length;
    const habitPct = habits.length > 0 ? Math.round((habitsDone / habits.length) * 100) : 0;

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Analytics</h1>
            <p class="page-description">Productivity trends, execution speed, and habit consistency metrics.</p>
          </div>
        </div>

        <!-- Metric Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-primary);">${doneTasks}/${totalTasks}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin: 2px 0 10px;">Tasks Completed</div>
            <div class="progress-track"><div class="progress-fill" style="width: ${taskPct}%;"></div></div>
          </div>

          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--color-success);">${habitsDone}/${habits.length}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin: 2px 0 10px;">Habits Done Today</div>
            <div class="progress-track"><div class="progress-fill progress-fill-emerald" style="width: ${habitPct}%;"></div></div>
          </div>

          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-secondary);">${goals.length}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Active Strategic Goals</div>
          </div>

          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-indigo);">🔥 ${state.user.streak || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Current Streak (Days)</div>
          </div>
        </div>

        <!-- Goal Milestone Velocity Chart -->
        <div class="card" style="padding: var(--spacing-5); margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">Goal Progress Velocity</h3>
          ${goals.length === 0 ? `
            <div class="empty-state" style="padding: 24px;">
              <div class="empty-state-icon">📊</div>
              <div class="empty-state-title">No goals to analyze</div>
              <div class="empty-state-desc">Create strategic goals to view velocity progress charts.</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${goals.map(g => `
                <div style="display: flex; align-items: center; gap: 14px; padding: 12px; background: var(--bg-input); border-radius: var(--radius-md);">
                  <span style="flex: 1; font-size: 14px; font-weight: 600; color: var(--text-primary);">${g.title}</span>
                  <span style="font-size: 13px; font-weight: 800; color: ${(g.progress || 0) >= 80 ? 'var(--color-success)' : 'var(--accent-primary)'}; min-width: 44px; text-align: right;">${g.progress || 0}%</span>
                  <div class="progress-track" style="width: 140px;"><div class="progress-fill" style="width: ${g.progress || 0}%;"></div></div>
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
