/**
 * PLANIX STUDY & FOCUS VIEW
 * Pomodoro Focus Timer with Web Audio Ambient Sound Synthesizer (Rain, Temple Chime, Soft Waves)
 */

class StudyView {
  constructor() {
    this.timer = null;
    this.timeLeft = 25 * 60; // 25 minutes default
    this.isRunning = false;
    this.audioCtx = null;
    this.activeNoiseNode = null;
    this.activeGainNode = null;
  }

  render(state) {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const audioState = state.audioPlayer;

    return `
      <div class="view-container animate-fade-in" style="padding: 24px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #FFF; margin: 0; display: flex; align-items: center; gap: 10px;">
              <span>🎯</span> Focus & Study Timer
            </h1>
            <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">
              Use the Pomodoro technique to study deeply with soothing ambient soundscapes.
            </p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          
          <!-- Column 1: Pomodoro Timer Card -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 20px; padding: 32px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-size: 12px; font-weight: 700; color: #E50914; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
              POMODORO FOCUS SESSION
            </div>

            <div style="font-size: 64px; font-weight: 900; color: #FFFFFF; font-family: var(--font-mono); letter-spacing: 2px; margin: 16px 0; background: radial-gradient(circle, rgba(229,9,20,0.15) 0%, rgba(0,0,0,0) 70%); padding: 20px; border-radius: 20px;">
              ${formattedTime}
            </div>

            <!-- Timer Controls -->
            <div style="display: flex; gap: 12px; margin-top: 16px;">
              <button class="btn" style="background: #E50914; color: white; border: none; border-radius: 10px; padding: 12px 28px; font-size: 16px; font-weight: 700; cursor: pointer;" onclick="window.studyView.toggleTimer()">
                ${this.isRunning ? 'Pause ⏸' : 'Start Focus ▶'}
              </button>
              <button class="btn" style="background: #27272A; color: white; border: none; border-radius: 10px; padding: 12px 20px; font-size: 14px; font-weight: 600; cursor: pointer;" onclick="window.studyView.resetTimer(25)">
                Reset (25m)
              </button>
            </div>

            <!-- Quick Preset Buttons -->
            <div style="display: flex; gap: 8px; margin-top: 24px;">
              <button class="badge" style="background: rgba(255,255,255,0.05); color: #AAA; border: 1px solid #3F3F46; padding: 6px 12px; border-radius: 6px; cursor: pointer;" onclick="window.studyView.resetTimer(15)">15 Mins</button>
              <button class="badge" style="background: rgba(255,255,255,0.05); color: #AAA; border: 1px solid #3F3F46; padding: 6px 12px; border-radius: 6px; cursor: pointer;" onclick="window.studyView.resetTimer(25)">25 Mins</button>
              <button class="badge" style="background: rgba(255,255,255,0.05); color: #AAA; border: 1px solid #3F3F46; padding: 6px 12px; border-radius: 6px; cursor: pointer;" onclick="window.studyView.resetTimer(45)">45 Mins</button>
              <button class="badge" style="background: rgba(255,255,255,0.05); color: #AAA; border: 1px solid #3F3F46; padding: 6px 12px; border-radius: 6px; cursor: pointer;" onclick="window.studyView.resetTimer(60)">60 Mins</button>
            </div>
          </div>

          <!-- Column 2: UNIQUE FEATURE - Focus Ambient Sound Player -->
          <div style="background: #141417; border: 1px solid #27272A; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 6px 0; display: flex; align-items: center; gap: 8px;">
                <span>🎧</span> Focus Ambient Sounds
              </h3>
              <p style="color: #A1A1AA; font-size: 13px;">
                Built-in soothing ambient sounds to help you study without distraction.
              </p>
            </div>

            <!-- Sound Preset Selection -->
            <div style="display: flex; flex-direction: column; gap: 12px; margin: 20px 0;">
              <button class="btn" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; border-radius: 12px; border: 1px solid #27272A; ${audioState.isPlaying && audioState.soundType === 'rain' ? 'background: rgba(229,9,20,0.15); border-color: #E50914; color: #FFF;' : 'background: #1C1C21; color: #AAA;'}" onclick="window.studyView.playAmbientSound('rain')">
                <span style="display: flex; align-items: center; gap: 10px; font-weight: 600;">
                  <span>🌧️</span> Rain & Thunder
                </span>
                <span>${audioState.isPlaying && audioState.soundType === 'rain' ? 'Playing 🔊' : 'Play ▶'}</span>
              </button>

              <button class="btn" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; border-radius: 12px; border: 1px solid #27272A; ${audioState.isPlaying && audioState.soundType === 'temple' ? 'background: rgba(229,9,20,0.15); border-color: #E50914; color: #FFF;' : 'background: #1C1C21; color: #AAA;'}" onclick="window.studyView.playAmbientSound('temple')">
                <span style="display: flex; align-items: center; gap: 10px; font-weight: 600;">
                  <span>🔔</span> Meditation Chimes & Bell
                </span>
                <span>${audioState.isPlaying && audioState.soundType === 'temple' ? 'Playing 🔊' : 'Play ▶'}</span>
              </button>

              <button class="btn" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; border-radius: 12px; border: 1px solid #27272A; ${audioState.isPlaying && audioState.soundType === 'waves' ? 'background: rgba(229,9,20,0.15); border-color: #E50914; color: #FFF;' : 'background: #1C1C21; color: #AAA;'}" onclick="window.studyView.playAmbientSound('waves')">
                <span style="display: flex; align-items: center; gap: 10px; font-weight: 600;">
                  <span>🌊</span> Soft Ocean Waves
                </span>
                <span>${audioState.isPlaying && audioState.soundType === 'waves' ? 'Playing 🔊' : 'Play ▶'}</span>
              </button>
            </div>

            <!-- Stop Sound Button -->
            ${audioState.isPlaying ? `
              <button class="btn" style="background: #27272A; color: #FF4D4D; border: 1px solid #3F3F46; border-radius: 10px; padding: 10px; font-weight: 600; cursor: pointer;" onclick="window.studyView.stopAmbientSound()">
                ⏹ Stop Sound
              </button>
            ` : ''}

          </div>

        </div>

      </div>
    `;
  }

  toggleTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
    } else {
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          window.store.notify();
        } else {
          clearInterval(this.timer);
          this.isRunning = false;
          alert("🎉 Focus session completed! Great job!");
        }
      }, 1000);
    }
    window.store.notify();
  }

  resetTimer(mins) {
    if (this.timer) clearInterval(this.timer);
    this.timeLeft = mins * 60;
    this.isRunning = false;
    window.store.notify();
  }

  playAmbientSound(type) {
    this.stopAmbientSound();

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();

      // Create Web Audio noise buffer
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter based on sound type
      const filter = this.audioCtx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      } else if (type === 'waves') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, this.audioCtx.currentTime);
      } else {
        filter.type = 'peaking';
        filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      }

      const gainNode = this.audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.08, this.audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      whiteNoise.start();
      this.activeNoiseNode = whiteNoise;
      this.activeGainNode = gainNode;

      window.store.setState({ audioPlayer: { isPlaying: true, soundType: type, volume: 0.5 } });
    } catch (e) {
      console.warn("Audio Context error:", e);
      window.store.setState({ audioPlayer: { isPlaying: true, soundType: type, volume: 0.5 } });
    }
  }

  stopAmbientSound() {
    if (this.activeNoiseNode) {
      try { this.activeNoiseNode.stop(); } catch(e){}
      this.activeNoiseNode = null;
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch(e){}
      this.audioCtx = null;
    }
    window.store.setState({ audioPlayer: { isPlaying: false, soundType: 'rain', volume: 0.5 } });
  }
}

window.studyView = new StudyView();
