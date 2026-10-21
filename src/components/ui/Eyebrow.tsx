import { cn } from "@/lib/utils";

/**
 * The mono, uppercase, tracked label that opens every block — section
 * eyebrows, running heads, sub-labels and chip captions. This is the
 * metadata voice of the layout; pick the tone for the ground it sits on.
 *
 * Contrast notes: `signal` is orange-deep because base orange fails AA on
 * paper at this size; on a night band the base signal is 5.6:1 and reads
 * better, hence the separate `signal-on-night`.
 */
const tones = {
  signal: "text-orange-deep",
  "signal-on-night": "text-orange",
  /** Per-project accent — needs an `--accent-ink` in scope (see lib/accents). */
  accent: "text-(--accent-ink)",
  grey: "text-grey",
  ink: "text-ink",
  "on-night": "text-on-night-2",
  yellow: "text-yellow",
} as const;

export function Eyebrow({
  tone = "signal",
  as: Tag = "p",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  as?: "p" | "span" | "div" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-eyebrow font-medium tracking-[0.16em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
