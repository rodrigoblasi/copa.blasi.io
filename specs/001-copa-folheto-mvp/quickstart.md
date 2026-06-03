# Quickstart: Copa Folheto MVP

## Current Spec Checks

Run from repository root:

```bash
git branch --show-current
git status --short
test -f specs/001-copa-folheto-mvp/spec.md
test -f specs/001-copa-folheto-mvp/plan.md
test -f specs/001-copa-folheto-mvp/research.md
test -f specs/001-copa-folheto-mvp/data-model.md
test -f specs/001-copa-folheto-mvp/ux-intelligence.md
test -f specs/001-copa-folheto-mvp/contracts/data-contract.md
test -f specs/001-copa-folheto-mvp/contracts/refresh-contract.md
test -f specs/001-copa-folheto-mvp/contracts/ui-contract.md
```

Expected branch:

```text
001-use-issues-abertas
```

## Planned App Setup

After implementation tasks scaffold the web application, expected local commands are:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

## Data Validation Checks

Expected implementation commands:

```bash
npm run validate:data
npm run test -- data
npm run test -- transforms
```

Validation must cover:

- Future, live, finished, postponed, cancelled, unknown, and data-problem matches.
- Pending, conditional, stale, conflicting, and source-problem values.
- BRT time conversion.
- Score updates and final score rules.
- Bracket slot filling and champion state.
- Fallback decisions and public freshness labels.

## UX Validation Checks

Expected implementation commands:

```bash
npm run test:e2e
npm run test:a11y
```

Manual review must use `specs/001-copa-folheto-mvp/ux-intelligence.md` and verify:

- Home is the clearest surface.
- The page feels like a readable World Cup folheto/tabelao.
- Brazil is easy to identify without hiding the rest of the tournament.
- Unknown and pending states look intentional.
- Mobile preserves tournament logic.
- Focus/touch states are visible and consistent.
- No generic dashboard drift.

## Public Route Smoke Checks

After local preview or deployment, check public routes:

```bash
curl -I https://copa.blasi.io/
curl -I https://copa.blasi.io/calendario
curl -I https://copa.blasi.io/brasil
curl -I https://copa.blasi.io/radar
curl -I https://copa.blasi.io/robots.txt
```

Match page smoke checks should use a known generated match slug once data exists.

## Public Hygiene Review

Before commit, PR, or deployment, verify:

- No secrets or credentials.
- No raw private notes.
- No unnecessary personal data.
- No sensitive metadata.
- No local Starlog assets copied into public files.
- No raw source payload dumps or internal logs committed.
- GitHub issues, PRs, comments, and deployment notes remain product-relevant and public-safe.
