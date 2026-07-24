import { cn } from "@/lib/utils";

/**
 * Small mono, uppercase, tracked technical label — the lab's metadata voice.
 * Used for section eyebrows, experiment tags ("EXPERIMENT 01 / PRODUCTION
 * SYSTEM"), chip labels, and margin metadata.
 */
export function EditorialLabel({
  className,
  children,
  as: Tag = "span",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={cn(
        "inline-block font-mono text-eyebrow font-medium uppercase tracking-[0.18em] text-grey",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
