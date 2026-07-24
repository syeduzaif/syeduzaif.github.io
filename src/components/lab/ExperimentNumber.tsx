import { cn } from "@/lib/utils";

/**
 * Oversized editorial index number ("01") — a decorative watermark that anchors
 * each experiment visually. Hidden from assistive tech; the real numbering
 * lives in the adjacent <EditorialLabel>.
 */
export function ExperimentNumber({
  n,
  className,
}: {
  n: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none select-none font-serif text-[clamp(4.5rem,9vw,8rem)] leading-none text-ink/[0.08]",
        className,
      )}
    >
      {n}
    </span>
  );
}
