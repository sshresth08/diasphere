'use server'

import type { ActionResult, PostRow } from '@/src/lib/types/database'
import { MOCK_POSTS } from '@/src/lib/data/community'
// import { createClient } from '@/lib/supabase/server'
// TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen

// ─── Demo-Modus-Guard ─────────────────────────────────────────────────────────
// Gibt true zurück, solange keine echten Supabase-Credentials konfiguriert sind
const isDemoMode = (): boolean =>
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url'

// ─── Hilfsfunktion: PostType → PostRow mappen ─────────────────────────────────
// Fehlende DB-Felder werden mit sinnvollen Demo-Defaults aufgefüllt
function mapPostRow(post: (typeof MOCK_POSTS)[number]): PostRow {
  return {
    id: post.id,
    autorId: 'demo-user',
    autorName: post.autorName,
    kategorie: post.kategorie,
    titel: post.titel,
    inhalt: post.inhalt,
    likes: post.likes,
    geloest: post.geloest,
    erstelltAm: new Date().toISOString(),
  }
}

// ─── Alle Posts abrufen (optional nach Kategorie gefiltert) ───────────────────
export async function getPosts(kategorie?: string): Promise<ActionResult<PostRow[]>> {
  if (isDemoMode()) {
    // Demo-Modus: MOCK_POSTS filtern und als PostRow[] zurückgeben
    const gefiltert = kategorie
      ? MOCK_POSTS.filter((p) => p.kategorie === kategorie)
      : MOCK_POSTS
    return { success: true, data: gefiltert.map(mapPostRow) }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   let query = supabase.from('posts').select('*').order('erstelltAm', { ascending: false })
  //   if (kategorie) query = query.eq('kategorie', kategorie)
  //   const { data, error } = await query
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true, data: data as PostRow[] }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Einzelnen Post abrufen ───────────────────────────────────────────────────
export async function getPost(id: string): Promise<ActionResult<PostRow>> {
  if (isDemoMode()) {
    // Demo-Modus: Post aus MOCK_POSTS suchen und mappen
    const gefunden = MOCK_POSTS.find((p) => p.id === id)
    if (!gefunden) return { success: false, fehler: 'Beitrag nicht gefunden' }
    return { success: true, data: mapPostRow(gefunden) }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { data, error } = await supabase
  //     .from('posts')
  //     .select('*')
  //     .eq('id', id)
  //     .single()
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true, data: data as PostRow }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Neuen Post erstellen ─────────────────────────────────────────────────────
export async function erstellePost(
  autorId: string,
  autorName: string,
  kategorie: string,
  titel: string,
  inhalt: string
): Promise<ActionResult<{ id: string }>> {
  if (isDemoMode()) {
    // Demo-Modus: Post-Erstellung simulieren
    console.log('Demo-Modus: Post-Erstellung simuliert', { titel })
    return { success: true, data: { id: 'demo-post-' + Date.now() } }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { data, error } = await supabase
  //     .from('posts')
  //     .insert({ autorId, autorName, kategorie, titel, inhalt, likes: 0, geloest: false, erstelltAm: new Date().toISOString() })
  //     .select('id')
  //     .single()
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true, data: { id: data.id as string } }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Kommentar zu Post hinzufügen ─────────────────────────────────────────────
export async function erstelleKommentar(
  postId: string,
  autorId: string,
  autorName: string,
  inhalt: string
): Promise<ActionResult> {
  if (isDemoMode()) {
    // Demo-Modus: Kommentar simulieren
    console.log('Demo-Modus: Kommentar simuliert', { postId, inhalt })
    return { success: true }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   const { error } = await supabase
  //     .from('kommentare')
  //     .insert({ postId, autorId, autorName, inhalt, hilfreich: 0, erstelltAm: new Date().toISOString() })
  //
  //   if (error) return { success: false, fehler: error.message }
  //   return { success: true }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

// ─── Post liken (Toggle) ──────────────────────────────────────────────────────
export async function toggleLike(
  postId: string,
  nutzerId: string
): Promise<ActionResult<{ likes: number }>> {
  if (isDemoMode()) {
    // Demo-Modus: zufällige Like-Zahl zurückgeben
    return { success: true, data: { likes: Math.floor(Math.random() * 50) + 1 } }
  }

  // TODO: Supabase aktivieren — Placeholder-Vars in .env.local ersetzen
  // try {
  //   const supabase = await createClient()
  //   // Prüfen ob Like bereits existiert
  //   const { data: vorhandenerLike } = await supabase
  //     .from('likes')
  //     .select('id')
  //     .eq('postId', postId)
  //     .eq('nutzerId', nutzerId)
  //     .single()
  //
  //   if (vorhandenerLike) {
  //     // Like entfernen
  //     await supabase.from('likes').delete().eq('postId', postId).eq('nutzerId', nutzerId)
  //   } else {
  //     // Like hinzufügen
  //     await supabase.from('likes').insert({ postId, nutzerId })
  //   }
  //
  //   // Aktuelle Like-Zahl abfragen
  //   const { count } = await supabase
  //     .from('likes')
  //     .select('*', { count: 'exact', head: true })
  //     .eq('postId', postId)
  //
  //   return { success: true, data: { likes: count ?? 0 } }
  // } catch (fehler) {
  //   console.error('Supabase-Fehler:', fehler)
  //   return { success: false, fehler: 'Ein Fehler ist aufgetreten.' }
  // }

  return { success: false, fehler: 'Supabase nicht konfiguriert.' }
}

