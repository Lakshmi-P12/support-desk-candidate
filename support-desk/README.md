# Support Desk — Full-Stack Intern Assessment

A realistic, locally runnable React + Express + SQLite support ticket application for a structured technical interview.

**Candidate setup:** [REQUIREMENTS.md](REQUIREMENTS.md)  
**Candidate tasks:** [candidate/TASKS.md](candidate/TASKS.md)  
**Interviewer instructions:** distributed separately in `interviewer-private/` (do not give to candidates).

## Features
Create, edit, delete and assign tickets; search; filter by priority/status; pagination; summary counts. The candidate version contains **one intentional defect** for Task 1. The export feature is intentionally not implemented.

## Run
```bash
npm install
npm run install:all
npm run dev
```
Frontend: http://127.0.0.1:5173 · Backend: http://127.0.0.1:4000

## Repo layout
- `client/`: React UI with Vite
- `server/`: Express API and local SQLite persistence
- `candidate/`: candidate-facing instructions
- `interviewer-private/`: confidential answer key, test plan, scorecard
- `scripts/`: environment verification

**Security:** The app is a local exercise, not a production helpdesk. It has no authentication and should not be deployed publicly.
