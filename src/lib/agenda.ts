import type { Session } from "@/progress/types";

/** Somme des minutes de toutes les sessions. */
export function totalMinutes(sessions: Session[]): number {
  return sessions.reduce((s, x) => s + x.minutes, 0);
}

/** Sessions d'une leçon, triées par date décroissante. */
export function sessionsForLesson(
  sessions: Session[],
  lessonId: string,
): Session[] {
  return sessions
    .filter((s) => s.lessonId === lessonId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Minutes cumulées sur une leçon. */
export function minutesForLesson(
  sessions: Session[],
  lessonId: string,
): number {
  return totalMinutes(sessions.filter((s) => s.lessonId === lessonId));
}

/** Minutes totales par jour (clé = date ISO). */
export function minutesByDay(sessions: Session[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const s of sessions) map[s.date] = (map[s.date] ?? 0) + s.minutes;
  return map;
}

/** Sessions d'un jour donné. */
export function sessionsForDay(
  sessions: Session[],
  dateISO: string,
): Session[] {
  return sessions.filter((s) => s.date === dateISO);
}
