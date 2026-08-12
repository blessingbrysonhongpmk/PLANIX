/**
 * PLANIX ACADEMIC DOCUMENT PROCESSING & INTELLIGENCE API ROUTER
 * Handles real file uploads (multer), storage in /uploads, text extraction,
 * AI classification & 1-Click Action Synthesis (Tasks, Calendar, Timetables, Study Plans).
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storageService = require('../db/storageService');
const documentProcessor = require('../services/documentProcessor');
const aiService = require('../services/aiService');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// Configure Multer Storage in /uploads
const UPLOAD_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB Max
  fileFilter: (_req, file, cb) => {
    const allowedExts = ['.pdf', '.docx', '.pptx', '.png', '.jpg', '.jpeg', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported format ${ext}. Supported: PDF, DOCX, PPTX, PNG, JPG, TXT.`));
    }
  }
});

// GET /api/documents - Retrieve user's documents
router.get('/', optionalAuth, (req, res) => {
  try {
    const docs = storageService.findByUser('documents', req.user.id);
    res.json({ success: true, documents: docs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/documents/upload - Real File Upload & Queue Processing
router.post('/upload', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded.' });
    }

    const { originalname, filename, size, mimetype, path: filePath } = req.file;
    const userId = req.user.id;
    const now = new Date().toISOString();

    // Check duplicate filename for user
    const userDocs = storageService.findByUser('documents', userId);
    const isDuplicate = userDocs.some(d => d.originalName.toLowerCase() === originalname.toLowerCase());
    if (isDuplicate) {
      // Clean up uploaded temp file
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(400).json({ success: false, error: `Document "${originalname}" already exists in your library.` });
    }

    // 1. Create Initial Document Record
    const docId = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const initialDoc = {
      id: docId,
      userId,
      title: originalname,
      filename,
      originalName: originalname,
      mimeType: mimetype,
      fileSizeFormatted: `${(size / (1024 * 1024)).toFixed(2)} MB`,
      bytes: size,
      storageKey: filename,
      filePath: `/uploads/${filename}`,
      status: 'processing', // uploading -> processing -> analyzed
      uploadedAt: now,
      updatedAt: now,
      isFavorite: false,
      isPinned: false
    };

    storageService.saveForUser('documents', userId, initialDoc);

    // 2. Async Document Extraction & AI Pipeline Processing
    let extractionResult = { text: '', isScanned: false, pageCount: 1 };
    let aiAnalysis = {};

    try {
      extractionResult = await documentProcessor.extractTextFromFile(filePath, mimetype, originalname);
      aiAnalysis = await aiService.processDocumentIntelligence(extractionResult.text, originalname, { userId });
    } catch (procErr) {
      console.error('Document processing warning:', procErr.message);
      aiAnalysis = {
        documentType: 'GENERAL_ACADEMIC_DOCUMENT',
        confidence: 0.50,
        summary: `Document stored. Text extraction note: ${procErr.message}`,
        subject: 'General Academic',
        topics: ['Uploaded Document'],
        flashcards: [],
        mcqs: []
      };
    }

    // 3. Save Document Analysis Entity
    const analysisRecord = {
      id: `analysis_${docId}`,
      docId,
      userId,
      documentType: aiAnalysis.documentType || 'GENERAL_ACADEMIC_DOCUMENT',
      confidence: aiAnalysis.confidence || 0.85,
      extractedTextSample: extractionResult.text.slice(0, 500),
      summary: aiAnalysis.summary,
      subject: aiAnalysis.subject,
      topics: aiAnalysis.topics || [],
      definitions: aiAnalysis.definitions || [],
      flashcards: aiAnalysis.flashcards || [],
      mcqs: aiAnalysis.mcqs || [],
      timetableEvents: aiAnalysis.timetableEvents || [],
      exams: aiAnalysis.exams || [],
      assignments: aiAnalysis.assignments || [],
      createdAt: now
    };
    storageService.saveForUser('documentAnalyses', userId, analysisRecord);

    // 4. Update Document record status to analyzed
    const updatedDoc = storageService.updateForUser('documents', userId, docId, {
      status: 'analyzed',
      documentType: analysisRecord.documentType,
      subject: analysisRecord.subject,
      pages: extractionResult.pageCount || 1,
      analysis: analysisRecord
    });

    res.status(201).json({
      success: true,
      document: updatedDoc,
      analysis: analysisRecord
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/documents/:id - Single document with analysis
router.get('/:id', optionalAuth, (req, res) => {
  try {
    const docs = storageService.findByUser('documents', req.user.id);
    const doc = docs.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

    const analyses = storageService.findByUser('documentAnalyses', req.user.id);
    const analysis = analyses.find(a => a.docId === doc.id) || doc.analysis;

    res.json({ success: true, document: doc, analysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/documents/:id/commit-actions - 1-Click Intelligence Action Commit
router.post('/:id/commit-actions', optionalAuth, (req, res) => {
  try {
    const userId = req.user.id;
    const docs = storageService.findByUser('documents', userId);
    const doc = docs.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

    const analyses = storageService.findByUser('documentAnalyses', userId);
    const analysis = analyses.find(a => a.docId === doc.id) || doc.analysis;

    if (!analysis) {
      return res.status(400).json({ success: false, error: 'Document analysis not ready.' });
    }

    const createdItems = { tasks: [], calendarEvents: [], routineBlocks: [], subjects: [] };

    // Commit Timetable Events
    if (Array.isArray(analysis.timetableEvents) && analysis.timetableEvents.length > 0) {
      analysis.timetableEvents.forEach(item => {
        const rb = storageService.saveForUser('routineBlocks', userId, {
          title: `${item.subject} (${item.type || 'Class'} - ${item.room || 'Hall'})`,
          time: item.startTime || '09:00',
          duration: `${item.startTime} - ${item.endTime}`,
          day: item.day || 'Monday',
          category: 'study'
        });
        createdItems.routineBlocks.push(rb);

        const task = storageService.saveForUser('tasks', userId, {
          text: `Attend ${item.subject} (${item.room || 'Main Hall'})`,
          priority: 'high',
          category: 'study',
          type: 'routine',
          completed: false
        });
        createdItems.tasks.push(task);
      });
    }

    // Commit Exam Schedules
    if (Array.isArray(analysis.exams) && analysis.exams.length > 0) {
      analysis.exams.forEach(ex => {
        const ev = storageService.saveForUser('calendarEvents', userId, {
          title: `EXAM: ${ex.subject} (${ex.type || 'Final'})`,
          date: ex.date || new Date().toISOString().split('T')[0],
          type: 'urgent',
          venue: ex.venue
        });
        createdItems.calendarEvents.push(ev);

        const task = storageService.saveForUser('tasks', userId, {
          text: `Prepare & Revise for ${ex.subject} Exam`,
          priority: 'high',
          category: 'academics',
          completed: false
        });
        createdItems.tasks.push(task);
      });
    }

    // Commit Assignments
    if (Array.isArray(analysis.assignments) && analysis.assignments.length > 0) {
      analysis.assignments.forEach(as => {
        const task = storageService.saveForUser('tasks', userId, {
          text: `Complete ${as.title}`,
          priority: 'high',
          category: 'assignment',
          completed: false,
          dueDate: as.deadline
        });
        createdItems.tasks.push(task);
      });
    }

    res.json({
      success: true,
      message: 'Intelligence actions committed to Tasks, Calendar, and Schedule!',
      createdItems
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', optionalAuth, (req, res) => {
  try {
    const userId = req.user.id;
    const docs = storageService.findByUser('documents', userId);
    const doc = docs.find(d => d.id === req.params.id);

    if (doc && doc.filename) {
      const filePath = path.join(UPLOAD_DIR, doc.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    storageService.deleteForUser('documents', userId, req.params.id);
    res.json({ success: true, message: 'Document removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
