const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  db.run(
    "INSERT INTO workspaces (name) VALUES (?)",
    [name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM workspaces", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/:id/users", (req, res) => {
  const { userId } = req.body;
  const workspaceId = req.params.id;

  if (!userId) return res.status(400).json({ error: "userId required" });

  // verify workspace exists
  db.get(
    "SELECT id FROM workspaces WHERE id = ?",
    [workspaceId],
    (wErr, wRow) => {
      if (wErr) return res.status(500).json({ error: wErr.message });
      if (!wRow) return res.status(404).json({ error: "Workspace not found" });

      // verify user exists
      db.get("SELECT id FROM users WHERE id = ?", [userId], (uErr, uRow) => {
        if (uErr) return res.status(500).json({ error: uErr.message });
        if (!uRow) return res.status(404).json({ error: "User not found" });

        db.run(
          "INSERT INTO workspace_users (workspace_id, user_id) VALUES (?, ?)",
          [workspaceId, userId],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User added to workspace" });
          }
        );
      });
    }
  );
});

module.exports = router;
