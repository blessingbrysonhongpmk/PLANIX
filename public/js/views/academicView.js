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
    } else if (this.activeTab === 'timetable') {
      const routines = state.routineBlocks || [];
      content = `
        <div class="ah-card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <h2 style="font-size: 18px; font-weight: 800; color: #FFF; margin: 0;">Academic Timetable</h2>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Weekly recurring classes, lectures, and laboratory sessions.</div>
            </div>
            <button class="btn btn-primary" style="background: #E50914; font-size: 13px;" onclick="window.timetableModal && window.timetableModal.open()">
              📷 Scan Timetable Photo
            </button>
          </div>

          ${routines.length === 0 ? `
            <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
              <div style="font-size: 40px; margin-bottom: 10px;">📅</div>
              <div style="font-size: 16px; font-weight: 700; color: #FFF;">No Timetable Uploaded</div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 6px; max-width: 400px; margin-left: auto; margin-right: auto;">Upload your semester timetable photo and let Tesseract AI extract your classes automatically.</div>
              <button class="btn btn-primary" style="margin-top: 16px; background: #E50914;" onclick="window.timetableModal && window.timetableModal.open()">📷 Scan Timetable Photo</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${routines.map(r => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="font-size: 14px; font-weight: 800; color: #E50914; width: 60px;">${r.time || '09:00'}</div>
                    <div>
                      <div style="font-size: 14px; font-weight: 700; color: #FFF;">${r.title}</div>
                      <div style="font-size: 12px; color: var(--text-muted);">${r.day || 'Daily'} • ${r.duration || '60 mins'}</div>
                    </div>
                  </div>
                  <span style="padding: 4px 10px; border-radius: 12px; background: rgba(229,9,20,0.15); color: #E50914; font-size: 11px; font-weight: 700;">${r.category || 'Study'}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
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
