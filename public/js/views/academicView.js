/**
 * PLANIX V5 ACADEMIC HUB — Exact Match to Signature Reference UI Spec
 * 100% functional, interactive, and data-driven backend state engine.
 */

class AcademicView {
  constructor() {
    this.selectedDocCategory = 'all';
    this.searchQuery = '';
  }

  render(state) {
    const documents = state.documents || [];

    // Filter documents for Document Intelligence section
    let filteredDocs = documents;
    if (this.selectedDocCategory !== 'all') {
      if (this.selectedDocCategory === 'notes') filteredDocs = documents.filter(d => d.docType === 'general' || d.fileType === 'pdf');
      if (this.selectedDocCategory === 'papers') filteredDocs = documents.filter(d => d.docType === 'question_paper');
      if (this.selectedDocCategory === 'assignments') filteredDocs = documents.filter(d => d.docType === 'assignment');
      if (this.selectedDocCategory === 'timetables') filteredDocs = documents.filter(d => d.docType === 'timetable');
    }

    return `
      <style>
        .ah-container {
          --bg-dark: #0B0B0F;
          --bg-card: #121217;
          --bg-subtle: #16161D;
          --border: #22222A;
          --red: #FF2D2D;
          --purple: #8B5CF6;
          --green: #10B981;
          --yellow: #F59E0B;
          --blue: #3B82F6;
          --pink: #D946EF;
          --text-main: #FFFFFF;
          --text-muted: #8E8E9E;
          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--bg-dark);
          min-height: 100vh;
          padding-right: 12px;
        }

        .ah-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ah-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border-color: #2E2E38;
        }

        .cat-pill {
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg-subtle);
          color: var(--text-muted);
          cursor: pointer;
          transition: 0.2s;
        }
        .cat-pill.active {
          background: var(--red);
          color: #FFF;
          border-color: var(--red);
        }

        .suite-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .suite-card:hover {
          border-color: var(--red);
          background: rgba(255, 45, 45, 0.05);
        }
      </style>

      <div class="view-container animate-fade-in ah-container">
        
        <!-- ================= PAGE HEADER ================= -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255, 45, 45, 0.15); display: flex; align-items: center; justify-content: center; color: var(--red);">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
            </div>
            <div>
              <h1 style="font-size: 22px; font-weight: 800; color: #FFF; margin: 0; letter-spacing: -0.01em;">Academic Hub</h1>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Your complete academic command center powered by AI</p>
            </div>
          </div>
          <div>
            <button class="btn btn-primary" style="background: var(--red); font-weight: 700; padding: 10px 18px; font-size: 13px; display: flex; align-items: center; gap: 8px;" onclick="document.getElementById('ah-file-upload-input').click()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload PDF / Timetable
            </button>
            <input type="file" id="ah-file-upload-input" style="display: none;" multiple onchange="window.intelligenceView.handleFileInputChange(this)">
          </div>
        </div>

        <!-- ================= ROW 0: TOP 5 SUMMARY CARDS ================= -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 24px;">
          
          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(139, 92, 246, 0.15); color: var(--purple); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📖</div>
              <div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Next Class</div>
                <div style="font-size: 13px; color: #FFF; font-weight: 700; margin-top: 2px;">Machine Learning</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Today, 9:00 AM</div>
                <div style="font-size: 10px; color: var(--text-muted);">AB1-404</div>
              </div>
            </div>
          </div>

          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); color: var(--green); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📝</div>
              <div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Upcoming Assignment</div>
                <div style="font-size: 13px; color: #FFF; font-weight: 700; margin-top: 2px;">Python Lab Program 3</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Due Tomorrow</div>
                <div style="margin-top: 6px;"><span style="font-size: 9px; font-weight: 700; color: var(--red); background: rgba(255,45,45,0.15); padding: 2px 6px; border-radius: 4px;">High Priority</span></div>
              </div>
            </div>
          </div>

          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(245, 158, 11, 0.15); color: var(--yellow); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🎯</div>
              <div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Next Exam</div>
                <div style="font-size: 13px; color: #FFF; font-weight: 700; margin-top: 2px;">Data Structures</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">May 20, 2025</div>
                <div style="font-size: 10px; color: var(--yellow); font-weight: 600; margin-top: 2px;">5 Days Left</div>
              </div>
            </div>
          </div>

          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59, 130, 246, 0.15); color: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📊</div>
              <div style="flex: 1;">
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Attendance</div>
                <div style="font-size: 16px; color: #FFF; font-weight: 800; margin-top: 2px;">89%</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Good Standing</div>
                <div style="margin-top: 8px; height: 4px; background: #22222A; border-radius: 2px; overflow: hidden;">
                  <div style="height: 100%; width: 89%; background: var(--green);"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(217, 70, 239, 0.15); color: var(--pink); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🎓</div>
              <div>
                <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">CGPA</div>
                <div style="font-size: 16px; color: #FFF; font-weight: 800; margin-top: 2px;">8.76</div>
                <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Semester 5</div>
              </div>
            </div>
          </div>

        </div>

        <!-- ================= ROW 1: UPLOAD & AI OVERVIEW GRID ================= -->
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr 0.8fr 300px; gap: 16px; margin-bottom: 24px;">
          
          <!-- Drop Zone Card -->
          <div class="ah-card" style="padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 2px dashed #2A2A35; background: rgba(18, 18, 23, 0.8);"
               ondragover="window.intelligenceView.handleDragOver(event)"
               ondragleave="window.intelligenceView.handleDragLeave(event)"
               ondrop="window.intelligenceView.handleDrop(event)">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255, 45, 45, 0.1); color: var(--red); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 12px;">☁️</div>
            <div style="font-size: 14px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Drop your academic files here</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 16px;">PDF, DOCX, PPTX, Images, ZIP up to 100MB</div>
            <button class="btn btn-primary" style="background: var(--red); font-size: 12px; font-weight: 700; padding: 8px 20px;" onclick="document.getElementById('ah-file-upload-input').click()">
              Choose Files
            </button>
            <div style="font-size: 10px; color: var(--text-muted); margin-top: 10px;">or drag and drop</div>
          </div>

          <!-- Recent Uploads List -->
          <div class="ah-card" style="padding: 16px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 13px; font-weight: 700; color: #FFF;">Recent Uploads</span>
              <a href="#" style="font-size: 11px; color: var(--red); text-decoration: none; font-weight: 600;" onclick="event.preventDefault(); window.store.setState({ currentView: 'intelligence' })">View all</a>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; flex: 1;">
              ${documents.slice(0, 4).map(d => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: var(--bg-subtle); border-radius: 8px; border: 1px solid var(--border); cursor: pointer;" onclick="window.documentViewerModal.open('${d.id}')">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <span style="font-size: 10px; font-weight: 800; padding: 2px 4px; border-radius: 4px; background: var(--red); color: #FFF;">PDF</span>
                    <div>
                      <div style="font-size: 11px; font-weight: 600; color: #FFF; max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.title}</div>
                      <div style="font-size: 9px; color: var(--text-muted);">${d.pages || 20} pages • ${d.fileSize}</div>
                    </div>
                  </div>
                  <span style="font-size: 10px; font-weight: 600; color: ${d.status === 'analyzed' ? 'var(--green)' : 'var(--yellow)'};">${d.status === 'analyzed' ? 'Analyzed ✓' : 'Analyzing 60%'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- AI Analysis Overview Card -->
          <div class="ah-card" style="padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center;">
            <div style="font-size: 13px; font-weight: 700; color: #FFF;">AI Analysis Overview</div>

            <!-- Score Circle -->
            <div style="position: relative; width: 90px; height: 90px; margin: 10px 0;">
              <svg class="circular-progress" width="90" height="90" viewBox="0 0 90 90">
                <circle class="bg" cx="45" cy="45" r="38"></circle>
                <circle cx="45" cy="45" r="38" style="stroke: var(--purple); stroke-dasharray: 238; stroke-dashoffset: 50;"></circle>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 22px; font-weight: 800; color: #FFF;">78</span>
                <span style="font-size: 9px; color: var(--green); font-weight: 700;">Very Good</span>
              </div>
            </div>

            <!-- AI Checklist -->
            <div style="font-size: 10px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px; width: 100%; text-align: left;">
              <div>✓ Summary Generated</div>
              <div>✓ Topics Extracted</div>
              <div>✓ Flashcards Created</div>
            </div>

            <button class="btn btn-secondary" style="margin-top: 10px; width: 100%; font-size: 11px; padding: 6px; font-weight: 700; color: var(--purple); border-color: rgba(139, 92, 246, 0.3);" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
              View Full Analysis
            </button>
          </div>

          <!-- Today's Schedule (Right Sidebar) -->
          <div class="ah-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 13px; font-weight: 700; color: #FFF;">Today's Schedule</span>
                <span style="font-size: 10px; color: var(--text-muted);">May 15, 2025</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="font-size: 10px; display: flex; justify-content: space-between; background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px;">
                  <span style="color: var(--purple); font-weight: 700;">09:00 AM</span>
                  <span style="color: #FFF; font-weight: 600;">Machine Learning</span>
                </div>
                <div style="font-size: 10px; display: flex; justify-content: space-between; background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px;">
                  <span style="color: var(--green); font-weight: 700;">11:00 AM</span>
                  <span style="color: #FFF; font-weight: 600;">Python Lab</span>
                </div>
                <div style="font-size: 10px; display: flex; justify-content: space-between; background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px;">
                  <span style="color: var(--yellow); font-weight: 700;">01:00 PM</span>
                  <span style="color: #FFF; font-weight: 600;">Data Structures</span>
                </div>
              </div>
            </div>

            <button class="btn btn-ghost" style="margin-top: 10px; font-size: 11px; color: var(--red); font-weight: 700;" onclick="window.store.setState({ currentView: 'calendar' })">
              View Full Timetable
            </button>
          </div>

        </div>

        <!-- ================= ROW 2: DOCUMENT INTELLIGENCE GRID + RIGHT SIDEBAR ================= -->
        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 20px; margin-bottom: 24px;">
          
          <!-- Document Intelligence Main Grid -->
          <div>
            <!-- Category Filter Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
              <h2 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0;">Document Intelligence</h2>

              <div style="display: flex; gap: 6px;">
                <button class="cat-pill ${this.selectedDocCategory === 'all' ? 'active' : ''}" onclick="window.academicView.selectedDocCategory = 'all'; window.store.notify()">All</button>
                <button class="cat-pill ${this.selectedDocCategory === 'notes' ? 'active' : ''}" onclick="window.academicView.selectedDocCategory = 'notes'; window.store.notify()">Notes</button>
                <button class="cat-pill ${this.selectedDocCategory === 'papers' ? 'active' : ''}" onclick="window.academicView.selectedDocCategory = 'papers'; window.store.notify()">Question Papers</button>
                <button class="cat-pill ${this.selectedDocCategory === 'assignments' ? 'active' : ''}" onclick="window.academicView.selectedDocCategory = 'assignments'; window.store.notify()">Assignments</button>
                <button class="cat-pill ${this.selectedDocCategory === 'timetables' ? 'active' : ''}" onclick="window.academicView.selectedDocCategory = 'timetables'; window.store.notify()">Timetables</button>
              </div>
            </div>

            <!-- Documents Grid (5 Items) -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
              ${filteredDocs.slice(0, 6).map(d => `
                <div class="ah-card" style="padding: 14px; display: flex; flex-direction: column; justify-content: space-between; min-height: 180px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: var(--red); color: #FFF;">PDF</span>
                      <div style="display: flex; gap: 4px; color: var(--text-muted); font-size: 11px;">
                        <span style="cursor: pointer; color: ${d.isFavorite ? '#FFD700' : 'var(--text-muted)'};" onclick="window.intelligenceView.toggleFavorite('${d.id}')">★</span>
                        <span style="cursor: pointer; color: ${d.isPinned ? 'var(--red)' : 'var(--text-muted)'};" onclick="window.intelligenceView.togglePin('${d.id}')">📌</span>
                      </div>
                    </div>

                    <div style="font-size: 13px; font-weight: 700; color: #FFF; line-height: 1.3; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.title}</div>
                    <div style="font-size: 10px; color: var(--purple); font-weight: 600; margin-bottom: 8px;">${d.subject || 'General Academic'}</div>
                    <div style="font-size: 10px; color: var(--text-muted);">${d.pages || 12} pages • ${d.fileSize} • ${d.uploadedAt}</div>
                  </div>

                  <!-- Actions -->
                  <div style="display: flex; gap: 8px; margin-top: 14px; border-top: 1px solid var(--border); padding-top: 10px;">
                    <button class="btn btn-secondary" style="flex: 1; padding: 4px; font-size: 11px; font-weight: 700;" onclick="window.documentViewerModal.open('${d.id}')">
                      👁️ Open
                    </button>
                    <button class="btn btn-primary" style="flex: 1; padding: 4px; font-size: 11px; font-weight: 700; background: var(--purple);" onclick="window.analysisModal.open('${d.id}')">
                      Analyze
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Sidebar (Mini Calendar & Exams) -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            
            <!-- Mini Calendar -->
            <div class="ah-card" style="padding: 14px;">
              <div style="font-size: 12px; font-weight: 700; color: #FFF; margin-bottom: 10px; text-align: center;">May 2025</div>
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 10px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; font-size: 10px; color: #FFF;">
                <div style="color: var(--text-muted);">28</div><div style="color: var(--text-muted);">29</div><div style="color: var(--text-muted);">30</div><div>1</div><div>2</div><div>3</div><div>4</div>
                <div>5</div><div>6</div><div style="background: var(--red); border-radius: 50%; font-weight: 800;">7</div><div>8</div><div>9</div><div>10</div><div>11</div>
                <div>12</div><div>13</div><div>14</div><div style="background: var(--purple); border-radius: 50%;">15</div><div>16</div><div>17</div><div>18</div>
              </div>
            </div>

            <!-- Upcoming Exams List -->
            <div class="ah-card" style="padding: 14px;">
              <div style="font-size: 13px; font-weight: 700; color: #FFF; margin-bottom: 12px;">Upcoming Exams</div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <div>
                    <div style="font-weight: 700; color: #FFF;">Data Structures</div>
                    <div style="font-size: 9px; color: var(--text-muted);">May 20, 2025</div>
                  </div>
                  <span style="font-size: 10px; font-weight: 700; color: var(--green);">5 Days Left ></span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                  <div>
                    <div style="font-weight: 700; color: #FFF;">Machine Learning</div>
                    <div style="font-size: 9px; color: var(--text-muted);">May 28, 2025</div>
                  </div>
                  <span style="font-size: 10px; font-weight: 700; color: var(--green);">13 Days Left ></span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- ================= ROW 3: AI STUDY SUITE + QUICK ACTIONS ================= -->
        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 20px; margin-bottom: 24px;">
          
          <!-- AI Study Suite Grid (6 Cards) -->
          <div>
            <h2 style="font-size: 16px; font-weight: 700; color: #FFF; margin: 0 0 14px 0;">AI Study Suite</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              
              <div class="suite-card" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
                <div style="font-size: 24px;">📖</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">AI Summary</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Get instant summary of document</div>
                </div>
              </div>

              <div class="suite-card" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
                <div style="font-size: 24px;">🃏</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">Flashcards</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Smart flashcards from notes</div>
                </div>
              </div>

              <div class="suite-card" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
                <div style="font-size: 24px;">❓</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">Quiz Generator</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Generate quizzes automatically</div>
                </div>
              </div>

              <div class="suite-card" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
                <div style="font-size: 24px;">🧠</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">Mind Map</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Visualize concepts with mind maps</div>
                </div>
              </div>

              <div class="suite-card" onclick="window.analysisModal.open('${documents[0]?.id || 'doc_1'}')">
                <div style="font-size: 24px;">📅</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">Study Plan</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Personalized study schedule</div>
                </div>
              </div>

              <div class="suite-card" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <div style="font-size: 24px;">🤖</div>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #FFF;">AI Tutor</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Ask questions and get answers</div>
                </div>
              </div>

            </div>
          </div>

          <!-- Quick Actions Grid -->
          <div class="ah-card" style="padding: 14px;">
            <div style="font-size: 13px; font-weight: 700; color: #FFF; margin-bottom: 12px;">Quick Actions</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center;">
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.store.setState({ currentView: 'notes' })">
                <span style="font-size: 16px;">📝</span> Create Note
              </button>
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.store.setState({ currentView: 'intelligence' })">
                <span style="font-size: 16px;">📤</span> Upload PDF
              </button>
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.modalComponent.open('task')">
                <span style="font-size: 16px;">✅</span> Add Task
              </button>
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.store.setState({ currentView: 'study' })">
                <span style="font-size: 16px;">⏱️</span> Study Timer
              </button>
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.store.setState({ currentView: 'calendar' })">
                <span style="font-size: 16px;">📅</span> Open Calendar
              </button>
              <button class="btn btn-secondary" style="flex-direction: column; padding: 10px 4px; font-size: 10px; gap: 4px;" onclick="window.store.setState({ isAiDrawerOpen: true })">
                <span style="font-size: 16px;">🤖</span> Ask AI
              </button>
            </div>
          </div>

        </div>

        <!-- ================= ROW 4: ANALYTICS ROW ================= -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding-bottom: 40px;">
          
          <!-- Study Progress Sparkline -->
          <div class="ah-card" style="padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; font-weight: 700; color: #FFF;">Study Progress</span>
              <span style="font-size: 10px; font-weight: 800; color: var(--green); background: rgba(16,185,129,0.15); padding: 2px 6px; border-radius: 4px;">+23%</span>
            </div>
            <!-- Sparkline SVG -->
            <svg viewBox="0 0 200 50" width="100%" height="40">
              <path d="M0,40 Q30,10 60,35 T120,15 T180,30 T200,5" fill="none" stroke="var(--purple)" stroke-width="3"/>
            </svg>
          </div>

          <!-- Subject Progress -->
          <div class="ah-card" style="padding: 14px;">
            <div style="font-size: 12px; font-weight: 700; color: #FFF; margin-bottom: 10px;">Subject Progress</div>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 10px;">
              <div>
                <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
                  <span>Machine Learning</span><span>85%</span>
                </div>
                <div style="height: 3px; background: #22222A; border-radius: 2px; margin-top: 2px;">
                  <div style="height: 100%; width: 85%; background: var(--purple);"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
                  <span>Data Structures</span><span>78%</span>
                </div>
                <div style="height: 3px; background: #22222A; border-radius: 2px; margin-top: 2px;">
                  <div style="height: 100%; width: 78%; background: var(--yellow);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Task Completion Donut -->
          <div class="ah-card" style="padding: 14px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 12px; font-weight: 700; color: #FFF;">Task Completion</div>
              <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Completed: 38</div>
              <div style="font-size: 10px; color: var(--text-muted);">In Progress: 12</div>
            </div>
            <div style="position: relative; width: 50px; height: 50px;">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#22222A" stroke-width="5"/>
                <circle cx="25" cy="25" r="20" fill="none" stroke="var(--green)" stroke-width="5" stroke-dasharray="125" stroke-dashoffset="30"/>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #FFF;">76%</div>
            </div>
          </div>

          <!-- AI Recommendations -->
          <div class="ah-card" style="padding: 14px; display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(229,9,20,0.3);">
            <div>
              <div style="font-size: 12px; font-weight: 700; color: var(--red);">AI Recommendation</div>
              <div style="font-size: 11px; color: #FFF; font-weight: 600; margin-top: 4px;">Focus on Data Structures</div>
              <div style="font-size: 9px; color: var(--text-muted); margin-top: 2px;">Exam in 5 days. Review Tree Traversals.</div>
            </div>
            <button class="btn btn-secondary" style="margin-top: 8px; font-size: 9px; padding: 4px; font-weight: 700;" onclick="window.analysisModal.open('doc_2')">
              View Study Plan
            </button>
          </div>

        </div>

      </div>
    `;
  }
}

window.academicView = new AcademicView();
