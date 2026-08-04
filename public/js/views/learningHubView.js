/**
 * PLANIX V5 LEARNING HUB VIEW — Skill & Roadmap Tracker
 * Topic roadmaps, modal creation, progress management.
 */

class LearningHubView {
  render(state) {
    const topics = state.learningTopics || state.learning || [];

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Learning Hub</h1>
            <p class="page-description">Design custom roadmaps, track technology skill trees, and build real mastery step-by-step.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.modalComponent.open('topic')">+ Add Topic</button>
          </div>
        </div>

        ${topics.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">📚</div>
              <div class="empty-state-title">No learning roadmaps created</div>
              <div class="empty-state-desc">Add topics you want to master — like PyTorch, Distributed Systems, or Next.js.</div>
              <button class="btn btn-primary" onclick="window.modalComponent.open('topic')">Create First Learning Topic</button>
            </div>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
            ${topics.map(t => `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; flex: 1;">${t.name || t.skill}</h3>
                    <button class="btn btn-icon" onclick="window.learningHubView.confirmDelete('${t.id}')" title="Delete topic">
                      <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                  <p style="font-size: 12px; color: var(--text-tertiary); margin: 6px 0 14px; line-height: 1.5;">${t.description || 'No roadmap notes specified.'}</p>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                    <span>Skill Progress</span>
                    <span style="font-weight: 700; color: var(--accent-primary);">${t.progress || 0}%</span>
                  </div>
                  <div class="progress-track" style="margin-bottom: 14px;">
                    <div class="progress-fill" style="width: ${t.progress || 0}%;"></div>
                  </div>
                  <button class="btn btn-secondary" style="width: 100%; font-size: 12px;" onclick="window.learningHubView.incrementProgress('${t.id}')">+ 10% Mastery</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  incrementProgress(id) {
    const listKey = window.store.state.learningTopics ? 'learningTopics' : 'learning';
    const list = window.store.state[listKey] || [];
    const updated = list.map(t => {
      if (t.id === id) {
        const n = Math.min(100, (t.progress || 0) + 10);
        if (n >= 100 && window.showToast) window.showToast('🎉 Topic 100% Mastered!', 'success');
        return { ...t, progress: n };
      }
      return t;
    });
    window.store.setState({ [listKey]: updated });
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Remove Topic',
      message: 'Are you sure you want to remove this learning topic?',
      onConfirm: () => {
        const listKey = window.store.state.learningTopics ? 'learningTopics' : 'learning';
        const list = window.store.state[listKey] || [];
        window.store.setState({ [listKey]: list.filter(t => t.id !== id) });
        if (window.showToast) window.showToast('Topic removed', 'info');
      }
    });
  }
}

window.learningHubView = new LearningHubView();
