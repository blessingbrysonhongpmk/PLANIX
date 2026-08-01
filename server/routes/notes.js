/**
 * PLANIX SMART NOTES API ROUTER
 * Rich text / markdown notes, voice notes, folders, version history & AI tools
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');
const aiService = require('../services/aiService');

// GET /api/notes
router.get('/', (req, res) => {
  try {
    const notes = storageService.read('notes');
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notes
router.post('/', (req, res) => {
  try {
    const { title, content, folder, tags, isPinned, isArchived, audioUrl } = req.body;
    const notes = storageService.read('notes');

    const newNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: title || 'Untitled Note',
      content: content || '',
      folder: folder || 'General',
      tags: tags || ['general'],
      isPinned: isPinned || false,
      isArchived: isArchived || false,
      audioUrl: audioUrl || null,
      versions: [
        { timestamp: new Date().toISOString(), title: title || 'Untitled Note', content: content || '' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.unshift(newNote);
    storageService.write('notes', notes);

    res.status(201).json({ success: true, note: newNote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/notes/:id
router.put('/:id', (req, res) => {
  try {
    const notes = storageService.read('notes');
    const idx = notes.findIndex(n => n.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Note not found' });

    const note = notes[idx];
    if (req.body.content && req.body.content !== note.content) {
      note.versions = note.versions || [];
      note.versions.unshift({
        timestamp: new Date().toISOString(),
        title: req.body.title || note.title,
        content: req.body.content,
      });
      if (note.versions.length > 10) note.versions.pop(); // Keep top 10 snapshots
    }

    Object.assign(note, req.body, { updatedAt: new Date().toISOString() });
    storageService.write('notes', notes);

    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', (req, res) => {
  try {
    let notes = storageService.read('notes');
    notes = notes.filter(n => n.id !== req.params.id);
    storageService.write('notes', notes);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notes/:id/ai-action  (Summarize, Flashcards, Quiz)
router.post('/:id/ai-action', async (req, res) => {
  try {
    const { action } = req.body;
    const notes = storageService.read('notes');
    const note = notes.find(n => n.id === req.params.id);
    if (!note) return res.status(404).json({ success: false, error: 'Note not found' });

    const result = await aiService.processNoteContent(action, note.content);
    res.json({ success: true, action, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
