/**
 * PLANIX GOALS & MILESTONES VIEW
 * Long-term Engineering & Competitive Exam Goal Tracker
 */

class GoalsView {
  render(state) {
    const goals = state.goals || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🎯</span> Goals & Milestones
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Set long-term engineering targets, track milestone progress, and achieve your career vision.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.goalsView.addGoal()">
            + Create Long-Term Goal
          </button>
        </div>

        <!-- Goals Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          ${goals.map(goal => `
            <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 18px; font-weight: 800; color: #FFF; margin: 0;">${goal.title}</h3>
                  <button class="btn" style="background: transparent; color: #71717A; border: none;" onclick="window.goalsView.deleteGoal('${goal.id}')">🗑️</button>
                </div>
                <div style="font-size: 12px; color: #A1A1AA; margin-top: 6px;">Target Deadline: ${goal.targetDate || '2026-12-31'}</div>
              </div>

              <div style="margin-top: 20px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #A1A1AA; margin-bottom: 6px;">
                  <span>Goal Completion</span>
                  <span style="color: #3B82F6; font-weight: 700;">${goal.progress || 0}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: #121215; border-radius: 4px; overflow: hidden; margin-bottom: 14px;">
                  <div style="width: ${goal.progress || 0}%; height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); border-radius: 4px;"></div>
                </div>

                <button class="btn" style="width: 100%; background: #121215; border: 1px solid #27272A; color: white; border-radius: 8px; padding: 8px; font-size: 12px; font-weight: 600; cursor: pointer;" onclick="window.goalsView.updateProgress('${goal.id}')">
                  + Increment Milestone Progress
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  addGoal() {
    const title = prompt("Goal Title (e.g. Get Placed at Microsoft / Crack GATE Exam):");
    if (!title) return;
    const targetDate = prompt("Target Date (YYYY-MM-DD):") || "2026-12-31";

    const newGoal = {
      id: `g_${Date.now()}`,
      title,
      targetDate,
      progress: 25
    };

    window.store.setState(prev => ({ goals: [...prev.goals, newGoal] }));
    if (window.showToast) window.showToast("New goal created!", "success");
  }

  updateProgress(id) {
    const goals = window.store.state.goals.map(g => {
      if (g.id === id) return { ...g, progress: Math.min(100, (g.progress || 0) + 15) };
      return g;
    });
    window.store.setState({ goals });
  }

  deleteGoal(id) {
    const goals = window.store.state.goals.filter(g => g.id !== id);
    window.store.setState({ goals });
  }
}

window.goalsView = new GoalsView();
