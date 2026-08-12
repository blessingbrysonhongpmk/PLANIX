/**
 * PLANIX AUTHENTICATION ROUTER
 * Registration, Login, Profile, and Token verification
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const storageService = require('../db/storageService');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

let bcrypt = null;
try { bcrypt = require('bcryptjs'); } catch { console.warn('bcryptjs fallback to crypto sha256'); }

async function hashPassword(password) {
  if (bcrypt) {
    return await bcrypt.hash(password, 10);
  }
  return crypto.createHash('sha256').update(password + '_planix_salt').digest('hex');
}

async function comparePassword(password, hashed) {
  if (bcrypt) {
    return await bcrypt.compare(password, hashed);
  }
  const calc = crypto.createHash('sha256').update(password + '_planix_salt').digest('hex');
  return calc === hashed;
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, semester, major } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    const users = storageService.read('users');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    const hashedPassword = await hashPassword(password);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();

    const newUser = {
      id: userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'Student',
      semester: semester || 'Sem 1',
      major: major || 'Computer Science',
      xp: 0,
      level: 1,
      levelTitle: 'Novice Builder',
      streak: 0,
      createdAt: now,
      updatedAt: now
    };

    users.unshift(newUser);
    storageService.write('users', users);

    // Initialize user profile record
    const profiles = storageService.read('profiles');
    profiles.unshift({
      id: `prof_${userId}`,
      userId: userId,
      name: newUser.name,
      email: newUser.email,
      bio: 'Ready to master studies and productivity.',
      avatarUrl: '',
      cgpa: 0,
      targetCgpa: 4.0,
      department: newUser.major,
      semester: newUser.semester,
      createdAt: now,
      updatedAt: now
    });
    storageService.write('profiles', profiles);

    // Issue JWT token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '30d' });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const users = storageService.read('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  try {
    const users = storageService.read('users');
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const profiles = storageService.read('profiles');
    const profile = profiles.find(p => p.userId === req.user.id) || {};

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: {
        ...userWithoutPassword,
        profile
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { name, semester, major, bio, targetCgpa } = req.body;
    const users = storageService.read('users');
    const userIdx = users.findIndex(u => u.id === req.user.id);

    if (userIdx === -1) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const now = new Date().toISOString();
    if (name) users[userIdx].name = name.trim();
    if (semester) users[userIdx].semester = semester;
    if (major) users[userIdx].major = major;
    users[userIdx].updatedAt = now;

    storageService.write('users', users);

    // Update Profile entity
    const profiles = storageService.read('profiles');
    let profileIdx = profiles.findIndex(p => p.userId === req.user.id);
    if (profileIdx === -1) {
      profiles.unshift({
        id: `prof_${req.user.id}`,
        userId: req.user.id,
        name: users[userIdx].name,
        email: users[userIdx].email,
        bio: bio || '',
        semester: users[userIdx].semester,
        targetCgpa: targetCgpa || 4.0,
        createdAt: now,
        updatedAt: now
      });
    } else {
      if (name) profiles[profileIdx].name = name.trim();
      if (semester) profiles[profileIdx].semester = semester;
      if (bio !== undefined) profiles[profileIdx].bio = bio;
      if (targetCgpa !== undefined) profiles[profileIdx].targetCgpa = parseFloat(targetCgpa);
      profiles[profileIdx].updatedAt = now;
    }
    storageService.write('profiles', profiles);

    const { password: _, ...userWithoutPassword } = users[userIdx];
    res.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
