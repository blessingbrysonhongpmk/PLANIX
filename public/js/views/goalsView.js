/**
 * PLANIX V5 GOALS VIEW — High Fidelity UI
 * Exact replica of the signature PLANIX Goals design spec.
 */

class GoalsView {
  constructor() {
    this.filterTab = 'All Goals'; // All Goals, Active, Completed, Archived
  }

  render(state) {
    const goals = state.goals || [];
    const totalGoals = goals.length || 6;
    const activeGoals = goals.filter(g => g.progress < 100).length || 4;
    const completedGoals = goals.filter(g => g.progress === 100).length || 2;
    const completionRate = '68%';

    // Map UI priorities to badge classes
    const getBadgeClass = (prio) => {
      if (prio === 'high') return 'badge-urgent';
      if (prio === 'medium') return 'badge-warning';
      return 'badge-health';
    };

    return `
      <div class="view-container animate-fade-in" style="padding-right: 10px;">
        
        <!-- ==========================================
             NATIVE MOBILE GOALS
             ========================================== -->
        <div class="mobile-only" style="padding-bottom: 80px;">
          
          <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none;">
            <button class="mobile-chip ${this.filterTab === 'All Goals' ? 'active' : ''}" onclick="window.goalsView.filterTab = 'All Goals'; window.store.notify()">All</button>
            <button class="mobile-chip ${this.filterTab === 'Active' ? 'active' : ''}" onclick="window.goalsView.filterTab = 'Active'; window.store.notify()">Active</button>
            <button class="mobile-chip ${this.filterTab === 'Completed' ? 'active' : ''}" onclick="window.goalsView.filterTab = 'Completed'; window.store.notify()">Done</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${goals.map(goal => `
              <div style="background: #121217; border: 1px solid #22222A; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin: 0 0 4px 0;">${goal.title}</h3>
                    <div style="font-size: 11px; color: #8E8E9E;">${goal.category} • Target: ${goal.deadline}</div>
                  </div>
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: #1A1A22; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                    ${goal.icon || '🎯'}
                  </div>
                </div>
                
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; margin-bottom: 6px;">
                    <span style="color: #8E8E9E;">Progress</span>
                    <span style="color: #FFF;">${goal.progress}%</span>
                  </div>
                  <div style="width: 100%; height: 6px; background: #1A1A22; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${goal.progress}%; height: 100%; background: ${goal.progress === 100 ? '#10B981' : 'linear-gradient(90deg, #E50914, #B91C2D)'}; border-radius: 4px;"></div>
                  </div>
                </div>
              </div>
            `).join('')}
            ${goals.length === 0 ? '<div style="text-align: center; color: #8E8E9E; padding: 40px; font-size: 14px;">No goals found.</div>' : ''}
          </div>

        </div>

        <!-- ==========================================
             DESKTOP GOALS
             ========================================== -->
        <div class="desktop-only" style="display: flex; flex-direction: column; gap: 24px;">        <!-- 1. GREETING HEADER & TABS -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#E50914" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              <div>
                <h1 style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 0; line-height: 1.2;">Goals</h1>
                <p style="font-size: 13px; color: var(--text-tertiary); margin-top: 4px;">Plan your future. Track progress, Achieve more.</p>
              </div>
            </div>
            <button class="btn btn-primary" style="padding: 10px 18px; font-size: 13px; font-weight: 700;" onclick="window.modalComponent.open('goal')">
              + Create Goal
            </button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1px;">
            <div style="display: flex; gap: 24px; font-size: 13px; font-weight: 600;">
              <div style="padding-bottom: 12px; cursor: pointer; color: ${this.filterTab === 'All Goals' ? '#FFF' : 'var(--text-tertiary)'}; border-bottom: 2px solid ${this.filterTab === 'All Goals' ? '#E50914' : 'transparent'};">All Goals</div>
              <div style="padding-bottom: 12px; cursor: pointer; color: var(--text-tertiary); border-bottom: 2px solid transparent;">Active</div>
              <div style="padding-bottom: 12px; cursor: pointer; color: var(--text-tertiary); border-bottom: 2px solid transparent;">Completed</div>
              <div style="padding-bottom: 12px; cursor: pointer; color: var(--text-tertiary); border-bottom: 2px solid transparent;">Archived</div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: #161619; border: 1px solid #2A2A32; border-radius: 6px; color: var(--text-secondary); font-size: 12px; font-weight: 600; cursor: pointer;">
              Sort by: Priority
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        <!-- 2. TOP METRIC STATS ROW (4 CARDS) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
          <!-- Total Goals -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(229, 9, 20, 0.08); display: flex; align-items: center; justify-content: center; color: var(--accent-red); flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Total Goals</div>
              <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1;">${totalGoals}</div>
              <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">All time</div>
            </div>
          </div>

          <!-- Active Goals -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(16, 185, 129, 0.08); display: flex; align-items: center; justify-content: center; color: #10B981; flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Active Goals</div>
              <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1;">${activeGoals}</div>
              <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">Currently tracking</div>
            </div>
          </div>

          <!-- Completed -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(139, 92, 246, 0.08); display: flex; align-items: center; justify-content: center; color: #8B5CF6; flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Completed</div>
              <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1;">${completedGoals}</div>
              <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">Great job!</div>
            </div>
          </div>

          <!-- Completion Rate -->
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(245, 158, 11, 0.08); display: flex; align-items: center; justify-content: center; color: #F59E0B; flex-shrink: 0;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Completion Rate</div>
              <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1;">${completionRate}</div>
              <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">Overall progress</div>
            </div>
          </div>
        </div>

        <!-- 3. MAIN GOALS GRID (LEFT LIST 70% + RIGHT SIDEBAR 30%) -->
        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start;">

          <!-- LEFT MAIN CONTENT AREA (Active Goals List) -->
          <div style="display: flex; flex-direction: column; gap: 12px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 0;">Active Goals</h3>
              <div style="cursor: pointer; color: var(--text-tertiary);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </div>
            </div>

            ${goals.map((g, i) => `
              <div style="display: flex; gap: 24px; padding: 20px 0; border-bottom: ${i !== goals.length - 1 ? '1px solid var(--border-subtle)' : 'none'}; align-items: stretch;">
                
                <!-- Circular SVG Progress Indicator -->
                <div style="position: relative; width: 68px; height: 68px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                  <svg viewBox="0 0 36 36" width="68" height="68" style="transform: rotate(-90deg);">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222228" stroke-width="2.5" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E50914" stroke-width="2.5" stroke-dasharray="${g.progress}, 100" />
                  </svg>
                  <span style="position: absolute; font-size: 14px; font-weight: 800; color: #FFF;">${g.progress}%</span>
                </div>

                <!-- Goal Content details -->
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                        <h4 style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0;">${g.title}</h4>
                        <span class="badge ${getBadgeClass(g.priority)}" style="font-size: 10px; padding: 2px 8px; border-radius: 4px;">${(g.priority || 'medium').charAt(0).toUpperCase() + (g.priority || 'medium').slice(1)}</span>
                      </div>
                      <p style="font-size: 12px; color: var(--text-tertiary); margin: 0 0 12px 0;">${g.description}</p>
                      
                      <!-- Tags -->
                      <div style="display: flex; gap: 8px;">
                        ${(g.tags || []).map(tag => `
                          <span style="font-size: 10px; color: var(--text-secondary); background: rgba(255,255,255,0.04); padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">${tag}</span>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Right side target/milestone stats -->
                    <div style="display: flex; gap: 32px; text-align: left;">
                      <div>
                        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">Target</div>
                        <div style="font-size: 12px; font-weight: 700; color: #FFFFFF;">${g.targetDate}</div>
                      </div>
                      <div>
                        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">Milestones</div>
                        <div style="font-size: 12px; font-weight: 700; color: #FFFFFF;">${g.milestones ? `${g.milestones.completed}/${g.milestones.total}` : '0/0'}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Linear Progress Bar -->
                  <div style="display: flex; align-items: center; gap: 12px; margin-top: auto; padding-top: 14px;">
                    <div class="progress-track" style="flex: 1; height: 4px; background: #222228;">
                      <div class="progress-fill" style="width: ${g.progress}%; background: #E50914;"></div>
                    </div>
                    <span style="font-size: 12px; font-weight: 800; color: #FFFFFF;">${g.progress}%</span>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>

          <!-- RIGHT SIDEBAR WIDGET PANEL -->
          <div style="display: flex; flex-direction: column; gap: 20px;">

            <!-- GOAL CATEGORIES -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <h3 style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 20px 0;">Goal Categories</h3>
              
              <div style="display: flex; align-items: center; gap: 20px;">
                <!-- Multicolored SVG Donut -->
                <div style="position: relative; width: 80px; height: 80px; flex-shrink: 0;">
                  <svg viewBox="0 0 36 36" width="80" height="80" style="transform: rotate(-90deg);">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#222228" stroke-width="8"></circle>
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E50914" stroke-width="8" stroke-dasharray="40 60" stroke-dashoffset="25"></circle> <!-- Education (Red) 40% -->
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F59E0B" stroke-width="8" stroke-dasharray="30 70" stroke-dashoffset="-15"></circle> <!-- Career (Orange) 30% -->
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10B981" stroke-width="8" stroke-dasharray="20 80" stroke-dashoffset="-45"></circle> <!-- Projects (Green) 20% -->
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8B5CF6" stroke-width="8" stroke-dasharray="10 90" stroke-dashoffset="-65"></circle> <!-- Personal (Purple) 10% -->
                    <circle cx="18" cy="18" r="11" fill="#0A0A0C"></circle>
                  </svg>
                </div>
                
                <!-- Legend -->
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px;">
                    <span style="color: var(--text-secondary);"><span style="color:#E50914; margin-right:6px;">●</span> Education</span>
                    <span style="font-weight: 700; color:#FFF;">40%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px;">
                    <span style="color: var(--text-secondary);"><span style="color:#F59E0B; margin-right:6px;">●</span> Career</span>
                    <span style="font-weight: 700; color:#FFF;">30%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px;">
                    <span style="color: var(--text-secondary);"><span style="color:#10B981; margin-right:6px;">●</span> Projects</span>
                    <span style="font-weight: 700; color:#FFF;">20%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px;">
                    <span style="color: var(--text-secondary);"><span style="color:#8B5CF6; margin-right:6px;">●</span> Personal</span>
                    <span style="font-weight: 700; color:#FFF;">10%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- UPCOMING MILESTONES -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0;">Upcoming Milestones</h3>
                <a href="#" onclick="event.preventDefault()" style="font-size: 11px; color: var(--accent-red); font-weight: 600; text-decoration: none;">View all</a>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <!-- Milestone 1 -->
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(229, 9, 20, 0.08); display: flex; align-items: center; justify-content: center; color: #E50914; flex-shrink: 0; border: 1px solid rgba(229, 9, 20, 0.2);">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
                  </div>
                  <div>
                    <div style="font-size: 12px; font-weight: 600; color: #FFF; margin-bottom: 4px;">ML Project Deployment</div>
                    <div style="font-size: 11px; color: var(--text-tertiary);">Aug 15, 2025</div>
                  </div>
                </div>
                <!-- Milestone 2 -->
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(245, 158, 11, 0.08); display: flex; align-items: center; justify-content: center; color: #F59E0B; flex-shrink: 0; border: 1px solid rgba(245, 158, 11, 0.2);">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
                  </div>
                  <div>
                    <div style="font-size: 12px; font-weight: 600; color: #FFF; margin-bottom: 4px;">DSA Advanced Course</div>
                    <div style="font-size: 11px; color: var(--text-tertiary);">Aug 20, 2025</div>
                  </div>
                </div>
                <!-- Milestone 3 -->
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(16, 185, 129, 0.08); display: flex; align-items: center; justify-content: center; color: #10B981; flex-shrink: 0; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
                  </div>
                  <div>
                    <div style="font-size: 12px; font-weight: 600; color: #FFF; margin-bottom: 4px;">System Design Module</div>
                    <div style="font-size: 11px; color: var(--text-tertiary);">Aug 30, 2025</div>
                  </div>
                </div>
                <!-- Milestone 4 -->
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(139, 92, 246, 0.08); display: flex; align-items: center; justify-content: center; color: #8B5CF6; flex-shrink: 0; border: 1px solid rgba(139, 92, 246, 0.2);">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
                  </div>
                  <div>
                    <div style="font-size: 12px; font-weight: 600; color: #FFF; margin-bottom: 4px;">CGPA 9.0 Target</div>
                    <div style="font-size: 11px; color: var(--text-tertiary);">Sep 30, 2025</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- MOTIVATIONAL QUOTE CARD -->
            <div class="card" style="padding: 24px; background: linear-gradient(135deg, rgba(229, 9, 20, 0.15) 0%, rgba(229, 9, 20, 0.02) 100%); border: 1px solid rgba(229, 9, 20, 0.2); position: relative; overflow: hidden;">
              <!-- Abstract flag mountain icon behind -->
              <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="rgba(229, 9, 20, 0.08)" stroke-width="1" style="position: absolute; right: -20px; bottom: -20px; pointer-events: none;">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              
              <div style="font-size: 32px; font-weight: 900; color: #E50914; line-height: 0.8; margin-bottom: 12px;">“</div>
              <p style="font-size: 14px; font-weight: 600; color: #FFF; line-height: 1.5; margin: 0 0 16px 0; position: relative; z-index: 2;">
                A goal without a plan is just a wish.
              </p>
              <div style="font-size: 11px; color: var(--text-tertiary); font-weight: 500; position: relative; z-index: 2;">— Antoine de Saint-Exupéry</div>
            </div>

            <!-- QUICK ACTIONS GRID -->
            <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
              <h3 style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0;">Quick Actions</h3>
              
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                <!-- Create Goal -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 8px; padding: 16px 8px; border-radius: var(--radius-md); border: 1px solid rgba(229, 9, 20, 0.3); background: rgba(229, 9, 20, 0.05);" onclick="window.modalComponent.open('goal')">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(229, 9, 20, 0.1); display: flex; align-items: center; justify-content: center; color: #E50914;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                  </div>
                  <span style="font-size: 10px; font-weight: 600; color: #FFF; text-align: center;">Create<br>Goal</span>
                </button>

                <!-- Add Milestone -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 8px; padding: 16px 8px; border-radius: var(--radius-md); background: var(--bg-input);">
                  <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #E50914;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                  </div>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary); text-align: center;">Add<br>Milestone</span>
                </button>

                <!-- Goal Template -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 8px; padding: 16px 8px; border-radius: var(--radius-md); background: var(--bg-input);">
                  <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #E50914;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary); text-align: center;">Goal<br>Template</span>
                </button>

                <!-- Import Goals -->
                <button class="btn btn-secondary" style="flex-direction: column; gap: 8px; padding: 16px 8px; border-radius: var(--radius-md); background: var(--bg-input);">
                  <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #E50914;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  <span style="font-size: 10px; font-weight: 600; color: var(--text-secondary); text-align: center;">Import<br>Goals</span>
                </button>
              </div>
            </div>

        </div>
        </div> <!-- End Desktop Only -->

      </div>
    `;
  }
}

window.goalsView = new GoalsView();
