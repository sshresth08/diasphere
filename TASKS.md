# DiaSphere — Project Roadmap & Task Tracker

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
- [x] `.env.local` with placeholder vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

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

---

## In Progress

_Nothing actively in progress._

---

## Backlog

### UI Phase 1 — Auth Pages
- [ ] `/signup` page — registration form (email, password, diabetes type selection)
- [ ] `/login` page — sign-in form
- [ ] Auth layout (`app/(auth)/layout.tsx`)
- [ ] Form validation (client-side)
- [ ] Supabase Auth integration (sign-up, sign-in, sign-out)
- [ ] Auth middleware / route protection (`middleware.ts`)

### UI Phase 2 — Onboarding & Dashboard Shell
- [ ] Post-signup onboarding flow (diabetes type confirmation, profile setup)
- [ ] Authenticated app shell layout (sidebar or bottom nav)
- [ ] Dashboard home page (`/dashboard`)
- [ ] User profile page (`/profile`)

### UI Phase 3 — Core Feature Pages
- [ ] **Lernen** (`/lernen`) — learning hub: videos, quizzes, reading content
- [ ] **Rezepte** (`/rezepte`) — diabetic-friendly recipes + carb calculator
- [ ] **Community** (`/community`) — posts, replies, peer connection
- [ ] **Notfall** (`/notfall`) — emergency screen (full-screen, accessible)

### Supabase Integration
- [ ] Database schema design (users, content, posts, recipes)
- [ ] Row-Level Security (RLS) policies
- [ ] Server Actions / API routes for auth and data mutations
- [ ] Real-time subscriptions for community feed (if applicable)
- [ ] Storage bucket for user avatars and recipe images

### Quality & Ops
- [ ] End-to-end tests (Playwright)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] SEO: `sitemap.xml`, `robots.txt`, Open Graph meta
- [ ] CI pipeline (GitHub Actions: lint, test, build)
- [ ] Deployment to Vercel (production + preview environments)
