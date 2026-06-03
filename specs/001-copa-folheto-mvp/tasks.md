# Tasks: Copa Folheto MVP

**Input**: Design documents from `specs/001-copa-folheto-mvp/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `ux-intelligence.md`

**GitHub**: Tasks trace to issues #1 through #7 and branch `001-use-issues-abertas` for `https://github.com/rodrigoblasi/copa.blasi.io/`.

**Tests**: Required for constitution-critical data transformations, scheduled refreshes, fallback behavior, match state changes, structured logging, public result display, mobile usability, focus states, and UX anti-pattern review.

**Gate method**: Implementation MUST proceed gate-by-gate using `docs/spec-kit-session-methodology.md` and `docs/spec-kit-gates.md`. The dev uses `/speckit.implement`, completes only the current gate, records evidence in GitHub, invokes a reviewer subagent, records the reviewer decision, and advances only after `Decision: APPROVED`.

**Current gate to start**: G01 - Project Scaffold.

## Gate Map

| Gate | Task Scope | Purpose | Status |
|------|------------|---------|--------|
| G01 | T001-T010 | Project scaffold | OPEN |
| G02 | T011-T023 | Data foundation | LOCKED |
| G03 | T024-T033 | Shared UX, SEO, logging foundation | LOCKED |
| G04 | T034-T045 | MVP home tabelao | LOCKED |
| G06 | T057-T066 | UX quality gate | LOCKED |
| G05 | T046-T056 | Official data refresh and fallback | LOCKED |
| G07 | T067-T074 | Calendar surface | LOCKED |
| G08 | T075-T082 | Brazil path | LOCKED |
| G09 | T083-T090 | Match detail pages | LOCKED |
| G10 | T091-T097 | Radar | LOCKED |
| G11 | T098-T105 | Operations and public governance | LOCKED |
| G12 | T106-T112 | Release polish | LOCKED |

Recommended order: `G01 -> G02 -> G03 -> G04 -> G06 -> G05 -> G07 -> G08 -> G09 -> G10 -> G11 -> G12`.

## Gate Operating Rules

- Do not start a gate unless the previous gate has a GitHub reviewer record ending with `Decision: APPROVED`.
- Do not mark a gate approved from dev self-review.
- Do not continue after `Decision: BLOCKED`; fix the blocked gate scope and invoke the reviewer subagent again.
- Every dev completion record must include task IDs, files changed, commands/checks, risks, and what the reviewer should test.
- Every reviewer record must include review mode, evidence inspected, checks run or inspected, findings, follow-up, and `Decision: APPROVED` or `Decision: BLOCKED`.
- Use `docs/github-record-templates.md` for GitHub comments and local gate evidence.

---

## Gate G01 - Project Scaffold

**Task scope**: T001-T010

**Status**: OPEN

**Purpose**: Initialize the static-first Astro + TypeScript project and baseline validation tooling.

**Dev output**: Tooling files, base layout, global CSS entry, robots file, and source data directory placeholders.

**Reviewer must test**:

- Verify expected scaffold files exist.
- Verify package scripts and config names match `plan.md`.
- Verify no app implementation beyond scaffold scope was added.
- Verify public hygiene: no secrets, private paths, copied local assets, or unnecessary generated artifacts.

### Tasks

- [x] T001 Create root Astro project manifest with dependencies and scripts in `package.json`
- [x] T002 Configure Astro static output and site metadata base in `astro.config.mjs`
- [x] T003 [P] Configure TypeScript compiler settings in `tsconfig.json`
- [x] T004 [P] Configure Vitest project aliases and coverage defaults in `vitest.config.ts`
- [x] T005 [P] Configure Playwright browsers, base URL, and mobile projects in `playwright.config.ts`
- [x] T006 [P] Create accessibility helper for route tests in `tests/e2e/a11y-helper.ts`
- [x] T007 Create base HTML layout shell in `src/layouts/BaseLayout.astro`
- [x] T008 [P] Create global stylesheet entry in `src/styles/global.css`
- [x] T009 [P] Create public robots rules for user-facing routes in `public/robots.txt`
- [x] T010 [P] Create source directory placeholders in `src/content/data/canonical/.gitkeep`, `src/content/data/fixtures/.gitkeep`, `src/content/data/generated/.gitkeep`, and `src/content/notes/.gitkeep`

