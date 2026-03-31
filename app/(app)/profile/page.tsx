'use client'

import { useEffect, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getProfil, updateProfil } from '@/src/lib/actions/profil'
import type { ProfilRow } from '@/src/lib/types/database'

/* ─── Hilfsfunktionen ────────────────────────────────────────────────────── */

function getInitials(name: string): string {
  const teile = name.trim().split(/\s+/)
  if (teile.length === 1) return teile[0].slice(0, 2).toUpperCase()
  return (teile[0][0] + teile[1][0]).toUpperCase()
}

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/* ─── Lade-Platzhalter ───────────────────────────────────────────────────── */

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-ds-border ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}

/* ─── Haupt-Komponente ───────────────────────────────────────────────────── */

export default function ProfilSeite() {
  const [userId, setUserId] = useState<string | null>(null)
  const [profil, setProfil] = useState<ProfilRow | null>(null)
  const [ladeFehler, setLadeFehler] = useState<string | null>(null)
  const [laedt, setLaedt] = useState(true)

  // Formularfelder
  const [anzeigename, setAnzeigename] = useState('')
  const [diabetesTyp, setDiabetesTyp] = useState<'typ1' | 'typ2'>('typ1')

  // Speichern-Status
  const [isPending, startTransition] = useTransition()
  const [gespeichert, setGespeichert] = useState(false)
  const [speichernFehler, setSpeichernFehler] = useState<string | null>(null)

  // 1. Beim Laden: aktuellen Nutzer ermitteln
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setLadeFehler('Nicht eingeloggt.')
        setLaedt(false)
        return
      }
      setUserId(user.id)
    })
  }, [])

  // 2. Profil laden, sobald userId bekannt
  useEffect(() => {
    if (!userId) return
    getProfil(userId).then((ergebnis) => {
      if (ergebnis.success && ergebnis.data) {
        const p = ergebnis.data
        setProfil(p)
        setAnzeigename(p.anzeigename)
        setDiabetesTyp(p.diabetesTyp)
      } else {
        setLadeFehler(ergebnis.fehler ?? 'Profil konnte nicht geladen werden.')
      }
      setLaedt(false)
    })
  }, [userId])

  // 3. Profil speichern
  function handleSpeichern(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!userId) return
    setGespeichert(false)
    setSpeichernFehler(null)

    startTransition(async () => {
      const ergebnis = await updateProfil(userId, { anzeigename, diabetesTyp })
      if (ergebnis.success) {
        setGespeichert(true)
        // Erfolgs-Meldung nach 3 Sekunden ausblenden
        setTimeout(() => setGespeichert(false), 3000)
      } else {
        setSpeichernFehler(ergebnis.fehler ?? 'Speichern fehlgeschlagen.')
      }
    })
  }

  /* ── Ladezustand ─────────────────────────────────────────────────────────── */
  if (laedt) {
    return (
      <div className="animate-fade-in space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  /* ── Fehlerzustand ───────────────────────────────────────────────────────── */
  if (ladeFehler) {
    return (
      <div className="animate-fade-in">
        <p className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center">
          {ladeFehler}
        </p>
      </div>
    )
  }

  const initialen = anzeigename ? getInitials(anzeigename) : 'DS'

  /* ── Profil-Formular ─────────────────────────────────────────────────────── */
  return (
    <div className="animate-fade-in">
      {/* Kopfzeile */}
      <section className="mb-6">
        <p className="text-sm text-ds-mid mb-1">Einstellungen</p>
        <h1 className="text-[22px] font-bold text-ds-dark leading-snug">
          Mein Profil
        </h1>
      </section>

      {/* Avatar-Kreis */}
      <section className="mb-6 flex flex-col items-center">
        <div
          className="w-20 h-20 rounded-full bg-brand-light border-4 border-brand flex items-center justify-center mb-3"
          aria-hidden="true"
        >
          <span className="text-2xl font-bold text-brand leading-none select-none">
            {initialen}
          </span>
        </div>
        <p className="text-xs text-ds-light">Profilbild folgt in einer späteren Version</p>
      </section>

      {/* Formular */}
      <form onSubmit={handleSpeichern} noValidate>
        {/* Anzeigename */}
        <div className="mb-5">
          <label
            htmlFor="anzeigename"
            className="block text-sm font-semibold text-ds-dark mb-1.5"
          >
            Anzeigename
          </label>
          <input
            id="anzeigename"
            type="text"
            autoComplete="nickname"
            value={anzeigename}
            onChange={(e) => setAnzeigename(e.target.value)}
            disabled={isPending}
            placeholder="Dein Name in der Community"
            className="w-full px-4 py-3 rounded-xl border border-ds-border bg-white text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand transition"
          />
        </div>

        {/* Diabetes-Typ */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-ds-dark mb-1.5">Diabetes-Typ</p>
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Diabetes-Typ auswählen">
            {(['typ1', 'typ2'] as const).map((typ) => (
              <button
                key={typ}
                type="button"
                onClick={() => setDiabetesTyp(typ)}
                disabled={isPending}
                aria-pressed={diabetesTyp === typ}
                className={`py-3 rounded-xl border-2 font-semibold transition ${
                  diabetesTyp === typ
                    ? 'bg-brand border-brand text-white'
                    : 'bg-white border-ds-border text-ds-dark hover:border-brand'
                }`}
              >
                {typ === 'typ1' ? 'Typ 1' : 'Typ 2'}
              </button>
            ))}
          </div>
        </div>

        {/* Speichern-Rückmeldung */}
        {gespeichert && (
          <p
            role="status"
            className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 text-center"
          >
            ✓ Profil erfolgreich gespeichert
          </p>
        )}
        {speichernFehler && (
          <p
            role="alert"
            className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 text-center"
          >
            {speichernFehler}
          </p>
        )}

        {/* Speichern-Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Wird gespeichert…' : 'Speichern'}
        </button>
      </form>

      {/* Nur-Lese-Angaben */}
      <section className="mt-8 space-y-4">
        <p className="text-xs font-semibold text-ds-mid uppercase tracking-wide">
          Konto-Informationen
        </p>

        <div className="bg-white rounded-2xl border border-ds-border divide-y divide-ds-border">
          {/* E-Mail */}
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-ds-mid">E-Mail</span>
            <span className="text-sm font-medium text-ds-dark truncate max-w-[60%] text-right">
              {profil?.email || '—'}
            </span>
          </div>

          {/* Mitglied seit */}
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-ds-mid">Mitglied seit</span>
            <span className="text-sm font-medium text-ds-dark">
              {profil?.erstelltAm ? formatDatum(profil.erstelltAm) : '—'}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
