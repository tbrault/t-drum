import { Film, Music3 } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PracticePanel } from "@/components/PracticePanel";
import { RythmeList } from "@/components/RythmeList";
import { StatutControl } from "@/components/StatutControl";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VolumeTag } from "@/components/VolumeTag";
import { getLesson, posterRelPath, videoRelPath } from "@/content";
import type { Consignes } from "@/content/types";
import { daysUntilDue, isDue } from "@/lib/revision";
import { progressStore, useLessonProgress } from "@/progress/store";

interface Props {
  lessonId: string;
  onDashboard: () => void;
  onNiveau: (niveauNumero: number) => void;
}

const FIELDS: { key: keyof Consignes; label: string }[] = [
  { key: "partitions", label: "Partitions" },
  { key: "echauffement", label: "Échauffement" },
  { key: "objectifs", label: "Objectifs" },
  { key: "notes", label: "Notes" },
];

export function LessonView({ lessonId, onDashboard, onNiveau }: Props) {
  const lesson = getLesson(lessonId);
  const progress = useLessonProgress(lessonId);
  if (!lesson) return null;

  const { consignes } = lesson;
  const set = (patch: Parameters<typeof progressStore.set>[1]) =>
    progressStore.set(lessonId, patch);

  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Tableau de bord", onClick: onDashboard },
          {
            label: `Niveau ${lesson.niveau}`,
            onClick: () => onNiveau(lesson.niveau),
          },
          { label: lesson.id },
        ]}
      />

      <header className="mb-8 flex flex-wrap items-center gap-4">
        <span className="font-display text-5xl font-extrabold leading-none text-ink">
          {lesson.id}
        </span>
        <VolumeTag volume={lesson.volume} />
        <span className="flex items-center gap-3 text-ink-faint">
          {lesson.hasVideo && <Film className="h-4 w-4" />}
          {lesson.hasBT && <Music3 className="h-4 w-4" />}
        </span>
        {isDue(progress) && (
          <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber">
            À réviser
          </span>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Colonne contenu */}
        <div className="space-y-6">
          <VideoPlayer
            videoRel={videoRelPath(lesson)}
            posterRel={posterRelPath(lesson)}
          />

          {consignes.tempoCible && (
            <div className="flex items-center justify-between rounded-xl border border-amber/30 bg-amber/5 px-5 py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-dim">
                Tempo cible
              </span>
              <span className="font-mono text-lg text-amber tabular-nums">
                {consignes.tempoCible.min}–{consignes.tempoCible.max}{" "}
                <span className="text-sm text-amber-dim">BPM</span>
              </span>
            </div>
          )}

          <div className="space-y-5 rounded-xl border border-line bg-panel/60 p-6">
            {FIELDS.map(({ key, label }) => {
              const value = consignes[key];
              if (!value) return null;
              return (
                <div key={key}>
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-dim">
                    {label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {value as string}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Console de progression */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-6 rounded-xl border border-line bg-panel/80 p-6 backdrop-blur">
            <Field label="Statut">
              <StatutControl
                value={progress.statut}
                onChange={(statut) => progressStore.setStatut(lessonId, statut)}
              />
              {progress.statut === "acquise" &&
                (() => {
                  const d = daysUntilDue(progress);
                  if (d === null) return null;
                  return (
                    <p className="mt-2 font-mono text-[11px] text-ink-faint">
                      {d > 0
                        ? `Prochaine révision dans ${d} j`
                        : d === 0
                          ? "À réviser aujourd'hui"
                          : `Révision en retard de ${-d} j`}
                    </p>
                  );
                })()}
            </Field>

            <Field label="Rythmes & tempos">
              <RythmeList lessonId={lessonId} rythmes={progress.rythmes} />
            </Field>

            <Field label="Pratique">
              <PracticePanel lessonId={lessonId} />
            </Field>

            <Field label="Notes perso">
              <textarea
                value={progress.notes ?? ""}
                onChange={(e) => set({ notes: e.target.value })}
                rows={4}
                placeholder="Difficultés, déclics, rappels…"
                className="w-full resize-none rounded-lg border border-line bg-base px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-amber/60 focus:outline-none"
              />
            </Field>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
        {label}
      </div>
      {children}
    </div>
  );
}
