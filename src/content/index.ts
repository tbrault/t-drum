import { niveau07 } from "./niveau-07";
import { niveau08 } from "./niveau-08";
import { niveau09 } from "./niveau-09";
import { niveau10 } from "./niveau-10";
import { niveau11 } from "./niveau-11";
import { niveau12 } from "./niveau-12";
import { niveau13 } from "./niveau-13";
import { niveau14 } from "./niveau-14";
import { niveau15 } from "./niveau-15";
import { niveau16 } from "./niveau-16";
import { niveau17 } from "./niveau-17";
import { niveau18 } from "./niveau-18";
import { niveau19 } from "./niveau-19";
import { niveau20 } from "./niveau-20";
import { niveau21 } from "./niveau-21";
import { niveau22 } from "./niveau-22";
import { niveau23 } from "./niveau-23";
import type { Lesson, Niveau } from "./types";

export type { Consignes, Lesson, Niveau, TempoCible, Volume } from "./types";

/** Tous les niveaux de la formation (7 à 23), transcrits. */
export const niveaux: Niveau[] = [
  niveau07,
  niveau08,
  niveau09,
  niveau10,
  niveau11,
  niveau12,
  niveau13,
  niveau14,
  niveau15,
  niveau16,
  niveau17,
  niveau18,
  niveau19,
  niveau20,
  niveau21,
  niveau22,
  niveau23,
];

/** Toutes les leçons, tous niveaux confondus. */
export const allLessons: Lesson[] = niveaux.flatMap((n) => n.lessons);

export function getNiveau(numero: number): Niveau | undefined {
  return niveaux.find((n) => n.numero === numero);
}

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

/** Exceptions de nommage des fichiers vidéo (sinon convention `{id}.mp4`). */
const VIDEO_OVERRIDES: Record<string, string> = {
  "7-5": "Chapitre 7/vol 2/Niveau7-5.mp4",
};

/** Chemin de la vidéo d'une leçon, relatif au dossier `videos/`. */
export function videoRelPath(lesson: Lesson): string {
  return (
    VIDEO_OVERRIDES[lesson.id] ??
    `Chapitre ${lesson.niveau}/vol ${lesson.volume}/${lesson.id}.mp4`
  );
}

/** Chemin de la vignette d'une leçon, relatif au dossier `videos/`. */
export function posterRelPath(lesson: Lesson): string {
  return `posters/${lesson.id}.jpg`;
}
