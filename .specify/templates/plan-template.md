# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**GitHub Issue**: [link to governing issue in https://github.com/rodrigoblasi/copa.blasi.io/issues]

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**GitHub Traceability**: [issue URL, branch name, related commits/PRs, and operational record expectations]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Data Sources & Refresh**: [source(s), scheduled refresh frequency, fallback behavior, and freshness markers or N/A]

**Observability**: [structured logs/metrics for source access, scheduler, parsing, fallback, route errors, and health or N/A]

**Public Hygiene**: [privacy/content review constraints for public repo and published pages or N/A]

**Subdomain Impact**: [effect on copa.blasi.io routing, deployment, SEO, robots.txt, public metadata, or N/A]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Personal public folheto**: Plan preserves the owner's fast personal use while
  keeping public sharing simple; no accounts, community mechanics, or heavy
  analytics unless explicitly justified.
- **Editorial UX**: Plan explains how the feature supports a print-inspired,
  mobile-friendly Copa leaflet instead of a generic dashboard.
- **Verified scheduled data**: Plan identifies source(s), refresh schedule,
  freshness rules, fallback behavior, and how unknown/stale/conflicting data is
  represented without inventing facts.
- **Public repo hygiene**: Plan identifies secrets, personal data, metadata, and
  publication risks across files, issues, comments, logs, artifacts, and deployed
  pages, plus how they are excluded or reviewed.
- **GitHub governance**: Plan references the governing GitHub issue, expected
  branch, review trail, and any operational record that must be kept in
  `https://github.com/rodrigoblasi/copa.blasi.io/`.
- **Structured observability**: Plan defines backend logs/metrics needed for data
  source access, scheduler runs, parsing, fallback decisions, route errors, and
  site health without exposing sensitive data publicly.
- **Independent validation**: Plan defines automated tests or documented
  validation for critical data transformations, match states, fallbacks, and
  public content behavior.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
