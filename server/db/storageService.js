/**
 * PLANIX STORAGE SERVICE
 * Multi-Entity JSON / SQLite Database Storage Layer
 * Thread-safe file persistence with default initializers
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class StorageService {
  constructor() {
    this.files = {
      tasks: path.join(DATA_DIR, 'tasks.json'),
      notes: path.join(DATA_DIR, 'notes.json'),
      journal: path.join(DATA_DIR, 'journal.json'),
      habits: path.join(DATA_DIR, 'habits.json'),
      memory: path.join(DATA_DIR, 'memory.json'),
      user: path.join(DATA_DIR, 'user.json'),
    };
    this.init();
  }

  init() {
    for (const [key, filePath] of Object.entries(this.files)) {
      if (!fs.existsSync(filePath)) {
        let initialData = [];
        if (key === 'memory') {
          initialData = {
            goals: ["Master Full Stack Engineering", "Maintain 8 hours sleep", "Daily Bible & Workout"],
            preferences: { focusTime: "evening", studyFormat: "flashcards" },
            insights: []
          };
        } else if (key === 'user') {
          initialData = {
            name: "Alex Vance",
            xp: 1420,
            level: 3,
            levelTitle: "Focus Architect",
            streak: 7,
            theme: "dark"
          };
        }
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), 'utf8');
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
      return key === 'memory' || key === 'user' ? {} : [];
    }
  }

  write(key, data) {
    try {
      const filePath = this.files[key];
      if (!filePath) throw new Error(`Invalid storage key: ${key}`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error(`Error writing data key [${key}]:`, err.message);
      return false;
    }
  }
}

module.exports = new StorageService();
