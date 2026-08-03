/**
 * PLANIX DEVELOPER WORKSPACE VIEW
 * Code Snippet Vault, API Endpoint Monitor, Dev Quick Launcher
 */

class DevWorkspaceView {
  render(state) {
    const snippets = state.snippets || [];

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1100px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>💻</span> Developer Workspace
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Quick code snippet vault, developer API monitors, and environment shortcuts.
            </p>
          </div>

          <button class="btn" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.devWorkspaceView.addSnippet()">
            + New Snippet
          </button>
        </div>

        <!-- Code Snippet Vault List -->
        <div style="background: #18181B; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 16px 0;">⚡ Code Snippet Vault</h3>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${snippets.map(snp => `
              <div style="padding: 16px; background: #121215; border-radius: 12px; border: 1px solid #27272A;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span style="font-size: 14px; font-weight: 700; color: #FFF;">${snp.title}</span>
                  <span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(139,92,246,0.2); color: #8B5CF6; font-weight: 700;">${snp.language ? snp.language.toUpperCase() : 'CODE'}</span>
                </div>
                
                <pre style="background: #09090B; color: #34D399; padding: 14px; border-radius: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; overflow-x: auto; margin: 0; border: 1px solid #27272A;"><code>${snp.code}</code></pre>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  addSnippet() {
    const title = prompt("Snippet Title (e.g. PyTorch Tensor Device Setup):");
    if (!title) return;
    const code = prompt("Paste Code Snippet:") || "print('Hello Dev')";

    const newSnippet = {
      id: `snp_${Date.now()}`,
      title,
      code,
      language: 'python'
    };

    window.store.setState(prev => ({ snippets: [...prev.snippets, newSnippet] }));
    if (window.showToast) window.showToast("Snippet saved to vault!", "success");
  }
}

window.devWorkspaceView = new DevWorkspaceView();
