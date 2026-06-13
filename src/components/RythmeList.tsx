import { Minus, Plus, Trash2 } from "lucide-react";
import { MAITRISE_NIVEAUX } from "@/lib/meta";
import { cn } from "@/lib/utils";
import { progressStore } from "@/progress/store";
import type { Rythme } from "@/progress/types";
import { MaitriseStars } from "./MaitriseStars";

interface Props {
  lessonId: string;
  rythmes: Rythme[];
}

/** Liste éditable des rythmes d'une leçon (libellé + BPM + maîtrise). */
export function RythmeList({ lessonId, rythmes }: Props) {
  return (
    <div className="space-y-3">
      {rythmes.length === 0 && (
        <p className="text-sm text-ink-faint">
          Aucun rythme pour l'instant. Ajoute les rythmes que tu travailles sur
          la partition.
        </p>
      )}

      {rythmes.map((rythme) => (
        <RythmeRow key={rythme.id} lessonId={lessonId} rythme={rythme} />
      ))}

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

  return (
    <div className="space-y-3 rounded-lg border border-line bg-base/60 p-3">
      <div className="flex items-center gap-2">
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
