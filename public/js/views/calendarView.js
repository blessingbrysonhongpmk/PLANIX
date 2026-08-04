/**
 * PLANIX V5 CALENDAR VIEW — High Fidelity UI
 * Exact replica of the signature PLANIX Calendar design spec.
 */

class CalendarView {
  constructor() {
    this.viewMode = 'Week'; // Day, Week, Month, Agenda
  }

  render(state) {
    const H_CELL = 60; // 1 hour = 60px height
    const getTop = (timeStr) => {
      // timeStr like "9:00", "14:30" (24h format string for simplicity of calculation)
      const [h, m] = timeStr.split(':').map(Number);
      return ((h - 8) + (m / 60)) * H_CELL;
    };
    const getHeight = (startStr, endStr) => {
      const [sh, sm] = startStr.split(':').map(Number);
      const [eh, em] = endStr.split(':').map(Number);
      const diff = (eh + em/60) - (sh + sm/60);
      return diff * H_CELL;
    };

    // Color Maps based on Legend: Class(Red), Study(Blue), Work(Green), Personal(Purple), Event(Brown/Orange)
    const cRed = { bg: 'rgba(229, 9, 20, 0.1)', border: '#E50914', text: '#FFF' };
    const cBlue = { bg: 'rgba(59, 130, 246, 0.1)', border: '#3B82F6', text: '#FFF' };
    const cGreen = { bg: 'rgba(16, 185, 129, 0.1)', border: '#10B981', text: '#FFF' };
    const cPurple = { bg: 'rgba(139, 92, 246, 0.1)', border: '#8B5CF6', text: '#FFF' };
    const cOrange = { bg: 'rgba(245, 158, 11, 0.1)', border: '#F59E0B', text: '#FFF' };

    const renderEvent = (title, subText, start, end, colorMap) => {
      const top = getTop(start);
      const height = getHeight(start, end);
      return `
        <div style="position: absolute; top: ${top}px; height: ${height}px; left: 4px; right: 4px; background: ${colorMap.bg}; border-left: 3px solid ${colorMap.border}; border-radius: 4px; padding: 6px; overflow: hidden; display: flex; flex-direction: column; gap: 2px;">
          <div style="font-size: 11px; font-weight: 700; color: ${colorMap.text}; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${title}</div>
          <div style="font-size: 9px; color: var(--text-tertiary);">${subText}</div>
        </div>
      `;
    };

    return `
      <div class="view-container animate-fade-in" style="padding-right: 10px; display: grid; grid-template-columns: 1fr 280px; gap: 32px; min-height: 100vh;">

        <!-- 1. LEFT MAIN CALENDAR GRID -->
        <div style="display: flex; flex-direction: column;">
          
          <!-- Header -->
          <div style="margin-bottom: 24px;">
            <h1 style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 0 0 6px 0; line-height: 1.2;">Calendar</h1>
            <p style="font-size: 13px; color: var(--text-tertiary); margin: 0;">Plan your days. Stay consistent. Achieve your goals.</p>
          </div>

          <!-- Controls Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div style="display: flex; gap: 20px; font-size: 13px; font-weight: 600;">
              <div style="cursor: pointer; color: var(--text-tertiary);">Day</div>
              <div style="cursor: pointer; color: #E50914; border-bottom: 2px solid #E50914; padding-bottom: 4px;">Week</div>
              <div style="cursor: pointer; color: var(--text-tertiary);">Month</div>
              <div style="cursor: pointer; color: var(--text-tertiary);">Agenda</div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 16px; font-size: 14px; font-weight: 700; color: #FFF;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="cursor: pointer;"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>May 5 – May 11, 2025</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="cursor: pointer;"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <button class="btn btn-ghost" style="padding: 4px 12px; font-size: 12px; border: 1px solid var(--border-subtle); color: var(--text-primary);">Today</button>
            </div>

            <div style="display: flex; gap: 12px;">
              <button class="btn btn-primary" style="padding: 6px 16px; font-size: 12px; font-weight: 700;">+ Add Event</button>
              <button class="btn btn-ghost" style="padding: 6px 16px; font-size: 12px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter
              </button>
            </div>
          </div>

          <!-- Weekly Grid Wrapper -->
          <div style="flex: 1; border: 1px solid #1C1C21; background: #0A0A0C; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
            
            <!-- Grid Header (Days) -->
            <div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); border-bottom: 1px solid #1C1C21; background: #0F0F13;">
              <div style="border-right: 1px solid #1C1C21;"></div>
              ${[
                { day: 'Mon', date: 'May 5' },
                { day: 'Tue', date: 'May 6' },
                { day: 'Wed', date: '7', active: true },
                { day: 'Thu', date: 'May 8' },
                { day: 'Fri', date: 'May 9' },
                { day: 'Sat', date: 'May 10' },
                { day: 'Sun', date: 'May 11' }
              ].map(d => `
                <div style="padding: 12px 0; text-align: center; border-right: 1px solid #1C1C21;">
                  <div style="font-size: 11px; font-weight: 600; color: ${d.active ? '#FFF' : 'var(--text-secondary)'};">${d.day}</div>
                  <div style="font-size: 14px; font-weight: 800; color: ${d.active ? '#FFF' : 'var(--text-primary)'}; margin-top: 4px;">
                    ${d.active ? `<span style="display: inline-block; width: 24px; height: 24px; line-height: 24px; background: #E50914; border-radius: 50%;">${d.date}</span>` : d.date}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- All Day Row -->
            <div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); border-bottom: 1px solid #1C1C21; min-height: 36px; align-items: center;">
              <div style="font-size: 10px; color: var(--text-tertiary); text-align: center; border-right: 1px solid #1C1C21; height: 100%; display: flex; align-items: center; justify-content: center;">All day</div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"><div style="background:${cBlue.bg}; border-radius:4px; font-size:9px; padding:2px 4px; color:#FFF; border-left:2px solid ${cBlue.border};">Lab Record</div></div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"><div style="background:${cGreen.bg}; border-radius:4px; font-size:9px; padding:2px 4px; color:#FFF; border-left:2px solid ${cGreen.border};">DSA Practice</div></div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"><div style="background:${cRed.bg}; border-radius:4px; font-size:9px; padding:2px 4px; color:#FFF; border-left:2px solid ${cRed.border};">Project Deadline</div></div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"></div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"><div style="background:${cPurple.bg}; border-radius:4px; font-size:9px; padding:2px 4px; color:#FFF; border-left:2px solid ${cPurple.border};">Internal Exam</div></div>
              <div style="padding: 4px; border-right: 1px solid #1C1C21; height: 100%;"><div style="background:${cOrange.bg}; border-radius:4px; font-size:9px; padding:2px 4px; color:#FFF; border-left:2px solid ${cOrange.border};">Hackathon</div></div>
              <div style="padding: 4px;"></div>
            </div>

