import { Film, Music3 } from "lucide-react";
import type { Lesson } from "@/content/types";
import { minutesForLesson } from "@/lib/agenda";
import { formatDuree } from "@/lib/dates";
import { estAcquise } from "@/lib/statut";
import { cn } from "@/lib/utils";
import { useLessonProgress, useSessions } from "@/progress/store";
import { StatutBadge } from "./StatutControl";

interface Props {
  lesson: Lesson;
  onOpen: (id: string) => void;
}

/** Ligne de leçon dans la vue niveau. */
export function LessonRow({ lesson, onOpen }: Props) {
  const progress = useLessonProgress(lesson.id);
  const acquise = estAcquise(progress.statut);
  const nbRythmes = progress.rythmes.length;
  const minutes = minutesForLesson(useSessions(), lesson.id);

  // Tempo le plus bas et le plus haut atteints, tous rythmes confondus.
  const bpms = progress.rythmes.flatMap((r) => (r.bpm ? [r.bpm] : []));
  const bpmMin = bpms.length > 0 ? Math.min(...bpms) : null;
  const bpmMax = bpms.length > 0 ? Math.max(...bpms) : null;

  return (
    <button
      type="button"
      onClick={() => onOpen(lesson.id)}
      className={cn(
        "group flex w-full items-center gap-4 border-b border-line-soft px-4 py-3 text-left transition-colors last:border-b-0 hover-row",
        acquise && "opacity-80",
      )}
    >
      <span className="w-12 shrink-0 font-mono text-sm text-ink-faint tabular-nums">
        {lesson.id}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm text-ink">
        {progress.titre || lesson.titre || lesson.consignes.objectifs || "—"}
      </span>

      <span className="flex shrink-0 items-center gap-3 text-ink-faint">
        {lesson.hasVideo && <Film className="h-3.5 w-3.5" />}
        {lesson.hasBT && <Music3 className="h-3.5 w-3.5" />}
      </span>

      <span className="w-20 shrink-0 text-right font-mono text-xs text-ink-faint tabular-nums">
        {nbRythmes > 0 ? `${nbRythmes} rythme${nbRythmes > 1 ? "s" : ""}` : ""}
      </span>

      <span
        className="w-28 shrink-0 text-right font-mono text-xs text-ink-muted tabular-nums"
        title="Tempo le plus bas et le plus haut atteints sur la leçon"
      >
        {bpmMin !== null && (
          <>
            {bpmMin === bpmMax ? bpmMin : `${bpmMin}–${bpmMax}`}
            <span className="ml-1 text-ink-faint">BPM</span>
          </>
        )}
      </span>

      <span
        className="w-16 shrink-0 text-right font-mono text-xs text-ink-muted tabular-nums"
        title="Temps total passé sur la leçon"
      >
        {minutes > 0 ? formatDuree(minutes) : ""}
      </span>

      <span className="w-24 shrink-0 text-right">
        <StatutBadge statut={progress.statut} />
      </span>
    </button>
  );
}
