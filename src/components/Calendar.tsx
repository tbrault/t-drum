import { toISO } from "@/lib/dates";
import { cn } from "@/lib/utils";

interface Props {
  year: number;
  month0: number; // 0-11
  /** Minutes pratiquées par jour (clé = date ISO). */
  minutesByDay: Record<string, number>;
  /** Jours d'échéance de révision (set de dates ISO). */
  dueDays: Set<string>;
  today: string;
  selected: string | null;
  onSelect: (iso: string) => void;
}

const JOURS = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

export function Calendar({
  year,
  month0,
  minutesByDay,
  dueDays,
  today,
  selected,
  onSelect,
}: Props) {
  const first = new Date(year, month0, 1);
  const lead = (first.getDay() + 6) % 7; // lundi = 0
  const nbDays = new Date(year, month0 + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(lead).fill(null),
    ...Array.from({ length: nbDays }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1.5">
        {JOURS.map((j) => (
          <div
            key={j}
            className="text-center font-mono text-[10px] uppercase tracking-wider text-ink-faint"
          >
            {j}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null)
            // biome-ignore lint/suspicious/noArrayIndexKey: cellules vides fixes
            return <div key={`b${i}`} />;
          const iso = toISO(new Date(year, month0, day));
          const min = minutesByDay[iso] ?? 0;
          const due = dueDays.has(iso);
          const isToday = iso === today;
          const isSel = iso === selected;
          const intensity = min > 0 ? Math.min(1, min / 90) * 0.7 + 0.25 : 0;

          return (
            <button
              type="button"
              key={iso}
              onClick={() => onSelect(iso)}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border text-sm transition-colors",
                isSel
                  ? "border-amber"
                  : isToday
                    ? "border-amber/40"
                    : "border-line-soft",
                min === 0 && "hover:border-line",
              )}
              style={
                min > 0
                  ? { backgroundColor: `oklch(0.79 0.158 67 / ${intensity})` }
                  : undefined
              }
            >
              <span
                className={cn(
                  "tabular-nums",
                  min > 0 ? "font-medium text-base" : "text-ink-muted",
                  isToday && min === 0 && "text-amber",
                )}
              >
                {day}
              </span>
              {due && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-done" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
