import { describe, it, expect, vi, beforeEach } from 'vitest'

// --- Mocks mit vi.hoisted (werden vor allen Imports gehoisted) ---
const {
  mockCreateServerClient,
  mockNextResponseNext,
  mockNextResponseRedirect,
  mockGetUser,
} = vi.hoisted(() => {
  const mockGetUser = vi.fn()
  const mockCreateServerClient = vi.fn()
  const mockNextResponseNext = vi.fn()
  const mockNextResponseRedirect = vi.fn()
  return { mockCreateServerClient, mockNextResponseNext, mockNextResponseRedirect, mockGetUser }
})

vi.mock('@supabase/ssr', () => ({ createServerClient: mockCreateServerClient }))

vi.mock('next/server', () => ({
  NextResponse: {
    next: mockNextResponseNext,
    redirect: mockNextResponseRedirect,
  },
}))

// --- Hilfsfunktionen ---

/** Erstellt ein minimales NextRequest-Mock-Objekt */
function makeRequest(pathname: string) {
  const url = `http://localhost${pathname}`
  const cookies = new Map<string, string>()
  return {
    url,
    nextUrl: { pathname },
    cookies: {
      getAll: () => [...cookies.entries()].map(([name, value]) => ({ name, value })),
      set: (name: string, value: string) => cookies.set(name, value),
    },
  }
}

/** Erstellt eine gefälschte Response mit Cookie-Unterstützung */
function makeFakeResponse() {
  const cookieJar = new Map<string, string>()
  return {
    cookies: {
      set: vi.fn((name: string, value: string) => cookieJar.set(name, value)),
    },
    _cookieJar: cookieJar,
  }
}

describe('src/middleware', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.resetAllMocks()
    vi.resetModules()

    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    }

    // Standard-Response für NextResponse.next()
    mockNextResponseNext.mockReturnValue(makeFakeResponse())

    // Standard-Response für NextResponse.redirect()
    mockNextResponseRedirect.mockReturnValue({ type: 'redirect' })
  })

  /** Richtet den Supabase-Mock für einen eingeloggten oder ausgeloggten Nutzer ein */
  function setupSupabaseMock(user: object | null) {
    mockGetUser.mockResolvedValue({ data: { user } })
    mockCreateServerClient.mockImplementation((_url, _key, opts) => {
      // Cookie-Adapter aktivieren, damit setAll() aufgerufen werden kann
      opts.cookies.getAll()
      return { auth: { getUser: mockGetUser } }
    })
  }

  // === Nicht eingeloggte Nutzer ===

  it('leitet nicht eingeloggte Nutzer von /dashboard zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/dashboard') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /profile zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/profile') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /lernen zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/lernen') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /rezepte zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/rezepte') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /community zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/community') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /notfall zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/notfall') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  it('leitet nicht eingeloggte Nutzer von /rechner zu /login weiter', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/rechner') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/login' })
    )
  })

  // === Öffentliche Routen für nicht eingeloggte Nutzer ===

  it('lässt nicht eingeloggte Nutzer auf / durch', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
    expect(mockNextResponseNext).toHaveBeenCalled()
  })

  it('lässt nicht eingeloggte Nutzer auf /login durch', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/login') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
  })

  it('lässt nicht eingeloggte Nutzer auf /signup durch', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/signup') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
  })

  it('lässt nicht eingeloggte Nutzer auf /auth/callback durch', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/auth/callback') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
  })

  // === Eingeloggte Nutzer ===

  it('leitet eingeloggte Nutzer von /login zu /dashboard weiter', async () => {
    setupSupabaseMock({ id: 'user-123', email: 'test@example.com' })
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/login') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/dashboard' })
    )
  })

  it('leitet eingeloggte Nutzer von /signup zu /dashboard weiter', async () => {
    setupSupabaseMock({ id: 'user-123', email: 'test@example.com' })
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/signup') as never)
    expect(mockNextResponseRedirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: 'http://localhost/dashboard' })
    )
  })

  it('lässt eingeloggte Nutzer auf /dashboard durch', async () => {
    setupSupabaseMock({ id: 'user-123' })
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/dashboard') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
    expect(mockNextResponseNext).toHaveBeenCalled()
  })

  it('lässt eingeloggte Nutzer auf /profile durch', async () => {
    setupSupabaseMock({ id: 'user-123' })
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/profile') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
  })

  it('lässt eingeloggte Nutzer auf / durch', async () => {
    setupSupabaseMock({ id: 'user-123' })
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/') as never)
    expect(mockNextResponseRedirect).not.toHaveBeenCalled()
  })

  // === Supabase-Client-Konfiguration ===

  it('verwendet getUser() statt getSession() für sichere Token-Validierung', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/') as never)
    expect(mockGetUser).toHaveBeenCalled()
  })

  it('übergibt URL und Anon-Key aus Umgebungsvariablen an createServerClient', async () => {
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    await middleware(makeRequest('/') as never)
    expect(mockCreateServerClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key',
      expect.objectContaining({ cookies: expect.any(Object) })
    )
  })

  it('gibt supabaseResponse zurück, damit Cookies korrekt weitergegeben werden', async () => {
    const fakeResponse = makeFakeResponse()
    mockNextResponseNext.mockReturnValue(fakeResponse)
    setupSupabaseMock(null)
    const { middleware } = await import('@/src/middleware')
    const result = await middleware(makeRequest('/') as never)
    expect(result).toBe(fakeResponse)
  })
})
