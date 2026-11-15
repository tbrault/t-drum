import * as Tone from "tone";

/**
 * Accompagnement joué par l'app pour travailler un morceau en musique : de
 * vrais instruments enregistrés (piano, contrebasse, trompette, guitares…),
 * sans batterie, à un tempo réglable en direct.
 *
 * Chaque binaire ou solo a son propre morceau, composé d'après sa partition :
 * - sa structure, lue sur la page puis corrigeable à la main, une lettre par
 *   mesure (G : groove, % : mesure répétée, F : break du batteur) ;
 * - une « graine » (son nom) qui fixe la tonalité, la grille d'accords et les
 *   motifs de chaque instrument parmi ceux du style. Deux morceaux différents
 *   n'ont donc pas la même musique, et un même morceau sonne toujours pareil.
 *
 * Une mesure est découpée en doubles croches (16 pas en 4/4, 12 en 3/4) ;
 * chaque instrument joue à des pas donnés. Sur une mesure répétée (%), la
 * musique se répète aussi ; sur un break, le groupe tient l'accord et laisse
 * la place à la batterie. Un break d'ouverture se joue seul, juste après le
 * décompte. Un morceau de longueur fixée finit sur un accord.
 *
 * Échantillons : enregistrements libres, voir public/sons/CREDITS.md.
 */

export type StyleAccompagnement =
  | "rock"
  | "pop"
  | "funk"
  | "shuffle"
  | "jazz"
  | "valse";

/** Type d'une mesure dans la structure d'un morceau. */
export type TypeMesure = "G" | "%" | "F";

type Instrument =
  | "piano"
  | "rhodes"
  | "contrebasse"
  | "basse"
  | "trompette"
  | "guitareSaturee"
  | "guitareClaire";

type Piste = "basse" | "accords" | "complement" | "melodie";

interface Evenement {
  pas: number;
  notes: string[];
  duree: Tone.Unit.Time;
  force: number;
}

type Mesure = Partial<Record<Piste, Evenement[]>>;

// --- Harmonie --------------------------------------------------------------

type TypeAccord = "5" | "maj" | "min" | "7" | "m7" | "maj7";

/** Accord : hauteur de la fondamentale (0 = do … 11 = si) et couleur. */
interface Accord {
  racine: number;
  type: TypeAccord;
}

/** Grille d'une ligne : [écart à la tonique en demi-tons, couleur]. */
type Grille = [number, TypeAccord][];

