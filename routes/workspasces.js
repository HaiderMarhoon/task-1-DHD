const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  db.run(
    "INSERT INTO workspaces (name) VALUES (?)",
    [name],
    function () {
      res.json({ id: this.lastID, name });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM workspaces", [], (err, rows) => {
    res.json(rows);
  });
});

router.post("/:id/users", (req, res) => {
  const { userId } = req.body;

  db.run(
    "INSERT INTO workspace_users (workspace_id, user_id) VALUES (?, ?)",
    [req.params.id, userId],
    () => res.json({ message: "User added to workspace" })
  );
});

module.exports = router;
