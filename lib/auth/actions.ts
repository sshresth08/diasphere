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

/* ─── Actions ────────────────────────────────────────────────────────────── */

export async function signUp(data: SignUpData): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const anzeigename = data.email.split('@')[0]
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
        data: {
          diabetes_typ: data.diabetesType,
          anzeigename,
        },
      },
    })

    if (error) return { success: false, error: error.message }
    return { success: true }
    // TODO: Supabase aktiviert — app schema, Tabelle: app.profiles
  } catch {
    return { success: false, error: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.' }
  }
}

export async function signIn(data: SignInData): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) return { success: false, error: error.message }
    // TODO: Supabase aktiviert — app schema, Tabelle: app.profiles
  } catch {
    return { success: false, error: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' }
  }

  redirect('/dashboard')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
