/**
 * PLANIX DASHBOARD VIEW
 * Crimson Red & Obsidian Theme Overview
 */

class DashboardView {
  render(state) {
    const pendingTasks = state.tasks.filter(t => !t.completed);
    const completedTasks = state.tasks.filter(t => t.completed);
    const totalTasks = state.tasks.length;
    const completedHabits = state.habits.filter(h => h.completedToday);
    const totalHabits = state.habits.length;

    // Calculate Daily Productivity Score (0-100%)
    let taskScore = totalTasks > 0 ? (completedTasks.length / totalTasks) * 50 : 25;
    let habitScore = totalHabits > 0 ? (completedHabits.length / totalHabits) * 50 : 25;
    let productivityScore = Math.min(100, Math.round(taskScore + habitScore));

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1200px; margin: 0 auto;">
        
        <!-- Welcome Hero Header with Red Gradient -->
        <div style="background: linear-gradient(135deg, rgba(229, 9, 20, 0.15) 0%, rgba(20, 20, 23, 0.9) 100%); border: 1px solid rgba(229, 9, 20, 0.25); border-radius: 16px; padding: 28px; margin-bottom: 24px; position: relative; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="font-size: 12px; font-weight: 800; color: #E50914; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px;">
                ENGINEERING WORKSPACE OVERVIEW
              </div>
              <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin: 0;">
                Welcome back, ${state.user.name || 'Developer'}! 👋
              </h1>
              <p style="color: #A1A1AA; font-size: 14px; margin-top: 6px;">
                You have <strong style="color: #FFF;">${pendingTasks.length} active tasks</strong> and <strong style="color: #FFF;">${state.goals.length} goals</strong> in progress.
              </p>

              <!-- Quick Action Buttons -->
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px;">
                <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.store.setState({ currentView: 'tasks' })">
                  <span>➕</span> Add Task
                </button>
                <button class="btn" style="background: #1C1C21; color: white; border: 1px solid #3F3F46; border-radius: 10px; padding: 10px 18px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.store.setState({ currentView: 'study' })">
                  <span>⏱️</span> Focus Mode
                </button>
                <button class="btn" style="background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); border-radius: 10px; padding: 10px 16px; font-weight: 600; cursor: pointer;" onclick="window.dashboardView.startDayCheckIn()">
                  ☀️ Morning Check-In
                </button>
              </div>
            </div>

            <!-- Daily Productivity Score Card -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; text-align: center; min-width: 170px;">
              <div style="font-size: 11px; font-weight: 700; color: #A1A1AA; text-transform: uppercase;">Productivity Score</div>
              <div style="font-size: 38px; font-weight: 900; color: ${productivityScore >= 70 ? '#10B981' : '#E50914'}; margin: 4px 0;">
                ${productivityScore}%
              </div>
              <div style="font-size: 11px; color: #F5B700; font-weight: 600;">
                ${productivityScore >= 70 ? '🌟 Peak Performance' : '⚡ Building Velocity'}
              </div>
            </div>
          </div>

          <!-- Quick Stats Bar -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="background: rgba(255,255,255,0.03); padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="font-size: 12px; color: #A1A1AA;">Active Tasks</div>
              <div style="font-size: 22px; font-weight: 800; color: #E50914; margin-top: 2px;">${pendingTasks.length}</div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="font-size: 12px; color: #A1A1AA;">Daily Habits Done</div>
              <div style="font-size: 22px; font-weight: 800; color: #10B981; margin-top: 2px;">${completedHabits.length} / ${state.habits.length}</div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="font-size: 12px; color: #A1A1AA;">LeetCode Solved</div>
              <div style="font-size: 22px; font-weight: 800; color: #F5B700; margin-top: 2px;">⚡ ${state.coding?.leetcodeSolved || 0}</div>
            </div>

            <div style="background: rgba(255,255,255,0.03); padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <div style="font-size: 12px; color: #A1A1AA;">User Level</div>
              <div style="font-size: 18px; font-weight: 700; color: #FFF; margin-top: 2px;">Lvl ${state.user.level || 1} • ${state.user.levelTitle || 'Senior Architect'}</div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
          
          <!-- Column 1: Today's Tasks -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0; display: flex; align-items: center; gap: 8px;">
                <span>✅</span> Active Priorities
              </h3>
              <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'tasks' })" style="color: #E50914; font-size: 12px; font-weight: 600; text-decoration: none;">Manage →</a>
            </div>

            ${pendingTasks.length === 0 ? `
              <div style="text-align: center; padding: 36px 12px; color: #71717A; font-size: 14px; background: #1C1C21; border-radius: 12px; border: 1px dashed #27272A;">
                <div style="font-size: 24px; margin-bottom: 6px;">📝</div>
                <div>No pending tasks. Click <strong>'Add Task'</strong> to set a goal!</div>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${pendingTasks.slice(0, 5).map(task => `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #1C1C21; border-radius: 10px; border: 1px solid #27272A;">
                    <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                      <input type="checkbox" style="width: 18px; height: 18px; accent-color: #E50914; cursor: pointer;" onchange="window.dashboardView.toggleTask('${task.id}')">
                      <span style="color: #FFF; font-size: 14px;">${task.text}</span>
                    </div>
                    <span style="font-size: 10px; padding: 3px 8px; border-radius: 6px; font-weight: 700; ${task.priority === 'high' ? 'background: rgba(229,9,20,0.2); color: #FF4D4D;' : 'background: rgba(245,183,0,0.2); color: #F5B700;'}">
                      ${task.priority ? task.priority.toUpperCase() : 'NORMAL'}
                    </span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Column 2: Daily Habits -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0; display: flex; align-items: center; gap: 8px;">
                <span>🔁</span> Daily Habits
              </h3>
              <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'habits' })" style="color: #E50914; font-size: 12px; font-weight: 600; text-decoration: none;">Manage →</a>
            </div>

            ${state.habits.length === 0 ? `
              <div style="text-align: center; padding: 36px 12px; color: #71717A; font-size: 14px; background: #1C1C21; border-radius: 12px; border: 1px dashed #27272A;">
                <div style="font-size: 24px; margin-bottom: 6px;">🔁</div>
                <div>No habits set yet. Head to <strong>Daily Habits</strong> to add one!</div>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${state.habits.map(habit => `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #1C1C21; border-radius: 10px; border: 1px solid #27272A;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <button class="btn" style="background: ${habit.completedToday ? '#10B981' : '#27272A'}; color: white; border: none; border-radius: 8px; width: 32px; height: 32px; font-weight: 700; cursor: pointer;" onclick="window.dashboardView.toggleHabit('${habit.id}')">
                        ${habit.completedToday ? '✓' : '+'}
                      </button>
                      <div>
                        <div style="color: #FFF; font-size: 14px; font-weight: 500;">${habit.name}</div>
                        <div style="font-size: 11px; color: #F5B700;">🔥 ${habit.streak} day streak</div>
                      </div>
                    </div>
                    <span style="font-size: 12px; color: #A1A1AA;">${habit.completedToday ? 'Completed' : 'Pending'}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Column 3: Academic & Placement Status Widget -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0; display: flex; align-items: center; gap: 8px;">
                <span>🎓</span> Academic & Placement Status
              </h3>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="padding: 12px; background: #1C1C21; border-radius: 10px; border: 1px solid #27272A;">
                <div style="font-size: 11px; color: #E50914; font-weight: 700; text-transform: uppercase;">Attendance Status</div>
                <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-top: 2px;">All Subjects > 75% Safe Threshold</div>
              </div>

              <div style="padding: 12px; background: #1C1C21; border-radius: 10px; border: 1px solid #27272A;">
                <div style="font-size: 11px; color: #F5B700; font-weight: 700; text-transform: uppercase;">Active Job Applications</div>
                <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-top: 2px;">${state.placements?.length || 0} Companies Tracked</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  async toggleTask(taskId) {
    const tasks = window.store.state.tasks.map(t => {
      if (t.id === taskId) return { ...t, completed: !t.completed };
      return t;
    });
    window.store.setState({ tasks });
    await window.apiClient.put(`/tasks/${taskId}`, { completed: true });
    if (window.showToast) window.showToast("Task completed! 🎉", "success");
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
    if (window.showToast) window.showToast("Habit logged! 🔥", "success");
  }

  startDayCheckIn() {
    const streak = (window.store.state.user.streak || 0) + 1;
    window.store.setState(prev => ({ user: { ...prev.user, streak } }));
    if (window.showToast) window.showToast(`Morning Check-in logged! Streak: 🔥 ${streak} Days!`, "success");
  }
}

window.dashboardView = new DashboardView();
