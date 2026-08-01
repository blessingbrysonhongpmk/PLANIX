/**
 * PLANIX AI SECOND BRAIN VIEW
 * Semantic memory search engine ("Where did I write about Blockchain?"), concept mapping & knowledge graph
 */

class SecondBrainView {
  constructor() {
    this.searchQuery = 'Where did I write about Blockchain?';
    this.memoryResults = [
      { id: 'm1', title: 'Blockchain Smart Contract Notes', excerpt: '...analyzed Solidity smart contracts, gas optimization techniques, and ERC20 tokens in note #14.', date: '3 days ago', relevance: '98%' },
      { id: 'm2', title: 'Web3 Architecture Study Session', excerpt: '...recorded active recall flashcards on consensus algorithms and decentralized storage.', date: '1 week ago', relevance: '91%' }
    ];
  }

  render(state) {
    return `
      <div class="animate-fade-in">
        <div class="view-header">
          <div>
            <div class="view-title">Knowledge Base & Search</div>
            <div class="view-subtitle">Search notes, tasks, and project history naturally</div>
          </div>
        </div>

        <div class="card" style="margin-bottom: 28px; border-top: 3px solid var(--accent-red);">
          <div style="font-weight: 700; font-size: 16px; color: #fff; margin-bottom: 12px;">Query Semantic Memory Graph</div>
          <div style="display: flex; gap: 12px;">
            <input type="text" id="brain-search-input" class="form-input" placeholder="Ask memory anything (e.g. 'Where did I write about Blockchain?')..." 
                   value="${this.searchQuery}">
            <button class="btn btn-indigo" onclick="window.secondBrainView.executeSearch()">Search Memory</button>
          </div>
        </div>

        <h3 style="font-family: var(--font-display); font-size: 20px; color: #fff; margin-bottom: 16px;">Memory Connections (${this.memoryResults.length})</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${this.memoryResults.map(m => `
            <div class="card animate-slide-up">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span class="badge badge-study">${m.relevance} Match</span>
                <span style="font-size: 12px; color: var(--text-tertiary);">${m.date}</span>
              </div>
              <div style="font-weight: 700; font-size: 17px; color: #fff; margin-bottom: 6px;">${m.title}</div>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${m.excerpt}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  async executeSearch() {
    const input = document.getElementById('brain-search-input');
    if (!input || !input.value.trim()) return;
    this.searchQuery = input.value.trim();

    const res = await window.apiClient.post('/ai/second-brain-search', { query: this.searchQuery });
    if (res.success && res.memoryResults) {
      this.memoryResults = res.memoryResults;
      window.store.notify();
    }
  }
}

window.secondBrainView = new SecondBrainView();
