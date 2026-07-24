import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialLabel } from "@/components/lab/EditorialLabel";

/**
 * Contact — the one deliberately ink-dark block on the paper site: a strong
 * editorial close, speaking to employers and founders equally.
 */
export function Contact() {
  const { links, availability, contact, email } = siteConfig;

  const actions = [
    { label: "GitHub", href: links.github, external: true },
    { label: "LinkedIn", href: links.linkedin, external: true },
    { label: "YouTube", href: links.youtube, external: true },
    { label: "Download résumé", href: links.resume, download: true },
  ];

  return (
    <Section
      id="contact"
      labelledBy="contact-heading"
      className="bg-ink text-paper-soft"
    >
      <Container>
        <Reveal>
          <EditorialLabel className="text-orange">05 / Contact</EditorialLabel>
          <h2
            id="contact-heading"
            className="mt-5 text-h2 text-paper-soft text-balance"
            style={{ maxWidth: "56rem" }}
          >
            {contact.heading}
          </h2>
          <p
            className="mt-5 text-lead text-paper/75"
            style={{ maxWidth: "var(--width-reading)" }}
          >
            {contact.intro}
          </p>

          <a
            href={links.email}
            className="mt-10 inline-block font-serif text-[clamp(1.5rem,3.6vw,2.7rem)] leading-tight text-paper-soft underline decoration-orange decoration-2 underline-offset-8 transition-colors hover:decoration-paper-soft"
          >
            {email}
          </a>

          <nav
            aria-label="More links"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          >
            {actions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                download={item.download ? "" : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper-soft"
              >
                {item.label} ↗
              </a>
            ))}
          </nav>

          <p className="mt-12 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/55">
            {availability}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
