# GitHub Record Templates

## Purpose

Use these templates for GitHub issue comments, task comments, PR notes, and local
`tasks.md` evidence notes. The record must be detailed enough that a new dev,
reviewer subagent, or manual reviewer session can continue without private chat
context.

## Gate Issue Naming

Use one GitHub issue per gate unless a later decision chooses individual task
issues.

Recommended title format:

```text
[Gate G04] MVP Home Tabelao - Copa Folheto MVP
```

Recommended body fields:

```markdown
## Scope

- Gate: G04 - MVP Home Tabelao
- Tasks: T034-T045
- Branch: 001-use-issues-abertas
- Spec: specs/001-copa-folheto-mvp/spec.md
- Plan: specs/001-copa-folheto-mvp/plan.md
- Tasks: specs/001-copa-folheto-mvp/tasks.md

## Entry Criteria

- Previous gate approved: [link]
- Required docs read: AGENTS.md, plan.md, tasks.md, gate docs

## Review Criteria

- [ ] Dev evidence posted
- [ ] Required tests/checks run or justified
- [ ] Public hygiene checked
- [ ] UX/data/governance checks completed where applicable
- [ ] Reviewer decision posted
- [ ] Review mode recorded as subagent or manual-session

## Status

OPEN
```

## Dev Completion Comment

```markdown
## Dev Completion Record

Gate: G04 - MVP Home Tabelao
Tasks: T034-T045
Session: dev-session-YYYYMMDD-NN
Branch: 001-use-issues-abertas

### Summary

[Describe what was implemented and why it satisfies the gate.]

### Files Changed

- `path/to/file`: [what changed]
- `path/to/file`: [what changed]

### Task Evidence

- T034: [implemented/tested evidence]
- T035: [implemented/tested evidence]

### What I Tested

- Command/check: `[command]`
- Result: [pass/fail and relevant details]
- Manual check: [what was inspected]

### What Reviewer Should Test

- [Specific check tied to gate contract]
- [Specific check tied to user story acceptance]
- [Specific check tied to public hygiene/UX/data if applicable]

### Known Risks Or Skipped Checks

- [None, or list exact risk and reason]

### GitHub Records

- Governing issue(s): [links]
- Related PR/commit if available: [links]

Status: DEV_DONE
Reviewer invocation: subagent requested
```

## Reviewer Decision Comment

```markdown
## Reviewer Gate Decision

Gate: G04 - MVP Home Tabelao
Tasks reviewed: T034-T045
Session: reviewer-subagent-YYYYMMDD-NN
Review mode: subagent
Branch: 001-use-issues-abertas

### Evidence Inspected

- Dev completion comment: [link]
- Files/diff inspected: [summary]
- Tests/checks inspected or run: [commands/results]

### Review Checks

- Functional behavior: [pass/fail details]
- Data/fallback correctness: [pass/fail/not applicable]
- UX guardrails: [pass/fail/not applicable]
- Public hygiene: [pass/fail details]
- GitHub traceability: [pass/fail details]

### Findings

- [Finding or "No blocking findings"]

### Required Follow-Up

- [None if approved, or exact fixes if blocked]

Decision: APPROVED
```

For a blocked gate, end with:

```text
Decision: BLOCKED
```

## Local tasks.md Evidence Note Pattern

When updating `tasks.md`, keep the checklist task format intact and add gate notes
near the relevant phase if needed:

```markdown
### Gate Evidence - G04

- Dev status: DEV_DONE
- Dev evidence: [GitHub comment link]
- Reviewer status: APPROVED
- Reviewer mode: subagent
- Reviewer evidence: [GitHub comment link]
- Next gate unlocked: G06
```

Do not remove task IDs or rewrite them after GitHub records have been created.

## Minimum Evidence Standard

A valid record must include:

- task IDs;
- changed files;
- tests/checks and results;
- reviewer-specific test expectations;
- risks or skipped checks;
- decision status;
- review mode: subagent or manual-session;
- GitHub links.

Anything less is not enough for this project.
