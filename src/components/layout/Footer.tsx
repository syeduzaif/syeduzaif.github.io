import { Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

/** Editorial colophon footer. Year is stamped at build time. */
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
    <footer className="border-t border-ink/15 py-10">
      <Container className="flex flex-col items-center gap-5 text-center">
        <nav aria-label="Social" className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-grey transition-colors hover:text-ink"
            >
              <Icon size={19} />
            </a>
          ))}
        </nav>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-grey">
          © {year} {siteConfig.name} / {siteConfig.lab} — {siteConfig.title}
        </p>
      </Container>
    </footer>
  );
}
