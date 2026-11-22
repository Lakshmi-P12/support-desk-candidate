# Local requirements and setup

## Prerequisites
- Node.js 22 LTS and npm 10+ (use `nvm use` if available)
- Git and a code editor
- Modern browser (Chrome, Firefox, Edge)
- Internet access for first-time npm installation and documentation; AI usage follows task rules
- Windows 10/11, macOS, or Linux; approximately 1 GB free space
- No external database installation: SQLite is embedded via `better-sqlite3`

## Installation
```bash
npm install
npm run install:all
npm run dev
```
Open http://127.0.0.1:5173. API health: http://127.0.0.1:4000/api/health.
The database is created and seeded automatically on first server startup.

## Test and reset
```bash
npm test
npm run build --prefix client
```
To reset seeded data, stop the server and delete `server/data/tickets.db` (plus any `-wal`/`-shm` files), then restart. Never delete while server is running.

## Troubleshooting
- Port 4000 or 5173 occupied: stop the other process; keep the documented ports for the assessment.
- Native SQLite module fails to install: verify Node 22 and npm; reinstall dependencies. On some platforms, C++ build tools may be required.
- `Failed to fetch`: ensure backend is running at port 4000.
- On Windows, use PowerShell for commands; `.nvmrc` is optional if nvm is unavailable.

## Interview rule
Do not open interviewer-only material. The interviewer provides task instructions in sequence. Do not use AI for Tasks 1 and 2; AI is permitted for Task 3. Official framework documentation is permitted throughout.
