/**
 * PLANIX LEARNING HUB — Topic roadmaps and learning progress
 */

class LearningHubView {
  render(state) {
    const topics = state.learningTopics || [];
    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Learning Hub</h1>
            <p class="page-description">Add topics, track your learning path, and build real skills step by step.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.learningHubView.addTopic()">+ Add Topic</button>
          </div>
        </div>

        ${topics.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">📚</div>
            <div class="empty-state-title">No learning topics yet</div>
            <div class="empty-state-desc">Add topics you want to learn — like React, Machine Learning, or System Design.</div>
            <button class="btn btn-primary" onclick="window.learningHubView.addTopic()">Add First Topic</button>
          </div></div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
            ${topics.map(t => `
              <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0;">${t.name}</h3>
                  <button class="btn btn-icon" onclick="window.learningHubView.deleteTopic('${t.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                </div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin: 8px 0 14px;">${t.description || 'No description'}</div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                  <span>Progress</span><span style="font-weight: 700; color: var(--accent-primary);">${t.progress || 0}%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width: ${t.progress || 0}%;"></div></div>
                <button class="btn btn-secondary" style="width: 100%; margin-top: 14px; font-size: 13px;" onclick="window.learningHubView.updateProgress('${t.id}')">+ Update Progress</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  addTopic() {
    const name = prompt('Topic name (e.g. React, Machine Learning, System Design):');
    if (!name) return;
    window.store.setState(prev => ({ learningTopics: [...(prev.learningTopics || []), { id: `lt_${Date.now()}`, name, progress: 0 }] }));
  }

  updateProgress(id) {
    const val = parseInt(prompt('Enter new progress (0-100):') || '0');
    const n = Math.min(100, Math.max(0, val));
    window.store.setState({ learningTopics: (window.store.state.learningTopics || []).map(t => t.id === id ? { ...t, progress: n } : t) });
    if (n >= 100 && window.showToast) window.showToast('Topic mastered! 🎉', 'success');
  }

  deleteTopic(id) {
    if (!confirm('Remove this topic?')) return;
    window.store.setState({ learningTopics: (window.store.state.learningTopics || []).filter(t => t.id !== id) });
  }
}

window.learningHubView = new LearningHubView();
