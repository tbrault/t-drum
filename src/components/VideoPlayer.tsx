import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  Film,
  HardDriveDownload,
  Maximize,
  Minimize,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { assetUrl, fileExists } from "@/lib/videos";

/** Bascule le plein écran de la fenêtre Tauri (sans planter hors Tauri). */
async function setWindowFullscreen(on: boolean) {
  try {
    await getCurrentWindow().setFullscreen(on);
  } catch {
    /* hors Tauri : ignore */
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

  function toggleFullscreen() {
    setFullscreen((on) => {
      setWindowFullscreen(!on);
      return !on;
    });
  }

  // Échap quitte le plein écran.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreen(false);
        setWindowFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    "relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-line bg-base";

  if (status === "playing" && videoSrc) {
    // Même élément <video> dans les deux modes (pas de remontage → lecture
    // continue). On change seulement le conteneur.
    const container = fullscreen
      ? "fixed inset-0 z-[100] flex items-center justify-center bg-black"
      : frame;
    return (
      <div className={container}>
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
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-line/60 bg-base/70 text-ink-muted backdrop-blur transition-colors hover:border-amber/60 hover:text-amber"
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
          <span className="glow-amber flex h-16 w-16 items-center justify-center rounded-full bg-base/80 backdrop-blur transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-amber text-amber" />
          </span>
        </span>
      )}
    </button>
  );
}
