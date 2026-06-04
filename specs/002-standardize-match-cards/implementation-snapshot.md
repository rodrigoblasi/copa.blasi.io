# Implementation Snapshot: Standardize Match Cards

Captured for T002 on branch `002-standardize-match-cards`.

## Baseline Validation

- `npm run check && npm run test && npm run build` passed.
- Existing Astro check hints: unused symbols in `src/components/home/KnockoutBracket.astro`, `src/lib/data/brazilPath.ts`, and `src/lib/data/calendarView.ts`.

## Terminology Snapshot

- Public/source occurrences of `Mata-Mata` found in:
  - `src/pages/index.astro`
  - `src/lib/data/calendarView.ts`
  - `src/components/home/KnockoutBracket.astro`
  - `src/components/brazil/BrazilPath.astro` (Brazil page is out of scope unless public terminology validation requires review)
  - `tests/e2e/brazil.spec.ts`
  - `tests/e2e/home-overview.spec.ts`
- Spec/task documents also contain `Mata-Mata` as regression requirements and historical context.

## MVP Title Snapshot

- Public metadata occurrences of `MVP` found in `src/lib/seo/pageMetadata.ts`.
- Source comments mentioning MVP found in `src/lib/data/matchDetail.ts`, `src/lib/data/brazilPath.ts`, and `src/lib/data/radarView.ts`.
- Project/documentation occurrences found in `package.json`, `README.md`, `docs/`, `specs/001-copa-folheto-mvp/`, and current spec artifacts.

## Favicon Snapshot

- No `public/favicon.svg` found.
- No `public/favicon.ico` found.
- No `public/apple-touch-icon.png` found.
