import { Breadcrumb } from "@/components/Breadcrumb";
import { LessonRow } from "@/components/LessonRow";
import { ProgressBar } from "@/components/ProgressBar";
import { getNiveau } from "@/content";
import type { Volume } from "@/content/types";
import { VOLUME_COLOR } from "@/lib/meta";
import { niveauStats } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { useAllProgress } from "@/progress/store";

interface Props {
  numero: number;
  onDashboard: () => void;
  onOpenLesson: (id: string) => void;
}

const VOLUMES: Volume[] = [2, 3, 4];

export function NiveauView({ numero, onDashboard, onOpenLesson }: Props) {
  const niveau = getNiveau(numero);
  const progress = useAllProgress();

  if (!niveau) return null;
  const stats = niveauStats(niveau, progress);

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Tableau de bord", onClick: onDashboard },
          { label: `Niveau ${niveau.numero}` },
        ]}
      />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm uppercase tracking-widest text-ink-faint">
              Niveau
            </span>
            <span className="font-display text-5xl font-extrabold leading-none text-ink">
              {niveau.numero}
            </span>
          </div>
          {niveau.titre && (
            <p className="mt-2 text-ink-muted">{niveau.titre}</p>
          )}
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-extrabold text-amber tabular-nums">
            {stats.pct}%
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {stats.acquises}/{stats.total} acquises
          </div>
        </div>
      </header>
      <ProgressBar pct={stats.pct} className="mb-10 h-2.5" />

      <div className="space-y-8">
        {VOLUMES.map((vol) => {
          const lessons = niveau.lessons
            .filter((l) => l.volume === vol)
            .sort((a, b) => a.numero - b.numero);
          if (lessons.length === 0) return null;
          return (
            <section key={vol}>
              <div className="mb-3 flex items-center gap-3">
                <h2
                  className={cn(
                    "font-mono text-sm font-semibold uppercase tracking-widest",
                    VOLUME_COLOR[vol],
                  )}
                >
                  Volume {vol}
                </h2>
                <span className="font-mono text-xs text-ink-faint">
                  {lessons.length} leçons
                </span>
                <div className="h-px flex-1 bg-line-soft" />
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-panel/60">
                {lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    onOpen={onOpenLesson}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
