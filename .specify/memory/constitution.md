<!--
Sync Impact Report
Version change: 1.1.0 -> 1.1.1
Modified principles:
- IV. GitHub-First Public Governance (clarified subproject governance)
Added sections:
- None
Removed sections:
- None
Templates requiring updates:
- None
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

### IV. GitHub-First Public Governance

The GitHub repository `https://github.com/rodrigoblasi/copa.blasi.io/` MUST be the
system of record for project governance, planning, operational history, and code
change tracking. Work MUST be represented through GitHub issues, branches,
commits, and reviewable records before it is treated as accepted project history.
Specs, plans, tasks, operational decisions, data-source problems, deployment notes,
and constitution amendments MUST reference the relevant GitHub issue, branch, or
commit when applicable. The public deployment target is `copa.blasi.io`, and work
that affects that subdomain MUST keep its operational trail in GitHub.
This site is a subproject/tool inside the broader Copa tracking project, so the
repo governs implementation and operations for the site while the Starlog project
docs preserve the higher-level tournament context.

Rationale: a public personal project needs one durable audit trail instead of
scattered decisions across chat, local files, or private notes.

### V. Public Repo Hygiene and Personal Data Minimization

The entire project MUST be handled as public by default. The repository,
specifications, tasks, issues, commits, logs, assets, metadata, and published site
MUST contain only information that supports the product. Secrets, credentials,
private notes, unnecessary personal data, sensitive metadata, unpublished
operational details, and accidental local artifacts MUST NOT enter version
control, GitHub issues, comments, branches, commits, logs, artifacts, or public
pages. Content and operational records MUST be reviewed for shareability before
merge, publication, or issue/comment submission.

Rationale: the repo is public and can act as professional portfolio material;
irrelevant or sensitive content creates avoidable risk.

### VI. Operable Backend Observability

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
  clear shareable URLs under `copa.blasi.io`.
- Match representation MUST distinguish future, live, finished, postponed,
  cancelled, unknown, and data-problem states when those states apply.
- Notes and highlights MUST remain short and useful; long analysis belongs out of
  scope unless explicitly approved by a later constitution amendment or spec.
- `robots.txt`, basic metadata, and public-site hygiene MUST be considered for
  deployable work.

## Development Workflow

- Specs MUST identify the user value, public surface, data source assumptions,
  fallback behavior, privacy review needs, observability needs, and independent
  validation for each feature, and MUST reference the governing GitHub issue.
- Plans MUST include a Constitution Check before research and after design,
  covering editorial UX, scheduled data reliability, privacy, structured logging,
  performance, mobile readability, GitHub traceability, and subdomain impact.
- Tasks MUST preserve incremental delivery by user story and MUST include tests
  or validation steps for critical data transformations, scheduled refreshes,
  fallback behavior, structured logging, GitHub records, and public content
  hygiene.
- Test-first development is not universal; however, logic that interprets external
  data, changes match state, or drives public results MUST have automated tests or
  a documented validation alternative before release.
- Complexity MUST be justified when it delays the first useful public/personal
  experience or introduces operational burden beyond the owner's needs.

## Governance

This constitution supersedes specs, plans, tasks, and ad hoc implementation
preferences for `copa.blasi.io`. Any conflicting artifact MUST be updated before
implementation proceeds.

For day-to-day governance of this subproject:
- scope changes, data-source changes, and deployment decisions MUST be tracked in
  GitHub before they are treated as durable;
- local notes in the workspace are provisional working memory until mirrored in
  GitHub;
- implementation records SHOULD prefer issues, PRs, commit messages, and review
  notes over chat summaries;
- changes that affect public content or deployment behavior SHOULD name the
  relevant issue or commit in the record trail.

Amendments require a documented rationale, a GitHub issue or commit reference for
the decision, a semantic version bump, and a Sync Impact Report in this file. The
owner approves amendments. Governance and operational decisions that are not
recorded in GitHub are provisional and MUST be captured there before being treated
as durable project policy.

Versioning policy:
- MAJOR: removes or redefines a core principle, changes the product's personal
  public purpose, or weakens data truthfulness/privacy guarantees.
- MINOR: adds a principle, adds a governance section, changes GitHub workflow
  requirements, or materially expands required workflow checks.
- PATCH: clarifies wording, fixes inconsistencies, or updates non-semantic text.

Compliance review is mandatory during `/speckit.plan`, `/speckit.tasks`, and code
review. Reviews MUST verify that GitHub issue/branch/commit traceability, public
UX, data provenance, scheduled refreshes, fallback behavior, logging, privacy
hygiene, personal-data minimization, subdomain impact, and independent validation
match this constitution.

**Version**: 1.1.1 | **Ratified**: 2026-06-03 | **Last Amended**: 2026-06-03
