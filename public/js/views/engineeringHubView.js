/**
 * PLANIX ENGINEERING HUB — Attendance tracker, CGPA, semester countdown
 */

class EngineeringHubView {
  render(state) {
    const attendance = state.attendance || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Engineering Hub</h1>
            <p class="page-description">Track attendance, monitor the 75% threshold, and calculate your target CGPA.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.engineeringHubView.addSubject()">+ Add Subject</button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-primary);">Exam Countdown</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 4px 0;">42 days</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-secondary);">CGPA Target</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 4px 0;">8.75</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-success);">Min. Attendance</div>
            <div style="font-size: 28px; font-weight: 800; color: var(--color-success); margin: 4px 0;">75%</div>
          </div>
        </div>

        <!-- Attendance List -->
        <div class="card" style="padding: var(--spacing-4);">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">Subject Attendance</h3>

          ${attendance.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🎓</div>
              <div class="empty-state-title">No subjects added</div>
              <div class="empty-state-desc">Add your semester subjects to track attendance and stay above 75%.</div>
              <button class="btn btn-primary" onclick="window.engineeringHubView.addSubject()">Add Subject</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${attendance.map(s => {
                const pct = s.total > 0 ? Math.round((s.attended / s.total) * 100) : 100;
                const safe = pct >= 75;
                return `
                  <div style="padding: 14px 16px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid ${safe ? 'var(--border-subtle)' : 'rgba(239,68,68,0.3)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                      <div>
                        <div style="font-size: 15px; font-weight: 600; color: var(--text-primary);">${s.subject}</div>
                        <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">${s.attended} / ${s.total} classes</div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="text-align: right;">
                          <div style="font-size: 20px; font-weight: 800; color: ${safe ? 'var(--color-success)' : 'var(--color-danger)'};">${pct}%</div>
                          <div style="font-size: 10px; font-weight: 600; color: ${safe ? 'var(--color-success)' : 'var(--color-danger)'};">${safe ? '✓ Safe' : '⚠ Below 75%'}</div>
                        </div>
                        <div style="display: flex; gap: 6px;">
                          <button class="btn btn-primary" style="padding: 6px 10px; font-size: 12px; min-height: auto;" onclick="window.engineeringHubView.markAttended('${s.id}')">Present</button>
                          <button class="btn btn-secondary" style="padding: 6px 10px; font-size: 12px; min-height: auto;" onclick="window.engineeringHubView.markAbsent('${s.id}')">Absent</button>
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

  addSubject() {
    const name = prompt('Subject name (e.g. Data Structures):');
    if (!name) return;
    window.store.setState(prev => ({ attendance: [...prev.attendance, { id: `att_${Date.now()}`, subject: name, attended: 0, total: 0, target: 75 }] }));
  }

  markAttended(id) {
    const attendance = window.store.state.attendance.map(s => s.id === id ? { ...s, attended: s.attended + 1, total: s.total + 1 } : s);
    window.store.setState({ attendance });
  }

  markAbsent(id) {
    const attendance = window.store.state.attendance.map(s => s.id === id ? { ...s, total: s.total + 1 } : s);
    window.store.setState({ attendance });
  }
}

window.engineeringHubView = new EngineeringHubView();
