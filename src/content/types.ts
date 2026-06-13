/** Numéro de volume de la méthode auquel se rattache une leçon. */
export type Volume = 2 | 3 | 4;

/** Plage de tempo (BPM) conseillée pour les exercices d'une leçon. */
export interface TempoCible {
  min: number;
  max: number;
}

/**
 * Consignes d'une leçon, transcrites depuis les screenshots de la formation.
 * Tous les champs sont optionnels : certaines leçons n'ont pas de note, etc.
 */
export interface Consignes {
  partitions?: string;
  echauffement?: string;
  objectifs?: string;
  tempoCible?: TempoCible;
  notes?: string;
}

/** Une leçon de la formation. */
export interface Lesson {
  /** Identifiant unique, ex. "7-9" (niveau-numéro). */
  id: string;
  niveau: number;
  /** Numéro continu de la leçon dans le niveau. */
  numero: number;
  volume: Volume;
  consignes: Consignes;
  /** Une vidéo existe pour cette leçon. */
  hasVideo: boolean;
  /** Un backing track (`-BT`) existe pour cette leçon. */
  hasBT: boolean;
}

/** Un niveau (chapitre) de la formation, regroupant des leçons. */
export interface Niveau {
  numero: number;
  titre?: string;
  /** Niveau dont le contenu n'est pas encore transcrit. */
  placeholder?: boolean;
  lessons: Lesson[];
}
