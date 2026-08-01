/**
 * PLANIX TASKS & KANBAN VIEW
 * Simple task list, Kanban columns (To Do, In Progress, Review, Done), subtasks & drag-and-drop
 */

class TasksView {
  render(state) {
    const tasks = state.tasks || [];
    const todo = tasks.filter(t => !t.completed && (t.kanbanStatus === 'todo' || !t.kanbanStatus));
    const inProgress = tasks.filter(t => !t.completed && t.kanbanStatus === 'in_progress');
    const review = tasks.filter(t => !t.completed && t.kanbanStatus === 'review');
    const completed = tasks.filter(t => t.completed || t.kanbanStatus === 'done');

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Tasks & Kanban Board ✅</div>
            <div class="view-subtitle">Organize goals • Subtasks • Priority tags</div>
          </div>
          <button class="btn btn-primary" onclick="window.store.setState({ isCommandPaletteOpen: true })">+ Quick Add Task</button>
        </div>

        <div class="kanban-grid">
          <!-- Column 1: To Do -->
          <div class="kanban-col">
            <div class="kanban-header">
              <span>📌 To Do (${todo.length})</span>
            </div>
            <div class="kanban-cards">
              ${todo.map(t => this.renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Column 2: In Progress -->
          <div class="kanban-col">
            <div class="kanban-header">
              <span>⚡ In Progress (${inProgress.length})</span>
            </div>
            <div class="kanban-cards">
              ${inProgress.map(t => this.renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Column 3: Review -->
          <div class="kanban-col">
            <div class="kanban-header">
              <span>👀 Review (${review.length})</span>
            </div>
            <div class="kanban-cards">
              ${review.map(t => this.renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Column 4: Completed -->
          <div class="kanban-col">
            <div class="kanban-header">
              <span>🎉 Done (${completed.length})</span>
            </div>
            <div class="kanban-cards">
              ${completed.map(t => this.renderTaskCard(t)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTaskCard(task) {
    const badgeClass = task.category === 'study' ? 'badge-study' : task.category === 'health' ? 'badge-health' : task.category === 'work' ? 'badge-work' : 'badge-personal';

    return `
      <div class="task-card ${task.completed ? 'completed' : ''}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="badge ${badgeClass}">${task.category || 'personal'}</span>
          <button class="btn btn-icon" style="width: 24px; height: 24px; font-size: 12px;" onclick="window.tasksView.toggleComplete('${task.id}', ${!task.completed})">
            ${task.completed ? '✓' : '○'}
          </button>
        </div>
        <div class="task-title" style="font-weight: 600; font-size: 14px; margin-bottom: 6px;">${task.text}</div>
        
        ${task.suggestions && task.suggestions.length > 0 ? `
          <div style="font-size: 11px; color: var(--text-tertiary); background: var(--bg-input); padding: 6px 10px; border-radius: var(--radius-xs); margin-top: 8px;">
            💡 ${task.suggestions[0]}
          </div>
        ` : ''}
      </div>
    `;
  }

  async toggleComplete(id, completed) {
    const res = await window.apiClient.put(`/tasks/${id}`, { completed });
    if (res.success) {
      window.store.setState(prev => ({
        tasks: prev.tasks.map(t => t.id === id ? { ...t, completed } : t)
      }));
    }
  }
}

window.tasksView = new TasksView();
