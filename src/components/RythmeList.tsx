import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  type Modifier,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  GripVertical,
  ListPlus,
  Minus,
  Plus,
  Scissors,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { TempoCible } from "@/content/types";
import { MAITRISE_NIVEAUX, STATUTS } from "@/lib/meta";
import { cn } from "@/lib/utils";
import { progressStore } from "@/progress/store";
import type { Partie, Rythme } from "@/progress/types";
import { EditableTitle } from "./EditableTitle";
import { MaitriseStars } from "./MaitriseStars";

interface Props {
  lessonId: string;
  rythmes: Rythme[];
  parties?: Partie[];
  /** Sert à signaler les rythmes qui ont atteint le tempo minimal. */
  tempoCible?: TempoCible;
}

/**
 * Une ligne de la liste. Une partie s'affiche comme une carte, faite de trois
 * sortes de lignes empilées : son en-tête, ses rythmes, puis son pied.
 */
type Item =
  | {
      kind: "entete";
      id: string;
      partie: Partie;
      count: number;
      rang: number;
      total: number;
    }
  | { kind: "pied"; id: string; partie: Partie; vide: boolean }
  | {
      kind: "rythme";
      id: string;
      rythme: Rythme;
      dansPartie: boolean;
      /** Faux pour le premier rythme d'une partie : rien à couper avant lui. */
      coupable: boolean;
    };

/** Le glisser-déposer reste vertical : la carte ne part pas sur les côtés. */
const verticalOnly: Modifier = ({ transform }) => ({ ...transform, x: 0 });

const ICON_BTN =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-raised";
const ADD_BTN =
  "inline-flex items-center gap-2 rounded-lg bg-raised px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:bg-line hover:text-accent";

/**
 * Liste éditable des rythmes d'une leçon (libellé + BPM + maîtrise), rangés
 * dans des parties repliables. Un rythme se déplace par glisser-déposer, y
 * compris d'une partie à l'autre : il appartient à la partie dont l'en-tête
 * est au-dessus de lui.
 */
export function RythmeList({
  lessonId,
  rythmes,
  parties = [],
  tempoCible,
}: Props) {
  // Élément qu'on vient de créer : son champ de nom s'ouvre tout seul.
  const [nouveau, setNouveau] = useState<string | null>(null);
  const ajouterRythme = (partieId?: string) =>
    setNouveau(progressStore.addRythme(lessonId, partieId));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Liste à plat, de haut en bas : rythmes hors partie, puis chaque partie
  // (en-tête, rythmes sauf si elle est repliée, pied).
  const connues = new Set(parties.map((p) => p.id));
  const items: Item[] = [
    ...rythmes
      .filter((r) => !r.partieId || !connues.has(r.partieId))
      .map(
        (rythme): Item => ({
          kind: "rythme",
          id: rythme.id,
          rythme,
          dansPartie: false,
          coupable: true,
        }),
      ),
    ...parties.flatMap((partie, rang): Item[] => {
      const siens = rythmes.filter((r) => r.partieId === partie.id);
      const entete: Item = {
        kind: "entete",
        id: partie.id,
        partie,
        count: siens.length,
        rang,
        total: parties.length,
      };
      if (partie.repliee) return [entete];
      return [
        entete,
        ...siens.map(
          (rythme, i): Item => ({
            kind: "rythme",
            id: rythme.id,
            rythme,
            dansPartie: true,
            coupable: i > 0,
          }),
        ),
        {
          kind: "pied",
          id: `${partie.id}:pied`,
          partie,
          vide: siens.length === 0,
        },
      ];
    }),
  ];

  function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const ids = items.map((item) => item.id);
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    progressStore.reorder(lessonId, arrayMove(ids, from, to));
  }

  return (
    <div>
      {items.length === 0 && (
        <p className="mb-4 text-sm text-ink-muted">
          Aucun rythme pour l'instant. Ajoute tous les rythmes de la partition
          dès le début : le statut de la leçon se calcule à partir d'eux.
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[verticalOnly]}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, i) => {
            if (item.kind === "entete") {
              return (
                <PartieEntete
                  key={item.id}
                  lessonId={lessonId}
                  item={item}
                  premier={i === 0}
                  saisir={item.id === nouveau}
                />
              );
            }
            if (item.kind === "pied") {
              return (
                <PartiePied
                  key={item.id}
                  item={item}
                  onAjouter={() => ajouterRythme(item.partie.id)}
                />
              );
            }
            return (
              <RythmeRow
                key={item.id}
                lessonId={lessonId}
                item={item}
                premier={i === 0}
                tempoCible={tempoCible}
                saisir={item.id === nouveau}
                onCouper={() =>
                  setNouveau(progressStore.splitPartie(lessonId, item.id))
                }
              />
            );
          })}
        </SortableContext>
      </DndContext>

      <div className={cn("flex flex-wrap gap-2", items.length > 0 && "mt-5")}>
        {/* Avec des parties, on ajoute un rythme depuis le pied de sa partie. */}
        {parties.length === 0 && (
          <button
            type="button"
            onClick={() => ajouterRythme()}
            className={ADD_BTN}
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter un rythme
          </button>
        )}
        <button
          type="button"
          onClick={() => setNouveau(progressStore.addPartie(lessonId))}
          className={ADD_BTN}
        >
          <ListPlus className="h-3.5 w-3.5" /> Ajouter une partie
        </button>
      </div>
    </div>
  );
}

