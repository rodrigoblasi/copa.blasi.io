# Spec Kit Gates

## Gate Principles

Gates are based on implementation and review meaning, not on the number of tasks.
Each gate must be small enough for one dev session to implement and one reviewer
subagent invocation to review with confidence.

Each gate must have:

- clear scope;
- task IDs;
- dev output;
- reviewer test plan;
- GitHub record requirement;
- advancement criteria.

## Gate Catalog

### G01 - Project Scaffold

**Task scope**: T001-T010

**Purpose**: Establish project structure, Astro/TypeScript tooling, baseline
styles, layout, robots, and source directories.

**Dev output**: Tooling files, base layout, global CSS entry, robots file, and
data directory placeholders.

**Reviewer tests**:

- Verify expected files exist.
- Verify package scripts and config names match `plan.md`.
- Verify no app implementation beyond scaffold scope was added.
- Verify public hygiene: no secrets, private paths, copied local assets, or
  unnecessary generated artifacts.

**Gate approval**: Scaffold is coherent, minimal, public-safe, and ready for
foundation data work.

### G02 - Data Foundation

**Task scope**: T011-T023

**Purpose**: Create shared tournament types, schemas, canonical fixtures,
validation, freshness, fallback, and BRT conversion basics.

**Dev output**: Data types, schemas, seed data, fixtures, loader, validator,
freshness logic, BRT helper, and unit tests.

**Reviewer tests**:

- Run schema and transform tests.
- Check fixtures cover required match and freshness states.
- Verify final score and bracket-slot rules cannot invent facts.
- Verify BRT conversion behavior is explicit and tested.

**Gate approval**: Data model and validation are strong enough to prevent public
fabrication before UI work depends on them.

### G03 - Shared UX, SEO, Logging Foundation

**Task scope**: T024-T033

**Purpose**: Establish public-safe logs, metadata helpers, UX guardrails, status
labels, navigation, data build/validation scripts, and npm commands.

**Dev output**: Logger, SEO helper, UX guardrail module, status/navigation
components, data scripts, package scripts, and tests.

**Reviewer tests**:

- Run logger hygiene tests.
- Verify logs do not expose secrets, headers, visitor identifiers, local paths,
  or raw source payloads.
- Verify metadata helper supports public-safe titles, descriptions, and canonical
  URLs.
- Verify UX guardrails reflect `ux-intelligence.md`.
- Verify `npm` scripts match `quickstart.md` expectations.

**Gate approval**: Shared infrastructure is ready for public routes and reviewable
UX work.

### G04 - MVP Home Tabelao

**Task scope**: T034-T045

**Purpose**: Deliver the first independently useful home overview.

**Dev output**: Home data builder, tournament header, group sections, match
blocks, knockout bracket, Brazil highlight, home route, home styles, seed data,
and home metadata.

**Reviewer tests**:

- Open `/` locally or inspect rendered output.
- Verify groups, group-stage matches, current phase, next/recent matches,
  knockout structure, Brazil, and update state are visible.
- Verify pending knockout slots are labeled and not inferred.
- Verify mobile layout preserves tournament logic.
- Run home overview route and view-model tests.

**Gate approval**: Home works as the MVP folheto/tabelao without requiring detail
pages to understand the tournament overview.

### G05 - Official Data Refresh And Fallback

**Task scope**: T046-T056

**Purpose**: Implement official-source update boundary, refresh dry-run,
conflicts, fallback summaries, freshness rendering, and operations docs.

**Dev output**: Source registry, source adapter boundary, refresh script,
conflict resolver, fallback summary, generated public data contract, and data
refresh docs.

**Reviewer tests**:

- Run refresh contract tests.
- Run fallback and source conflict tests.
- Verify refresh can dry-run without publishing.
- Verify conflicts show `conflicting` and do not silently overwrite.
- Verify no raw source payloads or credentials are committed.

**Gate approval**: Data updates can fill public pages progressively without
inventing facts or leaking operational details.

### G06 - UX Quality Gate

**Task scope**: T057-T066

**Purpose**: Enforce visual quality and usability before expanding surfaces.

**Dev output**: Design tokens, typography/contrast system, status visuals, home
mobile refinement, visual review template, guardrail mapping, and focus/navigation
conventions.

**Reviewer tests**:

- Run dashboard-drift, mobile usability, and focus-state tests.
- Review against every question in `ux-intelligence.md`.
- Verify one dominant reading path and strong hierarchy.
- Verify pending states look intentional, not broken.
- Reject flat generic card grids, excessive badges/widgets, weak contrast, or
  dashboard/analytics framing.

