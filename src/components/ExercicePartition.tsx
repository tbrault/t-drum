import { useState } from "react";
import { ratioPage } from "@/content/partitions";
import { useUrlPage } from "@/lib/partitions";
import type { PartitionRythme } from "@/progress/types";

interface Props {
  partition: PartitionRythme;
  /** Clic sur l'exercice (ouvre la page pour le changer). */
  onClick: () => void;
}

/** Hauteur maximale d'un exercice dans la liste des rythmes. */
const HAUTEUR_MAX_REM = 7;

/**
 * Exercice d'une partition, découpé dans l'image de sa page : seule la zone
 * de l'exercice est visible, à sa forme d'origine.
 */
export function ExercicePartition({ partition, onClick }: Props) {
  const urlPage = useUrlPage();
  const [absente, setAbsente] = useState(false);
  const [x, y, w, h] = partition.zone;
  // Largeur / hauteur de la zone, à l'échelle de la page.
  const forme = w / (h * ratioPage(partition.source));

  if (absente) {
    return (
      <p className="text-sm text-ink-faint">
        Image de la page introuvable (dossier partitions/).
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title="Changer l'exercice associé"
      style={{
        aspectRatio: forme,
        maxWidth: `${forme * HAUTEUR_MAX_REM}rem`,
      }}
      className="relative block w-full overflow-hidden rounded-md bg-white transition-shadow hover:shadow-[0_0_0_2px_var(--color-accent)]"
    >
      {urlPage && (
        <img
          src={urlPage(partition)}
          alt={`Partition, page ${partition.page}`}
          draggable={false}
          onError={() => setAbsente(true)}
          className="absolute h-auto max-w-none select-none"
          style={{
            width: `${100 / w}%`,
            left: `${(-x / w) * 100}%`,
            top: `${(-y / h) * 100}%`,
          }}
        />
      )}
    </button>
  );
}
