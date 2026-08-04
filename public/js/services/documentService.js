/**
 * PLANIX V5 DOCUMENT SERVICE — Processing & AI Analysis Engine
 * Handles file validation, upload simulation, document parsing, and multi-stage AI pipelines.
 */

class DocumentService {
  constructor() {
    this.allowedExtensions = ['pdf', 'docx', 'pptx', 'png', 'jpg', 'jpeg', 'zip'];
    this.maxSizeBytes = 100 * 1024 * 1024; // 100 MB
  }

  /**
   * Validates file size, extension, and duplicate filenames.
   */
  validateFile(file) {
    if (!file) return { valid: false, error: 'No file provided.' };

    // Check size
    if (file.size > this.maxSizeBytes) {
      return { valid: false, error: `File size exceeds maximum limit of 100 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB).` };
    }

    // Check extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!this.allowedExtensions.includes(ext)) {
      return { valid: false, error: `Unsupported format .${ext}. Supported: PDF, DOCX, PPTX, PNG, JPG, ZIP.` };
    }

    // Check duplicates
    const existingDocs = window.store?.state?.documents || [];
    const isDuplicate = existingDocs.some(d => d.filename.toLowerCase() === file.name.toLowerCase());
    if (isDuplicate) {
      return { valid: false, error: `File "${file.name}" is already in your document library.` };
    }

