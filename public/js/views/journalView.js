/**
 * PLANIX JOURNAL & EMOTION TRACKER VIEW
 * Daily journal entries, 5-point emotion picker, reflection & mood insights
 */

class JournalView {
  constructor() {
    this.selectedMood = 'Peaceful';
    this.selectedScore = 4;
  }

  render(state) {
    const entries = state.journal || [];
    const moods = [
      { name: 'Excited', icon: '🤩', score: 5 },
      { name: 'Peaceful', icon: '😊', score: 4 },
      { name: 'Neutral', icon: '😐', score: 3 },
      { name: 'Stressed', icon: '😰', score: 2 },
      { name: 'Exhausted', icon: '😫', score: 1 },
    ];

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Daily Journal & Reflections 📖</div>
            <div class="view-subtitle">Daily reflection • Mood logging • Emotional correlation analytics</div>
          </div>
        </div>

        <div class="card" style="margin-bottom: 28px;">
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">How are you feeling today?</div>
          
          <div class="mood-picker">
            ${moods.map(m => `
              <button class="mood-btn ${this.selectedMood === m.name ? 'selected' : ''}" 
                      onclick="window.journalView.selectMood('${m.name}', ${m.score})">
                <span style="font-size: 28px;">${m.icon}</span>
                <span style="font-size: 12px; font-weight: 600;">${m.name}</span>
              </button>
            `).join('')}
          </div>

          <textarea id="journal-entry-text" class="form-textarea" style="min-height: 120px; margin-top: 14px;" 
                    placeholder="Write about your day, reflections, wins, or thoughts..."></textarea>
          
          <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
            <button class="btn btn-indigo" onclick="window.journalView.saveJournalEntry()">✨ Save Entry & Reflect</button>
          </div>
        </div>

        <h3 style="font-family: var(--font-display); font-size: 20px; margin-bottom: 16px;">Past Reflections & Entries (${entries.length})</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${entries.map(e => `
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 22px;">${e.mood === 'Excited' ? '🤩' : e.mood === 'Peaceful' ? '😊' : e.mood === 'Neutral' ? '😐' : e.mood === 'Stressed' ? '😰' : '😫'}</span>
                  <span style="font-weight: 700; font-size: 15px;">${e.mood} Mood</span>
                </div>
                <span style="font-size: 12px; color: var(--text-tertiary);">${e.date}</span>
              </div>
              <p style="font-size: 14px; color: var(--text-primary); line-height: 1.6;">${e.entryText}</p>
              
              ${e.aiReflection ? `
                <div style="margin-top: 12px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 12px; font-size: 13px; color: #c7d2fe;">
                  ${e.aiReflection}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  selectMood(name, score) {
    this.selectedMood = name;
    this.selectedScore = score;
    window.store.notify();
  }

  async saveJournalEntry() {
    const text = document.getElementById('journal-entry-text')?.value;
    if (!text || !text.trim()) return alert('Please write a quick entry first!');

    const res = await window.apiClient.post('/journal', {
      mood: this.selectedMood,
      moodScore: this.selectedScore,
      entryText: text.trim()
    });

    if (res.success) {
      document.getElementById('journal-entry-text').value = '';
      window.store.setState(prev => ({
        journal: [res.entry, ...prev.journal]
      }));
    }
  }
}

window.journalView = new JournalView();
