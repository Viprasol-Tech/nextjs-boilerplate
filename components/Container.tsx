import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}

/**
 * Centered, max-width content wrapper with responsive horizontal padding.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

export default Container;
