'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  KATEGORIEN,
  MOCK_POSTS,
  type KategorieId,
  type PostType,
} from '@/src/lib/data/community'

// Tailwind-Klassen pro Kategorie-Farbe (vollständige Strings für Content-Scanner)
const BADGE_KLASSEN: Record<string, string> = {
  teal:   'bg-brand-light text-brand',
  green:  'bg-green-100 text-green-700',
  blue:   'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  pink:   'bg-pink-100 text-pink-700',
}

// Hilfsfunktion: Farb-Klassen für eine Kategorie ermitteln
function badgeKlassen(farbe: string): string {
  return BADGE_KLASSEN[farbe] ?? 'bg-ds-bg text-ds-mid'
}

// Einzelne Post-Karte im Feed
function PostKarte({ post, onClick }: { post: PostType; onClick: () => void }) {
  const kategorie = KATEGORIEN.find((k) => k.id === post.kategorie)

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white border border-ds-border rounded-2xl shadow-sm p-4 transition-shadow duration-200 hover:shadow-md active:shadow-sm"
      aria-label={`Beitrag öffnen: ${post.titel}`}
    >
      {/* Obere Zeile: Kategorie-Badge + Zeitstempel */}
      <div className="flex items-center justify-between mb-2">
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

      {/* Autorenzeile */}
      <div className="flex items-center gap-2 mb-2">
        {/* Avatar-Kreis */}
        <span
          className="w-7 h-7 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center shrink-0 select-none"
          aria-hidden="true"
        >
          {post.autorInitial}
        </span>
        <span className="text-xs font-semibold text-ds-dark">{post.autorName}</span>
        {/* Gelöst-Badge */}
        {post.geloest && (
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
            ✓ Gelöst
          </span>
        )}
      </div>

      {/* Titel */}
      <p className="text-sm font-bold text-ds-dark leading-snug mb-1">{post.titel}</p>

      {/* Vorschau (2 Zeilen) */}
      <p className="text-xs text-ds-mid leading-relaxed line-clamp-2 mb-3">{post.vorschau}</p>

      {/* Untere Zeile: Likes, Kommentare, Chevron */}
      <div className="flex items-center gap-3 text-xs text-ds-light">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.kommentare.length} Kommentare</span>
        <span className="ml-auto text-brand font-bold" aria-hidden="true">→</span>
      </div>
    </button>
  )
}

// Leerzustand wenn keine Posts gefunden wurden
function LeererZustand() {
  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3" aria-hidden="true">🔍</p>
      <p className="font-semibold text-ds-dark mb-1">Keine Beiträge gefunden</p>
      <p className="text-sm text-ds-mid">Versuche einen anderen Filter oder Suchbegriff.</p>
    </div>
  )
}

// Modal: Neuen Beitrag erstellen
interface ModalProps {
  onSchliessen: () => void
  onErfolgreich: () => void
}

function NeuerBeitragModal({ onSchliessen, onErfolgreich }: ModalProps) {
  const [modalKategorie, setModalKategorie] = useState<KategorieId>('allgemein')
  const [modalTitel, setModalTitel] = useState('')
  const [modalInhalt, setModalInhalt] = useState('')
  const [fehler, setFehler] = useState('')

  function handleVeroeffentlichen() {
    // Validierung: beide Felder müssen ausgefüllt sein
    if (!modalTitel.trim() || !modalInhalt.trim()) {
      setFehler('Bitte fülle Titel und Inhalt aus.')
      return
    }
    setFehler('')
    onErfolgreich()
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Neuen Beitrag erstellen"
    >
      {/* Modal-Karte */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-base font-bold text-ds-dark mb-4">Neuen Beitrag erstellen</h2>

        {/* Kategorie-Auswahl */}
        <label className="block mb-3">
          <span className="text-xs font-semibold text-ds-mid mb-1 block">Kategorie</span>
          <select
            value={modalKategorie}
            onChange={(e) => setModalKategorie(e.target.value as KategorieId)}
            className="w-full border border-ds-border rounded-xl px-3 py-2 text-sm text-ds-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {KATEGORIEN.map((kat) => (
              <option key={kat.id} value={kat.id}>
                {kat.icon} {kat.label}
              </option>
            ))}
          </select>
        </label>

        {/* Titel */}
        <label className="block mb-3">
          <span className="text-xs font-semibold text-ds-mid mb-1 block">Titel *</span>
          <input
            type="text"
            value={modalTitel}
            onChange={(e) => setModalTitel(e.target.value)}
            placeholder="Was möchtest du fragen oder teilen?"
            className="w-full border border-ds-border rounded-xl px-3 py-2 text-sm text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>

        {/* Inhalt */}
        <label className="block mb-4">
          <span className="text-xs font-semibold text-ds-mid mb-1 block">Inhalt *</span>
          <textarea
            value={modalInhalt}
            onChange={(e) => setModalInhalt(e.target.value)}
            placeholder="Beschreibe deine Frage oder Erfahrung ausführlich..."
            rows={4}
            className="w-full border border-ds-border rounded-xl px-3 py-2 text-sm text-ds-dark placeholder:text-ds-light focus:outline-none focus:ring-2 focus:ring-brand resize-none"
          />
        </label>

        {/* Fehlermeldung */}
        {fehler && (
          <p className="text-xs text-red-600 mb-3" role="alert">
            {fehler}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSchliessen}
            className="flex-1 py-2.5 rounded-xl border border-ds-border text-sm font-semibold text-ds-mid hover:bg-ds-bg transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={handleVeroeffentlichen}
            className="flex-1 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Veröffentlichen
          </button>
        </div>
      </div>
    </div>
  )
}

