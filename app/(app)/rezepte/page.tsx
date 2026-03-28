'use client'

import Link from 'next/link'
import BackButton from '@/src/components/ui/BackButton'
import { REZEPTE, type Rezept } from '@/src/lib/data/rezepte'

export default function RezeptePage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <BackButton href="/dashboard" />
      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">
        Rezepte
      </h1>
      <p className="text-sm text-ds-mid mb-6">
        Diabetikerfreundlich und lecker 🍴
      </p>

      {/* Recipe cards */}
      <div className="flex flex-col gap-3">
        {REZEPTE.map((rezept: Rezept) => (
          <Link
            key={rezept.id}
            href={`/rezepte/${rezept.id}`}
            className="block bg-white rounded-[20px] border border-[#E2E8F0] p-4 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 6px 16px 0 rgba(217,119,6,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.06)'
            }}
          >
            {/* Top row: emoji + title + arrow */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[32px] leading-none shrink-0"
                aria-hidden="true"
              >
                {rezept.emoji}
              </span>
              <p className="flex-1 font-bold text-ds-dark text-sm leading-snug">
                {rezept.titel}
              </p>
              <span
                className="text-sm font-bold shrink-0"
                style={{ color: '#D97706' }}
                aria-hidden="true"
              >
                →
              </span>
            </div>

            {/* Description — max 2 lines */}
            <p className="text-[13px] text-ds-mid leading-relaxed mb-3 line-clamp-2">
              {rezept.beschreibung}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
              >
                🌾 {rezept.kh}g KH
              </span>
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}
              >
                🔥 {rezept.kcal} kcal
              </span>
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#E8F8F2', color: '#17735A' }}
              >
                ⏱ {rezept.zeit}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-6 border-[#E2E8F0]" />

      {/* KH-Rechner promo card */}
      <Link
        href="/rechner"
        className="flex items-center gap-4 rounded-[16px] p-4 transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          backgroundColor: '#EDE9FE',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 6px 16px 0 rgba(124,58,237,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0,0,0,0.06)'
        }}
      >
        {/* Icon circle */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
          style={{ backgroundColor: '#7C3AED' }}
          aria-hidden="true"
        >
          🧮
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: '#7C3AED' }}>
            KH-Rechner
          </p>
          <p className="text-xs text-ds-mid mt-0.5">
            Kohlenhydrate für deine Mahlzeit berechnen
          </p>
        </div>

        {/* Arrow */}
        <span
          className="text-sm font-bold shrink-0"
          style={{ color: '#7C3AED' }}
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </div>
  )
}
