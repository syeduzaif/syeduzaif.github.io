/**
 * Wraps a word/phrase with a hand-drawn ellipse (SVG stretched to fit).
 * Decorative stroke follows currentColor; the text itself stays real text.
 */
export function CircledText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className ?? ""}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 74"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -inset-x-[0.35em] -inset-y-[0.18em] h-[calc(100%+0.36em)] w-[calc(100%+0.7em)]"
      >
        <path
          d="M14 40C8 16 66 5 118 7c52 2 82 12 76 34-6 24-66 30-118 27C30 65 10 56 13 42"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
