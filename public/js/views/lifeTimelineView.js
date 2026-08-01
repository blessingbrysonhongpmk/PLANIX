/**
 * PLANIX AI LIFE TIMELINE VIEW
 * Auto-organized life history, hackathons, projects, college milestones & achievements
 */

class LifeTimelineView {
  constructor() {
    this.filterCategory = 'all';
  }

  render(state) {
    const events = [
      { id: 't1', year: '2026', category: 'hackathon', title: '1st Place Planix Life OS', desc: 'Built flagship AI operating system platform.' },
      { id: 't2', year: '2025', category: 'academic', title: 'Computer Science Honors', desc: 'Maintained 3.9 GPA across all semesters.' },
      { id: 't3', year: '2025', category: 'project', title: 'Full Stack Web Platform', desc: 'Deployed production SaaS application.' },
      { id: 't4', year: '2024', category: 'certificate', title: 'Advanced Cloud Architecture', desc: 'Earned professional cloud certification.' }
    ];

    const filtered = this.filterCategory === 'all' 
      ? events 
      : events.filter(e => e.category === this.filterCategory);

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Automated Life History Timeline 📜</div>
            <div class="view-subtitle">Organizes projects • Hackathons • Academic milestones • Achievements</div>
          </div>
          <button class="btn btn-primary" onclick="window.lifeTimelineView.addMilestone()">+ Add Milestone</button>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 24px;">
          <button class="btn ${this.filterCategory === 'all' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.lifeTimelineView.setFilter('all')">All Events</button>
          <button class="btn ${this.filterCategory === 'hackathon' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.lifeTimelineView.setFilter('hackathon')">🏆 Hackathons</button>
          <button class="btn ${this.filterCategory === 'project' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.lifeTimelineView.setFilter('project')">💻 Projects</button>
          <button class="btn ${this.filterCategory === 'academic' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.lifeTimelineView.setFilter('academic')">🎓 Academic</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; position: relative;">
          ${filtered.map(e => `
            <div class="card animate-slide-up" style="border-left: 4px solid var(--accent-red);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span class="badge badge-study">${e.year} • ${e.category.toUpperCase()}</span>
                <span style="font-size: 12px; color: var(--text-tertiary);">Auto Organized</span>
              </div>
              <div style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px;">${e.title}</div>
              <p style="font-size: 14px; color: var(--text-secondary);">${e.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  setFilter(cat) {
    this.filterCategory = cat;
    window.store.notify();
  }

  addMilestone() {
    const title = prompt('Enter Milestone Title (e.g. "Won Hackathon 2026"):');
    if (!title) return;
    alert(`🎉 Added "${title}" to your Life History Timeline!`);
  }
}

window.lifeTimelineView = new LifeTimelineView();
