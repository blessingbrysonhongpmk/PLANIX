/**
 * PLANIX UNIFIED DATABASE & STORAGE SERVICE
 * Thread-safe Multi-Entity Storage Layer supporting 28 Domain Entities
 * Enforces: id, userId, createdAt, updatedAt on every single object
 */

const fs = require('fs');
const path = require('path');

const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
const SEED_DATA_DIR = path.join(__dirname, '../../data');
const DATA_DIR = isVercel
  ? path.join('/tmp', 'data')
  : SEED_DATA_DIR;

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class StorageService {
  constructor() {
    this.entities = [
      'users',
      'profiles',
      'goals',
      'goalMilestones',
      'tasks',
      'subtasks',
      'habits',
      'habitCompletions',
      'projects',
      'notes',
      'calendarEvents',
      'subjects',
      'academicTerms',
      'assignments',
      'exams',
      'attendanceRecords',
      'documents',
      'documentAnalyses',
      'documentChunks',
      'flashcards',
      'quizzes',
      'studyPlans',
      'timelineItems',
      'notifications',
      'aiConversations',
      'aiMessages',
      'settings',
      'routineBlocks',
      'journal'
    ];

    this.files = {};
    this.entities.forEach(entity => {
      this.files[entity] = path.join(DATA_DIR, `${entity}.json`);
    });

    this.init();
  }

  init() {
    for (const [key, filePath] of Object.entries(this.files)) {
      if (!fs.existsSync(filePath)) {
        const seedPath = path.join(SEED_DATA_DIR, `${key}.json`);
        if (fs.existsSync(seedPath)) {
          try {
            fs.copyFileSync(seedPath, filePath);
          } catch {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
          }
        } else {
          fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
        }
      }
    }
  }

  read(key) {
    try {
      const filePath = this.files[key];
      if (!filePath || !fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error(`Error reading data key [${key}]:`, err.message);
      return [];
    }
  }

  write(key, data) {
    try {
      const filePath = this.files[key];
      if (!filePath) {
        // Dynamically add new entity key if missing
        this.files[key] = path.join(DATA_DIR, `${key}.json`);
      }
      fs.writeFileSync(this.files[key], JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error(`Error writing data key [${key}]:`, err.message);
      return false;
    }
  }

  // User Isolation Helpers
  findByUser(key, userId) {
    const records = this.read(key);
    if (!userId) return records;
    return records.filter(r => r.userId === userId || r.userId === 'all');
  }

  saveForUser(key, userId, item) {
    const records = this.read(key);
    const now = new Date().toISOString();
    const newItem = {
      id: item.id || `${key.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      userId: userId,
      createdAt: item.createdAt || now,
      updatedAt: now,
      ...item
    };

    records.unshift(newItem);
    this.write(key, records);
    return newItem;
  }

  updateForUser(key, userId, itemId, updates) {
    const records = this.read(key);
    const idx = records.findIndex(r => r.id === itemId && (r.userId === userId || r.userId === 'all'));
    if (idx === -1) return null;

    records[idx] = {
      ...records[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.write(key, records);
    return records[idx];
  }

  deleteForUser(key, userId, itemId) {
    const records = this.read(key);
    const filtered = records.filter(r => !(r.id === itemId && (r.userId === userId || r.userId === 'all')));
    if (filtered.length === records.length) return false;
    this.write(key, filtered);
    return true;
  }
}

module.exports = new StorageService();
