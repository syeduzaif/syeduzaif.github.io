import { ArrowUpRight, Download, Play } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroMedia } from "@/components/media/HeroMedia";
import { buttonVariants } from "@/components/ui/Button";

export function Hero() {
  const { hero, links } = siteConfig;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <h1 className="text-hero text-cream text-balance">{hero.headline}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-6 text-lead text-muted"
              style={{ maxWidth: "var(--width-reading)" }}
            >
              {hero.supporting}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-sm tracking-[0.14em] text-olive-text">
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
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <Play size={16} />
                {hero.ctaSecondary.label}
              </a>
              <a
                href={links.resume}
                download
                className={buttonVariants({ variant: "link" })}
              >
                <Download size={16} />
                Download résumé
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full">
          <HeroMedia
            poster="/images/profile.webp"
            alt="Syed Uzaif, Mobile Product Engineer"
          />
        </Reveal>
      </Container>
    </section>
  );
}
