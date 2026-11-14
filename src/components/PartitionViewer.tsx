import { ChevronLeft, ChevronRight, ListPlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  bornesSource,
  libellePage,
  memeZone,
  type PagePartition,
  type Zone,
  zonesDePage,
} from "@/content/partitions";
import { useUrlPage } from "@/lib/partitions";
import { cn } from "@/lib/utils";
import { progressStore } from "@/progress/store";
import type { Rythme } from "@/progress/types";

interface Props {
  lessonId: string;
  rythmes: Rythme[];
  /** Page affichée à l'ouverture. */
  depart: PagePartition;
  /** Pages indiquées par les consignes de la leçon (accès direct). */
  pagesLecon: PagePartition[];
  /** Rythme dont on choisit l'exercice ; absent = simple consultation. */
  choisirPour?: Rythme;
  onClose: () => void;
}

/** Cadre en cours de tracé, en fraction de la page. */
type Trace = { x0: number; y0: number; x1: number; y1: number };

/**
 * Page de partition en plein écran. En consultation, elle montre les
 * exercices repérés et permet de créer d'un coup leurs rythmes. Pour un
 * rythme donné, un clic sur un exercice (ou un cadre tracé à la main) le lui
 * associe.
 */
export function PartitionViewer({
  lessonId,
  rythmes,
  depart,
  pagesLecon,
  choisirPour,
  onClose,
}: Props) {
  const urlPage = useUrlPage();
  const [page, setPage] = useState(depart);
  const [message, setMessage] = useState<string | null>(null);
  const [trace, setTrace] = useState<Trace | null>(null);
  const cadreImage = useRef<HTMLDivElement>(null);
  const [min, max] = bornesSource(page.source);

  const zones = zonesDePage(page);
  const rythmeDe = (zone: Zone) =>
    rythmes.find(
      (r) =>
        r.partition?.source === page.source &&
        r.partition.page === page.page &&
        memeZone(r.partition.zone, zone),
    );
  const libres = zones.filter((z) => !rythmeDe(z)).length;
  // Cadre tracé à la main pour ce rythme (absent des exercices repérés).
  const cadrePerso =
    choisirPour?.partition &&
    choisirPour.partition.source === page.source &&
    choisirPour.partition.page === page.page &&
    !zones.some((z) => memeZone(z, choisirPour.partition?.zone as Zone))
      ? choisirPour.partition.zone
      : null;

  function allerA(numero: number) {
    if (numero < min || numero > max) return;
    setPage({ source: page.source, page: numero });
    setMessage(null);
  }

  function choisir(zone: Zone) {
    if (!choisirPour) return;
    progressStore.setPartition(lessonId, choisirPour.id, {
      ...page,
      zone,
    });
    onClose();
  }

  // Clavier : Échap ferme, flèches changent de page. La page derrière ne
  // défile pas pendant ce temps.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") allerA(page.page - 1);
      if (e.key === "ArrowRight") allerA(page.page + 1);
    };
    window.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = overflow;
    };
  });

  // Tracé d'un cadre à la main (mode choix seulement).
  function position(e: React.PointerEvent) {
    const r = cadreImage.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return {
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    };
  }
  function debutTrace(e: React.PointerEvent) {
    if (!choisirPour || e.target !== e.currentTarget) return;
    const { x, y } = position(e);
    try {
      // Le tracé continue même si le pointeur sort un instant de la page.
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointeur déjà relâché : sans importance */
    }
    setTrace({ x0: x, y0: y, x1: x, y1: y });
  }
  function suiteTrace(e: React.PointerEvent) {
    if (!trace) return;
    const { x, y } = position(e);
    setTrace({ ...trace, x1: x, y1: y });
  }
  function finTrace() {
    if (!trace) return;
    const arrondi = (v: number) => Math.round(v * 10000) / 10000;
    const zone: Zone = [
      arrondi(Math.min(trace.x0, trace.x1)),
      arrondi(Math.min(trace.y0, trace.y1)),
      arrondi(Math.abs(trace.x1 - trace.x0)),
      arrondi(Math.abs(trace.y1 - trace.y0)),
    ];
    setTrace(null);
    // Un simple clic n'est pas un cadre.
    if (zone[2] > 0.03 && zone[3] > 0.015) choisir(zone);
  }

  const style = (z: Zone) => ({
    left: `${z[0] * 100}%`,
    top: `${z[1] * 100}%`,
    width: `${z[2] * 100}%`,
    height: `${z[3] * 100}%`,
  });
  const bouton =
    "flex h-9 items-center gap-2 rounded-lg bg-raised px-3 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:bg-hover hover:text-accent";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-ground/95 backdrop-blur-sm">
      {/* Barre du haut : page, accès direct, navigation, fermeture */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line-soft bg-panel px-5 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Page précédente"
            onClick={() => allerA(page.page - 1)}
            className={cn(bouton, "w-9 justify-center px-0")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[8.5rem] text-center font-mono text-sm text-ink">
            {libellePage(page)}
          </span>
          <button
            type="button"
            aria-label="Page suivante"
            onClick={() => allerA(page.page + 1)}
            className={cn(bouton, "w-9 justify-center px-0")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {pagesLecon.length > 1 && (
          <div className="flex flex-wrap items-center gap-1">
            {pagesLecon.map((p) => {
              const active = p.source === page.source && p.page === page.page;
              return (
                <button
                  key={`${p.source}-${p.page}`}
                  type="button"
                  onClick={() => {
                    setPage(p);
                    setMessage(null);
                  }}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-ink-muted hover:bg-hover hover:text-ink",
                  )}
                >
                  {p.source === "annexes" ? "Annexes" : `p. ${p.page}`}
                </button>
              );
            })}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {choisirPour ? (
            <>
              <span className="text-sm text-ink-muted">
                Exercice de{" "}
                <span className="font-semibold text-ink">
                  {choisirPour.libelle || "ce rythme"}
                </span>{" "}
                : clique un cadre ou trace-le
              </span>
              {choisirPour.partition && (
                <button
                  type="button"
                  onClick={() => {
                    progressStore.setPartition(
                      lessonId,
                      choisirPour.id,
                      undefined,
                    );
                    onClose();
                  }}
                  className={cn(bouton, "hover:text-danger")}
                >
                  Retirer
                </button>
              )}
            </>
          ) : (
            <>
              {message && (
                <span className="text-sm text-ink-muted">{message}</span>
              )}
              {libres > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const n = progressStore.ajouterRythmesDePage(
                      lessonId,
                      page,
                      zones,
                    );
                    setMessage(
                      `${n} rythme${n > 1 ? "s" : ""} créé${n > 1 ? "s" : ""}`,
                    );
                  }}
                  className={cn(
                    bouton,
                    "bg-accent text-ground hover:bg-accent-bright hover:text-ground",
                  )}
                >
                  <ListPlus className="h-4 w-4" /> Créer les rythmes de la page
                  ({libres})
                </button>
              )}
            </>
          )}
          <button
            type="button"
            aria-label="Fermer la partition"
            onClick={onClose}
            className={cn(bouton, "w-9 justify-center px-0")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* La page, avec ses exercices */}
      <div className="flex-1 overflow-auto p-6">
        <div
          ref={cadreImage}
          onPointerDown={debutTrace}
          onPointerMove={suiteTrace}
          onPointerUp={finTrace}
          className={cn(
            "relative mx-auto w-fit touch-none",
            choisirPour && "cursor-crosshair",
          )}
        >
          {urlPage && (
            <img
              src={urlPage(page)}
              alt={libellePage(page)}
              draggable={false}
              className="pointer-events-none block max-h-[calc(100vh-8rem)] w-auto select-none rounded-md bg-white"
            />
          )}

          {zones.map((zone, i) => {
            const lie = rythmeDe(zone);
            const actuel = lie && lie.id === choisirPour?.id;
            return choisirPour ? (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: les zones d'une page ne changent pas
                key={i}
                type="button"
                aria-label={`Exercice ${i + 1}`}
                onClick={() => choisir(zone)}
                style={style(zone)}
                className={cn(
                  "absolute rounded-md border-2 transition-colors",
                  actuel
                    ? "border-accent bg-accent/15"
                    : "border-accent/40 hover:border-accent hover:bg-accent/15",
                )}
              />
            ) : (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: les zones d'une page ne changent pas
                key={i}
                style={style(zone)}
                className={cn(
                  "pointer-events-none absolute rounded-md border-2",
                  lie ? "border-done/70" : "border-dashed border-accent/40",
                )}
              >
                {lie && (
                  <span className="absolute left-1 top-1 max-w-[90%] truncate rounded bg-done px-1.5 py-0.5 font-mono text-xs text-ground">
                    {lie.libelle || "Rythme"}
                  </span>
                )}
              </div>
            );
          })}

          {cadrePerso && (
            <div
              style={style(cadrePerso)}
              className="pointer-events-none absolute rounded-md border-2 border-accent bg-accent/15"
            />
          )}
          {trace && (
            <div
              style={style([
                Math.min(trace.x0, trace.x1),
                Math.min(trace.y0, trace.y1),
                Math.abs(trace.x1 - trace.x0),
                Math.abs(trace.y1 - trace.y0),
              ])}
              className="pointer-events-none absolute rounded-md border-2 border-accent bg-accent/15"
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
