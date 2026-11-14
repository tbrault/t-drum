import zonesJson from "./partitions-zones.json";
import type { Lesson } from "./types";

/** Document de partitions : un volume de la méthode ou le livret d'annexes. */
export type SourcePartition = "volume-2" | "volume-3" | "volume-4" | "annexes";

/** Une page d'un document, avec son numéro imprimé. */
export interface PagePartition {
  source: SourcePartition;
  page: number;
}

/** Cadre d'un exercice sur sa page : [x, y, largeur, hauteur], de 0 à 1. */
export type Zone = [number, number, number, number];

interface ZonesSource {
  /** Hauteur / largeur des pages. */
  ratio: number;
  pages: Record<string, number[][]>;
  /** Titre des morceaux (binaires, solos), aligné sur les cadres de la page. */
  noms: Record<string, (string | null)[]>;
  /** Nombre de mesures de chaque exercice, aligné sur les cadres de la page. */
  mesures: Record<string, (number | null)[]>;
  /** Structure de chaque exercice (« G%%G|GG%G »), alignée sur les cadres. */
  plans: Record<string, (string | null)[]>;
}
// Fichier généré par scripts/detecter-exercices.swift.
const ZONES = zonesJson as unknown as Record<SourcePartition, ZonesSource>;

/** Pages disponibles par document (numéros imprimés, voir le script). */
const BORNES: Record<SourcePartition, [number, number]> = {
  "volume-2": [0, 193],
  "volume-3": [0, 145],
  "volume-4": [0, 121],
  annexes: [1, 25],
};

export function bornesSource(source: SourcePartition): [number, number] {
  return BORNES[source];
}

/** Hauteur / largeur d'une page (pour afficher un exercice sans le déformer). */
export function ratioPage(source: SourcePartition): number {
  return ZONES[source]?.ratio ?? 1.4173;
}

/** Exercices repérés automatiquement sur une page, dans l'ordre de lecture. */
export function zonesDePage({ source, page }: PagePartition): Zone[] {
  return (ZONES[source]?.pages[String(page)] ?? []) as Zone[];
}

/**
 * Titre de chaque exercice de la page (« Binaire 9 », « Solo 4 ») quand
 * c'est un morceau, `null` sinon. Aligné sur `zonesDePage`.
 */
export function nomsDePage({ source, page }: PagePartition): (string | null)[] {
  return ZONES[source]?.noms[String(page)] ?? [];
}

/**
 * Nombre de mesures de l'exercice repéré à cette zone (barres de mesure
 * comptées sur la partition), ou `null` s'il n'a pas pu être compté.
 */
export function mesuresDeZone(page: PagePartition, zone: Zone): number | null {
  const i = zonesDePage(page).findIndex((z) => memeZone(z, zone));
  if (i < 0) return null;
  return ZONES[page.source]?.mesures?.[String(page.page)]?.[i] ?? null;
}

/**
 * Structure de l'exercice repéré à cette zone, une lettre par mesure : G
 * (groove), % (mesure répétée), F (break), | entre deux lignes. `null` si
 * elle n'a pas pu être lue.
 */
export function planDeZone(page: PagePartition, zone: Zone): string | null {
  const i = zonesDePage(page).findIndex((z) => memeZone(z, zone));
  if (i < 0) return null;
  return ZONES[page.source]?.plans?.[String(page.page)]?.[i] ?? null;
}

/** « Vol. 3 — p. 18 », « Annexes — p. 3 ». */
export function libellePage({ source, page }: PagePartition): string {
  const doc = source === "annexes" ? "Annexes" : `Vol. ${source.slice(-1)}`;
  return `${doc} — p. ${page}`;
}

/**
 * Pages de partition d'une leçon, lues dans ses consignes : « Volume 3 pages
 * 18 et 19. », « Volume 4, page 16 — Solo 4. », « Volume 2 Thème A de la page
 * 189. », « Annexe. »… Quand une leçon renvoie aux annexes sans dire quelle
 * page, on propose le livret à partir de sa première page de partition.
 */
export function pagesDeLecon(lesson: Lesson): PagePartition[] {
  const texte = lesson.consignes.partitions ?? "";
  const pages: PagePartition[] = [];
  const volume = texte.match(/Volume (\d)/);
  if (volume) {
    const source = `volume-${volume[1]}` as SourcePartition;
    const [min, max] = BORNES[source] ?? [0, -1];
    // Après « Volume N », sans les numéros de solo ni de lignes.
    const reste = texte
      .slice((volume.index ?? 0) + volume[0].length)
      .replace(/Solo \d+/gi, "")
      .replace(/lignes? \d+ à \d+/gi, "");
    for (const m of reste.matchAll(/\d+/g)) {
      const page = Number(m[0]);
      if (page >= min && page <= max && !pages.some((p) => p.page === page)) {
        pages.push({ source, page });
      }
    }
  }
  if (/annexe/i.test(texte)) pages.push({ source: "annexes", page: 3 });
  return pages;
}

/** Deux cadres désignent le même exercice (à l'arrondi près). */
export function memeZone(a: Zone, b: Zone): boolean {
  return a.every((v, i) => Math.abs(v - b[i]) < 0.003);
}
