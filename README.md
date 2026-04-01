# Convault — Modern File Converter (Next.js + Supabase + CloudConvert)

A fast, minimalist SaaS-style file converter web app.

Flow:
**Upload → Select format → Convert → Download**

- **Anonymous usage** supported (no login required for basic conversions)
- **Optional accounts** via Supabase Auth
- **Temporary storage** with privacy-first auto-deletion (scheduled cleanup)
- **CloudConvert** handles conversions (images, documents, audio, video)
- **Premium (Coming Soon)** UI only — no payments/subscriptions implemented

---

## Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- (Optional) UI helpers: class-variance-authority, tailwind-merge, lucide-react

### Backend
- **Next.js Route Handlers** (`/app/api/...`)
- **Supabase**
  - Auth (optional)
  - Postgres database (conversion metadata)
  - Storage (original + converted files)
- **CloudConvert API** (server-side integration)

### Key Features
- Drag-and-drop uploader + file picker
- Output format selection based on input type
- Upload + conversion progress feedback
- Instant download link after conversion
- Auto-deletion after a short time (privacy-first)
- Dashboard conversion history for logged-in users (temporary access)

---

## Supported Formats (Planned / Target)

**Images**
- Input: JPG, PNG, WEBP, GIF
- Output: JPG, PNG, WEBP (GIF support depends on conversion type)

**Documents**
- Input: PDF, DOCX, TXT
- Output: PDF, DOCX, TXT (where supported by CloudConvert)

**Audio**
- Input: MP3, WAV
- Output: MP3, WAV

**Video**
- Input: MP4, MOV, AVI
- Output: MP4, MOV, AVI

> Actual supported conversions may be phased in gradually to keep the system stable.

---

## Pages
- **Home**: main converter UI
- **Pricing**: “Coming Soon” premium plan (informational only)
- **Dashboard**: conversion history for logged-in users
- **About / Privacy**: security + auto-deletion policy

---

## Messaging (Premium Not Yet Implemented)

We’re currently focused on delivering a fast, simple, and reliable file conversion experience for everyone — completely free.

In the future, we plan to introduce a Premium subscription designed for users who need more power, speed, and flexibility.

**Premium features are not yet implemented.** For now, all core tools remain free while we continue improving the platform.

---

## Getting Started (Local Development)

### 1) Prerequisites
- **Node.js 18+**
- A **Supabase** project
- A **CloudConvert** API key

### 2) Install dependencies
```bash
npm install

Run

Run dev server
bash
npm run dev
Open:

http://localhost:3000
Scripts
Common scripts (may vary by package manager):

bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Lint
