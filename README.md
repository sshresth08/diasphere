# DiaSphere

A mobile-first web app for people living with diabetes — built with Next.js 16, Supabase, and Docker.

🌐 **Live:** https://diasphere.vercel.app

## Features

- Authentication (Sign up / Sign in) via Supabase
- Authenticated dashboard with mobile app shell (TopBar + BottomNav)
- Sections: Lernen, Rezepte, Community, Notfall
- Mobile-first UI with Tailwind CSS v4

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & DB | Supabase |
| Containerization | Docker (multi-stage build) |
| Deployment | Vercel |

## Run with Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your-supabase-url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -t diasphere:v1 .

docker run -d -p 3000:3000 diasphere:v1
```

App is available at: http://localhost:3000

## Run locally (without Docker)

```bash
git clone https://github.com/sshresth08/diasphere.git
cd diasphere
yarn install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then:

```bash
yarn dev
```

App is available at: http://localhost:3000