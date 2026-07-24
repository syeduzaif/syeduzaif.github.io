import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { timeline } from "@/data/timeline";
import { principles, aboutStory } from "@/data/about";
import { routeMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Timeline } from "@/components/ui/Timeline";
import { EditorialLabel } from "@/components/lab/EditorialLabel";
import { MediaFragment } from "@/components/lab/MediaFragment";
import { ProductNote } from "@/components/lab/ProductNote";
import { Mark } from "@/components/lab/Mark";
import { slugify } from "@/lib/utils";

export const metadata = routeMetadata({
  title: "About Syed Uzaif — Mobile Product Engineer",
  description:
    "Syed Uzaif is a Mobile Product Engineer who combines Flutter engineering, product ownership, and visual storytelling to build and communicate thoughtful mobile experiences.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <article className="pt-28 pb-24 md:pt-36">
      <Container>
        <Link
          href="/#about"
          className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Back to the lab
        </Link>

        <div className="mt-8 grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16">
          <MediaFragment
            src="/images/profile.webp"
            alt="Syed Uzaif, Mobile Product Engineer"
            label="04 / About"
            caption="Karachi → remote · Flutter by trade, storytelling by habit"
            rotate={-1.5}
            taped
            priority
            sizes="(max-width:768px) 80vw, 380px"
            className="mx-auto w-full max-w-[380px] md:mx-0"
          />

          <div style={{ maxWidth: "var(--width-reading)" }}>
            <EditorialLabel>The person behind the experiments</EditorialLabel>
            <h1 className="mt-4 text-h2 text-ink text-balance">
              I want to understand why something should exist.
            </h1>
            <p className="mt-6 text-lead text-grey">
              I&apos;ve never been interested only in how something is built. I
              want to understand{" "}
              <Mark>why it should exist</Mark>, how people experience it, and
              what makes it worth using.
            </p>
          </div>
        </div>

        {/* Long-form story — numbered like the rest of the lab */}
        <div
          className="mt-16 space-y-12 md:mt-20"
          style={{ maxWidth: "var(--width-reading)" }}
        >
          {aboutStory.map((part, i) => (
            <section key={part.heading} aria-labelledby={slugify(part.heading)}>
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="font-mono text-[0.72rem] text-orange-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  id={slugify(part.heading)}
                  className="font-serif text-h3 text-ink"
                >
                  {part.heading}
                </h2>
              </div>
              {part.paragraphs.map((para, j) => (
                <p key={j} className="mt-4 text-grey">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 grid gap-12 border-t border-ink/15 pt-16 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="journey">
            <EditorialLabel>Timeline</EditorialLabel>
            <h2 id="journey" className="mt-3 font-serif text-h3 text-ink">
              The journey
            </h2>
            <div className="mt-6">
              <Timeline items={timeline} />
            </div>
          </section>

          <section aria-labelledby="principles">
            <EditorialLabel>Working notes</EditorialLabel>
            <h2 id="principles" className="mt-3 font-serif text-h3 text-ink">
              How I work
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
              {principles.map((p, i) => (
                <li key={p}>
                  <ProductNote
                    tone={i % 3 === 1 ? "paper" : "yellow"}
                    rotate={[-2, 1.5, -1, 2, -1.5, 1][i % 6]}
                    taped={i % 2 === 0}
                    className="max-w-none"
                  >
                    {p}
                  </ProductNote>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </article>
  );
}
