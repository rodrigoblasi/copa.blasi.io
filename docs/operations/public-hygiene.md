# Public Hygiene Policy

## Principle
Treat specs, code, data, generated files, issues, PRs, logs, metadata, and deployed pages as strictly public.

## Checklist
- [x] No secrets or credentials (API keys, DB passwords, tokens) in code or data payload.
- [x] No raw logs exposing visitor IPs or internal server paths.
- [x] No private notes, personal data, or draft thoughts in production data.
- [x] No sensitive metadata in public API responses or headers.
- [x] Ensure `robots.txt` properly scopes crawling.

## Audit Output (2026-06-03)
- `tests/e2e/public-hygiene.spec.ts` safely passes, assuring `/home/ubuntu` artifacts are omitted. 
- `logger.ts` explicitly strips `ip`, `token`, `secret`, and `password`.

## Action on Violation
Any discovered leak must trigger an immediate rollback, secret rotation (if applicable), and a post-mortem issue in GitHub.
