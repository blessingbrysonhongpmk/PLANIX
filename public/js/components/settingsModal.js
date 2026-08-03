/**
 * PLANIX SETTINGS & DATA OWNERSHIP MODAL
 * User Settings, 1-Click Export/Import JSON Backup, Reset Workspace Data, PWA Installer
 */

class SettingsModalComponent {
  render(state) {
    if (!state.isSettingsModalOpen) return '';

    return `
      <div class="modal-backdrop open" onclick="if(event.target===this) window.store.setState({ isSettingsModalOpen: false })">
        <div class="modal-card animate-scale-up" style="max-width: 580px; background: #141417; border: 1px solid #27272A; border-radius: 18px; padding: 28px;">
          
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid #27272A; margin-bottom: 20px;">
            <h2 style="font-size: 20px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>⚙️</span> Settings & Data Ownership
            </h2>
            <button class="btn btn-icon" style="color: #A1A1AA;" onclick="window.store.setState({ isSettingsModalOpen: false })">✕</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            
            <!-- User Profile Name -->
            <div>
              <label style="font-size: 13px; font-weight: 600; color: #A1A1AA; display: block; margin-bottom: 6px;">Your Profile Name</label>
              <div style="display: flex; gap: 10px;">
                <input type="text" id="settings-username-input" class="form-input" value="${state.user.name || 'User'}" style="background: #1C1C21; border-color: #3F3F46; color: white; padding: 10px; border-radius: 8px; flex: 1;">
                <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 600;" onclick="window.settingsModalComponent.updateName()">Save Name</button>
              </div>
            </div>

            <!-- PWA App Installation -->
            <div style="padding: 16px; background: #1C1C21; border: 1px solid #27272A; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #FFF;">Install PLANIX Desktop/Mobile App</div>
                <div style="font-size: 12px; color: #A1A1AA; margin-top: 2px;">Install as a standalone app on your home screen or desktop.</div>
              </div>
              <button class="btn" style="background: #10B981; color: white; border: none; border-radius: 8px; padding: 8px 14px; font-weight: 600; cursor: pointer;" onclick="window.settingsModalComponent.installPWA()">
                Install App 📲
              </button>
            </div>

            <!-- Data Ownership & Backup Section -->
            <div style="padding: 16px; background: #1C1C21; border: 1px solid #27272A; border-radius: 12px;">
              <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Data Ownership & Export</div>
              <div style="font-size: 12px; color: #A1A1AA; margin-bottom: 14px;">Your data belongs to you. Export a full JSON backup of all tasks, notes, habits, and journal entries anytime.</div>
              
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 600; cursor: pointer;" onclick="window.settingsModalComponent.exportData()">
                  💾 Export Data (Backup)
                </button>
                <button class="btn" style="background: #27272A; color: white; border: 1px solid #3F3F46; border-radius: 8px; padding: 10px 16px; font-weight: 600; cursor: pointer;" onclick="document.getElementById('import-file-input').click()">
                  📥 Import Backup
                </button>
                <input type="file" id="import-file-input" style="display: none;" accept=".json" onchange="window.settingsModalComponent.importData(event)">
              </div>
            </div>

            <!-- Reset Workspace -->
            <div style="padding: 14px; background: rgba(229, 9, 20, 0.08); border: 1px solid rgba(229, 9, 20, 0.25); border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #FF4D4D;">Reset Workspace Data</div>
                <div style="font-size: 11px; color: #A1A1AA;">Wipe local storage state and start fresh.</div>
              </div>
              <button class="btn" style="background: #B91C2D; color: white; border: none; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 600; cursor: pointer;" onclick="window.settingsModalComponent.resetData()">
                Reset Data ⚠️
              </button>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  updateName() {
    const input = document.getElementById('settings-username-input');
    if (!input || !input.value.trim()) return;

    const name = input.value.trim();
    window.store.setState(prev => ({ user: { ...prev.user, name } }));
    if (window.showToast) window.showToast("Profile name updated!", "success");
  }

  exportData() {
    const state = window.store.state;
    const exportObject = {
      tasks: state.tasks,
      notes: state.notes,
      journal: state.journal,
      habits: state.habits,
      routine: state.routine,
      goals: state.goals,
      user: state.user,
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `planix_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (window.showToast) window.showToast("Backup downloaded successfully! 💾", "success");
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        window.store.setState({
          tasks: parsed.tasks || [],
          notes: parsed.notes || [],
          journal: parsed.journal || [],
          habits: parsed.habits || [],
          routine: parsed.routine || [],
          goals: parsed.goals || [],
          user: parsed.user || window.store.state.user
        });
        if (window.showToast) window.showToast("Backup imported successfully! 🎉", "success");
      } catch (err) {
        alert("Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
  }

  resetData() {
    if (confirm("Are you sure you want to reset all workspace data? This cannot be undone.")) {
      localStorage.removeItem('planix_v5_state');
      window.store.setState({
        tasks: [],
        notes: [],
        journal: [],
        habits: [],
        routine: [],
        goals: [],
        user: { name: 'User', xp: 0, level: 1, levelTitle: 'Focus Starter', streak: 0, theme: 'dark' }
      });
      if (window.showToast) window.showToast("Workspace reset cleanly.", "info");
    }
  }

  installPWA() {
    if (window.deferredPWAInstallPrompt) {
      window.deferredPWAInstallPrompt.prompt();
      window.deferredPWAInstallPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          if (window.showToast) window.showToast("App installation started!", "success");
        }
        window.deferredPWAInstallPrompt = null;
      });
    } else {
      alert("PLANIX is ready to install! On Chrome/Edge click the Install icon in the URL bar, or on Safari mobile select 'Add to Home Screen'.");
    }
  }
}

window.settingsModalComponent = new SettingsModalComponent();
