/**
 * PLANIX GAMIFICATION VIEW
 * Level progression, XP rewards, milestone badges & daily productivity challenges
 */

class GamificationView {
  render(state) {
    const user = state.user || {};
    const badges = [
      { id: 'b1', title: '7-Day Streak Master', icon: '🔥', unlocked: true, desc: 'Completed daily routines 7 days in a row' },
      { id: 'b2', title: 'Night Owl Researcher', icon: '🦉', unlocked: true, desc: 'Logged 10 study notes past 9 PM' },
      { id: 'b3', title: 'Routine Pioneer', icon: '🤖', unlocked: true, desc: 'Generated 5 AI schedules' },
      { id: 'b4', title: 'Master Life Architect', icon: '👑', unlocked: false, desc: 'Reach Level 10 XP Status' }
    ];

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Achievements & XP Rewards 🏆</div>
            <div class="view-subtitle">Level progress • Unlockable badges • Daily challenges</div>
          </div>
        </div>

        <!-- Level Card -->
        <div class="card" style="background: linear-gradient(135deg, rgba(255, 214, 0, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%); border-color: rgba(255, 214, 0, 0.3); margin-bottom: 28px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold); text-transform: uppercase;">CURRENT LEVEL</div>
              <div style="font-family: var(--font-display); font-size: 28px; font-weight: 800;">Level ${user.level || 3} — ${user.levelTitle || 'Focus Architect'}</div>
            </div>
            <div style="font-size: 28px; font-weight: 800; color: var(--accent-gold);">${user.xp || 1420} XP</div>
          </div>

          <div style="margin-top: 16px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
              <span>Progress to Level 4</span> <span>1,420 / 2,000 XP</span>
            </div>
            <div style="height: 10px; background: var(--bg-input); border-radius: var(--radius-full); overflow: hidden;">
              <div style="width: 71%; height: 100%; background: var(--accent-gradient-gold);"></div>
            </div>
          </div>
        </div>

        <h3 style="font-family: var(--font-display); font-size: 20px; margin-bottom: 16px;">Unlocked Milestone Badges</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;">
          ${badges.map(b => `
            <div class="card" style="${b.unlocked ? '' : 'opacity: 0.5; filter: grayscale(1);'}">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                <span style="font-size: 32px;">${b.icon}</span>
                <div>
                  <div style="font-weight: 700; font-size: 15px;">${b.title}</div>
                  <div style="font-size: 11px; color: ${b.unlocked ? 'var(--accent-emerald)' : 'var(--text-tertiary)'}; font-weight: 600;">
                    ${b.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                  </div>
                </div>
              </div>
              <div style="font-size: 12px; color: var(--text-secondary);">${b.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

window.gamificationView = new GamificationView();
