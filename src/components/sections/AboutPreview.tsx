import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { timeline } from "@/data/timeline";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal className="order-2 md:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-xl border border-cream/10">
            <Image
              src="/images/profile.webp"
              alt="Syed Uzaif"
              fill
              sizes="(max-width:768px) 80vw, 400px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 md:order-2">
          <SectionHeader
            eyebrow="About"
            id="about-heading"
            title="Engineering gave structure to my creativity."
          />
          <p className="mt-6 text-muted">
            I spent years experimenting with video, design, photography, and
            storytelling before moving deeply into mobile development. Those
            interests were never separate — they taught me how people notice,
            understand, and respond to experiences. Today, I use that perspective
            to build mobile products that are reliable, thoughtful, and easier to
            communicate.
          </p>

          <div className="mt-8">
            <Timeline items={timeline} />
          </div>

          <Link
            href="/about/"
            className="mt-8 inline-flex items-center gap-1.5 text-terracotta-hi transition-colors hover:text-sand"
          >
            Read the full story <ArrowUpRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
