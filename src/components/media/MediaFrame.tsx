import Image from "next/image";
import type { Media, MediaTone } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Accent per tone; fg picks a readable letter colour on the accent chip. */
const toneColor: Record<MediaTone, { bg: string; fg: string }> = {
  orange: { bg: "var(--color-orange)", fg: "var(--color-paper-soft)" },
  blue: { bg: "var(--color-blue)", fg: "var(--color-paper-soft)" },
  green: { bg: "var(--color-green)", fg: "var(--color-ink)" },
  yellow: { bg: "var(--color-yellow)", fg: "var(--color-ink)" },
};

/**
 * Renders a real image, or — when the asset isn't available yet — a schematic
 * device-frame preview on working-grid paper. Deliberately reads as a lab
 * artefact ("VISUAL PREVIEW IN PROGRESS"), never as a fake product screen.
 */
export function MediaFrame({
  media,
  className,
  sizes,
  priority,
}: {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (media.kind === "image") {
    return (
      <div className={cn("relative overflow-hidden rounded-md", className)}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const tone = toneColor[media.tone ?? "orange"];
  return (
    <div
      role="img"
      aria-label={`${media.label} — visual preview in progress${media.feature ? `: ${media.feature}` : ""}`}
      className={cn(
        "grid-paper relative flex items-center justify-center overflow-hidden rounded-md border border-ink/15 bg-paper-soft p-6",
        className,
      )}
    >
      {/* honest status pill — this is a reserved slot, not a screenshot */}
      <span
        aria-hidden
        className="absolute top-4 left-4 z-10 flex items-center gap-1.5 border border-ink/20 bg-paper px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/70"
      >
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full motion-reduce:animate-none"
          style={{ background: tone.bg }}
        />
        Visual preview in progress
      </span>

      {/* schematic device frame */}
      <span
        aria-hidden
        className="relative flex h-[78%] max-h-[280px] w-[46%] max-w-[150px] flex-col items-center justify-center gap-3 rounded-[1.4rem] border-2 border-ink/25 bg-paper px-3 py-6 shadow-[4px_5px_0_rgb(23_23_23/0.08)]"
      >
        {/* speaker notch */}
        <span className="absolute top-2.5 h-1 w-8 rounded-full bg-ink/15" />
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold"
          style={{ background: tone.bg, color: tone.fg }}
        >
          {media.label.charAt(0)}
        </span>
        <span className="text-center font-serif text-lg leading-tight text-ink">
          {media.label}
        </span>
        {media.feature && (
          <span className="px-1 text-center font-mono text-[0.62rem] leading-snug text-grey">
            {media.feature}
          </span>
        )}
        {/* faux content lines — clearly schematic, not a real UI */}
        <span className="mt-1 flex w-full flex-col items-center gap-1.5">
          <span className="h-1.5 w-4/5 rounded-full bg-ink/10" />
          <span className="h-1.5 w-3/5 rounded-full bg-ink/10" />
        </span>
      </span>
    </div>
  );
}