### Gate Evidence - G01

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/8#issuecomment-4614792510
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/8#issuecomment-4614793840
- Next gate unlocked after approval: G02

---

## Gate G02 - Data Foundation

**Task scope**: T011-T023

**Status**: LOCKED until G01 is approved

**Purpose**: Create shared tournament types, schemas, canonical fixtures, validation, freshness, fallback, and BRT conversion basics.

**Dev output**: Data types, schemas, seed data, fixtures, loader, validator, freshness logic, BRT helper, and unit tests.

**Reviewer must test**:

- Run schema and transform tests.
- Check fixtures cover required match and freshness states.
- Verify final score and bracket-slot rules cannot invent facts.
- Verify BRT conversion behavior is explicit and tested.

### Tasks

- [x] T011 Define tournament enums and shared TypeScript types in `src/lib/data/types.ts`
- [x] T012 Implement canonical dataset schemas from the data contract in `src/lib/data/schemas.ts`
- [x] T013 Create initial canonical tournament dataset fixture in `src/content/data/canonical/tournament.json`
- [x] T014 [P] Create match-state coverage fixtures in `src/content/data/fixtures/match-states.json`
- [x] T015 [P] Create freshness/fallback coverage fixtures in `src/content/data/fixtures/freshness-cases.json`
- [x] T016 Implement canonical data loader in `src/lib/data/loadTournament.ts`
- [x] T017 Implement dataset validation service in `src/lib/data/validateTournament.ts`
- [x] T018 [P] Add schema validation tests in `tests/unit/data/schemas.test.ts`
- [x] T019 [P] Add match status transition tests in `tests/unit/transforms/match-state.test.ts`
- [x] T020 Implement freshness and fallback state logic in `src/lib/data/freshness.ts`
- [x] T021 [P] Add freshness and fallback tests in `tests/unit/transforms/freshness.test.ts`
- [x] T022 Implement BRT kickoff time helper in `src/lib/data/brt-time.ts`
- [x] T023 [P] Add BRT conversion tests in `tests/unit/transforms/brt-time.test.ts`

### Gate Evidence - G02

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/9#issuecomment-4614828582
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/9#issuecomment-4614829641
- Next gate unlocked after approval: G03

---

## Gate G03 - Shared UX, SEO, Logging Foundation

**Task scope**: T024-T033

**Status**: LOCKED until G02 is approved

**Purpose**: Establish public-safe logs, metadata helpers, UX guardrails, status labels, navigation, data build/validation scripts, and npm commands.

**Dev output**: Logger, SEO helper, UX guardrail module, status/navigation components, data scripts, package scripts, and tests.

**Reviewer must test**:

- Run logger hygiene tests.
- Verify logs do not expose secrets, headers, visitor identifiers, local paths, or raw source payloads.
- Verify metadata helper supports public-safe titles, descriptions, and canonical URLs.
- Verify UX guardrails reflect `ux-intelligence.md`.
- Verify `npm` scripts match `quickstart.md` expectations.

### Tasks

- [x] T024 Implement public-safe structured logger in `src/lib/observability/logger.ts`
- [x] T025 [P] Add logger public-hygiene tests in `tests/unit/data/logger-public-hygiene.test.ts`
- [x] T026 Implement public metadata helper in `src/lib/seo/pageMetadata.ts`
- [x] T027 Implement UX guardrail definitions from the design brief in `src/lib/ux/guardrails.ts`
- [x] T028 [P] Add UX guardrail unit tests in `tests/unit/ux/guardrails.test.ts`
- [x] T029 Create reusable status label component in `src/components/status/StatusLabel.astro`
- [x] T030 [P] Create site navigation component in `src/components/navigation/SiteNav.astro`
- [x] T031 Implement public data build script in `src/scripts/build-public-data.ts`
- [x] T032 Implement data validation CLI script in `src/scripts/validate-data.ts`
- [x] T033 Wire npm scripts for dev, build, preview, tests, data validation, and accessibility in `package.json`

