// Zentrale Datenbank-Typen — Vorbereitung für das Supabase-Schema
// Diese Interfaces spiegeln die späteren Datenbanktabellen wider.

// ─── Ergebnis-Wrapper für alle Server Actions ─────────────────────────────────
export interface ActionResult<T = void> {
  success: boolean
  data?: T
  fehler?: string
}

// ─── Datenbankzeile: Benutzerprofil ──────────────────────────────────────────
// Entspricht der späteren `profiles`-Tabelle in Supabase
export interface ProfilRow {
  id: string              // UUID, entspricht auth.users.id
  email: string
  anzeigename: string
  diabetesTyp: 'typ1' | 'typ2'
  erstelltAm: string      // ISO-Timestamp
  aktualisiertAm: string
  avatarUrl: string | null
  bio: string | null
}

// ─── Datenbankzeile: Community-Post ──────────────────────────────────────────
// Entspricht der späteren `posts`-Tabelle in Supabase
export interface PostRow {
  id: string
  autorId: string         // FK → ProfilRow.id
  autorName: string
  kategorie: string
  titel: string
  inhalt: string
  likes: number
  geloest: boolean
  erstelltAm: string
}

// ─── Datenbankzeile: Kommentar ────────────────────────────────────────────────
// Entspricht der späteren `kommentare`-Tabelle in Supabase
export interface KommentarRow {
  id: string
  postId: string          // FK → PostRow.id
  autorId: string
  autorName: string
  inhalt: string
  hilfreich: number
  erstelltAm: string
}

// ─── Datenbankzeile: Gespeichertes Rezept ────────────────────────────────────
// Entspricht der späteren `gespeicherte_rezepte`-Tabelle in Supabase
export interface GespeichertesRezeptRow {
  id: string
  nutzerId: string        // FK → ProfilRow.id
  rezeptId: string        // Referenz auf lokale Rezept-Daten (REZEPTE[].id als String)
  gespeichertAm: string
}
