# Feature Specification: Standardize Match Cards

**Feature Branch**: `002-standardize-match-cards`

**Created**: 2026-06-03

**Status**: Draft

**Input**: User description: "https://github.com/rodrigoblasi/copa.blasi.io/issues/21"

**GitHub Issue**: https://github.com/rodrigoblasi/copa.blasi.io/issues/21

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Consistent Match Cards (Priority: P1)

As a visitor checking the Copa folheto, I want every match card to use the same readable structure so I can quickly understand when a match happens, who plays, what the score state is, and where it is played without learning different layouts on different pages.

**Why this priority**: Match cards are the primary unit of consultation across the home and calendar views. Inconsistent cards directly harm the owner's fast personal lookup use case.

**Independent Test**: Can be fully tested by comparing match cards on the home page and calendar page and confirming that each card exposes the same essential match information with the same visual hierarchy.

**Acceptance Scenarios**:

1. **Given** a future group-stage match, **When** a visitor views its card on the home page or calendar page, **Then** the card shows formatted date, BRT kickoff time, team flags, team names, future-score placeholder, city/state, and linked stadium name in a consistent order.
2. **Given** a finished match with a score, **When** a visitor views its card, **Then** the score replaces the future-score placeholder while the rest of the card structure remains unchanged.
3. **Given** a match involving Brazil, **When** a visitor views its card, **Then** the card has the strongest Brazil-focused visual emphasis without hiding the same required match details.
4. **Given** a Group C match that does not involve Brazil, **When** a visitor views its card, **Then** the card receives a subtler Group C emphasis distinct from both Brazil cards and regular cards.

---

### User Story 2 - Understand the Knockout Phase Before Teams Are Known (Priority: P2)

As a visitor planning around the Fase Eliminatória, I want knockout matches to be visible before qualified teams are known so I can understand dates, paths, locations, and conditional team slots without seeing internal identifiers.

**Why this priority**: The World Cup knockout path is a major consultation need, and the site must not appear broken or incomplete while qualification slots are pending.

**Independent Test**: Can be fully tested by viewing knockout matches before teams are known and confirming that cards show official Portuguese slot labels, date, BRT time, city, and stadium information without exposing internal codes.

**Acceptance Scenarios**:

1. **Given** a knockout match whose teams are not known, **When** a visitor views its card, **Then** each pending team slot appears as a human-readable Portuguese label such as "1º Grupo A", "2º Grupo C", "3º Grp D/E/F", "Venc. Jogo 89", or "Perd. Jogo 101".
2. **Given** a knockout match with no known teams, **When** a visitor views its card, **Then** date, BRT time, city/state, and linked stadium remain visible.
3. **Given** any public page showing knockout terminology, **When** a visitor reads it, **Then** the official term "Fase Eliminatória" is used instead of informal alternatives.

---

### User Story 3 - Scan the Two-Sided Knockout Bracket (Priority: P2)

As a visitor, I want the knockout bracket to show two sides converging toward the Final and third-place match so I can understand the tournament path at a glance on desktop and still navigate it on mobile.

**Why this priority**: The bracket is the clearest way to communicate the elimination structure and was specifically requested after visual review.

**Independent Test**: Can be fully tested by opening the bracket on desktop and mobile-sized screens and confirming that the left and right paths converge toward a central Final and third-place match while every bracket card remains readable.

**Acceptance Scenarios**:

1. **Given** the Fase Eliminatória view, **When** a visitor scans the bracket on a wide screen, **Then** rounds progress from 32 avos through Semifinal on each side and converge toward the Final and Disputa de 3º lugar in the center.
2. **Given** a narrow screen, **When** a visitor opens the bracket, **Then** the bracket remains navigable without losing round order, match date, BRT time, team-slot labels, or city information.
3. **Given** any bracket match card, **When** a visitor compares it with a regular match card, **Then** it follows the same match-card information model, reduced only as necessary for bracket readability.

---

### User Story 4 - Recognize the Site With a Football Favicon (Priority: P3)

As a visitor with the site open in a browser, I want a recognizable classic football icon so the Copa folheto is easy to identify among tabs and saved shortcuts.

**Why this priority**: The favicon is a low-risk polish item that improves recognition but does not block the core consultation flow.

