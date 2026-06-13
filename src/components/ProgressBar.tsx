import { cn } from "@/lib/utils";

interface Props {
  pct: number;
  className?: string;
}

/** Barre de progression façon VU-mètre, segmentée. */
export function ProgressBar({ pct, className }: Props) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-base",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber-dim via-amber to-amber-bright transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
