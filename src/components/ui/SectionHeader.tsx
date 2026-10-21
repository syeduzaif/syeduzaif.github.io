import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeaderProps {
  /** Mono index/eyebrow, e.g. "02 / PROCESS". */
  eyebrow?: string;
  title: string;
  intro?: string;
  /** id applied to the heading — pair with Section's labelledBy. */
  id?: string;
  /** Page mastheads pass "h1"; section breaks keep the default "h2". */
  as?: "h1" | "h2";
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
  as: Heading = "h2",
  align = "left",
  onNight = false,
  className,
}: SectionHeaderProps) {
  const heading = onNight ? "text-on-night" : "text-ink";
  const body = onNight ? "text-on-night-2" : "text-grey";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-[var(--width-reading)] text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={onNight ? "signal-on-night" : "signal"}>{eyebrow}</Eyebrow>
      )}
      <div
        className={cn(
          "mt-5 gap-10",
          align === "left" && intro && "md:grid md:grid-cols-[1.25fr_1fr] md:items-end",
        )}
      >
        <Heading
          id={id}
          className={cn("text-h2 [font-stretch:90%] text-balance", heading)}
        >
          {title}
        </Heading>
        {intro && (
          <p className={cn("mt-5 max-w-[46ch] text-lead md:mt-0", body)}>
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