### Gate Evidence - G03

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/10#issuecomment-4614893992
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/10#issuecomment-4614894888
- Next gate unlocked after approval: G04

---

## Gate G04 - MVP Home Tabelao

**Task scope**: T034-T045

**Status**: LOCKED until G03 is approved

**Story**: US1 - Ver a Copa inteira na home (Priority: P1)

**Purpose**: Deliver the first independently useful home overview.

**Independent test**: Open `/` on desktop and mobile and verify a first-time visitor can find groups, group-stage match areas, knockout/final area, Brazil, next/recent matches, and update state in 45 seconds or less.

**Dev output**: Home data builder, tournament header, group sections, match blocks, knockout bracket, Brazil highlight, home route, home styles, seed data, and home metadata.

**Reviewer must test**:

- Open `/` locally or inspect rendered output.
- Verify groups, group-stage matches, current phase, next/recent matches, knockout structure, Brazil, and update state are visible.
- Verify pending knockout slots are labeled and not inferred.
- Verify mobile layout preserves tournament logic.
- Run home overview route and view-model tests.

### Tasks

- [x] T034 [P] [US1] Add home overview route test in `tests/e2e/home-overview.spec.ts`
- [x] T035 [P] [US1] Add home view-model unit tests in `tests/unit/data/home-overview.test.ts`
- [x] T036 [US1] Implement home overview data builder in `src/lib/data/homeOverview.ts`
- [x] T037 [P] [US1] Create tournament header component in `src/components/home/TournamentHeader.astro`
- [x] T038 [P] [US1] Create group section component in `src/components/home/GroupSection.astro`
- [x] T039 [P] [US1] Create compact match block component in `src/components/match/MatchBlock.astro`
- [x] T040 [P] [US1] Create knockout bracket component in `src/components/home/KnockoutBracket.astro`
- [x] T041 [P] [US1] Create Brazil highlight component in `src/components/home/BrazilHighlight.astro`
- [x] T042 [US1] Implement home route composition in `src/pages/index.astro`
- [x] T043 [US1] Implement responsive tabelao home styles in `src/styles/home.css`
- [x] T044 [US1] Add representative home seed data with groups and pending bracket slots in `src/content/data/canonical/tournament.json`
- [x] T045 [US1] Add home title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

### Gate Evidence - G04

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/11#issuecomment-4614908785
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/11#issuecomment-4614909777
- Next gate unlocked after approval: G06

---

## Gate G06 - UX Quality Gate

**Task scope**: T057-T066

**Status**: LOCKED until G04 is approved

**Story**: US4 - Usar uma interface bonita e clara (Priority: P1)

**Purpose**: Enforce visual quality and usability before expanding surfaces.

**Independent test**: Review home and primary routes against UX guardrails and pass mobile, focus, accessibility, and anti-pattern checks.

**Dev output**: Design tokens, typography/contrast system, status visuals, home mobile refinement, visual review template, guardrail mapping, and focus/navigation conventions.

**Reviewer must test**:

- Run dashboard-drift, mobile usability, and focus-state tests.
- Review against every question in `ux-intelligence.md`.
- Verify one dominant reading path and strong hierarchy.
- Verify pending states look intentional, not broken.
- Reject flat generic card grids, excessive badges/widgets, weak contrast, or dashboard/analytics framing.

### Tasks

- [x] T057 [P] [US4] Add dashboard-drift guardrail tests in `tests/unit/ux/dashboard-drift.test.ts`
- [x] T058 [P] [US4] Add mobile usability e2e tests in `tests/e2e/mobile-usability.spec.ts`
- [x] T059 [P] [US4] Add focus and touch state e2e tests in `tests/e2e/focus-states.spec.ts`
- [x] T060 [US4] Define restrained folheto design tokens in `src/styles/tokens.css`
- [x] T061 [US4] Apply typography, contrast, and whitespace system in `src/styles/global.css`
- [x] T062 [US4] Implement status and uncertainty visual states in `src/styles/status.css`
- [x] T063 [US4] Refine home reading path and mobile collapse behavior in `src/styles/home.css`
- [x] T064 [P] [US4] Create visual review template in `docs/reviews/ux-review-template.md`
- [x] T065 [US4] Map UX guardrails to testable review questions in `src/lib/ux/guardrails.ts`
- [x] T066 [US4] Wire focus and navigation conventions into `src/layouts/BaseLayout.astro`

