
export const INSTRUCTION_HINT = "WICHTIG: BITTE SCHREIBE DEINE ERGEBNISSE UND GEDANKEN IN DEIN HEFT ODER AUF EIN BLATT PAPIER!";

export const AMPEL_FEEDBACK = {
  red: "ROT (sehr unsicher): Rot wäre passend, wenn jemand sagt: „So war es genau in echt.“ Das kann das Bild nicht beweisen, weil es kein Foto ist. Als Botschaftsbild ist es trotzdem gut – darum eher Gelb als Rot.",
  yellow: "GELB (passt am besten) ✅: Dieses Bild ist ein Gemälde. Es wurde so gemalt, dass es stark wirkt. Die Frau steht für „Freiheit“ (Symbol) und führt die Menschen. Das Bild ist gut für die Botschaft: Freiheit, Kampf, Zusammenhalt. Für genaue Details ist es unsicher. Darum: Gelb.",
  green: "GRÜN (eher sicher): Bei diesem Bild passt Grün nur, wenn du sagst: „Das Bild zeigt die Idee gut.“ Als Beweis für genaue Fakten (genauer Ort, echte Personen, genau so passiert) passt Grün hier eher nicht."
};

export interface AnalysisStep {
  number: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  hints: string[];
  sentenceStarters: string[];
  contextText?: string;
}

