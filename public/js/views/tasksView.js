/**
 * PLANIX V5 TASKS VIEW — Premium List & Kanban Workflows
 */

class TasksView {
  constructor() {
    this.filter = 'all'; // all, pending, completed
    this.viewMode = 'list'; // list, kanban
    this.searchQuery = '';
  }

  render(state) {
    let tasks = state.tasks || [];
    if (this.filter === 'pending') tasks = tasks.filter(t => !t.completed);
    if (this.filter === 'completed') tasks = tasks.filter(t => t.completed);
    if (this.searchQuery) tasks = tasks.filter(t => t.text.toLowerCase().includes(this.searchQuery.toLowerCase()));

    const counts = {
      all: (state.tasks || []).length,
      pending: (state.tasks || []).filter(t => !t.completed).length,
      done: (state.tasks || []).filter(t => t.completed).length
    };

    return `
      <div class="view-container animate-fade-in" style="padding-right: 10px;">
        
        <!-- ==========================================
             NATIVE MOBILE TASKS (No Kanban, Simple List)
             ========================================== -->
        <div class="mobile-only" style="padding-bottom: 80px;">
          <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none;">
            <button class="mobile-chip ${this.filter === 'all' ? 'active' : ''}" onclick="window.tasksView.filter = 'all'; window.store.notify()">All ${counts.all}</button>
            <button class="mobile-chip ${this.filter === 'pending' ? 'active' : ''}" onclick="window.tasksView.filter = 'pending'; window.store.notify()">Pending ${counts.pending}</button>
            <button class="mobile-chip ${this.filter === 'completed' ? 'active' : ''}" onclick="window.tasksView.filter = 'completed'; window.store.notify()">Done ${counts.done}</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${tasks.map(task => `
              <div style="background: #121217; border: 1px solid #22222A; border-radius: 16px; padding: 16px; display: flex; align-items: flex-start; gap: 14px;" onclick="window.tasksView.toggleTask('${task.id}')">
                <div style="width: 26px; height: 26px; border-radius: 50%; border: 2px solid ${task.completed ? '#10B981' : '#4A4A5A'}; background: ${task.completed ? '#10B981' : 'transparent'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  ${task.completed ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#000" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                </div>
                <div style="flex: 1;">
                  <div style="font-size: 15px; font-weight: 600; color: ${task.completed ? '#8E8E9E' : '#FFF'}; text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.text}</div>
                  <div style="font-size: 12px; color: #8E8E9E; margin-top: 6px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    ${task.date ? `<span>📅 ${task.date}</span>` : ''}
                    ${task.priority === 'high' || task.priority === 'urgent' ? `<span style="color: #E50914;">🔥 High</span>` : ''}
                    ${task.label ? `<span style="background: #1A1A22; padding: 2px 8px; border-radius: 12px; font-size: 10px;">${task.label}</span>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
            ${tasks.length === 0 ? '<div style="text-align: center; color: #8E8E9E; padding: 40px; font-size: 14px;">No tasks found.</div>' : ''}
          </div>
        </div>

        <!-- ==========================================
             DESKTOP TASKS (List & Kanban)
             ========================================== -->
        <div class="desktop-only">        <!-- 1. HEADER & VIEW TOGGLES -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#E50914" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            <div>
              <h1 style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 0; line-height: 1.2;">Tasks</h1>
              <p style="font-size: 13px; color: var(--text-tertiary); margin-top: 4px;">Organize work, track engineering sprints, and execute.</p>
            </div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <!-- View Mode Switcher -->
            <div style="display: flex; gap: 4px; background: #161619; padding: 4px; border-radius: 8px; border: 1px solid #2A2A32;">
              <button class="btn" style="padding: 6px 14px; font-size: 12px; font-weight: 600; min-height: auto; border-radius: 6px; background: ${this.viewMode === 'list' ? '#2A2A32' : 'transparent'}; color: ${this.viewMode === 'list' ? '#FFF' : 'var(--text-tertiary)'}; border: none; box-shadow: ${this.viewMode === 'list' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'};" onclick="window.tasksView.viewMode = 'list'; window.store.notify()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: middle;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> List
              </button>
              <button class="btn" style="padding: 6px 14px; font-size: 12px; font-weight: 600; min-height: auto; border-radius: 6px; background: ${this.viewMode === 'kanban' ? '#2A2A32' : 'transparent'}; color: ${this.viewMode === 'kanban' ? '#FFF' : 'var(--text-tertiary)'}; border: none; box-shadow: ${this.viewMode === 'kanban' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'};" onclick="window.tasksView.viewMode = 'kanban'; window.store.notify()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; vertical-align: middle;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg> Kanban
              </button>
            </div>
            <button class="btn btn-primary" style="padding: 10px 18px; font-size: 13px; font-weight: 700;" onclick="window.modalComponent.open('task')">+ Add Task</button>
          </div>
        </div>

        <!-- 2. SEARCH & FILTERS -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; align-items: center; background: var(--bg-card); padding: 12px 16px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div style="position: relative; flex: 1; max-width: 320px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--text-tertiary)" stroke-width="2" style="position: absolute; left: 12px; top: 10px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="form-input" placeholder="Search tasks, labels..." style="padding-left: 36px; font-size: 13px; background: #0A0A0C; border: 1px solid #2A2A32;" value="${this.searchQuery}" oninput="window.tasksView.searchQuery = this.value; window.store.notify()">
          </div>

          <div style="width: 1px; height: 24px; background: var(--border-subtle);"></div>

          <div style="display: flex; gap: 20px; font-size: 13px; font-weight: 600;">
            <div style="cursor: pointer; color: ${this.filter === 'all' ? '#FFF' : 'var(--text-tertiary)'};" onclick="window.tasksView.filter = 'all'; window.store.notify()">All <span style="margin-left: 4px; padding: 2px 6px; border-radius: 10px; background: ${this.filter === 'all' ? '#E50914' : '#2A2A32'}; color: #FFF; font-size: 10px;">${counts.all}</span></div>
            <div style="cursor: pointer; color: ${this.filter === 'pending' ? '#FFF' : 'var(--text-tertiary)'};" onclick="window.tasksView.filter = 'pending'; window.store.notify()">Pending <span style="margin-left: 4px; padding: 2px 6px; border-radius: 10px; background: ${this.filter === 'pending' ? '#E50914' : '#2A2A32'}; color: #FFF; font-size: 10px;">${counts.pending}</span></div>
            <div style="cursor: pointer; color: ${this.filter === 'completed' ? '#FFF' : 'var(--text-tertiary)'};" onclick="window.tasksView.filter = 'completed'; window.store.notify()">Completed <span style="margin-left: 4px; padding: 2px 6px; border-radius: 10px; background: ${this.filter === 'completed' ? '#E50914' : '#2A2A32'}; color: #FFF; font-size: 10px;">${counts.done}</span></div>
          </div>
        </div>

        <!-- 3. CONTENT DISPLAY (LIST VS KANBAN) -->
        ${this.viewMode === 'kanban' ? this.renderKanbanView(state) : this.renderListView(tasks, counts)}

      </div>
    `;
  }

  renderListView(tasks, counts) {
    if (tasks.length === 0) {
      return `
        <div class="empty-state" style="padding: 80px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <div class="empty-state-icon">📝</div>
          <div class="empty-state-title">${this.searchQuery ? 'No matching tasks found' : this.filter === 'completed' ? 'No completed tasks yet' : 'No tasks pending'}</div>
          <div class="empty-state-desc">${this.searchQuery ? 'Try adjusting your search filters.' : 'Your task list is empty. Add a new task to get started.'}</div>
          <button class="btn btn-primary" onclick="window.modalComponent.open('task')">Create Task</button>
        </div>
      `;
    }

    return `
      <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start;">
        
        <!-- Main Task List (70%) -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${tasks.map(task => {
            let prioColor = '#10B981'; // low
            if(task.priority === 'high') prioColor = '#E50914';
            if(task.priority === 'medium') prioColor = '#F59E0B';
            
            return `
            <div class="card" style="padding: 0; display: flex; align-items: stretch; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;"
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.3)'" 
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              
              <!-- Priority left border strip -->
              <div style="width: 4px; background: ${prioColor}; flex-shrink: 0; opacity: ${task.completed ? 0.3 : 1};"></div>
              
              <div style="flex: 1; padding: 16px 20px; display: flex; align-items: center; gap: 16px;">
                <!-- Custom Checkbox -->
                <div style="cursor: pointer; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; border: 2px solid ${task.completed ? '#E50914' : '#2A2A32'}; background: ${task.completed ? 'rgba(229,9,20,0.1)' : 'transparent'}; flex-shrink: 0;" onclick="window.tasksView.toggleTask('${task.id}')">
                  ${task.completed ? `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E50914" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
                </div>
                
                <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                  <div style="font-size: 15px; font-weight: ${task.completed ? 500 : 700}; color: ${task.completed ? 'var(--text-tertiary)' : '#FFF'}; text-decoration: ${task.completed ? 'line-through' : 'none'};">
                    ${task.text}
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 12px;">
                    ${task.label ? `
                      <span style="font-size: 11px; font-weight: 600; color: var(--text-secondary); background: #161619; padding: 2px 8px; border-radius: 4px; border: 1px solid #2A2A32;">
                        ${task.label}
                      </span>
                    ` : ''}
                    ${task.est ? `
                      <span style="font-size: 11px; font-weight: 500; color: var(--text-tertiary); display: flex; align-items: center; gap: 4px;">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${task.est}
                      </span>
                    ` : ''}
                  </div>
                </div>

                <!-- Actions -->
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge ${task.priority === 'high' ? 'badge-urgent' : task.priority === 'low' ? 'badge-health' : 'badge-warning'}" style="font-size: 10px; text-transform: uppercase;">${task.priority || 'medium'}</span>
                  
                  <button class="btn btn-ghost" style="padding: 6px; color: var(--text-tertiary);" onclick="window.tasksView.confirmDelete('${task.id}')" title="Delete Task">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>

        <!-- Right Sidebar (30%) - Task Analytics -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          
          <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <h3 style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0;">Task Progress</h3>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">
              <div style="font-size: 32px; font-weight: 800; color: #E50914; line-height: 1;">${counts.done}</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-tertiary); padding-bottom: 4px;">/ ${counts.all} completed</div>
            </div>
            
            <div style="height: 6px; background: #222228; border-radius: 3px; overflow: hidden; margin-bottom: 16px;">
              <div style="height: 100%; background: #E50914; width: ${counts.all ? Math.round((counts.done / counts.all) * 100) : 0}%;"></div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span style="color: var(--text-secondary);">Pending Tasks</span>
                <span style="color: #FFF; font-weight: 600;">${counts.pending}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span style="color: var(--text-secondary);">High Priority</span>
                <span style="color: #FFF; font-weight: 600;">${window.store.state.tasks?.filter(t => t.priority === 'high' && !t.completed).length || 0}</span>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 20px; background: var(--bg-card); border: 1px solid var(--border-subtle);">
            <h3 style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0;">Quick Add</h3>
            <input type="text" id="quick-add-task" class="form-input" placeholder="Type a task and press Enter..." style="font-size: 13px;" onkeypress="if(event.key === 'Enter') { window.tasksView.quickAddTask(this.value); this.value=''; }">
            <div style="font-size: 10px; color: var(--text-tertiary); margin-top: 8px; text-align: center;">Press Enter to add task instantly</div>
          </div>

        </div>

      </div>
    `;
  }

  renderKanbanView(state) {
    const allTasks = state.tasks || [];
    const todoTasks = allTasks.filter(t => !t.completed && (!t.inProgress));
    const inProgressTasks = allTasks.filter(t => !t.completed && t.inProgress);
    const doneTasks = allTasks.filter(t => t.completed);

    const renderKanbanCard = (t) => {
      let prioColor = '#10B981'; // low
      if(t.priority === 'high') prioColor = '#E50914';
      if(t.priority === 'medium') prioColor = '#F59E0B';

      return `
        <div class="kanban-card" style="padding: 16px; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: transform 0.2s, box-shadow 0.2s; cursor: grab;"
             onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.3)'; this.style.borderColor='${prioColor}50'"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'; this.style.borderColor='var(--border-subtle)'">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              ${t.label ? `<span style="font-size: 10px; font-weight: 600; color: var(--text-secondary); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${t.label}</span>` : ''}
            </div>
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${prioColor};"></span>
          </div>

          <div style="font-size: 14px; font-weight: 600; color: ${t.completed ? 'var(--text-tertiary)' : '#FFF'}; text-decoration: ${t.completed ? 'line-through' : 'none'}; margin-bottom: 16px; line-height: 1.4;">
            ${t.text}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;">
            <div style="display: flex; align-items: center; gap: 4px; color: var(--text-tertiary);">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span style="font-size: 10px; font-weight: 500;">${t.est || '1h'}</span>
            </div>
            
            <div style="display: flex; gap: 4px;">
              ${!t.completed && !t.inProgress ? `<button class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px; min-height: auto; background: rgba(255,255,255,0.05);" onclick="window.tasksView.moveTaskStatus('${t.id}', 'inProgress')">Start</button>` : ''}
              ${t.inProgress ? `
                <button class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px; min-height: auto; background: rgba(255,255,255,0.05);" onclick="window.tasksView.moveTaskStatus('${t.id}', 'todo')">Back</button>
                <button class="btn" style="font-size: 10px; padding: 4px 8px; min-height: auto; background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3);" onclick="window.tasksView.toggleTask('${t.id}')">Done</button>
              ` : ''}
              ${t.completed ? `<button class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px; min-height: auto; background: rgba(255,255,255,0.05);" onclick="window.tasksView.toggleTask('${t.id}')">Undo</button>` : ''}
            </div>
          </div>
        </div>
      `;
    };

    return `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; min-height: 60vh;">
        
        <!-- TODO COLUMN -->
        <div style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <div style="padding: 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--text-tertiary);"></span>
              <span style="font-size: 14px; font-weight: 700; color: #FFF; text-transform: uppercase;">To Do</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); background: #161619; padding: 2px 6px; border-radius: 10px;">${todoTasks.length}</span>
            </div>
            <button class="btn btn-ghost" style="padding: 4px; min-height: auto; color: var(--text-secondary);" onclick="window.modalComponent.open('task')" title="Add Task">+</button>
          </div>
          <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto; background: rgba(0,0,0,0.2);">
            ${todoTasks.length === 0 ? `<div style="font-size: 12px; color: var(--text-tertiary); text-align: center; padding: 20px;">No pending tasks</div>` : todoTasks.map(renderKanbanCard).join('')}
          </div>
        </div>

        <!-- IN PROGRESS COLUMN -->
        <div style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
          <div style="padding: 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #F59E0B;"></span>
              <span style="font-size: 14px; font-weight: 700; color: #FFF; text-transform: uppercase;">In Progress</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); background: #161619; padding: 2px 6px; border-radius: 10px;">${inProgressTasks.length}</span>
            </div>
          </div>
          <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto; background: rgba(0,0,0,0.2);">
            ${inProgressTasks.length === 0 ? `<div style="font-size: 12px; color: var(--text-tertiary); text-align: center; padding: 20px;">No active tasks</div>` : inProgressTasks.map(renderKanbanCard).join('')}
          </div>
        </div>

        <!-- DONE COLUMN -->
        <div style="background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; opacity: 0.8;">
          <div style="padding: 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981;"></span>
              <span style="font-size: 14px; font-weight: 700; color: #FFF; text-transform: uppercase;">Done</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--text-tertiary); background: #161619; padding: 2px 6px; border-radius: 10px;">${doneTasks.length}</span>
            </div>
          </div>
          <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto; background: rgba(0,0,0,0.2);">
            ${doneTasks.length === 0 ? `<div style="font-size: 12px; color: var(--text-tertiary); text-align: center; padding: 20px;">No completed tasks</div>` : doneTasks.map(renderKanbanCard).join('')}
          </div>
        </div>
        </div>
        </div> <!-- End Desktop Only -->

