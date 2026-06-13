import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  /** Absent = élément courant (non cliquable). */
  onClick?: () => void;
}

/** Fil d'Ariane : navigation directe vers chaque niveau parent. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-6 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={item.label}>
            {item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="text-ink-faint transition-colors hover:text-amber"
              >
                {item.label}
              </button>
            ) : (
              <span className={cn(last ? "text-ink" : "text-ink-faint")}>
                {item.label}
              </span>
            )}
            {!last && <ChevronRight className="h-3 w-3 text-ink-faint/60" />}
          </Fragment>
        );
      })}
    </nav>
  );
}
