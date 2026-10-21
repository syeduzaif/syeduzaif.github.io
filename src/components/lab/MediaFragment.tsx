import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A screenshot in a hairline frame: mono label above, mono caption below.
 * Flat and square — the paper mat, tape and rotation of the previous look
 * are gone; the design sits these upright on the panel ground.
 *
 * Every visual should explain something — the label/caption carries that.
 */
export function MediaFragment({
  src,
  alt,
  caption,
  label,
  sizes,
  priority,
  eager,
  aspect = "aspect-[4/5]",
  className,
}: {
  src: string;
  alt: string;
  /** Small explanatory caption below the image. */
  caption?: string;
  /** Tiny mono tag above the image (e.g. "STUDENT APP"). */
  label?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Above-the-fold loading without a `<link rel="preload">`. `priority` emits
   * one in the HTML *and* calls `ReactDOM.preload()` on hydration; the image is
   * already in the server markup, so the second registration buys nothing and
   * Chrome reports the unused one. Eager + `fetchPriority="high"` gets the same
   * early, high-priority fetch from the parser alone.
   */
  eager?: boolean;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={cn("border border-rule bg-paper p-2", className)}>
      {label && (
        <p className="mb-1.5 px-0.5 font-mono text-[0.58rem] font-medium tracking-[0.14em] text-grey uppercase">
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
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="px-0.5 pt-2 pb-0.5 font-mono text-[0.62rem] leading-relaxed text-grey">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
