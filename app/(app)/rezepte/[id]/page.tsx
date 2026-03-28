'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import BackButton from '@/src/components/ui/BackButton'
import { REZEPTE } from '@/src/lib/data/rezepte'

export default function RezeptDetailPage() {
  const params = useParams<{ id: string }>()
  const rezept = REZEPTE.find((r) => r.id === Number(params.id))

  if (!rezept) {
    return (
      <div className="animate-fade-in">
        <BackButton href="/rezepte" />
        <div className="text-center py-12">
          <p className="text-5xl mb-4" aria-hidden="true">
            🍽️
          </p>
          <h1 className="text-[20px] font-bold text-ds-dark mb-2">
            Rezept nicht gefunden
          </h1>
          <p className="text-sm text-ds-mid">
            Das gesuchte Rezept existiert leider nicht.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <BackButton href="/rezepte" />
      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-4">
        {rezept.titel}
      </h1>

      {/* Large emoji centered */}
      <div
        className="text-[64px] leading-none text-center mb-4"
        aria-hidden="true"
      >
        {rezept.emoji}
      </div>

      {/* Badge row centered */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
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

      {/* Zutaten */}
      <h2 className="text-base font-bold text-ds-dark mb-3">Zutaten</h2>
      <div
        className="bg-white rounded-2xl border border-ds-border mb-6 overflow-hidden"
        style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.04)' }}
      >
        {rezept.zutaten.map((zutat, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 px-4 py-3">
              <span
                className="font-bold text-sm shrink-0"
                style={{ color: '#1D9E75' }}
                aria-hidden="true"
              >
                •
              </span>
              <p className="text-[14px] text-ds-mid">{zutat}</p>
            </div>
            {index < rezept.zutaten.length - 1 && (
              <hr className="border-ds-border mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Zubereitung */}
      <h2 className="text-base font-bold text-ds-dark mb-3">Zubereitung</h2>
      <div className="flex flex-col gap-3 mb-6">
        {rezept.schritte.map((schritt, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Step circle */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: '#1D9E75' }}
              aria-hidden="true"
            >
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
            {/* Step text */}
            <p className="text-[14px] text-ds-mid leading-relaxed flex-1">
              {schritt}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/rechner"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 text-sm font-semibold transition-colors hover:bg-brand-light"
        style={{ borderColor: '#1D9E75', color: '#1D9E75' }}
      >
        🧮 KH berechnen
      </Link>
    </div>
  )
}
