'use client'

import Link from 'next/link'

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      aria-label="Zurück"
      className="inline-flex items-center gap-2 mb-6"
    >
      <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-ds-bg hover:bg-brand-light transition-colors text-ds-dark font-bold text-lg select-none">
        ←
      </span>
      {label && (
        <span className="text-sm font-semibold text-ds-dark">{label}</span>
      )}
    </Link>
  )
}
