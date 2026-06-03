<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template placeholders -> I. Personal Public Folheto
- Template placeholders -> II. Editorial Clarity Over Generic Dashboards
- Template placeholders -> III. Verified Scheduled Data
- Template placeholders -> IV. Public Repo Hygiene
- Template placeholders -> V. Operable Backend Observability
Added sections:
- Product Constraints
- Development Workflow
Removed sections:
- None
Templates requiring updates:
- ✅ updated .specify/templates/plan-template.md
- ✅ updated .specify/templates/spec-template.md
- ✅ updated .specify/templates/tasks-template.md
- ✅ reviewed .specify/templates/checklist-template.md
- ✅ reviewed .opencode/commands/*.md; no project-specific outdated references found
- ⚠ pending .specify/templates/commands/*.md; directory does not exist in this repo
Follow-up TODOs:
- None
-->
# Copa Blasi Constitution

## Core Principles

### I. Personal Public Folheto

`copa.blasi.io` MUST serve the owner's personal use first while remaining publicly
readable and easy to share. Features MUST prioritize quick understanding of the
FIFA World Cup 2026 through a concise home, calendar, Brazil path, match pages,
results, and short context. Public visibility is for simple sharing and portfolio
clarity, not for community features, accounts, social mechanics, or heavy public
analytics.

Rationale: the product exists to be useful during the Cup without growing into a
generic public platform.

### II. Editorial Clarity Over Generic Dashboards

Every user-facing surface MUST feel like a living digital World Cup leaflet:
organized, memorable, dense only where useful, and readable on mobile. Visual
direction MUST avoid generic SaaS dashboards and MUST preserve an editorial,
print-inspired hierarchy for schedules, match blocks, standings context, flags,
colors, and short notes. Brazil MAY receive special visual emphasis when it helps
the owner's use case, but that emphasis MUST NOT obscure the whole tournament.

Rationale: the project's value is fast, pleasant consultation with a distinct
identity, not raw data display.

### III. Verified Scheduled Data

Match data MUST come from documented, reliable sources and be refreshed by a
scheduled process when dynamic updates are needed. The system MUST track the data
source for calendar, teams, kickoff time in BRT, venue, status, score, notes, and
useful highlights. Missing, stale, conflicting, or uncertain data MUST be shown as
unknown, pending, or source-problematic; the product MUST NOT invent facts.
Fallback behavior MUST be specified before implementation whenever a feature
depends on external data.

Rationale: trust is more important than appearing complete, especially for live
or recently changed match information.

### IV. Public Repo Hygiene

The repository and published site MUST contain only information that supports the
product. Secrets, credentials, private notes, unnecessary personal data, sensitive
metadata, unpublished operational details, and accidental local artifacts MUST NOT
enter version control or public pages. Content intended for publication MUST be
reviewed for shareability before merge or deployment.

Rationale: the repo is public and can act as professional portfolio material;
irrelevant or sensitive content creates avoidable risk.

### V. Operable Backend Observability

Backend jobs, data refreshes, source access, parsing, fallback decisions, and
runtime failures MUST produce organized, structured, and standardized logs.
Logs MUST make source problems, scheduler behavior, data freshness, route errors,
and site health diagnosable without exposing sensitive data publicly. Internal
observability MAY use Cloudflare or another layer, but operational views MUST stay
separate from the public interface unless a public status message directly helps
the user understand missing data.

Rationale: a dynamic site that depends on external sources needs simple,
consistent diagnostics to remain maintainable.

## Product Constraints

- The first useful cut MUST favor home, calendar, Brazil page, match pages, and a
  compact radar over broad statistical coverage.
- Pages MUST be mobile-friendly, performant, legible, indexable, and reachable by
  clear shareable URLs.
- Match representation MUST distinguish future, live, finished, postponed,
  cancelled, unknown, and data-problem states when those states apply.
- Notes and highlights MUST remain short and useful; long analysis belongs out of
  scope unless explicitly approved by a later constitution amendment or spec.
- `robots.txt`, basic metadata, and public-site hygiene MUST be considered for
  deployable work.

## Development Workflow

- Specs MUST identify the user value, public surface, data source assumptions,
  fallback behavior, privacy review needs, observability needs, and independent
  validation for each feature.
- Plans MUST include a Constitution Check before research and after design,
  covering editorial UX, scheduled data reliability, privacy, structured logging,
  performance, and mobile readability.
- Tasks MUST preserve incremental delivery by user story and MUST include tests
  or validation steps for critical data transformations, scheduled refreshes,
  fallback behavior, structured logging, and public content hygiene.
- Test-first development is not universal; however, logic that interprets external
  data, changes match state, or drives public results MUST have automated tests or
  a documented validation alternative before release.
- Complexity MUST be justified when it delays the first useful public/personal
  experience or introduces operational burden beyond the owner's needs.

## Governance

This constitution supersedes specs, plans, tasks, and ad hoc implementation
preferences for `copa.blasi.io`. Any conflicting artifact MUST be updated before
implementation proceeds.

Amendments require a documented rationale, references to the issue or decision
that motivated the change, a semantic version bump, and a Sync Impact Report in
this file. The owner approves amendments.

Versioning policy:
- MAJOR: removes or redefines a core principle, changes the product's personal
  public purpose, or weakens data truthfulness/privacy guarantees.
- MINOR: adds a principle, adds a governance section, or materially expands
  required workflow checks.
- PATCH: clarifies wording, fixes inconsistencies, or updates non-semantic text.

Compliance review is mandatory during `/speckit.plan`, `/speckit.tasks`, and code
review. Reviews MUST verify that public UX, data provenance, scheduled refreshes,
fallback behavior, logging, privacy hygiene, and independent validation match this
constitution.

**Version**: 1.0.0 | **Ratified**: 2026-06-03 | **Last Amended**: 2026-06-03
