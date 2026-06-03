# Tasks: Copa Folheto MVP

**Input**: Design documents from `specs/001-copa-folheto-mvp/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `ux-intelligence.md`

**GitHub**: Tasks trace to issues #1 through #7 and branch `001-use-issues-abertas` for `https://github.com/rodrigoblasi/copa.blasi.io/`.

**Tests**: Required for constitution-critical data transformations, scheduled refreshes, fallback behavior, match state changes, structured logging, public result display, mobile usability, focus states, and UX anti-pattern review.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the static-first Astro + TypeScript project and baseline validation tooling.

- [ ] T001 Create root Astro project manifest with dependencies and scripts in `package.json`
- [ ] T002 Configure Astro static output and site metadata base in `astro.config.mjs`
- [ ] T003 [P] Configure TypeScript compiler settings in `tsconfig.json`
- [ ] T004 [P] Configure Vitest project aliases and coverage defaults in `vitest.config.ts`
- [ ] T005 [P] Configure Playwright browsers, base URL, and mobile projects in `playwright.config.ts`
- [ ] T006 [P] Create accessibility helper for route tests in `tests/e2e/a11y-helper.ts`
- [ ] T007 Create base HTML layout shell in `src/layouts/BaseLayout.astro`
- [ ] T008 [P] Create global stylesheet entry in `src/styles/global.css`
- [ ] T009 [P] Create public robots rules for user-facing routes in `public/robots.txt`
- [ ] T010 [P] Create source directory placeholders in `src/content/data/canonical/.gitkeep`, `src/content/data/fixtures/.gitkeep`, `src/content/data/generated/.gitkeep`, and `src/content/notes/.gitkeep`

**Checkpoint**: Project skeleton exists and package/tooling files are ready for foundational data and UI work.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data, validation, logging, SEO, and UX infrastructure that all user stories depend on.

**Critical**: No user story implementation should start until this phase is complete.

- [ ] T011 Define tournament enums and shared TypeScript types in `src/lib/data/types.ts`
- [ ] T012 Implement canonical dataset schemas from the data contract in `src/lib/data/schemas.ts`
- [ ] T013 Create initial canonical tournament dataset fixture in `src/content/data/canonical/tournament.json`
- [ ] T014 [P] Create match-state coverage fixtures in `src/content/data/fixtures/match-states.json`
- [ ] T015 [P] Create freshness/fallback coverage fixtures in `src/content/data/fixtures/freshness-cases.json`
- [ ] T016 Implement canonical data loader in `src/lib/data/loadTournament.ts`
- [ ] T017 Implement dataset validation service in `src/lib/data/validateTournament.ts`
- [ ] T018 [P] Add schema validation tests in `tests/unit/data/schemas.test.ts`
- [ ] T019 [P] Add match status transition tests in `tests/unit/transforms/match-state.test.ts`
- [ ] T020 Implement freshness and fallback state logic in `src/lib/data/freshness.ts`
- [ ] T021 [P] Add freshness and fallback tests in `tests/unit/transforms/freshness.test.ts`
- [ ] T022 Implement BRT kickoff time helper in `src/lib/data/brt-time.ts`
- [ ] T023 [P] Add BRT conversion tests in `tests/unit/transforms/brt-time.test.ts`
- [ ] T024 Implement public-safe structured logger in `src/lib/observability/logger.ts`
- [ ] T025 [P] Add logger public-hygiene tests in `tests/unit/data/logger-public-hygiene.test.ts`
- [ ] T026 Implement public metadata helper in `src/lib/seo/pageMetadata.ts`
- [ ] T027 Implement UX guardrail definitions from the design brief in `src/lib/ux/guardrails.ts`
- [ ] T028 [P] Add UX guardrail unit tests in `tests/unit/ux/guardrails.test.ts`
- [ ] T029 Create reusable status label component in `src/components/status/StatusLabel.astro`
- [ ] T030 [P] Create site navigation component in `src/components/navigation/SiteNav.astro`
- [ ] T031 Implement public data build script in `src/scripts/build-public-data.ts`
- [ ] T032 Implement data validation CLI script in `src/scripts/validate-data.ts`
- [ ] T033 Wire npm scripts for dev, build, preview, tests, data validation, and accessibility in `package.json`

**Checkpoint**: Data contracts, validation, logging, metadata, base navigation, and UX guardrails are available for all story slices.

