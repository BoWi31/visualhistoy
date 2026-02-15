import { AnalysisStep } from './freiheitfuehrtvolk';

export const INSTRUCTION_HINT = "WICHTIG: BITTE SCHREIBE DEINE ERGEBNISSE UND GEDANKEN IN DEIN HEFT ODER AUF EIN BLATT PAPIER!";

export const AMPEL_FEEDBACK = {
  red: "ROT (Inszenierung): Dieses Bild ist ein Gemälde und kein Foto. Napoleon wollte als Held wirken. Er reitet auf einem prachtvollen Pferd, obwohl er in echt wohl auf einem Maultier ritt. Das Bild zeigt nicht die Wahrheit, sondern eine starke Botschaft. Darum ist Rot möglich, wenn man 'keine echte Wahrheit' meint.",
  yellow: "GELB (Vorsicht - passt am besten) ✅: Das Bild ist eine Mischung. Es zeigt ein echtes Ereignis (die Alpenüberquerung), aber es übertreibt maßlos. Napoleon wird wie ein unbesiegbarer Held dargestellt. Man darf nicht alles glauben, was man sieht. Darum: Gelb.",
  green: "GRÜN (glaubwürdig): Grün passt hier eher nicht. Das Bild zeigt die Idee von Napoleon, aber nicht wie es wirklich war. Es will uns beeinflussen, Napoleon toll zu finden."
};

export const NAPOLEON_STEPS: AnalysisStep[] = [
  {
    number: 1,
    icon: "📐",
    title: "BESCHREIBEN",
    subtitle: "WAS SEHT IHR?",
    description: "Schau genau hin. Wir sammeln nur Dinge, die man wirklich im Bild sehen kann.",
    points: [
      "Welche Person steht im Mittelpunkt? Wie sieht sie aus?",
      "Welche Tiere, Menschen oder Dinge siehst du?",
      "Was ist im Hintergrund zu sehen? (Berge, Himmel, Landschaft)",
      "Welche Farben und Symbole fallen auf?"
    ],
    hints: [
      "Suche nach: Kleidung, Hut, Umhang, Haltung.",
      "Achte auf: Richtung (wohin zeigt/schaut Napoleon?).",
      "Schau auf das Pferd: ruhig oder wild? Warum könnte das so gemalt sein?"
    ],
    sentenceStarters: [
      "Ich sehe ________.",
      "Im Vordergrund sehe ich ________.",
      "Im Hintergrund sehe ich ________.",
      "Auffällig ist ________."
    ]
  },
  {
    number: 2,
    icon: "🔍",
    title: "DEUTEN",
    subtitle: "HYPOTHESEN BILDEN",
    description: "Was könnte das bedeuten? Stelle Vermutungen auf.",
    points: [
      "Wie wirkt Napoleon auf dich? (stark, mutig, ruhig, gefährlich ...)",
      "Was soll das Bild über Napoleon zeigen?",
      "Warum ist das Pferd so dargestellt?",
      "Wofür könnten Berge und Sturm stehen?"
    ],
    hints: [
      "Guck: Napoleon zeigt mit der Hand nach vorne – was macht das mit der Wirkung?",
      "Starker Wind/Bewegung = Spannung.",
      "Hoch oben in den Bergen = gefährlich, mutig."
    ],
    sentenceStarters: [
      "Ich vermute: Das Bild will zeigen, dass ________.",
      "Das denke ich, weil ich sehe ________.",
      "Vielleicht bedeutet ________ , dass ________."
    ]
  },
  {
    number: 3,
    icon: "⏳",
    title: "KONTEXT",
    subtitle: "NAPOLEON UND SEINE MACHT",
    description: "Lies den Text aufmerksam durch. Er hilft dir, das Bild besser zu verstehen.",
    contextText: "Napoleon war ein wichtiger Politiker und Feldherr in Frankreich. Im Jahr 1800 führte er eine Armee über die Alpen, um einen Krieg in Italien zu gewinnen. Der Maler Jacques-Louis David malte dieses Bild 1801. Das Bild ist kein Foto, sondern ein [[Gemälde|Ein von einem Künstler gemaltes Bild, das oft eine bestimmte Meinung oder Botschaft zeigt.]]. Es soll Napoleon wie einen mutigen und starken Anführer zeigen. Darum wirkt die Szene besonders dramatisch: Wind, Berge und das aufbäumende Pferd. Viele Historiker sagen: In Wirklichkeit war die Überquerung wahrscheinlich weniger heldenhaft. Napoleon ritt wohl auf einem [[Maultier|Ein Lasttier, das sicher über Steine klettern kann, aber nicht so edel aussieht wie ein weißes Pferd.]]. Das Bild zeigt also vor allem eine Botschaft: Napoleon soll groß und bewundernswert wirken.",
    points: [
      "Wer war Napoleon?",
      "Warum ging er über die Alpen?",
      "Warum malte David dieses Bild?"
    ],
    hints: [
      "Merke: Gemälde = bewusst gestaltet.",
      "Kontext hilft: Worum geht es? Warum wird es gemalt?",
      "Das Bild ist ein Denkmal für Napoleons Macht."
    ],
    sentenceStarters: [
      "Im Kontext steht, dass ________.",
      "Ich habe gelernt, dass ________.",
      "Das erklärt, warum ________."
    ]
  },
  {
    number: 4,
    icon: "💡",
    title: "ÜBERPRÜFEN",
    subtitle: "HYPOTHESEN KLÄREN",
    description: "Prüfe jetzt deine Vermutungen aus Schritt 2 mit deinem Wissen aus Schritt 3.",
    points: [
      "Welche Vermutung passt gut zum Kontext? Welche nicht?",
      "Ist das Bild eher ein 'Heldenbild'? Warum?",
      "Was könnte im Bild übertrieben sein?"
    ],
    hints: [
      "Vergleiche: Botschaft vs Wirklichkeit.",
      "Frage: Was soll ich fühlen? Bewunderung? Mut?",
      "Das Pferd ist ein Symbol für die Beherrschung von wilder Kraft."
    ],
    sentenceStarters: [
      "Meine Vermutung war ________. Das passt (nicht), weil ________.",
      "Ich ändere meine Meinung: ________.",
      "Jetzt denke ich: ________."
    ]
  },
  {
    number: 5,
    icon: "🚦",
    title: "QUELLENKRITIK",
    subtitle: "GLAUBWÜRDIGKEIT",
    description: "Ist das Bild ein 'echtes Bild' der Ereignisse oder eine Inszenierung?",
    points: [
      "Welche Dinge wirken real, welche wirken gemacht?",
      "Will das Bild eher informieren oder beeindrucken?",
      "Darf man alles glauben, was man sieht? Warum?"
    ],
    hints: [
      "Achte auf: Pose, Blick, Licht, Bewegung.",
      "Frage: Warum wirkt Napoleon so perfekt?",
      "Denke an: Ein Gemälde kann die Realität schöner machen."
    ],
    sentenceStarters: [
      "Ich finde das Bild ist (eher echt / eher gemacht), weil ________.",
      "Als Quelle taugt das Bild für ________, aber nicht für ________.",
      "Ich bin vorsichtig, weil ________."
    ]
  }
];
