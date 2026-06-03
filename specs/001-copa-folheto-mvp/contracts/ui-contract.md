# UI Contract: Copa Folheto MVP

## Purpose

Defines the public route and usability contract for `copa.blasi.io`. The home is the primary one-page tournament overview; detail routes support the home but do not replace it.

## Public Routes

### `/`

Primary home tabelao overview.

Must show:

- Tournament identity and current update state.
- Group sections with group-stage matches.
- Next relevant matches and recent results.
- Knockout structure with reserved pending/conditional slots.
- Brazil emphasis without hiding the full tournament.
- Links to calendar, Brazil, radar, and available match pages.
- User-facing freshness or uncertainty labels where trust is affected.

Acceptance tasks:

- Visitor finds Brazil.
- Visitor finds a group.
- Visitor finds a group-stage match.
- Visitor finds knockout/final area.
- Visitor understands whether data is confirmed, pending, stale, or conflicting.

### `/calendario`

Complete calendar view.

Must show matches by phase, date, group when applicable, BRT kickoff time when known, status, and source/freshness state.

### `/brasil`

Brazil path view.

Must show known Brazil matches, status, scores, concise context, future or conditional opponent scenarios, and links back to home/match context.

### `/radar`

Concise editorial radar.

Must show only short signals about important upcoming matches, recent results, possible crossings, and relevant changes.

### `/jogos/[match-slug]`

Shareable match page.

Must show phase, group when applicable, teams or pending slots, BRT time, venue, status, score, freshness/source state, concise notes, and return links to home/calendar/Brazil when relevant.

## UX Guardrails

All primary screens MUST follow `specs/001-copa-folheto-mvp/ux-intelligence.md`.

Required checks:

- One dominant reading path per screen.
- Strong hierarchy before ornament.
- High contrast and mobile readability by default.
- No decorative noise competing with match information.
- No SaaS-dashboard symmetry unless it improves comprehension.
- Pending and unknown data look intentional, not broken.
- Hover, focus, touch, sharing, and navigation states are visible and consistent.

## Rejection Criteria

Reject a primary screen if it depends on:

- Flat card grids with no editorial rhythm.
- Excessive pills, badges, or widgets.
- Dark-mode-at-all-costs styling.
- Decorative gradients that reduce legibility.
- Multiple competing accents with no primary focus.
- Heavy analytics framing for a public tournament guide.
- Mobile layout that loses tournament logic.

## Metadata and Robots

- Public pages must have meaningful title, description, canonical URL under `https://copa.blasi.io`, and public-safe social preview metadata.
- `robots.txt` should allow public user-facing routes.
- Internal diagnostics, generated source snapshots, logs, admin paths, and health endpoints must not be indexed or exposed as public product pages.

## Accessibility and Usability Validation

- Keyboard focus must be visible.
- Touch targets must be usable on mobile.
- Status labels must not rely on color alone.
- Primary tasks must be validated on mobile and desktop.
- Public freshness labels must use plain language.
