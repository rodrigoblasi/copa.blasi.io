# Refresh Contract: Copa Folheto MVP

## Purpose

Defines the scheduled data refresh behavior for official-source access, validation, fallback, static rebuild triggers, and internal observability.

## Refresh Inputs

- Source registry with official primary source and any approved secondary source.
- Current canonical dataset.
- Match window calendar.
- Freshness thresholds for off-days, match days, live windows, and post-match windows.
- Public hygiene rules for logs and generated artifacts.

## Refresh Cadence

- Before tournament and off-days: daily.
- Match days outside live windows: hourly.
- Live match windows and immediate post-match windows: every 5-10 minutes when possible.
- Manual refresh: allowed for corrections, but must preserve source/freshness metadata and GitHub governance records.

## Refresh Output

Each successful refresh produces:

- Validated canonical dataset.
- Generated public data artifacts for static pages.
- Internal structured logs.
- Freshness summary for public display.
- Rebuild trigger only after validation passes.

## Fallback Rules

- If primary source is unavailable, preserve last known reliable value only with a visible freshness label.
- If primary and secondary sources conflict, mark affected values as `conflicting` until resolved.
- If a bracket slot is not officially confirmed, keep it `pending` or `conditional`.
- If parsing fails, keep previous validated data as `stale` or `source-problem` depending on freshness threshold.
- Never infer match results, qualifiers, kickoff changes, or champion state without documented support.

## Structured Log Events

Minimum internal events:

```text
source.fetch.started
source.fetch.completed
source.fetch.failed
transform.started
transform.completed
transform.failed
validation.completed
validation.failed
fallback.applied
conflict.detected
rebuild.triggered
rebuild.skipped
health.summary
```

Minimum fields:

```text
timestamp
event
component
route
job
source
status
freshness_state
fallback_state
error_code
run_id
```

## Public/Private Boundary

Public users may see plain freshness labels such as `Atualizado em`, `Pendente`, `Desconhecido`, `Condicional`, `Desatualizado`, `Conflito de fonte`, and `Problema na fonte`.

Public users MUST NOT see raw scheduler logs, stack traces, source payloads, operational dashboards, credentials, request headers, local paths, or private diagnostics.

## Validation Requirements

- Refresh dry-run must be possible without publishing.
- Fixtures must cover future, live, finished, postponed, cancelled, unknown, data-problem, stale, conflicting, and source-problem cases.
- Rebuild must not publish new data if validation fails.
- All fallback decisions must be visible in internal logs and summarized through public freshness labels when they affect displayed data.
