/**
 * PLANIX — HUMAN-FIRST CALM DASHBOARD VIEW
 * A private office command center where intelligence works silently in the background.
 */

class DashboardView {
  render(state) {
    const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const pendingTasks = state.tasks.filter(t => !t.completed);
    const completedTasks = state.tasks.filter(t => t.completed);
    const topFocus = pendingTasks[0] || null;

    // Greeting based on real hour
    const hour = new Date().getHours();
    let timeGreeting = 'Good Evening';
    if (hour < 12) timeGreeting = 'Good Morning';
    else if (hour < 18) timeGreeting = 'Good Afternoon';

    // Dynamic metrics
    const totalTasks = state.tasks.length || 1;
    const completionPct = Math.round((completedTasks.length / totalTasks) * 100);
    const habits = state.habits || [];
    const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak || 0)) : 7;

    // Active time slot detection based on system hour
    let activeIndex = 1;
    if (hour < 7) activeIndex = 0;
    else if (hour < 11) activeIndex = 1;
    else if (hour < 17) activeIndex = 2;
    else if (hour < 20) activeIndex = 3;
    else if (hour < 22) activeIndex = 4;
    else activeIndex = 5;

    const timelineItems = [
      { time: '06:30 AM', title: 'Wake Up & Morning Mindfulness', icon: '🌅' },
      { time: '08:30 AM', title: 'Deep Focus Block (High Priority)', icon: '🎯' },
      { time: '11:30 AM', title: 'Project Implementation & Core Code', icon: '💻' },
      { time: '05:30 PM', title: 'Fitness & Health Workout Block', icon: '🏋️‍♂️' },
      { time: '08:00 PM', title: 'Reading & Knowledge Capture', icon: '📚' },
      { time: '10:30 PM', title: 'Wind Down & Sleep Protocol', icon: '🌙' }
    ];

    return `
      <div class="animate-fade-in">
        
        <!-- Header: Calm Greeting & Date -->
        <div class="view-header" style="margin-bottom: 24px;">
          <div>
            <div style="font-size: 12px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
              ${todayStr}
            </div>
            <h1 class="view-title" style="font-size: 26px;">${timeGreeting}, ${state.user.name.split(' ')[0]}.</h1>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" onclick="window.store.setState({ currentView: 'study' })">
              ⏱️ Focus Timer
            </button>
            <button class="btn btn-primary" onclick="window.store.setState({ currentView: 'tasks' })">
              + New Task
            </button>
          </div>
        </div>

        <!-- Progress Snapshot (Top High-Level Metrics) -->
        <div class="snapshot-grid" style="margin-bottom: 24px;">
          <div class="snapshot-card">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Tasks Completed</span>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #fff;">${completedTasks.length}/${totalTasks} (${completionPct}%)</span>
          </div>
          <div class="snapshot-card">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Habit Streak</span>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--accent-red);">${maxStreak} Days 🔥</span>
          </div>
          <div class="snapshot-card">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Study Hours</span>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #fff;">24.5 Hours</span>
          </div>
          <div class="snapshot-card">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Focus Velocity</span>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--accent-gold);">18.2 Hours</span>
          </div>
          <div class="snapshot-card">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">Journal Streak</span>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #fff;">7 Days 📝</span>
          </div>
        </div>

        <!-- Main Command Grid (8 Cols Left, 4 Cols Right) -->
        <div class="command-center-grid">
          
          <!-- LEFT COLUMN (8 cols) -->
          <div style="grid-column: span 8; display: flex; flex-direction: column; gap: 24px;">
            
            <!-- SECTION 1: TODAY'S MISSION (HERO CARD) -->
            <section class="hero-mission-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span class="badge badge-urgent" style="font-size: 11px; letter-spacing: 1px;">TODAY'S MISSION #1</span>
                <span style="font-size: 12px; color: var(--text-tertiary);">Est. Focus: 45 Mins • Target: 18:00</span>
              </div>
              
              ${topFocus ? `
                <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1.3; margin-bottom: 16px;">
                  ${topFocus.text}
                </h2>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <button class="btn btn-hero" onclick="window.store.setState({ currentView: 'study' })">
                    <span>⚡ Start Focus Session</span>
                  </button>
                  <button class="btn btn-hero-outline" onclick="window.dashboardView.completeTask('${topFocus.id}')">
                    <span>✓ Complete Mission</span>
                  </button>
                </div>
              ` : `
                <h2 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--text-secondary); margin-bottom: 16px;">
                  🎉 Mission Accomplished! All high-priority tasks completed for today.
                </h2>
                <button class="btn btn-hero" onclick="window.store.setState({ currentView: 'tasks' })">
                  <span>+ Plan Next Action</span>
                </button>
              `}
            </section>

            <!-- SECTION 2: NORTH STAR LONG-TERM GOAL -->
            <section class="goal-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-red); text-transform: uppercase; letter-spacing: 1px;">NORTH STAR GOAL</div>
                  <h3 style="font-family: var(--font-display); font-size: 19px; font-weight: 800; color: #fff; margin-top: 2px;">Build PLANIX Version 1.0</h3>
                </div>
                <div style="text-align: right;">
                  <span style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: #fff;">42%</span>
                  <div style="font-size: 12px; color: var(--text-tertiary);">134 Days Remaining</div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="goal-progress-track">
                <div class="goal-progress-fill" style="width: 42%;"></div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
                <div>
                  <div style="font-size: 11px; color: var(--text-tertiary);">Today's Contribution</div>
                  <div style="font-size: 13px; font-weight: 700; color: var(--accent-gold);">Complete Authentication Module</div>
                </div>
                <div>
                  <div style="font-size: 11px; color: var(--text-tertiary);">Next Milestone</div>
                  <div style="font-size: 13px; font-weight: 700; color: #fff;">System Architecture Audit</div>
                </div>
              </div>
            </section>

            <!-- SECTION 3: NEXT FOCUS SESSION WIDGET WITH EMBEDDED HINT -->
            <section class="card" style="border-top: 3px solid var(--accent-gold);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">NEXT FOCUS SESSION</div>
                  <h3 style="font-size: 17px; font-weight: 700; color: #fff; margin-top: 2px;">System Architecture Focus Block</h3>
                </div>
                <span class="badge badge-health">5 Day Streak 🔥</span>
              </div>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
                Duration: <strong>50 Minutes</strong> • Block uninterrupted focus time to enter flow state.
              </p>

              <!-- Embedded Natural Suggestion -->
              <div style="font-size: 12px; color: var(--text-secondary); background: var(--bg-input); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <span>💡</span>
                <span>You're usually most productive between 8:00 PM and 10:00 PM based on past completion velocity.</span>
              </div>

              <button class="btn btn-indigo" onclick="window.store.setState({ currentView: 'study' })">
                ▶ Start 50-Min Focus Session
              </button>
            </section>

            <!-- SECTION 4: QUICK CONTINUE -->
            <section>
              <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 12px;">Quick Continue</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                <div class="card" style="cursor: pointer; padding: 14px;" onclick="window.store.setState({ currentView: 'notes' })">
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">RECENT NOTE</div>
                  <div style="font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Solidity Contracts</div>
                </div>
                <div class="card" style="cursor: pointer; padding: 14px;" onclick="window.store.setState({ currentView: 'routine' })">
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">DAILY ROUTINE</div>
                  <div style="font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Morning Focus Block</div>
                </div>
                <div class="card" style="cursor: pointer; padding: 14px;" onclick="window.store.setState({ currentView: 'tasks' })">
                  <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">ACTIVE PROJECT</div>
                  <div style="font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">PLANIX Full Stack OS</div>
                </div>
              </div>
            </section>

          </div>

          <!-- RIGHT COLUMN (4 cols) -->
          <div style="grid-column: span 4; display: flex; flex-direction: column; gap: 24px;">
            
            <!-- SECTION 5: TODAY'S TIMELINE -->
            <section class="card">
              <div style="font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 14px;">Today's Timeline</div>
              <div class="vertical-timeline">
                ${timelineItems.map((item, idx) => `
                  <div class="timeline-item ${idx === activeIndex ? 'active' : ''}">
                    <div class="timeline-node"></div>
                    <div style="flex: 1;">
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 11px; font-weight: 700; color: ${idx === activeIndex ? 'var(--accent-red)' : 'var(--text-tertiary)'};">${item.time}</span>
                        ${idx === activeIndex ? '<span class="badge badge-urgent" style="font-size: 10px; padding: 2px 6px;">NOW</span>' : ''}
                      </div>
                      <div style="font-size: 13px; font-weight: 600; color: #fff; margin-top: 2px;">${item.icon} ${item.title}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- SECTION 6: UPCOMING MILESTONES -->
            <section class="card">
              <div style="font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 12px;">Upcoming Milestones</div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                  <span style="color: #fff; font-weight: 600;">System Design Audit</span>
                  <span style="color: var(--accent-red); font-size: 12px; font-weight: 700;">Tomorrow</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                  <span style="color: #fff; font-weight: 600;">Sem-2 Final Exam</span>
                  <span style="color: var(--text-tertiary); font-size: 12px;">In 5 Days</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                  <span style="color: #fff; font-weight: 600;">Production Security Review</span>
                  <span style="color: var(--text-tertiary); font-size: 12px;">In 8 Days</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    `;
  }

  async completeTask(id) {
    if (!id || id === 'undefined') return;
    const res = await window.apiClient.put(`/tasks/${id}`, { completed: true });
    if (res.success || res.offline) {
      window.store.setState(prev => ({
        tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: true } : t)
      }));
    }
  }
}

window.dashboardView = new DashboardView();
