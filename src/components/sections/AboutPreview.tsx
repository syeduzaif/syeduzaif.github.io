import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Short about fragment — portrait beside the central idea. */
export function AboutPreview() {
  const about = siteConfig.sections.about;

  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
              <Image
                src="/images/profile.webp"
                alt="Syed Uzaif"
                fill
                sizes="(max-width:768px) 100vw, 400px"
                /* Same file the hero already loads, so lazy saves no bytes
                   here — it only leaves this below-the-fold copy as the last
                   `loading` value Next records for the URL, tripping its LCP
                   hint. */
                loading="eager"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 bg-paper px-2.5 py-1.5 font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-ink uppercase">
                {about.photoLabel}
              </figcaption>
            </div>
            <p className="mt-3 font-mono text-[0.65rem] tracking-[0.1em] text-grey">
              {about.photoCaption}
            </p>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium tracking-[0.16em] text-orange-deep uppercase">
              {about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-5 text-h2 [font-stretch:90%] text-ink text-balance"
            >
              {about.heading}
            </h2>
            <p className="mt-7 max-w-[58ch] text-grey">{about.body}</p>

            <blockquote className="mt-8 border-l-[3px] border-orange pl-5">
              <p className="font-display text-[clamp(1.25rem,2.1vw,1.7rem)] leading-snug font-medium italic text-ink">
                {about.quote}
              </p>
            </blockquote>

            <Link
              href="/about/"
              className="mt-8 inline-flex items-center gap-1.5 border-b border-ink pb-1 font-medium text-ink transition-colors hover:border-orange-deep hover:text-orange-deep"
            >
              {about.cta} <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
