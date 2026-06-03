# UX Intelligence — Copa Folheto MVP

Purpose: provide the design guardrails that keep `copa.blasi.io` from collapsing
into a generic dashboard or default AI layout.

## Design Stance

- The site MUST feel like a digital World Cup folheto: editorial, compact, and
  easy to scan.
- Home is the primary surface. It MUST carry the strongest visual hierarchy.
- Brazil deserves emphasis, but the tournament must remain visually balanced.
- Unknown or pending data MUST look intentional, not broken.

## Non-Negotiables

1. One dominant reading path per screen.
2. Strong hierarchy before ornament.
3. High contrast and mobile readability by default.
4. No decorative noise that competes with match information.
5. No SaaS-dashboard symmetry unless it clearly improves comprehension.

## Visual System Guidance

- Use a restrained palette with one strong accent tied to Brazil and neutral
  tournament structure colors for everything else.
- Prefer compact cards, grouped blocks, and visible section separation.
- Reserve motion for meaningful transitions only: loading, state change, focus,
  or progressive data fill.
- Keep typography purposeful. Headlines should lead; metadata should stay quiet.
- Use whitespace as a control surface, not as a blank default.

## Layout Rules

- Home should read as a tabletop overview first, then detailed surfaces.
- Group sections must be clearly separated.
- Match rows or cards must make state obvious at a glance.
- Conditional or unknown states should be visibly labeled.
- On mobile, the page must collapse vertically without losing tournament logic.

## Interaction Rules

- Hover and focus states must be visible and consistent.
- Sharing and navigation must be obvious, but not loud.
- If a page has a drill-down detail, it must still make sense on its own.
- Empty and pending states should explain what is missing and why.

## AI Prompting Pattern

When instructing an agent, ask it to:

1. Define the visual hierarchy first.
2. Choose one stylistic direction and commit to it.
3. Specify what must be visible above the fold.
4. Reserve space for unknown data instead of inventing content.
5. Review the result for generic dashboard drift.

## Anti-Patterns

- Flat card grids with no editorial rhythm.
- Overuse of pills, badges, and widgets.
- Dark-mode-at-all-costs styling.
- Decorative gradients that reduce legibility.
- Multiple competing accents with no primary focus.
- Heavy analytics framing for a public tournament guide.

## Review Questions

- Does the page feel like a readable tournament folheto?
- Is the home the clearest surface in the system?
- Can a visitor identify Brazil quickly without losing the rest of the event?
- Are pending and unknown states readable rather than awkward?
- Would this still work as a shared public page on mobile?
