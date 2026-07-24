# Convault

Convault is a privacy-first file converter built with Next.js App Router.

Current phase: **Phase 1 - core converter and security hardening**.

## Current Capabilities

- Upload one file at a time.
- Validate file type using server-side byte checks.
- Convert supported same-format files for download.
- Convert TXT to a simple PDF.
- Protect conversion jobs with bearer tokens.
- Delete temporary server jobs after download, reset, failure, expiry, or eviction.
- Rate-limit upload validation with an in-memory fallback and optional Redis REST store.
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
RATE_LIMIT_REDIS_REST_URL=
RATE_LIMIT_REDIS_REST_TOKEN=
```

Leave these unset locally. When unset, Convault uses an in-memory limiter.

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

Planned next phase work:

- Add a real conversion engine or external conversion provider.
- Replace in-memory jobs with durable storage.
- Add persistence for conversion metadata.
- Add account/dashboard behavior if needed.
- Add automated tests for upload, job auth, processing, and download flows.
