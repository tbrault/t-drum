import { Minus, Play, Plus, Square, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  arreter,
  demarrer,
  modifier,
  ORDRE_STYLES,
  planPour,
  type Reglages,
  STYLES,
  type StyleAccompagnement,
  structure,
  type TypeMesure,
  tonaliteDe,
  totalMesures,
} from "@/lib/accompagnement";
import { cn } from "@/lib/utils";
import { progressStore } from "@/progress/store";
import type { Rythme } from "@/progress/types";

interface Props {
  lessonId: string;
  rythme: Rythme;
  /** Style proposé si le rythme n'en a pas encore. */
  styleDefaut: StyleAccompagnement;
  /** Tempo de départ si le rythme n'a pas encore de BPM. */
  bpmDefaut: number;
  /** Mesures comptées sur la partition du rythme, s'il en a une. */
  mesuresPartition: number | null;
  /** Structure lue sur la partition (« G%%G|GG%G »), si elle a pu l'être. */
  planPartition: string | null;
  onFermer: () => void;
}

const BPM_MIN = 30;
const BPM_MAX = 260;

const LABEL =
  "font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint";
const BASCULE =
  "rounded-md px-2.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors";

/**
 * Lecteur d'accompagnement, collé en bas de l'écran : joue basse et accords
 * dans un style, au tempo choisi, pour travailler un rythme en musique.
 */
