# Requirements Traceability — ADC Alumni Information Management Platform

## Source basis

This checklist is derived from the available ADC Topic Approval Form and **PBL Progress Report I**. It captures requirements stated in that report; it does not claim the application has implemented them.

## Source discrepancy to resolve

- Topic Approval Form: course code **CCSDS0302**.
- Available PBL Progress Report I: course code **BCSDS0303N**.

These differ. Keep the approval-form code as the approved-form transcription, but confirm the correct course code with the faculty/course material before submitting future reports. Do not silently overwrite either source.

## Requirements checklist

| ID | Requirement stated or supported by Report I | Planned verification evidence | Status |
|---|---|---|---|
| R-01 | Centralized platform for managing alumni information | Running application and persisted sample records | Not started |
| R-02 | Organized alumni profiles with relevant academic and professional details | Data model plus create/read demonstration | Not started |
| R-03 | Store personal, academic, professional and contact information appropriate to the project | Documented fields and sample profile | Not started |
| R-04 | Add/create alumni records | Valid record can be created and retrieved | Not started |
| R-05 | Search and retrieve alumni records | Search tests for match and no-match cases | Not started |
| R-06 | Update and maintain records by authorized users | Update test and documented access rules | Not started |
| R-07 | Reduce scattered/manual record keeping through organized storage | Demonstration that records are kept in one defined store | Not started |
| R-08 | Consider duplicate or incomplete records | Validation rules and tests for required fields / duplicate identity | Not started |
| R-09 | Keep the platform manageable and simple for the current project scope | Small, documented feature set and clear user flow | Not started |
| R-10 | Provide a foundation for future alumni engagement and networking | Scope note identifying future features separately from current deliverables | Not started |

## Stakeholders identified in Report I

- Alumni
- Students
- Faculty / mentors
- Alumni coordinators
- Institution administrators

The report describes these stakeholder groups; it does not by itself define separate permission levels or prove that all groups need accounts in the first release. Define role permissions before implementing access control.

## Workflow from Report I

**Alumni Registration → Profile Creation → Information Storage → Search / Update → Alumni Record Management**

## Not assumed to be Phase 1 requirements

Events, job/referral posts, mentorship requests, mentor matching, analytics dashboards, cloud hosting, and parallel-computing benchmarks appear in other planning/report material. They are not automatically part of the first implementation milestone. Prioritize the core alumni-record workflow first, then confirm additional features against the current assignment brief and faculty expectations.
