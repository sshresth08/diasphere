import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 mb-8"
        aria-label="DiaSphere — Startseite"
      >
        <span
          className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-base leading-none select-none"
          aria-hidden="true"
        >
          🩺
        </span>
        <span className="font-bold text-xl tracking-tight text-ds-dark">
          DiaSphere
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-ds-border p-10">
        {children}
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-ds-mid text-center max-w-sm leading-relaxed">
        ⚠️ DiaSphere ersetzt keinen Arztbesuch · Keine Insulindosierung ·
        Keine Fernbehandlung
      </p>
    </div>
  )
}
