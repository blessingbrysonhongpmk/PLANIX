/**
 * PLANIX V5 PLANNER HUB VIEW (Mobile First Architecture)
 * Unified hub for Goals, Tasks, Calendar, Habits, Projects, Routine.
 */

class PlannerHubView {
  constructor() {
    this.activeTab = 'tasks'; // Default tab
  }

  setTab(tab) {
    this.activeTab = tab;
    window.store.notify();
  }

  render(state) {
    let content = '';

    // Delegate rendering to the respective view controllers
    switch (this.activeTab) {
      case 'goals':
        content = window.goalsView ? window.goalsView.render(state) : '<div class="card p-24">Goals View Loading...</div>';
        break;
      case 'tasks':
        content = window.tasksView ? window.tasksView.render(state) : '<div class="card p-24">Tasks View Loading...</div>';
        break;
      case 'calendar':
        content = window.calendarView ? window.calendarView.render(state) : '<div class="card p-24">Calendar View Loading...</div>';
        break;
      case 'habits':
        content = window.habitsView ? window.habitsView.render(state) : '<div class="card p-24">Habits View Loading...</div>';
        break;
      case 'projects':
        content = window.projectsView ? window.projectsView.render(state) : '<div class="card p-24">Projects View Loading...</div>';
        break;
      case 'routine':
        content = window.routineView ? window.routineView.render(state) : '<div class="card p-24">Routine View Loading...</div>';
        break;
      default:
        content = '<div class="card p-24">Select a planner tab</div>';
    }

    return `
      <style>
        .planner-hub-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }
        /* Overriding inner view padding so it aligns nicely under the chips */
        .planner-hub-wrapper .view-container {
          padding-top: 16px !important; 
        }
      </style>
      
      <div class="planner-hub-wrapper animate-fade-in">
        
        <!-- Swipable Chips Navigation -->
        <div class="mobile-chips-container">
          <button class="mobile-chip ${this.activeTab === 'goals' ? 'active' : ''}" onclick="window.plannerHubView.setTab('goals')">Goals</button>
          <button class="mobile-chip ${this.activeTab === 'tasks' ? 'active' : ''}" onclick="window.plannerHubView.setTab('tasks')">Tasks</button>
          <button class="mobile-chip ${this.activeTab === 'calendar' ? 'active' : ''}" onclick="window.plannerHubView.setTab('calendar')">Calendar</button>
          <button class="mobile-chip ${this.activeTab === 'habits' ? 'active' : ''}" onclick="window.plannerHubView.setTab('habits')">Habits</button>
          <button class="mobile-chip ${this.activeTab === 'projects' ? 'active' : ''}" onclick="window.plannerHubView.setTab('projects')">Projects</button>
          <button class="mobile-chip ${this.activeTab === 'routine' ? 'active' : ''}" onclick="window.plannerHubView.setTab('routine')">Routine</button>
        </div>

        <!-- Dynamic Hub Content -->
        <div class="planner-hub-content" style="flex: 1;">
          ${content}
        </div>

      </div>
    `;
  }
}

window.plannerHubView = new PlannerHubView();
