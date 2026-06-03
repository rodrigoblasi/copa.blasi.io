# Data Contract: Copa Folheto MVP

## Purpose

Defines the canonical public data shape used to generate `copa.blasi.io`. This is the contract between source refresh scripts, validation, static page generation, and public UI rendering.

## Canonical Dataset

```json
{
  "competition": {},
  "phases": [],
  "groups": [],
  "teams": [],
  "matches": [],
  "venues": [],
  "scores": [],
  "notes": [],
  "radar": [],
  "sources": [],
  "generatedAt": "2026-06-03T00:00:00Z"
}
```

## Required Enums

**Match Status**: `future`, `live`, `finished`, `postponed`, `cancelled`, `unknown`, `data-problem`

**Freshness State**: `fresh`, `stale`, `pending`, `unknown`, `conditional`, `conflicting`, `source-problem`

**Score State**: `unavailable`, `live`, `final`, `disputed`, `source-problem`

**Phase Type**: `group-stage`, `round-of-16`, `quarterfinal`, `semifinal`, `third-place`, `final`, `champion`

## Match Contract

Each public match entry MUST include:

```json
{
  "id": "match-001",
  "slug": "grupo-a-time-a-time-b",
  "phaseId": "group-a",
  "groupId": "group-a",
  "homeTeamSlot": {
    "teamId": "team-a",
    "label": "Time A",
    "state": "fresh"
  },
  "awayTeamSlot": {
    "teamId": "team-b",
    "label": "Time B",
    "state": "fresh"
  },
  "kickoffBrt": "2026-06-11T16:00:00-03:00",
  "venueId": "venue-001",
  "status": "future",
  "scoreId": "score-match-001",
  "freshnessState": "fresh",
  "sourceRecordIds": ["source-match-001"],
  "noteIds": []
}
```

## Unknown or Conditional Slots

Unknown values MUST use explicit labels:

```json
{
  "teamId": null,
  "label": "Pendente",
  "conditionLabel": "Vencedor do Grupo A",
  "state": "conditional"
}
```

Blank values without labels are invalid for public rendering.

## Source Record Contract

Each source-derived value MUST be traceable:

```json
{
  "id": "source-match-001",
  "sourceName": "FIFA",
  "sourceUrl": "https://example.official/source",
  "sourceType": "official",
  "entityType": "match",
  "entityId": "match-001",
  "checkedAt": "2026-06-11T19:01:00Z",
  "status": "ok",
  "freshnessState": "fresh",
  "fallbackState": "none",
  "runId": "refresh-20260611-190100"
}
```

## Validation Requirements

- Dataset validation MUST fail when required public labels are missing.
- Dataset validation MUST fail when a public value has no source or documented editorial origin.
- Final score validation MUST fail unless the match is finished or the score is explicitly disputed/source-problematic.
- Bracket slot validation MUST fail when a confirmed team lacks validated qualification support.
- Public JSON MUST NOT include secrets, credentials, private headers, raw source payloads, visitor data, local paths, or unpublished notes.