// Haupt-Seite: Community-Feed
export default function CommunityPage() {
  const router = useRouter()

  // Filter- und Such-Zustand
  const [aktiveKategorie, setAktiveKategorie] = useState<KategorieId | 'alle'>('alle')
  const [suchbegriff, setSuchbegriff] = useState('')

  // Modal-Zustand
  const [modalOffen, setModalOffen] = useState(false)
  const [eingereicht, setEingereicht] = useState(false)

  // Posts nach aktiver Kategorie und Suchbegriff filtern
  const gefiltertePosts = MOCK_POSTS.filter((post) => {
    const kategoriePasst = aktiveKategorie === 'alle' || post.kategorie === aktiveKategorie
    const suchbegriffNormiert = suchbegriff.trim().toLowerCase()
    const suchPasst =
      suchbegriffNormiert === '' ||
      post.titel.toLowerCase().includes(suchbegriffNormiert) ||
      post.vorschau.toLowerCase().includes(suchbegriffNormiert)
    return kategoriePasst && suchPasst
  })

  function handleBeitragErfolgreich() {
    setModalOffen(false)
    setEingereicht(true)
  }

  return (
    <div className="animate-fade-in">
      {/* ── ABSCHNITT 1: Header ──────────────────────────────────────────── */}
      <section className="mb-4">
        <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">Community</h1>
        <p className="text-sm text-ds-mid mb-4">
          Tausch dich mit anderen Typ-1-Diabetikern aus
        </p>

        {/* Suchfeld */}
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-light select-none"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            type="search"
            value={suchbegriff}
            onChange={(e) => setSuchbegriff(e.target.value)}
            placeholder="Beiträge durchsuchen..."
            aria-label="Beiträge durchsuchen"
            className="w-full border border-ds-border rounded-xl pl-9 pr-4 py-3 text-sm text-ds-dark placeholder:text-ds-light bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </section>

      {/* Einreichungs-Hinweis (Demo-Modus) */}
      {eingereicht && (
        <div
          className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm text-green-700"
          role="status"
        >
          <span aria-hidden="true">✓</span>
          Dein Beitrag wurde eingereicht! (Demo-Modus)
        </div>
      )}

      {/* ── ABSCHNITT 2: Kategorie-Filter ────────────────────────────────── */}
      <section className="mb-5">
        <div
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Kategorien filtern"
        >
          {/* Chip: Alle */}
          <button
            type="button"
            onClick={() => setAktiveKategorie('alle')}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              aktiveKategorie === 'alle'
                ? 'bg-brand text-white border-brand'
                : 'bg-white border-ds-border text-ds-mid hover:border-brand hover:text-brand'
            }`}
          >
            Alle
          </button>

          {/* Chips pro Kategorie */}
          {KATEGORIEN.map((kat) => (
            <button
              key={kat.id}
              type="button"
              onClick={() => setAktiveKategorie(kat.id)}
              className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                aktiveKategorie === kat.id
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white border-ds-border text-ds-mid hover:border-brand hover:text-brand'
              }`}
            >
              <span aria-hidden="true">{kat.icon}</span>
              {kat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── ABSCHNITT 3: Post-Feed ────────────────────────────────────────── */}
      <section className="flex flex-col gap-3 mb-6">
        {gefiltertePosts.length === 0 ? (
          <LeererZustand />
        ) : (
          gefiltertePosts.map((post) => (
            <PostKarte
              key={post.id}
              post={post}
              onClick={() => router.push(`/community/${post.id}`)}
            />
          ))
        )}
      </section>

      {/* ── ABSCHNITT 4: Floating-Button (neuer Beitrag) ─────────────────── */}
      {/* fixed, über der BottomNav (bottom-20 = 80px) */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => setModalOffen(true)}
          aria-label="Neuen Beitrag erstellen"
          className="w-14 h-14 rounded-full bg-brand text-white text-2xl shadow-lg hover:bg-brand-dark active:scale-95 transition-all flex items-center justify-center"
        >
          ✏️
        </button>
        <span className="text-[10px] font-semibold text-ds-mid">Neu</span>
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {modalOffen && (
        <NeuerBeitragModal
          onSchliessen={() => setModalOffen(false)}
          onErfolgreich={handleBeitragErfolgreich}
        />
      )}
    </div>
  )
}
