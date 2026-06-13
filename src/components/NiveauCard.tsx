import { ArrowUpRight, Lock } from "lucide-react";
import type { Niveau } from "@/content/types";
import type { Stats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";

interface Props {
  niveau: Niveau;
  stats: Stats;
  onOpen: (numero: number) => void;
}

/** Carte de niveau dans le tableau de bord. */
export function NiveauCard({ niveau, stats, onOpen }: Props) {
  const locked = niveau.placeholder;
  const complete = !locked && stats.pct === 100;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onOpen(niveau.numero)}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-line bg-panel/80 p-5 text-left backdrop-blur transition-all",
        locked
          ? "cursor-not-allowed opacity-45"
          : "hover:-translate-y-0.5 hover:border-amber/50 hover:shadow-[0_8px_30px_-12px_var(--color-amber)]",
        complete && "border-done/40",
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
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-amber" />
        )}
      </div>

      <p className="min-h-[2.5rem] text-sm leading-snug text-ink-muted">
        {locked ? "Contenu à venir" : (niveau.titre ?? "—")}
      </p>

      {locked ? (
        <div className="h-2 w-full rounded-full bg-base" />
      ) : (
        <ProgressBar pct={stats.pct} />
      )}

      <div className="flex items-center justify-between font-mono text-xs text-ink-faint tabular-nums">
        <span>
          {locked ? "—" : `${stats.acquises}/${stats.total} acquises`}
        </span>
        <span className={cn(complete ? "text-done" : "text-amber")}>
          {locked ? "" : `${stats.pct}%`}
        </span>
      </div>
    </button>
  );
}
