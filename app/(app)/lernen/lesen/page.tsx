'use client'

import BackButton from '@/src/components/ui/BackButton'
import { ARTIKEL, type Artikel } from '@/src/lib/data/artikel'

export default function LesenPage() {
  return (
    <div className="animate-fade-in">
      <BackButton href="/lernen" />

      {/* Header */}
      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">
        Leseinhalte
      </h1>
      <p className="text-sm text-ds-mid mb-6">
        Wichtige Grundlagen verständlich erklärt
      </p>

      {/* Article cards */}
      <div className="flex flex-col gap-[14px]">
        {ARTIKEL.map((artikel: Artikel) => (
          <article
            key={artikel.id}
            className="bg-white rounded-2xl border border-ds-border p-4"
          >
            {/* Top row: title + lesezeit badge */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="font-bold text-sm text-brand-dark leading-snug flex-1">
                {artikel.titel}
              </p>
              <span className="shrink-0 bg-brand-light text-brand text-xs font-semibold px-2.5 py-1 rounded-full">
                {artikel.lesezeit}
              </span>
            </div>

            {/* Body text */}
            <p className="text-sm text-ds-mid leading-relaxed">{artikel.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
