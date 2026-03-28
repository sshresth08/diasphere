export interface Artikel {
  id: number
  titel: string
  text: string
  lesezeit: string
}

export const ARTIKEL: Artikel[] = [
  {
    id: 1,
    titel: 'Was ist Typ-1 Diabetes?',
    lesezeit: '2 min',
    text: 'Typ-1 Diabetes ist eine Autoimmunerkrankung, bei der das Immunsystem die insulinproduzierenden Betazellen in der Bauchspeicheldrüse zerstört. Betroffene sind lebenslang auf externe Insulingabe angewiesen. Die Erkrankung beginnt meist im Kindes- oder Jugendalter, kann aber auch im Erwachsenenalter auftreten.',
  },
  {
    id: 2,
    titel: 'Übergang zur Erwachsenenmedizin',
    lesezeit: '3 min',
    text: 'Der Wechsel vom Kinderarzt zum Erwachsenenmediziner stellt für viele junge Diabetiker eine große Herausforderung dar. Neue Ärzte, neue Routinen — und plötzlich mehr Eigenverantwortung. DiaSphere unterstützt dich dabei, diesen Übergang selbstbewusst zu gestalten.',
  },
  {
    id: 3,
    titel: 'Blutzucker verstehen',
    lesezeit: '2 min',
    text: 'Ein Nüchternblutzucker zwischen 70–100 mg/dl gilt als normal. Bei Typ-1 Diabetes kann der Wert je nach Ernährung, Bewegung, Stress und Insulin stark schwanken. Regelmäßige Messungen und ein gutes Körpergefühl sind entscheidend.',
  },
]
