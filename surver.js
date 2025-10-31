import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(express.json());

// DB初期化
const db = await open({
  filename: "database.sqlite",
  driver: sqlite3.Database
});
await db.exec("CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, timestamp TEXT)");

app.post("/save", async (req, res) => {
  const { latitude, longitude, timestamp } = req.body;
  await db.run("INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)", [latitude, longitude, timestamp]);
  res.sendStatus(200);
});

app.get("/all", async (req, res) => {
  const rows = await db.all("SELECT * FROM locations ORDER BY id DESC");
  res.json(rows);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
