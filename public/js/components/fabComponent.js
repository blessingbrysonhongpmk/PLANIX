/**
 * PLANIX V5 — FLOATING ACTION BUTTON (FAB) & MOBILE QUICK ADD
 * Native mobile experience for instant task, goal, habit, and note creation.
 */

class FabComponent {
  constructor() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    window.store.setState({ isFabMenuOpen: this.isOpen });
  }

  close() {
    this.isOpen = false;
    window.store.setState({ isFabMenuOpen: false });
  }

  render(state) {
    const open = state.isFabMenuOpen !== undefined ? state.isFabMenuOpen : this.isOpen;

    return `
      <div class="fab-container ${open ? 'active' : ''}">
        <!-- Speed Dial Actions -->
        <div class="fab-menu ${open ? 'open' : ''}">
          <button class="fab-item" onclick="window.fabComponent.close(); window.modalComponent.open('task')" title="Add Task">
            <span class="fab-label">New Task</span>
            <span class="fab-icon-sm">📋</span>
          </button>

          <button class="fab-item" onclick="window.fabComponent.close(); window.modalComponent.open('goal')" title="Add Goal">
            <span class="fab-label">New Goal</span>
            <span class="fab-icon-sm">🎯</span>
          </button>

          <button class="fab-item" onclick="window.fabComponent.close(); window.modalComponent.open('habit')" title="Add Habit">
            <span class="fab-label">New Habit</span>
            <span class="fab-icon-sm">🔁</span>
          </button>

          <button class="fab-item" onclick="window.fabComponent.close(); window.store.setState({ currentView: 'notes' }); window.notesView?.addNote()" title="Quick Note">
            <span class="fab-label">Quick Note</span>
            <span class="fab-icon-sm">📝</span>
          </button>
        </div>

        <!-- Main FAB Trigger -->
        <button class="fab-btn ${open ? 'open' : ''}" onclick="window.fabComponent.toggle()" aria-label="Quick Add Menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    `;
  }
}

window.fabComponent = new FabComponent();
