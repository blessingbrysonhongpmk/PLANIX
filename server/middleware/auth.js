/**
 * PLANIX AUTHENTICATION MIDDLEWARE
 * Verifies JWT tokens in Authorization: Bearer <token> header.
 */

const jwt = require('jsonwebtoken');
const storageService = require('../db/storageService');

const JWT_SECRET = process.env.JWT_SECRET || 'planix_super_secret_jwt_key_2026';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required. Please login.' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired session token.' });
    }

    const users = storageService.read('users');
    const currentUser = users.find(u => u.id === userPayload.userId);

    if (!currentUser) {
      return res.status(401).json({ success: false, error: 'User account not found.' });
    }

    req.user = {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      role: currentUser.role || 'Student'
    };

    next();
  });
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = { id: 'default_guest', email: 'guest@planix.local', name: 'Guest User', role: 'Student' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      req.user = { id: 'default_guest', email: 'guest@planix.local', name: 'Guest User', role: 'Student' };
    } else {
      const users = storageService.read('users');
      const currentUser = users.find(u => u.id === userPayload.userId);
      req.user = currentUser 
        ? { id: currentUser.id, email: currentUser.email, name: currentUser.name, role: currentUser.role || 'Student' }
        : { id: 'default_guest', email: 'guest@planix.local', name: 'Guest User', role: 'Student' };
    }
    next();
  });
}

module.exports = {
  authenticateToken,
  optionalAuth,
  JWT_SECRET
};
