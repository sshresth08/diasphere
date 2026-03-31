import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supabase sendet den Nutzer nach der E-Mail-Bestätigung hierher.
// Wir tauschen den Code gegen eine Session und leiten weiter.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Bei Fehler: zurück zum Login mit Hinweis
  return NextResponse.redirect(`${origin}/login?fehler=email_bestaetigung_fehlgeschlagen`)
}
