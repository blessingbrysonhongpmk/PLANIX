/**
 * PLANIX TASKS VIEW
 * Clean Task List with Priority Flags, Simple English, and Backend REST API CRUD
 */

class TasksView {
  constructor() {
    this.filter = 'all'; // 'all' | 'pending' | 'completed'
  }

  render(state) {
    let filteredTasks = state.tasks;
    if (this.filter === 'pending') filteredTasks = state.tasks.filter(t => !t.completed);
    if (this.filter === 'completed') filteredTasks = state.tasks.filter(t => t.completed);

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>✅</span> My Tasks
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Organize your daily tasks, set priority levels, and complete your work easily.
            </p>
          </div>

          <!-- Filter Pills -->
          <div style="display: flex; gap: 8px; background: #141417; padding: 4px; border-radius: 10px; border: 1px solid #27272A;">
            <button class="btn" style="padding: 6px 14px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; ${this.filter === 'all' ? 'background: #E50914; color: white;' : 'background: transparent; color: #A1A1AA;'}" onclick="window.tasksView.setFilter('all')">All (${state.tasks.length})</button>
            <button class="btn" style="padding: 6px 14px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; ${this.filter === 'pending' ? 'background: #E50914; color: white;' : 'background: transparent; color: #A1A1AA;'}" onclick="window.tasksView.setFilter('pending')">Pending (${state.tasks.filter(t=>!t.completed).length})</button>
            <button class="btn" style="padding: 6px 14px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; ${this.filter === 'completed' ? 'background: #E50914; color: white;' : 'background: transparent; color: #A1A1AA;'}" onclick="window.tasksView.setFilter('completed')">Done (${state.tasks.filter(t=>t.completed).length})</button>
          </div>
        </div>

        <!-- Add Task Input Box -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 14px; padding: 16px; margin-bottom: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <input type="text" id="new-task-input" class="form-input" placeholder="Type new task e.g. Read English chapter..." style="flex: 1; min-width: 260px; background: #1C1C21; border-color: #3F3F46; color: white; padding: 12px; border-radius: 8px;" onkeydown="if(event.key==='Enter') window.tasksView.addTask()">
          <select id="new-task-priority" class="form-input" style="background: #1C1C21; border-color: #3F3F46; color: white; padding: 12px; border-radius: 8px;">
            <option value="high">🔴 High Priority</option>
            <option value="medium" selected>🟡 Normal Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
          <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 12px 20px; font-weight: 700; cursor: pointer;" onclick="window.tasksView.addTask()">
            Add Task
          </button>
        </div>

        <!-- Task List Container -->
        <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
          ${filteredTasks.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: #71717A;">
              <div style="font-size: 32px; margin-bottom: 8px;">📝</div>
              <div>No tasks found in this list.</div>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${filteredTasks.map(task => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #1C1C21; border-radius: 12px; border: 1px solid #27272A; transition: transform 0.15s ease;">
                  <div style="display: flex; align-items: center; gap: 14px; flex: 1;">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: #E50914; cursor: pointer;" onchange="window.tasksView.toggleTask('${task.id}')">
                    <span style="color: ${task.completed ? '#71717A' : '#FFF'}; text-decoration: ${task.completed ? 'line-through' : 'none'}; font-size: 15px;">
                      ${task.text}
                    </span>
                  </div>

                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; ${task.priority === 'high' ? 'background: rgba(229,9,20,0.2); color: #FF4D4D;' : task.priority === 'medium' ? 'background: rgba(245,183,0,0.2); color: #F5B700;' : 'background: rgba(16,185,129,0.2); color: #10B981;'}">
                      ${task.priority ? task.priority.toUpperCase() : 'NORMAL'}
                    </span>
                    <button class="btn" style="background: transparent; color: #71717A; border: none; font-size: 16px; cursor: pointer;" title="Delete task" onclick="window.tasksView.deleteTask('${task.id}')">
                      🗑️
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    `;
  }

  setFilter(f) {
    this.filter = f;
    window.store.notify();
  }

  async addTask() {
    const input = document.getElementById('new-task-input');
    const prioritySelect = document.getElementById('new-task-priority');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    const priority = prioritySelect ? prioritySelect.value : 'medium';
    input.value = '';

    const newTask = {
      id: `task_${Date.now()}`,
      text,
      priority,
      completed: false,
      category: 'general',
      createdAt: new Date().toISOString()
    };

    window.store.setState(prev => ({ tasks: [newTask, ...prev.tasks] }));
    await window.apiClient.post('/tasks', newTask);
  }

  async toggleTask(taskId) {
    const tasks = window.store.state.tasks.map(t => {
      if (t.id === taskId) return { ...t, completed: !t.completed };
      return t;
    });
    window.store.setState({ tasks });
    await window.apiClient.put(`/tasks/${taskId}`, { completed: true });
  }

  async deleteTask(taskId) {
    const tasks = window.store.state.tasks.filter(t => t.id !== taskId);
    window.store.setState({ tasks });
    await window.apiClient.delete(`/tasks/${taskId}`);
  }
}

window.tasksView = new TasksView();
