# Implementation Plan: Copa Folheto MVP

**Branch**: `001-use-issues-abertas` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-copa-folheto-mvp/spec.md`

**GitHub Issue**: https://github.com/rodrigoblasi/copa.blasi.io/issues/1, https://github.com/rodrigoblasi/copa.blasi.io/issues/2, https://github.com/rodrigoblasi/copa.blasi.io/issues/3, https://github.com/rodrigoblasi/copa.blasi.io/issues/4, https://github.com/rodrigoblasi/copa.blasi.io/issues/5, https://github.com/rodrigoblasi/copa.blasi.io/issues/6, https://github.com/rodrigoblasi/copa.blasi.io/issues/7

**UX Reference**: [ux-intelligence.md](./ux-intelligence.md)

## Summary

Build `copa.blasi.io` as a static-first public World Cup 2026 folheto with the home as the primary one-page tabelao overview. The implementation will generate fast, indexable public pages from validated tournament data, keep official-source provenance and freshness visible, reserve intentional spaces for unknown group and knockout data, and enforce the UX guardrails in `ux-intelligence.md` so the result is visually strong, usable on mobile, and not a generic dashboard.

The technical approach is an Astro + TypeScript static site with canonical JSON data, validation fixtures, scheduled refresh jobs, generated public routes, internal structured logs, and public-safe metadata under `copa.blasi.io`.

## Technical Context

**Language/Version**: Node.js 22 LTS, TypeScript 5.x, modern HTML/CSS for static public pages

**Primary Dependencies**: Astro 5 for static pages and routing, schema validation for tournament data, Vitest for unit/data tests, Playwright for route/mobile smoke tests, axe-compatible accessibility checks, no heavy UI dashboard framework

**Storage**: Repository-local canonical JSON data and editorial notes, generated static artifacts for public pages, minimal test fixtures for parser/fallback validation, no database for MVP

**Testing**: Unit tests for schemas, transforms, match states, BRT time conversion, fallback/conflict decisions, and bracket filling; route tests for home, calendar, Brazil, radar, match pages, robots, metadata, mobile layout, focus states, and UX anti-pattern review

**Target Platform**: Static public website deployed under `https://copa.blasi.io`, with scheduled refresh/rebuild run by CI or static-host automation

**Project Type**: Static-first web application with scheduled data-refresh scripts

**GitHub Traceability**: Governing issues #1 through #7, branch `001-use-issues-abertas`, future commits/PRs/deployment notes must record data-source decisions, refresh cadence, UX decisions, public route changes, and operational behavior

**Performance Goals**: Home remains usable on mobile, first meaningful tournament overview visible quickly, public pages build as static assets, primary consultation tasks complete in 45 seconds or less, no heavy analytics or dashboard client payload

**Constraints**: Public repo hygiene, no secrets or private notes, no invented tournament facts, official-or-documented reliable data only, home as primary overview, Brazil emphasis without obscuring the tournament, high contrast and mobile readability by default

**Data Sources & Refresh**: Primary source is official FIFA World Cup 2026 competition data or another documented official competition source. Secondary reliable public source may verify or recover values. Initial cadence: daily before tournament/off-days, hourly on match days outside live windows, every 5-10 minutes during live windows and immediately after final whistles when possible. Exact source URLs and cadence adjustments must be recorded in GitHub before release.

**Observability**: Internal structured logs for source fetches, scheduler runs, parser/transform results, fallback decisions, stale/conflict detection, route/render errors, and freshness health. Public UI only shows user-helpful freshness/uncertainty labels.

**Public Hygiene**: Treat specs, code, data, generated files, issues, PRs, logs, metadata, and deployed pages as public. Do not commit secrets, credentials, raw private notes, unnecessary personal data, sensitive metadata, local Starlog assets, raw logs, or source dumps.

**Subdomain Impact**: Public routes under `copa.blasi.io`: `/`, `/calendario`, `/brasil`, `/radar`, `/jogos/[match-slug]`, `/robots.txt`, and sitemap/metadata as needed. Internal logs, diagnostics, raw data snapshots, and source fetch details remain out of the public route surface.

