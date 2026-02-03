const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/user");
const workspaces = require("./routes/workspaces");
const tasks = require("./routes/tasks");
const summary = require("./routes/summary");

const app = express();
app.use(bodyParser.json());

app.use("/users", users);
app.use("/workspaces", workspaces);
app.use("/tasks", tasks);
app.use("/summary", summary);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
