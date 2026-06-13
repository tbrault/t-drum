import { CalendarDays } from "lucide-react";
import { NiveauCard } from "@/components/NiveauCard";
import { ProgressBar } from "@/components/ProgressBar";
import { allLessons, niveaux } from "@/content";
import { totalMinutes } from "@/lib/agenda";
import { formatDuree } from "@/lib/dates";
import { isDue } from "@/lib/revision";
import { globalStats, niveauStats } from "@/lib/stats";
import { useAllProgress, useSessions } from "@/progress/store";

interface Props {
  onOpenNiveau: (numero: number) => void;
  onOpenLesson: (id: string) => void;
  onOpenCalendar: () => void;
}

export function Dashboard({
  onOpenNiveau,
  onOpenLesson,
  onOpenCalendar,
}: Props) {
  const progress = useAllProgress();
  const sessions = useSessions();
  const global = globalStats(niveaux, progress);
  const temps = totalMinutes(sessions);

  const aReviser = allLessons.filter((l) => {
    const p = progress[l.id];
    return p && isDue(p);
  });

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <header className="mb-10">
        <div className="flex items-start justify-between">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-ink">
            T-<span className="text-amber">Drum</span>
          </h1>
          <button
            type="button"
            onClick={onOpenCalendar}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:border-amber/60 hover:text-amber"
          >
            <CalendarDays className="h-4 w-4" /> Calendrier
          </button>
        </div>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          Suivi de progression — formation batterie. Niveaux 7 à 23, trois
          volumes.
        </p>

        <div className="mt-7 rounded-2xl border border-line bg-panel/70 p-6 backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-baseline gap-6">
              <Stat value={String(global.acquises)} label="acquises" />
              <Stat
                value={String(global.enCours)}
                label="en cours"
                accent="wip"
              />
              <Stat
                value={formatDuree(temps)}
                label="pratiqué"
                accent="faint"
              />
            </div>
            <div className="text-right">
              <div className="font-display text-4xl font-extrabold text-amber tabular-nums">
                {global.pct}
                <span className="text-xl text-amber-dim">%</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                progression
              </div>
            </div>
          </div>
          <ProgressBar pct={global.pct} className="mt-5 h-2.5" />
        </div>
      </header>

      {aReviser.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-done">
            À réviser ({aReviser.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {aReviser.map((l) => (
              <button
                type="button"
                key={l.id}
                onClick={() => onOpenLesson(l.id)}
                className="rounded-lg border border-done/30 bg-done/5 px-3 py-2 text-left transition-colors hover:border-done/60"
              >
                <span className="font-mono text-sm text-ink">{l.id}</span>
                <span className="ml-2 text-xs text-ink-faint">
                  Niveau {l.niveau}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {niveaux.map((niveau) => (
          <NiveauCard
            key={niveau.numero}
            niveau={niveau}
            stats={niveauStats(niveau, progress)}
            onOpen={onOpenNiveau}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  accent = "amber",
}: {
  value: string;
  label: string;
  accent?: "amber" | "wip" | "faint";
}) {
  const color =
    accent === "wip"
      ? "text-wip"
      : accent === "faint"
        ? "text-ink"
        : "text-done";
  return (
    <div>
      <div
        className={`font-display text-3xl font-extrabold tabular-nums ${color}`}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        {label}
      </div>
    </div>
  );
}
