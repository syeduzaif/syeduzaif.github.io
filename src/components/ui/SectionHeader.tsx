import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Mono index/eyebrow, e.g. "02 / PROCESS". */
  eyebrow?: string;
  title: string;
  intro?: string;
  /** id applied to the heading — pair with Section's labelledBy. */
  id?: string;
  align?: "left" | "center";
  /** Render on a dark band — swaps the ink/grey pair for the night pair. */
  onNight?: boolean;
  className?: string;
}

/**
 * Section opener: eyebrow, oversized display heading, and the intro set
 * alongside it rather than beneath — the two-column masthead the layout uses
 * at every section break.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  onNight = false,
  className,
}: SectionHeaderProps) {
  const heading = onNight ? "text-on-night" : "text-ink";
  const body = onNight ? "text-on-night-2" : "text-grey";
  // Signal fails AA on paper at small sizes; -deep carries it. On night the
  // base signal is 5.6:1 and reads better.
  const label = onNight ? "text-orange" : "text-orange-deep";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-[var(--width-reading)] text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-eyebrow font-medium tracking-[0.16em] uppercase",
            label,
          )}
        >
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          "mt-5 gap-10",
          align === "left" && intro && "md:grid md:grid-cols-[1.25fr_1fr] md:items-end",
        )}
      >
        <h2
          id={id}
          className={cn("text-h2 [font-stretch:90%] text-balance", heading)}
        >
          {title}
        </h2>
        {intro && (
          <p className={cn("mt-5 max-w-[46ch] text-lead md:mt-0", body)}>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
