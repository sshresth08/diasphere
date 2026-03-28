'use client'

import Link from 'next/link'
import BackButton from '@/src/components/ui/BackButton'

export default function VideoPage() {
  return (
    <div className="animate-fade-in">
      <BackButton href="/lernen" />

      {/* Header */}
      <h1 className="text-[22px] font-bold text-ds-dark leading-snug mb-1">
        Lernvideo
      </h1>
      <p className="text-sm text-ds-mid mb-6">
        Einführung in Typ-1 Diabetes
      </p>

      {/* YouTube embed */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{ aspectRatio: '16/9', backgroundColor: '#0F1C17' }}
      >
        <iframe
          src="https://www.youtube.com/embed/X9ivHHbD82M"
          title="Typ-1 Diabetes Erklärvideo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Info card */}
      <div
        className="bg-brand-light rounded-2xl p-4 mb-6 border-l-4"
        style={{ borderColor: '#1D9E75' }}
      >
        <p className="font-bold text-sm text-ds-dark mb-1">📝 Zum Video</p>
        <p className="text-sm text-ds-mid leading-relaxed">
          Dieses Video erklärt die Grundlagen von Typ-1 Diabetes verständlich.
          Nach dem Anschauen kannst du dein Wissen im Quiz testen!
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/lernen/quiz"
        className="block w-full text-center bg-brand text-white font-bold text-sm py-3.5 rounded-xl transition-colors hover:bg-brand-dark"
      >
        Zum Quiz →
      </Link>
    </div>
  )
}
