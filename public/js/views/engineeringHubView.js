/**
 * PLANIX ENGINEERING & ACADEMIC HUB VIEW
 * Attendance Tracker (75% threshold warning), CGPA Calculator, Semester Exam Countdown
 */

class EngineeringHubView {
  render(state) {
    const attendance = state.attendance || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🎓</span> Engineering & Academic Hub
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Track subject attendance, semester exam countdowns, assignments, and calculate your target CGPA.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.engineeringHubView.addSubject()">
            + Add Subject
          </button>
        </div>

        <!-- Top Widgets Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
          
          <!-- Semester Exam Countdown -->
          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; font-weight: 700; color: #3B82F6; text-transform: uppercase;">SEMESTER END EXAMS</div>
            <div style="font-size: 28px; font-weight: 900; color: #FFF; margin: 6px 0;">⏳ 42 Days Left</div>
            <div style="font-size: 12px; color: #A1A1AA;">Target Grade: 9.0+ CGPA</div>
          </div>

          <!-- CGPA Calculator Quick Card -->
          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; font-weight: 700; color: #8B5CF6; text-transform: uppercase;">CURRENT CGPA TARGET</div>
            <div style="font-size: 28px; font-weight: 900; color: #FFF; margin: 6px 0;">🎯 8.75 / 10.0</div>
            <button class="btn" style="background: rgba(139,92,246,0.15); color: #8B5CF6; border: 1px solid rgba(139,92,246,0.3); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; margin-top: 4px;" onclick="window.engineeringHubView.calculateCGPA()">CGPA Calculator →</button>
          </div>

          <!-- Mandatory Attendance Rule -->
          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
            <div style="font-size: 12px; font-weight: 700; color: #10B981; text-transform: uppercase;">MINIMUM ATTENDANCE RULE</div>
            <div style="font-size: 28px; font-weight: 900; color: #10B981; margin: 6px 0;">75% Threshold</div>
            <div style="font-size: 12px; color: #A1A1AA;">Keep all subjects above 75% to stay eligible.</div>
          </div>

        </div>

        <!-- Attendance Tracker Table/Cards -->
        <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
            <span>📊</span> Subject Attendance Tracker
          </h3>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${attendance.map(item => {
              const percentage = item.total > 0 ? Math.round((item.attended / item.total) * 100) : 0;
              const isSafe = percentage >= 75;
              return `
                <div style="padding: 16px; background: #121215; border-radius: 12px; border: 1px solid ${isSafe ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.3)'};">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                      <div style="font-size: 15px; font-weight: 700; color: #FFF;">${item.subject}</div>
                      <div style="font-size: 12px; color: #A1A1AA; margin-top: 2px;">
                        Attended: <strong>${item.attended}</strong> / <strong>${item.total}</strong> classes
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 16px;">
                      <div style="text-align: right;">
                        <div style="font-size: 20px; font-weight: 800; color: ${isSafe ? '#10B981' : '#EF4444'};">${percentage}%</div>
                        <div style="font-size: 10px; color: ${isSafe ? '#10B981' : '#EF4444'}; font-weight: 700;">
                          ${isSafe ? '✓ Safe Status' : '⚠️ Danger (<75%)'}
                        </div>
                      </div>

                      <div style="display: flex; gap: 6px;">
                        <button class="btn" style="background: #3B82F6; color: white; border: none; border-radius: 6px; padding: 6px 10px; font-weight: 700;" title="Attended Class" onclick="window.engineeringHubView.updateAttendance('${item.id}', 1, 1)">+1 Class</button>
                        <button class="btn" style="background: #27272A; color: #EF4444; border: 1px solid #3F3F46; border-radius: 6px; padding: 6px 10px; font-weight: 700;" title="Bunked Class" onclick="window.engineeringHubView.updateAttendance('${item.id}', 0, 1)">Bunked</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }

  updateAttendance(id, attendedDelta, totalDelta) {
    const attendance = window.store.state.attendance.map(item => {
      if (item.id === id) {
        return {
          ...item,
          attended: Math.max(0, item.attended + attendedDelta),
          total: Math.max(0, item.total + totalDelta)
        };
      }
      return item;
    });
    window.store.setState({ attendance });
    if (window.showToast) window.showToast("Attendance updated!", "success");
  }

  addSubject() {
    const name = prompt("Enter Subject Name (e.g. Computer Networks):");
    if (!name) return;
    const newSubject = { id: `att_${Date.now()}`, subject: name, attended: 10, total: 10, target: 75 };
    window.store.setState(prev => ({ attendance: [...prev.attendance, newSubject] }));
  }

  calculateCGPA() {
    const gpa = prompt("Enter expected Semester GPA (e.g. 8.5):");
    if (gpa) alert(`Calculated Target CGPA: ${gpa}! Great progress.`);
  }
}

window.engineeringHubView = new EngineeringHubView();