**Gate approval**: Home and shared UI pass visual quality, usability, and
anti-dashboard requirements.

### G07 - Calendar Surface

**Task scope**: T067-T074

**Purpose**: Add `/calendario` as the complete secondary schedule surface.

**Dev output**: Calendar data builder, phase calendar, calendar day components,
calendar route, calendar styles, and metadata.

**Reviewer tests**:

- Open `/calendario`.
- Verify matches can be found by phase, date, group, and BRT time.
- Verify Brazil highlighting does not obscure other matches.
- Verify unknown values and source/freshness states are explicit.
- Run calendar route and grouping tests.

**Gate approval**: Calendar works independently while keeping home as primary.

### G08 - Brazil Path

**Task scope**: T075-T082

**Purpose**: Add `/brasil` as the Brazil-focused detail surface.

**Dev output**: Brazil path builder, Brazil path component, conditional opponent
component, Brazil route, styles, and metadata.

**Reviewer tests**:

- Open `/brasil`.
- Verify known Brazil matches, scores, concise context, and return links.
- Verify future opponents are conditional/pending when not official.
- Verify Brazil emphasis does not contradict the home overview.
- Run Brazil route and Brazil path tests.

**Gate approval**: Brazil page is useful without becoming the only tournament
surface.

### G09 - Match Detail Pages

**Task scope**: T083-T090

**Purpose**: Add shareable `/jogos/[slug]` detail pages.

**Dev output**: Match detail builder, match header, match notes, dynamic route,
styles, and metadata generation.

**Reviewer tests**:

- Open fixture match pages for future, live, and finished states.
- Verify phase, teams/pending slots, BRT time, venue, status, score, freshness,
  notes, and return links.
- Verify metadata avoids unstable or unsupported claims.
- Run match page and match detail tests.

**Gate approval**: Direct match URLs are public-safe, shareable, and accurate.

### G10 - Radar

**Task scope**: T091-T097

**Purpose**: Add concise `/radar` editorial signals.

**Dev output**: Radar data builder, radar item component, radar route, styles,
and metadata.

**Reviewer tests**:

- Open `/radar` with active and empty states.
- Verify signals are concise and link to relevant context.
- Verify radar does not become heavy analysis or dashboard metrics.
- Run radar route and radar data tests.

**Gate approval**: Radar adds editorial value without expanding scope.

### G11 - Operations And Public Governance

**Task scope**: T098-T105

**Purpose**: Add public-safe operational workflow, CI validation, hygiene docs,
subdomain docs, and deployment note template.

**Dev output**: Health summary, structured log helpers, public hygiene docs,
subdomain docs, validation workflow, and deployment note template.

**Reviewer tests**:

- Run health log integration tests.
- Run public hygiene route tests.
- Verify CI workflow runs relevant validation commands.
- Verify operations docs exclude secrets, raw logs, private notes, local paths,
  and internal diagnostics from public pages.
- Verify GitHub governance requirements are documented.

**Gate approval**: Operations are reviewable, public-safe, and GitHub-traceable.

### G12 - Release Polish

**Task scope**: T106-T112

**Purpose**: Final documentation, metadata, robots, quickstart, GitHub records,
UX review, and hygiene review before release.

**Dev output**: README, metadata review, robots review, quickstart record,
deployment traceability, final UX review, and final public hygiene review.

**Reviewer tests**:

- Run the full quickstart checklist.
- Verify every public route has acceptable metadata and public hygiene.
- Verify `robots.txt` aligns with public/private boundary.
- Verify GitHub records link issues, branch, commits/PRs, and deployment notes.
- Verify final UX review is complete and unresolved issues are recorded.

**Gate approval**: Release candidate is ready for owner review or deployment.

## Recommended Gate Order

```text
G01 -> G02 -> G03 -> G04 -> G06 -> G05 -> G07 -> G08 -> G09 -> G10 -> G11 -> G12
```

Rationale:

- G04 and G06 together produce the MVP home and visual quality gate.
- G05 can run after the home exists so refresh/fallback behavior is visible.
- G07-G10 add supporting surfaces after the home is useful.
- G11-G12 harden operations and release records.

## Minimum MVP Gate Set

```text
G01 Project Scaffold
G02 Data Foundation
G03 Shared UX, SEO, Logging Foundation
G04 MVP Home Tabelao
G06 UX Quality Gate
```

The MVP must not be considered accepted without G06 reviewer approval.
