# Convault

Convault is a privacy-first file converter built with Next.js App Router.

Current phase: **Phase 1 - core converter and security hardening**.

## Current Capabilities

- Upload one file at a time.
- Validate file type using server-side byte checks.
- Normalize uploaded filenames before storing or displaying them.
- Convert supported same-format files for download.
- Convert TXT to a simple PDF.
- Protect conversion jobs with bearer tokens.
- Delete temporary server jobs after download, reset, failure, expiry, or eviction.
- Consume converted results server-side when the download endpoint returns them.
- Send no-store, noindex, no-referrer, nosniff, and authorization-vary API headers.
- Serve converted downloads as sandboxed attachment responses.
- Rate-limit upload validation with an in-memory fallback and optional Redis REST store.
- Generate canonical metadata, `robots.txt`, `sitemap.xml`, and a web app manifest.
- Support light and dark mode.

## Supported Formats

Current upload formats:

- JPG
- PNG
- WEBP
- GIF
- PDF
- TXT
- MP3
- WAV

Current conversion support is intentionally limited in Phase 1. Broader real conversion support belongs in Phase 2.

## Requirements

- Node.js `>=20.9.0`
- npm `11.13.0`

The project includes `.node-version` and `.npmrc` with `engine-strict=true`, so unsupported Node versions fail during install.

## Environment

Local development can run without environment variables.

Optional production rate-limit store:

```env
SITE_URL=
RATE_LIMIT_REDIS_REST_URL=
RATE_LIMIT_REDIS_REST_TOKEN=
```

Leave these unset locally. When unset, Convault uses a bounded in-memory limiter.

`SITE_URL` controls canonical metadata, `robots.txt`, and `sitemap.xml`.
It defaults to `https://convault.app` when unset. In production, set it to the
HTTPS public origin for the deployed site. HTTP is accepted only for localhost
development origins. Do not include paths, query strings, or credentials.

For production, use an HTTPS Redis REST endpoint. Upstash Redis works well for this:

- `RATE_LIMIT_REDIS_REST_URL` should be the HTTPS REST URL.
- `RATE_LIMIT_REDIS_REST_TOKEN` should be the REST token.

Invalid, empty, non-HTTPS, or credential-bearing Redis config is ignored and
Convault falls back to the in-memory limiter.

## Install

```bash
npm ci
```

Use `npm install` only when intentionally changing dependencies.

## Run

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verify

Run the full project check before committing or deploying:

```bash
npm run check
```

This runs:

- `npm run lint`
- `npm run audit`
- `npm run build`

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production output
npm run start    # Start production server
npm run lint     # Run ESLint
npm run audit    # Run npm audit at low threshold
npm run check    # Run lint, audit, and build
```

## Phase 2 Direction

Phase 1 can move to Phase 2 once these are true:

- The current security hardening changes are committed.
- `npm run check` passes with `0 vulnerabilities`.
- The deployed environment has production rate limiting configured or an accepted temporary fallback plan.
- The Phase 1 limitations below are accepted as known scope rather than accidental gaps.

Planned next phase work:

- Start Phase 2 by adding automated tests around upload validation, job authorization, processing, and download cleanup.
- Add a real conversion engine or external conversion provider.
- Replace in-memory jobs with durable storage.
- Add persistence for conversion metadata.
- Add account/dashboard behavior if needed.
