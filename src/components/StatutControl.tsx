import { STATUT_ORDER, STATUTS } from "@/lib/meta";
import { cn } from "@/lib/utils";
import type { Statut } from "@/progress/types";

/** Petite pastille de statut (lecture seule, pour les listes). */
export function StatutBadge({ statut }: { statut: Statut }) {
  const s = STATUTS[statut];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2 w-2 rounded-full", s.dot)} />
      <span
        className={cn("font-mono text-xs uppercase tracking-wider", s.color)}
      >
        {s.label}
      </span>
    </span>
  );
}

/** Statut mis en avant (lecture seule), pour l'en-tête d'une leçon. */
export function StatutPill({ statut }: { statut: Statut }) {
  const s = STATUTS[statut];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider",
        s.active,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

interface ControlProps {
  value: Statut;
  onChange: (statut: Statut) => void;
}

/**
 * Sélecteur segmenté de statut, pour les rares leçons sans tempo cible (les
 * autres ont un statut calculé).
 */
export function StatutControl({ value, onChange }: ControlProps) {
  return (
    <div className="well inline-flex rounded-lg p-1">
      {STATUT_ORDER.map((statut) => {
        const s = STATUTS[statut];
        const active = statut === value;
        return (
          <button
            key={statut}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(statut)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
              active
                ? s.active
                : "text-ink-faint hover:bg-hover hover:text-ink",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                s.dot,
                active ? "" : "opacity-40",
              )}
            />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
