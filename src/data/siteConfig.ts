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

  /**
   * Homepage section mastheads. These lived inline in the section components
   * before — kept here so no component hardcodes user-facing copy.
   */
  sections: {
    process: {
      eyebrow: "02 / Process",
      heading: "How I think",
      intro:
        "Six stages I actually move through — each one tied to a real example from shipped work. Select a stage to see it.",
    },
    ownership: {
      eyebrow: "Ownership map",
      heading: "What I touch in a product",
      intro:
        "Honest boundaries, drawn as a map: what I own today, what I contribute to alongside the team, and what I'm deliberately growing toward.",
    },
    creative: {
      eyebrow: "03 / Creative",
      heading: "Observations that became stories",
      intro:
        "The same habit that drives the product work — noticing something small and following it — pointed at people instead of software. Video opens on YouTube; nothing autoplays here.",
    },
    about: {
      eyebrow: "04 / About",
      heading: "Engineering gave structure to my creativity.",
      body: "I spent years experimenting with video, design, photography, and storytelling before moving deeply into mobile development. Those interests were never separate — they taught me how people notice, understand, and respond to experiences. Today, I use that perspective to build mobile products that are reliable, thoughtful, and easier to communicate.",
      quote:
        "I want to understand why something should exist — not only how it should be built.",
      photoLabel: "The person behind the experiments",
      photoCaption: "Karachi → remote · Flutter by trade, storytelling by habit",
      cta: "Read the full story",
    },
  },

  /** Contact section copy — speaks to employers and founders equally. */
  contact: {
    eyebrow: "05 / Contact",
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
