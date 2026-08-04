/**
 * PLANIX HABITS VIEW — One-click habit completion, streak tracking
 */

class HabitsView {
  render(state) {
    const habits = state.habits || [];
    const doneCount = habits.filter(h => h.completedToday).length;

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Habits</h1>
            <p class="page-description">Build consistent daily habits. One click to mark done. Streaks keep you motivated.</p>
          </div>
          <div class="page-actions">
            ${habits.length > 0 ? `<span style="font-size: 13px; color: var(--text-secondary); margin-right: 8px;">${doneCount}/${habits.length} done today</span>` : ''}
            <button class="btn btn-primary" onclick="window.habitsView.addHabit()">+ New Habit</button>
          </div>
        </div>

        ${habits.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">🔁</div>
              <div class="empty-state-title">No habits yet</div>
              <div class="empty-state-desc">Small daily actions lead to big results. Start with one simple habit like "Read for 15 minutes".</div>
              <button class="btn btn-primary" onclick="window.habitsView.addHabit()">Create Your First Habit</button>
            </div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${habits.map(h => `
              <div class="card" style="padding: var(--spacing-4); display: flex; align-items: center; gap: 16px; transition: background var(--transition-fast);">
                <button class="btn ${h.completedToday ? 'btn-primary' : 'btn-secondary'}" style="width: 44px; height: 44px; padding: 0; border-radius: var(--radius-md); font-size: 18px; flex-shrink: 0;" onclick="window.habitsView.toggleHabit('${h.id}')" aria-label="${h.completedToday ? 'Completed' : 'Mark as done'}">
                  ${h.completedToday ? '✓' : ''}
                </button>
                <div style="flex: 1;">
                  <div style="font-size: 15px; font-weight: 600; color: ${h.completedToday ? 'var(--text-tertiary)' : 'var(--text-primary)'}; text-decoration: ${h.completedToday ? 'line-through' : 'none'};">${h.name}</div>
                  <div style="font-size: 12px; color: var(--accent-secondary); font-weight: 600; margin-top: 2px;">🔥 ${h.streak || 0} day streak</div>
                </div>
                <button class="btn btn-icon" onclick="window.habitsView.deleteHabit('${h.id}')" title="Delete habit"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  addHabit() {
    const name = prompt('Habit name (e.g. Read 15 minutes, Exercise, Code 1 problem):');
    if (!name) return;
    window.store.setState(prev => ({ habits: [...prev.habits, { id: `h_${Date.now()}`, name, streak: 0, completedToday: false }] }));
    if (window.showToast) window.showToast('Habit created!', 'success');
  }

  toggleHabit(id) {
    const habits = window.store.state.habits.map(h => {
      if (h.id === id) {
        const done = !h.completedToday;
        return { ...h, completedToday: done, streak: done ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1) };
      }
      return h;
    });
    window.store.setState({ habits });
    const habit = habits.find(h => h.id === id);
    if (habit?.completedToday && window.showToast) window.showToast('Habit done! 🔥', 'success');
  }

  deleteHabit(id) {
    if (!confirm('Remove this habit?')) return;
    window.store.setState({ habits: window.store.state.habits.filter(h => h.id !== id) });
  }
}

window.habitsView = new HabitsView();
