/**
 * PLANIX FOCUS MODE (STUDY) VIEW — Pomodoro timer and deep work stats
 */

class StudyView {
  constructor() {
    this.timer = null;
    this.timeLeft = 25 * 60;
    this.isRunning = false;
    this.mode = 'work'; // work, shortBreak, longBreak
  }

  render(state) {
    const min = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const sec = (this.timeLeft % 60).toString().padStart(2, '0');
    const todaySessions = (state.focusSessions || []).filter(s => new Date(s.date).toDateString() === new Date().toDateString()).length;

    return `
      <div class="view-container animate-fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh;">
        
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 class="page-title" style="justify-content: center; font-size: 32px;">Focus Mode</h1>
          <p class="page-description" style="margin-top: 8px;">Eliminate distractions. Do deep work.</p>
        </div>

        <div class="card" style="width: 100%; max-width: 400px; padding: 48px 32px; text-align: center; border-radius: var(--radius-xl); position: relative; overflow: hidden;">
          ${this.isRunning ? `<div class="ambient-bg" style="opacity: 0.5; background: var(--accent-gradient-red); position: absolute; inset: 0; z-index: 0; animation: breathe 4s ease-in-out infinite;"></div>` : ''}
          
          <div style="position: relative; z-index: 10;">
            <!-- Mode Switcher -->
            <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 32px; background: var(--bg-input); padding: 6px; border-radius: var(--radius-full); width: fit-content; margin: 0 auto 32px;">
              <button class="btn ${this.mode === 'work' ? 'btn-primary' : 'btn-ghost'}" style="border-radius: var(--radius-full); padding: 6px 16px; font-size: 13px; min-height: auto;" onclick="window.studyView.setMode('work')">Work (25m)</button>
              <button class="btn ${this.mode === 'shortBreak' ? 'btn-primary' : 'btn-ghost'}" style="border-radius: var(--radius-full); padding: 6px 16px; font-size: 13px; min-height: auto;" onclick="window.studyView.setMode('shortBreak')">Break (5m)</button>
            </div>

            <!-- Timer Display -->
            <div style="font-family: var(--font-mono); font-size: 84px; font-weight: 800; color: var(--text-primary); line-height: 1; letter-spacing: -2px; margin-bottom: 40px;">
              ${min}:${sec}
            </div>

            <!-- Controls -->
            <div style="display: flex; justify-content: center; gap: 16px;">
              ${this.isRunning ? `
                <button class="btn btn-hero-outline" onclick="window.studyView.pauseTimer()">Pause</button>
              ` : `
                <button class="btn btn-hero" onclick="window.studyView.startTimer()">Start Focus</button>
              `}
              <button class="btn btn-icon" style="width: 48px; height: 48px; border: 1px solid var(--border-subtle);" onclick="window.studyView.resetTimer()" title="Reset Timer">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div style="margin-top: 32px; text-align: center; color: var(--text-tertiary); font-size: 14px; font-weight: 600;">
          ${todaySessions > 0 ? `🔥 You've completed ${todaySessions} focus session${todaySessions !== 1 ? 's' : ''} today. Keep it up!` : `Ready for your first deep work block today?`}
        </div>
      </div>
    `;
  }

  setMode(mode) {
    this.mode = mode;
    this.timeLeft = mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
    this.pauseTimer();
    window.store.notify();
  }

  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.completeSession();
      else window.store.notify();
    }, 1000);
    window.store.notify();
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timer);
    window.store.notify();
  }

  resetTimer() {
    this.setMode(this.mode);
  }

  completeSession() {
    this.pauseTimer();
    if (this.mode === 'work') {
      if (window.showToast) window.showToast('Focus session complete! Take a break.', 'success');
      window.store.setState(prev => ({ focusSessions: [...(prev.focusSessions || []), { id: `fs_${Date.now()}`, date: new Date().toISOString(), duration: 25 }] }));
      this.setMode('shortBreak');
    } else {
      if (window.showToast) window.showToast('Break over. Back to work!', 'info');
      this.setMode('work');
    }
  }
}

window.studyView = new StudyView();