export const STEPS: AnalysisStep[] = [
  {
    number: 1,
    icon: "📐",
    title: "BESCHREIBEN",
    subtitle: "WAS SEHT IHR?",
    description: "Schau genau hin. Wir suchen zuerst nur Dinge, die man im Bild wirklich mit den Augen finden kann.",
    points: [
      "Welche Personen siehst du? (Alter, Kleidung, Waffen)",
      "Was liegt ganz vorne auf dem Boden?",
      "Welches Gebäude erkennt man hinten rechts im Rauch?",
      "Welche Farben hat die Flagge?"
    ],
    hints: [
      "Achte auf die am Boden liegenden Körper.",
      "Die Türme im Hintergrund gehören zur Kathedrale Notre-Dame.",
      "Es sind Menschen aus verschiedenen sozialen Schichten zu sehen."
    ],
    sentenceStarters: [
      "Im Vordergrund des Bildes erkennt man...",
      "In der Mitte steht eine Frau, die...",
      "Ganz rechts sieht man einen Jungen, der...",
      "Im Hintergrund kann man..."
    ]
  },
  {
    number: 2,
    icon: "🔍",
    title: "DEUTEN",
    subtitle: "HYPOTHESEN BILDEN",
    description: "Überlege nun: Was könnten diese Dinge bedeuten? Stelle Vermutungen auf.",
    points: [
      "Warum kämpfen hier so viele verschiedene Menschen zusammen?",
      "Wer könnte die Frau in der Mitte sein? Ist sie eine echte Kämpferin?",
      "Welches Ziel haben die Personen wohl?",
      "Warum hat der Maler das Bild so dramatisch gemalt?"
    ],
    hints: [
      "Der Mann mit dem Zylinder sieht eher wohlhabend aus.",
      "Die Frau trägt keine Schuhe – ist das normal für eine Schlacht?",
      "Die Bewegung der Gruppe geht nach vorne auf den Betrachter zu."
    ],
    sentenceStarters: [
      "Ich vermute, dass der Mann mit dem Zylinder...",
      "Die Frau in der Mitte könnte ein Symbol für... sein.",
      "Der Maler wollte wahrscheinlich zeigen, dass...",
      "Dass alle gemeinsam kämpfen, deutet darauf hin, dass..."
    ]
  },
  {
    number: 3,
    icon: "⏳",
    title: "KONTEXT",
    subtitle: "DIE JULIREVOLUTION 1830",
    description: "Lies den Text aufmerksam durch. Er hilft dir, das Bild richtig zu verstehen.",
    contextText: "Im Juli 1830 kam es in Paris zu einem gewaltigen Umbruch, der heute als [[Julirevolution|Ein schneller, oft gewaltsamer Umsturz der bestehenden Regierung durch das Volk.]] bekannt ist. Der damalige König Karl X. wollte die Zeit der strengen [[Monarchie|Eine Staatsform, in der ein König oder eine Königin die Macht hat, oft ohne das Volk zu fragen.]] zurückbringen. Er schaffte die [[Pressefreiheit|Das Recht, in Zeitungen die eigene Meinung zu schreiben, ohne dass der Staat es vorher verbietet.]] ab und änderte das [[Wahlrecht|Das Recht der Bürger, mitzubestimmen, wer im Staat das Sagen hat.]] so, dass fast nur noch reiche Adelige wählen durften. Das Volk ließ sich das nicht gefallen: Arbeiter, Studenten und einfache Bürger gingen gemeinsam auf die Straßen. In drei heißen Sommertagen, den 'Glorreichen Drei', bauten sie riesige [[Barrikaden|Sperren aus Wagen, Pflastersteinen und Möbeln, um die Soldaten des Königs aufzuhalten.]] und kämpften für ihre Freiheit. Am Ende musste der König flüchten. Der Sieg der Bürger war ein Signal für ganz Europa, dass die Zeit der uneingeschränkten Herrscher vorbei war. Der Maler Delacroix schuf dieses Werk, um den Mut und die Einigkeit des Volkes zu ehren, wobei er die [[Trikolore|Die blau-weiß-rote Flagge Frankreichs, die für Freiheit, Gleichheit und Brüderlichkeit steht.]] als Symbol des Sieges in den Mittelpunkt stellte.",
    points: [
      "Welche Rechte wollte der König den Menschen wegnehmen?",
      "Warum nennt man die Revolution auch die 'Glorreichen Drei'?",
      "Was passierte am Ende mit König Karl X.?",
      "Für welche Werte steht die Flagge im Bild?"
    ],
    hints: [
      "Der König handelte gegen den Willen fast aller Bürger.",
      "Die Revolution dauerte genau drei Tage (27. bis 29. Juli).",
      "Das Bild zeigt den Moment des größten Triumphs auf den Trümmern einer Barrikade."
    ],
    sentenceStarters: [
      "Aus dem Text geht hervor, dass der König...",
      "Die Julirevolution war erfolgreich, weil...",
      "Der Maler Delacroix wollte mit der Flagge zeigen, dass...",
      "Die Menschen kämpften vor allem gegen..."
    ]
  },
  {
    number: 4,
    icon: "💡",
    title: "ÜBERPRÜFEN",
    subtitle: "HYPOTHESEN KLÄREN",
    description: "Prüfe nun deine Vermutungen aus Schritt 2 mit deinem neuen Wissen aus Schritt 3.",
    points: [
      "Hattest du recht mit der Frau? Sie ist die 'Marianne', ein [[Sinnbild|Ein Gegenstand oder eine Person, die für eine abstrakte Idee steht (wie ein Herz für die Liebe).]]. Wofür steht sie?",
      "Warum führt sie Menschen aus allen Schichten (Bürger, Arbeiter, Junge) an?",
      "Was bedeutet die rote [[phrygische Mütze|Eine Mütze, die früher befreite Sklaven trugen. Sie ist ein Symbol für Freiheit.]] auf ihrem Kopf?"
    ],
    hints: [
      "Die Frau ist eine 'Allegorie' (Sinnbild) der Freiheit.",
      "Die Einheit des Volkes war dem Maler besonders wichtig.",
      "Die Trikolore-Flagge steht für Freiheit, Gleichheit und Brüderlichkeit."
    ],
    sentenceStarters: [
      "Meine Vermutung zur Frau war richtig/falsch, denn...",
      "Die Frau steht im Bild für...",
      "Die verschiedenen Kleider der Kämpfer zeigen uns heute..."
    ]
  },
  {
    number: 5,
    icon: "🚦",
    title: "QUELLENKRITIK",
    subtitle: "GLAUBWÜRDIGKEIT",
    description: "Ist das Bild ein echtes 'Foto' der Ereignisse oder eine Inszenierung?",
    points: [
      "Welche Details im Bild wirken echt, welche erfunden?",
      "Wollte der Maler die Wahrheit zeigen oder die Revolution feiern?",
      "Darf man alles glauben, was man auf diesem Bild sieht?"
    ],
    hints: [
      "Denke daran: Die Frau in der Mitte gab es so nicht wirklich.",
      "Der Maler hat die Szene sehr heroisch (heldenhaft) gestaltet.",
      "Die Leichen im Vordergrund wirken sehr realistisch."
    ],
    sentenceStarters: [
      "Ich halte das Bild für eher glaubwürdig / unglaubwürdig, weil...",
      "Das Bild ist keine genaue Abbildung der Realität, sondern...",
      "Als historische Quelle verrät uns das Bild vor allem etwas über..."
    ]
  }
];