export function AccompagnementBar({
  lessonId,
  rythme,
  styleDefaut,
  bpmDefaut,
  mesuresPartition,
  planPartition,
  onFermer,
}: Props) {
  const [lecture, setLecture] = useState(false);
  const [reglages, setReglages] = useState<Reglages>(() => {
    // Longueur et structure corrigées à la main, sinon lues sur la partition.
    const mesures =
      rythme.accompagnement?.mesures !== undefined
        ? rythme.accompagnement.mesures
        : mesuresPartition;
    return {
      style: rythme.accompagnement?.style ?? styleDefaut,
      bpm: Math.min(
        BPM_MAX,
        Math.max(
          BPM_MIN,
          rythme.bpm && rythme.bpm > 0 ? rythme.bpm : bpmDefaut,
        ),
      ),
      decompte: true,
      clic: false,
      volume: 1,
      // Chaque morceau a sa propre musique, tirée de son nom et de sa page.
      graine: `${rythme.libelle}|${rythme.partition?.source ?? ""}|${rythme.partition?.page ?? ""}`,
      plan: planPour(rythme.accompagnement?.plan ?? planPartition, mesures),
      mesures,
    };
  });
  const plan = planPour(reglages.plan, reglages.mesures);

  const changer = (patch: Partial<Reglages>) => {
    const suivants = { ...reglages, ...patch };
    setReglages(suivants);
    if (lecture) modifier(suivants);
    if (
      patch.style !== undefined ||
      patch.mesures !== undefined ||
      patch.plan !== undefined
    ) {
      progressStore.updateRythme(lessonId, rythme.id, {
        accompagnement: {
          ...rythme.accompagnement,
          ...(patch.style !== undefined && { style: patch.style }),
          ...(patch.mesures !== undefined && { mesures: patch.mesures }),
          ...(patch.plan && { plan: patch.plan }),
        },
      });
    }
  };
  // Changer la longueur ajoute des grooves à la fin, ou retire les dernières.
  const longueur = (mesures: number | null) =>
    changer({ mesures, plan: planPour(reglages.plan, mesures) });

  // Un clic sur une mesure de la structure la fait tourner :
  // groove → break → mesure répétée → groove.
  const SUIVANT: Record<TypeMesure, TypeMesure> = { G: "F", F: "%", "%": "G" };
  function basculerMesure(index: number) {
    let i = -1;
    const nouveau = [...plan]
      .map((c) =>
        c === "|" ? c : ++i === index ? SUIVANT[c as TypeMesure] : c,
      )
      .join("");
    changer({ plan: nouveau });
  }
  const tempo = (bpm: number) =>
    changer({ bpm: Math.min(BPM_MAX, Math.max(BPM_MIN, bpm)) });

  async function basculer() {
    if (lecture) {
      arreter();
      setLecture(false);
    } else {
      await demarrer(reglages, () => setLecture(false));
      setLecture(true);
    }
  }

  // La musique s'arrête quand on ferme le lecteur ou qu'on quitte la leçon.
  useEffect(() => () => arreter(), []);

  const tempoNote = rythme.bpm ?? 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-panel/95 shadow-[0_-12px_30px_-14px_rgb(0_0_0/0.8)] backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-3 px-8 py-3">
        <button
          type="button"
          onClick={basculer}
          aria-label={
            lecture ? "Arrêter l'accompagnement" : "Jouer l'accompagnement"
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-ground transition-colors hover:bg-accent-bright"
        >
          {lecture ? (
            <Square className="h-4 w-4 fill-current" />
          ) : (
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          )}
        </button>

        <div className="min-w-0">
          <div className={LABEL}>Accompagnement</div>
          <div className="truncate font-semibold text-ink">
            {rythme.libelle || "Rythme sans nom"}
          </div>
          <Structure lignes={structure(plan)} onBasculer={basculerMesure} />
        </div>

        <label className="flex items-center gap-2">
          <span className={LABEL}>Style</span>
          <select
            value={reglages.style}
            onChange={(e) =>
              changer({ style: e.target.value as StyleAccompagnement })
            }
            className="well rounded-md border border-transparent px-2.5 py-1.5 text-sm text-ink focus:border-accent/60 focus:outline-none"
          >
            {ORDRE_STYLES.map((s) => (
              <option key={s} value={s}>
                {STYLES[s].libelle}
              </option>
            ))}
          </select>
          <span
            title="Tonalité du morceau, propre à ce rythme"
            className="font-mono text-xs text-ink-muted"
          >
            en {tonaliteDe(reglages.style, reglages.graine)}
          </span>
        </label>

        {/* Tempo : réglable pendant la lecture */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Baisser le tempo de l'accompagnement"
            onClick={() => tempo(reglages.bpm - 5)}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-raised text-ink-muted transition-colors hover:bg-line hover:text-accent"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[4.5rem] text-center font-mono text-lg text-ink tabular-nums">
            {reglages.bpm}
            <span className="ml-1 text-xs text-ink-faint">bpm</span>
          </span>
          <button
            type="button"
            aria-label="Monter le tempo de l'accompagnement"
            onClick={() => tempo(reglages.bpm + 5)}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-raised text-ink-muted transition-colors hover:bg-line hover:text-accent"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          {reglages.bpm !== tempoNote && (
            <button
              type="button"
              title="Enregistrer ce tempo comme tempo atteint du rythme"
              onClick={() =>
                progressStore.updateRythme(lessonId, rythme.id, {
                  bpm: reglages.bpm,
                })
              }
              className="rounded-md px-2 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:bg-hover hover:text-accent"
            >
              Noter ce tempo
            </button>
          )}
        </div>

        {/* Longueur : le morceau entier, ou une boucle sans fin */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-pressed={reglages.mesures === null}
            title="Rejouer la grille sans fin"
            onClick={() =>
              longueur(reglages.mesures === null ? totalMesures(plan) : null)
            }
            className={cn(
              BASCULE,
              reglages.mesures === null
                ? "bg-accent/15 text-accent"
                : "text-ink-muted hover:bg-hover hover:text-ink",
            )}
          >
            Boucle
          </button>
          {reglages.mesures !== null && (
            <>
              <button
                type="button"
                aria-label="Une mesure de moins"
                onClick={() =>
                  longueur(Math.max(1, (reglages.mesures ?? 1) - 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-md bg-raised text-ink-muted transition-colors hover:bg-line hover:text-accent"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span
                title={
                  mesuresPartition !== null
                    ? `${mesuresPartition} mesures comptées sur la partition`
                    : undefined
                }
                className="min-w-[4.5rem] text-center font-mono text-sm text-ink tabular-nums"
              >
                {reglages.mesures} mes.
              </span>
              <button
                type="button"
                aria-label="Une mesure de plus"
                onClick={() =>
                  longueur(Math.min(256, (reglages.mesures ?? 0) + 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-md bg-raised text-ink-muted transition-colors hover:bg-line hover:text-accent"
              >
                <Plus className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-pressed={reglages.decompte}
            title="Une mesure de clics avant la musique"
            onClick={() => changer({ decompte: !reglages.decompte })}
            className={cn(
              BASCULE,
              reglages.decompte
                ? "bg-accent/15 text-accent"
                : "text-ink-muted hover:bg-hover hover:text-ink",
            )}
          >
            Décompte
          </button>
          <button
            type="button"
            aria-pressed={reglages.clic}
            title="Clic de métronome sur chaque temps"
            onClick={() => changer({ clic: !reglages.clic })}
            className={cn(
              BASCULE,
              reglages.clic
                ? "bg-accent/15 text-accent"
                : "text-ink-muted hover:bg-hover hover:text-ink",
            )}
          >
            Clic
          </button>
        </div>

        <label className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-ink-faint" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={reglages.volume}
            aria-label="Volume"
            onChange={(e) => changer({ volume: Number(e.target.value) })}
            className="w-24 accent-[var(--color-accent)]"
          />
        </label>

        <button
          type="button"
          aria-label="Fermer l'accompagnement"
          onClick={onFermer}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-raised text-ink-muted transition-colors hover:bg-line hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const COULEUR_MESURE: Record<TypeMesure, string> = {
  G: "bg-ink-faint/70 hover:bg-ink-faint",
  "%": "bg-ink-faint/30 hover:bg-ink-faint/50",
  F: "bg-accent hover:bg-accent-bright",
};
const NOM_MESURE: Record<TypeMesure, string> = {
  G: "groove",
  "%": "mesure répétée",
  F: "break",
};

/**
 * Structure du morceau en petits blocs, une ligne de partition par groupe :
 * groove, mesure répétée (%), break. Un clic sur un bloc change sa mesure.
 */
function Structure({
  lignes,
  onBasculer,
}: {
  lignes: TypeMesure[][];
  onBasculer: (index: number) => void;
}) {
  let index = 0;
  return (
    <div className="mt-1 flex flex-wrap items-center gap-1.5">
      {lignes.map((ligne, l) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: une ligne n'a pas d'autre identité que sa place
        <span key={l} className="flex gap-0.5">
          {ligne.map((type) => {
            const i = index++;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Mesure ${i + 1} : ${NOM_MESURE[type]}`}
                title={`Mesure ${i + 1} : ${NOM_MESURE[type]} (clic pour changer)`}
                onClick={() => onBasculer(i)}
                className={`h-3.5 w-3.5 rounded-[3px] transition-colors ${COULEUR_MESURE[type]}`}
              />
            );
          })}
        </span>
      ))}
    </div>
  );
}
