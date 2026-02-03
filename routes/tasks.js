const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { title, workspaceId } = req.body;
  if (!title || !workspaceId)
    return res.status(400).json({ error: "Missing data" });

  db.run(
    "INSERT INTO tasks (title, workspace_id) VALUES (?, ?)",
    [title, workspaceId],
    function () {
      res.json({ id: this.lastID, title, completed: false });
    }
  );
});

router.get("/", (req, res) => {
  const { workspaceId } = req.query;

  db.all(
    "SELECT * FROM tasks WHERE workspace_id = ?",
    [workspaceId],
    (err, rows) => res.json(rows)
  );
});

router.patch("/:id", (req, res) => {
  db.run(
    "UPDATE tasks SET completed = 1 WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Task completed" })
  );
});

module.exports = router;
