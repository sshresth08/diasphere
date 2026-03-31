import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // supabaseResponse muss immer zurückgegeben werden, damit Supabase
  // Cookies korrekt setzen kann (z. B. bei Token-Refresh)
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Erst im Request-Objekt setzen (für nachfolgende Middleware-Schritte)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Dann neues Response-Objekt mit aktualisierten Cookies erstellen
          supabaseResponse = NextResponse.next({ request })
          // Cookies auch in die Response schreiben (für den Browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // WICHTIG: getUser() statt getSession() verwenden!
  // getSession() liest nur den lokalen Cookie ohne Token-Validierung —
  // das ist unsicher. getUser() validiert den Token serverseitig bei Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Geschützte Routen: alle App-Seiten hinter dem authenticated Shell
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/lernen') ||
    request.nextUrl.pathname.startsWith('/rezepte') ||
    request.nextUrl.pathname.startsWith('/rechner') ||
    request.nextUrl.pathname.startsWith('/community') ||
    request.nextUrl.pathname.startsWith('/notfall') ||
    request.nextUrl.pathname.startsWith('/profile')

  // Auth-Routen: Login und Registrierung
  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  // Nicht eingeloggt + geschützte Route → zu /login weiterleiten
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Eingeloggt + Auth-Route → zu /dashboard weiterleiten (kein erneutes Login nötig)
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // supabaseResponse zurückgeben, damit Cookies korrekt weitergegeben werden
  return supabaseResponse
}

export const config = {
  matcher: [
    // Alle Routen außer statische Dateien und Next.js-interne Pfade
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