---

## Phase 3: User Story 1 - Ver a Copa inteira na home (Priority: P1) MVP

**Goal**: Home shows a one-page tabelao overview with groups, group-stage matches, current phase, next/recent matches, knockout structure, Brazil emphasis, and intentional pending slots.

**Independent Test**: Open `/` on desktop and mobile and verify a first-time visitor can find groups, group-stage match areas, knockout/final area, Brazil, next/recent matches, and update state in 45 seconds or less.

### Tests for User Story 1

- [ ] T034 [P] [US1] Add home overview route test in `tests/e2e/home-overview.spec.ts`
- [ ] T035 [P] [US1] Add home view-model unit tests in `tests/unit/data/home-overview.test.ts`

### Implementation for User Story 1

- [ ] T036 [US1] Implement home overview data builder in `src/lib/data/homeOverview.ts`
- [ ] T037 [P] [US1] Create tournament header component in `src/components/home/TournamentHeader.astro`
- [ ] T038 [P] [US1] Create group section component in `src/components/home/GroupSection.astro`
- [ ] T039 [P] [US1] Create compact match block component in `src/components/match/MatchBlock.astro`
- [ ] T040 [P] [US1] Create knockout bracket component in `src/components/home/KnockoutBracket.astro`
- [ ] T041 [P] [US1] Create Brazil highlight component in `src/components/home/BrazilHighlight.astro`
- [ ] T042 [US1] Implement home route composition in `src/pages/index.astro`
- [ ] T043 [US1] Implement responsive tabelao home styles in `src/styles/home.css`
- [ ] T044 [US1] Add representative home seed data with groups and pending bracket slots in `src/content/data/canonical/tournament.json`
- [ ] T045 [US1] Add home title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

**Checkpoint**: US1 works independently as the MVP home overview.

---

## Phase 4: User Story 2 - Acompanhar preenchimento progressivo por dados oficiais (Priority: P1)

**Goal**: Official or documented reliable updates progressively fill groups, matches, scores, classifications, and bracket slots with visible freshness/fallback states.

**Independent Test**: Run refresh fixtures for incomplete, updated, stale, conflicting, and source-problem cases and verify the home shows the correct public state labels without invented values.

### Tests for User Story 2

- [ ] T046 [P] [US2] Add refresh contract integration tests in `tests/integration/refresh/refresh-contract.test.ts`
- [ ] T047 [P] [US2] Add fallback label rendering tests in `tests/unit/transforms/fallback-labels.test.ts`
- [ ] T048 [P] [US2] Add source conflict transformation tests in `tests/unit/transforms/source-conflict.test.ts`

### Implementation for User Story 2

- [ ] T049 [US2] Implement approved source registry in `src/lib/data/sourceRegistry.ts`
- [ ] T050 [US2] Implement official source adapter boundary in `src/lib/data/sources/fifaSource.ts`
- [ ] T051 [US2] Implement scheduled refresh script and dry-run mode in `src/scripts/refresh-data.ts`
- [ ] T052 [US2] Implement source conflict resolver in `src/lib/data/sourceConflicts.ts`
- [ ] T053 [US2] Implement fallback summary builder in `src/lib/data/fallbackSummary.ts`
- [ ] T054 [US2] Add freshness and conflict rendering support in `src/components/status/StatusLabel.astro`
- [ ] T055 [US2] Add generated public dataset output contract in `src/content/data/generated/public-tournament.json`
- [ ] T056 [US2] Document source cadence and fallback operations in `docs/operations/data-refresh.md`

**Checkpoint**: US2 can update and validate public tournament data independently from the UI detail pages.

---

## Phase 5: User Story 4 - Usar uma interface bonita e clara (Priority: P1)

**Goal**: Primary screens follow `ux-intelligence.md`: one dominant reading path, strong hierarchy, high contrast, mobile readability, visible focus/touch states, intentional pending states, and no dashboard drift.

**Independent Test**: Review home and primary routes against UX guardrails and pass mobile, focus, accessibility, and anti-pattern checks.

### Tests for User Story 4

- [ ] T057 [P] [US4] Add dashboard-drift guardrail tests in `tests/unit/ux/dashboard-drift.test.ts`
- [ ] T058 [P] [US4] Add mobile usability e2e tests in `tests/e2e/mobile-usability.spec.ts`
- [ ] T059 [P] [US4] Add focus and touch state e2e tests in `tests/e2e/focus-states.spec.ts`

