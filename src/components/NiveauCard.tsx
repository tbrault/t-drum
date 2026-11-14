import { ArrowUpRight, Lock } from "lucide-react";
import type { Niveau } from "@/content/types";
import type { Stats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";

interface Props {
  niveau: Niveau;
  /** Titre à afficher (personnalisé ou d'origine). */
  titre?: string;
  stats: Stats;
  onOpen: (numero: number) => void;
}

/** Carte de niveau dans le tableau de bord. */
export function NiveauCard({ niveau, titre, stats, onOpen }: Props) {
  const locked = niveau.placeholder;
  const complete = !locked && stats.pct === 100;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onOpen(niveau.numero)}
      className={cn(
        "group relative flex flex-col gap-4 card overflow-hidden rounded-xl p-5 text-left transition-all",
        locked
          ? "cursor-not-allowed opacity-45"
          : // Liseré ambre + halo ambre, comme sur la première version de l'app.
            "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.79_0.158_67/0.5),0_8px_30px_-12px_var(--color-accent)]",
        complete && "outline-1 outline-done/50",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Niveau
          </span>
          <span className="font-display text-3xl font-extrabold leading-none text-ink">
            {niveau.numero}
          </span>
        </div>
        {locked ? (
          <Lock className="h-4 w-4 text-ink-faint" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
        )}
      </div>

      <p className="min-h-[2.5rem] text-sm leading-snug text-ink-muted">
        {locked ? "Contenu à venir" : (titre ?? "—")}
      </p>

      {locked ? (
        <div className="h-2 w-full rounded-full bg-ground" />
      ) : (
        <ProgressBar pct={stats.pct} />
      )}

      <div className="flex items-center justify-between font-mono text-xs text-ink-faint tabular-nums">
        <span>
          {locked ? "—" : `${stats.acquises}/${stats.total} acquises`}
        </span>
        <span className={cn(complete ? "text-done" : "text-accent")}>
          {locked ? "" : `${stats.pct}%`}
        </span>
      </div>
    </button>
  );
}
