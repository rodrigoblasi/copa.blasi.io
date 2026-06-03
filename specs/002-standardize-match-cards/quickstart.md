# Quickstart: Standardize Match Cards

## Prerequisites

- Use branch `002-standardize-match-cards`.
- Keep issue #21 referenced in commits, PR text, and deployment notes.
- Do not add UI dependencies unless a later approved plan changes this decision.

## Implementation Order

1. Update public terminology from informal knockout labels to `Fase Eliminatória` across affected UI, metadata, tests, and accessible labels.
2. Define shared match-card display rules for date, BRT time, teams or unresolved labels, score state, city/state, stadium link, emphasis level, and sr-only/aria-label annotations.
3. Apply the shared match-card rules to home and calendar views without changing Brazil page scope.
4. Update knockout slot-label translation so unresolved teams display Portuguese public labels (using existing Portuguese labels directly where available, mapping internal codes where needed) and never internal IDs.
5. Add visual emphasis system: background tint + left border accent bar for Brazil cards, distinct subtler accent for Group C, no accent for regular cards.
6. Update the two-sided bracket so it converges toward Final and Disputa de 3º lugar and remains usable on mobile.
7. Replace MVP and placeholder page-title language with polished Copa Folheto naming across all public-facing pages (home, calendar, Fase Eliminatória bracket, match detail, and sub-pages).
8. Create geometric football SVG favicon (pentagon/hexagon panel pattern, white on black) plus `.ico` and Apple touch icon variants; link from base layout.
9. Extend tests for card parity, terminology, unresolved labels, metadata, favicon links, mobile bracket behavior, accessibility annotations, and public hygiene.

## Validation Commands

Run these before review:

```bash
npm run check
npm run test
npm run test:e2e
npm run build
```

## Manual Review Checklist

- Home and calendar cards show the same required information for equivalent match states.
- Brazil cards and Group C cards use background tint + left border accent (not color-only), and include sr-only/aria-label annotations.
- Regular cards have no accent or annotation; featured state is reserved but not activated.
- Fase Eliminatória cards appear before teams are known and show translated conditional labels (existing Portuguese labels used directly where available).
- The bracket is two-sided on wide screens and navigable on mobile widths.
- No public UI exposes internal IDs, raw source labels, or maintainer shorthand.
- No public title, browser title, or share title contains `MVP` or known placeholder phrasing across all public-facing pages.
- Browser tab and saved shortcut contexts use the geometric football SVG icon (white pentagon/hexagon panels on black).
- Public changes contain no secrets, private notes, local artifacts, sensitive metadata, or raw Starlog material.

## Expected Artifacts for Review

- Updated UI and metadata behavior under `/`, `/calendario`, affected Fase Eliminatória sections, and match detail metadata as needed.
- Favicon assets under `public/`.
- Updated or added tests under `tests/unit/` and `tests/e2e/`.
- PR notes referencing issue #21 and summarizing public route, metadata, and visual behavior changes.
