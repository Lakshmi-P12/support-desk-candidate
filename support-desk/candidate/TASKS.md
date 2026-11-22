# Candidate instructions — read only the task assigned by the interviewer

You have 75 minutes including final discussion. Explain your approach while you work. You may consult official documentation throughout. Do not open private interviewer files.

## Task 1 — Debugging (25 min, NO AI)
**User report:** "When I move to a later page of tickets and then filter to high-priority tickets, I sometimes get an empty list even though matching tickets exist."
Reproduce, identify root cause, implement a minimal fix, and explain how you verified it. Do not use AI tools.

## Task 2 — UI refinement (20 min, NO AI)
Improve the ticket dashboard presentation in a way you choose (e.g., spacing, responsive layout, status badges, hierarchy, accessible labels). **Do not alter backend endpoints, data contracts, or existing business behavior.** Demonstrate that create/edit/delete, filters, search, and pagination still work. Do not use AI tools.

## Task 3 — CSV export (25 min, AI ALLOWED)
Add a button to download **all tickets** as UTF-8 CSV, including all pages and regardless of current UI filters. Include columns in this order: `id,title,priority,status,created_at,assignee`. Implement `GET /api/tickets/export` and an accessible frontend download control. Properly quote/escape CSV fields containing commas, quotes, and newlines. Return `Content-Type: text/csv; charset=utf-8` and `Content-Disposition: attachment; filename="tickets.csv"`. You may use AI but must explain and verify all generated code.

## Final discussion (5 min)
Walk through your changes, tests, tradeoffs, and what you would improve with more time. State where AI was used in Task 3.

## Rules
- Save your work locally and be prepared to show a Git diff.
- Ask clarifying questions as needed.
- Do not introduce authentication, external paid services, or major dependencies.
- Prioritize correctness, usability, and preserving existing behavior over cosmetic complexity.
