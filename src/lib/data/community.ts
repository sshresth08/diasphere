// Typen und Mock-Daten für die Community-Funktion

export type KategorieId = 'allgemein' | 'ernaehrung' | 'sport' | 'technik' | 'gefuehle'

export interface KommentarType {
  id: string
  autorName: string
  autorInitial: string  // erster Buchstabe des Namens, für Avatar
  inhalt: string
  zeitstempel: string   // relative Zeitangabe, z.B. "vor 10 Minuten"
  hilfreich: number     // Anzahl Hilfreich-Klicks (Mock)
}

export interface PostType {
  id: string
  autorName: string
  autorInitial: string
  kategorie: KategorieId
  titel: string
  vorschau: string      // Kurztext für den Feed (max ~120 Zeichen)
  inhalt: string        // Volltext für die Detailansicht
  zeitstempel: string
  likes: number
  kommentare: KommentarType[]
  geloest: boolean      // Wurde eine hilfreiche Antwort gefunden?
}

export interface KategorieConfig {
  id: KategorieId
  label: string
  icon: string
  farbe: string
}

// Alle verfügbaren Kategorien mit Icon und Farbcode
export const KATEGORIEN: KategorieConfig[] = [
  { id: 'allgemein',  label: 'Allgemein',  icon: '💬', farbe: 'teal'   },
  { id: 'ernaehrung', label: 'Ernährung',  icon: '🥗', farbe: 'green'  },
  { id: 'sport',      label: 'Sport',      icon: '🏃', farbe: 'blue'   },
  { id: 'technik',    label: 'Technik',    icon: '📱', farbe: 'purple' },
  { id: 'gefuehle',   label: 'Gefühle',    icon: '💙', farbe: 'pink'   },
]

