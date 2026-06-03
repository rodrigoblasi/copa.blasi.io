# Tasks: Standardize Match Cards

**Input**: Design documents from `specs/002-standardize-match-cards/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**GitHub**: Tasks MUST trace back to https://github.com/rodrigoblasi/copa.blasi.io/issues/21 and branch `002-standardize-match-cards`

**Tests**: Constitution-critical data transformations (slot label translation, emphasis classification, score resolution, knockout grouping, metadata strings, match state display) require automated tests per CCR-008. E2E tests for route-level behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Source**: `src/` at repository root
- **Tests**: `tests/` at repository root
- **Static assets**: `public/` at repository root
- **Styles**: `src/styles/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the project is ready and no drift exists before feature work

- [ ] T001 Verify baseline passes: run `npm run check && npm run test && npm run build` on branch `002-standardize-match-cards`
- [ ] T002 [P] Document current state snapshot: capture existing "Mata-Mata" occurrences, "MVP" title instances, and missing favicon status for regression reference

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared helpers and CSS tokens that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Create knockout slot label translation helper `src/lib/data/slotLabels.ts` with lookup table mapping English source labels (e.g., "Winner Group A", "Runner-up Group C", "3rd Group C/D/F/G/H", "Winner Match 74", "Loser Match 101") and any already-Portuguese labels to canonical Portuguese output (e.g., "1º Grupo A", "2º Grupo C", "3º Grp C/D/F/G/H", "Venc. Jogo 74", "Perd. Jogo 101")
- [ ] T004 [P] Create match emphasis classification helper `src/lib/data/emphasis.ts` that takes a match and returns `{ level: 'brazil' | 'group-c' | 'featured' | 'regular', ariaLabel: string }` based on team involvement, Group C membership, and featured metadata (Brazil takes precedence over Group C; no featured matches activated in this feature)
- [ ] T005 [P] Create round label constants `src/lib/data/roundLabels.ts` mapping data round values (e.g., "Round of 32", "r32", "Round of 16", "Quartas de Final", "Semifinal", "Disputa de 3º lugar", "Final") to official Portuguese display names ("32 avos de final", "Oitavas de final", "Quartas de final", "Semifinal", "Disputa de 3º lugar", "Final")
- [ ] T006 [P] Create knockout phase subdivision helper `src/lib/data/knockoutPhases.ts` that groups knockout matches (M73-M104) by round (32 avos, Oitavas, Quartas, Semifinal, 3º Lugar, Final) with date and time ordering within each round
- [ ] T007 [P] Add CSS tokens for Group C emphasis in `src/styles/tokens.css` (background tint, left border accent color distinct from Brazil green); add CSS token for featured-emphasis border accent (reserved, not activated); add sr-only utility class if not present in `src/styles/global.css`
- [ ] T008 [P] Create score display helper `src/lib/data/scoreDisplay.ts` that produces `"- x -"` placeholder for future/unavailable scores, actual score string for finished/live matches, and existing uncertainty display for data-problem states

**Checkpoint**: Foundation ready — all shared helpers created, user story implementation can now begin

---

## Phase 3: User Story 1 - Read Consistent Match Cards (Priority: P1) 🎯 MVP

**Goal**: Every match card on home and calendar pages shows the same required details (formatted date, BRT time, flags, team names, score/placeholder, city/state, stadium link) with visual emphasis levels (Brazil strongest, Group C intermediate, Regular clean) and sr-only/aria-label annotations.

**Independent Test**: Compare match cards on home page and calendar page; confirm each card exposes the same essential match information with the same visual hierarchy, including emphasis distinctions.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Unit test for emphasis classification helper in `tests/unit/data/emphasis.test.ts` — verify Brazil cards get `brazil` level + `"Jogo do Brasil"` ariaLabel, Group C non-Brazil cards get `group-c` level + `"Jogo do Grupo C"` ariaLabel, regular matches get `regular` + empty ariaLabel, Brazil takes precedence over Group C
- [ ] T010 [P] [US1] Unit test for score display helper in `tests/unit/data/scoreDisplay.test.ts` — verify future matches show `"- x -"`, finished matches show actual score, data-problem states show uncertainty display
- [ ] T011 [P] [US1] E2E test for home/calendar card parity in `tests/e2e/home-overview.spec.ts` — add check that home and calendar cards for a shared match show same date format, BRT time, team names, score state, city, and stadium link
- [ ] T012 [P] [US1] E2E test for match card emphasis visibility in `tests/e2e/home-overview.spec.ts` — add check that Brazil cards have sr-only/aria-label "Jogo do Brasil", Group C cards have "Jogo do Grupo C", regular cards have no emphasis annotation

