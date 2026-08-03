/**
 * PLANIX LEARNING HUB VIEW
 * Skill progression roadmap & course tracker (Python, PyTorch, React, System Design)
 */

class LearningHubView {
  render(state) {
    const learning = state.learning || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>📚</span> Learning Hub & Skill Roadmap
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Track your skill progression across AI, Full-Stack Web, Systems Programming, and DSA.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.learningHubView.addSkill()">
            + Add Skill Track
          </button>
        </div>

        <!-- Skills Progress Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          ${learning.map(item => `
            <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; font-weight: 700; background: rgba(59,130,246,0.15); color: #3B82F6;">
                  ${item.category || 'SKILL'}
                </span>
                <span style="font-size: 12px; color: #8B5CF6; font-weight: 600;">${item.level}</span>
              </div>

              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 6px 0 12px 0;">${item.skill}</h3>

              <div style="display: flex; justify-content: space-between; font-size: 12px; color: #A1A1AA; margin-bottom: 6px;">
                <span>Mastery Progress</span>
                <span style="color: #3B82F6; font-weight: 700;">${item.progress}%</span>
              </div>

              <div style="width: 100%; height: 6px; background: #121215; border-radius: 4px; overflow: hidden; margin-bottom: 14px;">
                <div style="width: ${item.progress}%; height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); border-radius: 4px;"></div>
              </div>

              <button class="btn" style="width: 100%; background: #121215; border: 1px solid #27272A; color: white; border-radius: 8px; padding: 8px; font-size: 12px; cursor: pointer;" onclick="window.learningHubView.incrementProgress('${item.id}')">
                + Increment Practice Progress
              </button>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  addSkill() {
    const skill = prompt("Enter Skill Name (e.g. Docker & Kubernetes):");
    if (!skill) return;
    const newSkill = { id: `sk_${Date.now()}`, skill, level: 'Beginner', progress: 20, category: 'DevOps' };
    window.store.setState(prev => ({ learning: [...prev.learning, newSkill] }));
  }

  incrementProgress(id) {
    const learning = window.store.state.learning.map(s => {
      if (s.id === id) return { ...s, progress: Math.min(100, s.progress + 10) };
      return s;
    });
    window.store.setState({ learning });
  }
}

window.learningHubView = new LearningHubView();
