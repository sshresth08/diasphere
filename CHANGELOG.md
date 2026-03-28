# Changelog

All notable changes to DiaSphere will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [Unreleased]

## [0.3.0] - 2026-03-28

### feat(dashboard): authenticated app shell with bottom nav and dashboard home

- Added `app/(app)/layout.tsx` — Server Component shell: sticky TopBar, scrollable content area (max-width 480px, mobile-first), BottomNav pinned at bottom; background `ds-bg`
- Added `src/components/ui/TopBar.tsx` — Client Component; sticky white header (56px); DiaSphere logo linking to `/dashboard`; avatar circle showing user initials (defaults to `DS`); accepts optional `userName` prop
- Added `src/components/ui/BottomNav.tsx` — Client Component; fixed bottom nav (64px + safe-area padding); 4 items: Lernen, Rezepte, Community, Notfall; active item detected via `usePathname`; active items show teal pill + teal label; Notfall always renders red icon
- Added `app/(app)/dashboard/page.tsx` — Client Component; greeting section with hardcoded Typ-1 badge; 2×2 quick access card grid (Wissen & Lernen, Rezepte, KH-Rechner, Notfall) with per-card accent colour, hover lift, and full-card Link; daily tip section with teal left-border card
- `tsc --noEmit`, `eslint`, and `vitest` (7/7) all pass with zero errors

## [0.2.0] - 2026-03-28

### feat(auth): signup and login pages with form validation and server actions

- Added `app/(auth)/layout.tsx` — standalone auth card layout (centered white card on `brand-light` bg, DiaSphere logo, medical disclaimer, no navbar/footer)
- Added `app/(auth)/signup/page.tsx` — Client Component with email, password, confirm-password fields and Typ 1 / Typ 2 toggle buttons; inline validation on blur and submit; loading spinner via `useTransition`; success state after registration
- Added `app/(auth)/login/page.tsx` — Client Component with email and password fields; inline validation; loading spinner; "Passwort vergessen?" link to `/forgot-password`
- Added `lib/auth/actions.ts` — `'use server'` file with `signUp` and `signIn` Server Actions; `ActionResult`, `SignUpData`, `SignInData` types exported; placeholder-config guard returns demo-mode error; `signIn` calls `redirect('/dashboard')` on success
- All inputs have `<label>`, `aria-invalid`, and `aria-describedby` attributes
- `tsc --noEmit`, `eslint`, and `vitest` (7/7) all pass with zero errors

## [0.1.0] - 2026-03-25

### feat: Supabase client setup

- Added `lib/supabase/client.ts` — browser client factory using `@supabase/ssr` `createBrowserClient`
- Added `lib/supabase/server.ts` — async server client factory using `@supabase/ssr` `createServerClient` with Next.js 16 async `cookies()` and `server-only` guard
- Added `.env.local` with placeholder vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Installed `@supabase/supabase-js`, `@supabase/ssr`, `server-only`

### test: Supabase client unit tests

- Added Vitest with `vite-tsconfig-paths`; configured in `vitest.config.mts`
- Added `test` and `test:watch` scripts to `package.json`
- Added `__tests__/lib/supabase/client.test.ts` — 2 tests for browser client factory
- Added `__tests__/lib/supabase/server.test.ts` — 5 tests covering async cookies, adapter delegation, and Server Component error swallowing
- 7/7 tests passing
