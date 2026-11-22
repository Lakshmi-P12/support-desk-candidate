import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
const filename = process.env.DB_PATH || './server/data/tickets.db';
fs.mkdirSync(path.dirname(filename), { recursive: true });
export const db = new Database(filename);
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS tickets (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
 priority TEXT NOT NULL CHECK(priority IN ('low','medium','high')),
 status TEXT NOT NULL CHECK(status IN ('open','in_progress','resolved')),
 assignee TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);
const count = db.prepare('SELECT COUNT(*) AS n FROM tickets').get().n;
if (count === 0) {
 const insert = db.prepare('INSERT INTO tickets(title,description,priority,status,assignee,created_at) VALUES(?,?,?,?,?,?)');
 const priorities = ['low','medium','high'];
 const statuses = ['open','in_progress','resolved'];
 const agents = ['Alex','Sam','Taylor','Jordan','Morgan'];
 const seed = db.transaction(() => {
   for (let i=1;i<=36;i++) insert.run(`Support request ${i}`,`Customer issue number ${i}`,priorities[i%3],statuses[i%3],agents[i%5],`2026-10-${String(1+(i%28)).padStart(2,'0')} 09:30:00`);
 });
 seed();
}
