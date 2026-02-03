# 🏢 Mini Multi-Tenant Workspace API
A lightweight, multi-tenant workspace and task management API built with Node.js, Express, and SQLite. Ideal for demo purposes, technical interviews, or small internal projects.

## 📌 Features
### 👥 Users
Create new users

Retrieve all users

### 🏢 Workspaces
Create new workspaces

List all workspaces

Add users to specific workspaces

### 📋 Tasks
Create tasks inside a workspace

Retrieve tasks by workspace

Mark tasks as complete

## 📊 Summary
Overview of total users, workspaces, and tasks

Counts of completed vs pending tasks

## 🛠 Tech Stack
### Backend: Node.js + Express

### Database: SQLite (file-based, lightweight, persistent)

### JSON Parsing: Built-in Express JSON middleware

### Testing Tools: Postman, curl, Thunder Client

### 📂 Project Structure
```bash
workspace-api/
│
├── index.js # Main server file
├── db.js # SQLite connection & schema setup
├── package.json
├── database.db # Auto-created SQLite database file
├── routes/
│ ├── users.js # User-related routes
│ ├── workspaces.js # Workspace-related routes
│ ├── tasks.js # Task-related routes
│ └── summary.js # Summary statistics route
└── README.md
```


## ⚡ Setup & Installation
Clone and navigate to project directory

```bash
git clone <your-repo-url>
cd workspace-api
Install dependencies
```
``` bash
npm install
Start the server
```

```bash
node index.js
```
You should see:
``` bash
text
SQLite connected
API running on http://localhost:3000
```
## 📌 Important Note
This API uses Express built-in JSON parsing. All POST/PATCH requests must include the header:

text
Content-Type: application/json
🧪 API Endpoints
Base URL: http://localhost:3000


### 👥 Users
#### Create User

Method: POST /users

Body:
``` bash
json
{
  "name": "Ali",
  "email": "ali@test.com"
}
```

Response:
``` bash
json
{
  "id": 1,
  "name": "Ali",
  "email": "ali@test.com"
}
``` 

#### Get All Users

Method: GET /users

Response:
``` bash 
json
[
  {
    "id": 1,
    "name": "Ali",
    "email": "ali@test.com"
  }
]
```

### 🏢 Workspaces
#### Create Workspace

Method: POST /workspaces

Body:
```bash
json
{
  "name": "Development Team"
}
```


Response:
```bash
json
{
  "id": 1,
  "name": "Development Team"
}
```
#### List Workspaces

Method: GET /workspaces

Response:
```bash
json
[
  {
    "id": 1,
    "name": "Development Team"
  }
]
```

#### Add User to Workspace

Method: POST /workspaces/:id/users

Body:
```bash
json
{
  "userId": 1
}
```
Response:
```bash
json
{
  "message": "User added to workspace"
}
```
### 📋 Tasks
#### Create Task

Method: POST /tasks

Body:
```bash
json
{
  "title": "Set up database",
  "workspaceId": 1
}
```
Response:
```bash
json
{
  "id": 1,
  "title": "Set up database",
  "completed": false
}
```

#### Get Tasks by Workspace

Method: GET /tasks?workspaceId=1

Response:
```bash 
json
[
  {
    "id": 1,
    "title": "Set up database",
    "workspace_id": 1,
    "completed": 0
  }
]
```

#### Mark Task Complete

Method: PATCH /tasks/:id

Response:
```bash 
json
{
  "message": "Task completed"
}
```

### 📊 Summary

#### Get Summary Statistics

Method: GET /summary

Response:
```bash 
json
{
  "users": 2,
  "workspaces": 1,
  "tasks": {
    "total": 5,
    "completed": 2,
    "pending": 3
  }
}
``` 

### 💾 Database Schema
SQLite database file: database.db

Tables defined in db.js:
```bash
sql
-- Users Table
CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
```
```bash
-- Workspaces Table
CREATE TABLE workspaces(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
```
```bash
-- Workspace Users (many-to-many)
CREATE TABLE workspace_users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workspace_id INTEGER,
  user_id INTEGER
);
```

```bash
-- Tasks Table
CREATE TABLE tasks(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  workspace_id INTEGER,
  completed INTEGER DEFAULT 0
);
``` 

## Features:

Data persists across server restarts

Tables auto-created if missing

SQLite provides lightweight persistence

## 🔧 Testing Tips
Using curl:

bash
# Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@test.com"}'
  ```
### Testing Tools:

Postman

Thunder Client (VS Code extension)

Any REST client supporting JSON



## 👤 Author
Haider Marhoon | B.Sc. Cybersecurity Student | University of Bahrain