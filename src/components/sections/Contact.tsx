import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/data/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export function Contact() {
  const { links, availability } = siteConfig;

  const secondary = [
    { label: "GitHub", href: links.github },
    ...(links.youtube ? [{ label: "YouTube", href: links.youtube }] : []),
    { label: "Résumé", href: links.resume },
  ];

  return (
    <Section id="contact" labelledBy="contact-heading">
      <Container>
        <Reveal>
          <div className="rounded-xl border border-cream/10 bg-surface/40 p-8 text-center md:p-14">
            <SectionHeader
              align="center"
              eyebrow="Contact"
              id="contact-heading"
              title="Have a product worth building?"
              intro="I'm open to remote mobile roles, startup opportunities, selected product work, and conversations with teams that value ownership and thoughtful execution."
            />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={links.email}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                <Mail size={18} /> Email me
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <LinkedinIcon size={18} /> Connect on LinkedIn
              </a>
            </div>

            <nav
              aria-label="More links"
              className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
            >
              {secondary.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  download={item.href === links.resume ? "" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-muted transition-colors hover:text-sand"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-sm text-olive-text">{availability}</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
