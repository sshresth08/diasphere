'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackButton from '@/src/components/ui/BackButton'
import { QUIZ_FRAGEN, type QuizFrage } from '@/src/lib/data/quiz'

type QuizPhase = 'fragen' | 'ergebnis'

export default function QuizPage() {
  const [aktuelleIndex, setAktuelleIndex] = useState<number>(0)
  const [gewaehlteAntwort, setGewaehlteAntwort] = useState<number | null>(null)
  const [richtigeAntworten, setRichtigeAntworten] = useState<number>(0)
  const [phase, setPhase] = useState<QuizPhase>('fragen')

  const aktuelleFrage: QuizFrage | undefined = QUIZ_FRAGEN[aktuelleIndex]
  const hatGeantwortet = gewaehlteAntwort !== null
  const istRichtig = hatGeantwortet && gewaehlteAntwort === aktuelleFrage?.richtig
  const fortschritt = (aktuelleIndex / QUIZ_FRAGEN.length) * 100
  const total = QUIZ_FRAGEN.length

  function handleAntwort(index: number): void {
    if (hatGeantwortet || !aktuelleFrage) return
    setGewaehlteAntwort(index)
    if (index === aktuelleFrage.richtig) {
      setRichtigeAntworten((prev) => prev + 1)
    }
  }

  function handleWeiter(): void {
    const naechsteIndex = aktuelleIndex + 1
    if (naechsteIndex >= QUIZ_FRAGEN.length) {
      setPhase('ergebnis')
    } else {
      setAktuelleIndex(naechsteIndex)
      setGewaehlteAntwort(null)
    }
  }

  function handleNeustart(): void {
    setAktuelleIndex(0)
    setGewaehlteAntwort(null)
    setRichtigeAntworten(0)
    setPhase('fragen')
  }

  function getAntwortKlassen(index: number): string {
    const basis =
      'w-full rounded-xl border-2 p-3 text-sm font-semibold text-left transition-colors disabled:cursor-default'
    if (!hatGeantwortet || !aktuelleFrage) {
      return `${basis} bg-ds-bg border-ds-border text-ds-dark hover:border-brand hover:bg-brand-light`
    }
    if (index === aktuelleFrage.richtig) {
      return `${basis} border-green-500 text-green-800`
    }
    if (index === gewaehlteAntwort) {
      return `${basis} border-red-400 text-red-800`
    }
    return `${basis} bg-ds-bg border-ds-border text-ds-dark`
  }

  function getAntwortStyle(index: number): React.CSSProperties {
    if (!hatGeantwortet || !aktuelleFrage) return {}
    if (index === aktuelleFrage.richtig) return { backgroundColor: '#D1FAE5' }
    if (index === gewaehlteAntwort) return { backgroundColor: '#FEE2E2' }
    return {}
  }

  function getErgebnisEmoji(): string {
    if (richtigeAntworten === total) return '🏆'
    if (richtigeAntworten >= 2) return '🎉'
    return '💪'
  }

  function getErgebnisText(): string {
    if (richtigeAntworten === total)
      return 'Perfekt! Du hast alle Fragen richtig beantwortet.'
    if (richtigeAntworten >= 2)
      return 'Gut gemacht! Wiederhole den Stoff, um alles zu festigen.'
    return 'Weiter üben! Schau dir die Leseinhalte an, um dein Wissen aufzufrischen.'
  }

  /* ── Results screen ────────────────────────────────────────── */
  if (phase === 'ergebnis') {
    return (
      <div className="animate-fade-in flex flex-col items-center text-center py-8">
        <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-4xl mb-4">
          {getErgebnisEmoji()}
        </div>
        <h1 className="text-[22px] font-bold text-ds-dark mb-1">
          Quiz abgeschlossen!
        </h1>
        <p className="text-[48px] font-bold text-brand leading-none my-3">
          {richtigeAntworten}/{total}
        </p>
        <p className="text-sm text-ds-mid leading-relaxed mb-8 max-w-xs">
          {getErgebnisText()}
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleNeustart}
            className="w-full bg-brand text-white font-bold text-sm py-3.5 rounded-xl transition-colors hover:bg-brand-dark"
          >
            Quiz wiederholen
          </button>
          <Link
            href="/lernen/lesen"
            className="block w-full text-center border-2 border-brand text-brand font-bold text-sm py-3.5 rounded-xl transition-colors hover:bg-brand-light"
          >
            Leseinhalte entdecken →
          </Link>
        </div>
      </div>
    )
  }

  /* ── Question not found guard ──────────────────────────────── */
  if (!aktuelleFrage) return null

  /* ── Question screen ───────────────────────────────────────── */
  return (
    <div className="animate-fade-in">
      <BackButton href="/lernen" />

      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-4">
        Lernquiz
      </h1>

      {/* Progress bar */}
      <div className="h-1.5 bg-ds-border rounded-full mb-2 overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-500"
          style={{ width: `${fortschritt}%` }}
        />
      </div>
      <p className="text-xs text-ds-mid mb-6">
        Frage {aktuelleIndex + 1} von {total}
      </p>

      {/* Question text */}
      <h2 className="text-[17px] font-bold text-ds-dark leading-snug mb-5">
        {aktuelleFrage.frage}
      </h2>

      {/* Answer buttons */}
      <div className="flex flex-col gap-3 mb-5">
        {aktuelleFrage.antworten.map((antwort, i) => (
          <button
            key={i}
            onClick={() => handleAntwort(i)}
            disabled={hatGeantwortet}
            aria-label={antwort}
            className={getAntwortKlassen(i)}
            style={getAntwortStyle(i)}
          >
            {antwort}
          </button>
        ))}
      </div>

      {/* Feedback card */}
      {hatGeantwortet && (
        <div
          className="rounded-xl p-4 mb-5 border"
          style={{
            backgroundColor: istRichtig ? '#D1FAE5' : '#FEE2E2',
            borderColor: istRichtig ? '#6EE7B7' : '#FCA5A5',
          }}
        >
          <p
            className="text-sm font-bold mb-1"
            style={{ color: istRichtig ? '#065F46' : '#991B1B' }}
          >
            {istRichtig ? '✅ Richtig! ' : '❌ Leider falsch. '}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: istRichtig ? '#065F46' : '#991B1B' }}
          >
            {aktuelleFrage.erklaerung}
          </p>
        </div>
      )}

      {/* Next button */}
      {hatGeantwortet && (
        <button
          onClick={handleWeiter}
          className="w-full bg-brand text-white font-bold text-sm py-3.5 rounded-xl transition-colors hover:bg-brand-dark"
        >
          {aktuelleIndex + 1 < total ? 'Nächste Frage →' : 'Ergebnis anzeigen'}
        </button>
      )}
    </div>
  )
}
