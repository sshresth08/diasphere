'use server'

import type { ActionResult, GespeichertesRezeptRow } from '@/src/lib/types/database'
import { REZEPTE } from '@/src/lib/data/rezepte'
// import { createClient } from '@/lib/supabase/server'
// TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen

// ─── Demo-Modus-Guard ─────────────────────────────────────────────────────────
// Gibt true zurück, solange keine echten Supabase-Credentials konfiguriert sind
const isDemoMode = (): boolean =>
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url'

// ─── Gespeicherte Rezepte eines Nutzers abrufen ───────────────────────────────
export async function getGespeicherteRezepte(
  nutzerId: string
): Promise<ActionResult<GespeichertesRezeptRow[]>> {
  if (isDemoMode()) {
    // Demo-Modus: erste 2 Rezepte aus REZEPTE als Mock zurückgeben
    const mockDaten: GespeichertesRezeptRow[] = REZEPTE.slice(0, 2).map((rezept, index) => ({
      id: `demo-gespeichert-${index + 1}`,
      nutzerId,
      rezeptId: rezept.id.toString(),
      gespeichertAm: new Date().toISOString(),
    }))
    return { success: true, data: mockDaten }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { data, error } = await supabase
  //     .from('gespeicherte_rezepte')
  //     .select('*')
  //     .eq('nutzerId', nutzerId)
  //     .order('gespeichertAm', { ascending: false })
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true, data: data as GespeichertesRezeptRow[] }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Rezept speichern ─────────────────────────────────────────────────────────
export async function speichereRezept(
  nutzerId: string,
  rezeptId: string
): Promise<ActionResult> {
  if (isDemoMode()) {
    // Demo-Modus: Speichervorgang simulieren
    console.log('Demo-Modus: Rezept gespeichert', { rezeptId })
    return { success: true }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { error } = await supabase
  //     .from('gespeicherte_rezepte')
  //     .insert({
  //       nutzerId,
  //       rezeptId,
  //       gespeichertAm: new Date().toISOString(),
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

// ─── Gespeichertes Rezept entfernen ───────────────────────────────────────────
export async function entferneGespeichertesRezept(
  nutzerId: string,
  rezeptId: string
): Promise<ActionResult> {
  if (isDemoMode()) {
    // Demo-Modus: Entfernen simulieren
    console.log('Demo-Modus: Rezept entfernt', { rezeptId })
    return { success: true }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { error } = await supabase
  //     .from('gespeicherte_rezepte')
  //     .delete()
  //     .eq('nutzerId', nutzerId)
  //     .eq('rezeptId', rezeptId)
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}
