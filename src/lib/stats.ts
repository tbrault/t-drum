import type { Niveau } from "@/content/types";
import { defaultProgress, type LessonProgress } from "@/progress/types";

export interface Stats {
  total: number;
  acquises: number;
  enCours: number;
  aFaire: number;
  /** Pourcentage pondéré (acquise = 1, en cours = 0,5). */
  pct: number;
}

type ProgressMap = Record<string, LessonProgress>;

function get(map: ProgressMap, id: string): LessonProgress {
  return map[id] ?? defaultProgress(id);
}

export function niveauStats(niveau: Niveau, map: ProgressMap): Stats {
  return computeStats(niveau.lessons.map((l) => get(map, l.id)));
}

export function globalStats(niveaux: Niveau[], map: ProgressMap): Stats {
  const all = niveaux.flatMap((n) => n.lessons).map((l) => get(map, l.id));
  return computeStats(all);
}

function computeStats(items: LessonProgress[]): Stats {
  const total = items.length;
  const acquises = items.filter((p) => p.statut === "acquise").length;
  const enCours = items.filter((p) => p.statut === "en-cours").length;
  const aFaire = total - acquises - enCours;
  const pct =
    total === 0 ? 0 : Math.round(((acquises + enCours * 0.5) / total) * 100);
  return { total, acquises, enCours, aFaire, pct };
}
