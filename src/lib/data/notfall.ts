// Notfall-Situationen und Kontakte für den DiaSphere Notfall-Screen

export interface NotfallSituation {
  id: string
  titel: string
  icon: string
  farbe: 'rot' | 'gelb'
  symptome: string[]
  massnahmen: string[]
}

export interface NotfallKontakt {
  label: string
  nummer: string
  beschreibung: string
  icon: string
}

// ─── Notfall-Situationen ────────────────────────────────────────────────────

export const NOTFALL_SITUATIONEN: NotfallSituation[] = [
  {
    id: 'hypoglykaemie',
    titel: 'Hypoglykämie (Unterzuckerung)',
    icon: '📉',
    farbe: 'rot',
    symptome: [
      'Zittern und Schwitzen',
      'Verwirrtheit und Konzentrationsschwäche',
      'Herzrasen',
      'Blasse Haut',
      'Hunger, Schwindel oder Kopfschmerzen',
    ],
    massnahmen: [
      'Sofort 15–20 g schnelle Kohlenhydrate zu sich nehmen (z. B. 4 Traubenzucker-Täfelchen oder 200 ml Fruchtsaft)',
      'Nach 15 Minuten Blutzucker erneut messen — Zielwert: über 80 mg/dl',
      'Bei Bewusstlosigkeit oder keiner Besserung sofort Notruf 112 wählen',
      'Nach der Erholung langsame Kohlenhydrate essen (z. B. eine Scheibe Brot), um erneuten Abfall zu verhindern',
    ],
  },
  {
    id: 'hyperglykaemie',
    titel: 'Hyperglykämie (Überzuckerung)',
    icon: '📈',
    farbe: 'gelb',
    symptome: [
      'Starker Durst und trockener Mund',
      'Häufiges Wasserlassen',
      'Müdigkeit und Abgeschlagenheit',
      'Verschwommenes Sehen',
      'Übelkeit oder Bauchschmerzen',
    ],
    massnahmen: [
      'Viel Wasser trinken (mindestens 1,5–2 Liter) — keine Säfte oder zuckerhaltige Getränke',
      'Diabetesteam oder Hausarzt kontaktieren und Blutzuckerwert mitteilen',
      'Insulin NICHT auf eigene Faust erhöhen — nur nach ärztlicher Anweisung',
      'Bei Übelkeit, Erbrechen oder Blutzucker über 250 mg/dl sofort Notruf 112 wählen',
    ],
  },
]

// ─── Notfall-Kontakte ───────────────────────────────────────────────────────

export const NOTFALL_KONTAKTE: NotfallKontakt[] = [
  {
    label: 'Notruf',
    nummer: '112',
    beschreibung: 'Allgemeiner Notruf – Lebensbedrohliche Situationen',
    icon: '🚨',
  },
  {
    label: 'Giftnotruf',
    nummer: '0228 19240',
    beschreibung: 'Bei Medikamenten-Überdosierung oder Vergiftung',
    icon: '☠️',
  },
  {
    label: 'Diabetes-Hotline',
    nummer: '0800 383 7667',
    beschreibung: 'Kostenlose Beratung (Mo–Fr 8–17 Uhr)',
    icon: '📞',
  },
]
