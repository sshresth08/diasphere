@AGENTS.md

## Current State

### Pages & Routes
- `/` (`app/page.tsx`) — marketing landing page (Server Component, no auth required)

### Components (all co-located in `app/page.tsx`)
- `Logo` — shared logo mark used in Navbar and Footer
- `Navbar` — sticky header with desktop links and CSS-only mobile hamburger toggle
- `HeroSection` — headline, CTA buttons, medical disclaimer
- `FeaturesSection` — three feature cards (Wissen & Lernen, Community, Alltagstools)
- `HowItWorksSection` — 3-step guide with dashed desktop connector (`.how-it-works-steps` in `globals.css`)
- `SocialProofStrip` — stat bar (9.7 Mio. Diabetiker, interview stat, pricing)
- `Footer` — nav links, tagline, legal disclaimer

### Layouts & Styles
- `app/layout.tsx` — root layout (applies global font and styles)
- `globals.css` — Tailwind v4 base + custom tokens: `brand`, `brand-dark`, `brand-light`, `ds-dark`, `ds-mid`, `ds-light`, `ds-border`, `ds-bg`; utility: `animate-fade-in`; component: `.how-it-works-steps`

### Library
- `lib/supabase/client.ts` — browser Supabase client factory (`createBrowserClient`)
- `lib/supabase/server.ts` — async server Supabase client factory (`createServerClient`, Next.js 16 async `cookies()`, `server-only` guard)

### Tests
- `__tests__/lib/supabase/client.test.ts` — 2 tests
- `__tests__/lib/supabase/server.test.ts` — 5 tests
- **7 / 7 passing**

### No routes exist yet for:** `/signup`, `/login`, `/dashboard`, `/lernen`, `/rezepte`, `/community`, `/notfall`

---

## Next Task

Build the auth pages: create `app/(auth)/layout.tsx`, `app/(auth)/signup/page.tsx`, and `app/(auth)/login/page.tsx` with client-side forms, validation, and Supabase Auth integration (sign-up, sign-in, sign-out).
