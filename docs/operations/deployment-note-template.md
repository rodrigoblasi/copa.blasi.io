# Deployment Note Template

## Deployment Record
- **Date**: 2026-06-03
- **Target**: copa.blasi.io
- **Branch/Commit**: 001-use-issues-abertas
- **Related PRs/Issues**: #1, #2, #3, #4, #5, #6, #7

## Changes Released
- MVP Initial Launch.
- Dynamic paths configured for home, calendar, radar, brazil, and dynamic match slugs.
- Automatic canonical Zod validation boundaries configured.

## Hygiene & Checks
- [x] CI validation passed (Unit + E2E)
- [x] Data validation passed
- [x] No secrets exposed

## Notes
- Official API endpoint placeholders safely configured via dry-run flags. Ready for specific authentication injection strictly governed by `.github/workflows`.
