import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Calendar } from "@/components/Calendar";
import { allLessons } from "@/content";
import { minutesByDay, sessionsForDay } from "@/lib/agenda";
import { formatDuree, formatLong, formatMonth, todayISO } from "@/lib/dates";
import { nextDueISO } from "@/lib/revision";
import { useAllProgress, useSessions } from "@/progress/store";

interface Props {
  onDashboard: () => void;
  onOpenLesson: (id: string) => void;
}

export function CalendarView({ onDashboard, onOpenLesson }: Props) {
  const sessions = useSessions();
  const progress = useAllProgress();
  const today = todayISO();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month0, setMonth0] = useState(now.getMonth());
  const [selected, setSelected] = useState<string | null>(today);

  const perDay = useMemo(() => minutesByDay(sessions), [sessions]);

  // Échéances de révision par jour (leçons acquises dues).
  const dueByDay = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const lesson of allLessons) {
      const p = progress[lesson.id];
      if (!p) continue;
      const due = nextDueISO(p);
      if (due) {
        if (!map[due]) map[due] = [];
        map[due].push(lesson.id);
      }
    }
    return map;
  }, [progress]);
  const dueDays = useMemo(() => new Set(Object.keys(dueByDay)), [dueByDay]);

  function shift(delta: number) {
    const m = month0 + delta;
    const d = new Date(year, m, 1);
    setYear(d.getFullYear());
    setMonth0(d.getMonth());
  }

  const daySessions = selected ? sessionsForDay(sessions, selected) : [];
  const dayDue = selected ? (dueByDay[selected] ?? []) : [];

  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Tableau de bord", onClick: onDashboard },
          { label: "Calendrier" },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h1 className="font-display text-2xl font-extrabold text-ink">
              {formatMonth(year, month0)}
            </h1>
            <div className="flex gap-2">
              <NavBtn onClick={() => shift(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </NavBtn>
              <NavBtn onClick={() => shift(1)}>
                <ChevronRight className="h-4 w-4" />
              </NavBtn>
            </div>
          </div>
          <Calendar
            year={year}
            month0={month0}
            minutesByDay={perDay}
            dueDays={dueDays}
            today={today}
            selected={selected}
            onSelect={setSelected}
          />
          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-done" /> jour
            d'échéance de révision
          </p>
        </section>

        <aside>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
            {selected ? formatLong(selected) : "—"}
          </h2>

          {daySessions.length === 0 && dayDue.length === 0 && (
            <p className="text-sm text-ink-faint">Rien ce jour-là.</p>
          )}

          {daySessions.length > 0 && (
            <div className="mb-5">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber-dim">
                Pratique
              </div>
              <ul className="space-y-1.5">
                {daySessions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onOpenLesson(s.lessonId)}
                      className="flex w-full items-center justify-between rounded-lg border border-line bg-panel/60 px-3 py-2 text-left transition-colors hover:border-amber/50"
                    >
                      <span className="font-mono text-sm text-ink">
                        {s.lessonId}
                      </span>
                      <span className="font-mono text-xs text-ink-muted tabular-nums">
                        {formatDuree(s.minutes)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dayDue.length > 0 && (
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-done">
                À réviser
              </div>
              <ul className="space-y-1.5">
                {dayDue.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onOpenLesson(id)}
                      className="w-full rounded-lg border border-done/30 bg-done/5 px-3 py-2 text-left font-mono text-sm text-ink transition-colors hover:border-done/60"
                    >
                      {id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function NavBtn({
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
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-amber/60 hover:text-amber"
    >
      {children}
    </button>
  );
}