### Implementation for User Story 4

- [ ] T060 [US4] Define restrained folheto design tokens in `src/styles/tokens.css`
- [ ] T061 [US4] Apply typography, contrast, and whitespace system in `src/styles/global.css`
- [ ] T062 [US4] Implement status and uncertainty visual states in `src/styles/status.css`
- [ ] T063 [US4] Refine home reading path and mobile collapse behavior in `src/styles/home.css`
- [ ] T064 [P] [US4] Create visual review template in `docs/reviews/ux-review-template.md`
- [ ] T065 [US4] Map UX guardrails to testable review questions in `src/lib/ux/guardrails.ts`
- [ ] T066 [US4] Wire focus and navigation conventions into `src/layouts/BaseLayout.astro`

**Checkpoint**: US4 provides the UX quality gate for the MVP and prevents generic dashboard output.

---

## Phase 6: User Story 3 - Navegar pelo calendário completo (Priority: P2)

**Goal**: Calendar route shows matches by phase, day, group, BRT kickoff time, status, Brazil emphasis, and uncertainty labels.

**Independent Test**: Open `/calendario` and locate matches by phase/day/group, verify Brazil highlighting, and confirm unknown values are explicit.

### Tests for User Story 3

- [ ] T067 [P] [US3] Add calendar route e2e tests in `tests/e2e/calendar.spec.ts`
- [ ] T068 [P] [US3] Add calendar grouping unit tests in `tests/unit/data/calendar.test.ts`

### Implementation for User Story 3

- [ ] T069 [US3] Implement calendar data builder in `src/lib/data/calendarView.ts`
- [ ] T070 [P] [US3] Create phase calendar component in `src/components/match/PhaseCalendar.astro`
- [ ] T071 [P] [US3] Create calendar day component in `src/components/match/CalendarDay.astro`
- [ ] T072 [US3] Implement calendar route in `src/pages/calendario.astro`
- [ ] T073 [US3] Implement calendar responsive styles in `src/styles/calendar.css`
- [ ] T074 [US3] Add calendar title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

**Checkpoint**: US3 works as a secondary detailed consultation surface while home remains primary.

---

## Phase 7: User Story 5 - Acompanhar o caminho do Brasil (Priority: P2)

**Goal**: Brazil route shows known Brazil matches, scores, concise context, notes, and conditional future opponents without obscuring the whole tournament.

**Independent Test**: Open `/brasil` and verify known Brazil matches, pending/conditional future opponents, concise notes, and return links to home/match context.

### Tests for User Story 5

- [ ] T075 [P] [US5] Add Brazil route e2e tests in `tests/e2e/brazil.spec.ts`
- [ ] T076 [P] [US5] Add Brazil path unit tests in `tests/unit/data/brazil-path.test.ts`

### Implementation for User Story 5

- [ ] T077 [US5] Implement Brazil path data builder in `src/lib/data/brazilPath.ts`
- [ ] T078 [P] [US5] Create Brazil path component in `src/components/brazil/BrazilPath.astro`
- [ ] T079 [P] [US5] Create conditional opponent component in `src/components/brazil/ConditionalOpponent.astro`
- [ ] T080 [US5] Implement Brazil route in `src/pages/brasil.astro`
- [ ] T081 [US5] Implement Brazil page styles in `src/styles/brazil.css`
- [ ] T082 [US5] Add Brazil title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

**Checkpoint**: US5 works independently as the Brazil-focused detail surface.

---

## Phase 8: User Story 6 - Consultar uma partida específica (Priority: P2)

**Goal**: Match detail routes show phase, teams or pending slots, BRT kickoff, venue, status, score, source/freshness state, concise notes, and return links.

**Independent Test**: Open a future, live, and finished `/jogos/[match-slug]` fixture route and verify each state displays correctly with return navigation.

### Tests for User Story 6

- [ ] T083 [P] [US6] Add match page e2e tests in `tests/e2e/match-page.spec.ts`
- [ ] T084 [P] [US6] Add match detail unit tests in `tests/unit/data/match-detail.test.ts`

### Implementation for User Story 6

