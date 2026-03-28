'use server'

import type { ActionResult, ProfilRow } from '@/src/lib/types/database'
// import { createClient } from '@/lib/supabase/server'
// TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen

// ─── Demo-Modus-Guard ─────────────────────────────────────────────────────────
// Gibt true zurück, solange keine echten Supabase-Credentials konfiguriert sind
const isDemoMode = (): boolean =>
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url'

// ─── Profil eines Nutzers abrufen ─────────────────────────────────────────────
export async function getProfil(userId: string): Promise<ActionResult<ProfilRow>> {
  if (isDemoMode()) {
    // Demo-Modus: Mock-Profil zurückgeben
    return {
      success: true,
      data: {
        id: userId,
        email: 'demo@diasphere.de',
        anzeigename: 'Demo-Nutzer',
        diabetesTyp: 'typ1',
        erstelltAm: new Date().toISOString(),
        aktualisiertAm: new Date().toISOString(),
        avatarUrl: null,
        bio: 'Dies ist ein Demo-Profil.',
      },
    }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { data, error } = await supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('id', userId)
  //     .single()
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true, data: data as ProfilRow }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Profil aktualisieren ─────────────────────────────────────────────────────
export async function updateProfil(
  userId: string,
  daten: Partial<Pick<ProfilRow, 'anzeigename' | 'bio' | 'diabetesTyp'>>
): Promise<ActionResult> {
  if (isDemoMode()) {
    // Demo-Modus: Update simulieren
    console.log('Demo-Modus: Profil-Update simuliert', daten)
    return { success: true }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { error } = await supabase
  //     .from('profiles')
  //     .update({
  //       ...daten,
  //       aktualisiertAm: new Date().toISOString(),
  //     })
  //     .eq('id', userId)
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Profil beim ersten Login anlegen (nach Signup) ───────────────────────────
export async function erstelleProfil(
  userId: string,
  email: string,
  anzeigename: string,
  diabetesTyp: 'typ1' | 'typ2'
): Promise<ActionResult> {
  if (isDemoMode()) {
    // Demo-Modus: Profil-Erstellung simulieren
    console.log('Demo-Modus: Profil-Erstellung simuliert')
    return { success: true }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { error } = await supabase
  //     .from('profiles')
  //     .insert({
  //       id: userId,
  //       email,
  //       anzeigename,
  //       diabetesTyp,
  //       erstelltAm: new Date().toISOString(),
  //       aktualisiertAm: new Date().toISOString(),
  //       avatarUrl: null,
  //       bio: null,
  //     })
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}
