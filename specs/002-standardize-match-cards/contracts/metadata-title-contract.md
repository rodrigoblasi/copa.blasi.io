# UI Contract: Page Titles, Metadata, and Favicon

## Scope

This contract applies to public page titles, browser titles, share-preview titles/descriptions, saved-shortcut labels where controlled by the site, and favicon links.

## Product Naming

- Public titles must present the site as a useful Copa Folheto guide, not as a temporary MVP.
- `MVP` must not appear in public page titles, browser titles, share titles, or default metadata after this feature.
- Weak placeholder phrasing such as `visão geral Z Copa Folheto MVP` must not appear.
- `tabelão` may inform the editorial metaphor, but should not stand alone as the primary product/page name when stronger context is needed.

## Minimum Metadata Coverage

- **Home page**: Polished title and description communicating the main Copa guide experience.
- **Calendar page**: Polished title and description communicating complete fixture consultation.
- **Fase Eliminatória bracket page**: Official terminology and polished title.
- **Match detail pages**: Titles avoid MVP wording and clearly identify the match or pending match context.
- **Any detail, phase, or match sub-pages**: All public-facing pages that render user-visible or browser-tab titles must use polished language.
- Default metadata avoids MVP wording for any page that does not provide a custom title.

## Favicon Coverage

- `favicon.svg`: Geometric football SVG (classic pentagon/hexagon panel pattern, white on black) for modern browsers.
- `favicon.ico`: Multi-resolution browser fallback generated from the same SVG design.
- `apple-touch-icon.png`: Saved shortcut/mobile icon generated from the same SVG design.
- Base layout links the favicon assets so all public pages inherit them.

## Acceptance Review

- Browser tab review shows no `MVP` wording.
- Route or metadata tests confirm public titles are updated.
- Public hygiene checks confirm favicon and metadata do not reference local-only files or private paths.
