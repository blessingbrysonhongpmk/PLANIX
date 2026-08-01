/**
 * PLANIX LIFE GPS & LIFE SIMULATION ENGINE VIEW
 * Goal → AI Roadmap → Daily Plan Flow + "What happens if..." Outcome Predictor
 */

class LifeGpsView {
  constructor() {
    this.selectedScenario = 'study-extra';
    this.phases = null;
  }

  render(state) {
    const scenarios = [
      { id: 'study-extra', title: 'Study 2 Extra Hours Daily', icon: '📚', outcome: '🏆 +45% Exam Performance & Skill Mastery', trend: '+45%' },
      { id: 'skip-gym', title: 'Skip Evening Workout Block', icon: '🏋️‍♂️', outcome: '⚠️ -25% Energy Levels & Focus Recovery', trend: '-25%' },
      { id: 'sleep-early', title: 'Sleep at 10 PM Consistently', icon: '🌙', outcome: '⚡ +35% Morning Productivity Score', trend: '+35%' }
    ];

    const activeScenario = scenarios.find(s => s.id === this.selectedScenario) || scenarios[0];
    const defaultPhases = [
      { phase: 'PHASE 1 (DAYS 1-30)', badgeColor: 'var(--accent-gold)', title: 'Foundations & Core System', description: 'Daily 2-hour study blocks + 50 active recall flashcards.', targetMetrics: 'Daily 2h Focus Block' },
      { phase: 'PHASE 2 (DAYS 31-60)', badgeColor: 'var(--accent-red)', title: 'Advanced Architecture & Projects', description: 'Build 3 production-grade applications.', targetMetrics: '3 Milestone Projects Deployed' },
      { phase: 'PHASE 3 (DAYS 61-90)', badgeColor: 'var(--accent-emerald)', title: 'Mastery & Deployment', description: '98% Goal Success Prediction achieved.', targetMetrics: 'Production Launch' }
    ];

    const phasesToRender = this.phases || defaultPhases;

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Goal Roadmap & Outcomes</div>
            <div class="view-subtitle">Milestone planner and trajectory forecast</div>
          </div>
        </div>

        <!-- Life GPS Goal Roadmap Generator -->
        <div class="card" style="margin-bottom: 28px; border-top: 3px solid var(--accent-red);">
          <div style="font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 8px;">🎯 Target Goal Roadmap Engine</div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            Enter a long-term milestone (e.g. "Master Full Stack AI Architecture"). Life GPS calculates your phased roadmap.
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 20px;">
            <input type="text" id="gps-goal-input" class="form-input" placeholder="Enter target goal..." value="Master Full Stack AI Architecture">
            <button class="btn btn-indigo" onclick="window.lifeGpsView.generateRoadmap()">Generate Roadmap</button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            ${phasesToRender.map(p => `
              <div style="background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 16px; border-radius: var(--radius-md);">
                <div style="font-size: 11px; font-weight: 700; color: ${p.badgeColor || 'var(--accent-gold)'};">${p.phase}</div>
                <div style="font-weight: 700; font-size: 15px; color: #fff; margin: 4px 0;">${p.title}</div>
                <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">${p.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
        </div>

        <!-- Life Simulation Engine ("What happens if...") -->
        <div class="card" style="border-top: 3px solid var(--accent-gold);">
          <div style="font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 8px;">🔮 Life Simulation Engine</div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            Simulate decisions and predict 30-day productivity & health outcomes.
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
            ${scenarios.map(s => `
              <button class="btn ${this.selectedScenario === s.id ? 'btn-primary' : 'btn-secondary'}" 
                      onclick="window.lifeGpsView.selectScenario('${s.id}')">
                <span>${s.icon}</span> <span>${s.title}</span>
              </button>
            `).join('')}
          </div>

          <div style="background: rgba(255, 184, 0, 0.1); border: 1px solid rgba(255, 184, 0, 0.3); padding: 20px; border-radius: var(--radius-md);">
            <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">SIMULATED 30-DAY OUTCOME</div>
            <div style="font-size: 22px; font-weight: 800; color: #fff; margin: 8px 0;">${activeScenario.outcome}</div>
            <div style="font-size: 13px; color: var(--text-secondary);">
              Predictive Impact Index: <strong style="color: var(--accent-gold);">${activeScenario.trend}</strong> change over baseline trajectory.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  selectScenario(id) {
    this.selectedScenario = id;
    window.store.notify();
  }

  async generateRoadmap() {
    const input = document.getElementById('gps-goal-input');
    const goal = input ? input.value : '';
    if (!goal.trim()) return;

    const res = await window.apiClient.post('/ai/generate-roadmap', { goal });
    if (res.success && res.phases) {
      this.phases = res.phases;
      window.store.notify();
    }
  }
}

window.lifeGpsView = new LifeGpsView();