const INTERVALLES: Record<TypeAccord, number[]> = {
  "5": [0, 7, 12],
  maj: [0, 4, 7],
  min: [0, 3, 7],
  "7": [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
};
const TIERCE: Record<TypeAccord, number> = {
  "5": 7,
  maj: 4,
  min: 3,
  "7": 4,
  m7: 3,
  maj7: 4,
};
const SEPTIEME: Record<TypeAccord, number> = {
  "5": 12,
  maj: 9,
  min: 10,
  "7": 10,
  m7: 10,
  maj7: 11,
};

const nom = (midi: number) => Tone.Frequency(midi, "midi").toNote();

/** Place une hauteur (0-11) dans l'octave qui la met entre `bas` et `bas+11`. */
const dans = (hauteur: number, bas: number) =>
  bas + ((((hauteur - bas) % 12) + 12) % 12);

/** Fondamentale à la basse, entre mi 1 et ré# 2. */
const fondamentale = (a: Accord) => dans(a.racine, 28);

/** Accord de guitare en quintes (« power chord »). */
const puissance = (a: Accord) => {
  const r = dans(a.racine, 40);
  return [r, r + 7, r + 12].map(nom);
};

/** Accord plaqué au piano, resserré autour du do central. */
const plaque = (a: Accord, bas = 55) =>
  INTERVALLES[a.type]
    .map((i) => dans(a.racine + i, bas))
    .sort((x, y) => x - y)
    .map(nom);

/** Accord de jazz sans fondamentale (tierce, septième, neuvième). */
const jazz = (a: Accord) => {
  const r = dans(a.racine, 48);
  return [r + TIERCE[a.type], r + SEPTIEME[a.type], r + 14].map((m) =>
    nom(m < 52 ? m + 12 : m),
  );
};

/** Accord aigu de guitare funk (septième, tierce, quinte). */
const aigu = (a: Accord) => {
  const r = dans(a.racine, 52);
  return [r + 10, r + 12 + TIERCE[a.type], r + 19].map(nom);
};

// --- Hasard reproductible --------------------------------------------------

function hachage(texte: string): number {
  let h = 2166136261;
  for (const c of texte) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Suite pseudo-aléatoire : la même graine donne toujours la même suite. */
function hasard(graine: number): () => number {
  let s = graine;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const parmi = <T>(r: () => number, liste: T[]): T =>
  liste[Math.floor(r() * liste.length)];

// --- Styles ----------------------------------------------------------------

/** Ce qu'un style reçoit pour jouer une mesure de groove. */
interface Contexte {
  accord: Accord;
  suivant: Accord;
  /** Motif choisi pour ce morceau, par piste. */
  motif: { basse: number; accords: number; melodie: number[] };
  r: () => number;
  /** Rang de la mesure dans sa ligne (pour alterner les motifs). */
  rang: number;
}

interface Style {
  libelle: string;
  temps: 3 | 4;
  swing: number;
  pistes: Partial<Record<Piste, Instrument>>;
  tonalites: number[];
  /** Grilles de 4 mesures, une par ligne de la partition. */
  grilles: Grille[];
  /** Grille unique parcourue sur tout le morceau (blues en 12 mesures). */
  forme?: Grille;
  /** Nombre de motifs disponibles par piste. */
  motifs: { basse: number; accords: number; melodie: number };
  groove: (c: Contexte) => Mesure;
  /** Voicing de l'accord final et des accents de break. */
  voicing: (a: Accord) => string[];
}

const ev = (
  pas: number,
  notes: string[],
  duree: Tone.Unit.Time,
  force = 0.8,
): Evenement => ({ pas, notes, duree, force });

const CROCHES = [0, 2, 4, 6, 8, 10, 12, 14];
const NOIRES = [0, 4, 8, 12];

/** Gabarits rythmiques de mélodie : [pas, durée]. */
const MELODIES_4: [number, Tone.Unit.Time][][] = [
  [
    [4, "8n"],
    [6, "8n"],
    [8, "4n"],
    [12, "4n"],
  ],
  [
    [0, "4n."],
    [6, "8n"],
    [8, "2n"],
  ],
  [
    [2, "8n"],
    [4, "8n"],
    [6, "8n"],
    [8, "8n"],
    [10, "4n"],
  ],
  [
    [0, "2n"],
    [8, "8n"],
    [10, "8n"],
    [12, "4n"],
  ],
  [
    [0, "8n"],
    [2, "8n"],
    [4, "4n"],
    [10, "8n"],
    [12, "4n"],
  ],
];
const MELODIES_3: [number, Tone.Unit.Time][][] = [
  [
    [0, "4n"],
    [4, "4n"],
    [8, "4n"],
  ],
  [[0, "2n."]],
  [
    [0, "2n"],
    [8, "4n"],
  ],
  [
    [4, "4n"],
    [8, "4n"],
  ],
];

/** Mélodie : notes de l'accord, en marchant par petits intervalles. */
function melodie(
  c: Contexte,
  gabarits: [number, Tone.Unit.Time][][],
): Evenement[] {
  const gabarit = gabarits[c.motif.melodie[c.rang % c.motif.melodie.length]];
  const tons = [TIERCE[c.accord.type], 7, SEPTIEME[c.accord.type], 14];
  let hauteur = dans(c.accord.racine + parmi(c.r, tons), 64);
  return gabarit.map(([pas, duree]) => {
    const choix = tons
      .map((t) => dans(c.accord.racine + t, 62))
      .flatMap((m) => [m, m + 12])
      .filter((m) => m <= 77 && Math.abs(m - hauteur) <= 7 && m !== hauteur);
    if (choix.length > 0) hauteur = parmi(c.r, choix);
    return ev(pas, [nom(hauteur)], duree, 0.72);
  });
}

/** Contrebasse en walking : fondamentale, notes de l'accord, approche. */
function walking(c: Contexte, temps: 3 | 4): Evenement[] {
  const r = fondamentale(c.accord);
  const approche = fondamentale(c.suivant) + (c.r() < 0.5 ? -1 : 1);
  const notes =
    temps === 4
      ? [
          r,
          r + parmi(c.r, [TIERCE[c.accord.type], 7]),
          r + parmi(c.r, [7, 9, SEPTIEME[c.accord.type], 12]),
          approche,
        ]
      : [r, r + 7, approche];
  return notes.map((m, i) => ev(i * 4, [nom(m)], "4n", 0.85));
}

export const STYLES: Record<StyleAccompagnement, Style> = {
  rock: {
    libelle: "Rock",
    temps: 4,
    swing: 0,
    pistes: { basse: "basse", accords: "guitareSaturee" },
    tonalites: [4, 9, 2, 7, 0, 11],
    grilles: [
      [
        [0, "5"],
        [0, "5"],
        [5, "5"],
        [7, "5"],
      ],
      [
        [0, "5"],
        [10, "5"],
        [5, "5"],
        [0, "5"],
      ],
      [
        [0, "5"],
        [5, "5"],
        [0, "5"],
        [7, "5"],
      ],
      [
        [0, "5"],
        [3, "5"],
        [5, "5"],
        [0, "5"],
      ],
      [
        [0, "5"],
        [7, "5"],
        [10, "5"],
        [5, "5"],
      ],
    ],
    motifs: { basse: 3, accords: 3, melodie: 0 },
    voicing: puissance,
    groove: (c) => {
      const r = fondamentale(c.accord);
      const g = puissance(c.accord);
      const basse = [
        CROCHES.map((p) => ev(p, [nom(r)], "8n", 0.85)),
        CROCHES.map((p) =>
          ev(p, [nom(p === 6 || p === 14 ? r + 12 : r)], "8n", 0.85),
        ),
        [0, 3, 6, 8, 10, 11, 14].map((p) =>
          ev(p, [nom(p === 11 ? r + 7 : r)], "16n", 0.85),
        ),
      ][c.motif.basse];
      const accords = [
        CROCHES.map((p) =>
          ev(p, g, p === 14 ? "8n" : "16n", p % 8 === 0 ? 0.8 : 0.55),
        ),
        [ev(0, g, "2n", 0.7), ev(8, g, "4n.", 0.65), ev(14, g, "8n", 0.6)],
        [0, 3, 6, 8, 12, 14].map((p) => ev(p, g, p === 8 ? "4n" : "8n", 0.7)),
      ][c.motif.accords];
      return { basse, accords };
    },
  },
  pop: {
    libelle: "Pop",
    temps: 4,
    swing: 0,
    pistes: { basse: "basse", accords: "piano" },
    tonalites: [0, 7, 2, 5, 9, 4],
    grilles: [
      [
        [0, "maj"],
        [7, "maj"],
        [9, "min"],
        [5, "maj"],
      ],
      [
        [9, "min"],
        [5, "maj"],
        [0, "maj"],
        [7, "maj"],
      ],
      [
        [0, "maj"],
        [9, "min"],
        [5, "maj"],
        [7, "maj"],
      ],
      [
        [5, "maj"],
        [0, "maj"],
        [7, "maj"],
        [9, "min"],
      ],
    ],
    motifs: { basse: 3, accords: 3, melodie: 0 },
    voicing: (a) => plaque(a),
    groove: (c) => {
      const r = fondamentale(c.accord);
      const p = plaque(c.accord);
      const basse = [
        [
          ev(0, [nom(r)], "8n"),
          ev(6, [nom(r)], "8n"),
          ev(8, [nom(r + 7)], "8n"),
          ev(14, [nom(r)], "8n"),
        ],
        CROCHES.map((s) => ev(s, [nom(r)], "8n", 0.75)),
        NOIRES.map((s, i) => ev(s, [nom(i === 2 ? r + 7 : r)], "4n", 0.8)),
      ][c.motif.basse];
      const accords = [
        NOIRES.map((s) => ev(s, p, "8n", 0.5)),
        [
          ev(0, p, "4n", 0.55),
          ev(6, p, "8n", 0.45),
          ev(8, p, "4n", 0.5),
          ev(14, p, "8n", 0.45),
        ],
        CROCHES.map((s) => ev(s, p, "16n", s % 4 === 0 ? 0.5 : 0.35)),
      ][c.motif.accords];
      return { basse, accords };
    },
  },
  funk: {
    libelle: "Funk",
    temps: 4,
    swing: 0,
    pistes: { basse: "basse", accords: "guitareClaire", complement: "rhodes" },
    tonalites: [4, 9, 2, 7, 0, 5],
    grilles: [
      [
        [0, "m7"],
        [0, "m7"],
        [5, "7"],
        [5, "7"],
      ],
      [
        [0, "m7"],
        [10, "7"],
        [0, "m7"],
        [5, "7"],
      ],
      [
        [0, "m7"],
        [0, "m7"],
        [8, "maj7"],
        [10, "7"],
      ],
      [
        [0, "m7"],
        [5, "7"],
        [0, "m7"],
        [7, "m7"],
      ],
    ],
    motifs: { basse: 3, accords: 3, melodie: 0 },
    voicing: aigu,
    groove: (c) => {
      const r = fondamentale(c.accord);
      const degres = { R: r, O: r + 12, S: r + 10, Q: r + 7 };
      const lignes: [number, keyof typeof degres][][] = [
        [
          [0, "R"],
          [3, "R"],
          [6, "O"],
          [8, "R"],
          [10, "S"],
          [11, "O"],
          [14, "Q"],
        ],
        [
          [0, "R"],
          [4, "R"],
          [6, "O"],
          [7, "R"],
          [10, "Q"],
          [12, "S"],
          [14, "O"],
        ],
        [
          [0, "R"],
          [3, "O"],
          [5, "R"],
          [8, "R"],
          [11, "S"],
          [13, "Q"],
          [15, "O"],
        ],
      ];
      const basse = lignes[c.motif.basse].map(([p, d]) =>
        ev(p, [nom(degres[d])], "16n", 0.85),
      );
      const g = aigu(c.accord);
      const accords = [
        [2, 5, 7, 10, 13],
        [4, 6, 12, 14],
        [1, 3, 6, 9, 11, 14],
      ][c.motif.accords].map((p) => ev(p, g, "32n", 0.6));
      return {
        basse,
        accords,
        complement: [ev(0, plaque(c.accord, 53), "1m", 0.35)],
      };
    },
  },
  shuffle: {
    libelle: "Shuffle blues",
    temps: 4,
    swing: 0.65,
    pistes: { basse: "basse", accords: "guitareSaturee" },
    tonalites: [9, 4, 7, 0, 2, 5],
    grilles: [],
    forme: [
      [0, "7"],
      [0, "7"],
      [0, "7"],
      [0, "7"],
      [5, "7"],
      [5, "7"],
      [0, "7"],
      [0, "7"],
      [7, "7"],
      [5, "7"],
      [0, "7"],
      [7, "7"],
    ],
    motifs: { basse: 3, accords: 3, melodie: 0 },
    voicing: puissance,
    groove: (c) => {
      const r = fondamentale(c.accord);
      const t = r + TIERCE[c.accord.type];
      const basse = [
        [r, t, r + 7, r + 9, r + 10, r + 9, r + 7, t],
        [r, r, r + 7, r + 7, r + 9, r + 9, r + 7, r + 7],
        [r, t, r + 7, r + 9, r + 12, r + 9, r + 7, t],
      ][c.motif.basse].map((m, i) => ev(i * 2, [nom(m)], "8n", 0.8));
      const g = dans(c.accord.racine, 40);
      const accords = [
        [
          ev(4, puissance(c.accord), "8n", 0.65),
          ev(12, puissance(c.accord), "8n", 0.65),
        ],
        // Le « shuffle » rock'n'roll : quinte et sixte qui alternent.
        CROCHES.map((p, i) =>
          ev(p, [nom(g), nom(g + (i % 4 < 2 ? 7 : 9))], "8n", 0.6),
        ),
        [
          ev(0, puissance(c.accord), "2n", 0.6),
          ev(8, puissance(c.accord), "2n", 0.55),
        ],
      ][c.motif.accords];
      return { basse, accords };
    },
  },
  jazz: {
    libelle: "Jazz swing",
    temps: 4,
    swing: 0.6,
    pistes: { basse: "contrebasse", accords: "piano", melodie: "trompette" },
    tonalites: [5, 10, 0, 3, 8, 7],
    grilles: [
      [
        [2, "m7"],
        [7, "7"],
        [0, "maj7"],
        [9, "7"],
      ],
      [
        [0, "maj7"],
        [9, "7"],
        [2, "m7"],
        [7, "7"],
      ],
      [
        [4, "m7"],
        [9, "7"],
        [2, "m7"],
        [7, "7"],
      ],
      [
        [5, "maj7"],
        [10, "7"],
        [4, "m7"],
        [9, "7"],
      ],
    ],
    motifs: { basse: 1, accords: 4, melodie: MELODIES_4.length },
    voicing: jazz,
    groove: (c) => {
      const v = jazz(c.accord);
      const accords = [
        [ev(0, v, "8n", 0.5), ev(6, v, "8n", 0.42)],
        [ev(4, v, "8n", 0.45), ev(12, v, "8n", 0.45)],
        [ev(0, v, "4n", 0.5), ev(10, v, "8n", 0.42)],
        [ev(6, v, "8n", 0.45), ev(14, v, "8n", 0.42)],
      ][c.motif.accords];
      return { basse: walking(c, 4), accords, melodie: melodie(c, MELODIES_4) };
    },
  },
  valse: {
    libelle: "Valse jazz (3/4)",
    temps: 3,
    swing: 0.6,
    pistes: { basse: "contrebasse", accords: "piano", melodie: "trompette" },
    tonalites: [0, 5, 10, 2, 7, 3],
    grilles: [
      [
        [2, "m7"],
        [7, "7"],
        [0, "maj7"],
        [9, "7"],
      ],
      [
        [0, "maj7"],
        [9, "7"],
        [2, "m7"],
        [7, "7"],
      ],
      [
        [4, "m7"],
        [9, "7"],
        [2, "m7"],
        [7, "7"],
      ],
    ],
    motifs: { basse: 2, accords: 2, melodie: MELODIES_3.length },
    voicing: jazz,
    groove: (c) => {
      const v = jazz(c.accord);
      const basse =
        c.motif.basse === 0
          ? walking(c, 3)
          : [ev(0, [nom(fondamentale(c.accord))], "2n.", 0.85)];
      const accords =
        c.motif.accords === 0
          ? [ev(4, v, "8n", 0.45), ev(8, v, "8n", 0.42)]
          : [ev(8, v, "4n", 0.45)];
      return { basse, accords, melodie: melodie(c, MELODIES_3) };
    },
  },
};

export const ORDRE_STYLES: StyleAccompagnement[] = [
  "rock",
  "pop",
  "funk",
  "shuffle",
  "jazz",
  "valse",
];

/**
 * Style proposé d'après le texte de la leçon et le nom du rythme : valse ou
 * « 3 temps », shuffle ou blues, jazz ou ternaire, funk, sinon rock.
 */
export function styleParDefaut(texte: string): StyleAccompagnement {
  const t = texte.toLowerCase();
  if (/valse|3 temps|3\/4/.test(t)) return "valse";
  if (/shuffle|blues/.test(t)) return "shuffle";
  if (/jazz|ternaire|chabada|swing|be-?bop|hard bop/.test(t)) return "jazz";
  if (/funk|groove/.test(t)) return "funk";
  if (/pop/.test(t)) return "pop";
  return "rock";
}

// --- Structure et composition ----------------------------------------------

/** Nombre de mesures d'une structure (« GG%|GF » → 5). */
export const totalMesures = (plan: string) => plan.replace(/\|/g, "").length;

/**
 * Structure à jouer pour une longueur donnée (`null` = en boucle). Sans
 * structure connue : des lignes de 4 mesures finies par un break. Une
 * structure trop courte est complétée de grooves, une trop longue coupée.
 */
export function planPour(plan: string | null, mesures: number | null): string {
  if (!plan) {
    if (mesures === null) return "GGGG|GGGF";
    const lignes: string[] = [];
    for (let reste = mesures; reste > 0; reste -= 4) {
      const n = Math.min(4, reste);
      lignes.push(n >= 2 ? `${"G".repeat(n - 1)}F` : "G");
    }
    return lignes.join("|");
  }
  if (mesures === null) return plan;
  const lignes = plan.split("|").filter((l) => l.length > 0);
  let total = totalMesures(plan);
  while (total > mesures) {
    const derniere = lignes.length - 1;
    lignes[derniere] = lignes[derniere].slice(0, -1);
    if (lignes[derniere] === "") lignes.pop();
    total--;
  }
  while (total < mesures) {
    const derniere = lignes.length - 1;
    if (derniere < 0 || lignes[derniere].length >= 4) lignes.push("G");
    else lignes[derniere] += "G";
    total++;
  }
  return lignes.join("|");
}

/** Structure découpée en lignes de partition. */
export const structure = (plan: string): TypeMesure[][] =>
  plan.split("|").map((l) => [...l] as TypeMesure[]);

const NOMS_NOTES = [
  "do",
  "do#",
  "ré",
  "mi♭",
  "mi",
  "fa",
  "fa#",
  "sol",
  "la♭",
  "la",
  "si♭",
  "si",
];

/** Tonalité tirée pour ce morceau dans ce style (« ré », « si♭ »…). */
export function tonaliteDe(style: StyleAccompagnement, graine: string): string {
  const s = STYLES[style];
  const tirage = hasard(hachage(`${graine}:${s.libelle}:tonalité`));
  return NOMS_NOTES[parmi(tirage, s.tonalites)];
}

/** Break : le groupe tient l'accord, la basse marque les temps forts. */
function soutien(style: Style, a: Accord): Mesure {
  const r = fondamentale(a);
  const basse =
    style.temps === 4
      ? [ev(0, [nom(r)], "2n", 0.8), ev(8, [nom(r + 7)], "2n", 0.7)]
      : [ev(0, [nom(r)], "2n.", 0.8)];
  return { basse, accords: [ev(0, style.voicing(a), "1m", 0.6)] };
}

interface Morceau {
  mesures: Mesure[];
  /** Accord final, joué après la dernière mesure (longueur fixée). */
  finale: Mesure;
  /** Le morceau s'ouvre sur un break : le batteur le joue seul. */
  introMuette: boolean;
}

/** Compose le morceau : une mesure jouable par mesure de la structure. */
function composer(
  style: Style,
  graine: string,
  lignes: TypeMesure[][],
): Morceau {
  // Une suite de hasard par choix : deux morceaux qui partagent la même
  // tonalité par hasard ont quand même des grilles et des motifs différents.
  const suite = (choix: string) =>
    hasard(hachage(`${graine}:${style.libelle}:${choix}`));
  const tonique = parmi(suite("tonalité"), style.tonalites);
  const grilles = suite("grilles");
  const r = suite("motifs");
  const motif = {
    basse: Math.floor(r() * style.motifs.basse),
    accords: Math.floor(r() * style.motifs.accords),
    // Deux gabarits de mélodie qui alternent d'une mesure à l'autre.
    melodie:
      style.motifs.melodie > 0
        ? [
            Math.floor(r() * style.motifs.melodie),
            Math.floor(r() * style.motifs.melodie),
          ]
        : [0],
  };
  const accordDe = ([ecart, type]: [number, TypeAccord]): Accord => ({
    racine: (tonique + ecart) % 12,
    type,
  });

  // Accord de chaque mesure : la grille de sa ligne de partition, ou la
  // forme du blues parcourue d'un bout à l'autre du morceau.
  const mesures: { type: TypeMesure; accord: Accord; rang: number }[] = [];
  for (const ligne of lignes) {
    // Chaque ligne de la partition a sa grille, tirée parmi celles du style.
    const grille =
      style.grilles.length > 0 ? parmi(grilles, style.grilles) : [];
    ligne.forEach((type, rang) => {
      const accord = style.forme
        ? accordDe(style.forme[mesures.length % style.forme.length])
        : accordDe(grille[rang % grille.length]);
      mesures.push({ type, accord, rang });
    });
  }

  const tonalite = accordDe([0, mesures[0]?.accord.type ?? "maj"]);
  const morceau: Mesure[] = [];
  mesures.forEach(({ type, accord, rang }, i) => {
    const suivant = mesures[i + 1]?.accord ?? mesures[0].accord;
    if (type === "%" && morceau.length > 0) {
      morceau.push(morceau[morceau.length - 1]);
    } else if (type === "F") {
      morceau.push(soutien(style, accord));
    } else {
      morceau.push(style.groove({ accord, suivant, motif, r, rang }));
    }
  });
  return {
    mesures: morceau,
    finale: {
      basse: [ev(0, [nom(fondamentale(tonalite))], "1m", 0.9)],
      accords: [ev(0, style.voicing(tonalite), "1m", 0.8)],
    },
    introMuette: mesures[0]?.type === "F",
  };
}

// --- Instruments -----------------------------------------------------------

interface Echantillons {
  dossier: string;
  /** Notes enregistrées (les autres sont transposées depuis la plus proche). */
  notes: string;
  volume: number;
  release: number;
}

const GUITARE = "C#2 E2 F#2 A2 C3 D#3 F#3 A3 C4 D#4 F#4 A4 C5 D#5 F#5 A5";

/**
 * De vrais enregistrements, note par note (public/sons/, préparés par
 * scripts/telecharger-sons.py). Volumes réglés pour un mélange équilibré.
 */
const ECHANTILLONS: Record<Instrument, Echantillons> = {
  piano: {
    dossier: "piano",
    notes: "C3 D#3 F#3 A3 C4 D#4 F#4 A4 C5 D#5 F#5 A5 C6",
    volume: 4,
    release: 1,
  },
  rhodes: {
    dossier: "rhodes",
    notes: "A2 D3 G3 B3 D4 F4 B4",
    volume: -14,
    release: 0.4,
  },
  contrebasse: {
    dossier: "contrebasse",
    notes: "Eb1 Gb1 A1 C2 Eb2 Gb2 A2 C3 Eb3 Gb3",
    volume: -6,
    release: 0.4,
  },
  basse: {
    dossier: "basse",
    notes: "E1 G1 A#1 C#2 E2 G2 A#2 C#3 E3 G3",
    volume: -5,
    release: 0.2,
  },
  trompette: {
    dossier: "trompette",
    notes: "F3 A3 C4 D#4 F4 G4 A#4 D5 F5 A5 C6",
    volume: -12,
    release: 0.3,
  },
  // La guitare saturée est la même guitare, passée dans l'ampli (voir plus bas).
  guitareSaturee: {
    dossier: "guitare",
    notes: GUITARE,
    volume: -4,
    release: 0.15,
  },
  guitareClaire: {
    dossier: "guitare",
    notes: GUITARE,
    volume: -9.5,
    release: 0.2,
  },
};

let samplers: Record<Instrument, Tone.Sampler> | null = null;
/** Gain de sortie, partagé par la musique et le clic. */
let sortie: Tone.Gain | null = null;
let chargement: Promise<void> | null = null;

/**
 * Sortie : compression pour lier les instruments et donner du volume,
 * limiteur, puis un arrondi qui ne touche que les crêtes (le son reste intact
 * en dessous de 80 % du maximum).
 */
function chaineDeSortie(): Tone.ToneAudioNode {
  const arrondi = new Tone.WaveShaper((x) => {
    const a = Math.abs(x);
    if (a <= 0.8) return x;
    return Math.sign(x) * (0.8 + 0.18 * Math.tanh((a - 0.8) / 0.18));
  }, 8192).toDestination();
  arrondi.oversample = "4x";
  const limiteur = new Tone.Limiter(-4).connect(arrondi);
  const gain = new Tone.Gain(Tone.dbToGain(8)).connect(limiteur);
  sortie = gain;
  return new Tone.Compressor({
    threshold: -24,
    ratio: 4,
    attack: 0.003,
    release: 0.15,
  }).connect(gain);
}

/**
 * Ampli de la guitare saturée : une saturation, puis un filtre qui imite le
 * haut-parleur (pas d'aigus criards).
 */
function ampli(vers: Tone.ToneAudioNode): Tone.ToneAudioNode {
  const niveau = new Tone.Gain(Tone.dbToGain(-5)).connect(vers);
  const grave = new Tone.Filter(90, "highpass").connect(niveau);
  const hautParleur = new Tone.Filter({
    frequency: 3600,
    type: "lowpass",
    rolloff: -24,
  }).connect(grave);
  const saturation = new Tone.Distortion(0.35).connect(hautParleur);
  saturation.oversample = "4x";
  return saturation;
}

/** Charge les échantillons une seule fois. */
function chargerInstruments(): Promise<void> {
  chargement ??= (async () => {
    const reverb = new Tone.Reverb({ decay: 1.8, wet: 0.14 }).connect(
      chaineDeSortie(),
    );
    const liste = {} as Record<Instrument, Tone.Sampler>;
    for (const [instrument, e] of Object.entries(ECHANTILLONS) as [
      Instrument,
      Echantillons,
    ][]) {
      const urls = Object.fromEntries(
        e.notes.split(" ").map((n) => [n, `${n.replace("#", "s")}.flac`]),
      );
      liste[instrument] = new Tone.Sampler({
        urls,
        baseUrl: `/sons/${e.dossier}/`,
        release: e.release,
        volume: e.volume,
      }).connect(instrument === "guitareSaturee" ? ampli(reverb) : reverb);
    }
    await Tone.loaded();
    samplers = liste;
  })();
  return chargement;
}

// --- Moteur ----------------------------------------------------------------

/** Réglages de lecture, modifiables pendant qu'on joue. */
export interface Reglages {
  style: StyleAccompagnement;
  bpm: number;
  /** Une mesure de clics avant que la musique démarre. */
  decompte: boolean;
  /** Clic de métronome sur chaque temps, en plus de la musique. */
  clic: boolean;
  /** Volume de 0 à 1. */
  volume: number;
  /** Longueur du morceau en mesures ; `null` = en boucle sans fin. */
  mesures: number | null;
  /** Identité du morceau (son nom) : fixe tonalité, grille et motifs. */
  graine: string;
  /** Structure lue sur la partition (« G%%G|GG%G… »), si elle a pu l'être. */
  plan: string | null;
}

let reglages: Reglages | null = null;
let morceau: Morceau = {
  mesures: [],
  finale: {},
  introMuette: false,
};
let repetition: number | null = null;
let clic: Tone.Synth | null = null;
let quandFini: (() => void) | null = null;

/** Volume du curseur (0 à 1) en décibels. */
const decibels = (v: number) => Tone.gainToDb(Math.max(0.001, v));

function recomposer(r: Reglages) {
  morceau = composer(
    STYLES[r.style],
    r.graine,
    structure(planPour(r.plan, r.mesures)),
  );
}

/** Joue les notes d'une mesure qui tombent sur ce pas. */
function jouerMesure(
  m: Mesure,
  style: Style,
  pas: number,
  time: number,
  sansMelodie: boolean,
) {
  if (!samplers) return;
  for (const [piste, evenements] of Object.entries(m) as [
    Piste,
    Evenement[],
  ][]) {
    if (piste === "melodie" && sansMelodie) continue;
    const instrument = style.pistes[piste];
    if (!instrument) continue;
    for (const e of evenements) {
      if (e.pas === pas) {
        samplers[instrument].triggerAttackRelease(
          e.notes,
          e.duree,
          time,
          e.force,
        );
      }
    }
  }
}

/** Joue ce qui tombe sur un pas (double croche) de la grille. */
function jouerPas(time: number, pasGlobal: number) {
  const { mesures } = morceau;
  if (!samplers || !reglages || !clic || mesures.length === 0) return;
  const style = STYLES[reglages.style];
  const parMesure = style.temps * 4;
  const mesure = Math.floor(pasGlobal / parMesure);
  const pas = pasGlobal % parMesure;
  const debut = reglages.decompte ? 1 : 0;

  // Clic : pendant le décompte, puis sur chaque temps si demandé.
  if (pas % 4 === 0 && (mesure < debut || reglages.clic)) {
    clic.triggerAttackRelease(
      pas === 0 ? "C6" : "G5",
      "32n",
      time,
      pas === 0 ? 1 : 0.6,
    );
  }
  if (mesure < debut) return;

  const rang = mesure - debut;
  // Morceau fini : accord final sur le temps qui suit la dernière mesure,
  // puis arrêt une mesure plus tard.
  if (reglages.mesures !== null && rang >= mesures.length) {
    if (rang === mesures.length) {
      jouerMesure(morceau.finale, style, pas, time, true);
    } else if (rang === mesures.length + 1 && pas === 0) {
      // Minuteur plutôt que Tone.getDraw() : celui-ci attend une image
      // affichée, ce qui n'arrive pas si la fenêtre est cachée.
      const delai = Math.max(0, (time - Tone.now()) * 1000);
      setTimeout(() => {
        arreter();
        quandFini?.();
      }, delai);
    }
    return;
  }

  // Break d'ouverture : le batteur le joue seul, après le décompte.
  if (rang === 0 && morceau.introMuette) return;
  const tour = Math.floor(rang / mesures.length);
  // En boucle, la mélodie joue un tour sur deux, pour laisser respirer.
  jouerMesure(mesures[rang % mesures.length], style, pas, time, tour % 2 === 1);
}

/**
 * Démarre le morceau depuis le début (décompte compris). `fini` est appelé
 * quand un morceau de longueur fixée arrive à son terme.
 */
export async function demarrer(r: Reglages, fini?: () => void): Promise<void> {
  if (fini) quandFini = fini;
  await Tone.start();
  await chargerInstruments();
  // Le clic passe par la même sortie que la musique : il reste audible
  // par-dessus, décompte compris.
  clic ??= new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 },
    volume: -12,
  }).connect(sortie ?? Tone.getDestination());
  arreter();
  reglages = { ...r };
  recomposer(r);
  const transport = Tone.getTransport();
  const style = STYLES[r.style];
  transport.timeSignature = style.temps;
  transport.swing = style.swing;
  transport.swingSubdivision = "8n";
  transport.bpm.value = r.bpm;
  Tone.getDestination().volume.value = decibels(r.volume);
  const ticksParPas = transport.PPQ / 4;
  repetition = transport.scheduleRepeat(
    (time) => {
      const pas = Math.round(transport.getTicksAtTime(time) / ticksParPas);
      jouerPas(time, pas);
    },
    "16n",
    0,
  );
  transport.start("+0.05");
}

/** Change les réglages en cours de lecture (le style redémarre le morceau). */
export function modifier(r: Reglages): void {
  if (!reglages) return;
  const transport = Tone.getTransport();
  if (r.style !== reglages.style) {
    demarrer({ ...r, decompte: false });
    return;
  }
  if (r.bpm !== reglages.bpm) transport.bpm.rampTo(r.bpm, 0.2);
  if (r.volume !== reglages.volume) {
    Tone.getDestination().volume.rampTo(decibels(r.volume), 0.1);
  }
  if (r.mesures !== reglages.mesures || r.plan !== reglages.plan) {
    recomposer(r);
  }
  // Le décompte ne compte qu'au démarrage : on garde celui qui était actif.
  reglages = { ...r, decompte: reglages.decompte };
}

/** Arrête la lecture et coupe les notes en cours. */
export function arreter(): void {
  const transport = Tone.getTransport();
  transport.stop();
  if (repetition !== null) {
    transport.clear(repetition);
    repetition = null;
  }
  transport.position = 0;
  if (samplers) for (const s of Object.values(samplers)) s.releaseAll();
  reglages = null;
}

export function enLecture(): boolean {
  return reglages !== null;
}
