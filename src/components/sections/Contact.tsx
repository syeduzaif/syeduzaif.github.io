import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact — the full signal block that closes the page. Everything on it is
 * ink on orange (5.6:1); paper on orange would only reach 3:1 and fail.
 */
export function Contact() {
  const { links, availability, contact, email } = siteConfig;

  const actions = [
    { label: "GitHub", href: links.github, external: true },
    { label: "LinkedIn", href: links.linkedin, external: true },
    { label: "YouTube", href: links.youtube, external: true },
    { label: "Download résumé", href: links.resume, download: true, filled: true },
  ];

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-orange">
      <Container>
        <Reveal>
          <p className="font-mono text-eyebrow font-medium tracking-[0.16em] text-ink uppercase">
            {contact.eyebrow}
          </p>

          <div className="mt-6 gap-12 md:grid md:grid-cols-[1.3fr_1fr] md:items-end">
            <h2
              id="contact-heading"
              className="text-h2 [font-stretch:90%] text-ink text-balance"
            >
              {contact.heading}
            </h2>
            <p className="mt-5 max-w-[42ch] text-lead text-ink/80 md:mt-0">
              {contact.intro}
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between gap-6 border-y-2 border-ink py-5">
            <a
              href={links.email}
              className="font-display text-[clamp(1.6rem,4.4vw,3.4rem)] leading-none font-semibold tracking-tight [font-stretch:92%] text-ink underline-offset-[0.18em] hover:underline"
            >
              {email}
            </a>
            <a
              href={links.email}
              aria-hidden
              tabIndex={-1}
              className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-night text-on-night transition-transform hover:scale-105 sm:flex"
            >
              <ArrowUpRight size={22} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-x-8 gap-y-6">
            <nav aria-label="More links" className="flex flex-wrap gap-2.5">
              {actions.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  download={item.download ? "" : undefined}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={
                    item.filled
                      ? "inline-flex items-center gap-1.5 bg-night px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.14em] text-on-night uppercase transition-colors hover:bg-ink/80"
                      : "inline-flex items-center gap-1.5 border border-ink px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.14em] text-ink uppercase transition-colors hover:bg-ink hover:text-paper"
                  }
                >
                  {item.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </nav>

            <p className="max-w-[40ch] font-mono text-[0.62rem] leading-relaxed tracking-[0.12em] text-ink/75 uppercase md:text-right">
              {availability}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
