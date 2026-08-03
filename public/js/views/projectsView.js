/**
 * PLANIX PROJECTS WORKSPACE VIEW
 * Engineering software/hardware projects with tech stack badges & GitHub integration
 */

class ProjectsView {
  render(state) {
    const projects = state.projects || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🚀</span> Projects Workspace
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Manage software, hardware, and AI project builds with GitHub repo links and milestone tracking.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.projectsView.addProject()">
            + New Project
          </button>
        </div>

        <!-- Project Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px;">
          ${projects.map(proj => `
            <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 18px; font-weight: 800; color: #FFF; margin: 0;">${proj.title}</h3>
                  <button class="btn" style="background: transparent; color: #71717A; border: none;" onclick="window.projectsView.deleteProject('${proj.id}')">🗑️</button>
                </div>
                
                <p style="font-size: 13px; color: #A1A1AA; margin: 8px 0 14px 0; line-height: 1.5;">${proj.description}</p>
                
                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
                  ${(proj.techStack || ['Python', 'React']).map(tech => `
                    <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(59,130,246,0.15); color: #3B82F6; font-weight: 600;">${tech}</span>
                  `).join('')}
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #A1A1AA; margin-bottom: 6px;">
                  <span>Milestone Progress</span>
                  <span style="color: #3B82F6; font-weight: 700;">${proj.progress || 0}%</span>
                </div>
                <div style="width: 100%; height: 6px; background: #121215; border-radius: 4px; overflow: hidden; margin-bottom: 14px;">
                  <div style="width: ${proj.progress || 0}%; height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); border-radius: 4px;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <a href="${proj.github || '#'}" target="_blank" style="color: #8B5CF6; font-size: 12px; font-weight: 600; text-decoration: none;">
                    GitHub Repo ↗
                  </a>
                  <button class="btn" style="background: #121215; border: 1px solid #27272A; color: white; border-radius: 6px; padding: 6px 12px; font-size: 12px;" onclick="window.projectsView.incrementProgress('${proj.id}')">
                    + Progress
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  addProject() {
    const title = prompt("Enter Project Title (e.g. AI Autonomous Agent Framework):");
    if (!title) return;
    const description = prompt("Enter short description:") || "AI/ML Full stack application build";

    const newProj = {
      id: `prj_${Date.now()}`,
      title,
      description,
      techStack: ['Python', 'PyTorch', 'React'],
      progress: 25,
      github: 'https://github.com'
    };

    window.store.setState(prev => ({ projects: [...prev.projects, newProj] }));
  }

  incrementProgress(id) {
    const projects = window.store.state.projects.map(p => {
      if (p.id === id) return { ...p, progress: Math.min(100, (p.progress || 0) + 15) };
      return p;
    });
    window.store.setState({ projects });
  }

  deleteProject(id) {
    const projects = window.store.state.projects.filter(p => p.id !== id);
    window.store.setState({ projects });
  }
}

window.projectsView = new ProjectsView();