**Independent Test**: Can be fully tested by opening any public page and confirming that browser tabs and common saved-shortcut surfaces show a classic white-and-black football icon.

**Acceptance Scenarios**:

1. **Given** any public page, **When** it loads in a modern browser, **Then** a classic white football with black panels is available as the page icon.
2. **Given** a visitor saves the site to a mobile home screen or browser shortcut, **When** the saved item appears, **Then** it uses the same football identity in an appropriate icon size.

---

### User Story 5 - Recognize a Mature Copa Guide (Priority: P3)

As a visitor reading page titles, browser titles, and shared snippets, I want the site to sound like a useful, functional Copa guide rather than a temporary MVP or generic tabelao so I understand that the project is a polished product that will keep evolving.

**Why this priority**: Page naming shapes first impressions, shareability, and the perceived quality bar of the project. The current language under-sells the product and conflicts with the desired editorial polish.

**Independent Test**: Can be fully tested by reviewing public page headings, browser titles, and share metadata and confirming that they use stronger Copa Folheto naming without "MVP" language or weak generic titles.

**Acceptance Scenarios**:

1. **Given** a visitor opens the home page, **When** they read the main page title and browser title, **Then** the wording presents the site as a complete Copa Folheto experience rather than as an MVP.
2. **Given** a visitor opens a public section such as calendar or Fase Eliminatória, **When** they read the page title, **Then** the title clearly communicates the page's purpose with polished editorial language.
3. **Given** a visitor sees the site in a browser tab, search/share preview, or saved shortcut, **When** they read the title, **Then** it avoids generic labels such as "tabelão" standing alone and avoids awkward phrases such as "visão geral Z Copa Folheto MVP".

### Edge Cases

- Unknown or pending teams in knockout matches must never expose internal team IDs, slot IDs, source labels, or shorthand that is meaningful only to maintainers.
- Missing score data for future matches must appear as a clear future-score placeholder rather than a blank or broken value.
- Missing or uncertain match data must follow the existing data-uncertainty behavior instead of inventing names, scores, venues, or kickoff times.
- The official Portuguese terminology requirement applies to visible labels, headings, navigation text, public URLs, accessible names, and other user-facing text.
- Calendar and home cards must not drift visually when matches are grouped differently by page.
- Mobile bracket behavior must preserve tournament logic even if the visual presentation changes to fit the available width.
- Page titles, headings, and share labels must not preserve outdated "MVP" wording or temporary placeholders after the product has become useful and functional.
- Screen readers and text-only browsers must receive the same emphasis-level distinction that visual users get through styling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST use the official Portuguese term "Fase Eliminatória" for the knockout phase across all public user-facing surfaces.
- **FR-002**: The site MUST remove informal knockout terminology from public user-facing surfaces.
- **FR-003**: Every match card on the home page and calendar page MUST present the same required match details: formatted date, BRT kickoff time, home and away flags, home and away names or labels, score or future-score placeholder, city/state, and stadium link.
- **FR-004**: Future matches without scores MUST show a clear "- x -" style placeholder rather than empty score space.
- **FR-005**: Finished matches with known scores MUST show the actual score in the same position used by the future-score placeholder.
- **FR-006**: Match cards involving Brazil MUST receive the strongest visual emphasis (distinct background tint + left border accent) while preserving all required card information, and MUST include an sr-only/aria-label annotation identifying it as a Brazil match (e.g., "Jogo do Brasil").
- **FR-007**: Group C matches that do not involve Brazil MUST receive an intermediate visual emphasis (subtler background tint + left border accent, distinct from both Brazil and regular cards), and MUST include an sr-only/aria-label annotation identifying it as a Group C match (e.g., "Jogo do Grupo C").
- **FR-008**: Regular matches MUST remain visually clean and readable without background tint or border accent; no emphasis-level sr-only annotation is required for regular matches.
- **FR-009**: The visual system MUST reserve a featured-match emphasis state for future curated matches, but no match is marked as featured as part of this feature. Featured matches, when activated, MUST include an appropriate sr-only/aria-label annotation.
- **FR-010**: Knockout match cards MUST appear even when one or both teams are not yet known.
- **FR-011**: Unknown knockout team slots MUST be shown with human-readable Portuguese labels that identify placement or prior-match dependency, such as group winner, group runner-up, third-place group path, winner of a prior match, or loser of a prior match. Where the data source already provides Portuguese labels, those MUST be used directly; for internal code labels, the feature MUST generate the corresponding Portuguese label.
- **FR-012**: Public match cards MUST NOT expose internal team IDs, slot IDs, source-system codes, or maintainer-only shorthand.
- **FR-013**: Knockout cards MUST always show date, BRT kickoff time, city/state, and stadium information when those values exist in the tournament data.
- **FR-014**: The knockout bracket MUST present two tournament sides that converge toward the Final and Disputa de 3º lugar.
- **FR-015**: The bracket MUST include the official knockout match range from 32 avos de final through Final, including Disputa de 3º lugar.
- **FR-016**: The bracket MUST preserve round order and match progression on both wide and narrow screens.
- **FR-017**: The calendar page MUST use the same match-card information model and visual emphasis rules as the home page.
- **FR-018**: The calendar page MUST group matches by tournament phase and order matches within each phase by date and time.
- **FR-019**: The site MUST provide a geometric football SVG favicon (classic pentagon/hexagon panel pattern, white on black background) for browser tabs and saved shortcut contexts, with standard `.ico` and Apple touch icon variants generated from the same design.
- **FR-020**: Public page titles, main headings, browser titles, saved-shortcut labels, and share-preview titles MUST use polished Copa Folheto language that reflects a useful, functional product rather than a temporary MVP.
- **FR-021**: Public titles and headings MUST avoid weak or awkward labels such as standalone "tabelão" or "visão geral Z Copa Folheto MVP".
- **FR-022**: All public-facing page titles MUST clearly communicate each page's purpose: this includes the home page, calendar page, Fase Eliminatória bracket page, and any detail, phase, or match sub-pages that render user-visible titles or browser-tab titles.
- **FR-023**: This feature MUST NOT change the Brazil page scope, tournament data rules, data-refresh behavior, or public data truthfulness policy.

