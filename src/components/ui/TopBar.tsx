'use client'

import Link from 'next/link'
import { signOut } from '@/lib/auth/actions'

interface TopBarProps {
  userName?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function TopBar({ userName }: TopBarProps) {
  const initials = userName ? getInitials(userName) : 'DS'

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ds-border">
      <div className="max-w-120 mx-auto h-14 flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
          aria-label="DiaSphere — Dashboard"
        >
          <span
            className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-sm leading-none select-none"
            aria-hidden="true"
          >
            🩺
          </span>
          <span className="font-bold text-lg tracking-tight text-ds-dark">
            DiaSphere
          </span>
        </Link>

        {/* Rechte Seite: Avatar + Logout */}
        <div className="flex items-center gap-2">
          {/* Avatar → Profil-Seite */}
          <Link
            href="/profile"
            aria-label="Mein Profil"
            className="w-9 h-9 rounded-full bg-brand-light border-2 border-brand flex items-center justify-center"
          >
            <span className="text-sm font-bold text-brand leading-none select-none">
              {initials}
            </span>
          </Link>

          {/* Dezenter Logout-Button */}
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Abmelden"
              title="Abmelden"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ds-light hover:text-ds-mid hover:bg-ds-bg transition-colors"
            >
              {/* Tür-Icon (Logout) */}
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-1.08a.75.75 0 1 0-1.004-1.114l-2.5 2.5a.75.75 0 0 0 0 1.088l2.5 2.5a.75.75 0 1 0 1.004-1.114l-1.048-1.08h9.546A.75.75 0 0 0 19 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
