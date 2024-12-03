const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos SQLite.");
  }
});


db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT
);
`);

module.exports = db;
