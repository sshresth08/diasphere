@AGENTS.md

## Current State

### Pages & Routes
- `/` (`app/page.tsx`) — marketing landing page (Server Component, no auth required)
- `/signup` (`app/(auth)/signup/page.tsx`) — registration form (Client Component)
- `/login` (`app/(auth)/login/page.tsx`) — sign-in form (Client Component)
- `/dashboard` (`app/(app)/dashboard/page.tsx`) — authenticated home page (Client Component)

### Components — Landing page (all co-located in `app/page.tsx`)
- `Logo` — shared logo mark used in Navbar and Footer
- `Navbar` — sticky header with desktop links and CSS-only mobile hamburger toggle
- `HeroSection` — headline, CTA buttons, medical disclaimer
- `FeaturesSection` — three feature cards (Wissen & Lernen, Community, Alltagstools)
- `HowItWorksSection` — 3-step guide with dashed desktop connector (`.how-it-works-steps` in `globals.css`)
- `SocialProofStrip` — stat bar (9.7 Mio. Diabetiker, interview stat, pricing)
- `Footer` — nav links, tagline, legal disclaimer

### Components — Auth pages (co-located in their page files)
- `Spinner` — inline SVG loading spinner, used in both signup and login submit buttons

### Components — App shell (`src/components/ui/`)
- `TopBar` — sticky white header (56px); DiaSphere logo → `/dashboard`; avatar with initials; `userName?: string` prop; defaults to `DS`
- `BottomNav` — fixed bottom nav (64px + safe-area); 4 items (Lernen, Rezepte, Community, Notfall); active via `usePathname`; Notfall always red

### Layouts & Styles
- `app/layout.tsx` — root layout (applies global font and styles)
- `app/(auth)/layout.tsx` — auth card layout: centered white card on `brand-light` bg, DiaSphere logo linking to `/`, medical disclaimer; no navbar/footer
- `app/(app)/layout.tsx` — authenticated shell: TopBar + scrollable content (max 480px) + pinned BottomNav; Server Component
- `globals.css` — Tailwind v4 base + custom tokens: `brand`, `brand-dark`, `brand-light`, `ds-dark`, `ds-mid`, `ds-light`, `ds-border`, `ds-bg`; utility: `animate-fade-in`; component: `.how-it-works-steps`

### Library
- `lib/supabase/client.ts` — browser Supabase client factory (`createBrowserClient`)
- `lib/supabase/server.ts` — async server Supabase client factory (`createServerClient`, Next.js 16 async `cookies()`, `server-only` guard)
- `lib/auth/actions.ts` — `'use server'` file; exports `signUp`, `signIn`, `ActionResult`, `SignUpData`, `SignInData`; placeholder-config guard; `signIn` calls `redirect('/dashboard')` on success

### Tests
- `__tests__/lib/supabase/client.test.ts` — 2 tests
- `__tests__/lib/supabase/server.test.ts` — 5 tests
- **7 / 7 passing**

### Routes that do NOT exist yet
`/lernen`, `/rezepte`, `/community`, `/notfall`, `/rechner`, `/forgot-password`, `/profile`

---

## Next Task

Build UI Phase 2 remainder: post-signup onboarding flow (diabetes type confirmation, profile setup) and user profile page (`/profile`).