/** En-tête d'une carte de partie : repli, nom, ordre et suppression. */
function PartieEntete({
  lessonId,
  item,
  premier,
  saisir,
}: {
  lessonId: string;
  item: Extract<Item, { kind: "entete" }>;
  premier: boolean;
  /** Vrai juste après la création : le nom est prêt à être saisi. */
  saisir: boolean;
}) {
  const { partie, count, rang, total } = item;
  const update = (patch: Partial<Omit<Partie, "id">>) =>
    progressStore.updatePartie(lessonId, partie.id, patch);
  // Ne se saisit pas, mais se décale pour laisser passer un rythme.
  const { setNodeRef, transform, transition } = useSortable({
    id: item.id,
    disabled: { draggable: true },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 bg-raised px-3 py-2.5",
        partie.repliee ? "rounded-xl" : "rounded-t-xl",
        !premier && "mt-5",
      )}
    >
      <button
        type="button"
        aria-label={partie.repliee ? "Déplier la partie" : "Replier la partie"}
        aria-expanded={!partie.repliee}
        onClick={() => update({ repliee: !partie.repliee })}
        className={cn(ICON_BTN, "hover:text-accent")}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform",
            !partie.repliee && "rotate-90",
          )}
        />
      </button>

      <div className="min-w-0 flex-1">
        <EditableTitle
          value={partie.titre}
          autoEdit={saisir}
          onSave={(titre) => update({ titre })}
          className="font-display text-base font-semibold text-ink [&>span]:truncate"
        />
      </div>

      <span className="shrink-0 px-2 font-mono text-xs text-ink-muted tabular-nums">
        {count} rythme{count > 1 ? "s" : ""}
      </span>

      {rang > 0 && (
        <button
          type="button"
          aria-label="Monter la partie"
          title="Monter la partie"
          onClick={() => progressStore.movePartie(lessonId, partie.id, -1)}
          className={cn(ICON_BTN, "hover:text-accent")}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      {rang < total - 1 && (
        <button
          type="button"
          aria-label="Descendre la partie"
          title="Descendre la partie"
          onClick={() => progressStore.movePartie(lessonId, partie.id, 1)}
          className={cn(ICON_BTN, "hover:text-accent")}
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        aria-label="Supprimer la partie"
        title="Supprimer la partie (ses rythmes sont gardés)"
        onClick={() => progressStore.removePartie(lessonId, partie.id)}
        className={cn(ICON_BTN, "hover:text-danger")}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Pied d'une carte de partie : ferme la carte et ajoute un rythme dedans. */
function PartiePied({
  item,
  onAjouter,
}: {
  item: Extract<Item, { kind: "pied" }>;
  onAjouter: () => void;
}) {
  const { setNodeRef, transform, transition } = useSortable({
    id: item.id,
    disabled: { draggable: true },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className="flex flex-wrap items-center gap-3 rounded-b-xl bg-panel px-4 py-3"
    >
      <button type="button" onClick={onAjouter} className={ADD_BTN}>
        <Plus className="h-3.5 w-3.5" /> Ajouter un rythme
      </button>
      {item.vide && (
        <span className="text-sm text-ink-faint">
          Partie vide : ajoute un rythme ou glisses-en un ici.
        </span>
      )}
    </div>
  );
}

function RythmeRow({
  lessonId,
  item,
  premier,
  tempoCible,
  saisir,
  onCouper,
}: {
  lessonId: string;
  item: Extract<Item, { kind: "rythme" }>;
  premier: boolean;
  tempoCible?: TempoCible;
  /** Vrai juste après la création : le nom est prêt à être saisi. */
  saisir: boolean;
  onCouper: () => void;
}) {
  const { rythme, dansPartie, coupable } = item;
  const update = (patch: Partial<Omit<Rythme, "id">>) =>
    progressStore.updateRythme(lessonId, rythme.id, patch);
  const bpm = rythme.bpm ?? 0;
  const palier = palierTempo(bpm, tempoCible);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rythme.id });

  return (
    // L'enveloppe prolonge la carte de la partie ; la ligne est à l'intérieur.
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        dansPartie ? "bg-panel px-4 pt-3" : !premier && "pt-3",
        isDragging && "relative z-10",
      )}
    >
      <div
        className={cn(
          "group/rythme flex flex-wrap items-center gap-x-4 gap-y-3 rounded-lg px-3 py-3.5",
          dansPartie ? "bg-ground" : "card",
          isDragging && "outline-1 outline-accent/70",
        )}
      >
        <div className="flex min-w-[11rem] flex-1 items-center gap-2">
          <button
            type="button"
            ref={setActivatorNodeRef}
            aria-label="Déplacer ce rythme"
            className={cn(
              ICON_BTN,
              "w-6 touch-none hover:text-accent",
              isDragging ? "cursor-grabbing text-accent" : "cursor-grab",
            )}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          {/* Le champ garde un fond visible : on voit où écrire, même vide. */}
          <input
            // biome-ignore lint/a11y/noAutofocus: seulement sur le rythme qu'on vient d'ajouter
            autoFocus={saisir}
            value={rythme.libelle}
            onChange={(e) => update({ libelle: e.target.value })}
            aria-label="Nom du rythme"
            className="min-w-0 flex-1 rounded-md border border-transparent bg-raised/70 px-2.5 py-1.5 font-semibold text-ink hover:bg-raised focus:border-accent/60 focus:bg-raised focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {/* BPM */}
          <div className="flex items-center gap-2">
            <StepBtn
              label="Baisser le tempo de 5"
              onClick={() => update({ bpm: Math.max(0, bpm - 5) })}
            >
              <Minus className="h-3.5 w-3.5" />
            </StepBtn>
            <span
              title={palier.titre}
              className={cn(
                "min-w-[4.25rem] text-center font-mono text-base tabular-nums",
                palier.couleur,
              )}
            >
              {bpm}
              <span className="ml-1 text-xs text-ink-faint">bpm</span>
            </span>
            <StepBtn
              label="Monter le tempo de 5"
              onClick={() => update({ bpm: bpm + 5 })}
            >
              <Plus className="h-3.5 w-3.5" />
            </StepBtn>
          </div>

          {/* Maîtrise */}
          <div className="flex w-[16.5rem] items-center gap-3">
            <MaitriseStars
              value={rythme.maitrise}
              onChange={(maitrise) => update({ maitrise })}
            />
            <span className="truncate font-mono text-xs text-ink-muted">
              {MAITRISE_NIVEAUX[rythme.maitrise]}
            </span>
          </div>

          {/* Largeur fixe : les colonnes restent alignées d'une ligne à l'autre. */}
          <div className="flex w-16 items-center justify-end">
            {coupable && (
              <button
                type="button"
                aria-label="Couper ici en une nouvelle partie"
                title="Couper ici : ce rythme et les suivants passent dans une nouvelle partie"
                onClick={onCouper}
                className={cn(
                  ICON_BTN,
                  "opacity-0 hover:text-accent focus-visible:opacity-100 group-hover/rythme:opacity-100",
                )}
              >
                <Scissors className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              aria-label="Supprimer ce rythme"
              onClick={() => progressStore.removeRythme(lessonId, rythme.id)}
              className={cn(ICON_BTN, "hover:text-danger")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Couleur du tempo d'un rythme : celle du statut que la leçon aurait si tous
 * ses rythmes étaient à ce tempo (en cours, validée, maîtrisée).
 */
function palierTempo(
  bpm: number,
  cible?: TempoCible,
): { couleur: string; titre?: string } {
  if (!cible || bpm <= 0) return { couleur: "text-ink" };
  if (bpm >= cible.max)
    return { couleur: STATUTS.maitrisee.color, titre: "Tempo maximal atteint" };
  if (bpm >= cible.min)
    return { couleur: STATUTS.validee.color, titre: "Tempo minimal atteint" };
  return {
    couleur: STATUTS["en-cours"].color,
    titre: "Sous le tempo minimal",
  };
}

function StepBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-raised text-ink-muted transition-colors hover:bg-line hover:text-accent active:scale-95"
    >
      {children}
    </button>
  );
}
