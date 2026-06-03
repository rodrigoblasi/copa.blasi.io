# Data Model: Standardize Match Cards

## Match Card View

**Purpose**: Public display model for one match card on home, calendar, and compact bracket contexts.

**Fields**:
- `matchId`: Stable match identifier used internally only, never displayed as an ID.
- `dateLabel`: Public formatted date, for example `Sáb, 13/06`.
- `kickoffBrtLabel`: Public kickoff time in BRT.
- `homeDisplay`: Team display object or unresolved slot label.
- `awayDisplay`: Team display object or unresolved slot label.
- `scoreLabel`: Actual score for known finished/live score states, or future-score placeholder for future/unavailable score states.
- `cityStateLabel`: Public city plus state/province abbreviation when available.
- `stadiumLabel`: Public stadium name when available.
- `stadiumMapUrl`: Public map link for the stadium when available.
- `emphasis`: One of `brazil`, `group-c`, `featured`, or `regular`.
- `emphasisAriaLabel`: Sr-only/aria-label string for emphasis level (e.g., `"Jogo do Brasil"`, `"Jogo do Grupo C"`); empty for regular matches.
- `freshnessState`: Existing public uncertainty state from tournament data.

**Validation rules**:
- Must show date and BRT time when present in tournament data.
- Must not display internal team IDs, slot IDs, source-system codes, or raw maintainer shorthand.
- Must show a future-score placeholder for future matches without scores.
- Must show actual score when score state has verified goals.
- Must preserve the same information order across home and calendar.
- Must use stronger Brazil emphasis than Group C emphasis.
- Must not activate featured emphasis unless a match is explicitly marked as featured in future metadata.
- Brazil and Group C cards must carry an `emphasisAriaLabel`; regular cards do not.

## Team Display

**Purpose**: Public representation of a known team inside a card.

**Fields**:
- `name`: Full Portuguese/public team name.
- `countryCode`: Country code used to render a flag when known.
- `isBrazil`: Boolean used for Brazil emphasis.
- `groupId`: Group membership used for Group C emphasis.

**Validation rules**:
- Known teams should show full names under or beside flags according to card context.
- Flag display must not replace the full team name.
- Brazil-specific emphasis must not obscure the opponent or tournament context.

## Knockout Slot Label

**Purpose**: Public label for unresolved knockout team positions.

**Fields**:
- `sourceLabel`: Existing source-derived or canonical unresolved label (may be Portuguese or English code).
- `publicLabel`: Portuguese display label, for example `1º Grupo A`, `2º Grupo C`, `3º Grp D/E/F`, `Venc. Jogo 89`, or `Perd. Jogo 101`.
- `status`: Pending, conditional, confirmed, unknown, or conflicting.

**Validation rules**:
- Must translate source concepts such as group winner, runner-up, third-place group path, winner of match, and loser of match into Portuguese.
- Where source labels are already Portuguese, they must be used directly (no double-translation).
- Must never display unresolved internal IDs such as team IDs or slot IDs.
- Must still allow data-problem or unknown states to use the project's existing uncertainty language.

## Visual Emphasis Level

**Purpose**: Public prominence classification for match cards.

**States**:
- `brazil`: Match includes Brazil; receives distinct background tint + left green border accent bar + sr-only annotation `"Jogo do Brasil"`.
- `group-c`: Match belongs to Brazil's group but does not include Brazil; receives subtler background tint + left distinct border accent bar (not green) + sr-only annotation `"Jogo do Grupo C"`.
- `featured`: Reserved for future curated matches; receives premium highlight when explicitly activated; includes sr-only annotation when active.
- `regular`: Default treatment with no background tint, no border accent, and no emphasis annotation.

**State rules**:
- Brazil takes precedence over Group C.
- Featured is supported as a display state but not activated for any current match unless future metadata explicitly marks it.
- Regular cards must remain readable and visually consistent with emphasized cards.

## Knockout Bracket View

**Purpose**: Public two-sided Fase Eliminatória structure.

**Fields**:
- `leftSide`: Ordered columns from 32 avos through Semifinal.
- `rightSide`: Ordered columns from Semifinal back through 32 avos.
- `center`: Final and Disputa de 3º lugar cards.
- `rounds`: Public round labels and ordered match cards.

**Validation rules**:
- Must include matches M73-M104 when present in tournament data.
- Must preserve official progression from 32 avos, Oitavas, Quartas, Semifinal, Disputa de 3º lugar, and Final.
- Must keep Final and Disputa de 3º lugar visually central on wide screens.
- Must remain navigable on mobile through horizontal scroll or round-based collapse without losing match details.

## Page Title

**Purpose**: Public-facing name used in headings, browser tabs, saved shortcuts, and share previews.

**Fields**:
- `pagePurpose`: The section's role, such as home guide, calendar, Fase Eliminatória, Brazil path, radar, or match detail.
- `displayTitle`: Main visible heading or page title.
- `browserTitle`: Browser tab title.
- `shareTitle`: Title used for metadata previews where available.
- `description`: Public summary text.

**Validation rules**:
- Must not include `MVP` in public page titles or metadata after this feature.
- Must not use weak placeholder phrases such as `visão geral Z Copa Folheto MVP`.
- Must communicate polished Copa Folheto identity and page purpose quickly.

## Site Icon

**Purpose**: Public visual identity for browser tabs and saved shortcuts.

**Fields**:
- `svgIcon`: Modern browser favicon asset — geometric football SVG (pentagon/hexagon panel pattern, white on black background).
- `icoIcon`: Multi-resolution browser fallback asset generated from the same SVG design.
- `appleTouchIcon`: Saved shortcut/mobile icon asset generated from the same SVG design.

**Validation rules**:
- Must use the geometric football SVG design (classic pentagon/hexagon panels, white on black).
- Must be linked from the base layout so all public pages can use it.
- Must not include private metadata or local file references.
