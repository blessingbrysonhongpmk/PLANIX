/**
 * PLANIX V5 INTERACTIVE AI ANALYSIS MODAL
 * Displays multi-stage progress and interactive reports (Flashcards, Quizzes, Study Plans).
 */

class AnalysisModal {
  constructor() {
    this.isOpen = false;
    this.activeDoc = null;
    this.activeTab = 'summary'; // summary, flashcards, quiz, studyPlan
    this.isAnalyzing = false;
    this.currentStage = '';
    this.progressPercent = 0;
    this.analysisData = null;
    this.currentFlashcardIdx = 0;
    this.isFlashcardFlipped = false;
    this.quizAnswers = {};
  }

  async open(docId) {
    const doc = (window.store.state.documents || []).find(d => d.id === docId);
    if (!doc) return;

    this.activeDoc = doc;
    this.activeTab = 'summary';
    this.isOpen = true;
    this.currentFlashcardIdx = 0;
    this.isFlashcardFlipped = false;
    this.quizAnswers = {};

    if (doc.status === 'analyzed' && doc.analysis) {
      this.isAnalyzing = false;
      this.analysisData = doc.analysis;
      window.store.notify();
    } else {
      // Run AI pipeline simulation
      this.isAnalyzing = true;
      this.progressPercent = 0;
      window.store.notify();

      try {
        const result = await window.documentService.analyzeDocument(docId, (stage, percent) => {
          this.currentStage = stage;
          this.progressPercent = percent;
          window.store.notify();
        });
        this.analysisData = result;
        this.isAnalyzing = false;
        window.store.notify();
      } catch (e) {
        this.isAnalyzing = false;
        if (window.showToast) window.showToast('Analysis failed: ' + e.message, 'error');
        this.close();
      }
    }
  }

  close() {
    this.isOpen = false;
    this.activeDoc = null;
    this.isAnalyzing = false;
    window.store.notify();
  }

  flipFlashcard() {
    this.isFlashcardFlipped = !this.isFlashcardFlipped;
    window.store.notify();
  }

  nextFlashcard() {
    const flashcards = this.analysisData?.flashcards || [];
    if (this.currentFlashcardIdx < flashcards.length - 1) {
      this.currentFlashcardIdx++;
      this.isFlashcardFlipped = false;
      window.store.notify();
    }
  }

  prevFlashcard() {
    if (this.currentFlashcardIdx > 0) {
      this.currentFlashcardIdx--;
      this.isFlashcardFlipped = false;
      window.store.notify();
    }
  }

  selectQuizOption(qIdx, optionIdx) {
    this.quizAnswers[qIdx] = optionIdx;
    window.store.notify();
  }

  render() {
    if (!this.isOpen || !this.activeDoc) return '';

    const doc = this.activeDoc;

    return `
      <div style="position: fixed; inset: 0; z-index: 1100; background: rgba(0,0,0,0.85); backdrop-filter: blur(16px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease;">
        
        <div class="card" style="width: 100%; max-width: 900px; max-height: 85vh; background: #121217; border: 1px solid #2A2A35; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.8);">
          
          <!-- Modal Header -->
          <div style="padding: 20px 24px; border-bottom: 1px solid #2A2A35; display: flex; justify-content: space-between; align-items: center; background: #16161D;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(229, 9, 20, 0.15); color: #E50914; display: flex; align-items: center; justify-content: center; font-size: 18px;">🤖</div>
              <div>
                <h2 style="font-size: 16px; font-weight: 800; color: #FFF; margin: 0;">AI Intelligence Report</h2>
                <div style="font-size: 11px; color: var(--text-tertiary);">${doc.title} • ${doc.subject || 'General'}</div>
              </div>
            </div>

            <button class="btn btn-ghost" style="padding: 6px; color: var(--text-tertiary);" onclick="window.analysisModal.close()">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- ANALYZING PROGRESS STATE -->
          ${this.isAnalyzing ? `
            <div style="padding: 80px 40px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px;">
              <div style="font-size: 48px; animation: pulse 1.5s infinite;">🧠</div>
              <div>
                <h3 style="font-size: 20px; font-weight: 700; color: #FFF; margin: 0 0 8px 0;">${this.currentStage || 'Analyzing Document...'}</h3>
                <p style="font-size: 13px; color: var(--text-tertiary); margin: 0;">Generating summary, flashcards, formula sheet, and study tasks...</p>
              </div>

              <!-- Progress Bar -->
              <div style="width: 100%; max-width: 450px; height: 8px; background: #0A0A0C; border-radius: 4px; overflow: hidden; border: 1px solid #22222A;">
                <div style="height: 100%; width: ${this.progressPercent}%; background: #E50914; transition: width 0.3s ease;"></div>
              </div>
              <div style="font-size: 12px; font-weight: 700; color: #E50914;">${this.progressPercent}% Completed</div>
            </div>
          ` : `

          <!-- REPORT CONTENT STATE -->
          <!-- Nav Tabs -->
          <div style="display: flex; gap: 4px; background: #0A0A0C; padding: 6px 24px; border-bottom: 1px solid #2A2A35;">
            ${[
              { id: 'summary', label: 'Summary & Topics' },
              { id: 'flashcards', label: 'Flashcards' },
              { id: 'quiz', label: 'Practice Quiz' },
              { id: 'studyPlan', label: 'Study Plan' }
            ].map(t => `
              <button class="btn" style="padding: 8px 16px; font-size: 12px; font-weight: 700; border-radius: 6px; background: ${this.activeTab === t.id ? '#E50914' : 'transparent'}; color: ${this.activeTab === t.id ? '#FFF' : 'var(--text-tertiary)'}; border: none;" onclick="window.analysisModal.activeTab = '${t.id}'; window.store.notify()">
                ${t.label}
              </button>
            `).join('')}
          </div>

          <!-- Body Container -->
          <div style="flex: 1; overflow-y: auto; padding: 24px;">
            ${this.renderTabContent()}
          </div>

          `}

        </div>

      </div>
    `;
  }

