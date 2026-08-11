/**
 * Planix — AI Personal Life Operating System
 * ─────────────────────────────────────────────────────────
 * Core Express Backend Application Entry Point
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const tasksRouter = require('./server/routes/tasks');
const notesRouter = require('./server/routes/notes');
const journalRouter = require('./server/routes/journal');
const habitsRouter = require('./server/routes/habits');
const aiRouter = require('./server/routes/ai');
const analyticsRouter = require('./server/routes/analytics');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares & Security Headers
app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
// Mount Modular API Routes FIRST before static assets
app.use('/api/tasks', tasksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/journal', journalRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/analytics', analyticsRouter);

// Health Endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Planix Life OS', timestamp: new Date().toISOString() });
});

// API 404 Fallback Handler
app.use('/api/*', (_req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Static Assets & SPA Fallback
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server with Automatic Port Fallback
if (require.main === module) {
  function startServer(portToUse) {
    const server = app.listen(portToUse, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║  ✨ Planix — AI Personal Life Operating System ║
║                                                ║
║  🚀 Running at : http://localhost:${portToUse}        ║
║  📁 Storage    : JSON / SQLite Data Layer      ║
║  🤖 Multi-AI   : Active & Online               ║
║                                                ║
╚════════════════════════════════════════════════╝
      `);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${portToUse} is in use. Trying port ${portToUse + 1}...`);
        startServer(portToUse + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  }

  startServer(PORT);
}

module.exports = app;
