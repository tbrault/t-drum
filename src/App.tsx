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
          onOpenNiveau={(numero) => setView({ name: "niveau", numero })}
          onOpenLesson={(id) => setView({ name: "lesson", id })}
          onOpenCalendar={() => setView({ name: "calendar" })}
        />
      )}
      {view.name === "calendar" && (
        <CalendarView
          onDashboard={() => setView({ name: "dashboard" })}
          onOpenLesson={(id) => setView({ name: "lesson", id })}
        />
      )}
      {view.name === "niveau" && (
        <NiveauView
          numero={view.numero}
          onDashboard={() => setView({ name: "dashboard" })}
          onOpenLesson={(id) => setView({ name: "lesson", id })}
        />
      )}
      {view.name === "lesson" && (
        <LessonView
          lessonId={view.id}
          onDashboard={() => setView({ name: "dashboard" })}
          onNiveau={(numero) => setView({ name: "niveau", numero })}
        />
      )}
    </main>
  );
}

export default App;
