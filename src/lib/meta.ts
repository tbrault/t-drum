import type { Volume } from "@/content/types";
import type { Statut } from "@/progress/types";

/** Libellés et couleurs des statuts (tokens définis dans index.css). */
export const STATUTS: Record<
  Statut,
  {
    label: string;
    color: string;
    dot: string;
    /** Style de la pastille, ou du bouton quand ce statut est choisi. */
    active: string;
  }
> = {
  "a-faire": {
    label: "À faire",
    color: "text-todo",
    dot: "bg-todo",
    active: "bg-raised text-ink ring-1 ring-inset ring-ink-faint",
  },
  "en-cours": {
    label: "En cours",
    color: "text-wip",
    dot: "bg-wip",
    active: "bg-wip/15 text-wip ring-1 ring-inset ring-wip/70",
  },
  validee: {
    label: "Validée",
    color: "text-done",
    dot: "bg-done",
    active: "bg-done/15 text-done ring-1 ring-inset ring-done/70",
  },
  maitrisee: {
    label: "Maîtrisée",
    color: "text-master",
    dot: "bg-master",
    active: "bg-master/15 text-master ring-1 ring-inset ring-master/70",
  },
};

export const STATUT_ORDER: Statut[] = [
  "a-faire",
  "en-cours",
  "validee",
  "maitrisee",
];

/**
 * Barème de maîtrise (index = nombre de pads allumés, 0 à 5).
 * La vitesse est portée par le BPM du rythme : le barème n'en parle pas,
 * sauf pour le tempo cible de la leçon.
 */
export const MAITRISE_NIVEAUX = [
  "Non évalué",
  "Déchiffré",
  "Enchaîné sans erreur",
  "Tempo cible atteint",
  "Tenu sur la durée",
  "Par cœur",
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