### Gate Evidence - G06

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/12#issuecomment-4614920350
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/12#issuecomment-4614921289
- Next gate unlocked after approval: G05

---

## Gate G05 - Official Data Refresh And Fallback

**Task scope**: T046-T056

**Status**: LOCKED until G06 is approved

**Story**: US2 - Acompanhar preenchimento progressivo por dados oficiais (Priority: P1)

**Purpose**: Implement official-source update boundary, refresh dry-run, conflicts, fallback summaries, freshness rendering, and operations docs.

**Independent test**: Run refresh fixtures for incomplete, updated, stale, conflicting, and source-problem cases and verify the home shows the correct public state labels without invented values.

**Dev output**: Source registry, source adapter boundary, refresh script, conflict resolver, fallback summary, generated public data contract, and data refresh docs.

**Reviewer must test**:

- Run refresh contract tests.
- Run fallback and source conflict tests.
- Verify refresh can dry-run without publishing.
- Verify conflicts show `conflicting` and do not silently overwrite.
- Verify no raw source payloads or credentials are committed.

### Tasks

- [x] T046 [P] [US2] Add refresh contract integration tests in `tests/integration/refresh/refresh-contract.test.ts`
- [x] T047 [P] [US2] Add fallback label rendering tests in `tests/unit/transforms/fallback-labels.test.ts`
- [x] T048 [P] [US2] Add source conflict transformation tests in `tests/unit/transforms/source-conflict.test.ts`
- [x] T049 [US2] Implement approved source registry in `src/lib/data/sourceRegistry.ts`
- [x] T050 [US2] Implement official source adapter boundary in `src/lib/data/sources/fifaSource.ts`
- [x] T051 [US2] Implement scheduled refresh script and dry-run mode in `src/scripts/refresh-data.ts`
- [x] T052 [US2] Implement source conflict resolver in `src/lib/data/sourceConflicts.ts`
- [x] T053 [US2] Implement fallback summary builder in `src/lib/data/fallbackSummary.ts`
- [x] T054 [US2] Add freshness and conflict rendering support in `src/components/status/StatusLabel.astro`
- [x] T055 [US2] Add generated public dataset output contract in `src/content/data/generated/public-tournament.json`
- [x] T056 [US2] Document source cadence and fallback operations in `docs/operations/data-refresh.md`

### Gate Evidence - G05

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/13#issuecomment-4614930509
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/13#issuecomment-4614931349
- Next gate unlocked after approval: G07

---

## Gate G07 - Calendar Surface

**Task scope**: T067-T074

**Status**: LOCKED until G05 is approved

**Story**: US3 - Navegar pelo calendário completo (Priority: P2)

**Purpose**: Add `/calendario` as the complete secondary schedule surface.

**Independent test**: Open `/calendario` and locate matches by phase/day/group, verify Brazil highlighting, and confirm unknown values are explicit.

**Dev output**: Calendar data builder, phase calendar, calendar day components, calendar route, calendar styles, and metadata.

**Reviewer must test**:

- Open `/calendario`.
- Verify matches can be found by phase, date, group, and BRT time.
- Verify Brazil highlighting does not obscure other matches.
- Verify unknown values and source/freshness states are explicit.
- Run calendar route and grouping tests.

### Tasks

