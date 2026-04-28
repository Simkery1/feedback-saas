# PM Tech — Session 1
## AI Technical Constraints

You are generating code for a Product Management training program.

The goal of this session is to initialize a minimal frontend project and help participants understand the structure of a modern web application.

This is a training environment.  
Simplicity and clarity are more important than engineering sophistication.

---

# Session Scope

This session focuses ONLY on the frontend.

Do not generate backend code.

The goal is to:
- initialize a React frontend
- keep the architecture simple
- help participants understand the project structure

---

# Required Tech Stack

You must strictly follow this stack:

- React
- Vite
- JavaScript only (no TypeScript)

Do not change the stack.

---

# Project Structure

The project root is:

feedback-saas/

Inside the project there must be a folder:

frontend/

The React application must be generated inside the `frontend` folder.

Expected structure example:

feedback-saas/
  frontend/
    src/
    package.json
    vite.config.js
    index.html

Do not create other top-level folders.

---

# UI Scope

Generate a minimal UI for a Feedback SaaS.

The interface must include:

- A title: "Feedback Hub"
- One input field labeled "Idea title"
- One submit button
- A list displaying submitted ideas

Ideas must be stored using React local state (useState).

There must be:

- No backend communication
- No database
- No API calls
- No authentication
- No persistence

Everything stays in local state.

---

# Code Simplicity

The code must be easy to read for non-developers.

Requirements:

- Use simple React patterns
- Prefer a single main component
- Add short comments explaining the code
- Avoid complex abstractions
- Avoid unnecessary files

The goal is educational clarity.

---

# Forbidden Elements

Do NOT introduce:

- TypeScript
- Express
- Backend logic
- Databases
- Authentication
- Redux or other state libraries
- UI frameworks (Tailwind, Material UI, Bootstrap)
- Docker
- CI/CD configuration
- Deployment configuration

Keep everything minimal.

---


# Important Reminder

This project is built step by step across multiple training sessions.

Do NOT anticipate future sessions.

Only generate what is strictly required for a minimal frontend prototype.
