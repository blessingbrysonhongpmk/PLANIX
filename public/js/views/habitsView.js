/**
 * PLANIX HABIT TRACKER VIEW
 * GitHub-Style Annual Contribution Heatmap Grid, Streak Cards & Consistency Score
 */

class HabitsView {
  render(state) {
    const habits = state.habits || [
      { id: 'h1', title: 'Morning Workout & Stretch', category: 'health', streak: 7, completionHistory: {} },
      { id: 'h2', title: 'Read 20 Pages of Book', category: 'study', streak: 12, completionHistory: {} },
      { id: 'h3', title: 'Daily Bible Reading', category: 'personal', streak: 14, completionHistory: {} }
    ];

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Habit Tracker & Heatmap 🔥</div>
            <div class="view-subtitle">Weekly streaks • Annual contribution matrix • Consistency score</div>
          </div>
          <button class="btn btn-primary" onclick="window.habitsView.createNewHabit()">+ New Habit</button>
        </div>

        <!-- Consistency Matrix Card -->
        <div class="card" style="margin-bottom: 28px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: 700; font-size: 18px;">2026 Consistency Heatmap Grid</div>
              <div style="font-size: 12px; color: var(--text-secondary);">Visualizing habit check-in frequency over 26 weeks</div>
            </div>
            <div style="font-size: 20px; font-weight: 800; color: var(--accent-emerald);">94.2% Success Rate</div>
          </div>

          <div class="heatmap-grid">
            ${Array.from({ length: 182 }).map((_, i) => {
              const level = i % 5 === 0 ? 'level-4' : i % 3 === 0 ? 'level-3' : i % 2 === 0 ? 'level-2' : 'level-1';
              return `<div class="heatmap-cell ${level}" title="Day ${i + 1}: Completed"></div>`;
            }).join('')}
          </div>
        </div>

        <h3 style="font-family: var(--font-display); font-size: 20px; margin-bottom: 16px;">Active Habits (${habits.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
          ${habits.map(h => `
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span class="badge badge-health">${h.category || 'health'}</span>
                <span style="font-size: 14px; font-weight: 800; color: var(--accent-gold);">🔥 ${h.streak || 0} Day Streak</span>
              </div>

              <div style="font-weight: 700; font-size: 16px; margin-bottom: 14px;">${h.title}</div>

              <button class="btn btn-indigo" style="width: 100%;" onclick="window.habitsView.checkinHabit('${h.id}')">
                ✓ Log Today's Check-in
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  async createNewHabit() {
    const title = prompt('Enter new habit title (e.g., "Daily 30-min Dance Practice"):');
    if (!title || !title.trim()) return;

    const res = await window.apiClient.post('/habits', { title });
    if (res.success) {
      window.store.setState(prev => ({
        habits: [res.habit, ...prev.habits]
      }));
    }
  }

  async checkinHabit(id) {
    const res = await window.apiClient.post(`/habits/${id}/checkin`, {});
    if (res.success) {
      window.store.setState(prev => ({
        habits: prev.habits.map(h => h.id === id ? res.habit : h)
      }));
    }
  }
}

window.habitsView = new HabitsView();
