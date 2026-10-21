/**
 * Central site content + identity. Every user-facing string and link lives in
 * data files like this one — never hardcode copy inside components.
 */
export const siteConfig = {
  name: "Syed Uzaif",
  title: "Mobile Product Engineer",
  /** Persistent lab label shown in the nav and footer. */
  lab: "Product Lab",
  url: "https://syeduzaif.github.io",
  locale: "en",

  /** Default meta description + the site's positioning statement. */
  description:
    "I turn unclear ideas into thoughtful mobile products by combining engineering, product thinking, visual judgment, and end-to-end ownership.",

  hero: {
    eyebrow: "Field notes of a mobile product engineer",
    /** Editorial headline, one line per entry; `marked` gets the signal pill. */
    lines: ["I build", "mobile products", "from messy ideas."],
    marked: "messy ideas.",
    /** The open question pinned beside the hero — still unresolved, deliberately. */
    question:
      "what if the alarm refuses to stop until you actually sit up?",
    supporting:
      "Mobile Product Engineer combining Flutter engineering, product thinking, ownership, and visual storytelling.",
    proof:
      "Production applications · Android and iOS releases · 10,000+ cumulative downloads",
    ctaPrimary: { label: "Explore the experiments", href: "/#work" },
    ctaSecondary: { label: "About the person behind them", href: "/#about" },
  },

  /** Shared copy for the work section (homepage #work + the /work index). */
  work: {
    eyebrow: "01 / Selected work",
    heading: "Selected product experiments",
    intro:
      "Each project is a documented investigation — from the first observation to what shipped, what was rejected, and what it taught me.",
  },

  /** Contact section copy — speaks to employers and founders equally. */
  contact: {
    heading: "Building a mobile product or team?",
    intro:
      "I'm open to remote mobile roles, startup teams, and selected product-development opportunities where thoughtful execution and ownership matter.",
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
   * Primary navigation — an editorial index. Hrefs are root-relative hashes
   * (`/#work`) so they work from every page; `n` is the printed index number.
   */
  nav: [
    { n: "01", label: "Work", href: "/#work" },
    { n: "02", label: "Process", href: "/#process" },
    { n: "03", label: "Creative", href: "/#creative" },
    { n: "04", label: "About", href: "/#about" },
    { n: "05", label: "Contact", href: "/#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
