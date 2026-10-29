# ADC — Alumni Information Management Platform

A dedicated **web-based** project for the Advances in Computing (ADC) PBL assignment. This repository is separate from the existing Java Alumni project used for another subject.

## Technology stack

- React + Vite frontend
- Python Flask JSON API
- SQLite persistent database

See [Technology Stack Decision](docs/TECH_STACK.md), [ADC Topic Approval](docs/ADC_TOPIC_APPROVAL.md), [Project Scope](docs/PROJECT_SCOPE.md), [Requirements Traceability](docs/REQUIREMENTS_TRACEABILITY.md), [Phase 1 Acceptance Criteria](docs/PHASE_1_ACCEPTANCE.md), and [Phase Tracker](docs/PHASE_TRACKER.md).

## Run locally

Prerequisites: Python 3.10+ and Node.js 18+ (with npm).

### 1. Start the backend

From the repository root:

```bash
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
# macOS/Linux alternative
# source .venv/bin/activate

pip install -r backend/requirements.txt
python backend/app.py
```

The API listens at `http://127.0.0.1:5000`. Keep this terminal running.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Vite proxies `/api` requests to the Flask backend.

## Current scaffold

The first implementation scaffold includes a React directory UI, add/edit profile form, search, Flask API endpoints, and SQLite persistence. **This scaffold has not been run or tested in the user's environment yet.** Do not treat it as verified until the dependencies are installed, the frontend build succeeds, and the acceptance checks are run.

## Development guardrails

- Use fictional sample data only.
- Do not claim authentication, production security, public deployment, analytics, mentor matching, events, or job/referral features unless implemented and verified.
- Do not copy code, tests, commits, screenshots, or evidence from the separate Java Alumni repository.
- Report real test results and actual limitations honestly.