### Implementation for User Story 1

- [ ] T013 [US1] Resolve stadium name and map link in calendar view model in `src/lib/data/calendarView.ts` — enrich match display fields with `stadiumLabel` (from match.venue) and `stadiumMapUrl` (from venue data or external map link) alongside existing city resolution
- [ ] T014 [US1] Resolve stadium name and map link in home overview view model in `src/lib/data/homeOverview.ts` — enrich knockout match display fields with `stadiumLabel` and `stadiumMapUrl`
- [ ] T015 [US1] Integrate score display helper into match card in `src/components/match/MatchBlock.astro` — replace static `- x -` with dynamic score from `scoreDisplay.ts` helper; show actual score for finished/live matches, placeholder for future
- [ ] T016 [US1] Integrate emphasis classification into match card in `src/components/match/MatchBlock.astro` — apply CSS classes for `brazil` (background tint + left green border accent), `group-c` (subtler background tint + distinct border accent), `regular` (no accent); add sr-only span with `emphasisAriaLabel` for Brazil and Group C cards; reserve `featured` class path for future activation
- [ ] T017 [US1] Add stadium link display to match card in `src/components/match/MatchBlock.astro` — render `stadiumLabel` as a linked element (map URL) next to `cityStateLabel` when both are available
- [ ] T018 [US1] Apply unified match card display to home page in `src/pages/index.astro` — ensure all group-stage and knockout match cards rendered on home use the same `MatchBlock.astro` component with full required fields
- [ ] T019 [US1] Apply unified match card display to calendar page in `src/pages/calendario.astro` and `src/components/match/PhaseCalendar.astro` — ensure calendar match cards use the same `MatchBlock.astro` with identical information model and emphasis rules

**Checkpoint**: At this point, User Story 1 should be fully functional — home and calendar match cards are consistent, emphasis levels are visible and accessible, scores and stadium links work

---

## Phase 4: User Story 2 - Understand the Knockout Phase Before Teams Are Known (Priority: P2)

**Goal**: Knockout matches are visible before teams are known, showing human-readable Portuguese slot labels, date, BRT time, city, and stadium. Official "Fase Eliminatória" terminology replaces "Mata-Mata" everywhere public.

**Independent Test**: View knockout matches before teams are known; confirm cards show official Portuguese slot labels (not internal IDs), date, BRT time, city, stadium; confirm "Fase Eliminatória" is used instead of "Mata-Mata".

### Tests for User Story 2 ⚠️

- [ ] T020 [P] [US2] Unit test for slot label translation in `tests/unit/transforms/slotLabels.test.ts` — verify English source labels map to Portuguese (e.g., "Winner Group A" → "1º Grupo A", "Runner-up Group B" → "2º Grupo B", "3rd Group C/D/E/F" → "3º Grp C/D/E/F", "Winner Match 74" → "Venc. Jogo 74", "Loser Match 101" → "Perd. Jogo 101"), already-Portuguese labels pass through unchanged, unknown patterns use existing uncertainty fallback
- [ ] T021 [P] [US2] Unit test for knockout phase grouping in `tests/unit/data/knockoutPhases.test.ts` — verify M73-M104 grouped by round (32 avos: 16 matches, Oitavas: 8, Quartas: 4, Semifinal: 2, 3º Lugar: 1, Final: 1), ordered by date and time within each round
- [ ] T022 [P] [US2] E2E test for terminology in `tests/e2e/public-hygiene.spec.ts` — add checks that no public page contains "Mata-Mata", "R32", or informal knockout terminology; verify "Fase Eliminatória", "32 avos de final", "Oitavas de final", "Quartas de final", "Semifinal", "Disputa de 3º lugar", "Final" appear

### Implementation for User Story 2

