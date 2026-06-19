import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // ✅ Race getUser() against a 1.5s timeout — avoids MIDDLEWARE_INVOCATION_TIMEOUT
  const timeout = new Promise<{ data: { user: null } }>((resolve) =>
    setTimeout(() => resolve({ data: { user: null } }), 1500)
  )

  const {
    data: { user },
  } = await Promise.race([supabase.auth.getUser(), timeout])

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/lernen') ||
    request.nextUrl.pathname.startsWith('/rezepte') ||
    request.nextUrl.pathname.startsWith('/rechner') ||
    request.nextUrl.pathname.startsWith('/community') ||
    request.nextUrl.pathname.startsWith('/notfall') ||
    request.nextUrl.pathname.startsWith('/profile')

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}