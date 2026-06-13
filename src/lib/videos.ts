import { convertFileSrc, invoke } from "@tauri-apps/api/core";

function inTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

let cachedDir: string | null = null;

/** Dossier absolu des vidéos (null hors Tauri / preview navigateur). */
export async function videosDir(): Promise<string | null> {
  if (!inTauri()) return null;
  if (cachedDir === null) {
    try {
      cachedDir = await invoke<string>("videos_dir");
    } catch {
      return null;
    }
  }
  return cachedDir;
}

/** Vrai si le fichier (relatif au dossier vidéos) existe sur le disque. */
export async function fileExists(rel: string): Promise<boolean> {
  if (!inTauri()) return false;
  try {
    return await invoke<boolean>("file_exists", { rel });
  } catch {
    return false;
  }
}

/** URL `asset:` lisible par le webview pour un chemin relatif au dossier vidéos. */
export async function assetUrl(rel: string): Promise<string | null> {
  const dir = await videosDir();
  if (!dir) return null;
  return convertFileSrc(`${dir}/${rel}`);
}
