/**
 * PLANIX JOURNAL VIEW
 * Daily mood reflection & quick entry logger with REST API integration
 */

class JournalView {
  render(state) {
    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>📓</span> Daily Journal
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Record your daily thoughts, mood reflections, and key highlights.
            </p>
          </div>
        </div>

        <!-- Today Reflection Input -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 12px 0;">How was your day today?</h3>
          
          <!-- Mood Selection -->
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button class="btn" style="background: #1C1C21; border: 1px solid #27272A; font-size: 24px; padding: 8px 16px; border-radius: 10px;" onclick="window.journalView.setMood('😀')">😀</button>
            <button class="btn" style="background: #1C1C21; border: 1px solid #27272A; font-size: 24px; padding: 8px 16px; border-radius: 10px;" onclick="window.journalView.setMood('😐')">😐</button>
            <button class="btn" style="background: #1C1C21; border: 1px solid #27272A; font-size: 24px; padding: 8px 16px; border-radius: 10px;" onclick="window.journalView.setMood('😔')">😔</button>
            <button class="btn" style="background: #1C1C21; border: 1px solid #27272A; font-size: 24px; padding: 8px 16px; border-radius: 10px;" onclick="window.journalView.setMood('🔥')">🔥</button>
          </div>

          <textarea id="journal-input" class="form-input" style="width: 100%; min-height: 120px; background: #1C1C21; border: 1px solid #27272A; color: white; border-radius: 12px; padding: 14px; font-size: 14px; resize: vertical;" placeholder="Write a short reflection about today..."></textarea>
          
          <button class="btn" style="margin-top: 14px; background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 700; cursor: pointer;" onclick="window.journalView.addEntry()">
            Save Entry 💾
          </button>
        </div>

        <!-- History Entries -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 16px 0;">Past Entries</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${state.journal.map(j => `
              <div style="padding: 14px; background: #1C1C21; border-radius: 12px; border: 1px solid #27272A;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #A1A1AA; margin-bottom: 6px;">
                  <span>📅 ${j.date}</span>
                  <span style="font-size: 16px;">${j.mood || '😀'}</span>
                </div>
                <div style="color: #FFF; font-size: 14px; line-height: 1.5;">${j.text}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  setMood(m) {
    this.selectedMood = m;
  }

  async addEntry() {
    const input = document.getElementById('journal-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    const newEntry = {
      id: `j_${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      mood: this.selectedMood || '😀',
      text
    };

    window.store.setState(prev => ({ journal: [newEntry, ...prev.journal] }));
    await window.apiClient.post('/journal', newEntry);
  }
}

window.journalView = new JournalView();
