/**
 * PLANIX LANDING PAGE VIEW (VISION 3.0)
 * Flagship 9-Section Product Showcase with Hero Bulb Canvas, Interactive Demos & Life GPS Preview
 */

class LandingView {
  constructor() {
    this.activeDemoTab = 'routine';
  }

  render(state) {
    setTimeout(() => window.heroBulbCanvas.init('hero-bulb-canvas'), 50);

    return `
      <div class="landing-wrapper animate-fade-in">
        <!-- Global Cursor Glow Backdrop -->
        <div id="cursor-glow"></div>

        <!-- Section 1: Hero Section -->
        <section class="landing-hero">
          <div class="hero-bulb-container">
            <canvas id="hero-bulb-canvas" class="hero-bulb-canvas"></canvas>
          </div>

          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-red); margin-bottom: 20px; background: rgba(229, 9, 20, 0.1); padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid rgba(229, 9, 20, 0.25); display: inline-block;">
            Productivity System
          </div>

          <h1 class="hero-title-huge" style="font-weight: 900; letter-spacing: 0.02em;">
            <span style="color: #FFFFFF;">PLAN</span><span style="color: var(--accent-red); text-shadow: 0 0 30px rgba(229, 9, 20, 0.7);">IX</span>
          </h1>
          
          <p class="hero-tagline">
            "The Calm Personal Operating System"
          </p>

          <div class="hero-cta-group">
            <button class="btn btn-hero" onclick="window.store.setState({ currentView: 'dashboard' })">
              <span>Open Workspace</span>
            </button>
            <button class="btn btn-hero-outline" onclick="document.getElementById('sec-demo').scrollIntoView({ behavior: 'smooth' })">
              <span>Explore Features</span>
            </button>
          </div>
        </section>

        <!-- Section 2: Why PLANIX? (Animated Feature Cards) -->
        <section style="padding: 100px 32px; max-width: 1300px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 60px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--accent-red); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">CRAFTED EXPERIENCE</div>
            <h2 style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: #fff;">Designed for High-Performance Focus</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <div class="card" style="border-top: 3px solid var(--accent-red);">
              <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #fff;">Knowledge Base & Memory</h3>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">Search concepts, active tasks, and project history naturally.</p>
            </div>

            <div class="card" style="border-top: 3px solid var(--accent-gold);">
              <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #fff;">Goal Roadmap & Trajectory</h3>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">Converts high-level goals into structured 3-phase execution plans.</p>
            </div>

            <div class="card" style="border-top: 3px solid var(--accent-orange);">
              <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #fff;">Performance Forecast</h3>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">Identifies focus velocity peaks and optimizes weekly schedules.</p>
            </div>

            <div class="card" style="border-top: 3px solid var(--accent-emerald);">
              <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #fff;">Zero-Friction Workflow</h3>
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">Instant keyboard shortcuts, command palette, and clear navigation.</p>
            </div>
          </div>
        </section>

        <!-- Section 3: Interactive Demo -->
        <section id="sec-demo" style="padding: 90px 32px; background: rgba(14, 17, 28, 0.6); border-y: 1px solid var(--border-subtle);">
          <div style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="font-family: var(--font-display); font-size: 34px; font-weight: 800; color: #fff;">Interactive Product Preview</h2>
              <p style="color: var(--text-secondary); font-size: 15px; margin-top: 6px;">Click through core engines in real-time</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 30px; flex-wrap: wrap;">
              <button class="btn ${this.activeDemoTab === 'routine' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.landingView.setDemoTab('routine')">🔄 Routine Engine</button>
              <button class="btn ${this.activeDemoTab === 'notes' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.landingView.setDemoTab('notes')">📝 Smart Notes</button>
              <button class="btn ${this.activeDemoTab === 'journal' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.landingView.setDemoTab('journal')">📖 Emotion Journal</button>
              <button class="btn ${this.activeDemoTab === 'study' ? 'btn-indigo' : 'btn-secondary'}" onclick="window.landingView.setDemoTab('study')">🎓 Study Hub</button>
            </div>

            <div class="card" style="min-height: 280px; display: flex; flex-direction: column; justify-content: center;">
              ${this.renderDemoContent()}
            </div>
          </div>
        </section>

        <!-- Section 4: Future Prediction Engine -->
        <section style="padding: 90px 32px; max-width: 1200px; margin: 0 auto;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 8px;">PREDICTIVE INTELLIGENCE</div>
              <h2 style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 16px;">AI Tomorrow Prediction Engine</h2>
              <p style="color: var(--text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
                Planix analyzes your daily focus hours, habit check-ins, and study schedules to forecast tomorrow's performance and suggest pre-emptive adjustments.
              </p>
              <button class="btn btn-primary" onclick="window.store.setState({ currentView: 'predictions' })">View Predictions</button>
            </div>

            <div class="card" style="background: linear-gradient(135deg, rgba(255, 42, 95, 0.15) 0%, rgba(255, 184, 0, 0.1) 100%); border-color: rgba(255, 184, 0, 0.3);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <span style="font-weight: 700; font-size: 16px; color: #fff;">Tomorrow Forecast</span>
                <span class="badge badge-urgent">94% Accuracy</span>
              </div>
              <div style="font-size: 24px; font-weight: 800; color: var(--accent-gold); margin-bottom: 6px;">Peak Focus: 7:00 PM – 9:30 PM</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Recommendation: Move heavy algorithm coding session to evening.</div>
            </div>
          </div>
        </section>

        <!-- Section 5: AI Second Brain Memory Search -->
        <section style="padding: 80px 32px; background: rgba(14, 17, 28, 0.6);">
          <div style="max-width: 900px; margin: 0 auto; text-align: center;">
            <h2 style="font-family: var(--font-display); font-size: 34px; font-weight: 800; color: #fff; margin-bottom: 14px;">AI Second Brain</h2>
            <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 28px;">Search anything naturally. E.g., <em>"Where is my Blockchain project?"</em></p>
            
            <div style="background: var(--bg-card); border: 1px solid var(--border-medium); padding: 14px 20px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 14px; box-shadow: var(--shadow-lg);">
              <span style="font-size: 20px;">🔍</span>
              <input type="text" class="form-input" style="border: none; background: transparent;" value="Where is my Blockchain project?" readonly>
              <button class="btn btn-indigo" onclick="window.store.setState({ currentView: 'notes' })">Search Memory</button>
            </div>
          </div>
        </section>

        <!-- Section 6: Life Timeline Showcase -->
        <section style="padding: 90px 32px; max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 50px;">
            <h2 style="font-family: var(--font-display); font-size: 34px; font-weight: 800; color: #fff;">Automated Life History Timeline</h2>
            <p style="color: var(--text-secondary); font-size: 15px; margin-top: 6px;">Your hackathons, projects, college milestones, and achievements organized effortlessly</p>
          </div>

          <div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 20px;">
            <div class="card" style="min-width: 280px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-red);">2026 • HACKATHON</div>
              <div style="font-size: 18px; font-weight: 700; color: #fff; margin: 6px 0;">1st Place Planix Life OS</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Built flagship AI operating system prototype.</div>
            </div>
            <div class="card" style="min-width: 280px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold);">2025 • ACADEMIC</div>
              <div style="font-size: 18px; font-weight: 700; color: #fff; margin: 6px 0;">Computer Science Honors</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Maintained 3.9 GPA across all terms.</div>
            </div>
            <div class="card" style="min-width: 280px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-emerald);">2024 • PROJECT</div>
              <div style="font-size: 18px; font-weight: 700; color: #fff; margin: 6px 0;">Full Stack Platform</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Deployed scalable web application.</div>
            </div>
          </div>
        </section>

        <!-- Section 7: Life GPS Flow -->
        <section style="padding: 90px 32px; background: rgba(14, 17, 28, 0.6);">
          <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
            <h2 style="font-family: var(--font-display); font-size: 34px; font-weight: 800; color: #fff; margin-bottom: 40px;">Life GPS: Goal to Execution Flow</h2>
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
              <div class="card" style="flex: 1; min-width: 200px;">
                <div style="font-size: 24px; margin-bottom: 8px;">🎯</div>
                <div style="font-weight: 700; color: #fff;">1. User Goal</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">"Master Full Stack AI"</div>
              </div>
              <div style="font-size: 24px; color: var(--accent-gold);">➔</div>
              <div class="card" style="flex: 1; min-width: 200px;">
                <div style="font-size: 24px; margin-bottom: 8px;">🗺️</div>
                <div style="font-weight: 700; color: #fff;">2. AI Roadmap</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">3-Phase Execution Strategy</div>
              </div>
              <div style="font-size: 24px; color: var(--accent-gold);">➔</div>
              <div class="card" style="flex: 1; min-width: 200px;">
                <div style="font-size: 24px; margin-bottom: 8px;">⚡</div>
                <div style="font-weight: 700; color: #fff;">3. Daily Plan</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Time-Blocked Focus</div>
              </div>
              <div style="font-size: 24px; color: var(--accent-gold);">➔</div>
              <div class="card" style="flex: 1; min-width: 200px;">
                <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                <div style="font-weight: 700; color: #fff;">4. Success Prediction</div>
                <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">98% Goal Completion Rate</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 8: Testimonials -->
        <section style="padding: 90px 32px; max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 50px;">
            <h2 style="font-family: var(--font-display); font-size: 34px; font-weight: 800; color: #fff;">Loved by High Performers</h2>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div class="card">
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                "Planix replaced Notion, Motion, and Todoist for me in one single afternoon. The AI routine builder alone saves me 2 hours every week."
              </p>
              <div style="font-weight: 700; color: #fff;">Sarah K. — Lead Founder</div>
            </div>
            <div class="card">
              <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
                "The Life GPS and 3D flashcards transformed my study routine completely. It feels like having a personal productivity coach on call."
              </p>
              <div style="font-weight: 700; color: #fff;">David M. — Software Engineer</div>
            </div>
          </div>
        </section>

        <!-- Section 9: Footer -->
        <footer style="padding: 60px 32px; background: rgba(5, 5, 8, 0.95); border-top: 1px solid var(--border-subtle); text-align: center;">
          <div style="font-family: var(--font-display); font-size: 28px; font-weight: 900; margin-bottom: 12px;">
            <span style="color: #FFFFFF;">PLAN</span><span style="color: var(--accent-red); text-shadow: 0 0 16px rgba(229, 9, 20, 0.6);">IX</span>
          </div>
          <div style="font-size: 14px; color: var(--text-tertiary); margin-bottom: 24px;">Your Personal AI Operating System</div>
          <button class="btn btn-hero" onclick="window.store.setState({ currentView: 'dashboard' })">
            🚀 Launch Workspace Mode
          </button>
        </footer>
      </div>
    `;
  }

