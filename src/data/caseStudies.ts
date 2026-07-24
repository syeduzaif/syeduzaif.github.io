import type {
  ContentGap,
  Decision,
  FlowStep,
  Media,
  MediaTone,
  Metric,
  Platform,
  ProjectOption,
  Responsibility,
} from "@/lib/types";

/**
 * Full case-study model. Card/preview fields drive the homepage FeaturedWork
 * section and the /work index; the long-form body fields drive /work/[slug].
 *
 * Every long-form field is optional and the case-study page renders only what
 * exists — with one exception: `gaps` renders as visible, labelled
 * "content needed" markers so a missing section is never hidden silently.
 *
 * Factual guardrails encoded here (do not loosen without evidence):
 * - "10,000+ cumulative downloads" is a TEAM/product outcome, never phrased as
 *   growth the author personally caused.
 * - Performance numbers (3.2s → 1.76s, ~28% bundle) appear only on SimpliEd,
 *   where they are supported.
 */
export interface CaseStudy {
  slug: "simplied" | "budget-buddy" | "stupid-alarm";

  // ---- card / preview ----
  category: string;
  title: string;
  summary: string;
  cover: Media;
  keyMetric: Metric;
  /** Visual identity — per-project accent colour (see lib/accents.ts). */
  accent: MediaTone;
  /** Editorial index tag, e.g. "01" + "Production system". */
  experiment: { n: string; kind: string };
  /**
   * The project told as a three-beat inquiry: what was observed, the product
   * question it raised, and the response. Drives the card reveal interaction.
   */
  inquiry: { observation: string; question: string; response: string };

  // ---- meta ----
  links?: {
    github?: string;
    playStore?: string;
    appStore?: string;
    youtube?: string;
  };
  confidential?: boolean;
  /** Short lifecycle label — e.g. "Production" / "In active development" / "Concept". */
  status?: string;
  role?: string;
  timeframe?: string;
  stack?: string[];
  platforms?: Platform[];

  // ---- full body (rendered in this order) ----
  overview?: string; // 1. Product overview
  problem?: string; // 2. User or business problem
  context?: string; // 3. Context
  responsibility?: Responsibility; // 4-6. What I owned / contributed to / team outcome
  team?: string; // 5. Team context (prose alongside the matrix)
  constraints?: string[]; // 6. Constraints
  questions?: string[]; // 7. Important product questions
  options?: ProjectOption[]; // 8. Options / approaches considered (with verdicts)
  decisions?: Decision[]; // 9. Decisions & trade-offs
  technical?: string[]; // 10. Technical approach
  architecture?: { title?: string; steps: FlowStep[]; note?: string }; // 11. Visual walkthrough
  metrics?: Metric[]; // results, as scannable metrics
  results?: string[]; // 12. Results
  learnings?: string[]; // 13. What I learned
  improvements?: string[]; // 14. What I would improve
  nextSteps?: string[]; // 15. Next steps
  accessibility?: string[]; // extra: accessibility considerations (Stupid Alarm)
  gallery?: Media[]; // reserved for sanitised screenshots
  /** Visible, labelled "content needed" markers for sections still missing evidence. */
  gaps?: ContentGap[];
}

