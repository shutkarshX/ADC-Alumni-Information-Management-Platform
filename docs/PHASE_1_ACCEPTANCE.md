# Phase 1 — Definition and Acceptance Criteria

## Goal

Deliver a small, testable first version of the ADC Alumni Information Management Platform focused on the core alumni-record workflow from PBL Progress Report I. Phase 1 is **not started** until the implementation and checks below are completed.

## Phase 1 scope

1. Set up a clearly documented project structure and reproducible run instructions.
2. Define an alumni profile data model with appropriate personal, academic, professional and contact fields.
3. Implement organized record storage using a documented storage choice suitable for a student project.
4. Support creating and viewing an alumni record.
5. Support searching for an alumni record.
6. Support updating an existing alumni record.
7. Validate required fields and reject malformed/incomplete records; prevent duplicates using a documented identity rule.
8. Document the boundary between current core record management and future engagement features.

Do not add login/roles, cloud hosting, analytics, mentor matching, events, jobs/referrals, or other substantial features in Phase 1 unless the assignment brief or faculty explicitly requires them. If access control is implemented in this phase, document exactly what is enforced and test it; do not claim authorization merely because a UI hides a control.

## Acceptance checks

Phase 1 can be marked complete only when every applicable check has real evidence.

| ID | Acceptance check | Required evidence |
|---|---|---|
| P1-01 | A new developer can follow the README to install and run the application | Exact commands and a successful local run |
| P1-02 | The documented data model contains the agreed alumni fields | Schema/model file and example record |
| P1-03 | A valid profile can be created and retrieved after creation | Test output or reproducible demonstration |
| P1-04 | Searching for an existing profile returns the correct record | Positive search test |
| P1-05 | Searching for an unknown profile gives a clear no-result response | Negative search test |
| P1-06 | An existing profile can be updated and the changed value persists | Update test |
| P1-07 | Missing required fields and invalid input are rejected clearly | Validation tests |
| P1-08 | Duplicate profile identity is handled consistently | Duplicate-record test |
| P1-09 | Data survives an application restart if persistent storage is selected | Restart/persistence test |
| P1-10 | Actual limitations and future features are documented without claiming they are implemented | Scope/README review |

## Definition of done

- [ ] The implementation exists in this ADC repository and is runnable.
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
