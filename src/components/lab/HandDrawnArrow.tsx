import { cn } from "@/lib/utils";

type Variant = "right" | "down" | "loop" | "underline";

const paths: Record<Variant, { viewBox: string; d: string[] }> = {
  /* a wobbling rightward arrow */
  right: {
    viewBox: "0 0 64 24",
    d: ["M3 14C16 6 32 19 50 11", "M43 4l9 6-10 6"],
  },
  /* a wobbling downward arrow */
  down: {
    viewBox: "0 0 24 64",
    d: ["M13 3C6 16 19 32 11 50", "M4 43l7 9 6-10"],
  },
  /* a loop-back arrow (Learn → Notice) */
  loop: {
    viewBox: "0 0 72 40",
    d: ["M62 30C68 12 44 2 26 8 10 13 4 24 12 32", "M6 24l6 9 9-5"],
  },
  /* a hand-drawn underline squiggle */
  underline: {
    viewBox: "0 0 120 10",
    d: ["M3 6c20-5 38 4 57 0 19-4 38 3 57-1"],
  },
};

/**
 * Hand-drawn SVG marks (arrows, loop, underline squiggle). Stroke follows
 * currentColor, so colour with text utilities. Decorative — hidden from AT.
 */
export function HandDrawnArrow({
  variant = "right",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const { viewBox, d } = paths[variant];
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      fill="none"
      className={cn("inline-block shrink-0", className)}
    >
      {d.map((path) => (
        <path
          key={path}
          d={path}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
