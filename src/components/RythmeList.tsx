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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Minus, Plus, Trash2 } from "lucide-react";
import { MAITRISE_NIVEAUX } from "@/lib/meta";
import { cn } from "@/lib/utils";
import { progressStore } from "@/progress/store";
import type { Rythme } from "@/progress/types";
import { MaitriseStars } from "./MaitriseStars";

interface Props {
  lessonId: string;
  rythmes: Rythme[];
}

/** Le glisser-déposer reste vertical : la carte ne part pas sur les côtés. */
const verticalOnly: Modifier = ({ transform }) => ({ ...transform, x: 0 });

/**
 * Liste éditable des rythmes d'une leçon (libellé + BPM + maîtrise).
 * Les cartes se réordonnent par glisser-déposer via leur poignée.
 */
export function RythmeList({ lessonId, rythmes }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function onDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      progressStore.moveRythme(lessonId, String(active.id), String(over.id));
    }
  }

  return (
    <div className="space-y-3">
      {rythmes.length === 0 && (
        <p className="text-sm text-ink-faint">
          Aucun rythme pour l'instant. Ajoute les rythmes que tu travailles sur
          la partition.
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[verticalOnly]}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={rythmes} strategy={verticalListSortingStrategy}>
          {rythmes.map((rythme) => (
            <RythmeRow key={rythme.id} lessonId={lessonId} rythme={rythme} />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={() => progressStore.addRythme(lessonId)}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:border-amber/60 hover:text-amber"
      >
        <Plus className="h-3.5 w-3.5" /> Ajouter un rythme
      </button>
    </div>
  );
}

function RythmeRow({ lessonId, rythme }: { lessonId: string; rythme: Rythme }) {
  const update = (patch: Partial<Omit<Rythme, "id">>) =>
    progressStore.updateRythme(lessonId, rythme.id, patch);
  const bpm = rythme.bpm ?? 0;
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
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "space-y-3 rounded-lg border border-line bg-base/60 p-3",
        isDragging && "relative z-10 border-amber/60 bg-base shadow-xl",
      )}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          ref={setActivatorNodeRef}
          aria-label="Déplacer ce rythme"
          className={cn(
            "flex h-8 w-6 shrink-0 touch-none items-center justify-center rounded-md text-ink-faint transition-colors hover:text-amber",
            isDragging ? "cursor-grabbing text-amber" : "cursor-grab",
          )}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <input
          value={rythme.libelle}
          onChange={(e) => update({ libelle: e.target.value })}
          placeholder="Nom du rythme (ex. binaire 10, p.22 n°3)"
          className="min-w-0 flex-1 rounded-md border border-line bg-panel px-2.5 py-1.5 text-sm text-ink placeholder:text-ink-faint focus:border-amber/60 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Supprimer ce rythme"
          onClick={() => progressStore.removeRythme(lessonId, rythme.id)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-faint transition-colors hover:text-vol4"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* BPM */}
        <div className="flex items-center gap-1.5">
          <StepBtn onClick={() => update({ bpm: Math.max(0, bpm - 5) })}>
            <Minus className="h-3.5 w-3.5" />
          </StepBtn>
          <span className="min-w-[3.5rem] text-center font-mono text-sm text-ink tabular-nums">
            {bpm}
            <span className="ml-0.5 text-xs text-ink-faint">bpm</span>
          </span>
          <StepBtn onClick={() => update({ bpm: bpm + 5 })}>
            <Plus className="h-3.5 w-3.5" />
          </StepBtn>
        </div>

        {/* Maîtrise */}
        <div className="flex items-center gap-2.5">
          <MaitriseStars
            value={rythme.maitrise}
            onChange={(maitrise) => update({ maitrise })}
          />
          <span className="font-mono text-[11px] text-ink-muted">
            {MAITRISE_NIVEAUX[rythme.maitrise]}
          </span>
        </div>
      </div>
    </div>
  );
}

function StepBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-line bg-raised text-ink-muted transition-colors hover:border-amber/60 hover:text-amber active:scale-95",
      )}
    >
      {children}
    </button>
  );
}
