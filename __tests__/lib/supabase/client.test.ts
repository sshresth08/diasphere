import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockCreateBrowserClient } = vi.hoisted(() => ({
  mockCreateBrowserClient: vi.fn(),
}))

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: mockCreateBrowserClient,
}))

describe('lib/supabase/client', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.resetAllMocks()
    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    }
  })

  it('calls createBrowserClient with URL and anon key from env', async () => {
    const { createClient } = await import('@/lib/supabase/client')
    createClient()
    expect(mockCreateBrowserClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key'
    )
  })

  it('returns the value from createBrowserClient', async () => {
    const mockClient = { from: vi.fn() }
    mockCreateBrowserClient.mockReturnValue(mockClient)
    const { createClient } = await import('@/lib/supabase/client')
    expect(createClient()).toBe(mockClient)
  })
})
