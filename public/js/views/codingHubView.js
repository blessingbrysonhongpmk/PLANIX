/**
 * PLANIX V5 CODING HUB VIEW — Competitive Programming & DSA Mastery Tracker
 * LeetCode problem counter, Codeforces rating, NeetCode 150 topic roadmap.
 */

class CodingHubView {
  render(state) {
    const coding = state.coding || {};
    const dsaTopics = coding.dsaTopics || [];
    const completedTopics = dsaTopics.filter(t => t.completed).length;
    const dsaPct = dsaTopics.length > 0 ? Math.round((completedTopics / dsaTopics.length) * 100) : 0;

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Coding Tracker</h1>
            <p class="page-description">Monitor LeetCode problem counts, Codeforces rating, and DSA topic mastery.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.codingHubView.logProblem()">+ Log Solved Problem</button>
          </div>
        </div>

        <!-- Quick Coding Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-secondary);">${coding.leetcodeSolved || 0}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">LeetCode Solved</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--accent-primary);">${coding.codeforcesRating || 1450}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Codeforces Rating</div>
          </div>
          <div class="card" style="text-align: center; padding: var(--spacing-5);">
            <div style="font-size: 32px; font-weight: 800; color: var(--color-success);">🔥 ${coding.githubStreak || 14}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">GitHub Streak (Days)</div>
          </div>
        </div>

        <!-- DSA Topic Mastery Roadmap -->
        <div class="card" style="padding: var(--spacing-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">NeetCode 150 & DSA Topic Roadmap</h3>
            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary);">${dsaPct}% Mastered</span>
          </div>

          <div class="progress-track" style="margin-bottom: 16px;">
            <div class="progress-fill" style="width: ${dsaPct}%;"></div>
          </div>

          ${dsaTopics.length === 0 ? `
            <div class="empty-state" style="padding: 24px;">
              <div class="empty-state-icon">⚡</div>
              <div class="empty-state-title">No DSA topics tracked</div>
              <div class="empty-state-desc">Track key algorithm patterns like Dynamic Programming, Graphs, and Trees.</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${dsaTopics.map((t, i) => `
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-primary); cursor: pointer;" onchange="window.codingHubView.toggleTopic(${i})">
                  <span style="flex: 1; font-size: 14px; color: ${t.completed ? 'var(--text-tertiary)' : 'var(--text-primary)'}; text-decoration: ${t.completed ? 'line-through' : 'none'};">${t.name}</span>
                  <span class="badge ${t.completed ? 'badge-health' : 'badge-work'}" style="font-size: 10px;">${t.completed ? '✓ MASTERED' : 'IN PROGRESS'}</span>
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
    if (window.showToast) window.showToast('Problem logged (+1 LeetCode)! ⚡', 'success');
  }

  toggleTopic(i) {
    const coding = { ...window.store.state.coding };
    coding.dsaTopics = [...(coding.dsaTopics || [])];
    if (coding.dsaTopics[i]) {
      coding.dsaTopics[i] = { ...coding.dsaTopics[i], completed: !coding.dsaTopics[i].completed };
    }
    window.store.setState({ coding });
  }
}

window.codingHubView = new CodingHubView();
