import type { TempoCible } from "@/content/types";
import type { Rythme, Statut } from "@/progress/types";

/** Nombre de rythmes dont le tempo atteint au moins `bpm`. */
export function rythmesAuTempo(rythmes: Rythme[], bpm: number): number {
  return rythmes.filter((r) => (r.bpm ?? 0) >= bpm).length;
}

/**
 * Statut déduit de la pratique, pour une leçon qui a un tempo cible :
 * - maîtrisée : tous les rythmes saisis atteignent le tempo max ;
 * - validée : tous atteignent le tempo min ;
 * - en cours : du temps a été enregistré ;
 * - à faire : sinon.
 * Seuls les rythmes saisis comptent : à l'utilisateur de tous les ajouter.
 */
export function statutAuto(
  cible: TempoCible,
  rythmes: Rythme[],
  minutes: number,
): Statut {
  const n = rythmes.length;
  if (n > 0 && rythmesAuTempo(rythmes, cible.max) === n) return "maitrisee";
  if (n > 0 && rythmesAuTempo(rythmes, cible.min) === n) return "validee";
  return minutes > 0 ? "en-cours" : "a-faire";
}

/** Vrai pour les deux statuts « acquis » (validée ou maîtrisée). */
export function estAcquise(statut: Statut): boolean {
  return statut === "validee" || statut === "maitrisee";
}
