/** About-page content. */

/**
 * The About page masthead and its section labels. These used to be hardcoded
 * in the page component; they live here so no user-facing string does.
 */
export const aboutPage = {
  backLabel: "Back to the lab",
  backHref: "/#about",
  eyebrow: "The person behind the experiments",
  heading: "I want to understand why something should exist.",
  lead: "I've never been interested only in how something is built. I want to understand why it should exist, how people experience it, and what makes it worth using.",
  photoAlt: "Syed Uzaif, Mobile Product Engineer",
  photoLabel: "Karachi → remote",
  photoCaption: "Flutter by trade, storytelling by habit",
  storyEyebrow: "The long version",
  timelineEyebrow: "Timeline",
  timelineHeading: "The journey",
  principlesEyebrow: "Working notes",
  principlesHeading: "How I work",
} as const;

/** How I work — short principles list shown beside the timeline. */
export const principles: string[] = [
  "Understand before building",
  "Simplify before adding",
  "Own the outcome",
  "Communicate trade-offs honestly",
  "Ship, observe, improve",
  "Creativity should solve something",
];

/**
 * The long-form About narrative (~600 words across sections). Kept in data so
 * it never gets hardcoded in the component. Each entry is a titled part of the
 * story; paragraphs render in order.
 */
export interface AboutSection {
  heading: string;
  paragraphs: string[];
}

export const aboutStory: AboutSection[] = [
  {
    heading: "It started with creative work",
    paragraphs: [
      "Before I wrote any code, I spent years making things I could feel: video, photography, editing, and visual storytelling. What pulled me in wasn't the equipment — it was watching how a small choice in pacing, framing, or wording changed how someone reacted. I learned to pay attention to attention.",
      "That habit never left. It's still the lens I use on products: not just what a screen shows, but what a person notices first, what confuses them, and what makes something worth coming back to.",
    ],
  },
  {
    heading: "Moving into mobile development",
    paragraphs: [
      "Mobile development gave that instinct a structure. Flutter let me turn ideas into things people could actually hold and use, on both Android and iOS. I went deep — Dart, state management, architecture — because I wanted the craft underneath the interface, not just the surface.",
      "The more I built, the more I realised engineering and creativity weren't separate interests. One gave me taste; the other gave me the ability to ship that taste reliably.",
    ],
  },
  {
    heading: "Production work changed how I think",
    paragraphs: [
      "Working on a live education platform used by students, parents, and schools rewired my priorities. When real people depend on an app during their working day — often on unreliable connections — the interesting problems stop being 'what feature next' and become 'what must never break'.",
      "That's where I learned to treat reliability as a feature: making a local database the source of truth so a dropped signal never loses someone's work, shipping dozens of migrations without data loss, and profiling before optimising instead of guessing. Releases and edge cases, not demos, are where production software is really tested.",
    ],
  },
  {
    heading: "Why I care about product decisions",
    paragraphs: [
      "The central thing I've come to believe is simple: I want to understand why something should exist, not only how it should be built. A perfectly engineered feature that solves the wrong problem is still the wrong feature.",
      "So I ask questions early — about the user, the business problem, and the parts of a vague request that no one has pinned down yet. My creative background helps here too: storytelling is really just deciding what matters, in what order, for whom. That's the same skill product work needs.",
    ],
  },
  {
    heading: "How I like to work",
    paragraphs: [
      "I work best with small, honest teams that care about the outcome, not just the ticket — people who'll debate a trade-off, ship something real, and then look at what actually happened. I like clarity over ceremony and ownership over hand-offs.",
      "I'm not claiming to be a manager or a finished product leader. I'm an engineer who takes product thinking seriously and is deliberately growing toward more responsibility — prioritisation, roadmap input, and eventually mentoring — by earning it on real work.",
    ],
  },
  {
    heading: "What I'm looking for",
    paragraphs: [
      "I'm pursuing remote mobile roles, startup teams, and selected product-development work where thoughtful execution and ownership are valued — ideally somewhere I can keep bridging engineering, product, and the creative side of communicating what we build.",
    ],
  },
];
