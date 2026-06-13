import { Pause, Play, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { minutesForLesson, sessionsForLesson } from "@/lib/agenda";
import { formatDuree, formatLong, todayISO } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { progressStore, useSessions } from "@/progress/store";

export function PracticePanel({ lessonId }: { lessonId: string }) {
  const sessions = useSessions();
  const list = sessionsForLesson(sessions, lessonId);
  const cumul = minutesForLesson(sessions, lessonId);

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          Temps cumulé
        </span>
        <span className="font-mono text-lg text-amber tabular-nums">
          {formatDuree(cumul)}
        </span>
      </div>

      <Timer lessonId={lessonId} />
      <ManualAdd lessonId={lessonId} />

      {list.length > 0 && (
        <ul className="space-y-1.5">
          {list.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-md border border-line-soft bg-base/50 px-3 py-1.5 text-sm"
            >
              <span className="text-ink-muted">{formatLong(s.date)}</span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-ink tabular-nums">
                  {formatDuree(s.minutes)}
                </span>
                <button
                  type="button"
                  aria-label="Supprimer la session"
                  onClick={() => progressStore.deleteSession(s.id)}
                  className="text-ink-faint transition-colors hover:text-vol4"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Timer({ lessonId }: { lessonId: string }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // secondes
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [running]);

  function toggle() {
    if (running) {
      setRunning(false);
      const minutes = Math.max(1, Math.round(elapsed / 60));
      progressStore.addSession(lessonId, todayISO(), minutes);
      setElapsed(0);
    } else {
      startRef.current = Date.now() - elapsed * 1000;
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    setElapsed(0);
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-base px-4 py-3">
      <span
        className={cn(
          "font-mono text-2xl tabular-nums",
          running ? "text-amber" : "text-ink",
        )}
      >
        {mm}:{ss}
      </span>
      <div className="ml-auto flex items-center gap-2">
        {elapsed > 0 && !running && (
          <button
            type="button"
            aria-label="Réinitialiser le chrono"
            onClick={reset}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-faint transition-colors hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
            running
              ? "bg-amber text-base"
              : "border border-line text-ink-muted hover:border-amber/60 hover:text-amber",
          )}
        >
          {running ? (
            <>
              <Pause className="h-4 w-4" /> Stop & enregistrer
            </>
          ) : (
            <>
              <Play className="ml-0.5 h-4 w-4" />{" "}
              {elapsed > 0 ? "Reprendre" : "Démarrer"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ManualAdd({ lessonId }: { lessonId: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [minutes, setMinutes] = useState("");

  function add() {
    const m = Number.parseInt(minutes, 10);
    if (Number.isFinite(m) && m > 0) {
      progressStore.addSession(lessonId, date, m);
      setMinutes("");
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:text-amber"
      >
        <Plus className="h-3.5 w-3.5" /> Ajouter manuellement
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded-lg border border-line bg-base px-3 py-2 font-mono text-xs text-ink focus:border-amber/60 focus:outline-none"
      />
      <input
        type="number"
        min="1"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="min"
        className="w-20 rounded-lg border border-line bg-base px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-amber/60 focus:outline-none"
      />
      <button
        type="button"
        onClick={add}
        className="rounded-lg bg-amber px-3 py-2 font-mono text-xs uppercase tracking-wider text-base"
      >
        OK
      </button>
    </div>
  );
}