  renderTabContent() {
    const data = this.analysisData || {};

    if (this.activeTab === 'summary') {
      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Executive Summary Card -->
          <div style="background: #16161D; border: 1px solid #2A2A35; border-radius: 12px; padding: 20px;">
            <h4 style="font-size: 14px; font-weight: 700; color: #E50914; margin: 0 0 10px 0;">Executive Summary</h4>
            <p style="font-size: 14px; line-height: 1.6; color: #E0E0E0; margin: 0;">${data.summary}</p>
          </div>

          <!-- Important Topics & Definitions -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            
            <div style="background: #16161D; border: 1px solid #2A2A35; border-radius: 12px; padding: 20px;">
              <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 0 0 14px 0;">Key Topics Covered</h4>
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                ${(data.topics || []).map(topic => `
                  <li style="font-size: 13px; color: #DDD; display: flex; align-items: center; gap: 8px;">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: #E50914;"></span> ${topic}
                  </li>
                `).join('')}
              </ul>
            </div>

            <div style="background: #16161D; border: 1px solid #2A2A35; border-radius: 12px; padding: 20px;">
              <h4 style="font-size: 14px; font-weight: 700; color: #FFF; margin: 0 0 14px 0;">Key Definitions</h4>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${(data.definitions || []).map(def => `
                  <div>
                    <div style="font-size: 12px; font-weight: 700; color: #10B981;">${def.term}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">${def.def}</div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      `;
    }

    if (this.activeTab === 'flashcards') {
      const flashcards = data.flashcards || [];
      if (flashcards.length === 0) return `<div style="text-align: center; color: var(--text-tertiary); padding: 40px;">No flashcards available.</div>`;

      const card = flashcards[this.currentFlashcardIdx];

      return `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; gap: 24px;">
          
          <div style="font-size: 13px; font-weight: 700; color: var(--text-tertiary);">
            Flashcard ${this.currentFlashcardIdx + 1} of ${flashcards.length}
          </div>

          <!-- Flip Card -->
          <div style="width: 100%; max-width: 500px; height: 260px; background: #16161D; border: 2px solid ${this.isFlashcardFlipped ? '#10B981' : '#E50914'}; border-radius: 16px; padding: 32px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: transform 0.3s ease, border-color 0.3s ease; box-shadow: 0 12px 30px rgba(0,0,0,0.4);" onclick="window.analysisModal.flipFlashcard()">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${this.isFlashcardFlipped ? '#10B981' : '#E50914'}; margin-bottom: 16px;">
              ${this.isFlashcardFlipped ? 'Answer' : 'Question (Click to Flip)'}
            </div>
            <div style="font-size: 18px; font-weight: 700; color: #FFF; line-height: 1.5;">
              ${this.isFlashcardFlipped ? card.a : card.q}
            </div>
          </div>

          <!-- Controls -->
          <div style="display: flex; gap: 16px;">
            <button class="btn btn-secondary" style="padding: 8px 20px; font-size: 13px;" onclick="window.analysisModal.prevFlashcard()" ${this.currentFlashcardIdx === 0 ? 'disabled' : ''}>← Previous</button>
            <button class="btn btn-primary" style="padding: 8px 20px; font-size: 13px; background: #E50914;" onclick="window.analysisModal.nextFlashcard()" ${this.currentFlashcardIdx === flashcards.length - 1 ? 'disabled' : ''}>Next →</button>
          </div>

        </div>
      `;
    }

    if (this.activeTab === 'quiz') {
      const mcqs = data.mcqs || [];
      return `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin: 0;">Interactive Knowledge Quiz</h4>
          ${mcqs.map((q, qIdx) => {
            const selectedOpt = this.quizAnswers[qIdx];
            return `
              <div style="background: #16161D; border: 1px solid #2A2A35; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 14px;">
                <div style="font-size: 14px; font-weight: 700; color: #FFF;">Q${qIdx + 1}: ${q.q}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${q.options.map((opt, oIdx) => {
                    let btnBg = '#0A0A0C';
                    let btnBorder = '#2A2A35';
                    if (selectedOpt === oIdx) {
                      if (oIdx === q.correct) {
                        btnBg = 'rgba(16, 185, 129, 0.2)';
                        btnBorder = '#10B981';
                      } else {
                        btnBg = 'rgba(229, 9, 20, 0.2)';
                        btnBorder = '#E50914';
                      }
                    }
                    return `
                      <button class="btn" style="padding: 10px 14px; font-size: 13px; text-align: left; background: ${btnBg}; border: 1px solid ${btnBorder}; color: #FFF; border-radius: 8px;" onclick="window.analysisModal.selectQuizOption(${qIdx}, ${oIdx})">
                        ${opt}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    if (this.activeTab === 'studyPlan') {
      const plan = data.studyPlan || [];
      return `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin: 0;">Automated Study Timeline</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${plan.map(p => `
              <div style="display: flex; gap: 16px; padding: 16px; background: #16161D; border: 1px solid #2A2A35; border-radius: 10px; align-items: center;">
                <div style="padding: 6px 12px; background: #E50914; color: #FFF; font-weight: 800; font-size: 12px; border-radius: 6px;">${p.day}</div>
                <div style="font-size: 13px; color: #DDD;">${p.task}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return '';
  }
}

window.analysisModal = new AnalysisModal();
