import { Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

/** Site footer with social links + credit. Year is stamped at build time. */
export function Footer() {
  const year = new Date().getFullYear();
  const { links } = siteConfig;

  const socials = [
    { label: "GitHub", href: links.github, Icon: GithubIcon },
    { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: links.email, Icon: Mail },
    ...(links.youtube
      ? [{ label: "YouTube", href: links.youtube, Icon: YoutubeIcon }]
      : []),
  ];

  return (
    <footer className="border-t border-cream/10 py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <nav aria-label="Social" className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted transition-colors hover:text-sand"
            >
              <Icon size={20} />
            </a>
          ))}
        </nav>
        <p className="text-sm text-muted">
          © {year} {siteConfig.name} · {siteConfig.title}
        </p>
      </Container>
    </footer>
  );
}
