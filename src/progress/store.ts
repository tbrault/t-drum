import { invoke } from "@tauri-apps/api/core";
import { useSyncExternalStore } from "react";
import { getLesson } from "@/content";
import {
  memeZone,
  nomsDePage,
  type PagePartition,
  type Zone,
} from "@/content/partitions";
import { todayISO } from "@/lib/dates";
import { REVISION_INTERVALS } from "@/lib/revision";
import { estAcquise, statutAuto } from "@/lib/statut";
import {
  defaultProgress,
  type LessonProgress,
  normalizeProgress,
  type Partie,
  type PartitionRythme,
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
 * Range les rythmes partie par partie (hors partie d'abord), sans changer
 * leur ordre à l'intérieur d'une partie.
 */
function grouper(rythmes: Rythme[], parties: Partie[]): Rythme[] {
  const rang = new Map(parties.map((p, i) => [p.id, i + 1]));
  const rangDe = (r: Rythme) => rang.get(r.partieId ?? "") ?? 0;
  return [...rythmes].sort((a, b) => rangDe(a) - rangDe(b));
}

/**
 * Store de progression : une source de vérité en mémoire, persistée en JSON
 * (via Tauri sur desktop, via localStorage en preview navigateur).
 */
class ProgressStore {
  private data: Record<string, LessonProgress> = {};
  private sessions: Session[] = [];
  private niveauTitres: Record<string, string> = {};
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
        this.niveauTitres = parsed.niveauTitres ?? {};
        // Remet chaque statut en accord avec les tempos et le temps passé.
        const ids = new Set([
          ...Object.keys(this.data),
          ...this.sessions.map((s) => s.lessonId),
        ]);
        for (const id of ids) this.syncStatut(id);
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
    if ("rythmes" in patch) this.syncStatut(lessonId);
  }

  /**
   * Recalcule le statut d'une leçon à partir de ses rythmes et de son temps
   * de pratique. Sans tempo cible, rien à calculer : le statut reste manuel.
   */
  private syncStatut(lessonId: string): void {
    const cible = getLesson(lessonId)?.consignes.tempoCible;
    if (!cible) return;
    const progress = this.get(lessonId);
    const minutes = this.sessions
      .filter((s) => s.lessonId === lessonId)
      .reduce((total, s) => total + s.minutes, 0);
    const statut = statutAuto(cible, progress.rythmes, minutes);
    if (statut !== progress.statut) this.setStatut(lessonId, statut);
  }

  /**
   * Ajoute un rythme à la fin d'une partie (par défaut la dernière, s'il y en
   * a). La partie est dépliée pour que le nouveau rythme soit visible.
   */
  addRythme(lessonId: string, partieId?: string): string {
    const { rythmes, parties = [] } = this.get(lessonId);
    const cible = partieId ?? parties[parties.length - 1]?.id;
    const rythme: Rythme = { id: newId(), libelle: "", maitrise: 0 };
    if (!cible) {
      this.set(lessonId, { rythmes: [...rythmes, rythme] });
      return rythme.id;
    }
    this.set(lessonId, {
      rythmes: grouper([...rythmes, { ...rythme, partieId: cible }], parties),
      parties: parties.map((p) =>
        p.id === cible ? { ...p, repliee: false } : p,
      ),
    });
    return rythme.id;
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

  /**
   * Applique l'ordre affiché après un glisser-déposer. `ordre` liste, de haut
   * en bas, les ids des parties et des rythmes visibles : chaque rythme
   * appartient à la partie située au-dessus de lui.
   */
  reorder(lessonId: string, ordre: string[]): void {
    const { rythmes, parties = [] } = this.get(lessonId);
    const partieById = new Map(parties.map((p) => [p.id, p]));
    const rythmeById = new Map(rythmes.map((r) => [r.id, r]));

    const nextParties: Partie[] = [];
    const visibles: Rythme[] = [];
    let courante: string | undefined;
    for (const id of ordre) {
      const partie = partieById.get(id);
      if (partie) {
        nextParties.push(partie);
        courante = id;
        continue;
      }
      const rythme = rythmeById.get(id);
      if (rythme) visibles.push({ ...rythme, partieId: courante });
    }

    // Les rythmes d'une partie repliée ne sont pas dans la liste : ils
    // restent dans leur partie, avant ceux qu'on vient d'y déposer.
    const vus = new Set(visibles.map((r) => r.id));
    const caches = rythmes.filter((r) => !vus.has(r.id));
    this.set(lessonId, {
      rythmes: grouper([...caches, ...visibles], nextParties),
      parties: parties.length > 0 ? nextParties : undefined,
    });
  }

  /** Associe un exercice de la partition à un rythme (ou le retire). */
  setPartition(
    lessonId: string,
    rythmeId: string,
    partition: PartitionRythme | undefined,
  ): void {
    this.updateRythme(lessonId, rythmeId, { partition });
  }

  /**
   * Crée un rythme par exercice d'une page (un binaire ou un solo compte
   * pour un seul exercice), rangés dans une nouvelle partie
   * « Page N ». Les exercices déjà associés à un rythme de la leçon sont
   * ignorés. Renvoie le nombre de rythmes créés.
   */
  ajouterRythmesDePage(
    lessonId: string,
    { source, page }: PagePartition,
    zones: Zone[],
  ): number {
    const { rythmes, parties = [] } = this.get(lessonId);
    const noms = nomsDePage({ source, page });
    const libres = zones
      .map((zone, i) => ({ zone, numero: i + 1, nom: noms[i] }))
      .filter(
        ({ zone }) =>
          !rythmes.some(
            (r) =>
              r.partition?.source === source &&
              r.partition.page === page &&
              memeZone(r.partition.zone, zone),
          ),
      );
    if (libres.length === 0) return 0;
    const partie: Partie = {
      id: newId(),
      titre: source === "annexes" ? `Annexes p. ${page}` : `Page ${page}`,
    };
    const nouveaux: Rythme[] = libres.map(({ zone, numero, nom }) => ({
      id: newId(),
      // Un binaire ou un solo garde son titre ; sinon, son rang sur la page.
      libelle: nom ?? `Exercice ${numero}`,
      maitrise: 0,
      partieId: partie.id,
      partition: { source, page, zone },
    }));
    const prochaines = [...parties, partie];
    this.set(lessonId, {
      parties: prochaines,
      rythmes: grouper([...rythmes, ...nouveaux], prochaines),
    });
    return nouveaux.length;
  }

  /** Ajoute une partie en bas de la liste ; renvoie son identifiant. */
  addPartie(lessonId: string): string {
    const { rythmes, parties = [] } = this.get(lessonId);
    const partie: Partie = { id: newId(), titre: "" };
    this.set(lessonId, {
      parties: [...parties, partie],
      // La toute première partie englobe les rythmes déjà saisis.
      rythmes:
        parties.length === 0
          ? rythmes.map((r) => ({ ...r, partieId: partie.id }))
          : rythmes,
    });
    return partie.id;
  }

  /** Monte (-1) ou descend (+1) une partie, avec tous ses rythmes. */
  movePartie(lessonId: string, partieId: string, sens: -1 | 1): void {
    const { rythmes, parties = [] } = this.get(lessonId);
    const from = parties.findIndex((p) => p.id === partieId);
    const to = from + sens;
    if (from < 0 || to < 0 || to >= parties.length) return;
    const next = [...parties];
    [next[from], next[to]] = [next[to], next[from]];
    this.set(lessonId, { parties: next, rythmes: grouper(rythmes, next) });
  }

  /**
   * Coupe la liste à un rythme : lui et les suivants de son groupe passent
   * dans une nouvelle partie, placée juste après celle d'origine.
   */
  splitPartie(lessonId: string, rythmeId: string): string | null {
    const { rythmes, parties = [] } = this.get(lessonId);
    const index = rythmes.findIndex((r) => r.id === rythmeId);
    if (index < 0) return null;
    const origine = rythmes[index].partieId;
    const partie: Partie = { id: newId(), titre: "" };
    const position = parties.findIndex((p) => p.id === origine) + 1;
    const next = [
      ...parties.slice(0, position),
      partie,
      ...parties.slice(position),
    ];
    this.set(lessonId, {
      parties: next,
      rythmes: grouper(
        rythmes.map((r, i) =>
          i >= index && r.partieId === origine
            ? { ...r, partieId: partie.id }
            : r,
        ),
        next,
      ),
    });
    return partie.id;
  }

  updatePartie(
    lessonId: string,
    partieId: string,
    patch: Partial<Omit<Partie, "id">>,
  ): void {
    const parties = (this.get(lessonId).parties ?? []).map((p) =>
      p.id === partieId ? { ...p, ...patch } : p,
    );
    this.set(lessonId, { parties });
  }

  /** Supprime une partie et tous ses rythmes. */
  removePartie(lessonId: string, partieId: string): void {
    const { rythmes, parties = [] } = this.get(lessonId);
    if (!parties.some((p) => p.id === partieId)) return;
    this.set(lessonId, {
      parties: parties.filter((p) => p.id !== partieId),
      rythmes: rythmes.filter((r) => r.partieId !== partieId),
    });
  }

  /** Titre personnalisé d'un niveau ; une chaîne vide rétablit le titre d'origine. */
  setNiveauTitre(numero: number, titre: string): void {
    const next = { ...this.niveauTitres };
    if (titre) next[numero] = titre;
    else delete next[numero];
    this.niveauTitres = next;
    this.emit();
    this.scheduleSave();
  }

  /** Snapshot stable des titres de niveau personnalisés. */
  allNiveauTitres(): Record<string, string> {
    return this.niveauTitres;
  }

  /**
   * Change le statut. Le suivi de révision démarre à la première validation
   * et est conservé si la leçon repasse « en cours » (ex. rythme ajouté).
   */
  setStatut(lessonId: string, statut: Statut): void {
    const current = this.get(lessonId);
    const revision =
      current.revision ??
      (estAcquise(statut) ? { lastReviewed: todayISO(), step: 0 } : undefined);
    this.set(lessonId, { statut, revision });
  }

  /** Ajoute une session de pratique ; fait avancer la révision si acquise. */
  addSession(lessonId: string, date: string, minutes: number): void {
    if (minutes <= 0) return;
    this.sessions = [
      ...this.sessions,
      { id: newId(), lessonId, date, minutes },
    ];
    this.syncStatut(lessonId);
    // Répétition espacée : pratiquer une leçon acquise un nouveau jour = révision.
    const p = this.get(lessonId);
    if (
      estAcquise(p.statut) &&
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
    const lessonId = this.sessions.find((s) => s.id === id)?.lessonId;
    this.sessions = this.sessions.filter((s) => s.id !== id);
    if (lessonId) this.syncStatut(lessonId);
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
      niveauTitres: this.niveauTitres,
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

/** Titres de niveau personnalisés, réactifs. */
export function useNiveauTitres(): Record<string, string> {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.allNiveauTitres(),
  );
}

/** État de chargement initial. */
export function useProgressLoaded(): boolean {
  return useSyncExternalStore(progressStore.subscribe, () =>
    progressStore.isLoaded(),
  );
}
