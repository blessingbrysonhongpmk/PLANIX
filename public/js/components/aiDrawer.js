/**
 * PLANIX SMART ASSISTANT DRAWER COMPONENT
 * Easy Simple English AI Assistant & Quick Voice/Text Action Parser
 */

class AIDrawerComponent {
  constructor() {
    this.messages = [
      { sender: 'ai', text: '👋 Hello! I am your PLANIX AI Assistant.\n\nAsk me anything in simple English! I can create tasks, suggest habits, or help you plan your study schedule.' }
    ];
    this.isListening = false;
  }

  render(state) {
    const isOpen = state.isAiDrawerOpen;

    return `
      <div class="ai-drawer ${isOpen ? 'open' : ''}">
        <!-- Header -->
        <div style="padding: 20px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; background: #141417;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, #E50914, #B91C2D); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">🤖</div>
            <div>
              <div style="font-weight: 700; font-size: 15px; color: white;">AI Assistant</div>
              <div style="font-size: 11px; color: var(--color-success); font-weight: 500;">● Online • Voice Ready</div>
            </div>
          </div>
          <button class="btn btn-icon" onclick="window.store.setState({ isAiDrawerOpen: false })" style="color: #AAA;">✕</button>
        </div>

        <!-- Chat Messages -->
        <div class="ai-chat-messages" id="ai-messages-container" style="padding: 16px; flex: 1; overflow-y: auto;">
          ${this.messages.map(msg => `
            <div class="chat-bubble ${msg.sender}" style="margin-bottom: 12px; padding: 12px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; ${msg.sender === 'user' ? 'background: #E50914; color: white; margin-left: 20%; border-bottom-right-radius: 2px;' : 'background: #1C1C21; color: #EEE; margin-right: 15%; border-bottom-left-radius: 2px; border: 1px solid #27272A;'}">
              ${msg.text.replace(/\n/g, '<br>')}
            </div>
          `).join('')}
        </div>

        <!-- Quick Suggestion Chips -->
        <div style="padding: 10px 16px; border-top: 1px solid var(--border-subtle); background: #0F0F12; display: flex; gap: 8px; overflow-x: auto; white-space: nowrap;">
          <button class="badge" style="background: rgba(229, 9, 20, 0.15); color: #FF4D4D; border: 1px solid rgba(229, 9, 20, 0.3); padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer;" onclick="window.aiDrawerComponent.sendQuickPrompt('What are my main tasks today?')">⚡ Today's Tasks</button>
          <button class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer;" onclick="window.aiDrawerComponent.sendQuickPrompt('Give me a daily motivation quote')">✨ Motivation</button>
          <button class="badge" style="background: rgba(245, 183, 0, 0.15); color: #F5B700; border: 1px solid rgba(245, 183, 0, 0.3); padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer;" onclick="window.aiDrawerComponent.sendQuickPrompt('Help me make a simple study plan')">📚 Study Plan</button>
        </div>

        <!-- Input Box & Mic -->
        <div style="padding: 16px; border-top: 1px solid var(--border-subtle); background: #141417; display: flex; gap: 8px; align-items: center;">
          <button id="mic-btn" class="btn btn-secondary btn-icon" onclick="window.aiDrawerComponent.toggleVoiceInput()" title="Voice Dictation" style="background: #24242A; border-color: #3F3F46; color: white;">
            🎤
          </button>
          <input type="text" id="ai-chat-input" class="form-input" placeholder="Type task e.g. 'Study math tomorrow' or ask..." style="flex: 1; background: #1C1C21; border-color: #3F3F46; color: white; border-radius: 8px; padding: 10px;" onkeydown="if(event.key==='Enter') window.aiDrawerComponent.sendMessage()">
          <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 600; cursor: pointer;" onclick="window.aiDrawerComponent.sendMessage()">Send</button>
        </div>
      </div>
    `;
  }

  toggleVoiceInput() {
    const micBtn = document.getElementById('mic-btn');
    const input = document.getElementById('ai-chat-input');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is simulated for this browser. Try typing e.g. 'Study at 5pm'");
      if (input) input.value = "Study science for 45 minutes";
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';

    if (this.isListening) {
      recognition.stop();
      this.isListening = false;
      if (micBtn) micBtn.style.background = '#24242A';
    } else {
      this.isListening = true;
      if (micBtn) micBtn.style.background = '#E50914';
      recognition.start();

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (input) input.value = text;
        this.isListening = false;
        if (micBtn) micBtn.style.background = '#24242A';
      };

      recognition.onerror = () => {
        this.isListening = false;
        if (micBtn) micBtn.style.background = '#24242A';
      };
    }
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

    // Check if user is asking to add task automatically
    const lower = prompt.toLowerCase();
    if (lower.startsWith('add task') || lower.startsWith('remind me') || lower.startsWith('study ')) {
      const taskText = prompt.replace(/^add task/i, '').replace(/^remind me to/i, '').trim();
      const newTask = {
        id: `t_${Date.now()}`,
        text: taskText || prompt,
        completed: false,
        priority: 'high',
        category: 'study',
        createdAt: new Date().toISOString()
      };

      window.store.setState(prev => ({ tasks: [newTask, ...prev.tasks] }));
      await window.apiClient.post('/tasks', newTask);

      this.messages.push({
        sender: 'ai',
        text: `✅ **Task Created!**\n\n"${newTask.text}" has been added to your Task list!`
      });
      this.updateMessagesUI();
      return;
    }

    // Call AI Backend API
    const res = await window.apiClient.post('/ai/chat', { prompt });
    let reply = res.reply;

    if (!reply || res.offline) {
      if (lower.includes('motivation') || lower.includes('quote')) {
        reply = "✨ **Daily Motivation**:\n\n\"Hard work always brings success! Keep going step by step today.\" 💪";
      } else if (lower.includes('routine') || lower.includes('plan')) {
        reply = "📚 **Simple Daily Schedule**:\n1. 🌅 Morning (07:00 AM): 30 mins study + Exercise\n2. ☀️ Afternoon (02:00 PM): Practice problems & notes\n3. 🌙 Evening (08:00 PM): 15 mins review & plan for tomorrow!";
      } else {
        reply = `👍 You have ${window.store.state.tasks.filter(t=>!t.completed).length} pending tasks today. Focus on one task at a time for best results!`;
      }
    }

    this.messages.push({ sender: 'ai', text: reply });
    this.updateMessagesUI();
  }

  updateMessagesUI() {
    const container = document.getElementById('ai-messages-container');
    if (!container) return;
    container.innerHTML = this.messages.map(msg => `
      <div class="chat-bubble ${msg.sender}" style="margin-bottom: 12px; padding: 12px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; ${msg.sender === 'user' ? 'background: #E50914; color: white; margin-left: 20%; border-bottom-right-radius: 2px;' : 'background: #1C1C21; color: #EEE; margin-right: 15%; border-bottom-left-radius: 2px; border: 1px solid #27272A;'}">
        ${msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }
}

window.aiDrawerComponent = new AIDrawerComponent();
