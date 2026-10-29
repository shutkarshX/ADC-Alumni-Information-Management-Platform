# Technology Stack Decision

## Decision

The final deliverable is a browser-based web application. Use this practical, student-friendly stack:

- **Frontend:** React with Vite (JavaScript)
- **Backend:** Python Flask REST API
- **Database:** SQLite for local development and demonstration
- **API format:** JSON over HTTP
- **Testing:** Python unittest for backend API and data validation; browser-based manual checks for the UI
- **Version control:** Git and GitHub

## Why this stack

- React supports a modern, component-based web interface.
- Flask keeps the API straightforward and uses Python.
- SQLite provides persistent storage without requiring a separate database server.
- The frontend and backend remain separate, so they can be developed and tested independently.

## Initial architecture

React browser UI → Flask JSON API → SQLite database.

The first implementation will use local development settings. Production hosting, production database choice, authentication/authorization policy, and handling of real alumni personal data must be decided before any public deployment. Do not place real personal data in sample records.

## Scope guardrails

Phase 1 focuses on alumni record creation, listing/viewing, searching, updating, and basic validation. Events, jobs/referrals, analytics, mentor matching, and other extensions are not part of the initial build unless the approved brief or faculty requires them.

## Status

Stack selected; implementation is being scaffolded. No successful build or tests are claimed until they are run.
