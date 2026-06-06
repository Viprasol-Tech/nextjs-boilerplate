import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** Optional heading rendered above the content. */
  title?: string;
  /** Adds a subtle hover elevation when true. */
  interactive?: boolean;
}

/**
 * A bordered content surface with dark-mode-aware styling. Use it to group
 * related content; pass `title` for a built-in heading.
 */
export function Card({ children, className, title, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-6",
        "dark:border-slate-700 dark:bg-slate-900",
        interactive &&
          "transition-shadow hover:shadow-md dark:hover:shadow-slate-800",
        className,
      )}
    >
      {title ? (
        <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      ) : null}
      <div className="text-sm text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  );
}

export default Card;
