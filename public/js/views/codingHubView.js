/**
 * PLANIX CODING HUB — LeetCode/Codeforces tracker, DSA roadmap
 */

class CodingHubView {
  render(state) {
    const coding = state.coding || {};
    const dsaTopics = coding.dsaTopics || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Coding Tracker</h1>
            <p class="page-description">Track competitive programming stats and DSA topic mastery.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.codingHubView.logProblem()">+ Log Problem</button>
          </div>
        </div>

        <!-- Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-secondary);">${coding.leetcodeSolved || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">LeetCode Solved</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-primary);">${coding.codeforcesRating || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Codeforces Rating</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--color-success);">🔥 ${coding.githubStreak || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">GitHub Streak</div>
          </div>
        </div>

        <!-- DSA Roadmap -->
        <div class="card" style="padding: var(--spacing-5);">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 16px;">DSA Roadmap</h3>
          ${dsaTopics.length === 0 ? `
            <div class="empty-state" style="padding: 24px;">
              <div class="empty-state-icon">⚡</div>
              <div class="empty-state-title">No DSA topics yet</div>
              <div class="empty-state-desc">Your DSA roadmap will appear here as you track topic mastery.</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${dsaTopics.map((t, i) => `
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-primary); cursor: pointer;" onchange="window.codingHubView.toggleTopic(${i})">
                  <span style="flex: 1; font-size: 14px; color: ${t.completed ? 'var(--text-tertiary)' : 'var(--text-primary)'}; text-decoration: ${t.completed ? 'line-through' : 'none'};">${t.name}</span>
                  <span style="font-size: 11px; font-weight: 600; color: ${t.completed ? 'var(--color-success)' : 'var(--text-tertiary)'};">${t.completed ? 'Mastered' : 'In Progress'}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  logProblem() {
    const coding = { ...window.store.state.coding, leetcodeSolved: (window.store.state.coding?.leetcodeSolved || 0) + 1 };
    window.store.setState({ coding });
    if (window.showToast) window.showToast('Problem logged! ⚡', 'success');
  }

  toggleTopic(i) {
    const coding = { ...window.store.state.coding };
    coding.dsaTopics = [...coding.dsaTopics];
    coding.dsaTopics[i] = { ...coding.dsaTopics[i], completed: !coding.dsaTopics[i].completed };
    window.store.setState({ coding });
  }
}

window.codingHubView = new CodingHubView();
