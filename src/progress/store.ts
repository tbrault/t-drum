import { invoke } from "@tauri-apps/api/core";
import { useSyncExternalStore } from "react";
import { todayISO } from "@/lib/dates";
import { REVISION_INTERVALS } from "@/lib/revision";
import {
  defaultProgress,
  type LessonProgress,
  normalizeProgress,
  type ProgressFile,
  type Rythme,
  type Session,
  type Statut,
} from "./types";

const STORAGE_KEY = "t-drum-progress";

/** Vrai quand on tourne dans la coque Tauri (sinon : preview navigateur). */
function inTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

/** Identifiant unique pour un rythme. */
function newId(): string {
  return crypto.randomUUID();
}

/**
 * Store de progression : une source de vérité en mémoire, persistée en JSON
 * (via Tauri sur desktop, via localStorage en preview navigateur).
 */
class ProgressStore {
  private data: Record<string, LessonProgress> = {};
  private sessions: Session[] = [];
  /** Cache des progressions par défaut : référence stable pour useSyncExternalStore. */
  private defaults: Record<string, LessonProgress> = {};
  private listeners = new Set<() => void>();
  private loaded = false;
  private saveTimer: ReturnType<typeof setTimeout> | null = null;

  async load(): Promise<void> {
    let raw = "";
    try {
      raw = inTauri()
        ? await invoke<string>("load_progress")
        : (localStorage.getItem(STORAGE_KEY) ?? "");
    } catch (err) {
      console.error("Chargement progression échoué", err);
    }
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ProgressFile;
        const lessons = parsed.lessons ?? {};
        for (const [id, p] of Object.entries(lessons)) {
          this.data[id] = normalizeProgress(id, p);
        }
        this.sessions = parsed.sessions ?? [];
      } catch (err) {
        console.error("Progression illisible, réinitialisée", err);
      }
    }
    this.loaded = true;
    this.emit();
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  get(lessonId: string): LessonProgress {
    const existing = this.data[lessonId];
    if (existing) return existing;
    // Référence stable : un seul objet par défaut par leçon.
    this.defaults[lessonId] ??= defaultProgress(lessonId);
    return this.defaults[lessonId];
  }

  set(
    lessonId: string,
    patch: Partial<Omit<LessonProgress, "lessonId">>,
  ): void {
    this.data[lessonId] = { ...this.get(lessonId), ...patch, lessonId };
    this.emit();
    this.scheduleSave();
  }

  addRythme(lessonId: string): void {
    const rythme: Rythme = { id: newId(), libelle: "", maitrise: 0 };
    this.set(lessonId, { rythmes: [...this.get(lessonId).rythmes, rythme] });
  }

  updateRythme(
    lessonId: string,
    rythmeId: string,
    patch: Partial<Omit<Rythme, "id">>,
  ): void {
    const rythmes = this.get(lessonId).rythmes.map((r) =>
      r.id === rythmeId ? { ...r, ...patch } : r,
    );
    this.set(lessonId, { rythmes });
  }

  removeRythme(lessonId: string, rythmeId: string): void {
    const rythmes = this.get(lessonId).rythmes.filter((r) => r.id !== rythmeId);
    this.set(lessonId, { rythmes });
  }

  /** Change le statut et gère le suivi de révision (init à l'acquisition). */
  setStatut(lessonId: string, statut: Statut): void {
    const current = this.get(lessonId);
    let revision = current.revision;
    if (statut === "acquise" && !revision) {
      revision = { lastReviewed: todayISO(), step: 0 };
    } else if (statut !== "acquise") {
      revision = undefined;
    }
    this.set(lessonId, { statut, revision });
  }

  /** Ajoute une session de pratique ; fait avancer la révision si acquise. */
  addSession(lessonId: string, date: string, minutes: number): void {
    if (minutes <= 0) return;
    this.sessions = [
      ...this.sessions,
      { id: newId(), lessonId, date, minutes },
    ];
    // Répétition espacée : pratiquer une leçon acquise un nouveau jour = révision.
    const p = this.get(lessonId);
    if (
      p.statut === "acquise" &&
      p.revision &&
      p.revision.lastReviewed !== date
    ) {
      this.set(lessonId, {
        revision: {
          lastReviewed: date,
          step: Math.min(p.revision.step + 1, REVISION_INTERVALS.length - 1),
        },
      });
    }
    this.emit();
    this.scheduleSave();
  }

  deleteSession(id: string): void {
    this.sessions = this.sessions.filter((s) => s.id !== id);
    this.emit();
    this.scheduleSave();
  }

  allSessions(): Session[] {
    return this.sessions;
  }

  /** Snapshot stable de toutes les progressions (pour les vues d'ensemble). */
  all(): Record<string, LessonProgress> {
    return this.data;
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit(): void {
    // Nouvelles références pour invalider les snapshots mémoïsés.
    this.data = { ...this.data };
    this.sessions = [...this.sessions];
    for (const l of this.listeners) l();
  }

  private scheduleSave(): void {
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.persist(), 300);
  }

  private async persist(): Promise<void> {
    const file: ProgressFile = {
      version: 1,
      lessons: this.data,
      sessions: this.sessions,
    };
    const raw = JSON.stringify(file, null, 2);
    try {
      if (inTauri()) {
        await invoke("save_progress", { contents: raw });
      } else {
        localStorage.setItem(STORAGE_KEY, raw);
      }
    } catch (err) {
      console.error("Sauvegarde progression échouée", err);
    }
  }
}

export const progressStore = new ProgressStore();

/** Progression d'une leçon, réactive. */
export function useLessonProgress(lessonId: string): LessonProgress {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.get(lessonId),
  );
}

/** Toutes les progressions, réactives (pour le tableau de bord). */
export function useAllProgress(): Record<string, LessonProgress> {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.all(),
  );
}

/** Toutes les sessions de pratique, réactives. */
export function useSessions(): Session[] {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.allSessions(),
  );
}

/** État de chargement initial. */
export function useProgressLoaded(): boolean {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.isLoaded(),
  );
}
