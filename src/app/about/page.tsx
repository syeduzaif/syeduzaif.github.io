import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { timeline } from "@/data/timeline";
import { principles, aboutStory, aboutPage } from "@/data/about";
import { routeMetadata } from "@/lib/seo";
import { slugify } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecTable } from "@/components/ui/SpecTable";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = routeMetadata({
  title: "About Syed Uzaif — Mobile Product Engineer",
  description:
    "Syed Uzaif is a Mobile Product Engineer who combines Flutter engineering, product ownership, and visual storytelling to build and communicate thoughtful mobile experiences.",
  path: "/about/",
});

/** One part of the long-form story — mono index in the label column. */
function StoryPart({
  part,
  n,
}: {
  part: (typeof aboutStory)[number];
  n: string;
}) {
  const id = slugify(part.heading);
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-t border-rule pt-8 md:grid-cols-[4rem_1fr] md:gap-10"
    >
      <p
        aria-hidden
        className="font-mono text-[0.68rem] font-medium tracking-[0.16em] text-orange-deep"
      >
        {n}
      </p>
      <div>
        <h2
          id={id}
          className="text-h3 [font-stretch:92%] text-ink text-balance"
        >
          {part.heading}
        </h2>
        <div className="mt-4 max-w-[66ch] space-y-4 text-grey">
          {part.paragraphs.map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <article className="pt-28 pb-24 md:pt-36">
      <Container>
        <Link
          href={aboutPage.backHref}
          className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-grey uppercase transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> {aboutPage.backLabel}
        </Link>

        {/* ------------------------------------------------------ masthead */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{aboutPage.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-h2 [font-stretch:90%] text-ink text-balance">
              {aboutPage.heading}
            </h1>
            <p className="mt-7 max-w-[52ch] text-lead text-grey">
              {aboutPage.lead}
            </p>
          </div>

          <figure>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
              <Image
                src="/images/profile.webp"
                alt={aboutPage.photoAlt}
                fill
                sizes="(max-width:1024px) 100vw, 420px"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 bg-paper px-2.5 py-1.5 font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-ink uppercase">
                {aboutPage.photoLabel}
              </figcaption>
            </div>
            <p className="mt-3 font-mono text-[0.65rem] tracking-[0.1em] text-grey">
              {aboutPage.photoCaption}
            </p>
          </figure>
        </div>

        {/* --------------------------------------------------- long story */}
        <div className="mt-20 border-t-2 border-ink pt-6 md:mt-28">
          <Eyebrow tone="grey">{aboutPage.storyEyebrow}</Eyebrow>
        </div>

        <div className="mt-10 space-y-12">
          {aboutStory.map((part, i) => (
            <Reveal key={part.heading}>
              <StoryPart part={part} n={String(i + 1).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------- timeline + working notes */}
        <div className="mt-20 grid gap-12 border-t-2 border-ink pt-10 md:mt-28 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="journey">
            <Eyebrow tone="grey">{aboutPage.timelineEyebrow}</Eyebrow>
            <h2
              id="journey"
              className="mt-3 text-h3 [font-stretch:92%] text-ink"
            >
              {aboutPage.timelineHeading}
            </h2>
            <Timeline items={timeline} className="mt-7" />
          </section>

          <section aria-labelledby="principles">
            <Eyebrow tone="grey">{aboutPage.principlesEyebrow}</Eyebrow>
            <h2
              id="principles"
              className="mt-3 text-h3 [font-stretch:92%] text-ink"
            >
              {aboutPage.principlesHeading}
            </h2>
            <SpecTable
              className="mt-7"
              labelWidth="2.75rem"
              rows={principles.map((p, i) => ({
                label: String(i + 1).padStart(2, "0"),
                value: p,
              }))}
            />
          </section>
        </div>
      </Container>
    </article>
  );
}
