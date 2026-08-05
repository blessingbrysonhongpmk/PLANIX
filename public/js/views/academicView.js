/**
 * PLANIX V5 ACADEMIC HUB — Native Mobile Ecosystem
 * Unified hub using Swipable Chips.
 */

class AcademicView {
  constructor() {
    this.activeTab = 'documents'; // Default to documents to show intelligence integration
  }

  setTab(tab) {
    this.activeTab = tab;
    window.store.notify();
  }

  render(state) {
    let content = '';

    // Delegate rendering to sub-sections
    if (this.activeTab === 'documents') {
      content = window.intelligenceView ? window.intelligenceView.render(state) : '<div class="ah-card" style="padding: 24px;">Documents Loading...</div>';
    } else {
      content = `
        <div class="ah-card" style="padding: 40px 24px; text-align: center; border: 1px dashed rgba(255, 255, 255, 0.1);">
          <div style="font-size: 32px; margin-bottom: 12px;">🚧</div>
          <div style="font-size: 16px; font-weight: 700; color: #FFF;">${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)} Module</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">This module is being optimized for the native mobile experience.</div>
        </div>
      `;
    }

    return `
      <style>
        .ah-container {
          --bg-dark: #0B0B0F;
          --bg-card: #121217;
          --border: #22222A;
          --red: #FF2D2D;
          --text-muted: #8E8E9E;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }
        .ah-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          width: 100%;
          box-sizing: border-box;
        }
        /* Override intelligence view padding if rendered inside here */
        .ah-container .intelligence-hub {
          padding-top: 0 !important;
          min-height: auto;
        }
      </style>

      <div class="ah-container animate-fade-in">
        
        <!-- Page Header -->
        <div style="padding: 16px 16px 8px 16px; display: flex; align-items: center; justify-content: space-between;">
          <h1 style="font-size: 22px; font-weight: 800; color: #FFF; margin: 0; letter-spacing: -0.01em;">Academic Hub</h1>
          <button style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255,45,45,0.1); color: var(--red); border: none; font-size: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="document.getElementById('ah-file-upload-input').click()">+</button>
          <input type="file" id="ah-file-upload-input" style="display: none;" multiple onchange="window.intelligenceView && window.intelligenceView.handleFileInputChange(this)">
        </div>

        <!-- Swipable Chips Navigation -->
        <div class="mobile-chips-container" style="top: 56px;">
          <button class="mobile-chip ${this.activeTab === 'subjects' ? 'active' : ''}" onclick="window.academicView.setTab('subjects')">Subjects</button>
          <button class="mobile-chip ${this.activeTab === 'assignments' ? 'active' : ''}" onclick="window.academicView.setTab('assignments')">Assignments</button>
          <button class="mobile-chip ${this.activeTab === 'timetable' ? 'active' : ''}" onclick="window.academicView.setTab('timetable')">Timetable</button>
          <button class="mobile-chip ${this.activeTab === 'exams' ? 'active' : ''}" onclick="window.academicView.setTab('exams')">Exams</button>
          <button class="mobile-chip ${this.activeTab === 'attendance' ? 'active' : ''}" onclick="window.academicView.setTab('attendance')">Attendance</button>
          <button class="mobile-chip ${this.activeTab === 'cgpa' ? 'active' : ''}" onclick="window.academicView.setTab('cgpa')">CGPA</button>
          <button class="mobile-chip ${this.activeTab === 'documents' ? 'active' : ''}" onclick="window.academicView.setTab('documents')">Documents & AI</button>
        </div>

        <!-- Dynamic Hub Content -->
        <div style="flex: 1; padding: 16px;">
          ${content}
        </div>

      </div>
    `;
  }
}

window.academicView = new AcademicView();
