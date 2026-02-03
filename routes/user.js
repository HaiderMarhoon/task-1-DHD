const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Missing fields" });

  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function () {
      res.json({ id: this.lastID, name, email });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;
