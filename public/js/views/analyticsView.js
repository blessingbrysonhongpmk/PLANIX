/**
 * PLANIX ANALYTICS VIEW
 * Productivity charts, focus time allocation, completion velocity & study metrics
 */

class AnalyticsView {
  render(state) {
    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Analytics & Focus Insights 📊</div>
            <div class="view-subtitle">Weekly completion velocity • Study time distribution • Health statistics</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px;">
          <!-- Productivity Trend Chart -->
          <div class="card" style="grid-column: span 8;">
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 16px;">📈 Weekly Focus Hours Velocity</div>
            
            <div style="height: 220px; display: flex; align-items: flex-end; justify-content: space-between; padding: 20px 10px; background: var(--bg-input); border-radius: var(--radius-md);">
              ${[
                { day: 'Mon', hours: 4.5 },
                { day: 'Tue', hours: 6.0 },
                { day: 'Wed', hours: 5.2 },
                { day: 'Thu', hours: 7.1 },
                { day: 'Fri', hours: 6.8 },
                { day: 'Sat', hours: 8.4 },
                { day: 'Sun', hours: 5.0 }
              ].map(bar => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-gold);">${bar.hours}h</div>
                  <div style="width: 28px; height: ${bar.hours * 22}px; background: var(--accent-gradient-indigo); border-radius: var(--radius-xs);"></div>
                  <div style="font-size: 11px; color: var(--text-tertiary);">${bar.day}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Time Allocation Break Down -->
          <div class="card" style="grid-column: span 4;">
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 16px;">⏱️ Focus Allocation</div>
            
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>📚 Study & Code</span> <span>45%</span>
                </div>
                <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 45%; height: 100%; background: var(--accent-indigo);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>🏋️‍♂️ Health & Fitness</span> <span>25%</span>
                </div>
                <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 25%; height: 100%; background: var(--accent-emerald);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>💼 Work & Projects</span> <span>20%</span>
                </div>
                <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 20%; height: 100%; background: var(--accent-amber);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>🧘 Personal & Reflection</span> <span>10%</span>
                </div>
                <div style="height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                  <div style="width: 10%; height: 100%; background: var(--accent-cyan);"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.analyticsView = new AnalyticsView();
