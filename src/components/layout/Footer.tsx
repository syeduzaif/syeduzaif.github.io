import { Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

/** Colophon on the night band. Year is stamped at build time. */
export function Footer() {
  const year = new Date().getFullYear();
  const { links } = siteConfig;

  const socials = [
    { label: "GitHub", href: links.github, Icon: GithubIcon },
    { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: links.email, Icon: Mail },
    { label: "YouTube", href: links.youtube, Icon: YoutubeIcon },
  ];

  return (
    <footer className="bg-night py-7">
      <Container className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-on-night-2 uppercase">
          © {year} {siteConfig.name} / {siteConfig.lab} — {siteConfig.title}
        </p>

        <div className="flex items-center gap-5">
          <nav aria-label="Social" className="flex items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-on-night-2 transition-colors hover:text-on-night"
              >
                <Icon size={17} />
              </a>
            ))}
          </nav>
          <span aria-hidden className="size-2.5 bg-orange" />
        </div>
      </Container>
    </footer>
  );
}
