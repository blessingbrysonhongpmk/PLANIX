/**
 * PLANIX PROJECTS VIEW — Engineering projects with tech stack and progress
 */

class ProjectsView {
  render(state) {
    const projects = state.projects || [];

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Projects</h1>
            <p class="page-description">Track your software, hardware, and AI projects with milestone progress.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.projectsView.addProject()">+ New Project</button>
          </div>
        </div>

        ${projects.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">🚀</div>
            <div class="empty-state-title">No projects yet</div>
            <div class="empty-state-desc">Add your first engineering project to track progress, tech stack, and GitHub links.</div>
            <button class="btn btn-primary" onclick="window.projectsView.addProject()">Create Project</button>
          </div></div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
            ${projects.map(p => `
              <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin: 0; flex: 1;">${p.title}</h3>
                    <button class="btn btn-icon" onclick="window.projectsView.deleteProject('${p.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                  </div>
                  <p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0 12px; line-height: 1.5;">${p.description || ''}</p>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
                    ${(p.techStack || []).map(t => `<span class="badge badge-study">${t}</span>`).join('')}
                  </div>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
                    <span>Progress</span><span style="font-weight: 700; color: var(--accent-primary);">${p.progress || 0}%</span>
                  </div>
                  <div class="progress-track" style="margin-bottom: 12px;"><div class="progress-fill" style="width: ${p.progress || 0}%;"></div></div>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-secondary" style="flex: 1; font-size: 12px;" onclick="window.projectsView.updateProgress('${p.id}')">+ Progress</button>
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

  addProject() {
    const title = prompt('Project name:');
    if (!title) return;
    const description = prompt('Short description:') || '';
    window.store.setState(prev => ({ projects: [...prev.projects, { id: `prj_${Date.now()}`, title, description, techStack: ['Python', 'React'], progress: 0, github: '' }] }));
  }

  updateProgress(id) {
    const projects = window.store.state.projects.map(p => p.id === id ? { ...p, progress: Math.min(100, (p.progress || 0) + 15) } : p);
    window.store.setState({ projects });
  }

  deleteProject(id) {
    if (!confirm('Delete this project?')) return;
    window.store.setState({ projects: window.store.state.projects.filter(p => p.id !== id) });
  }
}

window.projectsView = new ProjectsView();