// Mock-Posts: typische Fragen und Erfahrungsberichte junger Typ-1-Diabetiker
export const MOCK_POSTS: PostType[] = [
  {
    id: 'post-1',
    autorName: 'Lena M.',
    autorInitial: 'L',
    kategorie: 'allgemein',
    titel: 'Wie geht ihr mit Unterzucker in der Uni um?',
    vorschau:
      'Ich sitze oft in Vorlesungen und merke, dass mein BZ sinkt. Habt ihr Tipps, wie man das diskret handhabt?',
    inhalt:
      'Ich studiere jetzt im dritten Semester und habe immer wieder das gleiche Problem: Mitten in einer Vorlesung sinkt mein Blutzucker. Natürlich habe ich immer Traubenzucker dabei, aber es ist manchmal unangenehm, wenn man in einem vollen Hörsaal sitzt und auffällig etwas essen muss.\n\nHabt ihr Tipps, wie ihr das diskret handhabt? Ich überlege auch, meinen Dozenten Bescheid zu geben, bin mir aber nicht sicher, ob das nötig ist. Was sind eure Erfahrungen?',
    zeitstempel: 'vor 2 Stunden',
    likes: 14,
    geloest: true,
    kommentare: [
      {
        id: 'k1-1',
        autorName: 'Max K.',
        autorInitial: 'M',
        inhalt:
          'Ich habe meinen Professoren immer kurz Bescheid gegeben — die meisten sind sehr verständnisvoll! Glucose-Gels sind außerdem super unauffällig.',
        zeitstempel: 'vor 1 Stunde',
        hilfreich: 8,
      },
      {
        id: 'k1-2',
        autorName: 'Sara N.',
        autorInitial: 'S',
        inhalt:
          'Ich sitze immer am Rand, damit ich unauffällig etwas essen oder kurz rausgehen kann. Den CGM-Alarm auf Vibration stellen hilft auch sehr!',
        zeitstempel: 'vor 45 Minuten',
        hilfreich: 5,
      },
    ],
  },
  {
    id: 'post-2',
    autorName: 'Tobias H.',
    autorInitial: 'T',
    kategorie: 'technik',
    titel: 'Pumpe vs. Pen — eure Erfahrungen nach dem Wechsel?',
    vorschau:
      'Mein Arzt hat mir zur Pumpe geraten. Ich bin noch unsicher — wie war der Übergang für euch? Was habt ihr dabei gelernt?',
    inhalt:
      'Mein Diabetologe empfiehlt mir schon eine Weile, auf eine Insulinpumpe umzusteigen. Ich bin seit 8 Jahren mit dem Pen unterwegs und irgendwie daran gewöhnt.\n\nWie war der Wechsel für euch? War die Eingewöhnungszeit lang? Und vermisst ihr manchmal den Pen, weil die Pumpe immer dabei sein muss? Ich freue mich über ehrliche Antworten — auch negative Erfahrungen helfen mir weiter!',
    zeitstempel: 'vor 5 Stunden',
    likes: 22,
    geloest: false,
    kommentare: [
      {
        id: 'k2-1',
        autorName: 'Julia W.',
        autorInitial: 'J',
        inhalt:
          'Der Wechsel war für mich der beste Schritt! Die ersten zwei Wochen waren anstrengend, aber danach hat sich mein HbA1c deutlich verbessert. Ich würde nie zurückwechseln.',
        zeitstempel: 'vor 4 Stunden',
        hilfreich: 12,
      },
      {
        id: 'k2-2',
        autorName: 'Felix R.',
        autorInitial: 'F',
        inhalt:
          'Ich bin nach einem Jahr zurück zum Pen gewechselt — die Pumpe war für mich beim Sport hinderlich. Jetzt nutze ich beides je nach Situation.',
        zeitstempel: 'vor 3 Stunden',
        hilfreich: 7,
      },
      {
        id: 'k2-3',
        autorName: 'Anna Z.',
        autorInitial: 'A',
        inhalt:
          'Wichtig: Nimm dir ausreichend Zeit für die Schulung! Ich habe unterschätzt, wie viel es zu lernen gibt. Aber es lohnt sich wirklich.',
        zeitstempel: 'vor 2 Stunden',
        hilfreich: 9,
      },
    ],
  },
  {
    id: 'post-3',
    autorName: 'Kai B.',
    autorInitial: 'K',
    kategorie: 'sport',
    titel: 'Sport mit Typ-1: Wie stabilisiert ihr euren BZ beim Training?',
    vorschau:
      'Ich fange gerade mit Krafttraining an und mein Blutzucker verhält sich sehr unvorhersehbar. Welche Strategien helfen euch?',
    inhalt:
      'Ich bin neu beim Krafttraining und merke, dass mein Blutzucker dabei ganz anders reagiert als beim Ausdauersport. Manchmal steigt er sogar während des Trainings an, obwohl ich dachte, er würde sinken.\n\nWelche Strategien nutzt ihr, um euren Blutzucker beim Sport stabil zu halten? Passt ihr die Basalrate vorher an, oder esst ihr lieber etwas vorher? Und habt ihr Erfahrungen mit Sportarten, die sich besonders gut mit Typ-1 vertragen?',
    zeitstempel: 'vor 1 Tag',
    likes: 31,
    geloest: true,
    kommentare: [
      {
        id: 'k3-1',
        autorName: 'Chris D.',
        autorInitial: 'C',
        inhalt:
          'Krafttraining kann durch Stresshormone den BZ tatsächlich erhöhen! Ich messe immer vorher, während und nachher. Und esse 30 min vor dem Training einen komplexen Kohlenhydrat-Snack.',
        zeitstempel: 'vor 22 Stunden',
        hilfreich: 18,
      },
      {
        id: 'k3-2',
        autorName: 'Mia P.',
        autorInitial: 'M',
        inhalt:
          'Ich reduziere meine Basalrate 2 Stunden vor dem Training um 30 %. Das hat für mich am besten funktioniert. Aber das ist sehr individuell — sprich auf jeden Fall mit deinem Diabetesteam!',
        zeitstempel: 'vor 20 Stunden',
        hilfreich: 15,
      },
    ],
  },
  {
    id: 'post-4',
    autorName: 'Emma S.',
    autorInitial: 'E',
    kategorie: 'allgemein',
    titel: 'Erster Job mit Diabetes — habt ihr euren Chef informiert?',
    vorschau:
      'Ich fange nächsten Monat meinen ersten Job an. Bin unsicher, ob ich meinen Arbeitgeber über meinen Diabetes informieren soll oder nicht.',
    inhalt:
      'Ich fange nächsten Monat meinen ersten richtigen Job an und stehe vor der Frage: Soll ich meinen Arbeitgeber über meinen Typ-1-Diabetes informieren?\n\nEinerseits hätte ich gern Verständnis, wenn ich mal eine Pause brauche oder meine Werte messe. Andererseits möchte ich nicht gleich zu Beginn als "krank" abgestempelt werden. Wie habt ihr das gehandhabt? Hat die Offenheit geholfen oder eher geschadet?',
    zeitstempel: 'vor 2 Tagen',
    likes: 19,
    geloest: false,
    kommentare: [
      {
        id: 'k4-1',
        autorName: 'David L.',
        autorInitial: 'D',
        inhalt:
          'Ich habe es meinem direkten Vorgesetzten gesagt, aber nicht der HR-Abteilung. Das war die beste Entscheidung — er versteht jetzt, warum ich manchmal kurz Pause brauche.',
        zeitstempel: 'vor 1 Tag',
        hilfreich: 11,
      },
      {
        id: 'k4-2',
        autorName: 'Nina V.',
        autorInitial: 'N',
        inhalt:
          'Ich habe erst nach der Probezeit erzählt. Möchte zunächst zeigen, was ich kann, bevor das Thema Diabetes auf dem Tisch liegt. Bisher bereue ich das nicht.',
        zeitstempel: 'vor 18 Stunden',
        hilfreich: 9,
      },
    ],
  },
  {
    id: 'post-5',
    autorName: 'Paul G.',
    autorInitial: 'P',
    kategorie: 'ernaehrung',
    titel: 'Lieblingsrezepte mit wenig Kohlenhydraten?',
    vorschau:
      'Ich suche leckere Rezepte, die meinen Blutzucker nicht so stark beeinflussen. Was sind eure absoluten Favoriten?',
    inhalt:
      'Ich versuche, mich kohlenhydratärmer zu ernähren, damit mein Blutzucker stabiler bleibt. Klassische Pasta oder Brot sind leider echte Herausforderungen für mich.\n\nWelche Gerichte sind bei euch fest im Speiseplan, die geschmacklich toll sind, aber wenig Einfluss auf den BZ haben? Ich bin für jede Idee dankbar — von Snacks bis zu richtigen Mahlzeiten!',
    zeitstempel: 'vor 3 Tagen',
    likes: 27,
    geloest: true,
    kommentare: [
      {
        id: 'k5-1',
        autorName: 'Lisa K.',
        autorInitial: 'L',
        inhalt:
          'Blumenkohlreis als Pasta-Ersatz ist ein Gamechanger! Und Zucchini-Nudeln mit selbstgemachter Bolognese. Klingt komisch, schmeckt aber wirklich gut!',
        zeitstempel: 'vor 2 Tagen',
        hilfreich: 16,
      },
      {
        id: 'k5-2',
        autorName: 'Ben T.',
        autorInitial: 'B',
        inhalt:
          'Rührei mit gebratenem Gemüse morgens ist mein Favorit. Hält lange satt und der BZ bleibt super stabil. Für Snacks empfehle ich Nüsse und Käse.',
        zeitstempel: 'vor 2 Tagen',
        hilfreich: 13,
      },
      {
        id: 'k5-3',
        autorName: 'Hanna F.',
        autorInitial: 'H',
        inhalt:
          'Linsensuppe mit viel Gemüse! Linsen haben zwar Kohlenhydrate, aber durch den hohen Ballaststoffgehalt steigt der BZ nur langsam an.',
        zeitstempel: 'vor 1 Tag',
        hilfreich: 10,
      },
    ],
  },
  {
    id: 'post-6',
    autorName: 'Zoe F.',
    autorInitial: 'Z',
    kategorie: 'gefuehle',
    titel: 'Stress erhöht meinen Blutzucker — ist das normal?',
    vorschau:
      'Vor Prüfungen und in stressigen Phasen schießt mein BZ in die Höhe. Hat das wirklich mit Stress zu tun oder liegt das an etwas anderem?',
    inhalt:
      'Ich habe in letzter Zeit gemerkt, dass mein Blutzucker vor und während Prüfungen stark ansteigt, obwohl ich normal esse. Nach dem Stress normalisiert er sich wieder.\n\nMein Diabetologe hat erklärt, dass Stresshormone wie Cortisol und Adrenalin den BZ tatsächlich erhöhen können. Aber es fühlt sich trotzdem frustrierend an, weil man kaum Kontrolle darüber hat.\n\nWie geht ihr damit um? Habt ihr Strategien gefunden, um in stressigen Phasen einen stabileren BZ zu halten?',
    zeitstempel: 'vor 4 Tagen',
    likes: 38,
    geloest: false,
    kommentare: [
      {
        id: 'k6-1',
        autorName: 'Tim R.',
        autorInitial: 'T',
        inhalt:
          'Ja, das ist absolut normal! Stresshormone sind insulinantagonistisch — sie erhöhen den BZ aktiv. Ich versuche mit Atemübungen gegenzusteuern. Hilft nicht immer, aber manchmal.',
        zeitstempel: 'vor 3 Tagen',
        hilfreich: 20,
      },
      {
        id: 'k6-2',
        autorName: 'Lea H.',
        autorInitial: 'L',
        inhalt:
          'Ich habe gelernt, in Prüfungswochen etwas mehr Korrekturinsulin einzuplanen. Aber das ist sehr individuell — bitte sprich mit deinem Diabetes-Team, bevor du Dosierungen änderst!',
        zeitstempel: 'vor 3 Tagen',
        hilfreich: 14,
      },
    ],
  },
]
