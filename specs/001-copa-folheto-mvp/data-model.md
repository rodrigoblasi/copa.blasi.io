# Data Model: Copa Folheto MVP

## Overview

The model separates factual tournament data, editorial notes, source/freshness metadata, UX review artifacts, and internal operational health. Public pages render only product-useful data and user-facing freshness labels.

## Entities

### Competition

Represents the FIFA World Cup 2026 context.

**Fields**: `id`, `name`, `edition`, `currentPhaseId`, `summary`, `homeUpdateState`, `lastPublicUpdateAt`, `sourceRecords[]`

**Relationships**: Has many phases, teams, groups, matches, radar items, and source records.

**Validation Rules**: Must have one current phase or an explicit `unknown` current phase state. Must not show a public update time unless at least one source record confirms it.

### Phase

Represents a tournament stage such as group stage, round of 16, quarterfinals, semifinals, third-place match, final, or champion state.

**Fields**: `id`, `name`, `order`, `type`, `status`, `startsAt`, `endsAt`, `sourceState`

**Relationships**: Has many matches. May contain groups or knockout match blocks.

**Validation Rules**: `order` must be unique. `status` must be one of `future`, `live`, `finished`, `unknown`, or `data-problem`.

### Group Section

Represents one group block on the home tabelao.

**Fields**: `id`, `label`, `teams[]`, `matchIds[]`, `standingsState`, `fillingProgress`, `sourceState`

**Relationships**: Contains teams and group-stage matches.

**Validation Rules**: Must preserve a visible section even when teams or matches are pending. Must label incomplete groups as `pending`, `unknown`, `conditional`, `stale`, `conflicting`, or `source-problem`.

### Team

Represents a national team.

**Fields**: `id`, `name`, `shortName`, `countryCode`, `flagRef`, `isBrazil`, `groupId`, `qualificationState`, `sourceState`

**Relationships**: Appears in matches, group sections, knockout slots, Brazil path when applicable.

**Validation Rules**: Brazil may receive special visual emphasis, but no team styling may obscure the rest of the tournament. Unknown teams must use explicit placeholder labels.

### Match

Represents a scheduled, live, or completed game.

**Fields**: `id`, `slug`, `phaseId`, `groupId`, `homeTeamSlot`, `awayTeamSlot`, `date`, `kickoffBrt`, `venueId`, `status`, `scoreId`, `sourceState`, `freshnessState`, `highlight`, `noteIds[]`, `relatedLinks[]`

**Relationships**: Belongs to one phase. May belong to one group. Has one venue, one score, many notes, many source records.

**Validation Rules**: Must always show phase, teams or pending slots, status, and source/freshness state. BRT time must be explicit or labeled unknown. Match status must use the approved state list.

### Knockout Slot

Represents a reserved bracket position.

**Fields**: `id`, `round`, `matchId`, `slotLabel`, `teamId`, `conditionLabel`, `status`, `sourceState`

**Relationships**: Belongs to one knockout match block. May reference a team or a conditional qualification rule.

**Validation Rules**: Must remain visible before qualification is known. Unconfirmed slots must be `pending`, `conditional`, or `unknown`; never inferred.

### Knockout Match Block

Represents an elimination match in the home bracket.

**Fields**: `id`, `round`, `matchId`, `displayOrder`, `slotIds[]`, `advancesToSlotId`, `status`, `sourceState`

**Relationships**: Contains two knockout slots and may advance a winner to another slot.

**Validation Rules**: Advancement must only be filled after official confirmation or clearly marked conditional.

### Champion Block

Represents the final champion area in the tabelao.

**Fields**: `id`, `teamId`, `status`, `sourceState`, `confirmedAt`

**Relationships**: Derived from the final match.

**Validation Rules**: Must show pending until the champion is officially confirmed.

### Venue

Represents stadium and city.

**Fields**: `id`, `stadium`, `city`, `country`, `sourceState`

**Relationships**: Used by matches.

**Validation Rules**: Unknown venue fields must be labeled unknown or pending instead of omitted silently.

### Score

Represents score state for a match.

**Fields**: `id`, `matchId`, `homeGoals`, `awayGoals`, `penalties`, `winnerTeamId`, `state`, `updatedAt`, `sourceState`

