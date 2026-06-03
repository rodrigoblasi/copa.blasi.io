# UI Contract: Match Card

## Scope

This contract applies to public match cards on the home page, calendar page, and compact bracket presentation where match-card information is reused.

## Required Public Information

- Date label in Portuguese short format, such as `Sáb, 13/06`.
- Kickoff time in BRT when known.
- Home and away flag when the team is known and a country code exists.
- Home and away full team names when known.
- Human-readable unresolved slot labels when teams are not known.
- Score label for known scores or `- x -` style placeholder for future/unavailable scores.
- City/state label when venue geography is known.
- Stadium name as a public map link when stadium is known.
- User-helpful uncertainty state when existing data indicates pending, stale, conflicting, or source-problem information.

## Emphasis Rules

- **Brazil match**: Distinct background tint + left green border accent bar, full required information preserved. Includes sr-only/aria-label annotation `"Jogo do Brasil"`.
- **Group C non-Brazil match**: Subtler background tint + left distinct border accent bar (not green, distinct from Brazil's bar), full required information preserved. Includes sr-only/aria-label annotation `"Jogo do Grupo C"`.
- **Featured match**: Reserved premium treatment for future curated metadata; no current match is activated as featured by this feature. When activated, includes appropriate sr-only annotation.
- **Regular match**: Default treatment with no background tint, no border accent bar, no emphasis annotation.

## Prohibited Public Output

- Internal team IDs such as `br`, `sr`, or slot-like IDs.
- Source-system labels that are not translated for users.
- Raw maintainer comments or data-source diagnostics.
- Empty score space for future matches.
- Missing date/time/venue information when the value exists in governed tournament data.

## Acceptance Review

- Home and calendar cards for equivalent match states must expose the same information in the same hierarchy.
- Bracket cards may be compact but must preserve date, BRT time, teams or unresolved labels, score state when appropriate, and city.
- Card content must remain legible on mobile widths.
- Brazil and Group C cards must include sr-only/aria-label annotations for assistive technology.
- Visual emphasis must use background tint + left border accent combination, not color alone.
