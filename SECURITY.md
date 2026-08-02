# Security Policy

## Supported Version

Convault is currently in Phase 1. Security fixes are applied to the active `main` development line.

## Reporting Vulnerabilities

Do not open public issues for sensitive vulnerabilities.

Report privately to the project owner with:

- A short description of the issue.
- Steps to reproduce.
- Affected route, component, or package.
- Expected impact.
- Any safe proof of concept details.

## Current Security Baseline

Convault currently includes:

- Server-side upload validation with byte signature checks.
- Single-file upload form validation.
- Malformed multipart upload handling as client errors.
- Upload filename normalization and reserved-name fallback.
- Upload size limits.
- Upload API rate limiting with optional Redis REST storage.
- Redis REST config requires HTTPS and falls back safely when unset or invalid.
- Bearer-token-protected conversion jobs.
- No query-string job tokens.
- No-store API headers for upload and job responses.
- Single-use download results with server-side buffer cleanup.
- In-memory job expiry, eviction, and buffer cleanup.
- Download filename header escaping.
- Global security headers in `next.config.ts`.
- Dependency audit checks through `npm run check`.

## Current Phase 1 Limitations

- Conversion jobs are stored in memory and are not durable.
- Conversion support is intentionally limited.
- Redis rate limiting is optional; local development uses a bounded in-memory fallback.
- Broader automated security tests are planned for Phase 2.

Run before committing or deploying:

```bash
npm run check
```
