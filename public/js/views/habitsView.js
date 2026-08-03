/**
 * PLANIX HABITS VIEW
 * Habit Tracker with streak counters (🔥), simple checks, and instant API CRUD
 */

class HabitsView {
  render(state) {
    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🔁</span> Daily Habit Tracker
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Build powerful daily habits step by step and increase your daily streak!
            </p>
          </div>

          <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.habitsView.showAddHabitModal()">
            + New Habit
          </button>
        </div>

        <!-- Add Habit Inline Form -->
        <div id="add-habit-container" style="display: none; background: #141417; border: 1px solid #27272A; border-radius: 14px; padding: 16px; margin-bottom: 24px;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <input type="text" id="habit-name-input" class="form-input" placeholder="Habit name e.g. Drink 2L water / 30m Reading..." style="flex: 1; background: #1C1C21; border-color: #3F3F46; color: white; padding: 10px; border-radius: 8px;">
            <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 18px; font-weight: 600;" onclick="window.habitsView.saveNewHabit()">Save Habit</button>
            <button class="btn" style="background: #27272A; color: white; border: none; border-radius: 8px; padding: 10px 14px;" onclick="window.habitsView.hideAddHabitModal()">Cancel</button>
          </div>
        </div>

        <!-- Habit Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          ${state.habits.map(habit => `
            <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0;">${habit.name}</h3>
                  <button class="btn" style="background: transparent; color: #71717A; border: none; font-size: 14px;" title="Delete habit" onclick="window.habitsView.deleteHabit('${habit.id}')">🗑️</button>
                </div>
                <div style="font-size: 13px; color: #F5B700; font-weight: 600; margin-top: 6px;">
                  🔥 ${habit.streak} Day Streak
                </div>
              </div>

              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #27272A; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 13px; color: ${habit.completedToday ? '#10B981' : '#A1A1AA'};">
                  ${habit.completedToday ? '✅ Done Today!' : '⏳ Today Pending'}
                </span>
                <button class="btn" style="background: ${habit.completedToday ? '#10B981' : '#E50914'}; color: white; border: none; border-radius: 8px; padding: 8px 16px; font-weight: 700; cursor: pointer;" onclick="window.habitsView.toggleHabit('${habit.id}')">
                  ${habit.completedToday ? 'Completed ✔' : 'Mark Done'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  showAddHabitModal() {
    const el = document.getElementById('add-habit-container');
    if (el) el.style.display = 'block';
  }

  hideAddHabitModal() {
    const el = document.getElementById('add-habit-container');
    if (el) el.style.display = 'none';
  }

  async saveNewHabit() {
    const input = document.getElementById('habit-name-input');
    if (!input || !input.value.trim()) return;

    const name = input.value.trim();
    input.value = '';
    this.hideAddHabitModal();

    const newHabit = {
      id: `h_${Date.now()}`,
      name,
      streak: 1,
      completedToday: true,
      category: 'personal'
    };

    window.store.setState(prev => ({ habits: [...prev.habits, newHabit] }));
    await window.apiClient.post('/habits', newHabit);
  }

  async toggleHabit(habitId) {
    const habits = window.store.state.habits.map(h => {
      if (h.id === habitId) {
        const completedToday = !h.completedToday;
        const streak = completedToday ? h.streak + 1 : Math.max(0, h.streak - 1);
        return { ...h, completedToday, streak };
      }
      return h;
    });
    window.store.setState({ habits });
    await window.apiClient.put(`/habits/${habitId}`, { completedToday: true });
  }

  async deleteHabit(habitId) {
    const habits = window.store.state.habits.filter(h => h.id !== habitId);
    window.store.setState({ habits });
    await window.apiClient.delete(`/habits/${habitId}`);
  }
}

window.habitsView = new HabitsView();