            <!-- Time Grid -->
            <div style="position: relative; flex: 1; height: ${15 * H_CELL}px; overflow-y: auto;">
              <!-- Horizontal Lines & Time Labels -->
              ${Array.from({length: 15}).map((_, i) => `
                <div style="position: absolute; top: ${i * H_CELL}px; left: 0; right: 0; border-top: 1px solid #1C1C21; display: flex; pointer-events: none;">
                  <div style="width: 60px; text-align: center; font-size: 10px; color: var(--text-tertiary); transform: translateY(-7px); background: #0A0A0C;">
                    ${i + 8 > 12 ? (i+8-12)+' PM' : i+8 === 12 ? '12 PM' : (i+8)+' AM'}
                  </div>
                </div>
              `).join('')}

              <!-- Vertical Column Lines -->
              <div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); position: absolute; top: 0; bottom: 0; left: 0; right: 0; pointer-events: none;">
                <div style="border-right: 1px solid #1C1C21;"></div>
                ${Array.from({length: 7}).map(() => `<div style="border-right: 1px solid #1C1C21; position: relative;"></div>`).join('')}
              </div>

              <!-- EVENTS OVERLAY -->
              <div style="display: grid; grid-template-columns: 60px repeat(7, 1fr); position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
                <div></div> <!-- Time column empty -->
                
                <!-- Mon -->
                <div style="position: relative;">
                  ${renderEvent('ML Class', '9:00 - 10:30 AM<br>Room 301', '9:00', '10:30', cRed)}
                  ${renderEvent('Data Structures', '11:00 AM - 12:00 PM', '11:00', '12:00', cBlue)}
                  ${renderEvent('Library Session', '2:00 - 4:00 PM', '14:00', '16:00', cGreen)}
                  ${renderEvent('Gym', '6:00 - 7:00 PM', '18:00', '19:00', cPurple)}
                </div>

                <!-- Tue -->
                <div style="position: relative;">
                  ${renderEvent('DSA Practice', '8:00 - 9:30 AM', '8:00', '9:30', cOrange)}
                  ${renderEvent('Web Tech', '11:00 AM - 12:30 PM', '11:00', '12:30', cPurple)}
                  ${renderEvent('Project Work', '3:00 - 5:30 PM', '15:00', '17:30', cOrange)}
                </div>

                <!-- Wed -->
                <div style="position: relative;">
                  ${renderEvent('AI Class', '9:00 - 10:30 AM<br>Room 205', '9:00', '10:30', cRed)}
                  ${renderEvent('Campus Sentinel', '1:00 - 3:00 PM', '13:00', '15:00', cBlue)}
                  ${renderEvent('Study Group', '7:00 - 8:30 PM', '19:00', '20:30', cRed)}
                </div>

                <!-- Thu -->
                <div style="position: relative;">
                  ${renderEvent('OOPs using Java', '10:00 - 11:30 AM', '10:00', '11:30', cGreen)}
                  ${renderEvent('DBMS Lab', '2:00 - 5:00 PM<br>Lab 1', '14:00', '17:00', cBlue)}
                  ${renderEvent('Coding Contest Prep', '6:30 - 8:00 PM', '18:30', '20:00', cOrange)}
                </div>

                <!-- Fri -->
                <div style="position: relative;">
                  ${renderEvent('Internal Exam - DSA', '9:00 - 11:00 AM<br>Hall A', '9:00', '11:00', cRed)}
                  ${renderEvent('Project Review', '2:00 - 3:30 PM', '14:00', '15:30', cPurple)}
                  ${renderEvent('Resume Building', '5:00 - 6:00 PM', '17:00', '18:00', cGreen)}
                </div>

                <!-- Sat -->
                <div style="position: relative;">
                  ${renderEvent('Hackathon Day 1', '10:00 AM - 6:00 PM', '10:00', '18:00', cOrange)}
                  ${renderEvent('Movie Time', '7:00 - 9:00 PM', '19:00', '21:00', cPurple)}
                </div>

                <!-- Sun -->
                <div style="position: relative;">
                  ${renderEvent('Weekly Planning', '11:00 AM - 12:00 PM', '11:00', '12:00', cBlue)}
                  ${renderEvent('Call with Mentor', '5:00 - 6:00 PM', '17:00', '18:00', cGreen)}
                  ${renderEvent('Journal & Reflect', '8:00 - 8:30 PM', '20:00', '20:30', cBlue)}
                </div>
              </div>

            </div>
          </div>
          
          <!-- Legend -->
          <div style="display: flex; gap: 24px; padding-top: 16px; font-size: 11px; font-weight: 600; color: var(--text-secondary);">
            <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #E50914;"></span> Class</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #3B82F6;"></span> Study</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981;"></span> Work</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #8B5CF6;"></span> Personal</div>
            <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #F59E0B;"></span> Event</div>
          </div>

        </div>


        <!-- 2. RIGHT SIDEBAR -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Mini Month Calendar -->
          <div class="card" style="padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">May 2025</span>
              <div style="display: flex; gap: 12px; color: var(--text-secondary);">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="cursor: pointer;"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="cursor: pointer;"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; font-size: 10px; font-weight: 600; color: var(--text-tertiary); margin-bottom: 8px;">
              <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: y-8px x-0px; text-align: center; font-size: 11px; font-weight: 600; color: #FFF; row-gap: 12px;">
              <!-- Prev month days -->
              <div style="color: var(--text-tertiary);">28</div><div style="color: var(--text-tertiary);">29</div><div style="color: var(--text-tertiary);">30</div>
              <!-- Current month days -->
              <div>1</div><div>2</div><div>3</div><div>4</div>
              <div style="color: var(--text-tertiary);">5</div><div>6</div>
              <!-- Highlighted date -->
              <div style="display: flex; align-items: center; justify-content: center;"><span style="width: 20px; height: 20px; line-height: 20px; background: #E50914; border-radius: 50%; color: #FFF; display: inline-block;">7</span></div>
              <div>8</div><div>9</div><div>10</div><div>11</div>
              <div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div>
              <div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div><div>25</div>
              <div>26</div><div>27</div><div>28</div><div>29</div><div>30</div><div>31</div>
              <div style="color: var(--text-tertiary);">1</div>
            </div>
          </div>

          <!-- Upcoming Events List -->
          <div class="card" style="padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 13px; font-weight: 700; color: #FFF; margin: 0;">Upcoming Events</h3>
              <a href="#" style="font-size: 10px; color: #E50914; text-decoration: none; font-weight: 600;">View all</a>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 8px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #8B5CF6; margin-top: 5px;"></span>
                  <div>
                    <div style="font-size: 11px; font-weight: 600; color: #FFF; margin-bottom: 2px;">Internal Exam – DSA</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">May 9, 9:00 AM</div>
                  </div>
                </div>
                <div style="font-size: 10px; color: #E50914; font-weight: 600;">In 2 days</div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 8px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #F59E0B; margin-top: 5px;"></span>
                  <div>
                    <div style="font-size: 11px; font-weight: 600; color: #FFF; margin-bottom: 2px;">Hackathon Day 1</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">May 10, 10:00 AM</div>
                  </div>
                </div>
                <div style="font-size: 10px; color: #F59E0B; font-weight: 600;">In 3 days</div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 8px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #8B5CF6; margin-top: 5px;"></span>
                  <div>
                    <div style="font-size: 11px; font-weight: 600; color: #FFF; margin-bottom: 2px;">Project Deadline</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">May 7, 11:59 PM</div>
                  </div>
                </div>
                <div style="font-size: 10px; color: #E50914; font-weight: 600;">Today</div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 8px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #E50914; margin-top: 5px;"></span>
                  <div>
                    <div style="font-size: 11px; font-weight: 600; color: #FFF; margin-bottom: 2px;">ML Class</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">May 5, 9:00 AM</div>
                  </div>
                </div>
                <div style="font-size: 10px; color: #3B82F6; font-weight: 600;">Tomorrow</div>
              </div>
            </div>
          </div>

          <!-- Tasks Due -->
          <div class="card" style="padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 13px; font-weight: 700; color: #FFF; margin: 0;">Tasks Due</h3>
              <a href="#" style="font-size: 10px; color: #E50914; text-decoration: none; font-weight: 600;">View all</a>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Task 1 -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <div style="width: 14px; height: 14px; border-radius: 3px; border: 1px solid var(--text-tertiary); cursor: pointer;"></div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Finish DBMS Lab Report</div>
                </div>
                <div style="font-size: 10px; color: #E50914;">May 8</div>
              </div>
              <!-- Task 2 (Checked) -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <div style="width: 14px; height: 14px; border-radius: 3px; background: #E50914; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Submit AI Assignment</div>
                </div>
                <div style="font-size: 10px; color: var(--text-tertiary);">May 12</div>
              </div>
              <!-- Task 3 -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <div style="width: 14px; height: 14px; border-radius: 3px; border: 1px solid var(--text-tertiary); cursor: pointer;"></div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Read Chapter 7 (DSA)</div>
                </div>
                <div style="font-size: 10px; color: var(--text-tertiary);">May 9</div>
              </div>
              <!-- Task 4 (Checked) -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <div style="width: 14px; height: 14px; border-radius: 3px; background: #E50914; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#FFF" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Update Resume</div>
                </div>
                <div style="font-size: 10px; color: var(--text-tertiary);">May 11</div>
              </div>
            </div>
          </div>

          <!-- Calendar Stats -->
          <div class="card" style="padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <h3 style="font-size: 13px; font-weight: 700; color: #FFF; margin: 0 0 16px 0;">Calendar Stats</h3>
            
            <div style="display: flex; justify-content: space-between; text-align: center;">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#E50914" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-top: 4px;">12</div>
                <div style="font-size: 9px; color: var(--text-tertiary);">Events</div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3B82F6" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-top: 4px;">28h 30m</div>
                <div style="font-size: 9px; color: var(--text-tertiary);">Scheduled</div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M12 2c0 0-5 5.5-5 11 0 2.76 2.24 5 5 5s5-2.24 5-5c0-5.5-5-11-5-11z"></path></svg>
                <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-top: 4px;">7</div>
                <div style="font-size: 9px; color: var(--text-tertiary);">Goals Aligned</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}

window.calendarView = new CalendarView();
