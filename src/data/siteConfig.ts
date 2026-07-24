/**
 * Central site content + identity. Every user-facing string and link lives in
 * data files like this one — never hardcode copy inside components.
 */
export const siteConfig = {
  name: "Syed Uzaif",
  title: "Mobile Product Engineer",
  url: "https://syeduzaif.github.io",
  locale: "en",

  /** Default meta description + the site's positioning statement. */
  description:
    "I turn unclear ideas into thoughtful mobile products by combining engineering, product thinking, visual judgment, and end-to-end ownership.",

  hero: {
    headline: "I build mobile products from messy ideas to shipped experiences.",
    supporting:
      "I'm Syed Uzaif, a Mobile Product Engineer combining Flutter development, product thinking, and visual storytelling. I build, improve, and release production applications while thinking beyond the screen.",
    proof:
      "Production applications · Android and iOS releases · 10,000+ cumulative downloads",
    ctaPrimary: { label: "Explore selected work", href: "/#work" },
    ctaSecondary: { label: "Watch my videos", href: "/#creative" },
  },

  /** Shared copy for the work section (homepage #work + the /work index). */
  work: {
    eyebrow: "Selected product work",
    heading: "Products where I contributed beyond implementation",
    intro:
      "From understanding the problem to shipping and improving the final experience.",
  },

  availability:
    "Based in Karachi, open to remote opportunities and relocation to Islamabad or Rawalpindi.",

  location: { city: "Karachi", country: "Pakistan", countryCode: "PK" },

  email: "syeduzaifamin@gmail.com",

  links: {
    github: "https://github.com/syeduzaif",
    linkedin: "https://www.linkedin.com/in/syed-uzaif/",
    youtube: "https://www.youtube.com/@uzaif_is_here",
    email: "mailto:syeduzaifamin@gmail.com",
    resume: "/documents/Syed_Uzaif_Resume.pdf",
  },

  /**
   * Primary navigation. Hrefs are root-relative hashes (`/#work`) so they work
   * from every page — from the homepage they scroll in place; from a sub-page
   * they return home and land on the section.
   */
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Creative", href: "/#creative" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
