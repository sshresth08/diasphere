'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import BackButton from '@/src/components/ui/BackButton'
import { KATEGORIEN, MOCK_POSTS, type KommentarType } from '@/src/lib/data/community'

// Tailwind-Klassen pro Kategorie-Farbe (vollständige Strings für Content-Scanner)
const BADGE_KLASSEN: Record<string, string> = {
  teal:   'bg-brand-light text-brand',
  green:  'bg-green-100 text-green-700',
  blue:   'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  pink:   'bg-pink-100 text-pink-700',
}

function badgeKlassen(farbe: string): string {
  return BADGE_KLASSEN[farbe] ?? 'bg-ds-bg text-ds-mid'
}

// Einzelne Kommentar-Karte
function KommentarKarte({ kommentar }: { kommentar: KommentarType }) {
  return (
    <div>
      {/* Autoren-Zeile */}
      <div className="flex items-center gap-2 mb-1.5">
        {/* Avatar */}
        <span
          className="w-7 h-7 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center shrink-0 select-none"
          aria-hidden="true"
        >
          {kommentar.autorInitial}
        </span>
        <span className="text-xs font-semibold text-ds-dark">{kommentar.autorName}</span>
        <span className="text-[11px] text-ds-light ml-auto">{kommentar.zeitstempel}</span>
      </div>

      {/* Kommentar-Text */}
      <p className="text-sm text-ds-mid leading-relaxed mb-2 pl-9">{kommentar.inhalt}</p>

      {/* Hilfreich-Button (rein visuell) */}
      <div className="pl-9 mb-1">
        <span className="inline-flex items-center gap-1 text-[11px] text-ds-light border border-ds-border rounded-full px-2.5 py-1 select-none">
          👍 Hilfreich ({kommentar.hilfreich})
        </span>
      </div>
    </div>
  )
}

// Post-Detailansicht
export default function CommunityDetailPage() {
  const params = useParams<{ id: string }>()
  const post = MOCK_POSTS.find((p) => p.id === params.id)

  // Zustand für das Kommentar-Formular
  const [kommentarText, setKommentarText] = useState('')
  const [abgeschickt, setAbgeschickt] = useState(false)
  const [fehler, setFehler] = useState('')

  function handleKommentarSenden() {
    // Validierung: Kommentar darf nicht leer sein
    if (!kommentarText.trim()) {
      setFehler('Bitte schreibe einen Kommentar, bevor du ihn sendest.')
      return
    }
    setFehler('')
    setAbgeschickt(true)
    setKommentarText('')
  }

  // Beitrag nicht gefunden
  if (!post) {
    return (
      <div className="animate-fade-in">
        <BackButton href="/community" />
        <div className="text-center py-12">
          <p className="text-5xl mb-4" aria-hidden="true">💬</p>
          <h1 className="text-[20px] font-bold text-ds-dark mb-2">Beitrag nicht gefunden</h1>
          <p className="text-sm text-ds-mid">
            Dieser Beitrag existiert leider nicht oder wurde entfernt.
          </p>
        </div>
      </div>
    )
  }

  const kategorie = KATEGORIEN.find((k) => k.id === post.kategorie)

  return (
    <div className="animate-fade-in">
      {/* ── ABSCHNITT 1: Navigation ──────────────────────────────────────── */}
      <BackButton href="/community" label="Community" />

      {/* ── ABSCHNITT 2: Post-Header ─────────────────────────────────────── */}
      <section className="mb-5">
        {/* Kategorie-Badge + Zeitstempel */}
        <div className="flex items-center justify-between mb-3">
          {kategorie && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeKlassen(kategorie.farbe)}`}
            >
              <span aria-hidden="true">{kategorie.icon}</span>
              {kategorie.label}
            </span>
          )}
          <span className="text-[11px] text-ds-light ml-auto pl-2">{post.zeitstempel}</span>
        </div>

        {/* Autoren-Zeile */}
        <div className="flex items-center gap-2 mb-3">
          {/* Avatar */}
          <span
            className="w-8 h-8 rounded-full bg-brand-light text-brand text-sm font-bold flex items-center justify-center shrink-0 select-none"
            aria-hidden="true"
          >
            {post.autorInitial}
          </span>
          <span className="text-sm font-semibold text-ds-dark">{post.autorName}</span>
          {/* Gelöst-Badge */}
          {post.geloest && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
              ✓ Gelöst
            </span>
          )}
        </div>

        {/* Titel */}
        <h1 className="text-[20px] font-bold text-ds-dark leading-snug mb-3">{post.titel}</h1>

        {/* Volltext */}
        <div className="bg-white border border-ds-border rounded-2xl shadow-sm p-4 mb-3">
          {post.inhalt.split('\n').map((absatz, i) =>
            absatz.trim() ? (
              <p key={i} className="text-sm text-ds-mid leading-relaxed mb-2 last:mb-0">
                {absatz}
              </p>
            ) : (
              <div key={i} className="h-2" />
            ),
          )}
        </div>

        {/* Likes-Anzeige */}
        <p className="text-xs text-ds-light">
          <span className="mr-1" aria-hidden="true">❤️</span>
          {post.likes} Personen fanden das hilfreich
        </p>
      </section>

      {/* ── ABSCHNITT 3: Kommentare ───────────────────────────────────────── */}
      <section className="mb-6">
        <h2 className="text-base font-bold text-ds-dark mb-4">
          Kommentare ({post.kommentare.length})
        </h2>

        <div className="bg-white border border-ds-border rounded-2xl shadow-sm overflow-hidden">
          {post.kommentare.map((kommentar, index) => (
            <div key={kommentar.id}>
              <div className="px-4 py-4">
                <KommentarKarte kommentar={kommentar} />
              </div>
              {/* Trennlinie zwischen Kommentaren */}
              {index < post.kommentare.length - 1 && (
                <hr className="border-ds-border mx-4" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABSCHNITT 4: Kommentar schreiben ─────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-ds-dark mb-3">Deine Antwort</h2>

        {/* Erfolgs-Hinweis nach dem Absenden */}
        {abgeschickt && (
          <div
            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm text-green-700"
            role="status"
          >
            <span aria-hidden="true">✓</span>
            Kommentar eingereicht! (Demo-Modus — erscheint nach Freischaltung)
          </div>
        )}

        {/* Textarea */}
        <textarea
          value={kommentarText}
          onChange={(e) => setKommentarText(e.target.value)}
          placeholder="Teile deine Erfahrung oder beantworte die Frage..."
          rows={4}
          aria-label="Kommentar schreiben"
          className="w-full border border-ds-border rounded-xl px-4 py-3 text-sm text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand resize-none mb-2"
        />

        {/* Fehlermeldung */}
        {fehler && (
          <p className="text-xs text-red-600 mb-2" role="alert">
            {fehler}
          </p>
        )}

        {/* Senden-Button */}
        <button
          type="button"
          onClick={handleKommentarSenden}
          className="w-full py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark active:scale-95 transition-all"
        >
          Kommentar senden
        </button>
      </section>
    </div>
  )
}
