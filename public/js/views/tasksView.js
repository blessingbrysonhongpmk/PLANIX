/**
 * PLANIX TASKS VIEW — Product-quality task manager
 * Page header, search, filter pills, add task, empty state, delete confirmation, success animation
 */

class TasksView {
  constructor() {
    this.filter = 'all';
    this.searchQuery = '';
  }

  render(state) {
    let tasks = state.tasks;
    if (this.filter === 'pending') tasks = tasks.filter(t => !t.completed);
    if (this.filter === 'completed') tasks = tasks.filter(t => t.completed);
    if (this.searchQuery) tasks = tasks.filter(t => t.text.toLowerCase().includes(this.searchQuery.toLowerCase()));

    const counts = { all: state.tasks.length, pending: state.tasks.filter(t => !t.completed).length, done: state.tasks.filter(t => t.completed).length };

    return `
      <div class="view-container animate-fade-in">

        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Tasks</h1>
            <p class="page-description">Organize your daily work. Add tasks, set priorities, and check them off.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.tasksView.openAddTask()">+ Add Task</button>
          </div>
        </div>

        <!-- Search + Filters -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; align-items: center;">
          <input type="text" class="form-input" placeholder="Search tasks..." style="max-width: 280px; flex: 1;" value="${this.searchQuery}" oninput="window.tasksView.searchQuery = this.value; window.store.notify()">
          <div style="display: flex; gap: 4px; background: var(--bg-input); padding: 3px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            ${['all', 'pending', 'completed'].map(f => `
              <button class="btn ${this.filter === f ? 'btn-primary' : 'btn-ghost'}" style="padding: 5px 12px; font-size: 12px; min-height: auto;" onclick="window.tasksView.filter = '${f}'; window.store.notify()">
                ${f === 'all' ? `All (${counts.all})` : f === 'pending' ? `Pending (${counts.pending})` : `Done (${counts.done})`}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Add Task Inline -->
        <div id="task-add-area" class="card" style="margin-bottom: 20px; padding: var(--spacing-4); display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
          <input type="text" id="new-task-input" class="form-input" placeholder="What do you need to do?" style="flex: 1; min-width: 220px;" onkeydown="if(event.key==='Enter') window.tasksView.addTask()">
          <select id="new-task-priority" class="form-input" style="width: auto; min-width: 140px;">
            <option value="high">🔴 High</option>
            <option value="medium" selected>🟡 Normal</option>
            <option value="low">🟢 Low</option>
          </select>
          <button class="btn btn-primary" onclick="window.tasksView.addTask()">Add</button>
        </div>

        <!-- Task List -->
        <div class="card" style="padding: var(--spacing-4);">
          ${tasks.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">📋</div>
              <div class="empty-state-title">${this.searchQuery ? 'No matching tasks' : this.filter === 'completed' ? 'No completed tasks yet' : 'No tasks yet'}</div>
              <div class="empty-state-desc">${this.searchQuery ? 'Try a different search term.' : 'Add your first task above. It takes less than 10 seconds.'}</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${tasks.map(task => `
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); transition: background var(--transition-fast);"
                     onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='var(--bg-input)'">
                  <input type="checkbox" ${task.completed ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-primary); cursor: pointer; flex-shrink: 0;" onchange="window.tasksView.toggleTask('${task.id}')">
                  <span style="flex: 1; font-size: 14px; color: ${task.completed ? 'var(--text-tertiary)' : 'var(--text-primary)'}; text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</span>
                  <span class="badge badge-${task.priority === 'high' ? 'urgent' : task.priority === 'low' ? 'health' : 'work'}" style="font-size: 10px;">${(task.priority || 'normal').toUpperCase()}</span>
                  <button class="btn btn-icon" onclick="window.tasksView.deleteTask('${task.id}')" title="Delete task" aria-label="Delete task">
                    <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  openAddTask() {
    const input = document.getElementById('new-task-input');
    if (input) input.focus();
  }

  async addTask() {
    const input = document.getElementById('new-task-input');
    const priority = document.getElementById('new-task-priority');
    if (!input || !input.value.trim()) return;

    const newTask = { id: `task_${Date.now()}`, text: input.value.trim(), priority: priority?.value || 'medium', completed: false, createdAt: new Date().toISOString() };
    input.value = '';
    window.store.setState(prev => ({ tasks: [newTask, ...prev.tasks] }));
    if (window.showToast) window.showToast('Task added', 'success');
    try { await window.apiClient.post('/tasks', newTask); } catch(e) {}
  }

  async toggleTask(id) {
    const tasks = window.store.state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    window.store.setState({ tasks });
    const task = tasks.find(t => t.id === id);
    if (task?.completed && window.showToast) window.showToast('Task completed! ✓', 'success');
    try { await window.apiClient.put(`/tasks/${id}`, { completed: task?.completed }); } catch(e) {}
  }

  async deleteTask(id) {
    if (!confirm('Delete this task? This cannot be undone.')) return;
    const tasks = window.store.state.tasks.filter(t => t.id !== id);
    window.store.setState({ tasks });
    try { await window.apiClient.delete(`/tasks/${id}`); } catch(e) {}
  }
}

window.tasksView = new TasksView();
