export interface Lebensmittel {
  name: string
  roh: number | null
  gekocht: number | null
  custom?: boolean
}

export const LEBENSMITTEL: Lebensmittel[] = [
  { name: 'Nudeln (Hartweizen)', roh: 71, gekocht: 30 },
  { name: 'Reis (Weiß)', roh: 78, gekocht: 29 },
  { name: 'Kartoffeln', roh: 17, gekocht: 16 },
  { name: 'Mischbrot', roh: 46, gekocht: null },
  { name: 'Apfel / Obst', roh: 14, gekocht: null },
  { name: 'Eigener Wert', roh: null, gekocht: null, custom: true },
]
