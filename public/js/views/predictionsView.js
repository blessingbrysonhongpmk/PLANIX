/**
 * PLANIX LIFE PATTERNS VIEW
 * Statistical pattern recognition cards, peak focus windows & habit gap warnings
 */

class PredictionsView {
  render(state) {
    const predictions = state.predictions || [];

    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Performance Trends & Insights</div>
            <div class="view-subtitle">Focus patterns, productivity velocity, and burnout prevention</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
          ${predictions.map(p => `
            <div class="card animate-slide-up" style="border-left: 4px solid ${p.type === 'warning' ? 'var(--accent-rose)' : 'var(--accent-gold)'};">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 24px;">${p.icon}</span>
                <span class="badge ${p.type === 'warning' ? 'badge-urgent' : 'badge-study'}">${p.badge}</span>
              </div>
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">${p.title}</div>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">${p.description}</p>
              <div style="font-size: 11px; color: var(--accent-emerald); font-weight: 600;">
                Confidence Metric: ${Math.round((p.confidence || 0.95) * 100)}% High Reliability
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

window.predictionsView = new PredictionsView();
