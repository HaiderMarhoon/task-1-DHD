🏢 Mini Multi-Tenant Workspace API

A lightweight, multi-tenant workspace and task management API built with Node.js, Express, and SQLite.

It supports:

User management

Workspaces

Tasks

Summary statistics (completed vs pending tasks)

This API is ideal for demo purposes, interviews, or small internal projects.

📌 Features
Users

Create new users

Retrieve all users

Workspaces

Create new workspaces

List workspaces

Add users to specific workspaces

Tasks

Create tasks inside a workspace

Retrieve tasks by workspace

Mark tasks as complete

Summary

Overview of total users, workspaces, tasks

Counts of completed vs pending tasks

🛠 Tech Stack

Backend: Node.js + Express

Database: SQLite (local file-based, lightweight, persistent)

JSON Parsing: Built-in Express JSON middleware

Testing Tools: Postman, curl, Thunder Client

📂 Project Structure
workspace-api/
│
├── index.js           # Main server file
├── db.js              # SQLite connection & schema
├── package.json
├── database.db        # Auto-created SQLite database file
├── routes/
│   ├── users.js       # User-related routes
│   ├── workspaces.js  # Workspace-related routes
│   ├── tasks.js       # Task-related routes
│   └── summary.js     # Summary statistics route
└── README.md

⚡ Setup & Installation

1️⃣ Clone the repository

git clone <your-repo-url>
cd workspace-api


2️⃣ Install dependencies

npm install


3️⃣ Start the server

node index.js


You should see:

SQLite connected
API running on http://localhost:3000

📌 Middleware Note

This API uses Express built-in JSON parsing, so all POST requests must include the header:

Content-Type: application/json

🧪 API Endpoints
Base URL
http://localhost:3000

1️⃣ Users
Create User
POST /users


Body Example:

{
  "name": "Ali",
  "email": "ali@test.com"
}


Response Example:

{
  "id": 1,
  "name": "Ali",
  "email": "ali@test.com"
}

Get All Users
GET /users


Response Example:

[
  {
    "id": 1,
    "name": "Ali",
    "email": "ali@test.com"
  }
]

2️⃣ Workspaces
Create Workspace
POST /workspaces


Body Example:

{
  "name": "Development Team"
}


Response Example:

{
  "id": 1,
  "name": "Development Team"
}

List Workspaces
GET /workspaces


Response Example:

[
  {
    "id": 1,
    "name": "Development Team"
  }
]

Add User to Workspace
POST /workspaces/:id/users


Body Example:

{
  "userId": 1
}


Response Example:

{
  "message": "User added to workspace"
}

3️⃣ Tasks
Create Task
POST /tasks


Body Example:

{
  "title": "Set up database",
  "workspaceId": 1
}


Response Example:

{
  "id": 1,
  "title": "Set up database",
  "completed": false
}

Get Tasks by Workspace
GET /tasks?workspaceId=1


Response Example:

[
  {
    "id": 1,
    "title": "Set up database",
    "workspace_id": 1,
    "completed": 0
  }
]

Mark Task Complete
PATCH /tasks/:id


Response Example:

{
  "message": "Task completed"
}

4️⃣ Summary
GET /summary


Response Example:

{
  "users": 2,
  "workspaces": 1,
  "tasks": {
    "total": 5,
    "completed": 2,
    "pending": 3
  }
}

💾 Database Details

SQLite database file: database.db
Tables and schema (defined in db.js):

-- Users Table
CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- Workspaces Table
CREATE TABLE workspaces(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- Workspace Users (many-to-many)
CREATE TABLE workspace_users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workspace_id INTEGER,
  user_id INTEGER
);

-- Tasks Table
CREATE TABLE tasks(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  workspace_id INTEGER,
  completed INTEGER DEFAULT 0
);


Data persists across server restarts

Tables are auto-created if missing

🔧 Testing Tips

Use Postman, curl, or Thunder Client

All POST requests must include JSON headers

Example curl command:

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Ali","email":"ali@test.com"}'

⚙️ Optional Improvements

Authentication with JWT or OAuth2

Task deadlines / priority / labels

MVC separation (services, controllers, routes)

Pagination for tasks, users, workspaces

Error handling with custom middleware

👏 Interview / Demo Notes

/ route shows “Cannot GET /” — intentional, API is REST-focused

Multi-tenant logic is handled via workspace IDs

SQLite chosen for lightweight persistence

Strong talking point: “All workspace data is separated by workspace_id, enabling multi-tenancy without a heavy database.”

👤 Author

Haider Marhoon | B.Sc. Cybersecurity Student | University of Bahrain