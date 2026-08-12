/**
 * PLANIX AUTHENTICATION MODAL ENGINE
 * Login & Register Dialog for Production Multi-User Authentication
 */

class AuthModal {
  constructor() {
    this.isOpen = false;
    this.activeTab = 'login'; // 'login' or 'register'
    this.errorMsg = '';
    this.isLoading = false;
  }

  open(tab = 'login') {
    this.isOpen = true;
    this.activeTab = tab;
    this.errorMsg = '';
    this.isLoading = false;
    window.store.notify();
  }

  close() {
    this.isOpen = false;
    this.errorMsg = '';
    this.isLoading = false;
    window.store.notify();
  }

  async handleLogin(form) {
    const email = form.email.value;
    const password = form.password.value;

    this.isLoading = true;
    this.errorMsg = '';
    window.store.notify();

    const res = await window.store.login(email, password);
    this.isLoading = false;

    if (res.success) {
      if (window.showToast) window.showToast(`Welcome back, ${res.user.name}!`, 'success');
      this.close();
    } else {
      this.errorMsg = res.error || 'Login failed';
      window.store.notify();
    }
  }

  async handleRegister(form) {
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const semester = form.semester.value;
    const major = form.major.value;

    this.isLoading = true;
    this.errorMsg = '';
    window.store.notify();

    const res = await window.store.register({ name, email, password, semester, major });
    this.isLoading = false;

    if (res.success) {
      if (window.showToast) window.showToast(`Account created! Welcome to PLANIX, ${res.user.name}.`, 'success');
      this.close();
    } else {
      this.errorMsg = res.error || 'Registration failed';
      window.store.notify();
    }
  }

  render() {
    if (!this.isOpen) return '';

    return `
      <style>
        .auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 1300;
          background: rgba(5, 5, 8, 0.90);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.2s ease;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          background: #111116;
          border: 1px solid #282834;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.85);
          overflow: hidden;
        }
        .auth-header {
          padding: 24px;
          background: #16161D;
          border-bottom: 1px solid #282834;
          text-align: center;
        }
        .auth-tab-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          color: #8E8E9E;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .auth-tab-btn.active {
          color: #FFF;
          border-bottom-color: #E50914;
        }
      </style>

      <div class="auth-overlay" onclick="if(event.target===this) window.authModal.close()">
        <div class="auth-card animate-scale-up">
          
          <div class="auth-header">
            <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #E50914; color: #FFF; font-weight: 900; font-size: 18px; display: flex; align-items: center; justify-content: center;">P</div>
              <span style="font-size: 22px; font-weight: 900; letter-spacing: 1px; color: #FFF;">PLAN<span style="color: #E50914;">IX</span></span>
            </div>
            <p style="font-size: 12px; color: #8E8E9E; margin: 0;">AI Academic Operating System</p>

            <div style="display: flex; margin-top: 20px; border-bottom: 1px solid #282834;">
              <button class="auth-tab-btn ${this.activeTab === 'login' ? 'active' : ''}" onclick="window.authModal.activeTab='login'; window.store.notify();">Sign In</button>
              <button class="auth-tab-btn ${this.activeTab === 'register' ? 'active' : ''}" onclick="window.authModal.activeTab='register'; window.store.notify();">Create Account</button>
            </div>
          </div>

          <div style="padding: 24px;">
            ${this.errorMsg ? `
              <div style="padding: 10px 14px; background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444; border-radius: 8px; color: #FCA5A5; font-size: 12px; margin-bottom: 16px;">
                ⚠️ ${this.errorMsg}
              </div>
            ` : ''}

            ${this.activeTab === 'login' ? `
              <form onsubmit="event.preventDefault(); window.authModal.handleLogin(this)">
                <div class="form-group" style="margin-bottom: 16px;">
                  <label class="form-label">Email Address</label>
                  <input type="email" name="email" class="form-input" placeholder="student@university.edu" required autofocus>
                </div>
                <div class="form-group" style="margin-bottom: 24px;">
                  <label class="form-label">Password</label>
                  <input type="password" name="password" class="form-input" placeholder="••••••••" required>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: linear-gradient(135deg, #E50914, #B91C2D);" ${this.isLoading ? 'disabled' : ''}>
                  ${this.isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            ` : `
              <form onsubmit="event.preventDefault(); window.authModal.handleRegister(this)">
                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label">Full Name</label>
                  <input type="text" name="name" class="form-input" placeholder="e.g. Alex Morgan" required autofocus>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label">Email Address</label>
                  <input type="email" name="email" class="form-input" placeholder="alex@university.edu" required>
                </div>
                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label">Password</label>
                  <input type="password" name="password" class="form-input" placeholder="At least 6 characters" minlength="6" required>
                </div>

                <div class="form-row" style="margin-bottom: 24px;">
                  <div class="form-group">
                    <label class="form-label">Academic Term</label>
                    <select name="semester" class="form-input">
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5" selected>Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Major / Field</label>
                    <input type="text" name="major" class="form-input" value="Computer Science">
                  </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: linear-gradient(135deg, #E50914, #B91C2D);" ${this.isLoading ? 'disabled' : ''}>
                  ${this.isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            `}
          </div>

        </div>
      </div>
    `;
  }
}

window.authModal = new AuthModal();