- [ ] T085 [US6] Implement match detail data builder in `src/lib/data/matchDetail.ts`
- [ ] T086 [P] [US6] Create match header component in `src/components/match/MatchHeader.astro`
- [ ] T087 [P] [US6] Create match notes component in `src/components/match/MatchNotes.astro`
- [ ] T088 [US6] Implement dynamic match route in `src/pages/jogos/[slug].astro`
- [ ] T089 [US6] Implement match page styles in `src/styles/match.css`
- [ ] T090 [US6] Add match page metadata generation in `src/lib/seo/pageMetadata.ts`

**Checkpoint**: US6 works independently for direct shared match URLs.

---

## Phase 9: User Story 7 - Ver radar resumido do momento (Priority: P3)

**Goal**: Radar route shows concise editorial signals for important upcoming matches, recent results, crossings, and relevant changes without heavy analysis.

**Independent Test**: Open `/radar` with active and empty radar fixtures and verify concise signals, related links, and empty-state behavior.

### Tests for User Story 7

- [ ] T091 [P] [US7] Add radar route e2e tests in `tests/e2e/radar.spec.ts`
- [ ] T092 [P] [US7] Add radar data unit tests in `tests/unit/data/radar.test.ts`

### Implementation for User Story 7

- [ ] T093 [US7] Implement radar data builder in `src/lib/data/radarView.ts`
- [ ] T094 [P] [US7] Create radar item component in `src/components/radar/RadarItem.astro`
- [ ] T095 [US7] Implement radar route in `src/pages/radar.astro`
- [ ] T096 [US7] Implement radar styles in `src/styles/radar.css`
- [ ] T097 [US7] Add radar title, description, and canonical metadata in `src/lib/seo/pageMetadata.ts`

**Checkpoint**: US7 works independently as a lightweight editorial summary.

---

## Phase 10: User Story 8 - Operar dados confiáveis e registros públicos limpos (Priority: P3)

**Goal**: Maintainer can validate health, structured logs, GitHub governance, public hygiene, deployment notes, and subdomain behavior without exposing internal diagnostics publicly.

**Independent Test**: Run refresh/log/public-hygiene checks and verify internal operational details do not appear on public routes.

### Tests for User Story 8

- [ ] T098 [P] [US8] Add structured health log integration tests in `tests/integration/refresh/health-logs.test.ts`
- [ ] T099 [P] [US8] Add public hygiene route tests in `tests/e2e/public-hygiene.spec.ts`

### Implementation for User Story 8

- [ ] T100 [US8] Implement internal health summary builder in `src/lib/observability/healthSummary.ts`
- [ ] T101 [US8] Implement structured log event helpers in `src/lib/observability/events.ts`
- [ ] T102 [US8] Document public hygiene review rules in `docs/operations/public-hygiene.md`
- [ ] T103 [US8] Document subdomain, metadata, robots, and route operations in `docs/operations/subdomain.md`
- [ ] T104 [US8] Add validation workflow for tests and builds in `.github/workflows/validate.yml`
- [ ] T105 [US8] Create deployment note template in `docs/operations/deployment-note-template.md`

**Checkpoint**: US8 gives maintainers a public-safe operational workflow.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, documentation, governance, performance, and release checks across all stories.

