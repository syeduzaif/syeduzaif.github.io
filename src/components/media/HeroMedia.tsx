import Image from "next/image";

/**
 * Hero portrait. Server component — no client JS on the LCP path. (A future
 * muted looping hero video would be added as a separate client component.)
 */
export function HeroMedia({ poster, alt }: { poster: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-xl border border-cream/10 md:ml-auto">
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="(max-width:768px) 70vw, 440px"
        className="object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--color-bg) 55%, transparent) 100%)",
        }}
      />
    </div>
  );
}
