const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('portfolio.db');

// Buat tabel jika belum ada
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    link TEXT
  )`);
});

module.exports = db;
