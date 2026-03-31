'use server'

import { createClient } from '@/lib/supabase/server'
import type { ActionResult, ProfilRow } from '@/src/lib/types/database'

// ─── Hilfsfunktion: DB-Zeile → ProfilRow (snake_case → camelCase) ─────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapZeileZuProfil(zeile: any, email = ''): ProfilRow {
  return {
    id: zeile.id,
    email,
    anzeigename: zeile.anzeigename ?? '',
    diabetesTyp: zeile.diabetes_typ as 'typ1' | 'typ2',
    erstelltAm: zeile.created_at ?? zeile.erstellt_am ?? new Date().toISOString(),
    aktualisiertAm: zeile.updated_at ?? zeile.aktualisiert_am ?? new Date().toISOString(),
    avatarUrl: zeile.avatar_url ?? null,
    bio: zeile.bio ?? null,
  }
}

// ─── Profil eines Nutzers abrufen ─────────────────────────────────────────────
export async function getProfil(userId: string): Promise<ActionResult<ProfilRow>> {
  try {
    const supabase = await createClient()

    // Eingeloggten Nutzer holen (für die E-Mail-Adresse)
    const { data: { user } } = await supabase.auth.getUser()

    // Profil aus dem app-Schema abrufen
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .schema('app')
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) return { success: false, fehler: error.message }
    return { success: true, data: mapZeileZuProfil(data, user?.email ?? '') }
  } catch (err) {
    console.error('Supabase-Fehler (getProfil):', err)
    return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  }
}

// ─── Profil aktualisieren ─────────────────────────────────────────────────────
export async function updateProfil(
  userId: string,
  daten: Partial<Pick<ProfilRow, 'anzeigename' | 'bio' | 'diabetesTyp'>>
): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // camelCase → snake_case für die DB
    const dbDaten: Record<string, unknown> = {}
    if (daten.anzeigename !== undefined) dbDaten.anzeigename = daten.anzeigename
    if (daten.diabetesTyp !== undefined) dbDaten.diabetes_typ = daten.diabetesTyp
    if (daten.bio !== undefined) dbDaten.bio = daten.bio

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .schema('app')
      .from('profiles')
      .update(dbDaten)
      .eq('id', userId)

    if (error) return { success: false, fehler: error.message }
    return { success: true }
  } catch (err) {
    console.error('Supabase-Fehler (updateProfil):', err)
    return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  }
}

// ─── Profil anlegen — wird normalerweise vom Trigger app.handle_new_user() ──────
// übernommen; diese Funktion ist nur als Fallback vorhanden.
export async function erstelleProfil(
  userId: string,
  email: string,
  anzeigename: string,
  diabetesTyp: 'typ1' | 'typ2'
): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .schema('app')
      .from('profiles')
      .insert({
        id: userId,
        anzeigename,
        diabetes_typ: diabetesTyp,
        // email nicht einfügen — kommt aus auth.users via Trigger
      })

    if (error) return { success: false, fehler: error.message }
    return { success: true }
  } catch (err) {
    console.error('Supabase-Fehler (erstelleProfil):', err)
    return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  }

  // Hinweis: E-Mail wird hier bewusst nicht in app.profiles gespeichert —
  // sie liegt in auth.users und wird per getUser() abgerufen.
  void email
}
