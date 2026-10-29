from __future__ import annotations

import os
import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("ALUMNI_DB_PATH", BASE_DIR / "alumni.db"))

app = Flask(__name__)
CORS(app)


def get_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_db() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS alumni (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                graduation_year INTEGER,
                branch TEXT NOT NULL DEFAULT '',
                degree TEXT NOT NULL DEFAULT '',
                company TEXT NOT NULL DEFAULT '',
                job_title TEXT NOT NULL DEFAULT '',
                location TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )


def serialize(row: sqlite3.Row) -> dict:
    return dict(row)


def clean_text(value: object, field: str, required: bool = False) -> str:
    if value is None:
        value = ""
    if not isinstance(value, str):
        raise ValueError(f"{field} must be text.")
    value = value.strip()
    if required and not value:
        raise ValueError(f"{field} is required.")
    return value


def validate_payload(payload: object) -> dict:
    if not isinstance(payload, dict):
        raise ValueError("Request body must be a JSON object.")

    full_name = clean_text(payload.get("full_name"), "Full name", True)
    email = clean_text(payload.get("email"), "Email", True).lower()
    if "@" not in email or email.startswith("@") or email.endswith("@"):
        raise ValueError("Enter a valid email address.")

    graduation_year = payload.get("graduation_year")
    if graduation_year in ("", None):
        graduation_year = None
    else:
        try:
            graduation_year = int(graduation_year)
        except (TypeError, ValueError):
            raise ValueError("Graduation year must be a number.") from None
        if graduation_year < 1950 or graduation_year > 2100:
            raise ValueError("Graduation year must be between 1950 and 2100.")

    return {
        "full_name": full_name,
        "email": email,
        "graduation_year": graduation_year,
        "branch": clean_text(payload.get("branch"), "Branch"),
        "degree": clean_text(payload.get("degree"), "Degree"),
        "company": clean_text(payload.get("company"), "Company"),
        "job_title": clean_text(payload.get("job_title"), "Job title"),
        "location": clean_text(payload.get("location"), "Location"),
    }


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "ADC Alumni API"})


@app.get("/api/alumni")
def list_alumni():
    query = request.args.get("q", "").strip()
    with get_db() as connection:
        if query:
            pattern = f"%{query}%"
            rows = connection.execute(
                """
                SELECT * FROM alumni
                WHERE full_name LIKE ? OR email LIKE ? OR company LIKE ?
                   OR branch LIKE ? OR job_title LIKE ? OR location LIKE ?
                ORDER BY full_name COLLATE NOCASE
                """,
                (pattern, pattern, pattern, pattern, pattern, pattern),
            ).fetchall()
        else:
            rows = connection.execute(
                "SELECT * FROM alumni ORDER BY full_name COLLATE NOCASE"
            ).fetchall()
    return jsonify([serialize(row) for row in rows])


@app.get("/api/alumni/<int:alumni_id>")
def get_alumnus(alumni_id: int):
    with get_db() as connection:
        row = connection.execute(
            "SELECT * FROM alumni WHERE id = ?", (alumni_id,)
        ).fetchone()
    if row is None:
        return jsonify({"error": "Alumni record not found."}), 404
    return jsonify(serialize(row))


@app.post("/api/alumni")
def create_alumnus():
    try:
        data = validate_payload(request.get_json(silent=True))
        with get_db() as connection:
            cursor = connection.execute(
                """
                INSERT INTO alumni
                (full_name, email, graduation_year, branch, degree, company, job_title, location)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                tuple(data.values()),
            )
            row = connection.execute(
                "SELECT * FROM alumni WHERE id = ?", (cursor.lastrowid,)
            ).fetchone()
        return jsonify(serialize(row)), 201
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except sqlite3.IntegrityError:
        return jsonify({"error": "An alumni record with this email already exists."}), 409


@app.put("/api/alumni/<int:alumni_id>")
def update_alumnus(alumni_id: int):
    try:
        data = validate_payload(request.get_json(silent=True))
        with get_db() as connection:
            existing = connection.execute(
                "SELECT id FROM alumni WHERE id = ?", (alumni_id,)
            ).fetchone()
            if existing is None:
                return jsonify({"error": "Alumni record not found."}), 404
            connection.execute(
                """
                UPDATE alumni SET
                    full_name = ?, email = ?, graduation_year = ?, branch = ?,
                    degree = ?, company = ?, job_title = ?, location = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """,
                (*data.values(), alumni_id),
            )
            row = connection.execute(
                "SELECT * FROM alumni WHERE id = ?", (alumni_id,)
            ).fetchone()
        return jsonify(serialize(row))
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except sqlite3.IntegrityError:
        return jsonify({"error": "An alumni record with this email already exists."}), 409


if __name__ == "__main__":
    init_db()
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1", port=int(os.environ.get("PORT", "5000")))
