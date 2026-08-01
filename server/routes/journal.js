/**
 * PLANIX AI JOURNAL API ROUTER
 * Daily Journal entries, mood logger, emotion analysis & weekly reflections
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');

// GET /api/journal
router.get('/', (req, res) => {
  try {
    const journal = storageService.read('journal');
    res.json({ success: true, journal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/journal
router.post('/', (req, res) => {
  try {
    const { mood, moodScore, entryText, Reflection } = req.body;
    const journal = storageService.read('journal');

    const newEntry = {
      id: `jrn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toISOString().slice(0, 10),
      mood: mood || 'Peaceful', // 'Excited' | 'Peaceful' | 'Neutral' | 'Stressed' | 'Exhausted'
      moodScore: moodScore || 4, // 1 - 5
      entryText: entryText || '',
      aiReflection: Reflection || '🌟 Consistent reflection builds emotional resilience. Keep recording daily wins!',
      createdAt: new Date().toISOString(),
    };

    journal.unshift(newEntry);
    storageService.write('journal', journal);

    res.status(201).json({ success: true, entry: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
