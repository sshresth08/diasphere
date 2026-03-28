'use client'

import Link from 'next/link'

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

        {/* Avatar */}
        <a
          href="#"
          aria-label="Benutzerprofil"
          className="w-9 h-9 rounded-full bg-brand-light border-2 border-brand flex items-center justify-center"
        >
          <span className="text-sm font-bold text-brand leading-none select-none">
            {initials}
          </span>
        </a>
      </div>
    </header>
  )
}
