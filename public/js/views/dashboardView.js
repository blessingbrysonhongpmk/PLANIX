/**
 * PLANIX V5 DASHBOARD VIEW — High Fidelity Productivity OS
 * Exact replica of the signature PLANIX dashboard design spec.
 */

class DashboardView {
  constructor() {
    this.taskFilter = 'all'; // all, important, completed
  }

  render(state) {
    const user = state.user || {};
    const tasks = state.tasks || [];
    const habits = state.habits || [];
    const goals = state.goals || [];
    const events = state.calendarEvents || [];

    // Pending vs Completed tasks count
    const pendingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    const importantTasks = tasks.filter(t => !t.completed && (t.priority === 'high' || t.priority === 'urgent'));

    let filteredTasks = tasks;
    if (this.taskFilter === 'important') filteredTasks = importantTasks;
    if (this.taskFilter === 'completed') filteredTasks = completedTasks;
    if (this.taskFilter === 'all') filteredTasks = tasks;

    // Habits done count
    const habitsDone = habits.filter(h => h.completedToday).length;
    const totalHabits = habits.length || 6;

    return `
      <div class="view-container animate-fade-in" style="display: flex; flex-direction: column; gap: 20px;">

        <!-- 1. GREETING HEADER -->
        <div style="margin-bottom: 4px;">
          <h1 style="font-size: 28px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 0; display: flex; align-items: center; gap: 8px;">
            Good evening, <span style="color: #E50914;">${user.name || 'Blessing Bryson'}</span> 👋
          </h1>
          <p style="font-size: 13px; color: var(--text-tertiary); margin-top: 4px;">
            Stay focused. Stay consistent. Your future is being built today.
          </p>
        </div>

        <!-- 2. TOP METRIC STATS ROW (4 CARDS) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
          <!-- Tasks Today -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(229, 9, 20, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-red); flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase;">Tasks Today</div>
              <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.1; margin-top: 2px;">${tasks.length}</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${completedTasks.length} completed</div>
            </div>
          </div>

          <!-- Focus Time -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(229, 9, 20, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-red); flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase;">Focus Time</div>
              <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.1; margin-top: 2px;">2h 45m</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Deep work</div>
            </div>
          </div>

          <!-- Habit Streak -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(229, 9, 20, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-red); flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"></path></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase;">Habit Streak</div>
              <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.1; margin-top: 2px;">${user.streak || 12} days</div>
              <div style="font-size: 11px; color: var(--color-success); margin-top: 2px;">Keep going!</div>
            </div>
          </div>

          <!-- Goals Progress -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(229, 9, 20, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-red); flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase;">Goals Progress</div>
              <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.1; margin-top: 2px;">72%</div>
              <div style="font-size: 11px; color: var(--color-success); margin-top: 2px;">On track</div>
            </div>
          </div>
        </div>

        <!-- 3. MAIN DASHBOARD 2-COLUMN GRID (LEFT CONTENT 70% + RIGHT SIDEBAR 30%) -->
        <div style="display: grid; grid-template-columns: 1fr 340px; gap: 20px;" class="dashboard-main-grid">

          <!-- LEFT MAIN CONTENT AREA -->
          <div style="display: flex; flex-direction: column; gap: 20px;">

            <!-- ROW 1: TODAY'S FOCUS & HABIT PROGRESS -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;" class="dashboard-row-1">

              <!-- TODAY'S FOCUS CARD -->
              <div class="card" style="padding: 24px; position: relative; overflow: hidden; background: linear-gradient(135deg, #161619 0%, #111114 100%); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                <!-- Subtle Radial Globe Graphic Background -->
                <div style="position: absolute; right: -40px; bottom: -40px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>

                <div>
                  <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: var(--accent-red); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                    Today's Focus
                  </div>

                  <h2 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0 0 4px 0; line-height: 1.3;">Build Campus Sentinel – Backend</h2>
                  <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 16px;">Smart Campus Safety System</div>

                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 10px; font-weight: 800; background: rgba(229,9,20,0.2); color: #FF4D4D; padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(229,9,20,0.4); text-transform: uppercase; letter-spacing: 0.5px;">HIGH PRIORITY</span>
                  </div>

                  <div style="display: flex; justify-content: flex-end; font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">
                    60%
                  </div>
                  <div class="progress-track" style="height: 6px; margin-bottom: 20px;">
                    <div class="progress-fill" style="width: 60%;"></div>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
                  <div style="font-size: 11px; color: var(--text-tertiary); display: flex; align-items: center; gap: 12px;">
                    <span>📅 Due Tomorrow</span>
                    <span>🕒 2h 30m estimated</span>
                  </div>
                  <button class="btn btn-primary" style="padding: 6px 16px; font-size: 12px; font-weight: 700;" onclick="window.store.setState({ currentView: 'projects' })">
                    Continue →
                  </button>
                </div>
              </div>

              <!-- HABIT PROGRESS CARD -->
              <div class="card" style="padding: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #FFFFFF;">
                      <span style="color: var(--accent-red);">💥</span> Habit Progress
                    </div>
                    <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'habits' })" style="font-size: 12px; color: var(--accent-red); text-decoration: none; font-weight: 600;">View all</a>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px;">
                    <!-- Donut Gauge SVG -->
                    <div style="position: relative; width: 84px; height: 84px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 36 36" width="84" height="84" style="transform: rotate(-90deg);">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="3.5" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E50914" stroke-width="3.5" stroke-dasharray="85, 100" stroke-linecap="round" />
                      </svg>
                      <div style="position: absolute; text-align: center;">
                        <div style="font-size: 22px; font-weight: 900; color: #FFFFFF; line-height: 1;">12</div>
                        <div style="font-size: 9px; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase;">Day Streak</div>
                      </div>
                    </div>

                    <!-- Weekly Matrix Dots -->
                    <div style="flex: 1;">
                      <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-align: right; margin-bottom: 8px;">This Week</div>
                      <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-tertiary); margin-bottom: 6px; font-weight: 600;">
                        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #E50914; box-shadow: 0 0 6px rgba(229,9,20,0.6);"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #E50914; box-shadow: 0 0 6px rgba(229,9,20,0.6);"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #E50914; box-shadow: 0 0 6px rgba(229,9,20,0.6);"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #E50914; box-shadow: 0 0 6px rgba(229,9,20,0.6);"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #E50914; box-shadow: 0 0 6px rgba(229,9,20,0.6);"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #2A2A32;"></div>
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: #2A2A32;"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                    <span>5/6 Habits Completed</span>
                    <span style="font-weight: 700; color: #E50914;">83%</span>
                  </div>
                  <div class="progress-track" style="height: 6px;">
                    <div class="progress-fill" style="width: 83%;"></div>
                  </div>
                </div>
              </div>

            </div>

            <!-- ROW 2: TODAY'S TASKS & GOALS OVERVIEW -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;" class="dashboard-row-2">

              <!-- TODAY'S TASKS CARD -->
              <div class="card" style="padding: 20px 24px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0;">Today's Tasks</h3>
                  <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'tasks' })" style="font-size: 12px; color: var(--accent-red); text-decoration: none; font-weight: 600;">View all</a>
                </div>

                <!-- Filter Tabs -->
                <div style="display: flex; gap: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; margin-bottom: 14px;">
                  <button class="btn ${this.taskFilter === 'all' ? 'btn-primary' : 'btn-ghost'}" style="padding: 4px 10px; font-size: 11px; min-height: auto; border-radius: 4px;" onclick="window.dashboardView.taskFilter = 'all'; window.store.notify()">All (8)</button>
                  <button class="btn ${this.taskFilter === 'important' ? 'btn-primary' : 'btn-ghost'}" style="padding: 4px 10px; font-size: 11px; min-height: auto; border-radius: 4px;" onclick="window.dashboardView.taskFilter = 'important'; window.store.notify()">Important (3)</button>
                  <button class="btn ${this.taskFilter === 'completed' ? 'btn-primary' : 'btn-ghost'}" style="padding: 4px 10px; font-size: 11px; min-height: auto; border-radius: 4px;" onclick="window.dashboardView.taskFilter = 'completed'; window.store.notify()">Completed (3)</button>
                </div>

                <!-- Tasks Items -->
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${filteredTasks.slice(0, 5).map(t => `
                    <div style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--bg-input); border-radius: 6px; border: 1px solid var(--border-subtle);">
                      <input type="checkbox" ${t.completed ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: #E50914; cursor: pointer; flex-shrink: 0;" onchange="window.dashboardView.toggleTask('${t.id}')">
                      <span style="flex: 1; font-size: 13px; color: ${t.completed ? 'var(--text-tertiary)' : '#FFFFFF'}; text-decoration: ${t.completed ? 'line-through' : 'none'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.text}</span>
                      <span class="badge badge-${t.priority === 'high' ? 'urgent' : t.priority === 'low' ? 'health' : 'work'}" style="font-size: 9px; padding: 2px 6px;">${(t.priority || 'medium').toUpperCase()}</span>
                      <span style="font-size: 11px; color: var(--text-tertiary); width: 100px; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.label || ''}</span>
                      <span style="font-size: 11px; color: var(--text-tertiary); width: 45px; text-align: right;">${t.est || '1h'}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Quick Add Task Inline -->
                <div style="display: flex; gap: 8px; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                  <input type="text" id="dash-inline-task" class="form-input" placeholder="+ Add new task..." style="font-size: 12px; padding: 6px 12px;" onkeydown="if(event.key==='Enter') window.dashboardView.addQuickTask()">
                  <button class="btn btn-primary" style="padding: 6px 12px; font-size: 14px; font-weight: 800;" onclick="window.dashboardView.addQuickTask()">+</button>
                </div>
              </div>

              <!-- GOALS OVERVIEW CARD -->
              <div class="card" style="padding: 20px 24px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0; display: flex; align-items: center; gap: 6px;">
                    🎯 Goals Overview
                  </h3>
                  <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'goals' })" style="font-size: 12px; color: var(--accent-red); text-decoration: none; font-weight: 600;">View all</a>
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                  <!-- Goal 1 -->
                  <div style="display: flex; align-items: center; gap: 14px; padding: 10px 12px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                    <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 36 36" width="44" height="44" style="transform: rotate(-90deg);">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="4" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E50914" stroke-width="4" stroke-dasharray="72, 100" />
                      </svg>
                      <span style="position: absolute; font-size: 11px; font-weight: 800; color: #FFF;">72%</span>
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 14px; font-weight: 700; color: #FFFFFF;">Become AI Engineer</div>
                      <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 2px;">Target: Dec 2025</div>
                    </div>
                    <span style="font-size: 10px; font-weight: 700; color: var(--color-success);">On Track</span>
                  </div>

                  <!-- Goal 2 -->
                  <div style="display: flex; align-items: center; gap: 14px; padding: 10px 12px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                    <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 36 36" width="44" height="44" style="transform: rotate(-90deg);">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="4" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E50914" stroke-width="4" stroke-dasharray="84, 100" />
                      </svg>
                      <span style="position: absolute; font-size: 11px; font-weight: 800; color: #FFF;">84%</span>
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 14px; font-weight: 700; color: #FFFFFF;">CGPA 9.0+</div>
                      <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 2px;">Target: Apr 2026</div>
                    </div>
                    <span style="font-size: 10px; font-weight: 700; color: var(--color-success);">On Track</span>
                  </div>

                  <!-- Goal 3 -->
                  <div style="display: flex; align-items: center; gap: 14px; padding: 10px 12px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                    <div style="position: relative; width: 44px; height: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 36 36" width="44" height="44" style="transform: rotate(-90deg);">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="4" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" stroke-width="4" stroke-dasharray="40, 100" />
                      </svg>
                      <span style="position: absolute; font-size: 11px; font-weight: 800; color: #FFF;">40%</span>
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 14px; font-weight: 700; color: #FFFFFF;">Complete 5 Major Projects</div>
                      <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 2px;">Target: Dec 2025</div>
                    </div>
                    <span style="font-size: 10px; font-weight: 700; color: #F59E0B;">Delayed</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- ROW 3: WEEKLY PROGRESS, FOCUS TIME & STUDY HOURS -->
            <div style="display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 20px;" class="dashboard-row-3">

              <!-- WEEKLY PROGRESS CHART CARD -->
              <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px;">Weekly Progress</div>
                <!-- Spline SVG Chart -->
                <div style="position: relative; width: 100%; height: 90px;">
                  <svg viewBox="0 0 200 60" width="100%" height="100%" preserveAspectRatio="none">
                    <path d="M0,45 Q30,25 60,35 T120,30 T160,10 T200,30 L200,60 L0,60 Z" fill="rgba(229,9,20,0.15)" />
                    <path d="M0,45 Q30,25 60,35 T120,30 T160,10 T200,30" fill="none" stroke="#E50914" stroke-width="2.5" />
                    <!-- Highlight Peak Dot -->
                    <circle cx="160" cy="10" r="4" fill="#FF1E27" stroke="#FFF" stroke-width="1.5" />
                  </svg>
                  <div style="position: absolute; top: -4px; right: 18%; background: #E50914; color: #FFF; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">78%</div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-tertiary); margin-top: 6px;">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <!-- FOCUS TIME CHART CARD -->
              <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Focus Time</div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <svg viewBox="0 0 36 36" width="56" height="56" style="transform: rotate(-90deg); flex-shrink: 0;">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E50914" stroke-width="4" stroke-dasharray="70, 100" />
                  </svg>
                  <div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">This Week</div>
                    <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">14h 30m</div>
                    <div style="font-size: 10px; color: var(--color-success); font-weight: 700; margin-top: 2px;">+20% from last week</div>
                  </div>
                </div>
              </div>

              <!-- STUDY HOURS CHART CARD -->
              <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Study Hours</div>
                <div style="display: flex; align-items: flex-end; gap: 10px;">
                  <!-- Mini Bar Chart -->
                  <div style="display: flex; align-items: flex-end; gap: 4px; height: 44px; flex-shrink: 0;">
                    <div style="width: 6px; height: 40%; background: #E50914; border-radius: 2px;"></div>
                    <div style="width: 6px; height: 75%; background: #E50914; border-radius: 2px;"></div>
                    <div style="width: 6px; height: 60%; background: #E50914; border-radius: 2px;"></div>
                    <div style="width: 6px; height: 90%; background: #E50914; border-radius: 2px;"></div>
                    <div style="width: 6px; height: 100%; background: #FF1E27; border-radius: 2px;"></div>
                  </div>
                  <div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">This Week</div>
                    <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">18h 45m</div>
                    <div style="font-size: 10px; color: var(--color-success); font-weight: 700; margin-top: 2px;">+15% from last week</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- RIGHT SIDEBAR WIDGET PANEL (CALENDAR, EVENTS, NOTES, QUICK ADD) -->
          <div style="display: flex; flex-direction: column; gap: 20px;" class="dashboard-right-panel">

            <!-- CALENDAR WIDGET -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 0;">Calendar</h3>
                <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'calendar' })" style="font-size: 12px; color: var(--accent-red); text-decoration: none; font-weight: 600;">View full</a>
              </div>

              <!-- Month Switcher -->
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 700; color: #FFFFFF; margin-bottom: 14px;">
                <span>August 2025</span>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-ghost" style="padding: 2px 6px; font-size: 12px; min-height: auto;">&lt;</button>
                  <button class="btn btn-ghost" style="padding: 2px 6px; font-size: 12px; min-height: auto;">&gt;</button>
                </div>
              </div>

              <!-- Calendar Day Names -->
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 10px; font-weight: 700; color: var(--text-tertiary); margin-bottom: 8px;">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>

              <!-- Calendar Date Grid (August 2025 mockup) -->
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 12px; gap: 4px; color: var(--text-secondary);">
                <span style="opacity: 0.3;">28</span><span style="opacity: 0.3;">29</span><span style="opacity: 0.3;">30</span><span style="opacity: 0.3;">31</span><span>1</span><span>2</span><span>3</span>
                <span style="background: #E50914; color: #FFF; border-radius: 50%; font-weight: 800; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">4</span>
                <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
                <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
                <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
              </div>

              <!-- Upcoming Events List inside Calendar Card -->
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 10px;">
                <div style="font-size: 12px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Upcoming Events</div>

                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                    <span style="width: 5px; height: 5px; border-radius: 50%; background: #E50914;"></span> Internal Exam – DSA
                  </span>
                  <span style="color: #FF4D4D; font-weight: 700;">Aug 6</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                    <span style="width: 5px; height: 5px; border-radius: 50%; background: #E50914;"></span> AI Seminar Presentation
                  </span>
                  <span style="color: #FF4D4D; font-weight: 700;">Aug 8</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                    <span style="width: 5px; height: 5px; border-radius: 50%; background: #E50914;"></span> Database Lab Submission
                  </span>
                  <span style="color: #FF4D4D; font-weight: 700;">Aug 10</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                  <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                    <span style="width: 5px; height: 5px; border-radius: 50%; background: #E50914;"></span> Department Meeting
                  </span>
                  <span style="color: #FF4D4D; font-weight: 700;">Aug 12</span>
                </div>
              </div>
            </div>

            <!-- QUICK NOTES WIDGET -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 0;">Quick Notes</h3>
                <a href="#" onclick="event.preventDefault(); window.store.setState({ currentView: 'notes' })" style="font-size: 12px; color: var(--accent-red); text-decoration: none; font-weight: 600;">View all</a>
              </div>

              <div style="padding: 14px; background: var(--bg-input); border-radius: var(--radius-md); border-left: 3px solid #E50914;">
                <div style="font-size: 24px; color: #E50914; font-weight: 900; line-height: 0.8; margin-bottom: 6px;">“</div>
                <p style="font-size: 13px; color: var(--text-secondary); font-style: italic; line-height: 1.5; margin: 0 0 10px 0;">
                  Discipline is choosing between what you want now and what you want most.
                </p>
                <div style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-align: right;">— Abraham Lincoln</div>
              </div>
            </div>

            <!-- QUICK ADD GRID WIDGET -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-bottom: 14px;">Quick Add</div>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;">
                <!-- Task (Active/Checked Red Style) -->
                <button class="btn" style="flex-direction: column; gap: 4px; padding: 12px 4px; background: var(--bg-input); border: 1px solid #E50914; border-radius: var(--radius-md); color: #FFF;" onclick="window.modalComponent.open('task')">
                  <div style="width: 24px; height: 24px; border-radius: 4px; background: #E50914; display: flex; align-items: center; justify-content: center; color: #FFF;">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span style="font-size: 10px; font-weight: 600;">Task</span>
                </button>

                <!-- Note -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 4px; padding: 12px 4px; border-radius: var(--radius-md);" onclick="window.store.setState({ currentView: 'notes' }); window.notesView?.addNote()">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-secondary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">Note</span>
                </button>

                <!-- Goal -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 4px; padding: 12px 4px; border-radius: var(--radius-md);" onclick="window.modalComponent.open('goal')">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-secondary)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">Goal</span>
                </button>

                <!-- Habit -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 4px; padding: 12px 4px; border-radius: var(--radius-md);" onclick="window.modalComponent.open('habit')">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-secondary)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">Habit</span>
                </button>

                <!-- Event -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 4px; padding: 12px 4px; border-radius: var(--radius-md);" onclick="window.modalComponent.open('event')">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--text-secondary)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary);">Event</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  async toggleTask(taskId) {
    const tasks = window.store.state.tasks.map(t => {
      if (t.id === taskId) return { ...t, completed: !t.completed };
      return t;
    });
    window.store.setState({ tasks });
    if (window.showToast) window.showToast('Task updated!', 'success');
    try { await window.apiClient.put(`/tasks/${taskId}`, { completed: tasks.find(t=>t.id===taskId)?.completed }); } catch(e) {}
  }

  addQuickTask() {
    const input = document.getElementById('dash-inline-task');
    if (!input || !input.value.trim()) return;

    const newTask = {
      id: `task_${Date.now()}`,
      text: input.value.trim(),
      priority: 'medium',
      label: 'Campus Sentinel',
      completed: false,
      createdAt: new Date().toISOString()
    };

    input.value = '';
    window.store.setState(prev => ({ tasks: [newTask, ...prev.tasks] }));
    if (window.showToast) window.showToast('Task added!', 'success');
  }
}

window.dashboardView = new DashboardView();