- [x] T067 [P] [US3] Add calendar route e2e tests in `tests/e2e/calendar.spec.ts`
- [x] T068 [P] [US3] Add calendar grouping unit tests in `tests/unit/data/calendar.test.ts`
- [x] T069 [US3] Implement calendar data builder in `src/lib/data/calendarView.ts`
- [x] T070 [P] [US3] Create phase calendar component in `src/components/match/PhaseCalendar.astro`
- [x] T071 [P] [US3] Create calendar day component in `src/components/match/CalendarDay.astro`
- [x] T072 [US3] Implement calendar route in `src/pages/calendario.astro`
- [x] T073 [US3] Implement calendar responsive styles in `src/styles/calendar.css`
- [x] T074 [US3] Add calendar title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

### Gate Evidence - G07

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/14#issuecomment-4614940824
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/14#issuecomment-4614942871
- Next gate unlocked after approval: G08

---

## Gate G08 - Brazil Path

**Task scope**: T075-T082

**Status**: LOCKED until G07 is approved

**Story**: US5 - Acompanhar o caminho do Brasil (Priority: P2)

**Purpose**: Add `/brasil` as the Brazil-focused detail surface.

**Independent test**: Open `/brasil` and verify known Brazil matches, pending/conditional future opponents, concise notes, and return links to home/match context.

**Dev output**: Brazil path builder, Brazil path component, conditional opponent component, Brazil route, styles, and metadata.

**Reviewer must test**:

- Open `/brasil`.
- Verify known Brazil matches, scores, concise context, and return links.
- Verify future opponents are conditional/pending when not official.
- Verify Brazil emphasis does not contradict the home overview.
- Run Brazil route and Brazil path tests.

### Tasks

- [x] T075 [P] [US5] Add Brazil route e2e tests in `tests/e2e/brazil.spec.ts`
- [x] T076 [P] [US5] Add Brazil path unit tests in `tests/unit/data/brazil-path.test.ts`
- [x] T077 [US5] Implement Brazil path data builder in `src/lib/data/brazilPath.ts`
- [x] T078 [P] [US5] Create Brazil path component in `src/components/brazil/BrazilPath.astro`
- [x] T079 [P] [US5] Create conditional opponent component in `src/components/brazil/ConditionalOpponent.astro`
- [x] T080 [US5] Implement Brazil route in `src/pages/brasil.astro`
- [x] T081 [US5] Implement Brazil page styles in `src/styles/brazil.css`
- [x] T082 [US5] Add Brazil title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

### Gate Evidence - G08

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/15#issuecomment-4614956325
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/15#issuecomment-4614957910
- Next gate unlocked after approval: G09

---

## Gate G09 - Match Detail Pages

**Task scope**: T083-T090

**Status**: LOCKED until G08 is approved

**Story**: US6 - Consultar uma partida específica (Priority: P2)

**Purpose**: Add shareable `/jogos/[slug]` detail pages.

**Independent test**: Open a future, live, and finished `/jogos/[match-slug]` fixture route and verify each state displays correctly with return navigation.

**Dev output**: Match detail builder, match header, match notes, dynamic route, styles, and metadata generation.

**Reviewer must test**:

- Open fixture match pages for future, live, and finished states.
- Verify phase, teams/pending slots, BRT time, venue, status, score, freshness, notes, and return links.
- Verify metadata avoids unstable or unsupported claims.
- Run match page and match detail tests.

### Tasks

- [x] T083 [P] [US6] Add match page e2e tests in `tests/e2e/match-page.spec.ts`
- [x] T084 [P] [US6] Add match detail unit tests in `tests/unit/data/match-detail.test.ts`
- [x] T085 [US6] Implement match detail data builder in `src/lib/data/matchDetail.ts`
- [x] T086 [P] [US6] Create match header component in `src/components/match/MatchHeader.astro`
- [x] T087 [P] [US6] Create match notes component in `src/components/match/MatchNotes.astro`
- [x] T088 [US6] Implement dynamic match route in `src/pages/jogos/[slug].astro`
- [x] T089 [US6] Implement match page styles in `src/styles/match.css`
- [x] T090 [US6] Add match page metadata generation in `src/lib/seo/pageMetadata.ts`

### Gate Evidence - G09

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/16#issuecomment-4614971393
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/16#issuecomment-4614972839
- Next gate unlocked after approval: G10

---

