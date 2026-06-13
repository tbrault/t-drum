import { Film, HardDriveDownload, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { assetUrl, fileExists } from "@/lib/videos";

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
    return (
      <div className={frame}>
        <video
          src={videoSrc}
          controls
          autoPlay
          className="h-full w-full bg-black"
        >
          <track kind="captions" />
        </video>
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
