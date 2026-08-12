/**
 * PLANIX ACADEMIC OPERATING SYSTEM API ROUTER
 * Handles Subjects, Exams, Assignments, Attendance, CGPA and Timetable
 */

const express = require('express');
const router = express.Router();
const storageService = require('../db/storageService');
const { optionalAuth } = require('../middleware/auth');

// GET /api/academics/overview
router.get('/overview', optionalAuth, (req, res) => {
  try {
    const userId = req.user.id;
    const subjects = storageService.findByUser('subjects', userId);
    const exams = storageService.findByUser('exams', userId);
    const assignments = storageService.findByUser('assignments', userId);
    const attendance = storageService.findByUser('attendanceRecords', userId);
    const routineBlocks = storageService.findByUser('routineBlocks', userId);
    const profiles = storageService.findByUser('profiles', userId);
    const profile = profiles[0] || { cgpa: 0, targetCgpa: 4.0 };

    res.json({
      success: true,
      subjects,
      exams,
      assignments,
      attendance,
      routineBlocks,
      cgpa: profile.cgpa || 0,
      targetCgpa: profile.targetCgpa || 4.0
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/academics/subjects
router.post('/subjects', optionalAuth, (req, res) => {
  try {
    const { name, code, credits, professor } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Subject name is required' });
    }

    const newSub = storageService.saveForUser('subjects', req.user.id, {
      name: name.trim(),
      code: code ? code.toUpperCase() : 'CS101',
      credits: credits || 3,
      professor: professor || 'Faculty',
      attendancePercentage: 100
    });

    res.status(201).json({ success: true, subject: newSub });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/academics/exams
router.post('/exams', optionalAuth, (req, res) => {
  try {
    const { subject, date, venue, type } = req.body;
    if (!subject) return res.status(400).json({ success: false, error: 'Subject is required' });

    const newExam = storageService.saveForUser('exams', req.user.id, {
      subject,
      date: date || new Date().toISOString().split('T')[0],
      venue: venue || 'Hall A',
      type: type || 'Semester Final'
    });

    // Automatically create a calendar event for the exam
    storageService.saveForUser('calendarEvents', req.user.id, {
      title: `EXAM: ${subject}`,
      date: newExam.date,
      type: 'urgent',
      venue: newExam.venue
    });

    res.status(201).json({ success: true, exam: newExam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
