# Copa Folheto MVP

A static-first public World Cup 2026 "folheto/tabelão" built with Astro and TypeScript. 

## Overview
This application provides a highly resilient, public-safe, and visually hierarchical view of the 2026 World Cup matching traditional print *tabelões*. It operates natively around static output relying on official data feeds and strict UX/Public-Hygiene validations.

## Local Commands

- **Install:** `npm install`
- **Development:** `npm run dev`
- **Tests (Unit & Integration):** `npm run test`
- **Tests (E2E Playwright):** `npm run test:e2e`
- **Validate Data:** `npm run data:validate`
- **Build Data Payload:** `npm run data:build`
- **Run Refresh (Dry Run):** `npm run data:refresh -- --dry-run`
- **Build Site:** `npm run build`

## Architecture & Governance
Operations, dependencies, and rules strictly adhere to internal `docs/operations/` hygiene patterns. Pull requests should be validated against `ux-intelligence.md` via `tests/unit/ux` assertions and visually checked via `docs/reviews/ux-review-template.md`.
