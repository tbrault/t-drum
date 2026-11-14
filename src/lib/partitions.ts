import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import type { PagePartition } from "@/content/partitions";

function inTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

let dossier: Promise<string | null> | null = null;

/**
 * Dossier des partitions sur le disque. En aperçu navigateur (`pnpm dev`),
 * le serveur de dev sert directement `partitions/` à la racine du projet.
 */
function dossierPartitions(): Promise<string | null> {
  dossier ??= inTauri()
    ? invoke<string>("partitions_dir").catch(() => null)
    : Promise.resolve(import.meta.env.DEV ? "/partitions" : null);
  return dossier;
}

/** Adresse de l'image d'une page, lisible par la fenêtre de l'app. */
function urlPage(base: string, { source, page }: PagePartition): string {
  const fichier = `pages/${source}/${String(page).padStart(3, "0")}.jpg`;
  return inTauri()
    ? convertFileSrc(`${base}/${fichier}`)
    : `${base}/${fichier}`;
}

/**
 * Fonction qui donne l'adresse de l'image d'une page, ou `null` tant que le
 * dossier des partitions n'est pas connu (ou hors de l'app).
 */
export function useUrlPage(): ((page: PagePartition) => string) | null {
  const [base, setBase] = useState<string | null>(null);
  useEffect(() => {
    let actif = true;
    dossierPartitions().then((b) => {
      if (actif) setBase(b);
    });
    return () => {
      actif = false;
    };
  }, []);
  return base ? (page) => urlPage(base, page) : null;
}
