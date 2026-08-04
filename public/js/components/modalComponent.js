/**
 * PLANIX V5 — UNIVERSAL MODAL & MOBILE BOTTOM SHEET ENGINE
 * Premium Dark Glassmorphism Modal Dialogs and Mobile Bottom Sheets.
 * Replaces primitive browser prompt() and confirm() popups.
 */

class ModalComponent {
  constructor() {
    this.activeModal = null; // 'task', 'goal', 'habit', 'project', 'subject', 'placement', 'topic', 'resource', 'snippet', 'confirm'
    this.modalData = {};
  }

  open(type, data = {}) {
    this.activeModal = type;
    this.modalData = data;
    window.store.setState({ activeModal: type, activeModalData: data });
  }

  close() {
    this.activeModal = null;
    this.modalData = {};
    window.store.setState({ activeModal: null, activeModalData: {} });
  }

  render(state) {
    const modalType = state.activeModal || this.activeModal;
    if (!modalType) return '';

    const data = state.activeModalData || this.modalData || {};

    return `
      <div class="modal-backdrop open" onclick="if(event.target === this) window.modalComponent.close()">
        <div class="modal-card animate-scale-up" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h3 class="modal-title">${this.getModalTitle(modalType, data)}</h3>
            <button class="btn btn-icon modal-close-btn" onclick="window.modalComponent.close()" aria-label="Close modal">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div class="modal-body">
            ${this.renderModalContent(modalType, data)}
          </div>
        </div>
      </div>
    `;
  }

  getModalTitle(type, data) {
    switch (type) {
      case 'task': return data.id ? 'Edit Task' : 'Create New Task';
      case 'goal': return data.id ? 'Edit Goal' : 'Create New Goal';
      case 'habit': return 'New Habit';
      case 'project': return 'Create Engineering Project';
      case 'subject': return 'Add Semester Subject';
      case 'placement': return 'Track Job Application';
      case 'topic': return 'Add Learning Topic';
      case 'resource': return 'Save Resource';
      case 'snippet': return 'Save Dev Snippet';
      case 'event': return 'Add Calendar Event';
      case 'timeblock': return 'Add Routine Time Block';
      case 'confirm': return data.title || 'Confirm Action';
      default: return 'PLANIX Action';
    }
  }

