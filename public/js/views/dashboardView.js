/**
 * PLANIX DASHBOARD — "What do I need to do today?"
 * Only shows what users need RIGHT NOW. Never a wall of widgets.
 * Time-aware greeting, today's focus, upcoming deadlines, habit progress, quick add.
 */

class DashboardView {
  render(state) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const pendingTasks = state.tasks.filter(t => !t.completed);
    const completedToday = state.tasks.filter(t => t.completed);
    const totalHabits = state.habits.length;
    const doneHabits = state.habits.filter(h => h.completedToday).length;
    const habitPercent = totalHabits > 0 ? Math.round((doneHabits / totalHabits) * 100) : 0;

    const topGoal = state.goals.length > 0 ? state.goals[0] : null;
    const recentNotes = (state.notes || []).slice(0, 3);

    return `
      <div class="view-container animate-fade-in">

        <!-- Greeting -->
        <div style="margin-bottom: 32px;">
          <h1 class="page-title" style="font-size: 28px; letter-spacing: -0.03em;">
            ${greeting}, ${state.user.name || 'there'}.
          </h1>
          <p class="page-description" style="margin-top: 4px;">${dateStr}</p>
        </div>

        <!-- Quick Add Strip -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px;">
          <button class="btn btn-primary" style="gap: 6px;" onclick="window.store.setState({ currentView: 'tasks' })">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Task
          </button>
          <button class="btn btn-secondary" onclick="window.store.setState({ currentView: 'goals' })">New Goal</button>
          <button class="btn btn-secondary" onclick="window.store.setState({ currentView: 'notes' })">Quick Note</button>
          <button class="btn btn-secondary" onclick="window.store.setState({ currentView: 'study' })">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Focus Mode
          </button>
        </div>

        <!-- Main Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

          <!-- TODAY'S FOCUS (Left Column) -->
          <div style="display: flex; flex-direction: column; gap: 20px;">

            <!-- Today's Priority Goal -->
            ${topGoal ? `
              <div class="card" style="border-left: 3px solid var(--accent-primary);">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-primary); letter-spacing: 0.5px; margin-bottom: 8px;">Today's Focus</div>
                <h3 style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin: 0 0 10px 0;">${topGoal.title}</h3>
                <div class="progress-track" style="margin-bottom: 8px;">
                  <div class="progress-fill" style="width: ${topGoal.progress || 0}%;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; color: var(--text-tertiary);">${topGoal.progress || 0}% complete</span>
                  <span style="font-size: 12px; color: var(--text-tertiary);">Deadline: ${topGoal.targetDate || 'Not set'}</span>
                </div>
              </div>
            ` : `
              <div class="card">
                <div class="empty-state" style="padding: 28px 16px;">
                  <div class="empty-state-icon">🎯</div>
                  <div class="empty-state-title">Set your first goal</div>
                  <div class="empty-state-desc">Goals give your daily tasks direction and purpose.</div>
                  <button class="btn btn-primary" onclick="window.store.setState({ currentView: 'goals' })">Create Goal</button>
                </div>
              </div>
            `}

            <!-- Today's Tasks -->
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">Today's Tasks</h3>
                <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'tasks' })" style="font-size: 12px; color: var(--accent-primary); text-decoration: none; font-weight: 600;">View all →</a>
              </div>

              ${pendingTasks.length === 0 ? `
                <div class="empty-state" style="padding: 24px 12px;">
                  <div class="empty-state-icon">✅</div>
                  <div class="empty-state-title">${completedToday.length > 0 ? 'All done for today!' : 'No tasks yet'}</div>
                  <div class="empty-state-desc">${completedToday.length > 0 ? 'Great work. Take a break or add more.' : 'Add your first task to get started.'}</div>
                  <button class="btn btn-primary" onclick="window.store.setState({ currentView: 'tasks' })">Add Task</button>
                </div>
              ` : `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${pendingTasks.slice(0, 5).map(task => `
                    <div class="card-sm" style="display: flex; align-items: center; gap: 12px; background: var(--bg-input); border: 1px solid var(--border-subtle); cursor: pointer; transition: background var(--transition-fast);"
                         onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='var(--bg-input)'">
                      <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--accent-primary); cursor: pointer; flex-shrink: 0;" onchange="window.dashboardView.completeTask('${task.id}')">
                      <span style="flex: 1; font-size: 14px; color: var(--text-primary);">${task.text}</span>
                      <span class="badge badge-${task.priority === 'high' ? 'urgent' : task.priority === 'low' ? 'health' : 'work'}" style="font-size: 10px;">${(task.priority || 'normal').toUpperCase()}</span>
                    </div>
                  `).join('')}
                  ${pendingTasks.length > 5 ? `<div style="font-size: 12px; color: var(--text-tertiary); text-align: center; padding: 6px;">+${pendingTasks.length - 5} more tasks</div>` : ''}
                </div>
              `}
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div style="display: flex; flex-direction: column; gap: 20px;">

            <!-- Habit Progress -->
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">Habit Progress</h3>
                <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'habits' })" style="font-size: 12px; color: var(--accent-primary); text-decoration: none; font-weight: 600;">Manage →</a>
              </div>

              ${totalHabits === 0 ? `
                <div class="empty-state" style="padding: 24px 12px;">
                  <div class="empty-state-icon">🔁</div>
                  <div class="empty-state-title">Build your first habit</div>
                  <div class="empty-state-desc">Small daily habits lead to big results over time.</div>
                  <button class="btn btn-primary" onclick="window.store.setState({ currentView: 'habits' })">Add Habit</button>
                </div>
              ` : `
                <div style="text-align: center; padding: 8px 0 16px;">
                  <div style="font-size: 36px; font-weight: 800; color: ${habitPercent >= 80 ? 'var(--color-success)' : 'var(--text-primary)'};">${habitPercent}%</div>
                  <div style="font-size: 13px; color: var(--text-secondary);">${doneHabits} of ${totalHabits} habits completed today</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${state.habits.slice(0, 4).map(h => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                      <span style="font-size: 14px; color: var(--text-primary);">${h.name}</span>
                      <button class="btn ${h.completedToday ? 'btn-primary' : 'btn-secondary'}" style="padding: 4px 12px; font-size: 12px; min-height: auto;" onclick="window.dashboardView.toggleHabit('${h.id}')">
                        ${h.completedToday ? '✓ Done' : 'Mark Done'}
                      </button>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Quick Stats -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="card" style="text-align: center; padding: var(--spacing-5);">
                <div style="font-size: 28px; font-weight: 800; color: var(--accent-primary);">${state.coding?.leetcodeSolved || 0}</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Problems Solved</div>
              </div>
              <div class="card" style="text-align: center; padding: var(--spacing-5);">
                <div style="font-size: 28px; font-weight: 800; color: var(--color-success);">🔥 ${state.user.streak || 0}</div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Day Streak</div>
              </div>
            </div>

            <!-- Recent Notes -->
            ${recentNotes.length > 0 ? `
              <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">Recent Notes</h3>
                  <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'notes' })" style="font-size: 12px; color: var(--accent-primary); text-decoration: none; font-weight: 600;">View all →</a>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${recentNotes.map(n => `
                    <div style="padding: 10px 12px; background: var(--bg-input); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); cursor: pointer; transition: background var(--transition-fast);"
                         onclick="window.store.setState({ currentView: 'notes' })"
                         onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='var(--bg-input)'">
                      <div style="font-size: 14px; font-weight: 500; color: var(--text-primary);">${n.title || 'Untitled'}</div>
                      <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(n.content || '').substring(0, 60)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  async completeTask(taskId) {
    const tasks = window.store.state.tasks.map(t => {
      if (t.id === taskId) return { ...t, completed: true };
      return t;
    });
    window.store.setState({ tasks });
    if (window.showToast) window.showToast('Task completed! 🎉', 'success');
    try { await window.apiClient.put(`/tasks/${taskId}`, { completed: true }); } catch(e) {}
  }

  async toggleHabit(habitId) {
    const habits = window.store.state.habits.map(h => {
      if (h.id === habitId) {
        const done = !h.completedToday;
        return { ...h, completedToday: done, streak: done ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1) };
      }
      return h;
    });
    window.store.setState({ habits });
    if (window.showToast) window.showToast('Habit logged! 🔥', 'success');
    try { await window.apiClient.put(`/habits/${habitId}`, { completedToday: true }); } catch(e) {}
  }
}

window.dashboardView = new DashboardView();
