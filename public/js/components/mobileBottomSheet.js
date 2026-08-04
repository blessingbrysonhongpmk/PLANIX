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

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          
          <button class="btn" style="padding: 16px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.modalComponent.open('task')">
            <span style="font-size: 24px; color: #E50914;">✅</span>
            <span style="font-size: 13px; font-weight: 700;">Add Task</span>
          </button>

          <button class="btn" style="padding: 16px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'notes' })">
            <span style="font-size: 24px; color: #3B82F6;">📝</span>
            <span style="font-size: 13px; font-weight: 700;">Quick Note</span>
          </button>

          <button class="btn" style="padding: 16px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'intelligence' })">
            <span style="font-size: 24px; color: #8B5CF6;">📤</span>
            <span style="font-size: 13px; font-weight: 700;">Upload PDF</span>
          </button>

          <button class="btn" style="padding: 16px; background: #1A1A22; border: 1px solid #2A2A35; border-radius: 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; color: #FFF;" onclick="window.mobileBottomSheet.close(); window.store.setState({ currentView: 'study' })">
            <span style="font-size: 24px; color: #F59E0B;">⏱️</span>
            <span style="font-size: 13px; font-weight: 700;">Study Timer</span>
          </button>

        </div>

        <button class="btn btn-secondary" style="width: 100%; margin-top: 16px; padding: 12px; font-size: 13px; font-weight: 700; color: #FFF; background: #1A1A22; border-color: #2A2A35;" onclick="window.mobileBottomSheet.close(); window.store.setState({ isAiDrawerOpen: true })">
          🤖 Ask AI Companion
        </button>
      `;
    }

    return '';
  }
}

window.mobileBottomSheet = new MobileBottomSheetComponent();
