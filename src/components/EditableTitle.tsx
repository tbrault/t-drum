import { Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Titre affiché ("" = aucun : seul le crayon reste visible). */
  value: string;
  /** Reçoit le nouveau titre sans espaces autour ("" = effacé). */
  onSave: (titre: string) => void;
  className?: string;
}

/**
 * Titre modifiable sur place : un clic ouvre un champ de saisie, Entrée (ou
 * un clic ailleurs) valide, Échap annule.
 */
export function EditableTitle({ value, onSave, className }: Props) {
  /** `null` = lecture ; sinon le texte en cours de saisie. */
  const [draft, setDraft] = useState<string | null>(null);
  // Échap démonte le champ, ce qui peut déclencher un blur : ne pas valider.
  const cancelled = useRef(false);

  if (draft === null) {
    return (
      <button
        type="button"
        title="Modifier le titre"
        onClick={() => {
          cancelled.current = false;
          setDraft(value);
        }}
        className={cn(
          "group/title inline-flex max-w-full items-center gap-2 text-left",
          className,
        )}
      >
        {value && <span className="min-w-0">{value}</span>}
        <Pencil className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors group-hover/title:text-amber" />
      </button>
    );
  }

  function commit() {
    if (cancelled.current || draft === null) return;
    const next = draft.trim();
    if (next !== value) onSave(next);
    setDraft(null);
  }

  return (
    <input
      // biome-ignore lint/a11y/noAutofocus: le champ n'apparaît que sur clic de l'utilisateur
      autoFocus
      value={draft}
      aria-label="Titre"
      onChange={(e) => setDraft(e.target.value)}
      onFocus={(e) => e.target.select()}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          cancelled.current = true;
          setDraft(null);
        }
      }}
      className={cn(
        "block w-full rounded-md border border-amber/60 bg-panel px-2.5 py-1 text-ink focus:outline-none",
        className,
      )}
    />
  );
}
