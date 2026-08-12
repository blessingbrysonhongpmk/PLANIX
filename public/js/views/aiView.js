/**
 * PLANIX MULTI-MODEL CHATGPT-GRADE AI WORKSPACE
 * Supports Gemini 2.0 Flash, OpenAI GPT-4o, Claude 3.5 Sonnet, DeepSeek R1, Live Web Search & FLUX Image Gen
 */

class AiView {
  constructor() {
    this.selectedModel = 'auto';
    this.enableWebSearch = false;
    this.selectedPersona = 'General ChatGPT Assistant';
    this.isListening = false;
    this.isThinking = false;
    this.includeContext = true;
    this.attachedFile = null; // { name, type, content, dataUrl }

    this.sessions = [
      {
        id: 'session_default',
        title: 'General Workspace Chat',
        timestamp: new Date().toISOString(),
        messages: [
          {
            id: 'msg_welcome',
            role: 'assistant',
            text: '👋 **Hello! I am PLANIX AI — your ChatGPT-Grade Personal Life OS Assistant.**\n\nI am equipped with multi-model AI capabilities:\n- 🚀 **OpenAI GPT-4o & Gemini 2.0 Flash** for fast multimodal reasoning\n- 🧠 **DeepSeek R1** for deep step-by-step chain-of-thought logic & math\n- 🎭 **Claude 3.5 Sonnet** for superior programming & software architecture\n- 🌐 **Live Web Search Grounding** for fresh real-time information\n- 🎨 **FLUX AI** for photorealistic visual art generation\n- ⚡ **Direct Task, Habit & Note System Actions** (*e.g., "Add task Study Machine Learning tomorrow"*)\n\nSelect your AI model above and ask me anything!',
            model: 'PLANIX Intelligence OS',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }
    ];

    this.activeSessionId = 'session_default';
  }

  getActiveSession() {
    return this.sessions.find(s => s.id === this.activeSessionId) || this.sessions[0];
  }

  switchSession(sessionId) {
    this.activeSessionId = sessionId;
    if (window.store) window.store.notify();
  }

  createNewSession() {
    const newId = `session_${Date.now()}`;
    const newSession = {
      id: newId,
      title: `Chat Session ${this.sessions.length + 1}`,
      timestamp: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          text: '🚀 **New Multi-Model AI Chat Session Started.** How can I assist you today?',
          model: 'PLANIX AI Engine',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    this.sessions.unshift(newSession);
    this.activeSessionId = newId;
    if (window.store) window.store.notify();
  }

  deleteSession(sessionId, event) {
    if (event) event.stopPropagation();
    if (this.sessions.length <= 1) {
      if (window.store) window.store.showToast('At least one chat session must remain.', 'info');
      return;
    }
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
    if (this.activeSessionId === sessionId) {
      this.activeSessionId = this.sessions[0].id;
    }
    if (window.store) window.store.notify();
  }

  clearHistory() {
    const active = this.getActiveSession();
    if (active) {
      active.messages = [
        {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          text: '🧹 Chat history cleared for this session. How can I help you next?',
          model: 'PLANIX AI Engine',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      if (window.store) window.store.notify();
    }
  }

  exportMarkdown() {
    const active = this.getActiveSession();
    if (!active) return;
    const content = active.messages.map(m => `### ${m.role === 'user' ? '👤 User' : '🤖 Assistant (' + (m.model || 'AI') + ')'}\n*${m.timestamp}*\n\n${m.text}\n\n---`).join('\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planix_chat_${active.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  selectModel(modelId) {
    this.selectedModel = modelId;
    if (modelId === 'web-search-model') {
      this.enableWebSearch = true;
    }
    if (window.store) window.store.notify();
  }

  toggleWebSearch() {
    this.enableWebSearch = !this.enableWebSearch;
    if (window.store) {
      window.store.showToast(this.enableWebSearch ? '🌐 Live Web Search Grounding Enabled' : '🌐 Web Search Disabled', 'info');
      window.store.notify();
    }
  }

  setPersona(persona) {
    this.selectedPersona = persona;
    if (window.store) {
      window.store.showToast(`🎭 AI Persona set to: ${persona}`, 'success');
      window.store.notify();
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const binaryDocTypes = ['pdf', 'docx', 'pptx', 'doc', 'ppt', 'xlsx'];
    const imageTypes = ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'];

    if (binaryDocTypes.includes(ext)) {
      // Store as binary File object — will be uploaded server-side for extraction
      this.attachedFile = {
        name: file.name,
        type: 'document',
        file: file, // raw File object for FormData upload
        size: file.size
      };
      if (window.store) {
        window.store.showToast(`📄 PDF/Document attached: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`, 'success');
        window.store.notify();
      }
    } else if (imageTypes.includes(ext) || file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedFile = {
          name: file.name,
          type: 'image',
          file: file,
          dataUrl: e.target.result
        };
        if (window.store) window.store.notify();
      };
      reader.readAsDataURL(file);
    } else {
      // Text-based files — read inline
      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedFile = {
          name: file.name,
          type: 'text',
          content: e.target.result
        };
        if (window.store) window.store.notify();
      };
      reader.readAsText(file);
    }
  }

  removeAttachedFile() {
    this.attachedFile = null;
    if (window.store) window.store.notify();
  }

  // Opens file picker filtered to document formats (PDF, DOCX)
  triggerPdfScan() {
    const input = document.getElementById('ai-file-upload-input');
    if (input) {
      input.accept = '.pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg';
      input.click();
    }
  }


  // REAL-TIME SERVER-SENT EVENTS (SSE) CHAT STREAMING CLIENT
  async sendMessage(customText) {
    const input = document.getElementById('ai-hub-input');
    const promptText = (customText || (input ? input.value : '')).trim();

    if (!promptText && !this.attachedFile) return;

    if (input) input.value = '';

    const session = this.getActiveSession();
    
    // Auto name session title after first user message
    if (session.messages.length <= 2 && promptText) {
      session.title = promptText.slice(0, 24) + (promptText.length > 24 ? '...' : '');
    }

    let userMessageText = promptText;
    if (this.attachedFile) {
      const sizeInfo = this.attachedFile.size ? ` (${(this.attachedFile.size / 1024).toFixed(0)} KB)` : '';
      userMessageText += `\n\n📎 *Attached File:* ${this.attachedFile.name}${sizeInfo}`;
    }

    session.messages.push({
      id: `user_${Date.now()}`,
      role: 'user',
      text: userMessageText,
      image: this.attachedFile?.type === 'image' ? this.attachedFile.dataUrl : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const attachedCopy = this.attachedFile;
    this.attachedFile = null;

    // Placeholder Assistant Message for SSE Streaming
    const aiMsgId = `ai_${Date.now()}`;
    const aiMessageObj = {
      id: aiMsgId,
      role: 'assistant',
      text: '',
      think: '',
      image: null,
      model: 'PLANIX AI Engine',
      actions: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };
    session.messages.push(aiMessageObj);

    if (window.store) window.store.notify();

    try {
      let response;

      if (attachedCopy && attachedCopy.type === 'document' && attachedCopy.file) {
        // DOCUMENT PATH: Upload binary file (PDF/DOCX) via FormData for server-side extraction
        const formData = new FormData();
        formData.append('file', attachedCopy.file);
        formData.append('prompt', promptText || 'Analyze this document comprehensively. Summarize key points, topics, and actionable items.');
        formData.append('model', this.selectedModel);
        formData.append('includeContext', String(this.includeContext));

        response = await fetch('/api/ai/chat-with-document', {
          method: 'POST',
          body: formData
        });
      } else {
        // STANDARD PATH: Text prompt + optional inline text/image attachment
        let finalPrompt = promptText;
        if (attachedCopy && attachedCopy.type === 'text') {
          finalPrompt += `\n\n[ATTACHED FILE CONTENT: ${attachedCopy.name}]\n${attachedCopy.content.slice(0, 3000)}`;
        }

        response = await fetch('/api/ai/stream-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: finalPrompt,
            model: this.selectedModel,
            includeContext: this.includeContext,
            options: {
              webSearch: this.enableWebSearch,
              persona: this.selectedPersona,
              image: attachedCopy?.type === 'image'
            }
          })
        });
      }

      if (!response.ok || !response.body) {
        // Try to read error body for better messages
        let errorMsg = 'SSE stream network error';
        try {
          const errBody = await response.json();
          errorMsg = errBody.error || errorMsg;
        } catch (e) { /* ignore */ }
        throw new Error(errorMsg);
      }

      // Stream SSE response chunks
      await this._readSSEStream(response, aiMsgId, aiMessageObj);

    } catch (err) {
      aiMessageObj.isStreaming = false;
      if (!aiMessageObj.text) {
        aiMessageObj.text = `⚠️ Connection notice: ${err.message}`;
      }
      this.updateStreamingMessageUI(aiMsgId, aiMessageObj);
    }

    if (window.store) window.store.notify();

    setTimeout(() => {
      const area = document.getElementById('ai-chat-scroll-area');
      if (area) area.scrollTop = area.scrollHeight;
    }, 50);
  }

  // Shared SSE stream reader for both regular chat and document chat
  async _readSSEStream(response, aiMsgId, aiMessageObj) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.chunk) {
              aiMessageObj.text += data.chunk;
            }
            if (data.think) {
              aiMessageObj.think = (aiMessageObj.think || '') + '\n' + data.think;
            }
            if (data.image) {
              aiMessageObj.image = data.image;
            }
            if (data.model) {
              aiMessageObj.model = data.model;
            }
            if (data.actions) {
              aiMessageObj.actions = data.actions;
              if (window.store) {
                window.store.fetchTasks();
                window.store.fetchNotes();
                window.store.fetchHabits();
              }
            }
            if (data.done) {
              aiMessageObj.isStreaming = false;
            }
            this.updateStreamingMessageUI(aiMsgId, aiMessageObj);
          } catch (e) {
            // Parse fallback
          }
        }
      }
    }

    aiMessageObj.isStreaming = false;
    this.updateStreamingMessageUI(aiMsgId, aiMessageObj);
  }

  updateStreamingMessageUI(msgId, msgObj) {
    const cardEl = document.getElementById(`msg-text-${msgId}`);
    if (cardEl) {
      cardEl.innerHTML = this.formatMarkdown(msgObj.text) + (msgObj.isStreaming ? '<span class="typing-cursor">▌</span>' : '');
    }
    const thinkEl = document.getElementById(`msg-think-${msgId}`);
    if (thinkEl && msgObj.think) {
      thinkEl.style.display = 'block';
      thinkEl.innerText = `🧠 Reasoning Process:\n` + msgObj.think;
    }
  }

  toggleVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      if (window.store) window.store.showToast('Voice dictation simulated in browser. Try typing!', 'info');
      const input = document.getElementById('ai-hub-input');
      if (input) input.value = "Explain Data Structures and Algorithms with code";
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (this.isListening && this.recognition) {
      this.recognition.stop();
      this.isListening = false;
      if (window.store) window.store.notify();
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.isListening = true;
    if (window.store) window.store.notify();

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      this.isListening = false;
      const input = document.getElementById('ai-hub-input');
      if (input) input.value = text;
      this.sendMessage(text);
    };

    this.recognition.onerror = () => {
      this.isListening = false;
      if (window.store) window.store.notify();
    };
  }

  speakMessage(text) {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/```[\s\S]*?```/g, 'Code snippet omitted.').replace(/[*#>`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  copyCodeSnippet(id) {
    const codeEl = document.getElementById(id);
    if (!codeEl) return;
    const text = codeEl.innerText || codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      if (window.store) window.store.showToast('📋 Code copied to clipboard!', 'success');
    });
  }

  runCodeSnippet(id) {
    const codeEl = document.getElementById(id);
    if (!codeEl) return;
    const codeText = codeEl.innerText || codeEl.textContent;

    let modal = document.getElementById('code-runner-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'code-runner-modal';
      modal.className = 'code-runner-modal-backdrop';
      document.body.appendChild(modal);
    }

    const isHtml = /<[a-z][\s\S]*>/i.test(codeText) || codeText.toLowerCase().includes('<!doctype html>');

    modal.innerHTML = `
      <div class="code-runner-modal-content">
        <div class="code-runner-modal-header">
          <span>⚡ Live Code Execution Sandbox</span>
          <button class="code-runner-close" onclick="document.getElementById('code-runner-modal').remove()">✕</button>
        </div>
        <div class="code-runner-body">
          ${isHtml ? `
            <iframe id="code-runner-frame" style="width:100%; height:400px; border:none; background:#FFF; border-radius:8px;"></iframe>
          ` : `
            <div id="code-runner-output" style="padding:16px; background:#0D0D14; color:#34D399; font-family:monospace; font-size:13px; border-radius:8px; min-height:220px; white-space:pre-wrap; overflow-y:auto;">Executing script...\n</div>
          `}
        </div>
      </div>
    `;

    setTimeout(() => {
      if (isHtml) {
        const frame = document.getElementById('code-runner-frame');
        if (frame) {
          frame.contentWindow.document.open();
          frame.contentWindow.document.write(codeText);
          frame.contentWindow.document.close();
        }
      } else {
        const out = document.getElementById('code-runner-output');
        try {
          let logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
            error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
            warn: (...args) => logs.push('[WARN] ' + args.join(' '))
          };
          const runFn = new Function('console', codeText);
          const result = runFn(customConsole);
          if (logs.length === 0 && result !== undefined) {
            logs.push(`Output: ${JSON.stringify(result)}`);
          }
          if (out) out.textContent = logs.join('\n') || 'Program executed cleanly with 0 console logs.';
        } catch (err) {
          if (out) out.textContent = `❌ Execution Error:\n${err.message}`;
        }
      }
    }, 100);
  }

  formatMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks with syntax header, copy button & run button!
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
      const language = (lang || 'code').toLowerCase();
      const codeId = 'code_' + Math.random().toString(36).slice(2, 9);
      const isRunnable = ['javascript', 'js', 'html', 'css'].includes(language);

      return `
        <div class="code-block-container">
          <div class="code-block-bar">
            <span class="code-lang-tag">⚡ ${language.toUpperCase()}</span>
            <div style="display:flex; gap:6px;">
              ${isRunnable ? `<button class="code-run-btn" onclick="window.aiView.runCodeSnippet('${codeId}')">▶️ Run Preview</button>` : ''}
              <button class="code-copy-btn" onclick="window.aiView.copyCodeSnippet('${codeId}')">📋 Copy Code</button>
            </div>
          </div>
          <pre class="code-pre"><code id="${codeId}" class="code-content">${code.trim()}</code></pre>
        </div>
      `;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="chat-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="chat-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="chat-h1">$1</h1>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^>\s?(.*$)/gim, '<blockquote class="chat-quote">$1</blockquote>');

    // Bullet points & line breaks
    html = html.replace(/^\s*[-*+]\s+(.*$)/gim, '<li class="chat-bullet">$1</li>');
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  render(state) {
    const activeSession = this.getActiveSession();
    const models = [
      { id: 'auto', name: '🤖 Auto-Select', badge: 'Smart' },
      { id: 'gemini-2-flash', name: '⚡ Gemini 2.0 Flash', badge: 'Google AI' },
      { id: 'gpt-4o', name: '🚀 GPT-4o', badge: 'OpenAI' },
      { id: 'claude-3-5-sonnet', name: '🎭 Claude 3.5', badge: 'Anthropic' },
      { id: 'deepseek-r1', name: '🧠 DeepSeek R1', badge: 'Reasoning' },
      { id: 'openrouter-auto', name: '🌌 OpenRouter', badge: 'Multi-LLM' },
      { id: 'web-search-model', name: '🌐 Live Web Search', badge: 'Realtime' },
      { id: 'image-gen', name: '🎨 FLUX Image Gen', badge: 'Visual' },
      { id: 'fast-local', name: '🛡️ Local Engine', badge: 'Offline' }
    ];

    const personas = [
      'General ChatGPT Assistant',
      'Senior Software Engineer',
      'Academic Tutor & Researcher',
      'Productivity & Habits Coach',
      'Creative Writer & Designer'
    ];

    return `
      <style>
        .ai-workspace-layout {
          display: flex;
          height: calc(100vh - 64px);
          width: 100%;
          background: #09090C;
          color: #E2E8F0;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', var(--font-body);
        }

        .ai-sessions-sidebar {
          width: 280px;
          background: #0E0E14;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 16px;
          flex-shrink: 0;
        }

        .ai-new-chat-btn {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 14px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(229, 9, 20, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .ai-new-chat-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(229, 9, 20, 0.45);
        }

        .ai-sessions-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ai-session-item {
          padding: 10px 14px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          cursor: pointer;
          color: #A0AEC0;
          transition: all 0.2s;
        }

        .ai-session-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #E2E8F0;
        }

        .ai-session-item.active {
          background: rgba(229, 9, 20, 0.12);
          border-color: rgba(229, 9, 20, 0.3);
          color: #FFF;
          font-weight: 600;
        }

        .ai-chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #09090C;
          position: relative;
        }

        .ai-chat-header {
          padding: 14px 24px;
          background: #0E0E14;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ai-model-pills {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: none;
        }

        .ai-model-pill {
          padding: 6px 12px;
          border-radius: 20px;
          background: #161620;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #A0AEC0;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .ai-model-pill:hover {
          border-color: rgba(229, 9, 20, 0.4);
          color: #FFF;
        }

        .ai-model-pill.active {
          background: rgba(229, 9, 20, 0.18);
          border-color: #E50914;
          color: #FFF;
          box-shadow: 0 0 12px rgba(229, 9, 20, 0.25);
        }

        .ai-chat-messages-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chat-bubble-row {
          display: flex;
          gap: 14px;
          max-width: 88%;
        }

        .chat-bubble-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .chat-bubble-row.assistant {
          align-self: flex-start;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
        }

        .chat-avatar.user {
          background: linear-gradient(135deg, #4F46E5, #3B82F6);
          color: #FFF;
        }

        .chat-avatar.assistant {
          background: linear-gradient(135deg, #E50914, #B91C2D);
          color: #FFF;
          box-shadow: 0 0 10px rgba(229, 9, 20, 0.4);
        }

        .chat-msg-card {
          padding: 16px 20px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.6;
          word-break: break-word;
          position: relative;
        }

        .chat-bubble-row.user .chat-msg-card {
          background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%);
          color: #FFFFFF;
          border-top-right-radius: 4px;
          box-shadow: 0 4px 14px rgba(229, 9, 20, 0.25);
        }

        .chat-bubble-row.assistant .chat-msg-card {
          background: #14141E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          border-top-left-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .chat-think-box {
          margin-bottom: 10px;
          padding: 10px 14px;
          background: rgba(147, 51, 234, 0.12);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 8px;
          color: #C084FC;
          font-size: 12px;
          font-family: monospace;
          white-space: pre-wrap;
        }

        .chat-msg-footer {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          opacity: 0.7;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 8px;
        }

        /* Code syntax container */
        .code-block-container {
          margin: 12px 0;
          background: #0A0A10;
          border: 1px solid #27273A;
          border-radius: 10px;
          overflow: hidden;
        }

        .code-block-bar {
          background: #12121D;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #27273A;
        }

        .code-lang-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #E50914;
          font-weight: 700;
        }

        .code-copy-btn, .code-run-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFF;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .code-run-btn {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
          color: #34D399;
        }

        .code-copy-btn:hover { background: rgba(229, 9, 20, 0.3); }
        .code-run-btn:hover { background: rgba(16, 185, 129, 0.4); }

        .code-pre {
          padding: 14px;
          margin: 0;
          overflow-x: auto;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.5;
          color: #F8FAFC;
        }

        .inline-code {
          background: rgba(229, 9, 20, 0.15);
          color: #FF6B6B;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 13px;
        }

        .chat-h3 { font-size: 16px; font-weight: 700; color: #FFF; margin: 12px 0 6px 0; }
        .chat-h2 { font-size: 18px; font-weight: 800; color: #FFF; margin: 14px 0 8px 0; }
        .chat-quote { border-left: 3px solid #E50914; padding-left: 12px; margin: 10px 0; color: #CBD5E1; font-style: italic; }
        .chat-bullet { margin-left: 18px; list-style-type: disc; }

        .typing-cursor {
          display: inline-block;
          width: 8px;
          color: #E50914;
          animation: blink 0.8s infinite;
          font-weight: 900;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Code Runner Modal Backdrop */
        .code-runner-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .code-runner-modal-content {
          width: 100%;
          max-width: 800px;
          background: #14141E;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .code-runner-modal-header {
          padding: 14px 20px;
          background: #0E0E14;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          color: #FFF;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .code-runner-close {
          background: none; border: none; color: #A0AEC0; font-size: 18px; cursor: pointer;
        }

        .code-runner-body { padding: 16px; }

        /* Input Controls */
        .ai-chat-input-wrapper {
          padding: 16px 24px;
          background: #0E0E14;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ai-input-bar {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          background: #14141E;
          border: 1px solid #27273A;
          border-radius: 18px;
          padding: 8px 12px 8px 16px;
          transition: border-color 0.2s;
        }

        .ai-input-bar:focus-within {
          border-color: #E50914;
          box-shadow: 0 0 14px rgba(229, 9, 20, 0.25);
        }

        .ai-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFF;
          font-size: 14px;
          line-height: 1.5;
          max-height: 120px;
          resize: none;
          font-family: inherit;
        }

        .ai-btn-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: none;
          color: #A0AEC0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .ai-btn-icon:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFF;
        }

        .ai-btn-icon.active {
          background: #E50914;
          color: #FFF;
        }

        .ai-send-submit-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E50914 0%, #B91C2D 100%);
          border: none;
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(229, 9, 20, 0.35);
          transition: transform 0.2s;
        }

        .ai-send-submit-btn:hover { transform: scale(1.05); }

        .attachment-preview-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid rgba(229, 9, 20, 0.3);
          border-radius: 12px;
          font-size: 12px;
          color: #FFF;
        }

        @media (max-width: 1023px) {
          .ai-workspace-layout {
            height: calc(100dvh - 148px);
            height: calc(100vh - 148px);
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
            overflow: hidden;
          }
          .ai-sessions-sidebar { display: none; }
          .ai-chat-header {
            padding: 10px 12px;
            gap: 8px;
            flex-direction: column;
            align-items: flex-start;
          }
          .ai-model-pills {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
          }
          .ai-chat-messages-scroll {
            padding: 12px;
            gap: 12px;
          }
          .chat-bubble-row {
            max-width: 100%;
          }
          .chat-msg-card {
            padding: 12px 14px;
            font-size: 13px;
            max-width: 100%;
            word-break: break-word;
            overflow-wrap: anywhere;
          }
          .ai-chat-input-wrapper {
            padding: 8px 10px;
          }
          .ai-input-bar {
            padding: 6px 10px;
            gap: 6px;
          }
          .code-runner-modal-content {
            width: 95vw;
            max-width: 100%;
          }
        }
      </style>

      <div class="ai-workspace-layout animate-fade-in">
        <!-- Sessions Sidebar -->
        <div class="ai-sessions-sidebar">
          <button class="ai-new-chat-btn" onclick="window.aiView.createNewSession()">
            <span>➕</span> New AI Chat Thread
          </button>

          <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Persona Settings</div>

          <select onchange="window.aiView.setPersona(this.value)" style="background:#161620; border:1px solid rgba(255,255,255,0.1); color:#FFF; padding:8px 12px; border-radius:10px; font-size:12px;">
            ${personas.map(p => `<option value="${p}" ${p === this.selectedPersona ? 'selected' : ''}>${p}</option>`).join('')}
          </select>

          <div style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Chat History</div>

          <div class="ai-sessions-list">
            ${this.sessions.map(s => `
              <div class="ai-session-item ${s.id === this.activeSessionId ? 'active' : ''}" onclick="window.aiView.switchSession('${s.id}')">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">💬 ${s.title}</span>
                ${this.sessions.length > 1 ? `<button onclick="window.aiView.deleteSession('${s.id}', event)" style="background:none; border:none; color:#64748B; cursor:pointer;" title="Delete Thread">✕</button>` : ''}
              </div>
            `).join('')}
          </div>

          <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; gap: 8px;">
            <button onclick="window.aiView.exportMarkdown()" class="btn btn-secondary" style="width:100%; font-size:12px; padding:8px;">📥 Export Chat (Markdown)</button>
            <button onclick="window.aiView.clearHistory()" class="btn btn-secondary" style="width:100%; font-size:12px; padding:8px; color:#EF4444;">🧹 Clear Session</button>
          </div>
        </div>

        <!-- Central Chat Interface -->
        <div class="ai-chat-main">
          <!-- Header Bar -->
          <div class="ai-chat-header">
            <div style="display:flex; align-items:center; gap:14px;">
              <div>
                <div style="font-weight: 800; font-size: 16px; color: #FFF; display: flex; align-items: center; gap: 8px;">
                  🤖 PLANIX Multi-Model AI Engine
                </div>
                <div style="font-size: 11px; color: #94A3B8;">ChatGPT-Grade Intelligence • Gemini 2.0 • GPT-4o • Claude 3.5 • DeepSeek R1</div>
              </div>

              <!-- Web Search Grounding Toggle -->
              <button class="ai-model-pill ${this.enableWebSearch ? 'active' : ''}" onclick="window.aiView.toggleWebSearch()" title="Toggle Real-Time Web Search Grounding">
                🌐 Live Web Search: ${this.enableWebSearch ? 'ON' : 'OFF'}
              </button>
            </div>

            <!-- Model Switcher Pills -->
            <div class="ai-model-pills">
              ${models.map(m => `
                <button class="ai-model-pill ${m.id === this.selectedModel ? 'active' : ''}" onclick="window.aiView.selectModel('${m.id}')">
                  ${m.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Chat Scroll Feed -->
          <div class="ai-chat-messages-scroll" id="ai-chat-scroll-area">
            ${activeSession.messages.map(msg => `
              <div class="chat-bubble-row ${msg.role}">
                <div class="chat-avatar ${msg.role}">
                  ${msg.role === 'user' ? '👤' : '🤖'}
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px; max-width: 100%;">
                  ${msg.image ? `<img src="${msg.image}" style="max-width: 100%; max-height: 340px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px;">` : ''}

                  <!-- Reasoning Box if present -->
                  <div class="chat-think-box" id="msg-think-${msg.id}" style="${msg.think ? 'display:block;' : 'display:none;'}">
                    🧠 <strong>Reasoning Process:</strong>\n${msg.think || ''}
                  </div>

                  <div class="chat-msg-card">
                    <div id="msg-text-${msg.id}">
                      ${this.formatMarkdown(msg.text)}
                      ${msg.isStreaming ? '<span class="typing-cursor">▌</span>' : ''}
                    </div>

                    ${msg.actions && msg.actions.length > 0 ? msg.actions.map(act => `
                      <div class="ai-action-card">
                        <span>⚡ <strong>System Action Executed:</strong> Created ${act.type.replace('CREATE_', '').toLowerCase()} "${act.payload.text || act.payload.title}"</span>
                        <span style="font-size:11px; text-decoration:underline; cursor:pointer;" onclick="window.store.notify()">View in App</span>
                      </div>
                    `).join('') : ''}

                    <div class="chat-msg-footer">
                      <span>${msg.model || 'PLANIX AI'} • ${msg.timestamp}</span>
                      ${msg.role === 'assistant' ? `
                        <button onclick="window.aiView.speakMessage(\`${msg.text.replace(/`/g, '\\`').replace(/"/g, '&quot;')}\`)" style="background:none; border:none; color:inherit; cursor:pointer;" title="Read Aloud">🔊 Listen</button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Attachment Badge if present -->
          ${this.attachedFile ? `
            <div style="padding: 6px 24px; background: #0E0E14;">
              <div class="attachment-preview-badge">
                <span>${this.attachedFile.type === 'document' ? '📄' : this.attachedFile.type === 'image' ? '🖼️' : '📎'} ${this.attachedFile.type === 'document' ? 'Document' : 'File'}: ${this.attachedFile.name}${this.attachedFile.size ? ` (${(this.attachedFile.size / 1024).toFixed(0)} KB)` : ''}</span>
                <button onclick="window.aiView.removeAttachedFile()" style="background:none; border:none; color:#FFF; cursor:pointer;">✕</button>
              </div>
            </div>
          ` : ''}

          <!-- Quick Suggestion Chips -->
          <div style="padding: 8px 24px; background: #0E0E14; display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;">
            <button class="ai-model-pill" onclick="window.aiView.triggerPdfScan()" title="Attach a PDF or document for AI scanning">📄 Scan PDF / Document</button>
            <button class="ai-model-pill" onclick="window.aiView.sendMessage('Scan and collect data from https://en.wikipedia.org/wiki/Artificial_intelligence')">🌐 Web Data Scanner</button>
            <button class="ai-model-pill" onclick="window.aiView.sendMessage('Write a Python script for binary search tree with comments')">💻 Python DSA Code</button>
            <button class="ai-model-pill" onclick="window.aiView.sendMessage('Add task Finish Machine Learning Assignment tomorrow at 5pm')">⚡ Create Task</button>
            <button class="ai-model-pill" onclick="window.aiView.sendMessage('Generate a 4-step exam revision timetable for finals')">📚 Exam Schedule</button>
            <button class="ai-model-pill" onclick="window.aiView.sendMessage('Draw a visual diagram of neural network architecture')">🎨 Generate Image</button>
          </div>

          <!-- Input Controls -->
          <div class="ai-chat-input-wrapper">
            <div class="ai-input-bar">
              <!-- File Attachment Button -->
              <input type="file" id="ai-file-upload-input" style="display:none;" accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg,.txt,.md,.csv,.json,.js,.py,.html,.css" onchange="window.aiView.handleFileSelect(event)">
              <button class="ai-btn-icon" onclick="document.getElementById('ai-file-upload-input').click()" title="Attach Document / Photo for OCR Vision">
                📎
              </button>

              <!-- Mic Dictation Button -->
              <button class="ai-btn-icon ${this.isListening ? 'active' : ''}" onclick="window.aiView.toggleVoice()" title="Voice Dictation">
                🎤
              </button>

              <!-- Textarea -->
              <textarea class="ai-textarea" id="ai-hub-input" placeholder="Ask PLANIX AI anything or give command e.g. 'Add task study DSA'..." rows="1" onkeydown="if(event.key==='Enter' && !event.shiftKey) { event.preventDefault(); window.aiView.sendMessage(); }"></textarea>

              <!-- Submit Button -->
              <button class="ai-send-submit-btn" onclick="window.aiView.sendMessage()" title="Send Prompt">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <script>
        setTimeout(() => {
          const area = document.getElementById('ai-chat-scroll-area');
          if (area) area.scrollTop = area.scrollHeight;
        }, 50);
      </script>
    `;
  }
}

window.aiView = new AiView();