## Gate G10 - Radar

**Task scope**: T091-T097

**Status**: LOCKED until G09 is approved

**Story**: US7 - Ver radar resumido do momento (Priority: P3)

**Purpose**: Add concise `/radar` editorial signals.

**Independent test**: Open `/radar` with active and empty radar fixtures and verify concise signals, related links, and empty-state behavior.

**Dev output**: Radar data builder, radar item component, radar route, styles, and metadata.

**Reviewer must test**:

- Open `/radar` with active and empty states.
- Verify signals are concise and link to relevant context.
- Verify radar does not become heavy analysis or dashboard metrics.
- Run radar route and radar data tests.

### Tasks

- [x] T091 [P] [US7] Add radar route e2e tests in `tests/e2e/radar.spec.ts`
- [x] T092 [P] [US7] Add radar data unit tests in `tests/unit/data/radar.test.ts`
- [x] T093 [US7] Implement radar data builder in `src/lib/data/radarView.ts`
- [x] T094 [P] [US7] Create radar item component in `src/components/radar/RadarItem.astro`
- [x] T095 [US7] Implement radar route in `src/pages/radar.astro`
- [x] T096 [US7] Implement radar styles in `src/styles/radar.css`
- [x] T097 [US7] Add radar title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

### Gate Evidence - G10

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/17#issuecomment-4614984205
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/17#issuecomment-4614985420
- Next gate unlocked after approval: G11

---

## Gate G11 - Operations And Public Governance

**Task scope**: T098-T105

**Status**: LOCKED until G10 is approved

**Story**: US8 - Operar dados confiáveis e registros públicos limpos (Priority: P3)

**Purpose**: Add public-safe operational workflow, CI validation, hygiene docs, subdomain docs, and deployment note template.

**Independent test**: Run refresh/log/public-hygiene checks and verify internal operational details do not appear on public routes.

**Dev output**: Health summary, structured log helpers, public hygiene docs, subdomain docs, validation workflow, and deployment note template.

**Reviewer must test**:

- Run health log integration tests.
- Run public hygiene route tests.
- Verify CI workflow runs relevant validation commands.
- Verify operations docs exclude secrets, raw logs, private notes, local paths, and internal diagnostics from public pages.
- Verify GitHub governance requirements are documented.

### Tasks

- [x] T098 [P] [US8] Add structured health log integration tests in `tests/integration/refresh/health-logs.test.ts`
- [x] T099 [P] [US8] Add public hygiene route tests in `tests/e2e/public-hygiene.spec.ts`
- [x] T100 [US8] Implement internal health summary builder in `src/lib/observability/healthSummary.ts`
- [x] T101 [US8] Implement structured log event helpers in `src/lib/observability/events.ts`
- [x] T102 [US8] Document public hygiene review rules in `docs/operations/public-hygiene.md`
- [x] T103 [US8] Document subdomain, metadata, robots, and route operations in `docs/operations/subdomain.md`
- [x] T104 [US8] Add validation workflow for tests and builds in `.github/workflows/validate.yml`
- [x] T105 [US8] Create deployment note template in `docs/operations/deployment-note-template.md`

### Gate Evidence - G11

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/18#issuecomment-4614994943
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/18#issuecomment-4614995956
- Next gate unlocked after approval: G12

---

## Gate G12 - Release Polish

**Task scope**: T106-T112

**Status**: LOCKED until G11 is approved

**Purpose**: Final documentation, metadata, robots, quickstart, GitHub records, UX review, and hygiene review before release.

**Dev output**: README, metadata review, robots review, quickstart record, deployment traceability, final UX review, and final public hygiene review.

**Reviewer must test**:

- Run the full quickstart checklist.
- Verify every public route has acceptable metadata and public hygiene.
- Verify `robots.txt` aligns with public/private boundary.
- Verify GitHub records link issues, branch, commits/PRs, and deployment notes.
- Verify final UX review is complete and unresolved issues are recorded.

### Tasks

