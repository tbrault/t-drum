/** Utilitaires de dates en heure locale, au format ISO "YYYY-MM-DD". */

/** Date du jour (locale) au format "YYYY-MM-DD". */
export function todayISO(): string {
  return toISO(new Date());
}

/** Formate une Date locale en "YYYY-MM-DD". */
export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse "YYYY-MM-DD" en Date locale (minuit). */
export function parseISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Ajoute n jours à une date ISO et renvoie une nouvelle date ISO. */
export function addDaysISO(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

/** Nombre de jours entre deux dates ISO (b - a). */
export function diffDays(aIso: string, bIso: string): number {
  const a = parseISO(aIso).getTime();
  const b = parseISO(bIso).getTime();
  return Math.round((b - a) / 86_400_000);
}

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** "13 juin 2026" depuis une date ISO. */
export function formatLong(iso: string): string {
  const d = parseISO(iso);
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "juin 2026" pour un mois donné. */
export function formatMonth(year: number, month0: number): string {
  return `${MOIS[month0]} ${year}`;
}

/** Minutes -> "1 h 05" ou "45 min". */
export function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}
