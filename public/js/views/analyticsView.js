/**
 * PLANIX ANALYTICS VIEW
 * Progress overview, streak counters, completion percentages & XP badges
 */

class AnalyticsView {
  render(state) {
    const totalTasks = state.tasks.length;
    const completedTasks = state.tasks.filter(t => t.completed).length;
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>📊</span> My Progress & Analytics
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Track your task completion %, habit streaks, and level progression over time.
            </p>
          </div>
        </div>

        <!-- Big Progress Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
          
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; color: #A1A1AA; text-transform: uppercase; font-weight: 700;">Task Completion Rate</div>
            <div style="font-size: 36px; font-weight: 900; color: #E50914; margin: 8px 0;">${taskCompletionRate}%</div>
            <div style="font-size: 13px; color: #71717A;">${completedTasks} of ${totalTasks} tasks completed</div>
          </div>

          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; color: #A1A1AA; text-transform: uppercase; font-weight: 700;">Active Daily Streak</div>
            <div style="font-size: 36px; font-weight: 900; color: #F5B700; margin: 8px 0;">🔥 ${state.user.streak} Days</div>
            <div style="font-size: 13px; color: #71717A;">Consistently completing tasks daily</div>
          </div>

          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; color: #A1A1AA; text-transform: uppercase; font-weight: 700;">Total XP Points</div>
            <div style="font-size: 36px; font-weight: 900; color: #10B981; margin: 8px 0;">⚡ ${state.user.xp} XP</div>
            <div style="font-size: 13px; color: #71717A;">Level ${state.user.level} • ${state.user.levelTitle}</div>
          </div>

        </div>

        <!-- Badges & Achievements -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 16px 0;">Earned Badges</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div style="background: #1C1C21; border: 1px solid #27272A; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 6px;">🏅</div>
              <div style="font-size: 14px; font-weight: 700; color: #FFF;">Focus Champion</div>
              <div style="font-size: 11px; color: #71717A; margin-top: 2px;">7-Day Streak Achieved</div>
            </div>
            <div style="background: #1C1C21; border: 1px solid #27272A; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 6px;">📚</div>
              <div style="font-size: 14px; font-weight: 700; color: #FFF;">Study Master</div>
              <div style="font-size: 11px; color: #71717A; margin-top: 2px;">Completed 10 Focus Timers</div>
            </div>
            <div style="background: #1C1C21; border: 1px solid #27272A; border-radius: 12px; padding: 16px; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 6px;">💧</div>
              <div style="font-size: 14px; font-weight: 700; color: #FFF;">Health Booster</div>
              <div style="font-size: 11px; color: #71717A; margin-top: 2px;">Hydration Habit 5 Days</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

window.analyticsView = new AnalyticsView();
