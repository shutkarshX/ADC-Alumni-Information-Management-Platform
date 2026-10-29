# Phase 1 — Definition and Acceptance Criteria

## Goal

Deliver a small, testable first version of the ADC Alumni Information Management Platform focused on the core alumni-record workflow from PBL Progress Report I. Phase 1 is **not started** until the implementation and checks below are completed.

## Final-product requirement

The final deliverable is a **web-based application** accessed through a browser. A console-only or desktop-only application is not an acceptable final product. The architecture must include a browser-based frontend, a backend/API or server-side application, and persistent storage. The specific framework and database should be selected before implementation and documented in the README.

## Phase 1 scope

1. Set up a clearly documented web-project structure and reproducible run instructions.
2. Create a browser-accessible interface connected to real backend functionality; a static mockup alone does not satisfy this criterion.
3. Define an alumni profile data model with appropriate personal, academic, professional and contact fields.
4. Implement organized persistent record storage using a documented storage choice suitable for a student project.
5. Support creating and viewing an alumni record through the web interface.
6. Support searching for an alumni record through the web interface.
7. Support updating an existing alumni record through the web interface.
8. Validate required fields and reject malformed/incomplete records; prevent duplicates using a documented identity rule.
9. Document the boundary between current core record management and future engagement features.

Do not add login/roles, cloud hosting, analytics, mentor matching, events, jobs/referrals, or other substantial features in Phase 1 unless the assignment brief or faculty explicitly requires them. If access control is implemented in this phase, document exactly what is enforced and test it; do not claim authorization merely because a UI hides a control.

## Acceptance checks

Phase 1 can be marked complete only when every applicable check has real evidence.

| ID | Acceptance check | Required evidence |
|---|---|---|
| P1-01 | A new developer can follow the README to install and run the web application | Exact commands and a successful local run |
| P1-02 | The application opens in a browser and its interface calls working backend functionality (not just static HTML) | Successful local browser run and verified request/response |\n| P1-03 | The documented data model contains the agreed alumni fields | Schema/model file and example record |
| P1-04 | A valid profile can be created and retrieved after creation | Test output or reproducible demonstration |
| P1-05 | Searching for an existing profile returns the correct record | Positive search test |
| P1-06 | Searching for an unknown profile gives a clear no-result response | Negative search test |
| P1-07 | An existing profile can be updated and the changed value persists | Update test |
| P1-08 | Missing required fields and invalid input are rejected clearly | Validation tests |
| P1-09 | Duplicate profile identity is handled consistently | Duplicate-record test |
| P1-10 | Data survives an application restart | Restart/persistence test |
| P1-11 | Actual limitations and future features are documented without claiming they are implemented | Scope/README review |

## Definition of done

- [ ] The implementation exists in this ADC repository and is runnable as a browser-based web application.\n- [ ] The browser frontend is connected to real backend behavior; it is not only a static mockup.
- [ ] All acceptance checks above pass or any exception is explicitly documented.
- [ ] Test output is generated from the actual code.
- [ ] Screenshots, if used, show the running implementation rather than a mockup.
- [ ] No code, commits, tests, screenshots, or claims are borrowed from the separate Java Alumni project.
- [ ] README run instructions match the actual project.
- [ ] The phase tracker is updated only after verification.

## Out of scope until separately approved

- Mentor matching or recommendation algorithms
- Analytics dashboards or parallel-processing benchmarks
- Events and job/referral posts
- Production deployment, real institutional data, or claims of production security

These may be considered later if they are required by the assignment and the timeline supports them.