**Relationships**: Belongs to one match.

**Validation Rules**: Score state must be `unavailable`, `live`, `final`, `disputed`, or `source-problem`. Final scores require a finished match status or explicit source explanation.

### Editorial Note

Represents concise context that does not replace factual data.

**Fields**: `id`, `matchId`, `scope`, `text`, `status`, `sourceRef`, `createdAt`, `reviewedForPublicHygiene`

**Relationships**: May belong to a match, Brazil page, radar item, or home section.

**Validation Rules**: Must stay short, product-relevant, and public-safe. Must not invent factual data.

### Radar Item

Represents a concise attention signal.

**Fields**: `id`, `title`, `summary`, `priority`, `relatedMatchIds[]`, `relatedTeamIds[]`, `state`, `sourceState`, `expiresAt`

**Relationships**: Links to matches, teams, groups, Brazil path, or phases.

**Validation Rules**: Must remain concise and must not become heavy analysis.

### Data Source Record

Tracks source identity and data freshness.

**Fields**: `id`, `sourceName`, `sourceUrl`, `sourceType`, `entityType`, `entityId`, `checkedAt`, `publishedAt`, `status`, `freshnessState`, `fallbackState`, `conflictDetails`, `runId`

**Relationships**: May attach to competition, phases, teams, matches, scores, venues, groups, and bracket slots.

**Validation Rules**: Must not include secrets, private headers, raw credentials, or unnecessary source payloads.

### Official Data Update

Represents one accepted source-driven update.

**Fields**: `id`, `runId`, `sourceRecordId`, `entityType`, `entityId`, `changeType`, `previousState`, `nextState`, `acceptedAt`, `validationState`

**Relationships**: References source records and changed entities.

**Validation Rules**: Must pass schema validation before changing public output.

### UX Guardrail

Represents a required design rule from `ux-intelligence.md`.

**Fields**: `id`, `category`, `rule`, `requiredFor`, `reviewQuestion`, `failureMode`

**Relationships**: Used by visual review findings and implementation tasks.

**Validation Rules**: Primary screens must map to relevant guardrails before acceptance.

### Visual Review Finding

Represents a UX or visual-quality review outcome.

**Fields**: `id`, `screen`, `scenario`, `guardrailId`, `result`, `evidence`, `followUp`, `reviewedAt`

**Relationships**: References UX guardrails and public routes.

**Validation Rules**: Any failed primary-screen finding must block acceptance until corrected or explicitly documented in GitHub.

### Operational Health Signal

Represents internal-only diagnostic state.

**Fields**: `id`, `runId`, `component`, `event`, `status`, `durationMs`, `route`, `sourceName`, `freshnessState`, `fallbackState`, `errorCode`, `createdAt`

**Relationships**: May reference refresh runs, source records, and public routes.

**Validation Rules**: Must not expose visitor IPs, secrets, credentials, private notes, full request headers, or local paths.

## State Transitions

### Match Status

```text
unknown -> future -> live -> finished
future -> postponed -> future
future -> cancelled
any state -> data-problem
data-problem -> previous confirmed state with freshness label
```

### Freshness State

```text
pending -> fresh
fresh -> stale
fresh -> conflicting
stale -> fresh
conflicting -> fresh
any state -> source-problem
source-problem -> stale or fresh after validation
```

### Knockout Slot

```text
pending -> conditional -> confirmed
pending -> unknown
conditional -> confirmed
confirmed -> conflicting when source disagreement is detected
conflicting -> confirmed after resolution
```

### Visual Review

```text
not-reviewed -> pass
not-reviewed -> fail
fail -> pass after correction
fail -> documented-exception only with GitHub record
```

## Cross-Entity Validation Rules

- A match cannot show a final score unless its match status is `finished` or the score is clearly labeled disputed/source-problematic.
- A knockout slot cannot show a confirmed team unless a source record or validated upstream match result supports it.
- The home overview must preserve all group and knockout sections even when values are pending.
- Brazil emphasis must not remove or hide non-Brazil tournament context.
- Public pages must never display internal operational health signals except simplified freshness labels that help users trust the visible data.
- Editorial notes must remain separate from factual data and must pass public hygiene review.