  setDemoTab(tab) {
    this.activeDemoTab = tab;
    window.store.notify();
  }

  renderDemoContent() {
    switch (this.activeDemoTab) {
      case 'routine':
        return `
          <div class="animate-fade-in">
            <div style="font-weight: 700; font-size: 16px; color: var(--accent-gold); margin-bottom: 8px;">Prompt Input:</div>
            <div style="background: var(--bg-input); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); margin-bottom: 16px;">
              "I wake up at 6 AM. College starts at 9. Gym in evening. Need 2 hours study."
            </div>
            <div style="font-weight: 700; font-size: 16px; color: var(--accent-emerald); margin-bottom: 8px;">Generated Schedule Blocks:</div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <span class="badge badge-study">06:00 AM — Morning Focus</span>
              <span class="badge badge-work">09:00 AM — College Lectures</span>
              <span class="badge badge-health">05:30 PM — Evening Workout</span>
              <span class="badge badge-study">08:00 PM — Deep Study Block</span>
            </div>
          </div>
        `;
      case 'notes':
        return `
          <div class="animate-fade-in">
            <div style="font-weight: 700; font-size: 16px; color: #fff; margin-bottom: 8px;">Smart Note Summarization:</div>
            <div style="background: rgba(99, 102, 241, 0.15); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(99, 102, 241, 0.3); font-size: 14px; color: #c7d2fe;">
              📌 <strong>Key Takeaways</strong>:<br>
              - Active recall accelerates neural retention by 3x.<br>
              - Spaced repetition prevents forgetting curve degradation.
            </div>
          </div>
        `;
      case 'journal':
        return `
          <div class="animate-fade-in">
            <div style="font-weight: 700; font-size: 16px; color: #fff; margin-bottom: 8px;">Logged Mood: Peaceful 😊</div>
            <div style="background: rgba(16, 185, 129, 0.15); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 14px; color: #a7f3d0;">
              🌟 <strong>AI Reflection</strong>: High emotional stability detected. You completed 100% of your planned workout blocks today.
            </div>
          </div>
        `;
      case 'study':
        return `
          <div class="animate-fade-in" style="text-align: center;">
            <div style="font-weight: 700; font-size: 16px; color: var(--accent-gold); margin-bottom: 12px;">3D Flip Flashcard Preview</div>
            <div style="background: var(--bg-card); border: 1px solid var(--border-medium); padding: 24px; border-radius: var(--radius-lg); max-width: 400px; margin: 0 auto; font-size: 16px; font-weight: 700; color: #fff;">
              Q: What is Active Recall?
            </div>
          </div>
        `;
    }
  }
}

window.landingView = new LandingView();
