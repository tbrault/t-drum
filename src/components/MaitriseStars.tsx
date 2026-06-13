import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "lg";
}

/** Maîtrise 0-5 façon pads de boîte à rythmes. Lecture seule si pas d'onChange. */
export function MaitriseStars({ value, onChange, size = "sm" }: Props) {
  const interactive = Boolean(onChange);
  const pad = size === "lg" ? "h-6 w-6" : "h-3 w-3";

  const padClass = (filled: boolean) =>
    cn(
      "rounded-[3px] border transition-all duration-150",
      pad,
      filled
        ? "border-amber bg-amber shadow-[0_0_10px_-2px_var(--color-amber)]"
        : "border-line bg-transparent",
      interactive && "cursor-pointer hover:border-amber-bright active:scale-90",
    );

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        // Lecture seule : <span> pour éviter d'imbriquer des <button>
        // (LessonRow est lui-même un bouton).
        return interactive ? (
          <button
            key={n}
            type="button"
            aria-label={`Maîtrise ${n} sur 5`}
            onClick={() => onChange?.(n === value ? 0 : n)}
            className={padClass(filled)}
          />
        ) : (
          <span key={n} className={padClass(filled)} />
        );
      })}
    </div>
  );
}
