/**
 * PLANIX CODING & LEETCODE HUB VIEW
 * Problem Logger (LeetCode/Codeforces), DSA Topic Checklist, GitHub Daily Streak Tracker
 */

class CodingHubView {
  render(state) {
    const coding = state.coding || {};
    const dsaTopics = coding.dsaTopics || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>⚡</span> Coding & LeetCode Hub
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Track competitive programming stats, DSA topic mastery, and GitHub daily coding streaks.
            </p>
          </div>
        </div>

        <!-- Top Stats Row -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 24px;">
          
          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; text-align: center;">
            <div style="font-size: 12px; font-weight: 700; color: #F59E0B; text-transform: uppercase;">LEETCODE SOLVED</div>
            <div style="font-size: 38px; font-weight: 900; color: #FFF; margin: 6px 0;">${coding.leetcodeSolved || 0}</div>
            <button class="btn" style="background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); padding: 4px 12px; border-radius: 6px; font-size: 11px;" onclick="window.codingHubView.logProblem()">+ Log Problem Solved</button>
          </div>

          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; text-align: center;">
            <div style="font-size: 12px; font-weight: 700; color: #3B82F6; text-transform: uppercase;">CODEFORCES RATING</div>
            <div style="font-size: 38px; font-weight: 900; color: #3B82F6; margin: 6px 0;">${coding.codeforcesRating || 1400}</div>
            <div style="font-size: 11px; color: #A1A1AA;">Specialist Rank</div>
          </div>

          <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; text-align: center;">
            <div style="font-size: 12px; font-weight: 700; color: #10B981; text-transform: uppercase;">GITHUB DAILY STREAK</div>
            <div style="font-size: 38px; font-weight: 900; color: #10B981; margin: 6px 0;">🔥 ${coding.githubStreak || 0} Days</div>
            <div style="font-size: 11px; color: #A1A1AA;">Daily Commits Active</div>
          </div>

        </div>

        <!-- DSA Topic Mastery Checklist -->
        <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 16px 0;">DSA Topics Roadmap & Progress</h3>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${dsaTopics.map((topic, idx) => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #121215; border-radius: 10px; border: 1px solid #27272A;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <input type="checkbox" ${topic.completed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #3B82F6; cursor: pointer;" onchange="window.codingHubView.toggleTopic(${idx})">
                  <span style="color: ${topic.completed ? '#71717A' : '#FFF'}; text-decoration: ${topic.completed ? 'line-through' : 'none'}; font-size: 14px; font-weight: 500;">
                    ${topic.name}
                  </span>
                </div>
                <span style="font-size: 11px; font-weight: 700; ${topic.completed ? 'color: #10B981;' : 'color: #71717A;'}">
                  ${topic.completed ? 'Mastered ✓' : 'In Progress'}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  logProblem() {
    const coding = { ...window.store.state.coding };
    coding.leetcodeSolved = (coding.leetcodeSolved || 0) + 1;
    window.store.setState({ coding });
    if (window.showToast) window.showToast("Logged 1 solved problem! ⚡", "success");
  }

  toggleTopic(idx) {
    const coding = { ...window.store.state.coding };
    coding.dsaTopics[idx].completed = !coding.dsaTopics[idx].completed;
    window.store.setState({ coding });
  }
}

window.codingHubView = new CodingHubView();
