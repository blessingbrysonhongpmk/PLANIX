/**
 * PLANIX TASKS & KANBAN API ROUTER
 * Full CRUD for tasks, subtasks, routine blocks, and priority management
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');
const aiService = require('../services/aiService');
const { optionalAuth } = require('../middleware/auth');

// GET /api/tasks
router.get('/', optionalAuth, (req, res) => {
  try {
    const tasks = storageService.findByUser('tasks', req.user.id);
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tasks
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { text, priority, category, label, est, type, routineConfig } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'Task title is required' });
    }

    const taskText = text.trim();
    const suggestions = await aiService.getSuggestions(taskText);

    const newTask = storageService.saveForUser('tasks', req.user.id, {
      text: taskText,
      priority: priority || 'medium',
      category: category || aiService.autoTag(taskText),
      label: label || 'General',
      est: est || '30m',
      type: type || 'standard',
      routineConfig: routineConfig || null,
      completed: false,
      streak: 0,
      suggestions
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', optionalAuth, (req, res) => {
  try {
    const updated = storageService.updateForUser('tasks', req.user.id, req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', optionalAuth, (req, res) => {
  try {
    const deleted = storageService.deleteForUser('tasks', req.user.id, req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
