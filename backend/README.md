# Flask API

## Setup

From the repository root:

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate

pip install -r backend/requirements.txt
python backend/app.py
```

The API starts at `http://127.0.0.1:5000`. SQLite data is stored in `backend/alumni.db` by default and that file is generated on first run.

## Endpoints

- `GET /api/health`
- `GET /api/alumni?q=search-term`
- `GET /api/alumni/<id>`
- `POST /api/alumni`
- `PUT /api/alumni/<id>`

Do not use real personal alumni data during development. Authentication and production deployment are not implemented in this scaffold.

## Backend tests

From the repository root, after installing requirements:

```bash
cd backend
python -m unittest test_api.py -v
```

These tests use a temporary SQLite database and cover health, create/read, search, update, missing records, required-field validation, duplicate email, and invalid graduation year. They have been added but have **not yet been executed in this environment**.
