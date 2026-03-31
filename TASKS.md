# DiaSphere — Project Roadmap & Task Tracker

_Last updated: 2026-03-28 (community)_

## Project Overview

**DiaSphere** is a web platform for young people living with Type-1 diabetes, providing
medically verified learning content, community features, and everyday tools (recipes,
carb calculator, emergency screen).

| Item | Value |
|---|---|
| Framework | Next.js 16.2.1 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Backend / DB | Supabase (`@supabase/ssr` + `@supabase/supabase-js`) |
| Testing | Vitest v4 |
| Package manager | Yarn |
| Repo branch | `master` → `main` (target) |

---

## Completed

### Infrastructure & Tooling
- [x] Next.js 16.2.1 project scaffolded with TypeScript, Tailwind v4, ESLint
- [x] Yarn configured as package manager (`yarn.lock` present)
- [x] Git initialized (branch: `master`)
- [x] `CLAUDE.md` and `AGENTS.md` present with agent/coding conventions
- [x] `CHANGELOG.md` present, following Keep a Changelog + Conventional Commits

### Supabase Client Layer
- [x] `lib/supabase/client.ts` — browser client factory (`createBrowserClient` via `@supabase/ssr`)
- [x] `lib/supabase/server.ts` — async server client factory (`createServerClient`, Next.js 16 async `cookies()`, `server-only` guard)
- [x] `.env.local` with real Supabase credentials: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] Supabase Auth aktiviert (signUp, signIn, app.profiles Trigger)

### Tests
- [x] Vitest configured (`vitest.config.mts`, `vite-tsconfig-paths`)
- [x] `__tests__/lib/supabase/client.test.ts` — 2 passing tests
- [x] `__tests__/lib/supabase/server.test.ts` — 5 passing tests (async cookies, adapter delegation, Server Component error swallowing)
- [x] **7 / 7 tests passing**

### Landing Page
- [x] `app/page.tsx` — full marketing landing page including:
  - Sticky navbar with CSS-only mobile hamburger toggle
  - Hero section with CTA buttons and medical disclaimer
  - Features section (Wissen & Lernen, Community, Alltagstools)
  - "How It Works" 3-step section with dashed desktop connector
  - Social proof strip (stats)
  - Footer with navigation links and attribution
- [x] `app/layout.tsx` — root layout
- [x] `globals.css` — global styles and custom Tailwind tokens (`brand`, `ds-dark`, `ds-mid`, `ds-light`, `ds-border`, `ds-bg`, `brand-light`, `brand-dark`, `animate-fade-in`, `.how-it-works-steps`)

### UI Phase 1 — Auth Pages
- [x] `app/(auth)/layout.tsx` — centered card layout on brand-light bg; logo + disclaimer; no navbar/footer
- [x] `app/(auth)/signup/page.tsx` — email, password, confirm password, Typ 1/Typ 2 toggle; inline validation; loading spinner; success state
- [x] `app/(auth)/login/page.tsx` — email, password; inline validation; loading spinner; forgot-password link
- [x] `lib/auth/actions.ts` — `signUp` and `signIn` Server Actions; demo-mode guard; `redirect('/dashboard')` on sign-in success
- [x] Form validation (client-side, on blur + on submit, all fields)
- [x] Supabase Auth wired up (guarded behind placeholder-config check)

---

## 🔄 In Progress

_Nothing actively in progress — next: Rezepte page or profile/onboarding._

---

## Backlog

### UI Phase 2 — Onboarding & Dashboard Shell
- [ ] Post-signup onboarding flow (diabetes type confirmation, profile setup)
- [x] Authenticated app shell layout (bottom nav) — `app/(app)/layout.tsx`, `src/components/ui/TopBar.tsx`, `src/components/ui/BottomNav.tsx`
- [x] Dashboard home page (`/dashboard`) — `app/(app)/dashboard/page.tsx`
- [x] User profile page (`/profile`) — `app/(app)/profile/page.tsx`; anzeigename + diabetes_typ editierbar; email + mitglied-seit read-only; Avatar-Initialen

### UI Phase 3 — Core Feature Pages
- [x] **Lernen** (`/lernen`) — learning hub: videos, quizzes, reading content — `app/(app)/lernen/`, `src/lib/data/quiz.ts`, `src/lib/data/artikel.ts`, `src/components/ui/BackButton.tsx`
- [x] **Rezepte** (`/rezepte`) — diabetic-friendly recipes + carb calculator — `app/(app)/rezepte/`, `app/(app)/rezepte/[id]/`, `src/lib/data/rezepte.ts`
- [x] **KH-Rechner** (`/rechner`) — carbohydrate calculator with product chips, zustand toggle, custom KH input — `app/(app)/rechner/`, `src/lib/data/lebensmittel.ts`
- [x] **Community** (`/community`) — posts, replies, peer connection — `app/(app)/community/page.tsx`, `app/(app)/community/[id]/page.tsx`, `src/lib/data/community.ts`
- [x] **Notfall** (`/notfall`) — emergency screen (full-screen, accessible) — `app/(app)/notfall/page.tsx`, `src/lib/data/notfall.ts`

### Supabase Integration
- [ ] Database schema design (users, content, posts, recipes)
- [ ] Row-Level Security (RLS) policies
- [x] Server Actions / API routes for auth and data mutations
- [x] Auth (Login/Signup) — Supabase Auth aktiviert, isPlaceholderConfig() Guard entfernt, diabetes_typ + anzeigename als user_metadata, Trigger app.handle_new_user() legt Profil in app.profiles an
- [x] Auth Callback Route — `app/auth/callback/route.ts` für E-Mail-Bestätigungs-Redirect (NEXT_PUBLIC_SITE_URL + /auth/callback)
- [x] Logout — `signOut()` Server Action; TopBar Logout-Button + Avatar-Link zu /profile
- [x] Profil-Seite — `getProfil` + `updateProfil` aktiviert (app schema); Profil-Seite vollständig
  <!-- src/lib/types/database.ts — ProfilRow, PostRow, KommentarRow, GespeichertesRezeptRow, ActionResult<T> -->
  <!-- src/lib/actions/profil.ts — getProfil, updateProfil, erstelleProfil -->
  <!-- src/lib/actions/community.ts — getPosts, getPost, erstellePost, erstelleKommentar, toggleLike -->
  <!-- src/lib/actions/rezepte.ts — getGespeicherteRezepte, speichereRezept, entferneGespeichertesRezept -->
- [ ] Real-time subscriptions for community feed (if applicable)
- [ ] Storage bucket for user avatars and recipe images

### Quality & Ops
- [ ] End-to-end tests (Playwright)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] SEO: `sitemap.xml`, `robots.txt`, Open Graph meta
- [ ] CI pipeline (GitHub Actions: lint, test, build)
- [ ] Deployment to Vercel (production + preview environments)
