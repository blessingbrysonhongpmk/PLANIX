/**
 * PLANIX CALENDAR VIEW (நாட்காட்டி)
 * Monthly schedule grid showing tasks & habits by date
 */

class CalendarView {
  render(state) {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthStr = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>📅</span> Calendar & Schedule (நாட்காட்டி)
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              View your monthly scheduled tasks and habit streak logs.
            </p>
          </div>

          <div style="font-size: 18px; font-weight: 800; color: #E50914; background: #141417; padding: 10px 18px; border-radius: 12px; border: 1px solid #27272A;">
            ${currentMonthStr}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
          <!-- Days Header -->
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: 700; font-size: 12px; color: #71717A; text-transform: uppercase; padding-bottom: 14px; border-bottom: 1px solid #27272A;">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <!-- Days Cells -->
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 14px;">
            ${Array.from({ length: 31 }, (_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === today.getDate();
              return `
                <div style="min-height: 70px; background: ${isToday ? 'rgba(229,9,20,0.15)' : '#1C1C21'}; border: 1px solid ${isToday ? '#E50914' : '#27272A'}; border-radius: 10px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="font-size: 13px; font-weight: 700; color: ${isToday ? '#E50914' : '#FFF'};">${dayNum}</div>
                  ${isToday ? `<div style="font-size: 10px; background: #E50914; color: white; border-radius: 4px; padding: 2px 4px; font-weight: 700;">Today</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }
}

window.calendarView = new CalendarView();
