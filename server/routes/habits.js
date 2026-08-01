/**
 * PLANIX HABIT TRACKER API ROUTER
 * CRUD operations for habits, completion check-ins, streaks & analytics
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// GET /api/habits
router.get('/', (req, res) => {
  try {
    const habits = storageService.read('habits');
    res.json({ success: true, habits });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/habits
router.post('/', (req, res) => {
  try {
    const { title, category, frequency, targetDays } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Habit title is required' });
    }

    const habits = storageService.read('habits');
    const newHabit = {
      id: `hbt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: title.trim(),
      category: category || 'health',
      frequency: frequency || 'daily',
      streak: 0,
      completionHistory: {}, // { "2026-08-01": true }
      createdAt: new Date().toISOString(),
    };

    habits.unshift(newHabit);
    storageService.write('habits', habits);

    res.status(201).json({ success: true, habit: newHabit });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/habits/:id/checkin
router.post('/:id/checkin', (req, res) => {
  try {
    const habits = storageService.read('habits');
    const habit = habits.find(h => h.id === req.params.id);
    if (!habit) return res.status(404).json({ success: false, error: 'Habit not found' });

    const today = todayStr();
    habit.completionHistory = habit.completionHistory || {};

    if (habit.completionHistory[today]) {
      delete habit.completionHistory[today];
      habit.streak = Math.max(0, (habit.streak || 1) - 1);
    } else {
      habit.completionHistory[today] = true;
      habit.streak = (habit.streak || 0) + 1;
    }

    storageService.write('habits', habits);
    res.json({ success: true, habit });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/habits/:id
router.delete('/:id', (req, res) => {
  try {
    let habits = storageService.read('habits');
    habits = habits.filter(h => h.id !== req.params.id);
    storageService.write('habits', habits);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
