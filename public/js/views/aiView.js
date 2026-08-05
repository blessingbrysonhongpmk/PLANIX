/**
 * PLANIX V5 DEDICATED AI VIEW
 * Premium Native Mobile Chat Interface for AI Assistant
 */

class AiView {
  constructor() {
    this.chatHistory = [
      { role: 'assistant', text: 'Hello! I am your PLANIX AI Assistant. How can I help you optimize your studies today?' }
    ];
  }

  sendMessage(text) {
    if (!text || !text.trim()) return;
    this.chatHistory.push({ role: 'user', text: text.trim() });
    window.store.notify();
    
    // Simulate AI typing delay
    setTimeout(() => {
      this.chatHistory.push({ role: 'assistant', text: 'I am analyzing your request. Since I am in offline simulation mode, I am providing a placeholder response. I can help generate tasks, summarize PDFs, or structure your timetable.' });
      window.store.notify();
    }, 1000);
  }

  render(state) {
    return `
      <style>
        .ai-hub-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 56px - 64px - env(safe-area-inset-bottom, 0px)); /* screen - header - nav */
          width: 100%;
          background: #0B0B0F;
          position: relative;
        }
        .ai-chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 20px;
        }
        .ai-message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }
        .ai-message.assistant {
          background: #1A1A22;
          color: #E2E2E2;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          border: 1px solid #2A2A32;
        }
        .ai-message.user {
          background: linear-gradient(135deg, #FF2D2D, #B91C2D);
          color: #FFF;
          border-bottom-right-radius: 4px;
          align-self: flex-end;
          box-shadow: 0 4px 12px rgba(229,9,20,0.3);
        }
        .ai-input-area {
          padding: 12px 16px 16px 16px;
          background: rgba(18, 18, 23, 0.95);
          border-top: 1px solid #22222A;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }
        .ai-text-input {
          flex: 1;
          background: #121217;
          border: 1px solid #2A2A32;
          border-radius: 20px;
          padding: 12px 16px;
          color: #FFF;
          font-size: 14px;
          outline: none;
          max-height: 120px;
          overflow-y: auto;
          resize: none;
          font-family: inherit;
        }
        .ai-text-input:focus {
          border-color: #E50914;
        }
        .ai-send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #E50914;
          color: #FFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .ai-send-btn:active {
          transform: scale(0.9);
        }
        .ai-suggestions {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 16px 12px 16px;
          scrollbar-width: none;
        }
        .ai-suggestions::-webkit-scrollbar { display: none; }
        .ai-suggestion-chip {
          background: #1A1A22;
          border: 1px solid #2A2A32;
          padding: 8px 14px;
          border-radius: 16px;
          color: #A3A3A3;
          font-size: 12px;
          white-space: nowrap;
          cursor: pointer;
        }
      </style>
      
      <div class="ai-hub-container animate-fade-in">
        
        <div class="ai-chat-area" id="ai-chat-scroll-area">
          ${this.chatHistory.map(msg => `
            <div class="ai-message ${msg.role}">
              ${msg.text}
            </div>
          `).join('')}
        </div>

        <div class="ai-suggestions">
          <button class="ai-suggestion-chip" onclick="window.aiView.sendMessage('Summarize my next class')">Summarize next class</button>
          <button class="ai-suggestion-chip" onclick="window.aiView.sendMessage('Generate a study plan for Exams')">Generate study plan</button>
          <button class="ai-suggestion-chip" onclick="window.aiView.sendMessage('Explain Data Structures')">Explain Data Structures</button>
        </div>

        <div class="ai-input-area">
          <button style="width:40px; height:40px; border-radius:50%; background:#1A1A22; border:none; color:#8E8E9E; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            🎤
          </button>
          <textarea class="ai-text-input" id="ai-hub-input" placeholder="Ask PLANIX AI..." rows="1"></textarea>
          <button class="ai-send-btn" onclick="const input = document.getElementById('ai-hub-input'); window.aiView.sendMessage(input.value); input.value = '';">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      <script>
        // Auto scroll to bottom
        setTimeout(() => {
          const area = document.getElementById('ai-chat-scroll-area');
          if (area) area.scrollTop = area.scrollHeight;
        }, 50);
      </script>
    `;
  }
}

window.aiView = new AiView();
