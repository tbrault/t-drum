import { History, Pause, Play, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TempoCible } from "@/content/types";
import { minutesForLesson, sessionsForLesson } from "@/lib/agenda";
import { formatDuree, formatLong, todayISO } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { progressStore, useSessions } from "@/progress/store";

interface Props {
  lessonId: string;
  tempoCible?: TempoCible;
}

const LABEL =
  "font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-faint";
const LINK =
  "inline-flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:text-amber";

/**
 * Barre de séance d'une leçon, collée en haut de l'écran : chrono, temps
 * cumulé, ajout manuel, historique et tempo cible. Tout ce qui sert pendant
 * qu'on joue reste sous la main, quelle que soit la longueur de la liste.
 */
export function SessionBar({ lessonId, tempoCible }: Props) {
  const sessions = useSessions();
  const list = sessionsForLesson(sessions, lessonId);
  const cumul = minutesForLesson(sessions, lessonId);
  const [volet, setVolet] = useState<"ajout" | "historique" | null>(null);
  const toggle = (v: "ajout" | "historique") =>
    setVolet((actuel) => (actuel === v ? null : v));
  // L'historique se referme de lui-même quand sa dernière session disparaît.
  const ouvert = volet === "historique" && list.length === 0 ? null : volet;

  return (
    // La marge haute laisse la place aux boutons de la fenêtre ; elle est
    // floutée pour que la liste ne se lise pas au-dessus de la barre.
    <div className="sticky top-0 z-30 -mt-6 mb-8 bg-base/60 pt-8 backdrop-blur-md">
      <div className="rounded-xl border border-line bg-panel shadow-[0_14px_30px_-14px_rgb(0_0_0/0.8)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
          <Timer lessonId={lessonId} />

          <div className="h-9 w-px bg-line" />

          <div>
            <div className={LABEL}>Temps cumulé</div>
            <div className="font-mono text-lg text-ink tabular-nums">
              {formatDuree(cumul)}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-expanded={ouvert === "ajout"}
              onClick={() => toggle("ajout")}
              className={cn(
                LINK,
                ouvert === "ajout" ? "text-amber" : "text-ink-muted",
              )}
            >
              <Plus className="h-3.5 w-3.5" /> Ajouter du temps
            </button>
            {list.length > 0 && (
              <button
                type="button"
                aria-expanded={ouvert === "historique"}
                onClick={() => toggle("historique")}
                className={cn(
                  LINK,
                  ouvert === "historique" ? "text-amber" : "text-ink-muted",
                )}
              >
                <History className="h-3.5 w-3.5" /> Historique ({list.length})
              </button>
            )}
          </div>

          {tempoCible && (
            <div className="ml-auto text-right">
              <div className={LABEL}>Tempo cible</div>
              <div className="font-mono text-lg text-amber tabular-nums">
                {tempoCible.min}–{tempoCible.max}
                <span className="ml-1.5 text-xs text-amber-dim">BPM</span>
              </div>
            </div>
          )}
        </div>

        {ouvert === "ajout" && (
          <div className="border-t border-line-soft px-5 py-3">
            <ManualAdd lessonId={lessonId} onDone={() => setVolet(null)} />
          </div>
        )}

        {ouvert === "historique" && (
          <ul className="max-h-56 space-y-1.5 overflow-y-auto border-t border-line-soft px-5 py-3">
            {list.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-md border border-line-soft bg-base px-3 py-1.5 text-sm"
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
    </div>
  );
}

/** Chrono : à l'arrêt, le temps écoulé devient une session. */
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
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors",
          running
            ? "bg-amber text-base hover:bg-amber-bright"
            : "border border-amber/60 text-amber hover:bg-amber/10",
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
      <span
        className={cn(
          "font-mono text-2xl tabular-nums",
          running ? "text-amber" : "text-ink",
        )}
      >
        {mm}:{ss}
      </span>
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
    </div>
  );
}

function ManualAdd({
  lessonId,
  onDone,
}: {
  lessonId: string;
  onDone: () => void;
}) {
  const [date, setDate] = useState(todayISO());
  const [minutes, setMinutes] = useState("");

  function add() {
    const m = Number.parseInt(minutes, 10);
    if (Number.isFinite(m) && m > 0) {
      progressStore.addSession(lessonId, date, m);
      onDone();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="date"
        aria-label="Jour de la séance"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded-lg border border-line bg-base px-3 py-2 font-mono text-xs text-ink focus:border-amber/60 focus:outline-none"
      />
      <input
        type="number"
        min="1"
        aria-label="Durée en minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        className="w-24 rounded-lg border border-line bg-base px-3 py-2 font-mono text-sm text-ink focus:border-amber/60 focus:outline-none"
      />
      <span className="font-mono text-xs text-ink-faint">min</span>
      <button
        type="button"
        onClick={add}
        className="rounded-lg bg-amber px-4 py-2 font-mono text-xs uppercase tracking-wider text-base"
      >
        Ajouter
      </button>
      <button
        type="button"
        onClick={onDone}
        className="rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:text-ink"
      >
        Annuler
      </button>
    </div>
  );
}
