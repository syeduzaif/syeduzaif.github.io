import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { timeline } from "@/data/timeline";
import { principles } from "@/data/about";
import { routeMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Timeline } from "@/components/ui/Timeline";

export const metadata = routeMetadata({
  title: "About",
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
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cream"
        >
          <ArrowLeft size={16} /> Back home
        </Link>

        <div className="mt-8 grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-xl border border-cream/10 md:mx-0">
            <Image
              src="/images/profile.webp"
              alt="Syed Uzaif, Mobile Product Engineer"
              fill
              sizes="(max-width:768px) 80vw, 360px"
              className="object-cover"
            />
          </div>

          <div style={{ maxWidth: "var(--width-reading)" }}>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-4 text-h2 text-cream text-balance">
              I want to understand why something should exist.
            </h1>
            <p className="mt-6 text-muted">
              I&apos;ve never been interested only in how something is built. I
              want to understand why it should exist, how people experience it,
              and what makes it worth using.
            </p>
            <p className="mt-4 text-muted">
              I spent years experimenting with video, photography, editing, and
              visual storytelling before moving deeply into mobile development.
              That background continues to shape how I observe problems, structure
              experiences, and communicate ideas. Today I build, improve, and
              release production Flutter apps — and increasingly think about the
              product decisions behind them.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="journey">
            <h2 id="journey" className="font-serif text-h3 text-cream">
              The journey
            </h2>
            <div className="mt-6">
              <Timeline items={timeline} />
            </div>
          </section>

          <section aria-labelledby="principles">
            <h2 id="principles" className="font-serif text-h3 text-cream">
              How I work
            </h2>
            <ul className="mt-6 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex gap-3 text-muted">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-terracotta"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </article>
  );
}
