import Image from "next/image";
import type { Media, MediaTone } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneColor: Record<MediaTone, string> = {
  terracotta: "var(--color-terracotta)",
  olive: "var(--color-olive)",
  sand: "var(--color-sand)",
};

/**
 * Renders a real image, or a warm textured placeholder when the asset isn't
 * available yet. The placeholder reads as an intentional editorial cover — not
 * a broken/gray box — and is hidden from the a11y tree (label shown visually).
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
      <div className={cn("relative overflow-hidden rounded-lg", className)}>
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

  const tone = toneColor[media.tone ?? "terracotta"];
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-lg border border-cream/10 p-7",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${tone} 22%, var(--color-surface)) 0%, var(--color-surface) 55%, var(--color-bg) 100%)`,
      }}
    >
      {/* soft tonal glow — makes each cover feel branded, not empty */}
      <span
        className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full blur-3xl"
        style={{ background: tone, opacity: 0.28 }}
      />
      <span
        className="pointer-events-none absolute top-0 left-0 h-full w-1.5"
        style={{ background: tone }}
      />
      <span
        className="relative flex items-center gap-2 text-eyebrow uppercase tracking-[0.22em]"
        style={{ color: tone }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
        Product cover
      </span>
      <span className="relative">
        <span className="block font-serif text-3xl leading-tight text-cream/95">
          {media.label}
        </span>
        <span className="mt-1.5 block text-xs uppercase tracking-[0.18em] text-muted">
          Screenshot coming soon
        </span>
      </span>
    </div>
  );
}