export const caseStudies: Record<CaseStudy["slug"], CaseStudy> = {
  simplied: {
    slug: "simplied",
    category: "Production education platform",
    title:
      "Building and improving a learning platform with 10,000+ cumulative downloads",
    summary:
      "Owning mobile features and releases across a production education platform — two live Student and Parent apps and an offline-first Teacher app with an encrypted local database and durable sync. Production work under confidentiality.",
    cover: {
      kind: "image",
      src: "/images/projects/simplied-cover.png",
      alt: "SimpliEd learning platform interface",
    },
    keyMetric: { value: "~45% faster", label: "Initial load: 3.2s → 1.76s" },
    accent: "blue",
    experiment: { n: "01", kind: "Production system" },
    inquiry: {
      observation: "Teachers lose work when classroom connectivity fails.",
      question:
        "Can the app stay reliable without depending on a live API at all times?",
      response:
        "An encrypted local database as the source of truth, with durable queued synchronisation.",
    },
    confidential: true,
    status: "Production · live on Android & iOS",
    role: "Flutter Developer (promoted from intern within 3 months)",
    timeframe: "Sep 2024 — Present",
    platforms: ["Android", "iOS"],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod 3.x",
      "Drift (SQLite)",
      "Firebase",
      "REST",
    ],

    overview:
      "SimpliEd is a production education platform (LMS) used by students, parents, and schools. It spans two live consumer apps (Student and Parent) and a newer offline-first Teacher app. I joined as an intern and grew into a full-time Flutter Developer, working inside an existing product and team rather than on a greenfield build.",

    problem:
      "Schools depend on the platform during the working day, often on patchy classroom or commute connectivity. Teachers can't lose attendance or grades because a signal dropped, and every change to the consumer apps ships to real users — so the work is as much about not breaking a live system as it is about adding to it.",

    context:
      "The consumer apps were already in the stores with a real user base when I joined. The Teacher app was the newer surface, where offline reliability mattered most. My work happened continuously against production: incremental features, performance and stability fixes, and coordinated store releases — never a rewrite.",

    responsibility: {
      owned: [
        "Flutter feature implementation across Student, Parent, and Teacher apps",
        "Offline-first mobile architecture on the Teacher app",
        "Encrypted local database as the single source of truth (Drift + sqlite3mc)",
        "Durable outbox / retry system for writes made offline",
        "Startup-performance investigation and the initial-load restructure",
        "App bundle-size reduction",
        "Store-release execution (TestFlight, Play Internal Testing)",
      ],
      contributed: [
        "Requirement clarification on incomplete tickets",
        "REST API coordination with the backend team",
        "QA coordination and internal testing rounds",
        "User-flow improvements for the consumer apps",
        "Investigating and reproducing production issues",
      ],
      teamOutcome: [
        "10,000+ cumulative downloads across the Play Store and App Store (whole platform, whole team)",
        "A sustained 99%+ crash-free session rate",
        "Ongoing Android and iOS release cadence",
      ],
    },
    team:
      "I work within a product team alongside backend engineers, QA, and design. Downloads and overall usage are platform-level outcomes the whole team contributes to — my direct ownership is the mobile layer: features, offline behaviour, performance, and release execution.",

    constraints: [
      "Every change ships into a live app with real users — regressions are expensive.",
      "Classroom and commute connectivity is unreliable, so the Teacher app must work fully offline.",
      "It's production education software: student data, internal URLs, and private metrics are confidential and sanitised before anything is shown publicly.",
      "Schema had to evolve on-device without data loss as features grew.",
    ],

    questions: [
      "What must keep working when the network doesn't — and what can wait for reconnect?",
      "Where should the source of truth live so a dropped connection never loses a teacher's work?",
      "Which part of a slow cold start is actually worth optimising first?",
      "How do we evolve the on-device schema repeatedly without risking existing data?",
    ],

    options: [
      {
        approach: "API-only, online-required",
        verdict: "rejected",
        note: "Simplest to build, but unusable when connectivity drops mid-class.",
      },
      {
        approach: "Cache-on-read only",
        verdict: "rejected",
        note: "Helps reads, but writes made offline are still lost — unacceptable for attendance and grading.",
      },
      {
        approach: "Local database as source of truth + durable outbox",
        verdict: "chosen",
        note: "More upfront work, but reliable under weak connectivity.",
      },
    ],

    decisions: [
      {
        decision:
          "Make the encrypted local database the single source of truth on the Teacher app, not a cache in front of the API.",
        why: "Teachers cannot depend on constant connectivity during the working day.",
        rejected: "API-only persistence.",
        tradeoff:
          "More upfront architecture and sync logic, in exchange for the UI staying fully usable offline.",
        outcome:
          "Work stays available and queued during weak connectivity — a dropped connection delays sync, it doesn't lose data.",
      },
      {
        decision:
          "Queue offline writes in a durable outbox and replay them in order on reconnect, with retry and reconciliation.",
        why: "A write made offline has to survive app restarts and land exactly once.",
        rejected: "Fire-and-forget network writes.",
        tradeoff:
          "Extra complexity handling ordering, conflicts, and idempotency.",
        outcome: "No silent data loss across 28+ schema migrations.",
      },
      {
        decision:
          "Profile the real cold start with DevTools before optimising, rather than guessing.",
        why: "Startup cost is rarely where you assume it is.",
        rejected: "Speculative micro-optimisation.",
        tradeoff:
          "A slower start to the fix, but changes targeted the actual bottleneck.",
        outcome: "Initial load cut ~45% — 3.2s → 1.76s.",
      },
    ],

    technical: [
      "Offline-first data layer: an encrypted SQLite database (Drift + sqlite3mc) as the single source of truth for the Teacher app.",
      "Durable outbox that queues writes made offline and replays them in order on reconnect, with retry and reconciliation against the REST API.",
      "Reactive UI with Riverpod 3.x reading from the local database, so screens update the moment local state changes — online or off.",
      "Platform layer behind clean service abstractions: FCM push with deep-link routing, secure auth with encrypted token storage, and Crashlytics / Analytics / Remote Config.",
      "28+ on-device schema migrations shipped with zero data-loss incidents by treating the local database as authoritative.",
      "Startup restructure informed by Flutter DevTools profiling; separate work reduced the app bundle size.",
    ],

    architecture: {
      title: "Offline-first write path (Teacher app)",
      steps: [
        { label: "User action", detail: "e.g. marks attendance, enters a grade" },
        {
          label: "Encrypted local DB",
          detail: "Drift + sqlite3mc — the source of truth; UI updates instantly",
        },
        { label: "Outbox queue", detail: "durable, ordered record of pending writes" },
        {
          label: "Background sync",
          detail: "replays the queue when connectivity returns",
        },
        { label: "REST API", detail: "server accepts the reconciled writes" },
        {
          label: "Retry & reconcile",
          detail: "failed writes retry; server state merges back down",
        },
      ],
      note: "Because the local database is authoritative, the screen never blocks on the network — a dropped connection delays sync, it doesn't lose work.",
    },

    metrics: [
      { value: "3.2s → 1.76s", label: "Initial load (~45% faster)" },
      { value: "~28%", label: "App bundle-size reduction" },
      { value: "99%+", label: "Crash-free session rate" },
      { value: "28+", label: "Schema migrations, zero data loss" },
    ],
    results: [
      "Cut initial load time ~45% (3.2s → 1.76s) and reduced app bundle size ~28%.",
      "Sustained a 99%+ crash-free session rate on the surfaces I work on.",
      "Shipped 28+ on-device schema migrations with zero data-loss incidents.",
      "Team/product outcome: the platform has 10,000+ cumulative downloads across the Play Store and App Store.",
    ],

    learnings: [
      "On a live app, migrations and releases are the risky part — treating the local database as the source of truth is what made 28+ migrations safe.",
      "Profiling before optimising matters: the real startup cost wasn't where I'd have guessed.",
      "Clean service abstractions kept the platform layer testable and swappable as requirements changed.",
    ],

    improvements: [
      "Deeper automated test coverage around the sync/outbox edge cases.",
      "More explicit conflict-resolution UX for the rare case where server and device disagree.",
    ],

    nextSteps: [
      "Extend the offline-first patterns to more modules.",
      "Strengthen automated release checks so the store cadence stays safe as the team grows.",
    ],

    gaps: [
      {
        section: "Visual walkthrough",
        note: "Sanitised Teacher-app screenshots (attendance, grading, sync state) with student data and internal URLs removed — drop into public/images/projects/simplied/ and wire into `gallery`.",
      },
    ],
  },

  "budget-buddy": {
    slug: "budget-buddy",
    category: "Independent product",
    title: "Designing an easier way to understand and maintain everyday spending",
    summary:
      "An independent budgeting product designed to reduce the friction of recording expenses, understanding spending patterns, and maintaining financial habits — with an AI advisor as a supporting feature, not the point.",
    // TODO(asset): replace with a real, sanitised app screenshot at
    // public/images/projects/budget-buddy-cover.png → { kind:"image", src, alt }.
    cover: {
      kind: "placeholder",
      label: "Budget Buddy",
      tone: "green",
      feature: "Expense entry · category budgets · monthly view",
    },
    keyMetric: { value: "Offline-first", label: "Local capture, syncs when online" },
    accent: "green",
    experiment: { n: "02", kind: "Habit design" },
    inquiry: {
      observation:
        "Recording an expense is easy. Keeping at it is the part everyone quits.",
      question:
        "How small can a single entry get before the habit stops feeling like admin?",
      response:
        "Local-first capture with category and monthly totals that update instantly — sync can wait.",
    },
    links: { github: "https://github.com/syeduzaif/Budget-buddy" },
    status: "In active development · not yet published",
    role: "Independent — product, design & engineering",
    platforms: ["Android"],
    stack: ["Flutter", "Firebase", "Gemini AI", "Clean Architecture", "GitHub Actions"],

    overview:
      "Budget Buddy is an independent budgeting product I'm designing and building end to end. The intended user is an ordinary person who wants to keep a handle on everyday spending without turning it into a chore — not an accountant, and not someone who enjoys spreadsheets.",

    problem:
      "Budgeting apps rarely fail at recording an expense — they fail at getting people to keep doing it. Manual entry is tedious, categories feel like admin, and the numbers rarely turn into anything a person actually acts on. The friction, not the feature list, is the real problem.",

    context:
      "This is a solo product built to practise product thinking end to end: deciding what the app is for, designing the flows, building it, and running a real delivery pipeline — not just writing screens.",

    responsibility: {
      owned: [
        "Product direction and scope",
        "Interaction and visual design",
        "Full Flutter implementation on Clean Architecture (repository pattern + DI)",
        "Authentication and data layer",
        "The AI advisor integration, kept behind a service abstraction",
        "The CI/CD pipeline and versioned APK distribution",
      ],
      contributed: [],
      teamOutcome: [],
    },
    team:
      "Built solo, so there's no team outcome to separate out — everything here is individual work. That's stated plainly rather than dressed up as more.",

    constraints: [
      "Solo project built around other commitments, so scope has to stay honest.",
      "No real users yet — every claim about behaviour is a hypothesis, not a result.",
      "The AI advisor must stay a supporting feature; it can't become a dependency the core budgeting relies on.",
    ],

    questions: [
      "What's the smallest amount of effort a person can spend to record an expense and still get value back?",
      "Do categories and monthly budgets reduce friction, or quietly add admin?",
      "What can an AI advisor say that's genuinely useful — versus restating numbers the user can already see?",
      "Where should data live so capture is instant but nothing is lost?",
    ],

    options: [
      {
        approach: "Cloud-only capture",
        verdict: "rejected",
        note: "Entry stalls whenever the network does — the wrong default for a habit product.",
      },
      {
        approach: "Local-first capture that syncs when online",
        verdict: "chosen",
        note: "Instant entry, resilient to bad connectivity.",
      },
      {
        approach: "AI as the headline feature",
        verdict: "rejected",
        note: "Kept as a supporting advisor instead — the product still works if the AI is removed.",
      },
    ],

    decisions: [
      {
        decision: "Lead with reducing entry friction, not with the AI advisor.",
        why: "The product's value can't hinge on a model call.",
        rejected: "AI-first positioning.",
        tradeoff: "Less flashy, but the core budgeting stands on its own.",
        outcome: "Budgeting works fully with the advisor switched off.",
      },
      {
        decision: "Keep the AI advisor behind a clean service abstraction.",
        why: "The advisor should evolve — or be swapped out — without touching core logic.",
        rejected: "Calling the model directly from feature code.",
        tradeoff: "A little extra indirection.",
        outcome: "The AI stays a feature, not the foundation.",
      },
      {
        decision: "Structure the app on Clean Architecture from the start.",
        why: "Features should stay isolated and testable as the app grows.",
        rejected: "Shortcut architecture for a solo app.",
        tradeoff: "More upfront ceremony.",
        outcome: "Repository pattern + DI keep modules independent.",
      },
    ],

    technical: [
      "Clean Architecture: repository pattern + dependency injection so features stay isolated and testable.",
      "Authentication and cloud data via Firebase (Auth + Firestore) for cross-device continuity.",
      "Offline-first capture: expenses save locally first and synchronise when a connection is available.",
      "Category and monthly-budget model that updates totals as transactions land.",
      "AI advisor integrated behind a service abstraction, so the AI layer can change without touching budgeting logic.",
      "GitHub Actions CI/CD that builds a versioned APK for distribution on each release.",
    ],

    architecture: {
      title: "Two flows: expense capture and delivery pipeline",
      steps: [
        { label: "User records expense", detail: "amount, note, category" },
        { label: "Saved locally", detail: "instant — no network required" },
        { label: "Totals update", detail: "category + monthly budget recalculated" },
        { label: "Sync when online", detail: "Firestore reconciles the data" },
        {
          label: "Summaries / insights",
          detail: "advisor turns numbers into plain-language guidance",
        },
      ],
      note: "Delivery pipeline: Flutter repo → GitHub Actions build → versioned APK → release metadata update → website repo update → Vercel deployment.",
    },

    results: [
      "A working, full-stack app with offline-first capture, an AI advisor, and an automated build/distribution pipeline.",
      "Not yet published — this is active development, so there are no adoption or behaviour results to report.",
    ],

    learnings: [
      "Keeping the AI behind an abstraction stopped it leaking into core logic — the advisor is a feature, not the foundation.",
      "For a habit product, the hard design work is friction, not features.",
    ],

    improvements: [
      "Faster expense capture (fewer taps, smart defaults) before adding more analysis.",
      "Validate the core hypothesis with real users before building richer insights.",
    ],

    nextSteps: [
      "Ship a first public release.",
      "Then test whether lower-friction entry actually improves consistency — the current hypothesis is that it will, but it needs user testing.",
    ],

    gaps: [
      {
        section: "Options considered",
        note: "Confirm the actual data stack. Portfolio + résumé describe Firebase/Firestore + Gemini + CI/CD; the public repo README currently describes GetX + Hive (local-only). Align the copy to whichever is current.",
      },
      {
        section: "Visual walkthrough",
        note: "Real screenshots of expense entry, category budgets, and the monthly view → public/images/projects/budget-buddy/ then set `cover` and `gallery` to real images.",
      },
    ],
  },

  "stupid-alarm": {
    slug: "stupid-alarm",
    category: "Product experiment · building in public",
    title: "Designing an alarm that requires a real sign of waking up",
    summary:
      "A mobile product experiment exploring whether physical posture detection can reduce unconscious snoozing while remaining safe and accessible — prototyped in Flutter and documented as a build-in-public series.",
    // TODO(asset): replace with a real, sanitised app/prototype screenshot at
    // public/images/projects/stupid-alarm-cover.png → { kind:"image", src, alt }.
    cover: {
      kind: "placeholder",
      label: "Stupid Alarm",
      tone: "orange",
      feature: "Concept · posture-based dismissal",
    },
    keyMetric: { value: "Concept → prototype", label: "Documented in public" },
    accent: "orange",
    experiment: { n: "03", kind: "Behavioural prototype" },
    inquiry: {
      observation: "People silence alarms without ever actually waking up.",
      question:
        "What counts as real proof of being awake — and is it safe to demand it?",
      response:
        "A posture signal (sitting up), with an accessible fallback. Still a hypothesis under test.",
    },
    links: {
      github: "https://github.com/syeduzaif/stupid_alarm_flutter",
      // youtube: added once the dev-series video URLs are provided
    },
    status: "Concept / prototype · needs validation",
    role: "Independent — concept, design & engineering",
    platforms: ["Android"],
    stack: ["Flutter", "Device sensors"],

    overview:
      "Stupid Alarm is a behavioural product experiment: an alarm designed to stop only once you show a genuine sign of waking — such as sitting up — rather than one you can silence half-asleep. It's deliberately the most exploratory of my projects, and it's documented as a build-in-public series.",

    problem:
      "People silence alarms without actually waking — a reflex, not a decision. Standard alarms optimise for being dismissible, which is exactly the failure. The design problem is detecting a real 'awake' signal reliably, without asking users to do anything unsafe or inaccessible the moment they wake.",

    context:
      "This is an independent experiment, not a shipped product. The point is to explore a behavioural hypothesis in public — including the parts that don't work yet — rather than to claim a finished feature.",

    responsibility: {
      owned: [
        "Framing the problem and the product hypothesis",
        "Prototyping the core interaction in Flutter",
        "Exploring sensor-based sit-up / posture detection and its trade-offs",
        "Documenting the build publicly",
      ],
      contributed: [],
      teamOutcome: [],
    },
    team:
      "A solo experiment — everything here is individual work, and the sensor detection is explicitly still exploratory rather than proven.",

    constraints: [
      "Whatever the alarm requires must be safe to do seconds after waking.",
      "It must not exclude people who can't reliably sit up on demand.",
      "Sensor detection has to run within reasonable battery limits.",
      "Sensor data used for detection should stay on-device.",
    ],

    questions: [
      "What's a reliable physical signal of 'awake' that most people can perform safely?",
      "How do we tell a genuine sit-up from the phone simply being picked up or lying on a table?",
      "What's the fallback when detection can't work — and how do we keep it safe, not just strict?",
      "How strict can dismissal be before it becomes unsafe or inaccessible?",
    ],

    options: [
      {
        approach: "Motion/accelerometer-based sit-up detection",
        verdict: "exploring",
        note: "Promising, but prone to false positives from simply handling the phone.",
      },
      {
        approach: "Strict dismissal with no fallback",
        verdict: "rejected",
        note: "Detection must degrade gracefully — never trap someone in a ringing alarm.",
      },
      {
        approach: "Accessible alternative to the physical action",
        verdict: "chosen",
        note: "Required from the start, not an optional extra.",
      },
    ],

    decisions: [
      {
        decision:
          "Treat this as a labelled experiment (Concept / Prototype), not a finished feature.",
        why: "Honesty is the point of building in public.",
        rejected: "Presenting the concept as a completed product.",
        tradeoff: "Less impressive as a claim.",
        outcome:
          "The build story is the value while validation is still pending.",
      },
      {
        decision:
          "Require an accessible alternative to the physical action from the start.",
        why: "Not every user can safely sit up on demand the moment they wake.",
        rejected: "A physical action as the only dismissal path.",
        tradeoff: "The 'strict' concept can't be the only path.",
        outcome: "The product stays usable and safe for everyone.",
      },
    ],

    technical: [
      "Core alarm interaction prototyped in Flutter.",
      "Exploration of device motion sensors (e.g. accelerometer) for posture detection.",
      "Detection framed as a rule strict enough to require a real signal but tolerant of table/handling false positives — still exploratory.",
    ],

    architecture: {
      title: "Detection concept (exploratory)",
      steps: [
        { label: "Alarm fires", detail: "sound + wake prompt" },
        { label: "Read motion sensors", detail: "on-device only" },
        {
          label: "Evaluate posture signal",
          detail: "looking for a genuine sit-up pattern",
        },
        { label: "Guard false positives", detail: "phone-on-table / pick-up rejected" },
        {
          label: "Dismiss or fall back",
          detail: "accessible confirmation path if detection can't run",
        },
      ],
      note: "This flow is a concept under exploration — sensor detection is not claimed as complete.",
    },

    accessibility: [
      "The product must not assume every user can safely sit up the moment they wake.",
      "An accessible alternative to the physical action is a first-class requirement, not an afterthought.",
      "Safety comes before strictness: the alarm should never trap someone who genuinely can't perform the action.",
    ],

    results: [
      "A working prototype and a public build story that turns the engineering into something people can follow.",
      "No effectiveness claims — whether posture detection actually reduces snoozing still needs validation.",
    ],

    learnings: [
      "Behavioural products live or die on edge cases — the hard part is a detection rule strict enough to work but safe and accessible.",
      "Building in public is a forcing function for honesty about what does and doesn't work yet.",
    ],

    improvements: [
      "Tighten detection thresholds to cut false positives.",
      "Design and test the accessible alternative properly, not as a token fallback.",
    ],

    nextSteps: [
      "Add the accessible alternative to sitting up.",
      "Run a small user-testing round to see whether the concept holds up outside my own bedroom.",
      "Continue the build-in-public series as it develops.",
    ],

    gaps: [
      {
        section: "User-testing plan",
        note: "Define how effectiveness will be measured (e.g. snooze rate before/after) once detection is stable — currently unvalidated.",
      },
      {
        section: "Visual walkthrough",
        note: "Prototype screenshots and a short muted demo clip → public/images/projects/stupid-alarm/. Add the YouTube dev-series URLs to `links.youtube` and `siteConfig` when ready.",
      },
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
