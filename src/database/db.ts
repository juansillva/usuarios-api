import Database from "better-sqlite3";

const db = new Database(__dirname + '/usuario.db');

db.prepare(
    `
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
    )
    `
).run();

export default db;