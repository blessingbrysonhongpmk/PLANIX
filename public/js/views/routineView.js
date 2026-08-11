/**
 * PLANIX V5 ROUTINE VIEW — Time Blocking & Schedule System
 */

class RoutineView {
  render(state) {
    const blocks = state.routineBlocks || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Routine</h1>
            <p class="page-description">Design structured daily time-blocks for deep work, study, coding, and rest.</p>
          </div>
          <div class="page-actions" style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" style="border: 1px solid #E50914; color: #FFF; background: rgba(229,9,20,0.12);" onclick="window.timetableModal && window.timetableModal.open()">
              📷 Scan Timetable Photo
            </button>
            <button class="btn btn-primary" onclick="window.modalComponent.open('timeblock')">+ Add Time Block</button>
          </div>
        </div>

        <!-- AI Timetable Scanner Banner Card -->
        <div class="card" style="padding: 16px 20px; background: linear-gradient(135deg, rgba(229,9,20,0.15) 0%, rgba(20,20,28,0.9) 100%); border: 1px solid rgba(229,9,20,0.3); border-radius: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: #E50914; color: #FFF; font-size: 20px; display: flex; align-items: center; justify-content: center; font-weight: 800;">📷</div>
            <div>
              <div style="font-size: 14px; font-weight: 700; color: #FFF;">Import Routine from Timetable Photo</div>
              <div style="font-size: 12px; color: var(--text-tertiary);">Upload class or work schedule photo to auto-generate daily time blocks using Tesseract AI.</div>
            </div>
          </div>
          <button class="btn btn-primary" style="padding: 8px 18px; font-size: 13px; background: #E50914; white-space: nowrap;" onclick="window.timetableModal && window.timetableModal.open()">
            Scan Timetable Photo
          </button>
        </div>

        ${blocks.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">⏱️</div>
              <div class="empty-state-title">No routine blocks set</div>
              <div class="empty-state-desc">Assign specific focus blocks to your day, or scan a timetable photo to auto-generate your schedule.</div>
              <div style="display: flex; gap: 10px; justify-content: center; margin-top: 14px;">
                <button class="btn btn-primary" onclick="window.modalComponent.open('timeblock')">Create Time Block</button>
                <button class="btn btn-secondary" onclick="window.timetableModal && window.timetableModal.open()">📷 Scan Timetable Photo</button>
              </div>
            </div>
          </div>
        ` : `
          <div class="card" style="padding: var(--spacing-4);">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${blocks.sort((a,b) => (a.time || '').localeCompare(b.time || '')).map(b => `
                <div style="display: flex; align-items: center; gap: 16px; padding: 14px 16px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent-primary);">
                  <div style="width: 75px; font-size: 15px; font-weight: 800; color: var(--text-primary);">${b.time || '09:00'}</div>
                  <div style="flex: 1;">
                    <div style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${b.title}</div>
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">${b.duration || '60 mins'}</div>
                  </div>
                  <button class="btn btn-icon" onclick="window.routineView.confirmDelete('${b.id}')" title="Delete block">
                    <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Time Block',
      message: 'Are you sure you want to delete this routine block?',
      onConfirm: () => {
        window.store.setState({ routineBlocks: (window.store.state.routineBlocks || []).filter(b => b.id !== id) });
        if (window.showToast) window.showToast('Time block removed', 'info');
      }
    });
  }
}

window.routineView = new RoutineView();
