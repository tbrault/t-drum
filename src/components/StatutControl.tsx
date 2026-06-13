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
        className={cn(
          "font-mono text-[11px] uppercase tracking-wider",
          s.color,
        )}
      >
        {s.short}
      </span>
    </span>
  );
}

interface ControlProps {
  value: Statut;
  onChange: (statut: Statut) => void;
}

/** Sélecteur segmenté de statut (façon boutons de transport). */
export function StatutControl({ value, onChange }: ControlProps) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-base p-1">
      {STATUT_ORDER.map((statut) => {
        const s = STATUTS[statut];
        const active = statut === value;
        return (
          <button
            key={statut}
            type="button"
            onClick={() => onChange(statut)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
              active
                ? "bg-raised text-ink"
                : "text-ink-faint hover:text-ink-muted",
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
