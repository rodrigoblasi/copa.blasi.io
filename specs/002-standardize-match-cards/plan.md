# Implementation Plan: Standardize Match Cards

**Branch**: `002-standardize-match-cards` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-standardize-match-cards/spec.md`

**GitHub Issue**: https://github.com/rodrigoblasi/copa.blasi.io/issues/21

## Summary

Standardize the public match-card experience across home, calendar, and Fase Eliminatória views while raising the visual and editorial bar of the site. The implementation should consolidate match presentation into a shared match-card contract with background tint + left border accent emphasis, sr-only/aria-label accessibility annotations, official Portuguese terminology, unresolved knockout slots displayed as translated public labels (using existing Portuguese labels directly where available, mapping internal codes where needed), a two-sided bracket converging toward Final and Disputa de 3º lugar, a geometric football SVG favicon (pentagon/hexagon panels, white on black), and polished Copa Folheto page titles across all public-facing pages.

The technical approach is to keep the existing Astro + TypeScript static site architecture, extend the current tournament view-model helpers where needed, add a slot-label translation layer that handles both already-Portuguese and internal-code labels, refactor duplicated card/bracket markup toward shared display rules with emphasis classification and aria-label generation, and verify the behavior through unit/data tests, route tests, mobile smoke tests, accessibility checks, public hygiene checks, and editorial title review.

## Technical Context

**Language/Version**: Node.js 22 LTS, TypeScript 5.x, Astro 5 static pages and components

**Primary Dependencies**: Astro, TypeScript, Zod, Vitest, Playwright, axe-compatible accessibility checks; no new UI framework or visual dependency planned

**Storage**: Repository-local canonical tournament JSON and generated static page artifacts; favicon assets under `public/`; no database changes

**Testing**: Vitest for data/view-model transformations and public-label helpers; Playwright for home, calendar, mobile bracket, favicon/head metadata, and public-hygiene route checks; existing `astro check` and `astro build`

**Target Platform**: Static public website deployed under `https://copa.blasi.io`

**Project Type**: Static-first public web application with scheduled data-refresh scripts already present

**GitHub Traceability**: Governing issue #21, branch `002-standardize-match-cards`; commits, PR review, and deployment notes must reference public terminology, page titles, card, bracket, calendar, favicon, or route behavior changes

**Performance Goals**: Home and calendar remain quick to scan on mobile; primary match lookup remains possible in 45 seconds or less; bracket remains navigable on mobile without heavy client payload or dashboard-like interaction

**Constraints**: Preserve public repo hygiene; do not invent tournament facts; do not change Brazil page scope; do not alter data-source or refresh policy; do not add new UI dependencies; keep editorial folheto identity; maintain mobile readability and high contrast

**Data Sources & Refresh**: Uses the existing documented FIFA World Cup 2026 tournament data in `src/content/data/canonical/tournament.json`; this feature does not change refresh cadence, fallback policy, or source priority

**Observability**: No new scheduler or backend observability events are required. Existing structured logs for source access, parsing, fallback, freshness, route errors, and health remain authoritative. Public UI must continue showing only user-helpful uncertainty labels.

**Public Hygiene**: Review changed specs, page titles, metadata, favicon assets, generated public pages, tests, logs, and repository files for secrets, private notes, unnecessary personal data, sensitive metadata, raw Starlog material, local artifacts, and accidental internal IDs in UI

**Subdomain Impact**: Affects public UI and metadata under `copa.blasi.io`, especially `/`, `/calendario`, Fase Eliminatória sections on public pages, favicon links in the base layout, and browser/share title behavior; no new public route is required by this plan

**Scale/Scope**: FIFA World Cup 2026 public guide scope: 104 matches, 48 teams, group stage, 32 knockout matches from M73-M104, home and calendar card reuse, bracket presentation, favicon, and title polish

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Gate

- **Personal public folheto**: PASS. The plan improves fast personal consultation of matches and tournament path without adding accounts, social features, or analytics.
- **Editorial UX**: PASS. The plan strengthens the folheto/tabelão editorial system, eliminates weak MVP/placeholder naming, and avoids generic dashboard presentation.
- **Verified scheduled data**: PASS. The plan reuses existing governed tournament data and explicitly avoids changing source, refresh, or fallback policy.
- **Public repo hygiene**: PASS. The plan requires review of public text, metadata, favicon assets, generated pages, and UI labels for shareability and internal-ID leakage.
- **GitHub governance**: PASS. Issue #21 and branch `002-standardize-match-cards` are recorded; PR/deployment notes must preserve title, terminology, card, bracket, and favicon decisions.
- **Structured observability**: PASS. No new backend process is added; existing observability remains in force and public uncertainty display remains user-focused.
- **Independent validation**: PASS. The plan calls for unit, route, mobile, metadata, favicon, accessibility, and public-hygiene validation.

### Post-Design Gate

- **Personal public folheto**: PASS. Design artifacts keep home and calendar as quick consultation surfaces and bracket as a readable tournament-path aid.
- **Editorial UX**: PASS. UI contracts define consistent card hierarchy, official terminology, mobile bracket behavior, and mature page-title language.
- **Verified scheduled data**: PASS. Data model documents use of existing match fields, unresolved labels, scores, venues, and freshness without changing source policy.
- **Public repo hygiene**: PASS. Contracts and quickstart include checks for internal IDs, MVP wording, secrets, local artifacts, and public metadata quality.
- **GitHub governance**: PASS. Artifacts reference issue #21 and identify records that need to be carried into commits, PRs, and deployment notes.
- **Structured observability**: PASS. No added backend surface; existing logs continue covering data and health concerns.
- **Independent validation**: PASS. Quickstart defines concrete validation commands and manual review gates for the key public behavior.

## Project Structure

### Documentation (this feature)

```text
specs/002-standardize-match-cards/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── match-card-contract.md
│   ├── knockout-bracket-contract.md
│   └── metadata-title-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── match/
│   │   ├── MatchBlock.astro
│   │   ├── PhaseCalendar.astro
│   │   └── CalendarDay.astro
│   ├── home/
│   │   └── KnockoutBracket.astro
│   ├── navigation/
│   │   └── SiteNav.astro
│   └── shared/
│       └── Flag.astro
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── data/
│   │   ├── calendarView.ts
│   │   ├── homeOverview.ts
│   │   ├── types.ts
│   │   └── validateTournament.ts
│   ├── seo/
│   │   └── pageMetadata.ts
│   └── ux/
│       └── guardrails.ts
├── pages/
│   ├── index.astro
│   ├── calendario.astro
│   └── jogos/
│       └── [slug].astro
└── styles/
    └── global.css

public/
├── favicon.ico
├── favicon.svg
├── apple-touch-icon.png
└── robots.txt

tests/
├── unit/
│   ├── data/
│   ├── transforms/
│   └── ux/
└── e2e/
    ├── calendar.spec.ts
    ├── home-overview.spec.ts
    ├── mobile-usability.spec.ts
    └── public-hygiene.spec.ts
```

**Structure Decision**: Keep a single Astro static application. Consolidate match-card rules in existing match/home components and data view-model helpers instead of introducing a new UI layer. Add favicon assets under `public/`, update base metadata in `BaseLayout.astro` and `pageMetadata.ts`, and extend existing tests rather than creating a parallel test suite.

## Complexity Tracking

No constitutional violations or complexity exceptions are required. The simplest compliant approach is to reuse and refactor existing Astro components, data helpers, and tests while preserving the static-first architecture.