- [ ] T023 [US2] Replace "Mata-Mata" with "Fase Eliminatória" in calendar view model in `src/lib/data/calendarView.ts` — update `phaseLabels` entry from `'knockout' → 'Mata-Mata'` to `'knockout' → 'Fase Eliminatória'`
- [ ] T024 [US2] Replace "Mata-Mata" with "Fase Eliminatória" in home page in `src/pages/index.astro` — update section comment, CSS class `.tabelao-knockout`, and any knockout label text to use "Fase Eliminatória"
- [ ] T025 [US2] Replace informal terminology in navigation and any shared labels in `src/components/navigation/SiteNav.astro` and `src/layouts/BaseLayout.astro` — ensure navigation links and accessible labels use "Fase Eliminatória"
- [ ] T026 [US2] Integrate slot label translation into calendar knockout display in `src/lib/data/calendarView.ts` — pass unresolved team labels through `slotLabels.ts` translator before display; use existing Portuguese labels directly, map internal codes
- [ ] T027 [US2] Integrate slot label translation into home overview knockout display in `src/lib/data/homeOverview.ts` — resolve `homeTeamLabel`/`awayTeamLabel` through translator for card display; ensure no internal IDs leak
- [ ] T028 [US2] Subdivide knockout section on calendar page by round using `knockoutPhases.ts` helper in `src/lib/data/calendarView.ts` — replace single "Fase Eliminatória" block with round-grouped sub-sections (32 avos de final, Oitavas de final, Quartas de final, Semifinal, Disputa de 3º lugar, Final), each showing phase header and date-grouped matches
- [ ] T029 [US2] Verify and update match detail page terminology in `src/pages/jogos/[slug].astro` and `src/lib/data/matchDetail.ts` — ensure knockout match pages use "Fase Eliminatória" and official round names

**Checkpoint**: At this point, User Stories 1 AND 2 should both work — knockout phase uses official terminology, unresolved teams show Portuguese labels, calendar knockout section is subdivided by round

---

## Phase 5: User Story 3 - Scan the Two-Sided Knockout Bracket (Priority: P2)

**Goal**: The knockout bracket shows two sides (left and right) converging toward a central Final and Disputa de 3º lugar, with official round labels and readable match cards. Works on both wide and narrow screens.

**Independent Test**: Open bracket on desktop and mobile; confirm left and right paths converge toward Final and 3º Lugar; confirm round order and match details are preserved on mobile.

### Tests for User Story 3 ⚠️

- [ ] T030 [P] [US3] E2E test for bracket structure in `tests/e2e/home-overview.spec.ts` — add check that bracket contains two sides converging to center, round order is 32 avos → Oitavas → Quartas → Semifinal on each side, Final and Disputa de 3º lugar are centrally placed
- [ ] T031 [P] [US3] E2E test for mobile bracket in `tests/e2e/mobile-usability.spec.ts` — add check that bracket at narrow viewport preserves round order, match dates, BRT times, team-slot labels, and city information without truncation

### Implementation for User Story 3

- [ ] T032 [US3] Update bracket match card display in `src/components/home/KnockoutBracket.astro` — replace hardcoded `- x -` placeholders with dynamic score display; add stadium link when available; apply the same match-card display model (date, BRT, flags when known, slot labels, city, stadium) as home/calendar
- [ ] T033 [US3] Update bracket round labels in `src/components/home/KnockoutBracket.astro` — replace English/"R32" labels with official Portuguese via `roundLabels.ts`; update bracket section title from "Mata-Mata" to "Fase Eliminatória"
- [ ] T034 [US3] Refactor bracket side split in `src/components/home/KnockoutBracket.astro` — use `knockoutBlocks` data-driven approach instead of hardcoded `leftR32 = r32.slice(0, 8)` to determine left/right side assignment based on bracket structure
- [ ] T035 [US3] Ensure mobile bracket navigation in `src/components/home/KnockoutBracket.astro` and `src/styles/home.css` — verify horizontal scroll or round-based collapse preserves round order and match details below 800px; ensure card text remains legible at narrow widths

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work — bracket is two-sided with official terminology and mobile-friendly

---

## Phase 6: User Story 4 - Recognize the Site With a Football Favicon (Priority: P3)

**Goal**: All public pages show a geometric football SVG favicon (pentagon/hexagon panel pattern, white on black) with `.ico` and Apple touch icon variants.

**Independent Test**: Open any public page in a modern browser; confirm browser tab and saved shortcut show the geometric football icon.

### Tests for User Story 4 ⚠️

- [ ] T036 [P] [US4] E2E test for favicon presence in `tests/e2e/public-hygiene.spec.ts` — add check that `<link rel="icon">` references exist (SVG and ICO) and that Apple touch icon link is present in page `<head>`

### Implementation for User Story 4

