/**
 * Vercel Serverless Function Handler Entry Point
 * Exports Express app directly to handle /api/* and all rewrites cleanly.
 */
const app = require('../server.js');

module.exports = app;
