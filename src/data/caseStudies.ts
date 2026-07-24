import type { Media, Metric, Platform } from "@/lib/types";

/**
 * Full case-study model. Card/preview fields are populated now (used by the
 * homepage FeaturedWork section and the stubbed /work/[slug] routes). The
 * long-form body fields are reserved for a later MDX-driven pass.
 */
export interface CaseStudy {
  slug: "simplied" | "budget-buddy" | "stupid-alarm";

  // ---- card / preview ----
  category: string;
  title: string;
  summary: string;
  cover: Media;
  keyMetric: Metric;

  // ---- meta ----
  links?: {
    github?: string;
    playStore?: string;
    appStore?: string;
    youtube?: string;
  };
  confidential?: boolean;
  role?: string;
  timeframe?: string;
  stack?: string[];
  platforms?: Platform[];

  // ---- full body ----
  overview?: string; // what it is / who it's for
  challenge?: string; // the specific problem worth solving
  contributions?: string[]; // what I owned & did
  results?: string[]; // outcomes — only defensible facts
  learnings?: string[];
  nextSteps?: string[];
  gallery?: Media[]; // reserved for sanitised screenshots
}

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  simplied: {
    slug: "simplied",
    category: "Production education platform",
    title:
      "Scaling a learning platform to 10,000+ downloads across Android and iOS",
    summary:
      "Owned features, performance, and releases across a production LMS — two live Student and Parent apps at 10,000+ downloads, plus an offline-first Teacher app with an encrypted local database and durable sync. Production work under confidentiality.",
    cover: {
      kind: "image",
      src: "/images/projects/simplied-cover.png",
      alt: "SimpliEd learning platform interface",
    },
    keyMetric: { value: "~45% faster", label: "Initial load: 3.2s → 1.76s" },
    confidential: true,
    role: "Flutter Developer (promoted from intern within 3 months)",
    timeframe: "Sep 2024 — Present",
    platforms: ["Android", "iOS"],
    stack: ["Flutter", "Dart", "Riverpod 3.x", "Drift (SQLite)", "Firebase", "Stacked"],
    overview:
      "SimpliEd is a production education platform (LMS) used by students, parents, and schools. I joined as an intern and grew into a full-time Flutter Developer, contributing across two live consumer apps and a newer offline-first Teacher app.",
    challenge:
      "Everything ships into a system with real users, so changes have to land without regressions — and the newest module, the Teacher app, had to stay reliable even when classroom connectivity drops.",
    contributions: [
      "Owned features across the live Student and Parent apps and the offline-first Teacher app.",
      "Architected an offline-first data layer — an encrypted SQLite database (Drift + sqlite3mc) as the single source of truth, with a durable outbox that queues writes offline and replays them in order on reconnect.",
      "Built the platform layer: FCM push with deep-link routing, secure auth with encrypted token storage, and Crashlytics / Analytics / Remote Config behind clean service abstractions.",
      "Investigated startup performance with Flutter DevTools and restructured the loading flow.",
      "Coordinated Android and iOS releases via TestFlight and Play Internal Testing.",
    ],
    results: [
      "Cut initial load time ~45% (3.2s → 1.76s) and reduced app bundle size ~28%.",
      "Sustained a 99%+ crash-free session rate.",
      "Two live apps with 10,000+ cumulative downloads across the Play Store and App Store.",
    ],
    learnings: [
      "On a live app the migrations and releases are the risky part — 28+ schema migrations shipped with zero data-loss incidents by treating the local database as the source of truth.",
      "Clean service abstractions kept the platform layer testable and swappable as requirements changed.",
    ],
    nextSteps: [
      "Extend the offline-first patterns to more modules, and deepen automated testing and release checks.",
    ],
  },

  "budget-buddy": {
    slug: "budget-buddy",
    category: "Independent product",
    title: "A budgeting app with a built-in AI advisor",
    summary:
      "A full-stack expense tracker on Clean Architecture with Firebase Auth/Firestore, a Gemini-powered budgeting advisor, and a GitHub Actions CI/CD pipeline — designed around everyday financial behaviour.",
    cover: { kind: "placeholder", label: "Budget Buddy", tone: "olive" },
    keyMetric: { value: "AI advisor", label: "Gemini-powered budgeting advice" },
    links: { github: "https://github.com/syeduzaif/Budget-buddy" },
    role: "Independent — product, design & engineering",
    platforms: ["Android"],
    stack: ["Flutter", "Firebase", "Gemini AI", "Clean Architecture", "GitHub Actions"],
    overview:
      "Budget Buddy is an independent budgeting app I designed and built end to end. The idea: cut the effort of tracking everyday spending, and add an AI advisor that turns raw transactions into plain-language guidance.",
    challenge:
      "Budgeting apps rarely fail at recording expenses — they fail at getting people to keep doing it. The real problem was reducing friction and making the numbers mean something, not adding more charts.",
    contributions: [
      "Owned product, design, and engineering.",
      "Structured the app on Clean Architecture (repository pattern + dependency injection) so features stay isolated and testable.",
      "Built authentication and data on Firebase (Auth + Firestore).",
      "Integrated a Gemini-powered advisor behind a clean service abstraction, so the AI layer can evolve without touching core budgeting logic.",
      "Set up a GitHub Actions CI/CD pipeline for automated testing and builds.",
    ],
    results: [
      "A working, full-stack app with an AI advisor and an automated build pipeline.",
      "Not yet published — currently in active development.",
    ],
    learnings: [
      "Keeping the AI behind an abstraction stopped it leaking into core logic — the advisor is a feature, not the foundation.",
    ],
    nextSteps: [
      "Ship a first public release, then add faster expense capture and richer category insights.",
    ],
  },

  "stupid-alarm": {
    slug: "stupid-alarm",
    category: "Product experiment · YouTube series",
    title: "An alarm that refuses to let you snooze",
    summary:
      "A behavioural alarm concept — it only stops once you physically sit up — prototyped in Flutter and documented as a build-in-public video series.",
    cover: { kind: "placeholder", label: "Stupid Alarm", tone: "terracotta" },
    keyMetric: { value: "Built in public", label: "Documented as a video series" },
    links: {
      github: "https://github.com/syeduzaif/stupid_alarm_flutter",
      // youtube: added once the channel/video URLs are provided
    },
    role: "Independent — concept, design & engineering",
    platforms: ["Android"],
    stack: ["Flutter", "Stacked"],
    overview:
      "Stupid Alarm is a product experiment: an alarm that only stops once you physically sit up — built to beat the half-asleep snooze, and documented as a build-in-public series.",
    challenge:
      "People silence alarms without actually waking. The design problem is detecting a genuine 'awake' signal — sitting up — reliably, without dangerous or inaccessible interactions.",
    contributions: [
      "Framed the problem and the product hypothesis.",
      "Prototyped the core interaction in Flutter.",
      "Explored sensor-based sit-up detection and the false-positive and safety trade-offs.",
      "Documented the build publicly as a video series.",
    ],
    results: [
      "A working prototype and a public build story that turns the engineering into something people can follow.",
    ],
    learnings: [
      "Behavioural products live or die on edge cases — the hard part is a detection rule strict enough to work but safe and accessible.",
    ],
    nextSteps: [
      "Add an accessible alternative to sitting up, and refine the detection thresholds.",
    ],
  },
};

/** Display order for featured work on the homepage. */
export const featuredSlugs = [
  "simplied",
  "budget-buddy",
  "stupid-alarm",
] as const;

export const featuredCaseStudies: CaseStudy[] = featuredSlugs.map(
  (slug) => caseStudies[slug],
);

// Compile-time guard: if a new case-study slug is added to the union/record but
// not to featuredSlugs, this fails to typecheck — otherwise the new route would
// silently 404 (dynamicParams=false) and be missing from /work.
type _FeaturedComplete = [
  Exclude<CaseStudy["slug"], (typeof featuredSlugs)[number]>,
] extends [never]
  ? true
  : false;
const _assertFeaturedComplete: _FeaturedComplete = true;
void _assertFeaturedComplete;
