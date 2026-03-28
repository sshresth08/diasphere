# Changelog

All notable changes to DiaSphere will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## [Unreleased]

### Added
- Zentrale Datenbank-Typen in `src/lib/types/database.ts` (`ProfilRow`, `PostRow`, `KommentarRow`, `GespeichertesRezeptRow`, `ActionResult<T>`) — Vorbereitung für Supabase-Schema
- Server Actions für Profil-Verwaltung (`getProfil`, `updateProfil`, `erstelleProfil`) — Demo-Modus aktiv, echter Supabase-Code auskommentiert
- Server Actions für Community (`getPosts`, `getPost`, `erstellePost`, `erstelleKommentar`, `toggleLike`) — Demo-Modus aktiv, MOCK_POSTS als Datenquelle
- Server Actions für Rezepte (`getGespeicherteRezepte`, `speichereRezept`, `entferneGespeichertesRezept`) — Demo-Modus aktiv
- Community-Feed (`/community`): Kategorie-Filter (Alle + 5 Kategorien), Suchfeld, Post-Karten mit Likes/Kommentar-Zähler, Gelöst-Badge
- Community-Detail (`/community/[id]`): Post-Volltext, Kommentarliste mit Hilfreich-Counter, Kommentar-Formular im Demo-Modus
- Floating-Button mit Modal zum Erstellen neuer Beiträge (Kategorie, Titel, Inhalt; Validierung; Demo-Modus)
- `src/lib/data/community.ts`: `PostType`, `KommentarType`, `KategorieConfig`, `KATEGORIEN`, `MOCK_POSTS` (6 Posts mit je mind. 2 Kommentaren)
- Notfall-Screen (`/notfall`): Notruf-Banner als `<a href="tel:112">`, Situationen-Akkordeon (Hypoglykämie/Hyperglykämie mit Symptomen und Sofortmaßnahmen), Tap-to-Call Kontaktkarten (Notruf, Giftnotruf, Diabetes-Hotline), medizinischer Disclaimer

## [0.5.0] - 2026-03-28

### feat(rezepte): add recipe list, detail view, and carbohydrate calculator

- Added `src/lib/data/rezepte.ts` — exports `Rezept` interface and `REZEPTE` array (3 diabetic-friendly recipes: Overnight Oats, Lachs mit Quinoa, Linsensuppe; each with id, emoji, kh, kcal, zeit, beschreibung, zutaten, schritte)
- Added `src/lib/data/lebensmittel.ts` — exports `Lebensmittel` interface and `LEBENSMITTEL` array (5 foods + custom entry; each with name, roh KH/100g, gekocht KH/100g)
- Added `app/(app)/rezepte/page.tsx` — Client Component; BackButton to `/dashboard`; stacked recipe cards with 32px emoji, amber/red/teal badges (🌾 KH, 🔥 kcal, ⏱ zeit), 2-line clamped description, hover lift + amber shadow; full-card Next.js Link to `/rezepte/{id}`; KH-Rechner promo card at bottom in purple (#EDE9FE) with icon circle, links to `/rechner`
- Added `app/(app)/rezepte/[id]/page.tsx` — Client Component; uses `useParams<{ id: string }>()` (Next.js 16 async-params compliant); 64px centered emoji; centered badge row; Zutaten white card with bullet rows and dividers; Zubereitung step list with teal numbered circles (28px); graceful "Rezept nicht gefunden" fallback; CTA outline button linking to `/rechner`
- Added `app/(app)/rechner/page.tsx` — Client Component; state: selectedProduct, zustand, gramm, customKH; 2-column chip grid for product selection (purple active state); conditional zustand toggle (Roh/Gekocht) when product has both values; conditional custom KH number input; Gramm input with absolutely-positioned suffix; live KH result (gesamtKH = gramm × khPro100 / 100) displayed in purple result card at 48px; all inputs labeled
- BottomNav "Rezepte" tab is active on all `/rezepte/*` sub-routes (existing `startsWith` logic covers it)
- `tsc --noEmit`, `eslint`, and `vitest` (7/7) all pass with zero errors

## [0.4.0] - 2026-03-28

### feat(lernen): learning hub with video, quiz, and reading content pages

- Added `src/lib/data/quiz.ts` — exports `QuizFrage` interface and `QUIZ_FRAGEN` array (3 diabetes-knowledge questions with answer options, correct index, and explanation text)
- Added `src/lib/data/artikel.ts` — exports `Artikel` interface and `ARTIKEL` array (3 inline reading cards: Typ-1 Diabetes, Übergang zur Erwachsenenmedizin, Blutzucker verstehen)
- Added `src/components/ui/BackButton.tsx` — reusable Client Component; props `{ href, label? }`; 40×40 rounded-xl back-arrow button; `aria-label="Zurück"`; uses Next.js `Link`
- Added `app/(app)/lernen/page.tsx` — learning hub menu; 3 full-width nav cards (Lernvideos, Lernquiz, Leseinhalte) with per-card icon circle, accent colour, and hover lift; no BackButton (top-level route reachable from BottomNav)
- Added `app/(app)/lernen/video/page.tsx` — embedded YouTube iframe (16:9, border-radius 16px); teal info card below; CTA button linking to `/lernen/quiz`
- Added `app/(app)/lernen/quiz/page.tsx` — interactive multi-step quiz; animated progress bar; 4 answer buttons with correct (green) / wrong (red) highlight after selection; explanation card; Next/Results navigation; Results screen with emoji, score, motivational text, "Quiz wiederholen" and "Leseinhalte entdecken" actions
- Added `app/(app)/lernen/lesen/page.tsx` — renders 3 article cards; each card shows title in teal-dark, lesezeit pill, and full body text inline; no detail route
- BottomNav "Lernen" tab is active on all `/lernen/*` sub-routes (existing `startsWith` logic requires no changes)
- `tsc --noEmit`, `eslint`, and `vitest` (7/7) all pass with zero errors

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
