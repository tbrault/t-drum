import { ChevronRight, Eye, EyeOff, Film, Music3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EditableTitle } from "@/components/EditableTitle";
import { PartitionViewer } from "@/components/PartitionViewer";
import { RythmeList } from "@/components/RythmeList";
import { SessionBar } from "@/components/SessionBar";
import { StatutControl, StatutPill } from "@/components/StatutControl";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VolumeTag } from "@/components/VolumeTag";
import { getLesson, posterRelPath, videoRelPath } from "@/content";
import {
  libellePage,
  type PagePartition,
  pagesDeLecon,
  ratioPage,
} from "@/content/partitions";
import type { Consignes, TempoCible } from "@/content/types";
import { useUrlPage } from "@/lib/partitions";
import { daysUntilDue, isDue } from "@/lib/revision";
import { rythmesAuTempo } from "@/lib/statut";
import { cn } from "@/lib/utils";
import { progressStore, useLessonProgress } from "@/progress/store";
import type { LessonProgress, Rythme } from "@/progress/types";

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
  "font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint";

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
  const [afficherPartitions, setAfficherPartitions] = usePreference(
    "t-drum-afficher-partitions",
    true,
  );
  // Partition ouverte en grand : une page, et éventuellement le rythme dont
  // on choisit l'exercice.
  const [visionneuse, setVisionneuse] = useState<{
    depart: PagePartition;
    rythmeId?: string;
  } | null>(null);
  if (!lesson) return null;
  const pagesLecon = pagesDeLecon(lesson);

  /** Ouvre la partition pour choisir l'exercice d'un rythme. */
  function choisirPartition(rythme: Rythme) {
    const depart = rythme.partition ?? pagesLecon[0];
    if (depart) setVisionneuse({ depart, rythmeId: rythme.id });
  }

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
              <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">
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
            <h2 className="font-display text-xl font-extrabold text-ink">
              Rythmes, binaires et solos
            </h2>
            <div className="flex items-center gap-4">
              {progress.rythmes.some((r) => r.partition) && (
                <button
                  type="button"
                  onClick={() => setAfficherPartitions(!afficherPartitions)}
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:bg-hover hover:text-accent"
                >
                  {afficherPartitions ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  {afficherPartitions
                    ? "Masquer les partitions"
                    : "Afficher les partitions"}
                </button>
              )}
              <span className="font-mono text-xs text-ink-muted tabular-nums">
                {nbRythmes > 0 &&
                  `${nbRythmes} rythme${nbRythmes > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
          <RythmeList
            lessonId={lessonId}
            rythmes={progress.rythmes}
            parties={progress.parties}
            tempoCible={consignes.tempoCible}
            afficherPartitions={afficherPartitions}
            onChoisirPartition={choisirPartition}
          />
        </section>

        {/* La leçon et les notes : sous la barre, toujours à l'écran */}
        <aside
          ref={colonne}
          // En plein écran, la colonne passe devant la barre de séance : sans
          // ça, la vidéo resterait prisonnière du niveau de la colonne.
          className="order-1 has-[[data-fullscreen]]:z-[100] md:sticky md:z-10 md:order-2 md:self-start"
        >
          {/* Même hauteur que le titre « Rythmes » : les deux colonnes démarrent alignées. */}
          <h2 className="mb-4 font-display text-xl font-extrabold text-ink">
            Leçon
          </h2>
          <div className="space-y-5">
            <VideoPlayer
              videoRel={videoRelPath(lesson)}
              posterRel={posterRelPath(lesson)}
            />

            {pagesLecon.length > 0 && (
              <PagesPartition
                pages={pagesLecon}
                onOuvrir={(depart) => setVisionneuse({ depart })}
              />
            )}

            <div className="card rounded-xl">
              <button
                type="button"
                aria-expanded={consignesOuvertes}
                onClick={() => setConsignesOuvertes((on) => !on)}
                className={cn(
                  LABEL,
                  "flex w-full items-center gap-2 px-5 py-3.5 text-left transition-colors hover:text-accent",
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
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-dim">
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

            <div className="card rounded-xl px-5 py-4">
              <label htmlFor="notes-perso" className={cn(LABEL, "mb-2 block")}>
                Notes perso
              </label>
              <textarea
                id="notes-perso"
                value={progress.notes ?? ""}
                onChange={(e) => set({ notes: e.target.value })}
                rows={6}
                className="well w-full resize-y rounded-lg border border-transparent px-3 py-2 text-sm leading-relaxed text-ink focus:border-accent/60 focus:outline-none"
              />
            </div>
          </div>
        </aside>
      </div>

      {visionneuse && (
        <PartitionViewer
          lessonId={lessonId}
          rythmes={progress.rythmes}
          depart={visionneuse.depart}
          pagesLecon={pagesLecon}
          choisirPour={progress.rythmes.find(
            (r) => r.id === visionneuse.rythmeId,
          )}
          onClose={() => setVisionneuse(null)}
        />
      )}
    </div>
  );
}

/** Pages de partition de la leçon, en vignettes ; un clic ouvre la page. */
function PagesPartition({
  pages,
  onOuvrir,
}: {
  pages: PagePartition[];
  onOuvrir: (page: PagePartition) => void;
}) {
  const urlPage = useUrlPage();
  return (
    <div className="card rounded-xl px-5 py-4">
      <div className={cn(LABEL, "mb-3")}>Partition</div>
      <div className="grid grid-cols-3 gap-3">
        {pages.map((p) => (
          <button
            key={`${p.source}-${p.page}`}
            type="button"
            onClick={() => onOuvrir(p)}
            title={`Ouvrir ${libellePage(p)}`}
            className="group text-left"
          >
            <div
              style={{ aspectRatio: 1 / ratioPage(p.source) }}
              className="overflow-hidden rounded-md bg-white transition-shadow group-hover:shadow-[0_0_0_2px_var(--color-accent)]"
            >
              {urlPage && (
                <img
                  src={urlPage(p)}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="mt-1.5 font-mono text-xs text-ink-muted group-hover:text-accent">
              {p.source === "annexes" ? "Annexes" : `p. ${p.page}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Réglage d'affichage propre à cet ordinateur, gardé dans le navigateur. Il
 * reprend sa valeur par défaut si le stockage est indisponible.
 */
function usePreference(cle: string, defaut: boolean) {
  const [valeur, setValeur] = useState(() => {
    try {
      const v = localStorage.getItem(cle);
      return v === null ? defaut : v === "1";
    } catch {
      return defaut;
    }
  });
  const changer = (v: boolean) => {
    setValeur(v);
    try {
      localStorage.setItem(cle, v ? "1" : "0");
    } catch {
      /* stockage indisponible : le réglage vaut pour la séance */
    }
  };
  return [valeur, changer] as const;
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
      <p className="font-mono text-xs text-ink-faint">
        {cible
          ? prochaineEtape(progress, cible)
          : "Pas de tempo cible : statut à choisir"}
      </p>
      {jours !== null && (
        <p className="font-mono text-xs text-ink-faint">
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
