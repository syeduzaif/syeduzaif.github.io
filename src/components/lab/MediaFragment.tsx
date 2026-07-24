import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tape } from "./Tape";

/**
 * A photo/screenshot pinned to the working wall: paper mat, optional tape,
 * slight rotation, mono caption. Every visual should explain something — the
 * caption/label carries that explanation.
 */
export function MediaFragment({
  src,
  alt,
  caption,
  label,
  rotate = 0,
  taped,
  sizes,
  priority,
  aspect = "aspect-[4/5]",
  className,
}: {
  src: string;
  alt: string;
  /** Small explanatory caption below the image. */
  caption?: string;
  /** Tiny mono tag above the image (e.g. "PRODUCTION / RELEASED"). */
  label?: string;
  rotate?: number;
  taped?: boolean;
  sizes?: string;
  priority?: boolean;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative border border-ink/15 bg-paper-soft p-2 shadow-[3px_4px_0_rgb(23_23_23/0.1)]",
        className,
      )}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {taped && <Tape />}
      {label && (
        <p className="mb-1.5 px-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-grey">
          {label}
        </p>
      )}
      <div className={cn("relative w-full overflow-hidden", aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="px-0.5 pt-2 pb-0.5 font-mono text-[0.68rem] leading-relaxed text-grey">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
