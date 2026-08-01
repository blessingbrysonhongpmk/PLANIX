/**
 * PLANIX ASSISTANT DRAWER COMPONENT
 * Contextual productivity companion with instant action suggestions
 */

class AIDrawerComponent {
  constructor() {
    this.messages = [
      { sender: 'ai', text: '👋 Hello Alex! I am your Workspace Assistant. Ask me about your tasks, notes, habits, or schedule.' }
    ];
  }

  render(state) {
    const isOpen = state.isAiDrawerOpen;

    return `
      <div class="ai-drawer ${isOpen ? 'open' : ''}">
        <div style="padding: 20px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div>
              <div style="font-weight: 700; font-size: 15px;">Workspace Assistant</div>
              <div style="font-size: 11px; color: var(--accent-emerald);">Active • Workspace Connected</div>
            </div>
          </div>
          <button class="btn btn-icon" onclick="window.store.setState({ isAiDrawerOpen: false })">✕</button>
        </div>

        <div class="ai-chat-messages" id="ai-messages-container">
          ${this.messages.map(msg => `
            <div class="chat-bubble ${msg.sender}">
              ${msg.text.replace(/\n/g, '<br>')}
            </div>
          `).join('')}
        </div>

        <div style="padding: 12px 20px; border-top: 1px solid var(--border-subtle); display: flex; gap: 6px; overflow-x: auto;">
          <button class="badge badge-study" onclick="window.aiDrawerComponent.sendQuickPrompt('What should I do now?')">⚡ What should I focus on?</button>
          <button class="badge badge-personal" onclick="window.aiDrawerComponent.sendQuickPrompt('What did I study yesterday?')">📚 Yesterday study</button>
          <button class="badge badge-health" onclick="window.aiDrawerComponent.sendQuickPrompt('Habit streak status')">🔥 Habit status</button>
        </div>

        <div style="padding: 16px 20px; border-top: 1px solid var(--border-subtle); display: flex; gap: 10px;">
          <input type="text" id="ai-chat-input" class="form-input" placeholder="Type a message or prompt..." onkeydown="if(event.key==='Enter') window.aiDrawerComponent.sendMessage()">
          <button class="btn btn-indigo" onclick="window.aiDrawerComponent.sendMessage()">Send</button>
        </div>
      </div>
    `;
  }

  sendQuickPrompt(text) {
    const input = document.getElementById('ai-chat-input');
    if (input) input.value = text;
    this.sendMessage();
  }

  async sendMessage() {
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;

    const prompt = input.value.trim();
    input.value = '';

    this.messages.push({ sender: 'user', text: prompt });
    this.updateMessagesUI();

    const res = await window.apiClient.post('/ai/chat', { prompt });
    const reply = res.reply || "Analyzing your workspace context...";

    this.messages.push({ sender: 'ai', text: reply });
    this.updateMessagesUI();
  }

  updateMessagesUI() {
    const container = document.getElementById('ai-messages-container');
    if (!container) return;
    container.innerHTML = this.messages.map(msg => {
      let formatted = msg.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      return `
        <div class="chat-bubble ${msg.sender}">
          ${formatted}
        </div>
      `;
    }).join('');
    container.scrollTop = container.scrollHeight;
  }
}

window.aiDrawerComponent = new AIDrawerComponent();
