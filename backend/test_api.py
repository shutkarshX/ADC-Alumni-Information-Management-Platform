import os
import tempfile
import unittest
from pathlib import Path

_TEMP_DIR = tempfile.TemporaryDirectory()
os.environ["ALUMNI_DB_PATH"] = str(Path(_TEMP_DIR.name) / "test_alumni.db")

from app import app, init_db, get_db  # noqa: E402


class AlumniApiTests(unittest.TestCase):
    def setUp(self):
        init_db()
        with get_db() as connection:
            connection.execute("DELETE FROM alumni")
        self.client = app.test_client()

    def sample(self, **overrides):
        data = {
            "full_name": "Aarav Mehta",
            "email": "aarav@example.test",
            "graduation_year": 2023,
            "branch": "Computer Science",
            "degree": "B.Tech",
            "company": "Example Labs",
            "job_title": "Software Engineer",
            "location": "Delhi",
        }
        data.update(overrides)
        return data

    def test_health_endpoint(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "ok")

    def test_create_and_get_profile(self):
        created = self.client.post("/api/alumni", json=self.sample())
        self.assertEqual(created.status_code, 201)
        alumni_id = created.get_json()["id"]
        fetched = self.client.get(f"/api/alumni/{alumni_id}")
        self.assertEqual(fetched.status_code, 200)
        self.assertEqual(fetched.get_json()["email"], "aarav@example.test")

    def test_search_matches_name_and_company(self):
        self.client.post("/api/alumni", json=self.sample())
        response = self.client.get("/api/alumni?q=Example")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 1)

    def test_unknown_profile_returns_404(self):
        response = self.client.get("/api/alumni/9999")
        self.assertEqual(response.status_code, 404)

    def test_missing_name_is_rejected(self):
        response = self.client.post("/api/alumni", json=self.sample(full_name=" "))
        self.assertEqual(response.status_code, 400)

    def test_duplicate_email_is_rejected(self):
        self.client.post("/api/alumni", json=self.sample())
        response = self.client.post(
            "/api/alumni",
            json=self.sample(full_name="Another Person"),
        )
        self.assertEqual(response.status_code, 409)

    def test_update_profile(self):
        created = self.client.post("/api/alumni", json=self.sample())
        alumni_id = created.get_json()["id"]
        updated = self.client.put(
            f"/api/alumni/{alumni_id}",
            json=self.sample(company="New Company"),
        )
        self.assertEqual(updated.status_code, 200)
        self.assertEqual(updated.get_json()["company"], "New Company")

    def test_invalid_graduation_year_is_rejected(self):
        response = self.client.post(
            "/api/alumni",
            json=self.sample(graduation_year="not-a-year"),
        )
        self.assertEqual(response.status_code, 400)


if __name__ == "__main__":
    unittest.main()
