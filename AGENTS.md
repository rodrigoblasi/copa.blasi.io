<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-copa-folheto-mvp/plan.md

Project governance and operations MUST be tracked in the public GitHub repo:
https://github.com/rodrigoblasi/copa.blasi.io/

Use GitHub issues, branches, commits, PRs, and repository records as the durable
trail for decisions and operational history. Treat the whole project as public:
do not add secrets, private notes, unnecessary personal data, sensitive metadata,
or local artifacts to files, issues, comments, logs, commits, or public pages.

The public deployment target is the subdomain copa.blasi.io.

## Development Record

- `copa.blasi.io` is a subproject/tool of the broader Copa tracking project, not
  a separate source of tournament truth.
- The GitHub repository is the mandatory governance ledger for this site; if a
  decision matters beyond the current chat, it belongs in GitHub.
- Durable records live in issues, branches, commits, pull requests, reviews, and
  deployment notes. Chat can seed work, but it does not replace the trail.
- Starlog keeps the tournament context and project framing; GitHub keeps the site
  implementation, operational history, and public audit trail.
- Any change that affects public content, data sources, scheduled refreshes,
  deployment behavior, or observability should point back to the relevant issue
  or commit.
- Public hygiene is non-negotiable: no secrets, no personal notes, no accidental
  local artifacts, and no sensitive metadata in the repo.
- For UI/UX work, use `specs/001-copa-folheto-mvp/ux-intelligence.md` as the
  project design brief and `.opencode/commands/copa.uiux.md` as the reusable
  OpenCode entrypoint.
- For implementation sessions and review gates, use
  `docs/spec-kit-session-methodology.md`, `docs/spec-kit-gates.md`,
  `docs/github-record-templates.md`, and `docs/reviewer-session-prompt.md`.
- Reviewer is normally a subagent invoked by the dev at the end of each gate;
  manual reviewer sessions are reserved for escalation or owner-requested audits.
<!-- SPECKIT END -->
