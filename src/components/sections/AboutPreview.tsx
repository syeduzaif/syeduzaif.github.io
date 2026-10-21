import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { Mark } from "@/components/lab/Mark";

/** Short about fragment — portrait pinned to the page + the central idea. */
export function AboutPreview() {
  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16">
        <Reveal>
          <MediaFragment
            src="/images/profile.webp"
            alt="Syed Uzaif"
            label="The person behind the experiments"
            caption="Karachi → remote · Flutter by trade, storytelling by habit"
            rotate={-1.5}
            taped
            // Same file the hero already loads, so lazy saves no bytes here —
            // it only leaves this below-the-fold copy as the last `loading`
            // value Next records for the URL, which trips its LCP hint.
            eager
            sizes="(max-width:768px) 80vw, 400px"
            className="mx-auto max-w-[400px] md:mx-0"
          />
        </Reveal>

        <div>
          <SectionHeader
            eyebrow="04 / About"
            id="about-heading"
            title="Engineering gave structure to my creativity."
          />
          <p className="mt-6 text-grey" style={{ maxWidth: "var(--width-reading)" }}>
            I spent years experimenting with video, design, photography, and
            storytelling before moving deeply into mobile development. Those
            interests were never separate — they taught me how people notice,
            understand, and respond to experiences. Today, I use that
            perspective to build mobile products that are reliable, thoughtful,
            and easier to communicate.
          </p>
          <p className="mt-6 font-display text-[1.4rem] leading-snug text-ink">
            I want to understand <Mark>why something should exist</Mark> — not
            only how it should be built.
          </p>

          <Link
            href="/about/"
            className="mt-8 inline-flex items-center gap-1.5 font-medium text-orange-deep transition-colors hover:text-ink"
          >
            Read the full story <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
