import { cn } from "@/lib/utils";

/**
 * The lab's recurring symbol language, used consistently across the site:
 * observation ● · progression → · decision ■ · rejected ✕ · result ★ ·
 * unresolved ? — see <ExperimentLegend> for the key shown to visitors.
 */
export type GlyphKind =
  | "observation"
  | "progression"
  | "decision"
  | "rejected"
  | "result"
  | "unresolved";

const shapes: Record<GlyphKind, React.ReactNode> = {
  observation: <circle cx="8" cy="8" r="5.25" />,
  progression: <path d="M2 8h11M9 4l4 4-4 4" />,
  decision: <rect x="3" y="3" width="10" height="10" />,
  rejected: <path d="M4 4l8 8M12 4l-8 8" />,
  result: (
    <path d="M8 1.8l1.7 3.7 4 .5-3 2.8.8 4L8 10.9l-3.5 1.9.8-4-3-2.8 4-.5z" />
  ),
  unresolved: (
    <path d="M5.6 5.8a2.4 2.4 0 1 1 3.3 2.6c-.8.35-.9 1-.9 1.7M8 13.1v.2" />
  ),
};

export function Glyph({
  kind,
  className,
  size = 14,
}: {
  kind: GlyphKind;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
    >
      {shapes[kind]}
    </svg>
  );
}
