# Research: Copa Folheto MVP

## Decision: Static-First Astro + TypeScript Site

**Decision**: Build the MVP as a static-first Astro + TypeScript web application with generated routes for home, calendar, Brazil, radar, and match pages.

**Rationale**: The site needs fast public sharing, indexable pages, strong editorial control, and low operational overhead. Static generation fits the folheto/tabelao model and avoids turning the project into a heavy dashboard or backend platform.

**Alternatives considered**: A full SPA was rejected because it weakens SEO/shareability and increases client-side complexity. A full backend app was rejected because it adds operational burden before there is a clear need. A generic dashboard framework was rejected because it conflicts with the UX direction.

## Decision: Official-First Data Source Strategy

**Decision**: Use official FIFA World Cup 2026 competition data or another documented official competition source as primary source for schedule, teams, venues, status, scores, classifications, and bracket progression. Allow a secondary reliable public source only for verification or recovery.

**Rationale**: The constitution and spec prioritize trust over apparent completeness. The site must not invent facts, and source/freshness state must be visible when data is unknown, stale, conflicting, or source-problematic.

**Alternatives considered**: Unofficial sports APIs were rejected as primary sources because they weaken the official-data promise. Manual-only updates were rejected for the MVP because live tournament state changes would be too brittle. Raw scraping without provenance was rejected because it is hard to audit and debug.

## Decision: Canonical JSON Data With Validation

**Decision**: Store canonical tournament data as validated JSON with typed schemas, per-entity source metadata, freshness state, and generated public artifacts for routes.

**Rationale**: JSON is simple for agents, tests, static builds, and source diffs. Validation prevents malformed or invented tournament facts from reaching public pages.

**Alternatives considered**: A database was rejected as unnecessary for the MVP. YAML was considered readable but weaker for transformation tests. Committing raw source snapshots was rejected because it creates repo noise and public hygiene risk.

## Decision: Scheduled Refresh Cadence

**Decision**: Use phase-based scheduled refresh: daily before the tournament and on off-days, hourly on match days outside live windows, every 5-10 minutes during live match windows and immediately after final whistles when possible.

**Rationale**: Future schedules do not need high-frequency refresh, while live and recently completed matches need tighter updates. This cadence balances freshness, operational simplicity, and static-site rebuild cost.

**Alternatives considered**: Real-time polling or websockets were rejected as overkill. One daily refresh during match days was rejected as too stale. Constant high-frequency refresh was rejected as unnecessary operational noise.

## Decision: Explicit Freshness and Fallback States

**Decision**: Public data states must include `fresh`, `stale`, `pending`, `unknown`, `conditional`, `conflicting`, and `source-problem`. Last known reliable values may remain visible only with freshness labeling. Conflicts must block silent overwrite until resolved or clearly shown.

**Rationale**: Unknown and pending data must look intentional rather than broken. The public user should understand what is confirmed, what is waiting for official confirmation, and what may be stale or conflicting.

**Alternatives considered**: Silent fallback was rejected because it implies stale data is current. Blank fields without labels were rejected because they look broken. Automatically choosing one conflicting source was rejected because it risks false public facts.

## Decision: UX Guardrails as Acceptance Inputs

**Decision**: Treat `ux-intelligence.md` as a required design brief for planning, implementation prompts, review, and acceptance of user-facing work.

**Rationale**: Visual quality and usability are product requirements. The home must have one dominant reading path, strong hierarchy, high contrast, mobile readability, visible focus states, intentional pending states, and no generic dashboard drift.

**Alternatives considered**: Pure visual taste review was rejected because it is not testable. A generic clean card grid was rejected because it can be orderly but not editorial. Heavy visual ornament was rejected because it competes with match information.

## Decision: Mobile Collapse Preserves Tournament Logic

**Decision**: The home should read as a tabletop overview on wide screens and collapse vertically on mobile without losing the tournament logic: status, Brazil shortcut, next/recent matches, groups, and knockout structure.

**Rationale**: Mobile readability is required by the constitution and UX brief. The home cannot become a random stack of unrelated cards on small screens.

**Alternatives considered**: Horizontal mobile brackets requiring heavy scrolling were rejected. Hiding groups or knockout by default behind tabs was rejected for the primary home experience. Equal card grids were rejected when they erase hierarchy.

## Decision: Internal Observability, Public Freshness Only

**Decision**: Keep structured operational logs internal and expose only user-helpful freshness and uncertainty labels publicly.

**Rationale**: The site must be diagnosable without turning observability into public product surface. Visitors need trust signals, not scheduler logs or source diagnostics.

**Alternatives considered**: A public operational dashboard was rejected for MVP. Hiding freshness entirely was rejected because stale or unknown data would look current. Logging raw source responses was rejected due public hygiene and metadata risk.

## Decision: Validation Scope

**Decision**: Validate schemas, source transforms, BRT time conversion, match states, score updates, bracket filling, fallback decisions, conflict handling, public labels, route rendering, mobile tasks, focus states, and dashboard-drift criteria.

**Rationale**: Errors in transformations and UI states directly affect public facts and usability. The constitution requires automated tests or documented validation for critical data behavior.

**Alternatives considered**: Manual-only data review was rejected as insufficient. End-to-end-only validation was rejected because it is slow and poor at isolating parser or fallback failures.
