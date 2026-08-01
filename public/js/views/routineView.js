/**
 * PLANIX ROUTINE GENERATOR VIEW
 * Natural language schedule builder, daily timeline blocks & weekly flow
 */

class RoutineView {
  constructor() {
    this.parsedRoutines = null;
  }

  render(state) {
    const activeRoutines = state.tasks.filter(t => t.type === 'routine');

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Daily Routine Builder</div>
            <div class="view-subtitle">Describe your daily schedule to generate structured time blocks</div>
          </div>
        </div>

        <div class="routine-gen-box">
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Write Your Daily Routine in Plain English</div>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            Example: "I wake up at 6 AM. College starts at 9. Gym in evening at 5:30. Need Bible reading at night. Need dance practice. Need study for 2 hours."
          </div>
          
          <textarea id="routine-prompt-input" class="form-textarea" style="min-height: 110px; margin-bottom: 16px;" placeholder="Describe your daily activities, wake up time, classes, workout, study hours..."></textarea>
          
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-primary" onclick="window.routineView.parsePrompt()">⚡ Build Schedule Blocks</button>
            <button class="btn btn-secondary" onclick="document.getElementById('routine-prompt-input').value='I wake up at 6 AM. College starts at 9. Gym in evening. Need Bible reading. Need study for 2 hours.'">Load Sample Routine</button>
          </div>
        </div>

        <div id="routine-results-container">
          ${this.parsedRoutines ? this.renderParsedGrid() : ''}
        </div>

        <div style="margin-top: 32px;">
          <h3 style="font-family: var(--font-display); font-size: 20px; margin-bottom: 16px;">Active Routines & Daily Schedule (${activeRoutines.length})</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${activeRoutines.map(r => `
              <div class="card">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <span class="badge badge-study">${r.routineConfig?.time || '08:00'}</span>
                  <span style="font-size: 12px; color: var(--accent-gold); font-weight: 700;">🔥 ${r.streak || 0}d Streak</span>
                </div>
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">${r.text}</div>
                <div style="font-size: 12px; color: var(--text-tertiary);">Repeat: Daily • Smart Scheduled</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  async parsePrompt() {
    const input = document.getElementById('routine-prompt-input');
    const text = input ? input.value : '';
    if (!text.trim()) return alert('Please enter a schedule prompt first!');

    const res = await window.apiClient.post('/ai/parse-routine', { text });
    if (res.success) {
      this.parsedRoutines = res.routines;
      window.store.notify();
    }
  }

  renderParsedGrid() {
    return `
      <div class="card animate-slide-up" style="background: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <div style="font-weight: 700; font-size: 18px;">✨ Generated ${this.parsedRoutines.length} Schedule Blocks</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Review your schedule blocks below before applying.</div>
          </div>
          <button class="btn btn-indigo" onclick="window.routineView.applyRoutines()">✅ Apply to My Schedule</button>
        </div>

        <div class="routine-parsed-grid">
          ${this.parsedRoutines.map(r => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 14px; border-radius: var(--radius-md);">
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold);">${r.routineConfig?.time || 'Scheduled'}</div>
              <div style="font-weight: 600; font-size: 14px; color: var(--text-primary); margin: 4px 0;">${r.text}</div>
              <span class="badge badge-personal">${r.category}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  async applyRoutines() {
    if (!this.parsedRoutines) return;
    const res = await window.apiClient.post('/ai/bulk-add-routines', { routines: this.parsedRoutines });
    if (res.success) {
      alert(`🎉 Successfully added ${res.created.length} new routines to your daily schedule!`);
      this.parsedRoutines = null;
      window.store.fetchAll();
    }
  }
}

window.routineView = new RoutineView();
