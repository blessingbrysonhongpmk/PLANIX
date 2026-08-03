/**
 * PLANIX RESOURCE LIBRARY VIEW
 * Bookmark YouTube tutorials, GitHub repos, PDFs, research papers & documentation
 */

class ResourceLibraryView {
  render(state) {
    const resources = state.resources || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🔖</span> Resource Library & Bookmarks
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Save YouTube tutorials, GitHub repositories, research papers, and documentation links.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.resourceLibraryView.addResource()">
            + Save Resource
          </button>
        </div>

        <!-- Resource Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
          ${resources.map(item => `
            <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; font-weight: 700; background: rgba(139,92,246,0.15); color: #8B5CF6;">
                    ${item.type || 'Bookmark'}
                  </span>
                  <button class="btn" style="background: transparent; color: #71717A; border: none;" onclick="window.resourceLibraryView.deleteResource('${item.id}')">🗑️</button>
                </div>

                <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 10px 0 6px 0;">${item.title}</h3>
                <div style="font-size: 12px; color: #3B82F6; word-break: break-all;">${item.url}</div>
              </div>

              <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; color: #A1A1AA;">Tag: ${item.tag || 'General'}</span>
                <a href="${item.url}" target="_blank" class="btn" style="background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 600;">
                  Open Link ↗
                </a>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  addResource() {
    const title = prompt("Enter Resource Title (e.g. System Design Primer GitHub):");
    if (!title) return;
    const url = prompt("Enter URL (e.g. https://github.com/...):") || "https://github.com";

    const newRes = {
      id: `res_${Date.now()}`,
      title,
      url,
      type: 'Doc / Repo',
      tag: 'Engineering'
    };

    window.store.setState(prev => ({ resources: [...prev.resources, newRes] }));
    if (window.showToast) window.showToast("Resource bookmarked!", "success");
  }

  deleteResource(id) {
    const resources = window.store.state.resources.filter(r => r.id !== id);
    window.store.setState({ resources });
  }
}

window.resourceLibraryView = new ResourceLibraryView();
