# Spec Kit Session Methodology

## Purpose

This document defines the implementation workflow used on top of Spec Kit for
`copa.blasi.io`. The goal is to make every implementation step reviewable,
recoverable across new sessions or subagent invocations, and durable in GitHub.

The rule for this project is: if implementation or review is not recorded with
useful detail in `tasks.md` and GitHub, it did not happen.

## Actors

### Dev

The dev implements one approved gate at a time.

The dev uses `/speckit.implement` as the working entrypoint and must read:

- `AGENTS.md`
- `specs/001-copa-folheto-mvp/spec.md`
- `specs/001-copa-folheto-mvp/plan.md`
- `specs/001-copa-folheto-mvp/tasks.md`
- `specs/001-copa-folheto-mvp/ux-intelligence.md`
- `docs/spec-kit-session-methodology.md`
- `docs/spec-kit-gates.md`
- `docs/github-record-templates.md`
- `docs/dev-session-prompt.md`

The dev must not advance to the next gate without reviewer approval for the
current gate.

### Reviewer

The reviewer validates one completed gate at a time.

By default, the reviewer is a subagent invoked by the dev after the dev has
completed a gate and posted implementation evidence. A reusable contextual prompt
is kept in `docs/reviewer-session-prompt.md`.

The reviewer must inspect implementation evidence, run or evaluate the required
tests, check governance records, and decide whether the gate is approved or
blocked.

The reviewer must not implement fixes. If the gate is blocked, control returns to
the dev for correction and another reviewer subagent invocation.

### Manual Reviewer Session

A manual reviewer session is an escalation path, not the default. Use it when:

- the release gate is being reviewed;
- the reviewer subagent blocks the same gate repeatedly;
- scope, data truthfulness, UX acceptance, or governance is disputed;
- the owner explicitly wants a separate session review.

## Session Model

Each dev session may be replaced by a new session when context is too large or
stale. Reviewer subagent invocations are expected to be short-lived and scoped to
one gate. Manual reviewer sessions may also be opened for escalation.

New sessions and subagents must recover state from repository files and GitHub
records, not from chat memory or dev summaries alone.

Every session starts by identifying:

- current branch;
- current gate;
- task IDs in scope;
- linked GitHub issue or gate issue;
- latest dev and reviewer comments;
- current review status.

## Gate State Machine

Each gate moves through these states:

```text
OPEN -> DEV_IN_PROGRESS -> DEV_DONE -> REVIEW_IN_PROGRESS -> APPROVED
OPEN -> DEV_IN_PROGRESS -> DEV_DONE -> REVIEW_IN_PROGRESS -> BLOCKED
BLOCKED -> DEV_IN_PROGRESS
APPROVED -> next gate OPEN
```

Definitions:

- `OPEN`: gate is available but not started.
- `DEV_IN_PROGRESS`: dev session is implementing the gate.
- `DEV_DONE`: dev completed implementation and posted evidence.
- `REVIEW_IN_PROGRESS`: reviewer subagent or manual reviewer is checking the gate.
- `APPROVED`: reviewer posted detailed OK and gate may advance.
- `BLOCKED`: reviewer found issues; dev must fix within the same gate.

## Advancement Rule

The next gate must not start until the current gate has an explicit reviewer
`APPROVED` record in GitHub and the gate status is reflected in `tasks.md` or a
linked gate issue.

The dev may invoke the reviewer subagent immediately after posting dev evidence.
The dev must wait for the subagent result before advancing. This wait happens
inside the dev workflow and does not require the owner to open a separate review
session.

The only exception is explicitly parallel work approved by the owner and recorded
in GitHub before it starts. Parallel work still needs its own gate review.

## Task Evidence Requirement

Every task must include or point to review guidance. The reviewer must be able to
answer: what should be tested for this task, what evidence proves it was done,
and what would cause rejection.

For each task or grouped gate, record:

- task ID and description;
- files changed;
- expected behavior;
- what the dev tested;
- what the reviewer should test;
- commands run and results;
- known risks or skipped checks;
- GitHub issue/comment links;
- approval or blocker decision.

## Where Feedback Lives

Feedback must be duplicated in durable places:

- `tasks.md`: local execution map and task status notes.
- GitHub task or gate issue: detailed implementation and review comments.
- Governing feature issue when the decision affects project history.
- Pull request review when code is submitted through a PR.

Chat can coordinate, but chat is not the durable record.

When a reviewer subagent produces the review, its decision must still be copied
into the GitHub gate/task issue. The record should identify the reviewer mode as
`subagent`.

## Dev Session Procedure

1. Start from `docs/dev-session-prompt.md`.
2. Read `AGENTS.md` and the current plan.
3. Read this methodology and gate catalog.
4. Identify the current gate and task IDs.
5. Verify the previous gate has reviewer `APPROVED` status.
6. Use `/speckit.implement` for implementation.
7. Implement only the current gate scope.
8. Run the tests/checks required by the gate.
9. Update `tasks.md` task checkboxes and gate evidence notes as appropriate.
10. Comment on the GitHub task/gate issue using the dev completion template.
11. Invoke a reviewer subagent using `docs/reviewer-session-prompt.md` and the
    current gate context.
12. Wait for the reviewer subagent decision.
13. If `BLOCKED`, fix only the blocked gate scope, update evidence, and invoke a
    reviewer subagent again.
14. If `APPROVED`, copy the reviewer decision to GitHub, update `tasks.md` gate
    evidence, and advance to the next gate.

## Reviewer Subagent Procedure

1. Start from `docs/reviewer-session-prompt.md`.
2. Read the gate issue, latest dev completion comment, `tasks.md`, and relevant
   docs.
3. Inspect changed files and task scope.
4. Run or evaluate required tests.
5. Check public repo hygiene and GitHub traceability.
6. Check UX guardrails for user-facing gates.
7. Return a detailed `APPROVED` or `BLOCKED` decision to the dev.
8. Include the exact GitHub-ready review comment body using the reviewer template.
9. If approved, indicate which gate is unlocked next.
10. If blocked, list exact required fixes and checks needed for the next review.

The dev is responsible for ensuring the reviewer subagent decision is copied into
GitHub and reflected in `tasks.md`.

## Manual Reviewer Session Procedure

Manual reviewer sessions follow the same procedure as the reviewer subagent, but
the reviewer may comment directly in GitHub and may close or keep open the gate
issue according to the decision.

## Required Reviewer Decision Format

Every review must end with one of:

```text
Decision: APPROVED
```

or

```text
Decision: BLOCKED
```

Approval without details is invalid. A valid approval includes evidence reviewed,
commands or checks run, risks considered, scope boundaries, and whether review
mode was `subagent` or `manual-session`.

## Relationship To Spec Kit

Spec Kit provides the spec, plan, and task decomposition. This methodology adds
operational gates, reviewer subagent rules, manual escalation rules, session
handoff rules, reviewer duties, and GitHub record requirements.

The canonical implementation inputs remain:

- `specs/001-copa-folheto-mvp/spec.md`
- `specs/001-copa-folheto-mvp/plan.md`
- `specs/001-copa-folheto-mvp/tasks.md`

The canonical operational method is this `docs/` folder.
