/**
 * PLANIX STRATEGIC GOALS API ROUTER
 * Real CRUD persistence for Goals and Milestones with progress tracking
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');
const { optionalAuth } = require('../middleware/auth');

// GET /api/goals
router.get('/', optionalAuth, (req, res) => {
  try {
    const goals = storageService.findByUser('goals', req.user.id);
    res.json({ success: true, goals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/goals
router.post('/', optionalAuth, (req, res) => {
  try {
    const { title, description, priority, targetDate, tags } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Goal title is required' });
    }

    const newGoal = storageService.saveForUser('goals', req.user.id, {
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      progress: 0,
      targetDate: targetDate || 'Dec 2026',
      milestones: { completed: 0, total: 0 },
      tags: Array.isArray(tags) ? tags : ['General'],
      status: 'Active'
    });

    res.status(201).json({ success: true, goal: newGoal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/goals/:id
router.put('/:id', optionalAuth, (req, res) => {
  try {
    const updated = storageService.updateForUser('goals', req.user.id, req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Goal not found' });
    res.json({ success: true, goal: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/goals/:id
router.delete('/:id', optionalAuth, (req, res) => {
  try {
    const deleted = storageService.deleteForUser('goals', req.user.id, req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Goal not found' });
    res.json({ success: true, message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
