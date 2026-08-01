/**
 * PLANIX ANALYTICS & STATS ROUTER
 * Computes productivity scores, focus time allocation, streaks & user XP
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');

// GET /api/analytics/overview
router.get('/overview', (req, res) => {
  try {
    const tasks = storageService.read('tasks') || [];
    const habits = storageService.read('habits') || [];
    const notes = storageService.read('notes') || [];
    const journal = storageService.read('journal') || [];
    const user = storageService.read('user') || {};

    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const totalTasks = tasks.length || 1;

    const completionRate = Math.round((completedTasks / totalTasks) * 100);
    const productivityScore = Math.min(100, Math.max(20, completionRate + (habits.length * 4)));

    res.json({
      success: true,
      stats: {
        productivityScore,
        completedTasks,
        pendingTasks,
        totalNotes: notes.length,
        activeHabits: habits.length,
        journalEntries: journal.length,
        xp: user.xp || 1420,
        level: user.level || 3,
        levelTitle: user.levelTitle || 'Focus Architect',
        streak: user.streak || 7
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
