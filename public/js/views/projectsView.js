/**
 * PLANIX V5 PROJECTS VIEW — Engineering Project Portfolio Tracker
 * GitHub repo links, tech stack badges, progress management, modal forms.
 */

class ProjectsView {
  render(state) {
    const projects = state.projects || [];

    return `
      <div class="view-container animate-fade-in">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Projects</h1>
            <p class="page-description">Track software, hardware, and AI engineering projects with milestone progress and GitHub links.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.modalComponent.open('project')">+ New Project</button>
          </div>
        </div>

        ${projects.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div class="empty-state-icon">🚀</div>
              <div class="empty-state-title">No projects tracked yet</div>
              <div class="empty-state-desc">Add your side projects, hackathon builds, or research projects to showcase progress and tech stack.</div>
              <button class="btn btn-primary" onclick="window.modalComponent.open('project')">Create Project</button>
            </div>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
            ${projects.map(p => `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; flex: 1;">${p.title}</h3>
                    <button class="btn btn-icon" onclick="window.projectsView.confirmDelete('${p.id}')" title="Delete project">
                      <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>

                  <p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0 12px; line-height: 1.5;">${p.description || 'No description provided.'}</p>

                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
                    ${(p.techStack || ['Python', 'React']).map(t => `<span class="badge badge-study">${t}</span>`).join('')}
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                    <span>Progress</span>
                    <span style="font-weight: 700; color: var(--accent-primary);">${p.progress || 0}%</span>
                  </div>
                  <div class="progress-track" style="margin-bottom: 14px;">
                    <div class="progress-fill" style="width: ${p.progress || 0}%;"></div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-secondary" style="flex: 1; font-size: 12px;" onclick="window.projectsView.updateProgress('${p.id}')">+ 15% Progress</button>
                    ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-ghost" style="font-size: 12px;">GitHub ↗</a>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  updateProgress(id) {
    const projects = window.store.state.projects.map(p => {
      if (p.id === id) {
        const next = Math.min(100, (p.progress || 0) + 15);
        if (next >= 100 && window.showToast) window.showToast('🎉 Project completed! Great build!', 'success');
        return { ...p, progress: next };
      }
      return p;
    });
    window.store.setState({ projects });
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project?',
      onConfirm: () => {
        window.store.setState({ projects: window.store.state.projects.filter(p => p.id !== id) });
        if (window.showToast) window.showToast('Project deleted', 'info');
      }
    });
  }
}

window.projectsView = new ProjectsView();
