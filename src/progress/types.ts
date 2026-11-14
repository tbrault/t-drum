/**
 * Statut de travail d'une leçon. Il est déduit de la pratique (voir
 * `statutAuto`) ; seules les leçons sans tempo cible le choisissent à la main.
 */
export type Statut = "a-faire" | "en-cours" | "validee" | "maitrisee";

/**
 * Un rythme travaillé dans une leçon. Les rythmes ne sont visibles que sur la
 * partition : l'utilisateur les ajoute et les nomme lui-même.
 */
export interface Rythme {
  id: string;
  libelle: string;
  /** Tempo atteint au métronome (BPM). */
  bpm?: number;
  /** Maîtrise 0-5 selon le barème (0 = non évalué). */
  maitrise: number;
  /** Partie de la leçon où le rythme est rangé (absent = hors partie). */
  partieId?: string;
}

/**
 * Sous-partie d'une leçon (ex. « Page 22 », « Indépendance ») : un intertitre
 * dans la liste des rythmes, qui regroupe ceux placés en dessous de lui.
 */
export interface Partie {
  id: string;
  titre: string;
  /** Vrai quand ses rythmes sont masqués dans la liste. */
  repliee?: boolean;
}

/** Suivi de révision (répétition espacée) d'une leçon acquise. */
export interface Revision {
  /** Date de la dernière révision/acquisition (ISO "YYYY-MM-DD"). */
  lastReviewed: string;
  /** Palier dans la suite d'intervalles de révision. */
  step: number;
}

/** Une session de pratique : du temps passé sur une leçon un jour donné. */
export interface Session {
  id: string;
  lessonId: string;
  /** Jour de la session (ISO "YYYY-MM-DD"). */
  date: string;
  /** Durée en minutes. */
  minutes: number;
}

/** Progression personnelle sur une leçon. */
export interface LessonProgress {
  lessonId: string;
  statut: Statut;
  /** Titre personnalisé (sinon c'est le titre d'origine de la leçon). */
  titre?: string;
  /** Remarques personnelles. */
  notes?: string;
  /**
   * Rythmes suivis dans la leçon (saisis par l'utilisateur), dans l'ordre
   * d'affichage : d'abord ceux hors partie, puis partie par partie.
   */
  rythmes: Rythme[];
  /** Sous-parties de la leçon, dans l'ordre d'affichage. */
  parties?: Partie[];
  /** Suivi de révision (présent dès que la leçon a été validée une fois). */
  revision?: Revision;
}

/** Fichier de progression persisté. */
export interface ProgressFile {
  version: 1;
  lessons: Record<string, LessonProgress>;
  sessions: Session[];
  /** Titres de niveau personnalisés, par numéro de niveau. */
  niveauTitres?: Record<string, string>;
}

/** Progression par défaut d'une leçon non encore travaillée. */
export function defaultProgress(lessonId: string): LessonProgress {
  return { lessonId, statut: "a-faire", rythmes: [] };
}

/** Normalise une entrée chargée (compatibilité champs manquants). */
export function normalizeProgress(
  lessonId: string,
  raw: Partial<LessonProgress>,
): LessonProgress {
  // Ancien statut unique « acquise » : devient « validée », puis le store
  // recalcule le statut exact à partir des tempos.
  const ancien = (raw.statut as string | undefined) === "acquise";
  return {
    ...defaultProgress(lessonId),
    ...raw,
    ...(ancien && { statut: "validee" as const }),
    lessonId,
    rythmes: raw.rythmes ?? [],
  };
}
