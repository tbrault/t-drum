import type { Volume } from "@/content/types";
import { VOLUME_COLOR } from "@/lib/meta";
import { cn } from "@/lib/utils";

/** Pastille de volume (V2 / V3 / V4). */
export function VolumeTag({ volume }: { volume: Volume }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-current/30 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider",
        VOLUME_COLOR[volume],
      )}
    >
      VOL {volume}
    </span>
  );
}
