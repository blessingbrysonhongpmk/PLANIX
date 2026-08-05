/**
 * PLANIX V5 PROFILE & SETTINGS VIEW
 * Native Mobile Grouped List Interface
 */

class ProfileView {
  render(state) {
    return `
      <style>
        .profile-container {
          padding: 20px 16px 100px 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #121217;
          border-radius: 16px;
          border: 1px solid #22222A;
        }
        .profile-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E50914, #B91C2D);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
        }
        .list-group {
          background: #121217;
          border-radius: 16px;
          border: 1px solid #22222A;
          overflow: hidden;
        }
        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          color: #FFF;
          font-size: 14px;
          font-weight: 600;
          border-bottom: 1px solid #22222A;
          cursor: pointer;
        }
        .list-item:active {
          background: #1A1A22;
        }
        .list-item:last-child {
          border-bottom: none;
        }
        .list-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .list-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #1A1A22;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A3A3A3;
        }
        .list-arrow {
          color: #666;
          font-weight: 800;
        }
      </style>

      <div class="profile-container animate-fade-in">
        
        <div class="profile-header">
          <div class="profile-avatar">B</div>
          <div>
            <h2 style="margin: 0; font-size: 18px; color: #FFF;">Blessing Bryson</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #8E8E9E;">Computer Science Engineering</p>
          </div>
        </div>

        <div>
          <h3 style="font-size: 12px; color: #8E8E9E; margin-left: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Account</h3>
          <div class="list-group">
            <div class="list-item" onclick="window.store.setState({ isSettingsModalOpen: true })">
              <div class="list-item-left">
                <div class="list-icon">⚙️</div>
                <span>General Settings</span>
              </div>
              <span class="list-arrow">></span>
            </div>
            <div class="list-item">
              <div class="list-item-left">
                <div class="list-icon">🎨</div>
                <span>Appearance</span>
              </div>
              <span class="list-arrow">></span>
            </div>
          </div>
        </div>

        <div>
          <h3 style="font-size: 12px; color: #8E8E9E; margin-left: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Academic Data</h3>
          <div class="list-group">
            <div class="list-item">
              <div class="list-item-left">
                <div class="list-icon">📊</div>
                <span>Statistics</span>
              </div>
              <span class="list-arrow">></span>
            </div>
            <div class="list-item">
              <div class="list-item-left">
                <div class="list-icon">🏆</div>
                <span>Achievements</span>
              </div>
              <span class="list-arrow">></span>
            </div>
            <div class="list-item">
              <div class="list-item-left">
                <div class="list-icon">☁️</div>
                <span>Backup & Sync</span>
              </div>
              <span class="list-arrow">></span>
            </div>
          </div>
        </div>

        <div>
          <h3 style="font-size: 12px; color: #8E8E9E; margin-left: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">More</h3>
          <div class="list-group">
            <div class="list-item" onclick="window.mobileBottomSheet.open('more')">
              <div class="list-item-left">
                <div class="list-icon" style="color: #E50914; background: rgba(229,9,20,0.1);">📦</div>
                <span style="color: #E50914;">View All Features</span>
              </div>
              <span class="list-arrow" style="color: #E50914;">></span>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}

window.profileView = new ProfileView();
