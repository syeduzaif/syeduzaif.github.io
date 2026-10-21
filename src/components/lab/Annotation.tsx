import { cn } from "@/lib/utils";

/**
 * Margin note in the site's "handwritten" voice — Instrument Serif italic.
 * Reads like a pencil note beside the printed content.
 */
export function Annotation({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block font-display text-[1.05rem] leading-snug italic text-grey",
        className,
      )}
    >
      {children}
    </span>
  );
}
