const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.serialize(() => {
    db.get("SELECT COUNT(*) as users FROM users", (_, u) => {
      db.get("SELECT COUNT(*) as workspaces FROM workspaces", (_, w) => {
        db.get("SELECT COUNT(*) as total FROM tasks", (_, t) => {
          db.get(
            "SELECT COUNT(*) as completed FROM tasks WHERE completed = 1",
            (_, c) => {
              res.json({
                users: u.users,
                workspaces: w.workspaces,
                tasks: {
                  total: t.total,
                  completed: c.completed,
                  pending: t.total - c.completed
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
