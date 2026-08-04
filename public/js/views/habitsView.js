/**
 * PLANIX V5 HABITS VIEW — Consistency Tracker & Heatmap Matrix
 * 30-day GitHub-style streak matrix, one-click habit completion, modal creation.
 */

class HabitsView {
  render(state) {
    const habits = state.habits || [];
    const doneCount = habits.filter(h => h.completedToday).length;

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Habits</h1>
            <p class="page-description">Build strong daily consistency. Track streaks and review your 30-day activity matrix.</p>
          </div>
          <div class="page-actions">
            ${habits.length > 0 ? `<span style="font-size: 13px; color: var(--text-secondary); margin-right: 8px;">${doneCount}/${habits.length} completed today</span>` : ''}
            <button class="btn btn-primary" onclick="window.modalComponent.open('habit')">+ New Habit</button>
          </div>
        </div>

        ${habits.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">🔁</div>
              <div class="empty-state-title">No habits tracked yet</div>
              <div class="empty-state-desc">Small daily habits build monumental long-term achievements. Start with something simple like "Code 1 problem daily".</div>
              <button class="btn btn-primary" onclick="window.modalComponent.open('habit')">Create Your First Habit</button>
            </div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${habits.map(h => `
              <div class="card" style="padding: var(--spacing-5); display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <button class="btn ${h.completedToday ? 'btn-primary' : 'btn-secondary'}" style="width: 44px; height: 44px; padding: 0; border-radius: var(--radius-md); font-size: 18px; flex-shrink: 0;" onclick="window.habitsView.toggleHabit('${h.id}')" aria-label="Toggle habit completion">
                      ${h.completedToday ? '✓' : ''}
                    </button>
                    <div>
                      <div style="font-size: 16px; font-weight: 700; color: ${h.completedToday ? 'var(--text-tertiary)' : 'var(--text-primary)'}; text-decoration: ${h.completedToday ? 'line-through' : 'none'};">${h.name}</div>
                      <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Category: ${h.category || 'General'}</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="text-align: right;">
                      <div style="font-size: 14px; font-weight: 800; color: var(--accent-secondary);">🔥 ${h.streak || 0} Day Streak</div>
                      <div style="font-size: 11px; color: var(--text-tertiary);">Best: ${Math.max(h.streak || 0, h.bestStreak || h.streak || 0)} Days</div>
                    </div>
                    <button class="btn btn-icon" onclick="window.habitsView.confirmDelete('${h.id}')" title="Delete habit">
                      <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>

                <!-- 30-Day Heatmap Grid -->
                <div style="padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                  <div style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">30-Day Activity Matrix</div>
                  <div class="heatmap-matrix">
                    <div class="heatmap-grid">
                      ${Array.from({ length: 30 }).map((_, i) => {
                        // Generate deterministic pattern derived from streak for demonstration
                        const isDone = (30 - i) <= (h.streak || 0);
                        const level = isDone ? 'level-4' : (i % 5 === 0) ? 'level-2' : 'level-0';
                        return `<div class="heatmap-cell ${level}" title="Day ${i + 1}"></div>`;
                      }).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  toggleHabit(id) {
    const habits = window.store.state.habits.map(h => {
      if (h.id === id) {
        const done = !h.completedToday;
        const newStreak = done ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1);
        return {
          ...h,
          completedToday: done,
          streak: newStreak,
          bestStreak: Math.max(newStreak, h.bestStreak || 0)
        };
      }
      return h;
    });
    window.store.setState({ habits });
    const habit = habits.find(h => h.id === id);
    if (habit?.completedToday && window.showToast) window.showToast('Habit logged! 🔥 Keep the streak going!', 'success');
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Remove Habit',
      message: 'Are you sure you want to remove this habit?',
      onConfirm: () => {
        window.store.setState({ habits: window.store.state.habits.filter(h => h.id !== id) });
        if (window.showToast) window.showToast('Habit removed', 'info');
      }
    });
  }
}

window.habitsView = new HabitsView();