- [x] T106 [P] Update implementation overview and local commands in `README.md`
- [x] T107 [P] Review public metadata content for every route in `src/lib/seo/pageMetadata.ts`
- [x] T108 [P] Verify public crawling and private route exclusions in `public/robots.txt`
- [x] T109 Run the full command checklist and record deviations in `specs/001-copa-folheto-mvp/quickstart.md`
- [x] T110 Record GitHub issue, branch, PR, and deployment traceability in `docs/operations/deployment-note-template.md`
- [x] T111 Complete final UX review findings in `docs/reviews/ux-review-template.md`
- [x] T112 Complete final public hygiene review notes in `docs/operations/public-hygiene.md`

### Gate Evidence - G12

- Dev status: DEV_DONE
- Dev evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/19#issuecomment-4615004490
- Reviewer status: APPROVED
- Reviewer mode: subagent unless owner requests manual-session
- Reviewer evidence: https://github.com/rodrigoblasi/copa.blasi.io/issues/19#issuecomment-4615005380
- Next gate unlocked after approval: owner release decision

---

## Dependencies & Execution Order

### Gate Dependencies

- **G01 Project Scaffold**: no dependencies.
- **G02 Data Foundation**: depends on G01 approval.
- **G03 Shared UX, SEO, Logging Foundation**: depends on G02 approval.
- **G04 MVP Home Tabelao**: depends on G03 approval.
- **G06 UX Quality Gate**: depends on G04 approval and is mandatory before accepting the MVP home.
- **G05 Official Data Refresh And Fallback**: depends on G06 approval.
- **G07 Calendar Surface**: depends on G05 approval.
- **G08 Brazil Path**: depends on G07 approval.
- **G09 Match Detail Pages**: depends on G08 approval.
- **G10 Radar**: depends on G09 approval.
- **G11 Operations And Public Governance**: depends on G10 approval.
- **G12 Release Polish**: depends on G11 approval.

### Parallel Opportunities Within Gates

- G01: T003-T006 and T008-T010 can run in parallel after T001/T002 are understood.
- G02: T014, T015, T018, T019, T021, and T023 can run in parallel after schemas are defined.
- G03: T025, T028, and T030 can run in parallel with independent files.
- G04: T034, T035, T037, T038, T039, T040, and T041 can run in parallel after contracts are understood.
- G06: T057, T058, T059, and T064 can run in parallel.
- Later gates: tests marked `[P]` can run in parallel before implementation tasks.

### Cross-Gate Parallelism

Cross-gate implementation is disabled by default. It requires explicit owner approval recorded in GitHub and still needs independent reviewer approval per gate.

---

## Implementation Strategy

### MVP First

1. Complete G01.
2. Invoke reviewer subagent and record `Decision: APPROVED` for G01.
3. Complete G02.
4. Invoke reviewer subagent and record `Decision: APPROVED` for G02.
5. Complete G03.
6. Invoke reviewer subagent and record `Decision: APPROVED` for G03.
7. Complete G04.
8. Invoke reviewer subagent and record `Decision: APPROVED` for G04.
9. Complete G06.
10. Invoke reviewer subagent and record `Decision: APPROVED` for G06.
11. Stop for owner/MVP review before continuing to G05 unless owner already approved continuation.

### Dev Session Kickoff

The implementation session must start by reading:

- `AGENTS.md`
- `specs/001-copa-folheto-mvp/plan.md`
- `specs/001-copa-folheto-mvp/tasks.md`
- `docs/spec-kit-session-methodology.md`
- `docs/spec-kit-gates.md`
- `docs/github-record-templates.md`
- `docs/reviewer-session-prompt.md`

Then identify the first `OPEN` gate in the Gate Map and implement only that gate.

### Validation Strategy

1. Write test tasks before implementation tasks in each gate when tests are listed.
2. Validate source/fallback behavior with fixtures before public rendering.
3. Validate UX guardrails against `specs/001-copa-folheto-mvp/ux-intelligence.md` before accepting primary screens.
4. Keep all governance and deployment decisions in GitHub records linked to issues #1 through #7.
5. Every gate ends with a reviewer subagent decision copied to GitHub and reflected in this file.
