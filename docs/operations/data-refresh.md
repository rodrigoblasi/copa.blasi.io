# Data Refresh Operations

## Cadence
- Pre-tournament: Daily
- Match Days (Outside Live Windows): Hourly
- Match Days (Live Windows): Every 5-10 minutes

## Fallback Rules
- If primary source (FIFA) fails, the system triggers `fallbackSummary` and alerts.
- If primary and secondary sources conflict, match freshness becomes `conflicting` and manual review is required. 
- The system will NOT invent data. Unresolved conflicts show as `source-problem`.

## Dry-Run
Run `npm run data:refresh -- --dry-run` to test source connections without mutating `generated` data.
