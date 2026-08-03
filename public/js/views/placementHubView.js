/**
 * PLANIX PLACEMENT & CAREER HUB VIEW
 * Company Application Pipeline Tracker (OA, Technical, HR, Offer) & Interview Prep
 */

class PlacementHubView {
  render(state) {
    const placements = state.placements || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>💼</span> Placement & Career Hub
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Track company applications, Online Assessments (OA), technical interview stages, and offers.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.placementHubView.addCompany()">
            + Add Application
          </button>
        </div>

        <!-- Application Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">
          ${placements.map(item => `
            <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 18px; font-weight: 800; color: #FFF; margin: 0;">${item.company}</h3>
                  <button class="btn" style="background: transparent; color: #71717A; border: none;" onclick="window.placementHubView.deleteCompany('${item.id}')">🗑️</button>
                </div>
                <div style="font-size: 13px; color: #3B82F6; font-weight: 600; margin-top: 4px;">${item.role}</div>
                <div style="font-size: 11px; color: #A1A1AA; margin-top: 8px;">Date: ${item.date || 'TBD'}</div>
              </div>

              <!-- Pipeline Status Pill -->
              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 700; ${item.status === 'offer' ? 'background: rgba(16,185,129,0.2); color: #10B981;' : 'background: rgba(59,130,246,0.2); color: #3B82F6;'}">
                  ${item.status ? item.status.toUpperCase() : 'APPLIED'}
                </span>
                
                <select class="form-input" style="width: auto; background: #121215; border-color: #27272A; color: white; padding: 4px 8px; font-size: 11px; border-radius: 6px;" onchange="window.placementHubView.updateStatus('${item.id}', this.value)">
                  <option value="applied" ${item.status === 'applied' ? 'selected' : ''}>Applied</option>
                  <option value="oa" ${item.status === 'oa' ? 'selected' : ''}>Online Assessment</option>
                  <option value="interview" ${item.status === 'interview' ? 'selected' : ''}>Interview Stage</option>
                  <option value="offer" ${item.status === 'offer' ? 'selected' : ''}>🎉 Offer Received</option>
                </select>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  addCompany() {
    const company = prompt("Enter Company Name (e.g. Amazon):");
    if (!company) return;
    const role = prompt("Enter Role Title (e.g. SDE-1 / Software Intern):") || "Software Developer";

    const newItem = {
      id: `pl_${Date.now()}`,
      company,
      role,
      status: 'applied',
      date: new Date().toISOString().slice(0, 10)
    };

    window.store.setState(prev => ({ placements: [...prev.placements, newItem] }));
    if (window.showToast) window.showToast("Application added!", "success");
  }

  updateStatus(id, status) {
    const placements = window.store.state.placements.map(p => {
      if (p.id === id) return { ...p, status };
      return p;
    });
    window.store.setState({ placements });
  }

  deleteCompany(id) {
    const placements = window.store.state.placements.filter(p => p.id !== id);
    window.store.setState({ placements });
  }
}

window.placementHubView = new PlacementHubView();
