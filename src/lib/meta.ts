import type { Volume } from "@/content/types";
import type { Statut } from "@/progress/types";

/** Libellés et couleurs des statuts (tokens définis dans index.css). */
export const STATUTS: Record<
  Statut,
  { label: string; short: string; color: string; dot: string }
> = {
  "a-faire": {
    label: "À faire",
    short: "TODO",
    color: "text-todo",
    dot: "bg-todo",
  },
  "en-cours": {
    label: "En cours",
    short: "WIP",
    color: "text-wip",
    dot: "bg-wip",
  },
  acquise: {
    label: "Acquise",
    short: "OK",
    color: "text-done",
    dot: "bg-done",
  },
};

export const STATUT_ORDER: Statut[] = ["a-faire", "en-cours", "acquise"];

/** Barème de maîtrise (index = nombre de pads allumés, 0 à 5). */
export const MAITRISE_NIVEAUX = [
  "Non évalué",
  "Déchiffré",
  "Joué lentement, sans erreur",
  "Tempo cible atteint",
  "Fluide et régulier",
  "Par cœur / automatique",
];

/** Couleur d'accent par volume (pastilles). */
export const VOLUME_COLOR: Record<Volume, string> = {
  2: "text-vol2",
  3: "text-vol3",
  4: "text-vol4",
};

export const VOLUME_BORDER: Record<Volume, string> = {
  2: "border-vol2/50",
  3: "border-vol3/50",
  4: "border-vol4/50",
};
