/** Statut de travail d'une leçon. */
export type Statut = "a-faire" | "en-cours" | "acquise";

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
  /** Remarques personnelles. */
  notes?: string;
  /** Rythmes suivis dans la leçon (saisis par l'utilisateur). */
  rythmes: Rythme[];
  /** Suivi de révision (présent uniquement quand la leçon est/a été acquise). */
  revision?: Revision;
}

/** Fichier de progression persisté. */
export interface ProgressFile {
  version: 1;
  lessons: Record<string, LessonProgress>;
  sessions: Session[];
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
  return {
    ...defaultProgress(lessonId),
    ...raw,
    lessonId,
    rythmes: raw.rythmes ?? [],
  };
}