### Copa Constitution Requirements *(mandatory)*

- **CCR-001**: Public user experience MUST support fast personal consultation and simple sharing without unnecessary account, social, or heavy analytics features.
- **CCR-002**: User-facing design MUST preserve the editorial folheto/tabelao direction and explain any deviation from that visual language.
- **CCR-003**: Any dynamic match data MUST specify source, refresh schedule, freshness signal, fallback behavior, and handling for unknown, stale, conflicting, or missing values.
- **CCR-004**: Public content and repository changes MUST exclude secrets, private notes, unnecessary personal data, sensitive metadata, and local artifacts.
- **CCR-005**: Governance and operation MUST be tracked through GitHub issues, branches, commits, PRs, or reviewable repository records.
- **CCR-006**: Work that affects `copa.blasi.io` MUST document public subdomain impact, including routes, metadata, SEO, robots.txt, deployment, or operational notes when applicable.
- **CCR-007**: Backend or scheduled work MUST define structured logs for source access, scheduler runs, parsing, fallback decisions, errors, and health.
- **CCR-008**: Critical data transformations, match state changes, fallbacks, and public result displays MUST have automated tests or documented validation.

### Key Entities *(include if feature involves data)*

- **Match Card**: A public display unit for one match, including date, BRT kickoff time, teams or conditional labels, flags when teams are known, score state, city/state, stadium, and visual emphasis level.
- **Visual Emphasis Level**: A classification that determines match prominence: Brazil, Group C, Featured, or Regular.
- **Knockout Slot Label**: A public label for a team position that is not yet resolved, describing group placement or dependency on a prior knockout match.
- **Knockout Bracket**: A public structure containing matches from 32 avos de final through Final, arranged as two sides converging toward Final and Disputa de 3º lugar.
- **Tournament Phase Group**: A calendar grouping such as Grupos, 32 avos, Oitavas, Quartas, Semifinal, Disputa de 3º lugar, and Final.
- **Page Title**: A public-facing name used in headings, browser tabs, saved shortcuts, and share previews to describe a page's purpose and product maturity.
- **Site Icon**: The public browser and shortcut identity for the site, represented by a geometric football SVG (pentagon/hexagon panel pattern, white on black) with `.ico` and Apple touch icon variants.

