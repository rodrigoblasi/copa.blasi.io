# Research: Standardize Match Cards

## Decision: Reuse Existing Static Astro Architecture

**Rationale**: The feature is visual, editorial, and view-model oriented. Existing Astro components already render home, calendar, bracket, layout metadata, and flags. Reusing them preserves performance, avoids unnecessary client payload, and matches the constitution's static-first folheto direction.

**Alternatives considered**: Adding a UI component framework was rejected because it adds dependency weight and risks dashboard drift. Adding a backend or runtime route layer was rejected because the data already exists in canonical tournament files and this feature does not change refresh behavior.

## Decision: Treat Match Card as a Shared UI Contract

**Rationale**: The issue specifically rejects divergent card markup between home and calendar. A shared display contract makes the required details, emphasis levels, unresolved labels, score states, and venue display testable across pages even if compact variants are needed for bracket layout.

**Alternatives considered**: Keeping separate home, calendar, and bracket card implementations was rejected because it caused the inconsistency this feature exists to fix. Fully generic card abstraction for all pages was rejected for planning because the Brazil page is explicitly out of scope.

## Decision: Translate Knockout Slot Labels at the View-Model Boundary

**Rationale**: Public UI must never expose internal IDs or source-system English labels. The data source contains a mix of already-Portuguese labels and internal English codes. The translation boundary normalizes both into consistent Portuguese display strings (e.g., "1º Grupo A", "2º Grupo C", "3º Grp D/E/F", "Venc. Jogo 89", "Perd. Jogo 101"). Where the data source already provides Portuguese, those are used directly; internal codes are mapped via a deterministic lookup table. This approach supports unit testing independent of page layout.

**Alternatives considered**: Translating ad hoc inside each component was rejected because it encourages drift. Storing only translated labels in canonical data was rejected because canonical data should remain source-oriented and governed by existing data policy. Rewriting the canonical data to Portuguese was rejected because the data pipeline may receive mixed label formats during future refreshes.

## Decision: Keep Data Source and Refresh Policy Unchanged

**Rationale**: The spec says not to alter tournament data logic, freshness, fallback, or refresh behavior. The plan only consumes existing fields and improves public display.

**Alternatives considered**: Updating canonical data shape or scheduler behavior was rejected as out of scope. Adding automated external data collection now was rejected because the owner framed it as a future improvement, not this feature.

## Decision: Use Official Portuguese Knockout Terminology Everywhere Public

**Rationale**: Issue #21 explicitly calls out "Fase Eliminatória" as the official term and rejects "Mata-Mata". Applying this to headings, labels, navigation text, metadata, accessible names, and public URLs where affected keeps the product consistent and professional.

**Alternatives considered**: Keeping "Mata-Mata" as a colloquial visible label was rejected because it contradicts the issue. Using English round names was rejected because the public experience is Portuguese.

## Decision: Preserve Mature Product Naming and Remove MVP Language

**Rationale**: The owner clarified that the site is no longer merely an MVP; it is useful, functional, and expected to evolve. Page titles, browser titles, and share titles should communicate a polished Copa guide rather than a temporary prototype.

**Alternatives considered**: Keeping "Copa Folheto MVP" was rejected because it under-sells the product. Using only generic terms such as "Tabelão" was rejected because it lacks enough editorial identity when standing alone.

## Decision: Validate With Existing Test Layers Plus Manual Editorial Review

**Rationale**: Unit tests are appropriate for label translation, phase grouping, card emphasis classification, and metadata strings. Playwright route tests are appropriate for home/calendar parity, favicon links, mobile bracket behavior, and absence of internal IDs. Manual review remains necessary for visual hierarchy and title quality.

**Alternatives considered**: Relying only on snapshots was rejected because visual/editorial quality requires human review. Relying only on manual testing was rejected because terminology, IDs, and metadata can regress silently.

## Decision: Use Background Tint + Left Border Accent for Visual Emphasis

**Rationale**: Color-only emphasis fails for color-blind users and monochrome displays. A combination of background tint and left border accent bar per level provides redundant visual signaling, matches the editorial print-inspired hierarchy in the constitution, and remains distinguishable across varied color perception. Brazil cards get a distinct green tint + green border; Group C gets a subtler tint + distinct border; regular cards have no accent.

**Alternatives considered**: Color-only background was rejected for accessibility. Full badge/chip labels on cards were rejected because they clutter the compact card layout. Size differences were rejected because they break the shared card grid system.

## Decision: Add Sr-Only/Aria-Label Annotations for Emphasis Accessibility

**Rationale**: Screen readers and text-only browsers must receive the same emphasis-level distinction that visual users get through styling. Each Brazil and Group C card includes an sr-only/aria-label annotation (e.g., "Jogo do Brasil", "Jogo do Grupo C") without cluttering the visual card. Regular cards require no annotation. Featured cards, when activated, include an appropriate annotation.

**Alternatives considered**: No accessibility annotations was rejected because it discriminates against non-visual users. Visible text badges were rejected because they add visual noise to compact cards. Semantic HTML landmarks alone were rejected because they don't convey the specific emphasis reason.

## Decision: Add Favicon Assets as Geometric Football SVG

**Rationale**: A geometric football SVG (classic pentagon/hexagon panel pattern, white on black background) is universally recognized, renders sharply at all icon sizes (vector), and avoids external asset dependencies. Standard `.ico` and Apple touch icon variants are generated from the same SVG design. Assets are placed under `public/` and linked from the base layout.

**Alternatives considered**: Remote favicon assets were rejected because they add dependency and reliability risk. Font Awesome or icon library football icons were rejected for unnecessary dependency weight. Photorealistic ball images were rejected because they lose clarity at small sizes.
