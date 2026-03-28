'use client'

import Link from 'next/link'

interface LernKarte {
  href: string
  emoji: string
  titel: string
  subtitle: string
  accent: string
  iconBg: string
}

const LERN_KARTEN: LernKarte[] = [
  {
    href: '/lernen/video',
    emoji: '▶',
    titel: 'Lernvideos',
    subtitle: 'Interaktive Erklärvideos',
    accent: '#E53E3E',
    iconBg: '#FEF0EE',
  },
  {
    href: '/lernen/quiz',
    emoji: '📊',
    titel: 'Lernquiz',
    subtitle: 'Teste dein Wissen',
    accent: '#3B82F6',
    iconBg: '#EFF6FF',
  },
  {
    href: '/lernen/lesen',
    emoji: '📖',
    titel: 'Leseinhalte',
    subtitle: 'Wichtige Grundlagen',
    accent: '#1D9E75',
    iconBg: '#E8F8F2',
  },
]

export default function LernenPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">
          Wissen &amp; Lernen
        </h1>
        <p className="text-sm text-ds-mid">
          Lern in deinem Tempo — medizinisch geprüft
        </p>
      </section>

      {/* Navigation cards */}
      <div className="flex flex-col gap-3">
        {LERN_KARTEN.map(({ href, emoji, titel, subtitle, accent, iconBg }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-white rounded-2xl border border-ds-border p-4 transition-transform duration-200 hover:-translate-y-px"
            style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 16px 0 ${accent}26`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.06)'
            }}
          >
            {/* Icon circle */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: iconBg }}
            >
              {emoji}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-ds-dark leading-tight">
                {titel}
              </p>
              <p className="text-xs text-ds-mid mt-0.5">{subtitle}</p>
            </div>

            {/* Arrow */}
            <span
              className="text-sm font-bold shrink-0"
              style={{ color: accent }}
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