### Data Provenance *(include if feature uses Copa data)*

- **Primary Source**: Existing documented FIFA World Cup 2026 tournament data already governed by the project, including match numbers, dates, kickoff times, venues, team IDs, unresolved slot labels, and match progression references. Some slot labels are already in human-readable Portuguese; others are internal codes requiring mapping/generation logic.
- **Refresh Schedule**: This feature does not change the existing refresh schedule or source-of-truth policy.
- **Fallback Rule**: If team, score, venue, or timing values are unknown, stale, conflicting, or missing, the public display must use existing uncertainty and pending-data behavior rather than inventing values.
- **Uncertainty Display**: Unknown knockout teams appear as translated conditional slot labels; unknown or future scores appear as a future-score placeholder; data problems remain visible through the project's existing uncertainty language.

### GitHub Governance *(mandatory)*

- **Issue**: https://github.com/rodrigoblasi/copa.blasi.io/issues/21
- **Branch**: `002-standardize-match-cards`
- **Records**: Commits, PRs, review comments, and deployment notes must reference issue #21 when they change public terminology, page titles, match-card presentation, bracket presentation, calendar grouping, favicon assets, or public route behavior.
- **Privacy Review**: Before publication, review changed specs, public pages, assets, metadata, logs, and repository files to ensure they contain no secrets, private notes, unnecessary personal data, sensitive metadata, local artifacts, or raw Starlog material.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of public match cards on the home page and calendar page show date, BRT kickoff time, teams or conditional labels, score state, city/state, and stadium information when available.
- **SC-002**: 0 public user-facing occurrences of informal knockout terminology remain after release.
- **SC-003**: 100% of knockout matches from match 73 through match 104 are visible before all participating teams are known.
- **SC-004**: 100% of unresolved knockout team slots display human-readable Portuguese labels rather than internal IDs or source labels.
- **SC-005**: A visitor can identify Brazil matches, non-Brazil Group C matches, and regular matches by visual emphasis within 5 seconds during a review session.
- **SC-006**: The bracket can be navigated on a mobile-width screen without losing round order, match date, BRT kickoff time, team-slot labels, or city information.
- **SC-007**: A review of the home and calendar pages finds no divergent match-card information patterns for equivalent match states.
- **SC-008**: Browser tab and saved-shortcut checks on at least one desktop browser and one mobile context show the classic football site icon.
- **SC-009**: 0 public page titles, browser titles, saved-shortcut labels, or share-preview titles contain "MVP" or known placeholder phrasing after release.
- **SC-010**: A review of all affected public page titles confirms that each title communicates a polished Copa guide purpose within 5 seconds.

## Clarifications

### Session 2026-06-03

- Q: Do the existing data-source slot labels for unresolved knockout teams already use human-readable Portuguese, or are they internal codes needing mapping? → A: Mixed — some labels are already Portuguese, others need mapping/generation from match/group references.
- Q: How should visual emphasis levels (Brazil, Group C, Featured, Regular) be conveyed to screen readers and assistive technologies? → A: Use sr-only/aria-label text annotations on each card (e.g., "Jogo do Brasil", "Jogo do Grupo C").
- Q: Which specific public pages need title updates? → A: All public-facing pages — home, calendar, Fase Eliminatória bracket, and any detail/phase sub-pages.
- Q: What visual mechanisms should convey the emphasis levels — color only, or color plus structural markers? → A: Color plus structural markers (background tint + left border accent bar per level).
- Q: What source/design should be used for the classic football favicon? → A: Create a new simple geometric football SVG (pentagon/hexagon panel pattern, white on black).

## Assumptions

- The target users are the owner and public visitors who need fast, low-friction World Cup consultation in Portuguese.
- Existing tournament data already contains the match dates, BRT kickoff times, venues, match numbers, group references, and knockout progression needed for this feature.
- The scope includes the home page, calendar page, public knockout presentation, shared public match-card behavior, public terminology, and site icon.
- The scope includes improving page-title language for affected public pages so the product no longer presents itself as a provisional MVP.
- The Brazil page remains out of scope for this feature and will be handled separately.
- No new curated featured matches are activated in this feature; the visual state is reserved for future editorial use.
- This feature does not alter data-source selection, freshness cadence, tournament-data governance, or fallback policy.
