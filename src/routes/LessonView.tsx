import { ChevronRight, Film, Music3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EditableTitle } from "@/components/EditableTitle";
import { RythmeList } from "@/components/RythmeList";
import { SessionBar } from "@/components/SessionBar";
import { StatutControl, StatutPill } from "@/components/StatutControl";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VolumeTag } from "@/components/VolumeTag";
import { getLesson, posterRelPath, videoRelPath } from "@/content";
import type { Consignes, TempoCible } from "@/content/types";
import { daysUntilDue, isDue } from "@/lib/revision";
import { rythmesAuTempo } from "@/lib/statut";
import { cn } from "@/lib/utils";
import { progressStore, useLessonProgress } from "@/progress/store";
import type { LessonProgress } from "@/progress/types";

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

const LABEL =
  "font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-faint";

/**
 * Page d'une leçon. La barre de séance reste en haut ; les rythmes, qu'on
 * manipule en jouant, prennent la grande colonne ; la leçon elle-même (vidéo,
 * consignes) et les notes sont rangées sur le côté.
 */
export function LessonView({ lessonId, onDashboard, onNiveau }: Props) {
  const lesson = getLesson(lessonId);
  const progress = useLessonProgress(lessonId);
  const [consignesOuvertes, setConsignesOuvertes] = useState(true);
  const colonne = useColonneCollante();
  if (!lesson) return null;

  const { consignes } = lesson;
  const nbRythmes = progress.rythmes.length;
  const set = (patch: Parameters<typeof progressStore.set>[1]) =>
    progressStore.set(lessonId, patch);

  return (
    <div className="mx-auto max-w-[1280px] px-8 py-8">
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

      <header className="mb-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-4">
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
          </div>
          <EditableTitle
            value={progress.titre ?? lesson.titre ?? ""}
            // Revenir au titre d'origine (ou tout effacer) retire la personnalisation.
            onSave={(titre) =>
              set({
                titre: titre && titre !== lesson.titre ? titre : undefined,
              })
            }
            className="mt-3 text-ink-muted"
          />
        </div>

        <StatutLecon
          lessonId={lessonId}
          progress={progress}
          cible={consignes.tempoCible}
        />
      </header>

      <SessionBar lessonId={lessonId} tempoCible={consignes.tempoCible} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)]">
        {/* Les rythmes : la zone de travail, seule à défiler */}
        <section className="order-2 md:order-1">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-ink">Rythmes</h2>
            <span className="font-mono text-xs text-ink-muted tabular-nums">
              {nbRythmes > 0 &&
                `${nbRythmes} rythme${nbRythmes > 1 ? "s" : ""}`}
            </span>
          </div>
          <RythmeList
            lessonId={lessonId}
            rythmes={progress.rythmes}
            parties={progress.parties}
            tempoCible={consignes.tempoCible}
          />
        </section>

        {/* La leçon et les notes : sous la barre, toujours à l'écran */}
        <aside
          ref={colonne}
          className="order-1 space-y-5 md:sticky md:z-10 md:order-2 md:self-start"
        >
          <VideoPlayer
            videoRel={videoRelPath(lesson)}
            posterRel={posterRelPath(lesson)}
          />

          <div className="rounded-xl border border-line bg-panel">
            <button
              type="button"
              aria-expanded={consignesOuvertes}
              onClick={() => setConsignesOuvertes((on) => !on)}
              className={cn(
                LABEL,
                "flex w-full items-center gap-2 px-5 py-3.5 text-left transition-colors hover:text-amber",
              )}
            >
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  consignesOuvertes && "rotate-90",
                )}
              />
              Consignes
            </button>
            {consignesOuvertes && (
              <div className="space-y-5 border-t border-line-soft px-5 py-4">
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
            )}
          </div>

          <div className="rounded-xl border border-line bg-panel px-5 py-4">
            <label htmlFor="notes-perso" className={cn(LABEL, "mb-2 block")}>
              Notes perso
            </label>
            <textarea
              id="notes-perso"
              value={progress.notes ?? ""}
              onChange={(e) => set({ notes: e.target.value })}
              rows={6}
              className="w-full resize-y rounded-lg border border-line bg-base px-3 py-2 text-sm leading-relaxed text-ink focus:border-amber/60 focus:outline-none"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Place de la colonne sous la barre de séance, et marge en bas de l'écran. */
const SOUS_LA_BARRE = 128;
const MARGE_BAS = 24;

/**
 * Colonne latérale collante, sans défilement à elle : la page est la seule à
 * défiler. Si la colonne tient à l'écran, elle reste sous la barre de séance ;
 * si elle est plus haute, elle défile avec la page puis se cale par le bas,
 * pour que sa fin (les notes) reste visible.
 */
function useColonneCollante() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const caler = () => {
      const parLeBas = window.innerHeight - el.offsetHeight - MARGE_BAS;
      el.style.top = `${Math.min(SOUS_LA_BARRE, parLeBas)}px`;
    };
    const observer = new ResizeObserver(caler);
    observer.observe(el);
    window.addEventListener("resize", caler);
    caler();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", caler);
    };
  }, []);

  return ref;
}

/**
 * Statut de la leçon. Avec un tempo cible il est calculé, et une ligne dit ce
 * qu'il manque pour le suivant ; sans tempo cible, il se choisit à la main.
 */
function StatutLecon({
  lessonId,
  progress,
  cible,
}: {
  lessonId: string;
  progress: LessonProgress;
  cible?: TempoCible;
}) {
  const jours = daysUntilDue(progress);

  return (
    <div className="flex flex-col items-end gap-2 text-right">
      {cible ? (
        <StatutPill statut={progress.statut} />
      ) : (
        <StatutControl
          value={progress.statut}
          onChange={(statut) => progressStore.setStatut(lessonId, statut)}
        />
      )}
      <p className="font-mono text-[11px] text-ink-faint">
        {cible
          ? prochaineEtape(progress, cible)
          : "Pas de tempo cible : statut à choisir"}
      </p>
      {jours !== null && (
        <p className="font-mono text-[11px] text-ink-faint">
          {jours > 0
            ? `Prochaine révision dans ${jours} j`
            : jours === 0
              ? "À réviser aujourd'hui"
              : `Révision en retard de ${-jours} j`}
        </p>
      )}
    </div>
  );
}

/** Ce qu'il reste à faire pour atteindre le statut suivant. */
function prochaineEtape(progress: LessonProgress, cible: TempoCible): string {
  const { rythmes, statut } = progress;
  const n = rythmes.length;
  if (n === 0) return "Ajoute les rythmes de la leçon";
  if (statut === "maitrisee") return `Tous les rythmes à ${cible.max} BPM`;
  const palier = statut === "validee" ? cible.max : cible.min;
  const suivant = statut === "validee" ? "Maîtrisée" : "Validée";
  return `${suivant} : ${rythmesAuTempo(rythmes, palier)}/${n} rythmes à ${palier} BPM`;
}
