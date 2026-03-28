'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface ActionResult {
  success: boolean
  error?: string
}

export interface SignUpData {
  email: string
  password: string
  diabetesType: 'typ1' | 'typ2'
}

export interface SignInData {
  email: string
  password: string
}

/* ─── Guard ──────────────────────────────────────────────────────────────── */

function isPlaceholderConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return url === 'your-project-url' || !url.startsWith('https://')
}

/* ─── Actions ────────────────────────────────────────────────────────────── */

export async function signUp(data: SignUpData): Promise<ActionResult> {
  if (isPlaceholderConfig()) {
    return { success: false, error: 'Auth nicht konfiguriert (Demo-Modus)' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { diabetes_type: data.diabetesType },
      },
    })

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch {
    return { success: false, error: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.' }
  }
}

export async function signIn(data: SignInData): Promise<ActionResult> {
  if (isPlaceholderConfig()) {
    return { success: false, error: 'Auth nicht konfiguriert (Demo-Modus)' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) return { success: false, error: error.message }
  } catch {
    return { success: false, error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' }
  }

  redirect('/dashboard')
}
