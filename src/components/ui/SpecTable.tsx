import { cn } from "@/lib/utils";

export interface SpecRow {
  label: string;
  value: React.ReactNode;
}

/**
 * The hairline-ruled label/value table that carries most of the site's
 * metadata — inquiry beats, case-study facts, decision records. A plain
 * <dl>: every value is visible, with no hover-to-reveal affordance.
 */
export function SpecTable({
  rows,
  labelWidth = "6.5rem",
  onNight = false,
  className,
}: {
  rows: SpecRow[];
  /** Width of the label column; widen it for longer labels. */
  labelWidth?: string;
  /** Render on a dark band — swaps the rule and text pairs. */
  onNight?: boolean;
  className?: string;
}) {
  const rule = onNight ? "border-[#F1F1EC26]" : "border-rule";

  return (
    <dl className={cn("border-t", rule, className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className={cn("grid gap-4 border-b py-3.5", rule)}
          style={{ gridTemplateColumns: `${labelWidth} 1fr` }}
        >
          <dt
            className={cn(
              "pt-0.5 font-mono text-[0.6rem] font-medium tracking-[0.14em] uppercase",
              onNight ? "text-on-night-2" : "text-grey",
            )}
          >
            {row.label}
          </dt>
          <dd
            className={cn(
              "text-[0.95rem] leading-snug",
              onNight ? "text-on-night" : "text-ink",
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
