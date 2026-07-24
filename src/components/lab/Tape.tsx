import { cn } from "@/lib/utils";

/** A small translucent "tape" strip pinning an element to the page. */
export function Tape({
  className,
  angle = -4,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 border border-ink/10 bg-[#e9e3d2]/80",
        className,
      )}
      style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
    />
  );
}
