/**
 * PLANIX CALENDAR VIEW — Events, deadlines, and schedule
 */

class CalendarView {
  render(state) {
    const events = state.calendarEvents || [];
    // Combine calendar events, goal deadlines, and placement dates
    const allItems = [
      ...events,
      ...(state.goals || []).filter(g => g.targetDate).map(g => ({ id: g.id, title: `Goal: ${g.title}`, date: g.targetDate, type: 'goal' })),
      ...(state.placements || []).filter(p => p.date).map(p => ({ id: p.id, title: `Applied: ${p.company}`, date: p.date, type: 'placement' }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    return `
      <div class="view-container animate-fade-in">
        <div class="page-header">
          <div class="page-header-info">
            <h1 class="page-title">Calendar</h1>
            <p class="page-description">Keep track of your events, goal deadlines, and placement schedules.</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary" onclick="window.calendarView.addEvent()">+ Add Event</button>
          </div>
        </div>

        ${allItems.length === 0 ? `
          <div class="card"><div class="empty-state">
            <div class="empty-state-icon">📅</div>
            <div class="empty-state-title">Your schedule is clear</div>
            <div class="empty-state-desc">Add events, set goal deadlines, or track placements to see them here.</div>
            <button class="btn btn-primary" onclick="window.calendarView.addEvent()">Add Event</button>
          </div></div>
        ` : `
          <div class="card" style="padding: var(--spacing-4);">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${allItems.map(item => `
                <div style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 3px solid ${item.type === 'goal' ? 'var(--accent-primary)' : item.type === 'placement' ? 'var(--accent-secondary)' : 'var(--color-info)'};">
                  <div style="width: 80px; font-size: 13px; font-weight: 700; color: var(--text-tertiary);">${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <div style="flex: 1; font-size: 15px; font-weight: 500; color: var(--text-primary);">${item.title}</div>
                  <span class="badge badge-${item.type === 'goal' ? 'urgent' : item.type === 'placement' ? 'work' : 'personal'}" style="font-size: 10px;">${(item.type || 'event').toUpperCase()}</span>
                  ${!item.type || item.type === 'event' ? `<button class="btn btn-icon" onclick="window.calendarView.deleteEvent('${item.id}')"><svg viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  }

  addEvent() {
    const title = prompt('Event name:');
    if (!title) return;
    const date = prompt('Date (YYYY-MM-DD):') || new Date().toISOString().slice(0, 10);
    window.store.setState(prev => ({ calendarEvents: [...(prev.calendarEvents || []), { id: `evt_${Date.now()}`, title, date, type: 'event' }] }));
  }

  deleteEvent(id) {
    if (!confirm('Remove this event?')) return;
    window.store.setState({ calendarEvents: (window.store.state.calendarEvents || []).filter(e => e.id !== id) });
  }
}

window.calendarView = new CalendarView();