    return { valid: true, ext };
  }

  /**
   * Format bytes to readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Detects document category based on filename keywords
   */
  detectDocType(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('timetable') || lower.includes('schedule') || lower.includes('routine')) return 'timetable';
    if (lower.includes('exam') || lower.includes('midterm') || lower.includes('endsem')) return 'exam';
    if (lower.includes('assignment') || lower.includes('lab') || lower.includes('homework')) return 'assignment';
    if (lower.includes('paper') || lower.includes('question') || lower.includes('pyq')) return 'question_paper';
    if (lower.includes('research') || lower.includes('ieee') || lower.includes('paper') || lower.includes('thesis')) return 'research';
    return 'general';
  }

  /**
   * Detects subject name from filename
   */
  detectSubject(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('ml') || lower.includes('machine')) return 'Machine Learning';
    if (lower.includes('dsa') || lower.includes('structure') || lower.includes('algo')) return 'Data Structures';
    if (lower.includes('python')) return 'Python Programming';
    if (lower.includes('dbms') || lower.includes('sql') || lower.includes('database')) return 'Database Systems';
    if (lower.includes('net') || lower.includes('network')) return 'Computer Networks';
    if (lower.includes('se') || lower.includes('software')) return 'Software Engineering';
    return 'General Academic';
  }

  /**
   * Handles multi-stage AI analysis pipeline with stage callbacks.
   */
  async analyzeDocument(docId, onProgress) {
    const doc = (window.store.state.documents || []).find(d => d.id === docId);
    if (!doc) throw new Error('Document not found');

    const stages = [
      'Reading Document...',
      'Extracting Text...',
      'Detecting Subject...',
      'Generating Summary...',
      'Creating Flashcards...',
      'Creating Quiz...',
      'Building Study Plan...',
      'Finalizing Output...'
    ];

    for (let i = 0; i < stages.length; i++) {
      if (onProgress) onProgress(stages[i], Math.round(((i + 1) / stages.length) * 100));
      await new Promise(res => setTimeout(res, 400));
    }

    // Generate rich structured output
    const analysis = this.generateAiOutput(doc);

    // Update document status in store
    const updatedDocs = (window.store.state.documents || []).map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: 'analyzed',
          subject: analysis.subject || d.subject,
          analysis
        };
      }
      return d;
    });

    window.store.setState({ documents: updatedDocs });
    window.store.saveLocalCache();

    // Trigger secondary side-effects (Calendar/Tasks generation)
    this.executePostAnalysisActions(doc, analysis);

    return analysis;
  }

  /**
   * Generates rich mock AI output customized by doc type
   */
  generateAiOutput(doc) {
    const subject = doc.subject || this.detectSubject(doc.filename);
    const docType = doc.docType || this.detectDocType(doc.filename);

    const baseOutput = {
      subject,
      docType,
      summary: `Automated AI summary for ${doc.title}. Extracted core theoretical concepts, key takeaways, and practical study objectives for ${subject}.`,
      topics: [`Core ${subject} Concepts`, 'Key Theoretical Models', 'Practical Implementation', 'Exam Highlights'],
      definitions: [
        { term: 'Fundamental Principle', def: `The primary law governing ${subject} architecture and theory.` },
        { term: 'Optimal Complexity', def: 'The upper bound performance guarantee for practical execution.' }
      ],
      formulaSheet: [
        { name: 'Primary Equation', formula: 'E = mc² or L(θ) = -1/n ∑ [y log(p) + (1-y) log(1-p)]' },
        { name: 'Efficiency Metric', formula: 'T(n) = O(n log n)' }
      ],
      flashcards: [
        { q: `What is the core objective of ${subject}?`, a: `To systematically analyze and optimize problem domain solutions in ${subject}.` },
        { q: 'What is a critical constraint to remember?', a: 'Always verify time and space trade-offs before implementation.' }
      ],
      mcqs: [
        { q: `Which concept is central to ${subject}?`, options: ['Option A', 'Option B', 'Core Theory', 'Option D'], correct: 2 }
      ],
      studyPlan: [
        { day: 'Day 1', task: 'Read Chapters 1 & 2, solve foundational practice problems' },
        { day: 'Day 2', task: 'Review definitions, practice flashcards, attempt quiz' }
      ],
      readingTime: `${Math.max(5, Math.round((doc.pages || 20) * 0.8))} mins`,
      difficulty: 'Intermediate (7.5 / 10)'
    };

    // Document-type specific enrichments
    if (docType === 'timetable') {
      baseOutput.summary = 'Semester Timetable successfully parsed! Extracted 4 recurring weekly classes, room assignments, and lab schedules.';
      baseOutput.classesDetected = [
        { name: 'Machine Learning', day: 'Monday, Wednesday', time: '09:00 AM', room: 'AB1-404' },
        { name: 'Data Structures', day: 'Tuesday, Thursday', time: '11:00 AM', room: 'AB2-305' }
      ];
    } else if (docType === 'exam') {
      baseOutput.summary = 'Exam Schedule parsed! Found 3 upcoming Midterm Exams. Created automated revision countdowns and tasks.';
      baseOutput.examsDetected = [
        { subject: 'Machine Learning', date: 'May 20, 2025', venue: 'Hall A' },
        { subject: 'Data Structures', date: 'May 22, 2025', venue: 'Hall C' }
      ];
    }

    return baseOutput;
  }

  /**
   * Automatically populates Tasks / Calendar if document is a timetable or exam schedule
   */
  executePostAnalysisActions(doc, analysis) {
    if (analysis.docType === 'timetable') {
      // Add recurring classes to tasks/schedule
      const newTasks = [
        { id: 't_' + Date.now() + '_1', text: 'Attend ML Class (AB1-404)', priority: 'high', label: 'Class', est: '1.5h', completed: false },
        { id: 't_' + Date.now() + '_2', text: 'Attend Data Structures (AB2-305)', priority: 'medium', label: 'Class', est: '1.5h', completed: false }
      ];
      window.store.setState({ tasks: [...newTasks, ...(window.store.state.tasks || [])] });
      if (window.showToast) window.showToast('Classes added to your daily Schedule & Tasks!', 'success');
    } else if (analysis.docType === 'exam') {
      // Add exam countdowns to calendar events
      const newEvents = [
        { id: 'ev_' + Date.now() + '_1', title: `EXAM: ${doc.subject}`, date: '2025-05-20', type: 'urgent' }
      ];
      window.store.setState({ calendarEvents: [...newEvents, ...(window.store.state.calendarEvents || [])] });
      if (window.showToast) window.showToast('Exams & Revision Schedule added to Calendar!', 'success');
    }
  }

  /**
   * Upload file pipeline simulating network progress
   */
  async uploadFile(file, onProgress) {
    const validation = this.validateFile(file);
    if (!validation.valid) throw new Error(validation.error);

    // Simulate progress 0% -> 100%
    for (let p = 10; p <= 100; p += 20) {
      if (onProgress) onProgress(p);
      await new Promise(res => setTimeout(res, 120));
    }

    const docType = this.detectDocType(file.name);
    const subject = this.detectSubject(file.name);

    const newDoc = {
      id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      title: file.name,
      filename: file.name,
      fileType: validation.ext,
      fileSize: this.formatBytes(file.size),
      bytes: file.size,
      pages: Math.floor(Math.random() * 30) + 5,
      subject: subject,
      docType: docType,
      uploadedAt: 'Just now',
      lastOpened: 'Just now',
      isFavorite: false,
      isPinned: false,
      status: 'ready'
    };

    const currentDocs = window.store.state.documents || [];
    window.store.setState({ documents: [newDoc, ...currentDocs] });
    window.store.saveLocalCache();

    return newDoc;
  }
}

window.documentService = new DocumentService();
