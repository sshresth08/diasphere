export interface Rezept {
  id: number
  titel: string
  emoji: string
  kh: number
  kcal: number
  zeit: string
  beschreibung: string
  zutaten: string[]
  schritte: string[]
}

export const REZEPTE: Rezept[] = [
  {
    id: 1,
    titel: 'Overnight Oats',
    emoji: '🥣',
    kh: 42,
    kcal: 310,
    zeit: '5 min',
    beschreibung:
      'Proteinreich und perfekt für einen stabilen Blutzucker am Morgen.',
    zutaten: [
      '80g Haferflocken',
      '200ml Milch',
      '1 EL Chiasamen',
      '150g Beeren',
      '1 TL Zimt',
    ],
    schritte: [
      'Haferflocken mit Milch und Chiasamen in ein Glas schichten.',
      'Über Nacht im Kühlschrank ruhen lassen.',
      'Am nächsten Morgen mit Beeren und Zimt toppen.',
    ],
  },
  {
    id: 2,
    titel: 'Lachs mit Quinoa',
    emoji: '🐟',
    kh: 38,
    kcal: 520,
    zeit: '25 min',
    beschreibung:
      'Gesunde Fette und Protein für einen gleichmäßigen Blutzuckerverlauf.',
    zutaten: [
      '200g Lachsfilet',
      '100g Quinoa',
      '1 Zucchini',
      '2 EL Olivenöl',
      'Zitronensaft',
    ],
    schritte: [
      'Quinoa nach Packungsanweisung kochen.',
      'Lachs in Olivenöl 4 Min pro Seite braten.',
      'Zucchini in Scheiben schneiden und dazu braten.',
      'Mit Zitronensaft abschmecken und servieren.',
    ],
  },
  {
    id: 3,
    titel: 'Linsensuppe',
    emoji: '🍲',
    kh: 35,
    kcal: 290,
    zeit: '30 min',
    beschreibung:
      'Linsen haben einen niedrigen glykämischen Index — ideal für Diabetiker.',
    zutaten: [
      '200g rote Linsen',
      '1 Zwiebel',
      '2 Karotten',
      '1 Dose Tomaten',
      'Gewürze',
    ],
    schritte: [
      'Zwiebel und Karotten würfeln und anbraten.',
      'Linsen und Tomaten dazugeben.',
      'Mit 600ml Wasser auffüllen und 20 Min kochen.',
      'Mit Kreuzkümmel und Kurkuma würzen und servieren.',
    ],
  },
]
