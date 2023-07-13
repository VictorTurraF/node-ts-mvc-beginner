import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const storageFolderPath = './src/storage';
const dbFilePath = path.join(storageFolderPath, 'database.sqlite');

if (!fs.existsSync(storageFolderPath)) {
  fs.mkdirSync(storageFolderPath);
}

if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, '');
}

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;
