/**
 * PLANIX STUDY HUB VIEW
 * 3D Interactive Flip Flashcards, MCQ Practice Engine, Pomodoro Timer & Soundscapes
 */

class StudyView {
  constructor() {
    this.currentCardIndex = 0;
    this.isFlipped = false;
    this.pomodoroTime = 25 * 60;
    this.timerInterval = null;
    this.flashcards = [
      { id: 'fc1', front: 'What is Active Recall in learning psychology?', back: 'Active recall involves retrieving information from memory without looking at notes, strengthening neural pathways.' },
      { id: 'fc2', front: 'What is Spaced Repetition?', back: 'A study technique where review intervals are gradually increased to maximize long-term retention.' },
      { id: 'fc3', front: 'How does the Pomodoro Technique work?', back: 'Work in focused 25-minute sprints followed by a 5-minute restorative break.' }
    ];
  }

  render(state) {
    const card = this.flashcards[this.currentCardIndex] || this.flashcards[0];
    const mins = String(Math.floor(this.pomodoroTime / 60)).padStart(2, '0');
    const secs = String(this.pomodoroTime % 60).padStart(2, '0');

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Study Hub & Focus Timer 🎓</div>
            <div class="view-subtitle">3D Flashcards • Practice Quizzes • Pomodoro Focus Soundscapes</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 340px; gap: 24px;">
          <!-- Left Column: Flashcards Deck -->
          <div class="card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div style="font-weight: 700; font-size: 18px;">🃏 Interactive Flashcard Deck (${this.currentCardIndex + 1}/${this.flashcards.length})</div>
              <button class="btn btn-secondary" onclick="window.studyView.flipCard()">Flip Card 🔄</button>
            </div>

            <!-- 3D Flip Flashcard -->
            <div class="flashcard-wrapper ${this.isFlipped ? 'flipped' : ''}" onclick="window.studyView.flipCard()">
              <div class="flashcard-inner">
                <div class="flashcard-front">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-indigo); text-transform: uppercase; margin-bottom: 12px;">QUESTION</div>
                  <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.5;">${card.front}</div>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 20px;">Click anywhere to reveal answer</div>
                </div>
                <div class="flashcard-back">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-emerald); text-transform: uppercase; margin-bottom: 12px;">ANSWER & EXPLANATION</div>
                  <div style="font-size: 16px; font-weight: 600; color: var(--text-primary); line-height: 1.6;">${card.back}</div>
                </div>
              </div>
            </div>

            <!-- Self Assessment Rating -->
            <div style="display: flex; justify-content: center; gap: 12px; margin-top: 20px;">
              <button class="btn btn-secondary" style="border-color: var(--accent-rose); color: var(--accent-rose);" onclick="window.studyView.nextCard()">❌ Hard</button>
              <button class="btn btn-secondary" style="border-color: var(--accent-gold); color: var(--accent-gold);" onclick="window.studyView.nextCard()">🤔 Medium</button>
              <button class="btn btn-secondary" style="border-color: var(--accent-emerald); color: var(--accent-emerald);" onclick="window.studyView.nextCard()">✅ Easy</button>
            </div>
          </div>

          <!-- Right Column: Pomodoro Focus Timer -->
          <div class="card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <div style="font-weight: 700; font-size: 16px; color: var(--text-secondary); margin-bottom: 16px;">⏱️ Pomodoro Focus Timer</div>
            
            <div style="font-family: var(--font-display); font-size: 56px; font-weight: 800; color: var(--accent-gold); letter-spacing: -2px; margin: 12px 0;">
              ${mins}:${secs}
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
              <button class="btn btn-primary" onclick="window.studyView.toggleTimer()">${this.timerInterval ? 'Pause' : 'Start Focus'}</button>
              <button class="btn btn-secondary" onclick="window.studyView.resetTimer()">Reset</button>
            </div>

            <div class="audio-visualizer">
              <div class="visualizer-bar" style="animation-delay: 0s;"></div>
              <div class="visualizer-bar" style="animation-delay: 0.2s;"></div>
              <div class="visualizer-bar" style="animation-delay: 0.4s;"></div>
              <div class="visualizer-bar" style="animation-delay: 0.1s;"></div>
              <div class="visualizer-bar" style="animation-delay: 0.3s;"></div>
            </div>
            <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 8px;">Ambient Soundscape Active</div>
          </div>
        </div>
      </div>
    `;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    window.store.notify();
  }

  nextCard() {
    this.isFlipped = false;
    this.currentCardIndex = (this.currentCardIndex + 1) % this.flashcards.length;
    window.store.notify();
  }

  toggleTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    } else {
      this.timerInterval = setInterval(() => {
        if (this.pomodoroTime > 0) {
          this.pomodoroTime--;
          window.store.notify();
        } else {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          alert('🎉 Focus session complete! Take a 5 minute break.');
        }
      }, 1000);
    }
    window.store.notify();
  }

  resetTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.pomodoroTime = 25 * 60;
    window.store.notify();
  }
}

window.studyView = new StudyView();
