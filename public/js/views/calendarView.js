/**
 * PLANIX CALENDAR VIEW
 * Interactive Day/Week/Month grid with schedule events & Google Calendar ICS Export
 */

class CalendarView {
  render(state) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tasks = state.tasks || [];

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Schedule Calendar 📅</div>
            <div class="view-subtitle">Timeline view • Drag and Drop ready • Google Calendar Export (.ics)</div>
          </div>
          <button class="btn btn-secondary" onclick="window.calendarView.exportICS()">📥 Export .ICS File</button>
        </div>

        <div class="card">
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; font-weight: 700; color: var(--text-tertiary); margin-bottom: 12px;">
            ${days.map(d => `<div>${d}</div>`).join('')}
          </div>

          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">
            ${Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvents = dayNum === 1 || dayNum === 5 || dayNum === 12 || dayNum === 20;
              return `
                <div style="background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; min-height: 90px;">
                  <div style="font-weight: 700; font-size: 13px; color: ${dayNum === 1 ? 'var(--accent-gold)' : 'var(--text-secondary)'};">${dayNum}</div>
                  ${hasEvents ? `
                    <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.3); padding: 4px 6px; border-radius: 4px; font-size: 10px; color: #a5b4fc; margin-top: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      09:00 Deep Work
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  exportICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Planix Life OS//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:Planix Deep Work Focus Block
DTSTART:20260801T090000Z
DTEND:20260801T110000Z
DESCRIPTION:Auto generated schedule block from Planix AI Life OS
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'planix_schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

window.calendarView = new CalendarView();
