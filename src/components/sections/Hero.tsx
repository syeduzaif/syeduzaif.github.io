import { ArrowUpRight, Download } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { EditorialLabel } from "@/components/lab/EditorialLabel";
import { CircledText } from "@/components/lab/CircledText";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { ProductNote } from "@/components/lab/ProductNote";
import { DraggableNote } from "@/components/lab/DraggableNote";
import { HandDrawnArrow } from "@/components/lab/HandDrawnArrow";

/** Renders a headline line, wrapping the marked phrase in a drawn circle. */
function HeadlineLine({ line, marked }: { line: string; marked: string }) {
  const idx = line.indexOf(marked);
  if (idx === -1) return <span className="block">{line}</span>;
  return (
    <span className="block">
      {line.slice(0, idx)}
      <CircledText className="text-ink [&_svg]:text-orange">
        {marked}
      </CircledText>
      {line.slice(idx + marked.length)}
    </span>
  );
}

/** Small mono chip used across the thinking board. */
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center border border-ink/20 bg-paper px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/75 ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

/** The code fragment pinned to the board — real pattern from the SimpliEd work. */
function CodeFragment({ className }: { className?: string }) {
  return (
    <div
      className={`border border-ink/15 bg-paper-soft p-3 shadow-[3px_4px_0_rgb(23_23_23/0.1)] ${className ?? ""}`}
    >
      <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
        Built in Flutter
      </p>
      <pre className="overflow-x-auto font-mono text-[0.68rem] leading-relaxed text-ink/80">
        {`// outbox.dart — offline write path
queue.add(write);        // offline
await replayInOrder();   // reconnect`}
      </pre>
    </div>
  );
}

/**
 * Asymmetric editorial hero: oversized three-line headline (with the drawn
 * circle around "messy ideas") beside a working thinking-board of fragments —
 * portrait, production screen, code, a draggable sticky note, and labels.
 */
export function Hero() {
  const { hero, links } = siteConfig;

  const note = (
    <ProductNote rotate={2.5} label="Still questioning · drag me">
      what if the alarm refuses to stop until you actually sit up?
    </ProductNote>
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <EditorialLabel>Field notes of a mobile product engineer</EditorialLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-hero text-ink">
              {hero.lines.map((line) => (
                <HeadlineLine key={line} line={line} marked={hero.marked} />
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              className="mt-7 text-lead text-grey"
              style={{ maxWidth: "var(--width-reading)" }}
            >
              {hero.supporting}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-grey">
              {hero.proof}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href={hero.ctaPrimary.href}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {hero.ctaPrimary.label}
                <ArrowUpRight size={18} />
              </a>
              <a
                href={hero.ctaSecondary.href}
                className={buttonVariants({ variant: "link" })}
              >
                {hero.ctaSecondary.label}
              </a>
              <a
                href={links.resume}
                download
                className={buttonVariants({ variant: "link" })}
              >
                <Download size={15} />
                Résumé
              </a>
            </div>
          </Reveal>
        </div>

        {/* Thinking board — full composition on lg+ */}
        <Reveal delay={0.1} className="relative hidden h-[560px] lg:block">
          <MediaFragment
            src="/images/profile.webp"
            alt="Syed Uzaif, Mobile Product Engineer"
            label="The engineer"
            rotate={-2}
            taped
            priority
            sizes="300px"
            className="absolute top-2 left-0 w-[52%]"
          />
          <MediaFragment
            src="/images/projects/simplied/teacher-dashboard.jpg"
            alt="SimpliEd Teacher app dashboard"
            label="Production / released"
            caption="SimpliEd — live on Android & iOS"
            rotate={1.5}
            taped
            sizes="220px"
            aspect="aspect-square"
            className="absolute top-0 right-0 w-[40%]"
          />
          <span
            aria-hidden
            className="absolute top-[47%] right-[16%] text-grey"
          >
            <HandDrawnArrow variant="down" className="h-12 w-6" />
          </span>
          <div className="absolute right-0 bottom-[24%] w-[46%]">
            <DraggableNote>{note}</DraggableNote>
          </div>
          <CodeFragment className="absolute bottom-0 left-[4%] w-[54%] rotate-[0.6deg]" />
          <Chip className="absolute top-[58%] left-[8%] -rotate-2">
            Android + iOS
          </Chip>
          <Chip className="absolute right-[4%] bottom-[12%] rotate-1">
            3.2s → 1.76s
          </Chip>
        </Reveal>

        {/* Simplified board on small screens — less overlap, same artefacts */}
        <Reveal delay={0.1} className="lg:hidden">
          <div className="relative mx-auto max-w-[420px]">
            <MediaFragment
              src="/images/profile.webp"
              alt="Syed Uzaif, Mobile Product Engineer"
              label="The engineer"
              rotate={-1.5}
              taped
              priority
              sizes="(max-width:768px) 80vw, 420px"
            />
            <div className="-mt-10 ml-auto w-[62%] max-w-[240px]">
              <DraggableNote>{note}</DraggableNote>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Android + iOS</Chip>
              <Chip>3.2s → 1.76s</Chip>
              <Chip>Built in Flutter</Chip>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
