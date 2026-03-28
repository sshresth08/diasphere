'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  emoji: string
  alwaysRed?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: '/lernen',    label: 'Lernen',    emoji: '🎓' },
  { href: '/rezepte',   label: 'Rezepte',   emoji: '🍽️' },
  { href: '/community', label: 'Community', emoji: '👥' },
  { href: '/notfall',   label: 'Notfall',   emoji: '🚨', alwaysRed: true },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Hauptnavigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ds-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-120 mx-auto flex items-stretch h-16">
        {NAV_ITEMS.map(({ href, label, emoji, alwaysRed }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          const isRed = alwaysRed

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 group"
            >
              <span
                className={[
                  'flex items-center justify-center w-10 h-7 rounded-full text-2xl leading-none transition-colors',
                  isActive && !isRed ? 'bg-brand-light' : '',
                ].join(' ')}
              >
                {emoji}
              </span>
              <span
                className={[
                  'text-[11px] font-semibold leading-none transition-colors',
                  isRed
                    ? 'text-red-500'
                    : isActive
                      ? 'text-brand'
                      : 'text-ds-light',
                ].join(' ')}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