- [ ] T037 [P] [US4] Create geometric football SVG favicon in `public/favicon.svg` — classic pentagon/hexagon panel pattern, white ball on black/dark background, optimized for 16x16 to 64x64 display
- [ ] T038 [P] [US4] Generate multi-resolution `.ico` fallback in `public/favicon.ico` — convert SVG to ICO format with 16x16, 32x32, and 48x48 sizes
- [ ] T039 [P] [US4] Generate Apple touch icon in `public/apple-touch-icon.png` — 180x180 PNG from the same SVG design with appropriate padding
- [ ] T040 [US4] Link favicon assets in base layout in `src/layouts/BaseLayout.astro` — add `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`, `<link rel="icon" type="image/x-icon" href="/favicon.ico">`, and `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` in document `<head>`

**Checkpoint**: At this point, User Stories 1-4 should all work — football favicon appears in browser tabs and saved shortcuts

---

## Phase 7: User Story 5 - Recognize a Mature Copa Guide (Priority: P3)

**Goal**: All public-facing page titles, browser titles, and share-preview titles use polished Copa Folheto language without "MVP" or placeholder phrasing.

**Independent Test**: Review all public page headings and browser titles; confirm no "MVP" or weak placeholder language; confirm each title communicates a polished Copa guide purpose.

### Tests for User Story 5 ⚠️

- [ ] T041 [P] [US5] E2E test for title hygiene in `tests/e2e/public-hygiene.spec.ts` — add check that no `<title>` or `<meta property="og:title">` on any public page contains "MVP", "visão geral Z", or known placeholder phrasing

### Implementation for User Story 5

- [ ] T042 [P] [US5] Update page metadata defaults in `src/lib/seo/pageMetadata.ts` — remove "MVP" from all page title patterns; replace with polished editorial language:
  - Default: `"Copa Folheto"` (already correct in BaseLayout, confirm)
  - Home: `"Copa Folheto — Guia da Copa do Mundo 2026"`
  - Calendar: `"Calendário Completo — Copa Folheto"`
  - Brazil: `"Caminho do Brasil — Copa Folheto"` (Brazil page is out of scope for this feature but metadata string lives here)
  - Radar: `"Radar da Copa — Copa Folheto"`
  - Match detail: `"{home} x {away} — Copa Folheto"`
- [ ] T043 [P] [US5] Update home page heading in `src/pages/index.astro` — ensure main visible heading uses polished editorial language (e.g., "Guia da Copa do Mundo 2026" or similar, not "MVP" or standalone "Tabelão")
- [ ] T044 [P] [US5] Update calendar page heading in `src/pages/calendario.astro` — ensure heading communicates complete fixture consultation with polished language
- [ ] T045 [P] [US5] Update match detail page headings in `src/pages/jogos/[slug].astro` — ensure match-specific titles avoid MVP wording and clearly identify the match or pending match context
- [ ] T046 [US5] Update default browser title in `src/layouts/BaseLayout.astro` — confirm default `<title>` and Open Graph metadata use polished Copa Folheto language without "MVP"

**Checkpoint**: At this point, all 5 user stories should work — page titles communicate a mature, functional Copa guide

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validation, hygiene, and final quality checks across all stories

- [ ] T047 Run full validation suite: `npm run check && npm run test && npm run test:e2e && npm run build` — confirm 0 TypeScript errors, all tests pass, production build succeeds without warnings
- [ ] T048 [P] Public hygiene review — inspect all changed source files, generated pages, favicon assets, test files, and metadata for secrets, private notes, personal data, sensitive metadata, raw Starlog material, or local artifacts
- [ ] T049 [P] Verify internal ID leakage — search codebase for patterns matching internal team IDs (e.g., raw `homeTeamId`/`awayTeamId` in UI output), slot IDs, source-system codes, or maintainer shorthand in public-facing surfaces
- [ ] T050 [P] Verify MVP terminology removal — search all `.astro`, `.ts`, `.css`, and `.md` files for "MVP", "Mata-Mata", "visão geral Z", and "R32" (as round label, not CSS variable); confirm 0 remaining instances in public-facing output
- [ ] T051 Manual editorial review per quickstart.md checklist — verify card parity, emphasis visibility, bracket convergence, mobile bracket navigation, favicon appearance, and page title quality across all public pages
- [ ] T052 Verify subdomain impact — confirm no unintended changes to `robots.txt`, public routes, sitemap behavior, or deployment configuration; document any metadata/SEO changes for PR notes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational — no dependencies on other stories
  - US2 (P2): Can start after Foundational — shares `calendarView.ts` and `homeOverview.ts` with US1, but independent testable (uses slot labels and terminology, not card styling)
  - US3 (P2): Can start after Foundational — depends on `KnockoutBracket.astro` only; independent from US1/US2 except for shared helpers and slot label translation (US2)
  - US4 (P3): Can start after Foundational — fully independent (only touches `public/` and `BaseLayout.astro`)
  - US5 (P3): Can start after Foundational — shares `pageMetadata.ts` and page files with other stories
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories beyond shared helpers
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Benefits from T013/T014 (stadium resolution in US1) but not strictly dependent; can use the slot label translator independently
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) — Benefits from US2's slot label translation for bracket card labels but can proceed with existing `translateSlot` function while US2 is in progress
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) — Fully independent, no dependencies on any other story
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) — Shares `pageMetadata.ts` with other stories; can proceed independently

