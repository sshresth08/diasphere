import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockCreateServerClient, mockCookies } = vi.hoisted(() => ({
  mockCreateServerClient: vi.fn(),
  mockCookies: vi.fn(),
}))

vi.mock('server-only', () => ({}))
vi.mock('next/headers', () => ({ cookies: mockCookies }))
vi.mock('@supabase/ssr', () => ({ createServerClient: mockCreateServerClient }))

describe('lib/supabase/server', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    }
  })

  it('awaits cookies() and passes URL and anon key to createServerClient', async () => {
    const cookieStore = { getAll: vi.fn().mockReturnValue([]), set: vi.fn() }
    mockCookies.mockResolvedValue(cookieStore)
    mockCreateServerClient.mockReturnValue({})

    const { createClient } = await import('@/lib/supabase/server')
    await createClient()

    expect(mockCookies).toHaveBeenCalled()
    expect(mockCreateServerClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key',
      expect.objectContaining({ cookies: expect.any(Object) })
    )
  })

  it('returns the client from createServerClient', async () => {
    const mockClient = { from: vi.fn() }
    mockCookies.mockResolvedValue({ getAll: vi.fn().mockReturnValue([]), set: vi.fn() })
    mockCreateServerClient.mockReturnValue(mockClient)

    const { createClient } = await import('@/lib/supabase/server')
    expect(await createClient()).toBe(mockClient)
  })

  it('cookie adapter getAll() delegates to cookieStore.getAll()', async () => {
    const storedCookies = [{ name: 'sb-token', value: 'abc' }]
    const cookieStore = { getAll: vi.fn().mockReturnValue(storedCookies), set: vi.fn() }
    mockCookies.mockResolvedValue(cookieStore)

    let capturedAdapter: { getAll: () => unknown; setAll: (list: unknown[]) => void }
    mockCreateServerClient.mockImplementation((_url, _key, opts) => {
      capturedAdapter = opts.cookies
      return {}
    })

    const { createClient } = await import('@/lib/supabase/server')
    await createClient()

    expect(capturedAdapter!.getAll()).toEqual(storedCookies)
    expect(cookieStore.getAll).toHaveBeenCalled()
  })

  it('cookie adapter setAll() calls cookieStore.set() for each cookie', async () => {
    const cookieStore = { getAll: vi.fn().mockReturnValue([]), set: vi.fn() }
    mockCookies.mockResolvedValue(cookieStore)

    let capturedAdapter: { getAll: () => unknown; setAll: (list: unknown[]) => void }
    mockCreateServerClient.mockImplementation((_url, _key, opts) => {
      capturedAdapter = opts.cookies
      return {}
    })

    const { createClient } = await import('@/lib/supabase/server')
    await createClient()

    capturedAdapter!.setAll([
      { name: 'a', value: '1', options: { path: '/' } },
      { name: 'b', value: '2', options: {} },
    ])

    expect(cookieStore.set).toHaveBeenCalledTimes(2)
    expect(cookieStore.set).toHaveBeenNthCalledWith(1, 'a', '1', { path: '/' })
    expect(cookieStore.set).toHaveBeenNthCalledWith(2, 'b', '2', {})
  })

  it('cookie adapter setAll() silently swallows errors from Server Components', async () => {
    const cookieStore = {
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn().mockImplementation(() => { throw new Error('cannot set cookie in Server Component') }),
    }
    mockCookies.mockResolvedValue(cookieStore)

    let capturedAdapter: { getAll: () => unknown; setAll: (list: unknown[]) => void }
    mockCreateServerClient.mockImplementation((_url, _key, opts) => {
      capturedAdapter = opts.cookies
      return {}
    })

    const { createClient } = await import('@/lib/supabase/server')
    await createClient()

    expect(() =>
      capturedAdapter!.setAll([{ name: 'x', value: 'y', options: {} }])
    ).not.toThrow()
  })
})