  renderModalContent(type, data) {
    switch (type) {
      case 'task':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitTask(this)">
            <div class="form-group">
              <label class="form-label">Task Title</label>
              <input type="text" name="text" class="form-input" placeholder="e.g. Implement JWT Auth service" value="${data.text || ''}" required autofocus>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select name="priority" class="form-input">
                  <option value="high" ${data.priority === 'high' ? 'selected' : ''}>🔴 High Priority</option>
                  <option value="medium" ${!data.priority || data.priority === 'medium' ? 'selected' : ''}>🟡 Medium Priority</option>
                  <option value="low" ${data.priority === 'low' ? 'selected' : ''}>🟢 Low Priority</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Category / Label</label>
                <input type="text" name="label" class="form-input" placeholder="e.g. Engineering, Exam, Project" value="${data.label || 'General'}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Task</button>
            </div>
          </form>
        `;

      case 'goal':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitGoal(this)">
            <div class="form-group">
              <label class="form-label">Goal Title</label>
              <input type="text" name="title" class="form-input" placeholder="e.g. Land Software Engineering Internship at Microsoft" value="${data.title || ''}" required autofocus>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Target Deadline</label>
                <input type="date" name="targetDate" class="form-input" value="${data.targetDate || ''}">
              </div>
              <div class="form-group">
                <label class="form-label">Current Progress (%)</label>
                <input type="number" name="progress" class="form-input" min="0" max="100" value="${data.progress || 0}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Goal</button>
            </div>
          </form>
        `;

      case 'habit':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitHabit(this)">
            <div class="form-group">
              <label class="form-label">Habit Name</label>
              <input type="text" name="name" class="form-input" placeholder="e.g. Solve 2 LeetCode Problems, Read 20 mins" value="${data.name || ''}" required autofocus>
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select name="category" class="form-input">
                <option value="coding">💻 Coding & Tech</option>
                <option value="academics">🎓 Academics</option>
                <option value="health">💪 Fitness & Health</option>
                <option value="mindset">🧠 Mindset & Reading</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Habit</button>
            </div>
          </form>
        `;

      case 'project':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitProject(this)">
            <div class="form-group">
              <label class="form-label">Project Title</label>
              <input type="text" name="title" class="form-input" placeholder="e.g. Autonomous AI Code Reviewer" value="${data.title || ''}" required autofocus>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea name="description" class="form-input" rows="3" placeholder="Short summary of project scope & purpose...">${data.description || ''}</textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tech Stack (comma separated)</label>
                <input type="text" name="techStack" class="form-input" placeholder="e.g. Python, PyTorch, React, FastApi" value="${(data.techStack || []).join(', ')}">
              </div>
              <div class="form-group">
                <label class="form-label">GitHub Repository URL</label>
                <input type="url" name="github" class="form-input" placeholder="https://github.com/username/repo" value="${data.github || ''}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Create Project</button>
            </div>
          </form>
        `;

      case 'subject':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitSubject(this)">
            <div class="form-group">
              <label class="form-label">Subject Name</label>
              <input type="text" name="subject" class="form-input" placeholder="e.g. Data Structures & Algorithms" value="${data.subject || ''}" required autofocus>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Classes Attended</label>
                <input type="number" name="attended" class="form-input" min="0" value="${data.attended || 0}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Total Conducted</label>
                <input type="number" name="total" class="form-input" min="0" value="${data.total || 0}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Min Threshold (%)</label>
                <input type="number" name="target" class="form-input" min="50" max="100" value="${data.target || 75}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Subject</button>
            </div>
          </form>
        `;

      case 'placement':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitPlacement(this)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" name="company" class="form-input" placeholder="e.g. Google, Microsoft, Amazon" value="${data.company || ''}" required autofocus>
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <input type="text" name="role" class="form-input" placeholder="e.g. Software Engineer / AI Intern" value="${data.role || 'Software Engineer'}" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Stage</label>
                <select name="status" class="form-input">
                  <option value="applied" ${data.status === 'applied' ? 'selected' : ''}>Applied</option>
                  <option value="oa" ${data.status === 'oa' ? 'selected' : ''}>Online Assessment (OA)</option>
                  <option value="interview" ${data.status === 'interview' ? 'selected' : ''}>Interview Scheduled</option>
                  <option value="offer" ${data.status === 'offer' ? 'selected' : ''}>🎉 Offer Received</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Application Link</label>
                <input type="url" name="link" class="form-input" placeholder="https://careers..." value="${data.link || ''}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Application</button>
            </div>
          </form>
        `;

      case 'topic':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitTopic(this)">
            <div class="form-group">
              <label class="form-label">Learning Topic</label>
              <input type="text" name="name" class="form-input" placeholder="e.g. PyTorch & Neural Networks" value="${data.name || ''}" required autofocus>
            </div>
            <div class="form-group">
              <label class="form-label">Description / Roadmap Goal</label>
              <input type="text" name="description" class="form-input" placeholder="e.g. Complete PyTorch 60min blitz & build Transformers" value="${data.description || ''}">
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Topic</button>
            </div>
          </form>
        `;

      case 'resource':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitResource(this)">
            <div class="form-group">
              <label class="form-label">Resource Title</label>
              <input type="text" name="title" class="form-input" placeholder="e.g. NeetCode 150 System Design" value="${data.title || ''}" required autofocus>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">URL / Link</label>
                <input type="url" name="url" class="form-input" placeholder="https://..." value="${data.url || ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <input type="text" name="category" class="form-input" placeholder="e.g. DSA, Web, ML" value="${data.category || 'General'}">
              </div>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Resource</button>
            </div>
          </form>
        `;

      case 'snippet':
        return `
          <form onsubmit="event.preventDefault(); window.modalComponent.submitSnippet(this)">
            <div class="form-group">
              <label class="form-label">Snippet Title</label>
              <input type="text" name="title" class="form-input" placeholder="e.g. PyTorch DataLoader Template" value="${data.title || ''}" required autofocus>
            </div>
            <div class="form-group">
              <label class="form-label">Code / Command</label>
              <textarea name="code" class="form-input" rows="6" style="font-family: var(--font-mono); font-size: 13px;" placeholder="Paste code snippet or terminal commands..." required>${data.code || ''}</textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Snippet</button>
            </div>
          </form>
        `;

      case 'confirm':
        return `
          <div style="text-align: center; padding: 12px 0 24px;">
            <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.5;">${data.message || 'Are you sure you want to delete this item? This action cannot be undone.'}</p>
            <div class="modal-actions" style="justify-content: center;">
              <button type="button" class="btn btn-secondary" onclick="window.modalComponent.close()">Cancel</button>
              <button type="button" class="btn btn-primary" style="background: var(--color-danger); border-color: var(--color-danger);" onclick="window.modalComponent.confirmAction()">Delete</button>
            </div>
          </div>
        `;

      default: return '';
    }
  }

