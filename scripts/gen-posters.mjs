#!/usr/bin/env node
// Génère une vignette JPG par vidéo dans videos/posters/<id>.jpg
// Usage : pnpm posters [secondes]   (nécessite ffmpeg ; défaut 12 s, après l'intro)
// Source des vidéos : dossier videos/ par défaut, ou POSTERS_SRC=/chemin pour
// lire ailleurs (ex. disque externe) tout en écrivant dans videos/posters/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "videos");
const postersDir = join(root, "posters");
const src = process.env.POSTERS_SRC || root;
const seek = process.argv[2] ?? "12";

if (!existsSync(src)) {
  console.error(`Dossier source introuvable : ${src}`);
  process.exit(1);
}
mkdirSync(postersDir, { recursive: true });

/** Liste récursive des .mp4 (hors fichiers macOS `._`). */
function findVideos(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith("._") || name === "posters") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...findVideos(full));
    else if (name.toLowerCase().endsWith(".mp4")) out.push(full);
  }
  return out;
}

const videos = findVideos(src);
console.log(`${videos.length} vidéos trouvées dans ${src}.`);

let made = 0;
for (const file of videos) {
  // id = nom sans extension, sans préfixe "Niveau" éventuel (ex. Niveau7-5 -> 7-5)
  const base = file.split("/").pop().replace(/\.mp4$/i, "");
  const id = base.replace(/^Niveau/i, "");
  const out = join(postersDir, `${id}.jpg`);
  if (existsSync(out)) continue;
  try {
    execFileSync(
      "ffmpeg",
      ["-loglevel", "error", "-ss", seek, "-i", file, "-frames:v", "1",
       "-vf", "scale=640:-2", "-q:v", "4", "-y", out],
      { stdio: "inherit" },
    );
    made++;
  } catch {
    console.error(`Échec vignette pour ${base}`);
  }
}
console.log(`${made} vignettes générées dans ${postersDir}`);
