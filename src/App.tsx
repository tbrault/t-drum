import { useEffect, useState } from "react";
import { progressStore, useProgressLoaded } from "@/progress/store";
import { CalendarView } from "@/routes/CalendarView";
import { Dashboard } from "@/routes/Dashboard";
import { LessonView } from "@/routes/LessonView";
import { NiveauView } from "@/routes/NiveauView";

type View =
  | { name: "dashboard" }
  | { name: "niveau"; numero: number }
  | { name: "lesson"; id: string }
  | { name: "calendar" };

function App() {
  const [view, setView] = useState<View>({ name: "dashboard" });

  /** Change d'écran ; chaque écran s'ouvre en haut de page. */
  function go(next: View) {
    setView(next);
    window.scrollTo(0, 0);
  }
  const loaded = useProgressLoaded();

  useEffect(() => {
    progressStore.load();
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="animate-pulse font-mono text-sm uppercase tracking-widest text-ink-faint">
          Chargement…
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {view.name === "dashboard" && (
        <Dashboard
          onOpenNiveau={(numero) => go({ name: "niveau", numero })}
          onOpenLesson={(id) => go({ name: "lesson", id })}
          onOpenCalendar={() => go({ name: "calendar" })}
        />
      )}
      {view.name === "calendar" && (
        <CalendarView
          onDashboard={() => go({ name: "dashboard" })}
          onOpenLesson={(id) => go({ name: "lesson", id })}
        />
      )}
      {view.name === "niveau" && (
        <NiveauView
          numero={view.numero}
          onDashboard={() => go({ name: "dashboard" })}
          onOpenLesson={(id) => go({ name: "lesson", id })}
        />
      )}
      {view.name === "lesson" && (
        <LessonView
          lessonId={view.id}
          onDashboard={() => go({ name: "dashboard" })}
          onNiveau={(numero) => go({ name: "niveau", numero })}
        />
      )}
    </main>
  );
}

export default App;
