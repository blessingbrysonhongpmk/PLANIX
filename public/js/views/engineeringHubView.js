/**
 * PLANIX V5 ENGINEERING HUB VIEW — Academic & Attendance Operating System
 * Attendance tracker, 75% threshold safety calculator, CGPA target planner, internal exams countdown.
 */

class EngineeringHubView {
  render(state) {
    const attendance = state.attendance || [];

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Engineering Hub</h1>
            <p class="page-description">Academic management for engineering students — attendance safety calculator and CGPA target planner.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.modalComponent.open('subject')">+ Add Subject</button>
          </div>
        </div>

        <!-- Academic Quick Overview Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-primary); letter-spacing: 0.5px;">Mid-Sem Exam Countdown</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 4px 0;">34 Days</div>
            <div style="font-size: 11px; color: var(--text-tertiary);">Semester 6 • 2026</div>
          </div>

          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-secondary); letter-spacing: 0.5px;">CGPA Target</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 4px 0;">8.75</div>
            <div style="font-size: 11px; color: var(--color-success);">Current CGPA: 8.42 (On track)</div>
          </div>

          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-success); letter-spacing: 0.5px;">Min. Attendance Limit</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--color-success); margin: 4px 0;">75%</div>
            <div style="font-size: 11px; color: var(--text-tertiary);">Strict University Mandate</div>
          </div>
        </div>

        <!-- Attendance Tracker List -->
        <div class="card" style="padding: var(--spacing-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">Subject Attendance Tracker</h3>
          </div>

          ${attendance.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🎓</div>
              <div class="empty-state-title">No subjects added yet</div>
              <div class="empty-state-desc">Add your current semester subjects to monitor class attendance and prevent shortages before exams.</div>
              <button class="btn btn-primary" onclick="window.modalComponent.open('subject')">Add Subject</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${attendance.map(s => {
                const pct = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 100;
                const safe = pct >= (s.target || 75);
                // Calculate how many future classes can miss or must attend to reach target
                const neededToTarget = Math.max(0, Math.ceil((s.target / 100 * s.total - s.attended) / (1 - s.target / 100)));
                const canBunk = Math.max(0, Math.floor((s.attended - (s.target / 100 * s.total)) / (s.target / 100)));

                return `
                  <div style="padding: 16px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid ${safe ? 'var(--border-subtle)' : 'rgba(239,68,68,0.4)'}; border-left: 4px solid ${safe ? 'var(--color-success)' : 'var(--color-danger)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                      <div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${s.subject}</div>
                        <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">
                          Attended ${s.attended} of ${s.total} conducted classes
                          • <span style="color: ${safe ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: 600;">
                              ${safe ? `You can safely miss ~${canBunk} classes` : `Must attend next ~${neededToTarget} classes consecutively!`}
                            </span>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="text-align: right;">
                          <div style="font-size: 22px; font-weight: 800; color: ${safe ? 'var(--color-success)' : 'var(--color-danger)'};">${pct}%</div>
                          <div style="font-size: 10px; font-weight: 700; color: ${safe ? 'var(--color-success)' : 'var(--color-danger)'};">${safe ? '✓ SAFE' : '⚠️ SHORTAGE'}</div>
                        </div>

                        <div style="display: flex; gap: 6px;">
                          <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px; min-height: auto;" onclick="window.engineeringHubView.markAttended('${s.id}')">Present (+1)</button>
                          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; min-height: auto;" onclick="window.engineeringHubView.markAbsent('${s.id}')">Absent (+1)</button>
                          <button class="btn btn-icon" onclick="window.engineeringHubView.confirmDelete('${s.id}')" title="Delete subject">
                            <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  markAttended(id) {
    const attendance = window.store.state.attendance.map(s => s.id === id ? { ...s, attended: s.attended + 1, total: s.total + 1 } : s);
    window.store.setState({ attendance });
    if (window.showToast) window.showToast('Attendance logged (+1 Present)', 'success');
  }

  markAbsent(id) {
    const attendance = window.store.state.attendance.map(s => s.id === id ? { ...s, total: s.total + 1 } : s);
    window.store.setState({ attendance });
    if (window.showToast) window.showToast('Absence recorded (+1 Total)', 'info');
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Remove Subject',
      message: 'Are you sure you want to remove this subject from your attendance tracker?',
      onConfirm: () => {
        window.store.setState({ attendance: window.store.state.attendance.filter(s => s.id !== id) });
        if (window.showToast) window.showToast('Subject removed', 'info');
      }
    });
  }
}

window.engineeringHubView = new EngineeringHubView();