- [ ] T106 [P] Update implementation overview and local commands in `README.md`
- [ ] T107 [P] Review public metadata content for every route in `src/lib/seo/pageMetadata.ts`
- [ ] T108 [P] Verify public crawling and private route exclusions in `public/robots.txt`
- [ ] T109 Run the full command checklist and record deviations in `specs/001-copa-folheto-mvp/quickstart.md`
- [ ] T110 Record GitHub issue, branch, PR, and deployment traceability in `docs/operations/deployment-note-template.md`
- [ ] T111 Complete final UX review findings in `docs/reviews/ux-review-template.md`
- [ ] T112 Complete final public hygiene review notes in `docs/operations/public-hygiene.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies.
- **Phase 2 Foundational**: Depends on Phase 1 and blocks all user story work.
- **Phase 3 US1**: Depends on Phase 2 and is the MVP slice.
- **Phase 4 US2**: Depends on Phase 2 and can run alongside US1 after foundation, but integrates best after US1 home states exist.
- **Phase 5 US4**: Depends on Phase 2 and should run with US1 because it is the UX quality gate for the MVP.
- **Phase 6 US3**: Depends on Phase 2 and can run after shared match/calendar data builders exist.
- **Phase 7 US5**: Depends on Phase 2 and can run after shared team/match data exists.
- **Phase 8 US6**: Depends on Phase 2 and can run after shared match data exists.
- **Phase 9 US7**: Depends on Phase 2 and can run after shared radar and match link patterns exist.
- **Phase 10 US8**: Depends on Phase 2 and can run in parallel with later feature stories.
- **Phase 11 Polish**: Depends on all selected user stories for the release scope.

### User Story Dependencies

- **US1 Home overview (P1)**: MVP story; no dependency on other user stories after foundation.
- **US2 Progressive official data (P1)**: No dependency on other user stories after foundation, but improves US1 when integrated.
- **US4 UX clarity (P1)**: No dependency on other user stories after foundation, but must be applied to all public screens before acceptance.
- **US3 Calendar (P2)**: No dependency on Brazil, match page, or radar stories after foundation.
- **US5 Brazil path (P2)**: Depends only on shared match/team data from foundation.
- **US6 Match detail (P2)**: Depends only on shared match/team/venue/score data from foundation.
- **US7 Radar (P3)**: Depends only on shared match/team/radar data from foundation.
- **US8 Operations (P3)**: Depends only on logging/validation foundations.

### Parallel Opportunities

- Setup tasks T003-T006 and T008-T010 can run in parallel after T001 is started.
- Foundational fixture, test, SEO, logger, and UX guardrail tasks marked [P] can run in parallel with different files.
- After Phase 2, US1, US2, US4, US3, US5, US6, US7, and US8 can be assigned to separate agents, with US1 as the MVP priority.
- Within each user story, tests marked [P] can be written in parallel before implementation.
- Component tasks marked [P] can run in parallel with data-builder tasks when they use agreed contracts.

---

## Parallel Execution Examples

### User Story 1

```text
Task: T034 Add home overview route test in tests/e2e/home-overview.spec.ts
Task: T035 Add home view-model unit tests in tests/unit/data/home-overview.test.ts
Task: T037 Create tournament header component in src/components/home/TournamentHeader.astro
Task: T038 Create group section component in src/components/home/GroupSection.astro
Task: T040 Create knockout bracket component in src/components/home/KnockoutBracket.astro
```

### User Story 2

```text
Task: T046 Add refresh contract integration tests in tests/integration/refresh/refresh-contract.test.ts
Task: T047 Add fallback label rendering tests in tests/unit/transforms/fallback-labels.test.ts
Task: T048 Add source conflict transformation tests in tests/unit/transforms/source-conflict.test.ts
```

### User Story 4

```text
Task: T057 Add dashboard-drift guardrail tests in tests/unit/ux/dashboard-drift.test.ts
Task: T058 Add mobile usability e2e tests in tests/e2e/mobile-usability.spec.ts
Task: T059 Add focus and touch state e2e tests in tests/e2e/focus-states.spec.ts
Task: T064 Create visual review template in docs/reviews/ux-review-template.md
```

### User Stories 3, 5, 6, 7, and 8

```text
Task: T067 Add calendar route e2e tests in tests/e2e/calendar.spec.ts
Task: T075 Add Brazil route e2e tests in tests/e2e/brazil.spec.ts
Task: T083 Add match page e2e tests in tests/e2e/match-page.spec.ts
Task: T091 Add radar route e2e tests in tests/e2e/radar.spec.ts
Task: T098 Add structured health log integration tests in tests/integration/refresh/health-logs.test.ts
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1 home overview).
3. Complete Phase 5 (US4 UX quality gate) for the home surface.
4. Validate home independently with T034, T035, T057, T058, and T059.
5. Demo or deploy only if public hygiene and freshness labels pass.

### Incremental Delivery

1. Add Phase 4 (US2) to support progressive official-data updates.
2. Add Phase 6 (US3) for full calendar consultation.
3. Add Phase 7 (US5) for Brazil path.
4. Add Phase 8 (US6) for match detail URLs.
5. Add Phase 9 (US7) for concise radar.
6. Add Phase 10 (US8) for complete operational workflow.
7. Finish Phase 11 polish before public release.

### Validation Strategy

1. Write test tasks before implementation tasks in each story phase.
2. Validate source/fallback behavior with fixtures before public rendering.
3. Validate UX guardrails against `specs/001-copa-folheto-mvp/ux-intelligence.md` before accepting primary screens.
4. Keep all governance and deployment decisions in GitHub records linked to issues #1 through #7.
