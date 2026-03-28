'use client'

import Link from 'next/link'

interface QuickCard {
  emoji: string
  title: string
  subtitle: string
  accent: string
  href: string
}

const QUICK_CARDS: QuickCard[] = [
  {
    emoji: '🎓',
    title: 'Wissen & Lernen',
    subtitle: 'Videos, Quiz, Lesetexte',
    accent: '#3B82F6',
    href: '/lernen',
  },
  {
    emoji: '🍽️',
    title: 'Rezepte',
    subtitle: 'Diabetikerfreundlich kochen',
    accent: '#D97706',
    href: '/rezepte',
  },
  {
    emoji: '🧮',
    title: 'KH-Rechner',
    subtitle: 'Kohlenhydrate berechnen',
    accent: '#7C3AED',
    href: '/rechner',
  },
  {
    emoji: '🚨',
    title: 'Notfall',
    subtitle: 'Notfallnummern & Erste Hilfe',
    accent: '#EF4444',
    href: '/notfall',
  },
]

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      {/* Greeting */}
      <section className="mb-6">
        <p className="text-sm text-ds-mid mb-1">Guten Tag 👋</p>
        <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-3">
          Was möchtest du heute erkunden?
        </h1>
        <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-3 py-1 rounded-full">
          Typ-1 Diabetiker
        </span>
      </section>

      {/* Quick Access Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          {QUICK_CARDS.map(({ emoji, title, subtitle, accent, href }) => (
            <Link
              key={href}
              href={href}
              className="group block rounded-[20px] p-4 bg-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                border: `1.5px solid ${accent}4D`,
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 6px 16px 0 ${accent}26`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.06)'
              }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3"
                style={{ backgroundColor: `${accent}26` }}
              >
                {emoji}
              </div>

              {/* Text */}
              <p
                className="font-bold text-sm leading-tight mb-0.5"
                style={{ color: accent }}
              >
                {title}
              </p>
              <p className="text-xs text-ds-mid leading-snug">{subtitle}</p>

              {/* Arrow */}
              <p
                className="text-sm font-bold mt-2 text-right"
                style={{ color: accent }}
              >
                →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Tip */}
      <section>
        <p className="text-xs font-semibold text-ds-mid uppercase tracking-wide mb-2">
          Tipp des Tages
        </p>
        <div className="bg-white rounded-2xl border-l-4 p-4 border border-ds-border" style={{ borderLeftColor: '#1D9E75' }}>
          <div className="flex gap-3 items-start">
            <span className="text-xl leading-none mt-0.5" aria-hidden="true">
              💡
            </span>
            <p className="text-sm text-ds-mid leading-relaxed">
              Denk daran: Stress kann deinen Blutzucker beeinflussen. Kleine
              Atemübungen helfen, den Wert stabil zu halten.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