  // --- SUBMIT HANDLERS ---
  async submitTask(form) {
    const text = form.text.value.trim();
    if (!text) return;
    const priority = form.priority.value;
    const label = form.label.value.trim() || 'General';

    const newTask = {
      id: `task_${Date.now()}`,
      text,
      priority,
      label,
      completed: false,
      createdAt: new Date().toISOString()
    };

    window.store.setState(prev => ({ tasks: [newTask, ...prev.tasks] }));
    if (window.showToast) window.showToast('Task added successfully!', 'success');
    this.close();
    try { await window.apiClient.post('/tasks', newTask); } catch(e) {}
  }

  submitGoal(form) {
    const title = form.title.value.trim();
    if (!title) return;
    const targetDate = form.targetDate.value;
    const progress = parseInt(form.progress.value) || 0;

    const newGoal = {
      id: `g_${Date.now()}`,
      title,
      targetDate,
      progress: Math.min(100, Math.max(0, progress))
    };

    window.store.setState(prev => ({ goals: [newGoal, ...prev.goals] }));
    if (window.showToast) window.showToast('Goal saved!', 'success');
    this.close();
  }

  submitHabit(form) {
    const name = form.name.value.trim();
    if (!name) return;

    const newHabit = {
      id: `h_${Date.now()}`,
      name,
      category: form.category.value,
      streak: 0,
      completedToday: false,
      history: []
    };

    window.store.setState(prev => ({ habits: [...prev.habits, newHabit] }));
    if (window.showToast) window.showToast('Habit created!', 'success');
    this.close();
  }

  submitProject(form) {
    const title = form.title.value.trim();
    if (!title) return;
    const techStack = form.techStack.value.split(',').map(s => s.trim()).filter(Boolean);

    const newProject = {
      id: `prj_${Date.now()}`,
      title,
      description: form.description.value.trim(),
      techStack,
      github: form.github.value.trim(),
      progress: 0
    };

    window.store.setState(prev => ({ projects: [...prev.projects, newProject] }));
    if (window.showToast) window.showToast('Project created!', 'success');
    this.close();
  }

  submitSubject(form) {
    const subject = form.subject.value.trim();
    if (!subject) return;

    const newSubject = {
      id: `att_${Date.now()}`,
      subject,
      attended: parseInt(form.attended.value) || 0,
      total: parseInt(form.total.value) || 0,
      target: parseInt(form.target.value) || 75
    };

    window.store.setState(prev => ({ attendance: [...prev.attendance, newSubject] }));
    if (window.showToast) window.showToast('Subject saved!', 'success');
    this.close();
  }

  submitPlacement(form) {
    const company = form.company.value.trim();
    if (!company) return;

    const newPlacement = {
      id: `pl_${Date.now()}`,
      company,
      role: form.role.value.trim() || 'Software Engineer',
      status: form.status.value,
      link: form.link.value.trim(),
      date: new Date().toISOString().slice(0, 10)
    };

    window.store.setState(prev => ({ placements: [newPlacement, ...prev.placements] }));
    if (window.showToast) window.showToast('Application tracked!', 'success');
    this.close();
  }

  submitTopic(form) {
    const name = form.name.value.trim();
    if (!name) return;

    const newTopic = {
      id: `lt_${Date.now()}`,
      name,
      description: form.description.value.trim(),
      progress: 0
    };

    window.store.setState(prev => ({ learningTopics: [...(prev.learningTopics || []), newTopic] }));
    if (window.showToast) window.showToast('Learning topic added!', 'success');
    this.close();
  }

  submitResource(form) {
    const title = form.title.value.trim();
    if (!title) return;

    const newResource = {
      id: `res_${Date.now()}`,
      title,
      url: form.url.value.trim(),
      category: form.category.value.trim() || 'General',
      type: 'link'
    };

    window.store.setState(prev => ({ resources: [newResource, ...(prev.resources || [])] }));
    if (window.showToast) window.showToast('Resource saved!', 'success');
    this.close();
  }

  submitSnippet(form) {
    const title = form.title.value.trim();
    if (!title) return;

    const newSnippet = {
      id: `snp_${Date.now()}`,
      title,
      code: form.code.value
    };

    window.store.setState(prev => ({ devSnippets: [...(prev.devSnippets || []), newSnippet] }));
    if (window.showToast) window.showToast('Snippet saved!', 'success');
    this.close();
  }

  confirmAction() {
    if (this.modalData && typeof this.modalData.onConfirm === 'function') {
      this.modalData.onConfirm();
    }
    this.close();
  }
}

window.modalComponent = new ModalComponent();
