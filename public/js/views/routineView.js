/**
 * PLANIX ROUTINE VIEW
 * Time-block planner (Morning, Afternoon, Evening) with simple toggle
 */

class RoutineView {
  render(state) {
    const morning = state.routine.filter(r => r.period === 'morning');
    const afternoon = state.routine.filter(r => r.period === 'afternoon');
    const evening = state.routine.filter(r => r.period === 'evening');

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>⏰</span> Daily Routine Planner
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Plan your morning, afternoon, and evening routine blocks for maximum daily focus.
            </p>
          </div>

          <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; cursor: pointer;" onclick="window.routineView.addRoutineItem()">
            + Add Routine Slot
          </button>
        </div>

        <!-- Routine Time Blocks -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          
          <!-- Morning Block -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #F5B700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
              <span>🌅</span> Morning Routine
            </h3>
            ${this.renderBlockList(morning)}
          </div>

          <!-- Afternoon Block -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #3B82F6; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
              <span>☀️</span> Afternoon Routine
            </h3>
            ${this.renderBlockList(afternoon)}
          </div>

          <!-- Evening Block -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 16px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 700; color: #10B981; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
              <span>🌙</span> Evening Routine
            </h3>
            ${this.renderBlockList(evening)}
          </div>

        </div>

      </div>
    `;
  }

  renderBlockList(items) {
    if (items.length === 0) return `<div style="color: #71717A; font-size: 13px;">No items scheduled.</div>`;

    return `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${items.map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #1C1C21; border-radius: 10px; border: 1px solid #27272A;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <input type="checkbox" ${item.done ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #E50914; cursor: pointer;" onchange="window.routineView.toggleDone('${item.id}')">
              <span style="font-size: 13px; font-weight: 700; color: #E50914; min-width: 75px;">${item.time}</span>
              <span style="color: ${item.done ? '#71717A' : '#FFF'}; text-decoration: ${item.done ? 'line-through' : 'none'}; font-size: 14px;">
                ${item.title}
              </span>
            </div>
            <button class="btn" style="background: transparent; color: #71717A; border: none;" onclick="window.routineView.deleteItem('${item.id}')">🗑️</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  toggleDone(id) {
    const routine = window.store.state.routine.map(r => {
      if (r.id === id) return { ...r, done: !r.done };
      return r;
    });
    window.store.setState({ routine });
  }

  addRoutineItem() {
    const title = prompt("Enter Routine Title e.g. 05:00 PM - Evening Tea & Study:");
    if (!title) return;

    const newItem = {
      id: `r_${Date.now()}`,
      time: '05:00 PM',
      title,
      period: 'evening',
      done: false
    };

    window.store.setState(prev => ({ routine: [...prev.routine, newItem] }));
  }

  deleteItem(id) {
    const routine = window.store.state.routine.filter(r => r.id !== id);
    window.store.setState({ routine });
  }
}

window.routineView = new RoutineView();
