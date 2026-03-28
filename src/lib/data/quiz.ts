export interface QuizFrage {
  id: number
  frage: string
  antworten: string[]
  richtig: number
  erklaerung: string
}

export const QUIZ_FRAGEN: QuizFrage[] = [
  {
    id: 1,
    frage: 'Was bedeutet Hypoglykämie?',
    antworten: [
      'Zu hoher Blutzucker',
      'Zu niedriger Blutzucker',
      'Normaler Blutzucker',
      'Kein Insulin im Blut',
    ],
    richtig: 1,
    erklaerung:
      'Hypoglykämie bedeutet einen Blutzuckerwert unter 70 mg/dl. Symptome sind Zittern, Schweißausbrüche und Verwirrtheit.',
  },
  {
    id: 2,
    frage: 'Was ist der Unterschied zwischen Typ-1 und Typ-2 Diabetes?',
    antworten: [
      'Nur die Ernährung',
      'Typ-1 ist autoimmun, Typ-2 oft metabolisch',
      'Typ-2 braucht immer Insulin',
      'Kein Unterschied',
    ],
    richtig: 1,
    erklaerung:
      'Typ-1 ist eine Autoimmunerkrankung. Typ-2 entsteht oft durch Insulinresistenz und Lebensstilfaktoren.',
  },
  {
    id: 3,
    frage: 'Was ist ein Kohlenhydrat-Faktor (KF)?',
    antworten: [
      'Anzahl der täglichen Mahlzeiten',
      'Ein Maß für sportliche Aktivität',
      'Insulin pro Kohlenhydratmenge',
      'Der Blutzuckerspiegel nach dem Essen',
    ],
    richtig: 2,
    erklaerung:
      'Der KF gibt an, wie viele Einheiten Insulin du für eine bestimmte Menge Kohlenhydrate benötigst.',
  },
]