      </div>
    `;
  }

  async toggleTask(id) {
    const tasks = window.store.state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed, inProgress: false } : t);
    window.store.setState({ tasks });
    window.store.saveLocalCache(); // Save state immediately
    const task = tasks.find(t => t.id === id);
    if (task?.completed && window.showToast) window.showToast('Task checked off! ✓', 'success');
  }

  moveTaskStatus(id, status) {
    const tasks = window.store.state.tasks.map(t => {
      if (t.id === id) {
        if (status === 'inProgress') return { ...t, inProgress: true, completed: false };
        if (status === 'todo') return { ...t, inProgress: false, completed: false };
      }
      return t;
    });
    window.store.setState({ tasks });
    window.store.saveLocalCache();
  }

  quickAddTask(text) {
    if(!text.trim()) return;
    const newTask = {
      id: 'task_' + Date.now(),
      text: text.trim(),
      priority: 'medium',
      label: 'Inbox',
      est: '30m',
      completed: false,
      inProgress: false
    };
    const tasks = [newTask, ...window.store.state.tasks];
    window.store.setState({ tasks });
    window.store.saveLocalCache();
    if(window.showToast) window.showToast('Task added to Inbox', 'success');
  }

  confirmDelete(id) {
    window.modalComponent.open('confirm', {
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      onConfirm: () => this.deleteTask(id)
    });
  }

  async deleteTask(id) {
    const tasks = window.store.state.tasks.filter(t => t.id !== id);
    window.store.setState({ tasks });
    window.store.saveLocalCache();
    if (window.showToast) window.showToast('Task deleted', 'info');
  }
}

window.tasksView = new TasksView();
