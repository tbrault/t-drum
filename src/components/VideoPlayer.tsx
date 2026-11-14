import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  Film,
  HardDriveDownload,
  Maximize,
  Minimize,
  Play,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetUrl, fileExists } from "@/lib/videos";

/** Bascule le plein écran de la fenêtre Tauri (sans planter hors Tauri). */
async function setWindowFullscreen(on: boolean) {
  try {
    await getCurrentWindow().setFullscreen(on);
  } catch {
    /* hors Tauri : ignore */
  }
}

/** Vrai si la fenêtre de l'app est en plein écran (faux hors Tauri). */
async function isWindowFullscreen(): Promise<boolean> {
  try {
    return await getCurrentWindow().isFullscreen();
  } catch {
    return false;
  }
}

interface Props {
  /** Chemin de la vidéo relatif au dossier `videos/`. */
  videoRel: string;
  /** Chemin de la vignette relatif au dossier `videos/`. */
  posterRel: string;
}

type Status = "checking" | "absent" | "ready" | "playing";

/**
 * Lecteur vidéo paresseux : n'affiche qu'une vignette + bouton Play ; la vidéo
 * n'est chargée (et streamée via le protocole asset) qu'au clic.
 */
export function VideoPlayer({ videoRel, posterRel }: Props) {
  const [status, setStatus] = useState<Status>("checking");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [posterSrc, setPosterSrc] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  // La fenêtre était-elle déjà en plein écran quand la vidéo y est passée ?
  // Si oui, on la laisse comme ça en sortant : la vidéo ne rend à la fenêtre
  // que ce qu'elle lui a pris.
  const windowWasFullscreen = useRef(false);

  async function toggleFullscreen() {
    if (fullscreen) {
      setFullscreen(false);
      if (!windowWasFullscreen.current) setWindowFullscreen(false);
      return;
    }
    windowWasFullscreen.current = await isWindowFullscreen();
    setFullscreen(true);
    if (!windowWasFullscreen.current) setWindowFullscreen(true);
  }

  // Échap quitte le plein écran.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreen(false);
        if (!windowWasFullscreen.current) setWindowFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    // La page ne défile pas derrière la vidéo (et sa barre de défilement
    // ne reste pas affichée sur le côté).
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = overflow;
    };
  }, [fullscreen]);

  // Réinitialise quand on change de leçon.
  useEffect(() => {
    let active = true;
    setStatus("checking");
    setVideoSrc(null);
    setPosterSrc(null);

    (async () => {
      const exists = await fileExists(videoRel);
      if (!active) return;
      if (!exists) {
        setStatus("absent");
        return;
      }
      if (await fileExists(posterRel)) {
        const p = await assetUrl(posterRel);
        if (active) setPosterSrc(p);
      }
      if (active) setStatus("ready");
    })();

    return () => {
      active = false;
    };
  }, [videoRel, posterRel]);

  async function play() {
    const src = await assetUrl(videoRel);
    if (src) {
      setVideoSrc(src);
      setStatus("playing");
    }
  }

  const frame =
    "card relative flex aspect-video items-center justify-center overflow-hidden rounded-xl";

  if (status === "playing" && videoSrc) {
    // Même élément <video> dans les deux modes (pas de remontage → lecture
    // continue). On change seulement le conteneur.
    const container = fullscreen
      ? // `m-0` : sans ça, la marge que la colonne met entre ses blocs
        // laisserait voir une bande de la page en bas de l'écran.
        "fixed inset-0 z-[100] m-0 flex items-center justify-center bg-black"
      : frame;
    return (
      // `data-fullscreen` permet à la page de faire passer la vidéo au-dessus
      // de tout le reste (voir la colonne de LessonView).
      <div className={container} data-fullscreen={fullscreen || undefined}>
        {/* biome-ignore lint/a11y/useMediaCaption: contenu perso sans sous-titres */}
        <video
          src={videoSrc}
          controls
          autoPlay
          className={
            fullscreen
              ? "max-h-full max-w-full object-contain"
              : "h-full w-full bg-black"
          }
        />
        <button
          type="button"
          aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
          onClick={toggleFullscreen}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-ground/70 text-ink-muted backdrop-blur transition-colors hover:text-accent"
        >
          {fullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  }

  if (status === "absent") {
    return (
      <div className={frame}>
        <div className="px-6 text-center">
          <HardDriveDownload className="mx-auto h-8 w-8 text-ink-faint" />
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
            Vidéo absente
          </p>
          <p className="mt-1 text-xs text-ink-faint">
            Copie le fichier dans le dossier <code>videos/</code>.
          </p>
        </div>
      </div>
    );
  }

  // checking / ready
  return (
    <button
      type="button"
      onClick={play}
      disabled={status !== "ready"}
      className={`${frame} group w-full`}
    >
      {posterSrc ? (
        <img
          src={posterSrc}
          alt=""
          className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
      ) : (
        <Film className="h-8 w-8 text-ink-faint" />
      )}
      {status === "ready" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="glow-accent flex h-16 w-16 items-center justify-center rounded-full bg-ground/80 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-accent text-accent" />
          </span>
        </span>
      )}
    </button>
  );
}
