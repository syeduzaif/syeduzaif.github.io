import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, GripVertical, Zap } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { DraggableNote } from "@/components/lab/DraggableNote";

/**
 * Renders a headline line, wrapping the marked phrase in the signal pill —
 * the Swiss replacement for the old hand-drawn circle.
 */
function HeadlineLine({ line, marked }: { line: string; marked: string }) {
  const idx = line.indexOf(marked);
  if (idx === -1) return <span className="block">{line}</span>;
  return (
    <span className="block">
      {line.slice(0, idx)}
      <span className="inline-block rounded-full border-[3px] border-orange px-[0.22em] pb-[0.04em]">
        {marked}
      </span>
      {line.slice(idx + marked.length)}
    </span>
  );
}

/** Mono label bar used along the bottom of the portrait. */
function PlateLabel({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="absolute bottom-3 left-3 flex items-baseline gap-2 bg-paper px-2.5 py-1.5">
      <span className="font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-ink uppercase">
        {label}
      </span>
      <span className="font-mono text-[0.62rem] tracking-[0.12em] text-grey uppercase">
        {meta}
      </span>
    </div>
  );
}

/**
 * Hero — an oversized three-line headline on the left, with the supporting
 * evidence stacked as precise blocks on the right: portrait, release status,
 * the headline metric, the open question, and the code fragment behind it.
 */
export function Hero() {
  const { hero, links } = siteConfig;

  return (
    <section id="top" className="pt-28 pb-14 md:pt-36 md:pb-20">
      {/* 2:1 split, matching the design's ~870/400 columns. */}
      <Container className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-14">
        {/* ---------------------------------------------- headline column */}
        <div className="flex flex-col">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-eyebrow font-medium tracking-[0.18em] text-ink uppercase">
              <span aria-hidden className="size-2.5 bg-orange" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            {/* wdth 88 narrows the face to the proportions the design was
                drawn at; without it the three lines won't hold. */}
            <h1 className="mt-7 text-hero leading-[0.9] [font-stretch:88%] text-ink">
              {hero.lines.map((line) => (
                <HeadlineLine key={line} line={line} marked={hero.marked} />
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-9 max-w-[34ch] text-lead text-grey">
              {hero.supporting}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={hero.ctaPrimary.href}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {hero.ctaPrimary.label}
                <ArrowDownRight size={18} />
              </a>
              <a
                href={hero.ctaSecondary.href}
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                {hero.ctaSecondary.label}
              </a>
              <a
                href={links.resume}
                download
                className={buttonVariants({ variant: "link", className: "ml-1" })}
              >
                Résumé
                <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-auto border-t border-rule pt-5 font-mono text-[0.68rem] tracking-[0.14em] text-grey uppercase">
              {hero.proof}
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------------ evidence stack */}
        <Reveal delay={0.1} className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
            <Image
              src="/images/profile.webp"
              alt="Syed Uzaif, Mobile Product Engineer"
              fill
              sizes="(max-width:1024px) 100vw, 480px"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
            <PlateLabel label="The engineer" meta="Android + iOS" />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.45fr_1fr]">
            <div className="border border-ink/18 p-4">
              <p className="flex items-center gap-2 font-mono text-[0.62rem] font-medium tracking-[0.14em] text-grey uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-green" />
                Production / Released
              </p>
              <p className="mt-2.5 text-[0.95rem] leading-snug text-ink">
                SimpliEd — live on Android &amp; iOS
              </p>
            </div>
            <div className="flex flex-col justify-between bg-orange p-4">
              <Zap aria-hidden size={16} className="text-ink" />
              <p className="mt-3 font-mono text-[0.95rem] font-semibold tracking-tight text-ink">
                3.2s → 1.76s
              </p>
            </div>
          </div>

          <DraggableNote>
            <div className="bg-night p-5">
              <p className="font-display text-[1.15rem] leading-snug text-on-night">
                {hero.question}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[0.62rem] font-medium tracking-[0.14em] text-yellow uppercase">
                  Still questioning
                </span>
                <span className="flex items-center gap-1 font-mono text-[0.62rem] tracking-[0.14em] text-on-night-2 uppercase">
                  <GripVertical aria-hidden size={12} />
                  Drag me
                </span>
              </div>
            </div>
          </DraggableNote>

          <div className="border border-ink/18 p-4">
            <p className="font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-blue-deep uppercase">
              Built in Flutter
            </p>
            <pre className="mt-2.5 overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-grey">
              {`// outbox.dart — offline write path
queue.add(write);        // offline
await replayInOrder();   // reconnect`}
            </pre>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
