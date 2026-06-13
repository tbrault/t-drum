import type { LessonProgress } from "@/progress/types";
import { addDaysISO, diffDays, todayISO } from "./dates";

/** Intervalles de répétition espacée, en jours. */
export const REVISION_INTERVALS = [7, 21, 60, 120, 240];

/** Intervalle (jours) correspondant à un palier. */
export function intervalForStep(step: number): number {
  const i = Math.min(Math.max(step, 0), REVISION_INTERVALS.length - 1);
  return REVISION_INTERVALS[i];
}

/** Date d'échéance de la prochaine révision (ISO), ou null si pas de suivi. */
export function nextDueISO(progress: LessonProgress): string | null {
  if (progress.statut !== "acquise" || !progress.revision) return null;
  return addDaysISO(
    progress.revision.lastReviewed,
    intervalForStep(progress.revision.step),
  );
}

/** Vrai si la leçon acquise est due (ou en retard) pour révision. */
export function isDue(progress: LessonProgress, today = todayISO()): boolean {
  const due = nextDueISO(progress);
  return due !== null && diffDays(due, today) >= 0;
}

/** Nombre de jours avant l'échéance (négatif = en retard), ou null. */
export function daysUntilDue(
  progress: LessonProgress,
  today = todayISO(),
): number | null {
  const due = nextDueISO(progress);
  return due === null ? null : diffDays(today, due);
}
