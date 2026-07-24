"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { NavLink } from "@/components/ui/NavLink";
import { buttonVariants } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const sectionId = (href: string) => href.split("#")[1] ?? "";

/**
 * Sticky editorial index: "SYED UZAIF / PRODUCT LAB" + numbered entries.
 * Transparent at top, paper after scroll; scroll-spy highlights the active
 * entry on the homepage.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = siteConfig.nav.map((n) => sectionId(n.href));

    const update = () => {
      setScrolled(window.scrollY > 24);

      if (!isHome) {
        setActiveId(null);
        return;
      }
      // Active = the last nav-target section whose top has crossed 40% of the
      // viewport. Continuous, so the highlight never goes stale between the
      // sections that sit in-between the nav targets.
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-ink/10 bg-paper/85 backdrop-blur"
          : "border-transparent",
      )}
    >
      <div
        className="mx-auto flex h-16 w-full items-center justify-between px-6 md:px-8"
        style={{ maxWidth: "var(--width-container)" }}
      >
        <Link
          href="/#top"
          className="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-ink uppercase"
        >
          {siteConfig.name}
          <span className="ml-1.5 font-normal text-grey">
            / {siteConfig.lab}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              n={item.n}
              active={isHome && activeId === sectionId(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={siteConfig.links.resume}
            download
            className={buttonVariants({ variant: "secondary" })}
          >
            Résumé
          </a>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
