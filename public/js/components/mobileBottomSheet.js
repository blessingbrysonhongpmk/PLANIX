/**
 * PLANIX V5 MOBILE BOTTOM SHEET COMPONENT
 * Native sliding bottom sheet drawer for mobile quick actions, detail inspection, and modal forms.
 */

class MobileBottomSheetComponent {
  constructor() {
    this.isOpen = false;
    this.sheetType = 'actions'; // actions, taskForm, noteForm, detail
    this.activeData = null;
  }

  open(type = 'actions', data = null) {
    this.sheetType = type;
    this.activeData = data;
    this.isOpen = true;
    window.store.notify();
  }

  close() {
    this.isOpen = false;
    this.activeData = null;
    window.store.notify();
  }

  render(state) {
    return `
      <!-- Backdrop -->
      <div class="bottom-sheet-backdrop ${this.isOpen ? 'active' : ''}" onclick="window.mobileBottomSheet.close()"></div>

      <!-- Sliding Drawer -->
      <div class="bottom-sheet-drawer ${this.isOpen ? 'active' : ''}">
        <div class="bottom-sheet-handle"></div>

        ${this.renderSheetBody(state)}
      </div>
    `;
  }

  renderSheetBody(state) {
    if (this.sheetType === 'actions') {
      return `
        <div style="font-size: 16px; font-weight: 800; color: #FFF; margin-bottom: 4px; text-align: center;">Quick Action</div>
        <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 20px; text-align: center;">Choose an action to create or launch</div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
          
          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.modalComponent.open('task')">
            <span style="font-size: 22px; color: #E50914;">✅</span>
            <span style="font-size: 11px; font-weight: 700;">Task</span>
          </button>

          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'goals' })">
            <span style="font-size: 22px; color: #10B981;">🎯</span>
            <span style="font-size: 11px; font-weight: 700;">Goal</span>
          </button>

          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'academic' })">
            <span style="font-size: 22px; color: #8B5CF6;">📤</span>
            <span style="font-size: 11px; font-weight: 700;">Upload</span>
          </button>

          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'notes' })">
            <span style="font-size: 22px; color: #3B82F6;">📝</span>
            <span style="font-size: 11px; font-weight: 700;">Note</span>
          </button>

          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'projects' })">
            <span style="font-size: 22px; color: #D946EF;">🚀</span>
            <span style="font-size: 11px; font-weight: 700;">Project</span>
          </button>

          <button class="btn" style="padding: 12px 8px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'habits' })">
            <span style="font-size: 22px; color: #F59E0B;">🔄</span>
            <span style="font-size: 11px; font-weight: 700;">Habit</span>
          </button>

        </div>

        <button class="btn btn-secondary" style="width: 100%; margin-top: 16px; padding: 12px; font-size: 13px; font-weight: 700; color: #FFF; background: linear-gradient(135deg, rgba(229,9,20,0.1), rgba(185,28,45,0.1)); border-color: #E50914;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'ai' })">
          🤖 Ask AI Companion
        </button>
      `;
    }

    if (this.sheetType === 'more') {
      return `
        <div style="font-size: 16px; font-weight: 800; color: #FFF; margin-bottom: 20px; text-align: center;">More Features</div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #1A1A22; border-radius: 12px; cursor: pointer;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'learning' })">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="font-size: 20px;">📚</span>
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">Learning Hub</span>
            </div>
            <span style="color: #666; font-weight: 800;">></span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #1A1A22; border-radius: 12px; cursor: pointer;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'coding' })">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="font-size: 20px;">💻</span>
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">Coding Tracker</span>
            </div>
            <span style="color: #666; font-weight: 800;">></span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #1A1A22; border-radius: 12px; cursor: pointer;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'placement' })">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="font-size: 20px;">👔</span>
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">Placement</span>
            </div>
            <span style="color: #666; font-weight: 800;">></span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #1A1A22; border-radius: 12px; cursor: pointer;" onclick="window.mobileBottomSheet.close()">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="font-size: 20px;">📦</span>
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">Archive & Trash</span>
            </div>
            <span style="color: #666; font-weight: 800;">></span>
          </div>
        </div>
      `;
    }

    return '';
  }
}

window.mobileBottomSheet = new MobileBottomSheetComponent();