### Within Each User Story

- Tests MUST be written first and verified to FAIL before implementation
- View-model/data helpers before component changes
- Component changes before page integration
- Page integration before acceptance validation
- Story complete before moving to next priority (if sequential)

### Parallel Opportunities

- All Foundational tasks T003-T008 can run in parallel (different files)
- Within US1: T009, T010, T011, T012 (tests) can run in parallel; T013, T014 (data layer) can run in parallel
- Within US2: T020, T021, T022 (tests) can run in parallel
- Within US3: T030, T031 (tests) can run in parallel
- Within US4: T037, T038, T039 (asset creation) can run in parallel
- Within US5: T042, T043, T044, T045 (metadata and page heading updates) can run in parallel
- US4 and US5 can run fully in parallel with each other and with other stories
- Polish tasks T048, T049, T050 can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for emphasis classification helper in tests/unit/data/emphasis.test.ts"
Task: "Unit test for score display helper in tests/unit/data/scoreDisplay.test.ts"
Task: "E2E test for home/calendar card parity in tests/e2e/home-overview.spec.ts"
Task: "E2E test for match card emphasis visibility in tests/e2e/home-overview.spec.ts"

# Launch data layer updates together:
Task: "Resolve stadium name and map link in calendar view model in src/lib/data/calendarView.ts"
Task: "Resolve stadium name and map link in home overview view model in src/lib/data/homeOverview.ts"
```

## Parallel Example: Foundational Phase

```bash
# Launch all foundational helpers together:
Task: "Create knockout slot label translation helper src/lib/data/slotLabels.ts"
Task: "Create match emphasis classification helper src/lib/data/emphasis.ts"
Task: "Create round label constants src/lib/data/roundLabels.ts"
Task: "Create knockout phase subdivision helper src/lib/data/knockoutPhases.ts"
Task: "Add CSS tokens for Group C emphasis in src/styles/tokens.css"
Task: "Create score display helper src/lib/data/scoreDisplay.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T008)
3. Complete Phase 3: User Story 1 (T009-T019)
4. **STOP and VALIDATE**: Run `npm run check && npm run test && npm run build`, manually verify home and calendar card parity per quickstart.md
5. Deploy/demo if ready — match cards are now consistent with emphasis, scores, and stadium links

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Consistent match cards with emphasis + scores + stadium links (MVP!)
3. Add User Story 2 → Official knockout terminology + Portuguese slot labels + calendar subdivision
4. Add User Story 3 → Two-sided bracket converging to Final + mobile-friendly
5. Add User Story 4 → Football favicon across all pages
6. Add User Story 5 → Polished page titles without "MVP" language
7. Polish → Full validation, hygiene check, editorial review

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (card consistency, emphasis, scores)
   - Developer B: User Story 2 (terminology, slot labels, calendar grouping)
   - Developer C: User Story 3 (bracket, mobile)
   - Developer D: User Story 4 + 5 (favicon, page titles — fully parallel)
3. Coordinate on shared files (`calendarView.ts`, `homeOverview.ts`, `KnockoutBracket.astro`) to avoid merge conflicts
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests must be written FIRST and verified to FAIL before implementation
- Commit after each task or logical group with reference to issue #21
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Brazil page (`src/pages/jogos/brasil`, Brazil highlight) is OUT OF SCOPE per FR-023
- Do not alter data source, refresh cadence, or fallback policy per spec
- Do not add new UI framework dependencies
- `npm run check` validates TypeScript, `npm run test` runs Vitest, `npm run test:e2e` runs Playwright, `npm run build` generates static site