**Scale/Scope**: FIFA World Cup 2026 public guide scope: 48 teams, 12 groups, 104 matches, group stage, knockout rounds, third-place match, final, champion, concise notes, home-first overview, optional detail pages, no accounts, no community features, no heavy statistics platform.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Gate

- **Personal public folheto**: PASS. Plan prioritizes quick personal consultation and public sharing through home, calendar, Brazil, radar, and match pages. No accounts, community mechanics, or heavy analytics.
- **Editorial UX**: PASS. Plan makes the home a print-inspired digital tabelao and requires `ux-intelligence.md` guardrails, including hierarchy, mobile readability, restrained visual system, and dashboard-drift review.
- **Verified scheduled data**: PASS. Plan defines official/documented source priority, refresh cadence, freshness labels, fallback behavior, conflict handling, and no invented facts.
- **Public repo hygiene**: PASS. Plan treats repository and deployed pages as public and excludes secrets, personal notes, raw logs, source dumps, local Starlog assets, sensitive metadata, and unnecessary personal context.
- **GitHub governance**: PASS. Plan references issues #1 through #7, branch `001-use-issues-abertas`, and requires future source, UX, deployment, and operational decisions to be recorded in GitHub.
- **Structured observability**: PASS. Plan defines internal structured logs for source access, scheduler runs, parsing, fallback decisions, route errors, and health while keeping public UI limited to trust-building freshness labels.
- **Independent validation**: PASS. Plan requires tests or documented validation for data transforms, match states, fallbacks, public display behavior, mobile usability, and UX anti-pattern review.

### Post-Design Gate

- **Personal public folheto**: PASS. Design artifacts keep the home overview as the primary surface and detail routes as secondary support.
- **Editorial UX**: PASS. UI contract requires dominant reading path, visual hierarchy, Brazil accent restraint, mobile collapse preserving tournament logic, and rejection of generic dashboard patterns.
- **Verified scheduled data**: PASS. Data model and refresh contract define provenance, source checks, freshness states, conflict states, fallback rules, and validation fixtures.
- **Public repo hygiene**: PASS. Quickstart and contracts include public-safe review requirements for files, metadata, logs, generated artifacts, and deployed pages.
- **GitHub governance**: PASS. Plan artifacts identify decisions that must be carried into issues, commits, PRs, and deployment notes.
- **Structured observability**: PASS. Refresh contract defines internal log events and minimum fields without exposing operations as public product features.
- **Independent validation**: PASS. Data model, contracts, and quickstart define test/validation scope for transforms, UI states, mobile usability, and public route smoke checks.

## Project Structure

### Documentation (this feature)

```text
specs/001-copa-folheto-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── ux-intelligence.md
├── contracts/
│   ├── data-contract.md
│   ├── refresh-contract.md
│   └── ui-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── content/
│   ├── data/
│   │   ├── canonical/
│   │   ├── fixtures/
│   │   └── generated/
│   └── notes/
├── lib/
│   ├── data/
│   ├── observability/
│   ├── seo/
│   └── ux/
├── pages/
│   ├── index.astro
│   ├── calendario.astro
│   ├── brasil.astro
│   ├── radar.astro
│   └── jogos/
│       └── [slug].astro
├── components/
│   ├── home/
│   ├── match/
│   ├── navigation/
│   └── status/
├── styles/
└── scripts/
    ├── refresh-data.ts
    ├── validate-data.ts
    └── build-public-data.ts

tests/
├── unit/
│   ├── data/
│   ├── transforms/
│   └── ux/
├── integration/
│   ├── refresh/
│   └── routes/
└── e2e/
    ├── home.spec.ts
    ├── mobile.spec.ts
    └── public-hygiene.spec.ts

public/
├── robots.txt
└── assets/
```

**Structure Decision**: Use a single static web application at the repository root. Keep canonical tournament data and editorial notes separate from source adapters and generated public data. Keep home/tabelao components isolated under `src/components/home/`, shared match/status components under `src/components/match/` and `src/components/status/`, and data-refresh scripts under `src/scripts/` so scheduled updates remain testable and operationally visible.

## Complexity Tracking

No constitutional violations or complexity exceptions are required for this plan. The static-first architecture is the simpler alternative to a full backend or dashboard platform and matches the project's personal public folheto purpose.
