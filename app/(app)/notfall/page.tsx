'use client'

import { useState } from 'react'
import {
  NOTFALL_SITUATIONEN,
  NOTFALL_KONTAKTE,
  type NotfallSituation,
} from '@/src/lib/data/notfall'

// Tailwind-Klassen-Mapping für die Situationsfarben
const FARBE_KLASSEN: Record<
  NotfallSituation['farbe'],
  {
    karte: string
    kopf: string
    titel: string
    badge: string
  }
> = {
  rot: {
    karte: 'bg-red-50 border-red-200',
    kopf: 'hover:bg-red-100',
    titel: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
  },
  gelb: {
    karte: 'bg-amber-50 border-amber-200',
    kopf: 'hover:bg-amber-100',
    titel: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
}

export default function NotfallPage() {
  // Akkordeon-State: null = alle geschlossen, number = Index der offenen Karte
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  function handleToggle(index: number) {
    // Gleicher Index schließt die Karte wieder
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="animate-fade-in pb-2">

      {/* ─── ABSCHNITT 1: Notruf-Banner ────────────────────────────────── */}
      <section className="mb-6">
        <a
          href="tel:112"
          className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xl rounded-2xl py-5 px-4 transition-colors"
          aria-label="Notruf 112 anrufen"
        >
          <span aria-hidden="true">🚨</span>
          Notruf 112 anrufen
        </a>
        <p className="text-center text-xs text-ds-mid mt-2">
          Bei lebensbedrohlichen Situationen sofort anrufen
        </p>
      </section>

      {/* ─── ABSCHNITT 2: Situationen-Akkordeon ────────────────────────── */}
      <section className="mb-6">
        <h2 className="text-base font-bold text-ds-dark mb-3">
          Was passiert gerade?
        </h2>

        <div className="flex flex-col gap-3">
          {NOTFALL_SITUATIONEN.map((situation, index) => {
            const klassen = FARBE_KLASSEN[situation.farbe]
            const istOffen = expandedIndex === index

            return (
              <div
                key={situation.id}
                className={`rounded-2xl border overflow-hidden ${klassen.karte}`}
              >
                {/* Kopfzeile — klickbar */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={istOffen}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-4 text-left transition-colors ${klassen.kopf}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none" aria-hidden="true">
                      {situation.icon}
                    </span>
                    <span className={`font-bold text-sm ${klassen.titel}`}>
                      {situation.titel}
                    </span>
                  </div>
                  {/* Pfeil-Icon zeigt Akkordeon-Status */}
                  <span
                    className={`text-lg leading-none transition-transform duration-200 ${klassen.titel} ${istOffen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>

                {/* Ausgeklappter Inhalt */}
                {istOffen && (
                  <div className="px-4 pb-4 pt-1 flex flex-col gap-4">

                    {/* Symptome */}
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${klassen.titel}`}>
                        Symptome
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {situation.symptome.map((symptom, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ds-dark">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-50" aria-hidden="true" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sofortmaßnahmen */}
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${klassen.titel}`}>
                        Sofortmaßnahmen
                      </p>
                      <ol className="flex flex-col gap-2">
                        {situation.massnahmen.map((massnahme, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-ds-dark">
                            <span
                              className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold leading-none ${klassen.badge}`}
                              aria-hidden="true"
                            >
                              {i + 1}
                            </span>
                            {massnahme}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── ABSCHNITT 3: Wichtige Kontakte ────────────────────────────── */}
      <section className="mb-6">
        <h2 className="text-base font-bold text-ds-dark mb-3">
          Wichtige Nummern
        </h2>

        <div className="flex flex-col gap-2">
          {NOTFALL_KONTAKTE.map((kontakt) => (
            <a
              key={kontakt.nummer}
              href={`tel:${kontakt.nummer.replace(/\s/g, '')}`}
              aria-label={`${kontakt.label} anrufen: ${kontakt.nummer}`}
              className="flex items-center gap-4 bg-white border border-ds-border rounded-2xl px-4 py-3 hover:bg-ds-bg active:bg-brand-light transition-colors"
            >
              {/* Icon */}
              <span className="text-2xl leading-none shrink-0" aria-hidden="true">
                {kontakt.icon}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-sm text-ds-dark">{kontakt.label}</span>
                  <span className="font-mono font-bold text-sm text-brand">{kontakt.nummer}</span>
                </div>
                <p className="text-xs text-ds-mid leading-snug mt-0.5">
                  {kontakt.beschreibung}
                </p>
              </div>

              {/* Tap-to-call Pfeil */}
              <span className="text-ds-light text-sm shrink-0" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ─── ABSCHNITT 4: Medizinischer Disclaimer ─────────────────────── */}
      <section>
        <div className="bg-brand-light border border-ds-border rounded-2xl px-4 py-3 flex gap-3 items-start">
          <span className="text-lg leading-none shrink-0 mt-0.5" aria-hidden="true">⚠️</span>
          <p className="text-xs text-ds-mid leading-relaxed">
            DiaSphere ersetzt keine medizinische Notfallversorgung. Bei Unsicherheit
            immer den Notruf (112) oder deinen Diabetologen kontaktieren.
          </p>
        </div>
      </section>

    </div>
  )
}
