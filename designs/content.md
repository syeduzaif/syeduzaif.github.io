# Homepage content inventory — Syed Uzaif

All copy currently on the homepage, in page order. This is the complete text
that must appear in the redesign. Wording is fixed; presentation is not.

---

## Header / nav

SYED UZAIF / PRODUCT LAB

01 Work · 02 Process · 03 Creative · 04 About · 05 Contact · Résumé

---

## 1. Hero

Eyebrow: FIELD NOTES OF A MOBILE PRODUCT ENGINEER

Headline (3 lines, "messy ideas" is circled by a hand-drawn mark):
I build
mobile products
from messy ideas.

Body: Mobile Product Engineer combining Flutter engineering, product thinking,
ownership, and visual storytelling.

Meta: PRODUCTION APPLICATIONS · ANDROID AND IOS RELEASES · 10,000+ CUMULATIVE DOWNLOADS

Actions: Explore the experiments · About the person behind them · Résumé

Supporting fragments in the hero collage:
- Photo label: THE ENGINEER / ANDROID + IOS
- Panel: PRODUCTION / RELEASED — "SimpliEd — live on Android & iOS"
- Sticky note: "what if the alarm refuses to stop until you actually sit up?"
  (STILL QUESTIONING · DRAG ME)
- Code fragment: BUILT IN FLUTTER
  `// outbox.dart — offline write path`
  `queue.add(write);        // offline`
  `await replayInOrder();   // reconnect`
- Metric chip: 3.2S → 1.76S

---

## 2. Credibility strip

- 10,000+ — CUMULATIVE DOWNLOADS — ↳ team/product outcome — I build & ship the mobile layer
- 3.2s → 1.76s — INITIAL LOAD — ↳ profiled first, then restructured
- Android / iOS — PRODUCTION RELEASES — ↳ TestFlight · Play Internal Testing
- build → test → release — END-TO-END CONTRIBUTION — ↳ code to store, both platforms

---

## 3. Selected work — "01 / SELECTED WORK"

Heading: Selected product experiments

Intro: Each project is a documented investigation — from the first observation
to what shipped, what was rejected, and what it taught me.

### Experiment 01 — PRODUCTION SYSTEM
Status: PRODUCTION · LIVE ON ANDROID & IOS

Title: Building and improving a learning platform with 10,000+ cumulative downloads

Body: Owning mobile features and releases across a production education platform
— two live Student and Parent apps and an offline-first Teacher app with an
encrypted local database and durable sync. Production work under confidentiality.

- OBSERVATION: Teachers lose work when classroom connectivity fails.
- QUESTION: Can the app stay reliable without depending on a live API at all times?
- RESPONSE: An encrypted local database as the source of truth, with durable queued synchronisation.

Link: Read the investigation
Tech: FLUTTER · DART · RIVERPOD 3.X · DRIFT (SQLITE) · FIREBASE · REST
Architecture flow: LOCAL DB → OUTBOX → SYNC → REST API
App frames: STUDENT APP · TEACHER APP · ATTENDANCE / QR
Metric: 3.2s → 1.76s — INITIAL LOAD, PROFILED FIRST
Badges: TESTFLIGHT · PLAY INTERNAL

### Experiment 02 — HABIT DESIGN
Status: IN ACTIVE DEVELOPMENT · NOT YET PUBLISHED

Title: Designing an easier way to understand and maintain everyday spending

Body: An independent budgeting product designed to reduce the friction of
recording expenses, understanding spending patterns, and maintaining financial
habits — with an AI advisor as a supporting feature, not the point.

- OBSERVATION: Recording an expense is easy. Keeping at it is the part everyone quits.
- QUESTION: How small can a single entry get before the habit stops feeling like admin?
- RESPONSE: Local-first capture with category and monthly totals that update instantly — sync can wait.

Link: Read the investigation
Tech: FLUTTER · FIREBASE · GEMINI AI · CLEAN ARCHITECTURE · GITHUB ACTIONS
App preview: Budget Buddy — Expense entry · category budgets · monthly view
Note: "lower entry friction → the habit survives" (CURRENT HYPOTHESIS · NEEDS USER TESTING)
Chips: ENTRY IN SECONDS · CATEGORY BUDGETS · MONTHLY TOTALS

### Experiment 03 — BEHAVIOURAL PROTOTYPE
Status: CONCEPT / PROTOTYPE · NEEDS VALIDATION

Title: Designing an alarm that requires a real sign of waking up

Body: A mobile product experiment exploring whether physical posture detection
can reduce unconscious snoozing while remaining safe and accessible —
prototyped in Flutter and documented as a build-in-public series.

- OBSERVATION: People silence alarms without ever actually waking up.
- QUESTION: What counts as real proof of being awake — and is it safe to demand it?
- RESPONSE: A posture signal (sitting up), with an accessible fallback. Still a hypothesis under test.

Link: Read the investigation
Tech: FLUTTER · DEVICE SENSORS
Prototype panel: PROTOTYPE — NOT VALIDATED · 06:30 ·
DISMISSAL REQUIRES A REAL SIGN OF WAKING
- FALSE POSITIVES: PHONE ON TABLE
- ACCESSIBLE FALLBACK REQUIRED
- SENSORS STAY ON-DEVICE

Link: Open the full index

---

## 4. Process — "02 / PROCESS"

Heading: How I think

Intro: Six stages I actually move through — each one tied to a real example
from shipped work. Select a stage to see it.

Stages (interactive selector): 01 NOTICE · 02 QUESTION · 03 SHAPE · 04 BUILD ·
05 RELEASE · 06 LEARN — "and back again"

Selected stage (NOTICE):
Question: What is frustrating, confusing, slow, repetitive, or unnecessarily difficult?
FROM STUPID ALARM — Watching people silence an alarm without actually waking up
became the seed for Stupid Alarm.

Footnote: It rarely runs in a straight line — what production teaches loops
straight back into what I notice next.

---

## 5. Ownership map

Eyebrow: OWNERSHIP MAP
Heading: What I touch in a product

Intro: Honest boundaries, drawn as a map: what I own today, what I contribute
to alongside the team, and what I'm deliberately growing toward.

- I CURRENTLY OWN (DAY-TO-DAY RESPONSIBILITY): Flutter implementation ·
  Mobile architecture · Offline behaviour · Performance investigations · Release execution
- I REGULARLY CONTRIBUTE TO (ALONGSIDE THE TEAM): Requirement clarification ·
  API coordination · QA coordination · User-flow improvements · Production debugging
- I'M GROWING TOWARD (DELIBERATELY, NEXT): Product prioritisation ·
  Roadmap decisions · Business outcomes · Mentoring · Team leadership

Centre label: Mobile product

---

## 6. Creative — "03 / CREATIVE"

Heading: Observations that became stories

Intro: The same habit that drives the product work — noticing something small
and following it — pointed at people instead of software. Video opens on
YouTube; nothing autoplays here.

### Observation 01
Question: Why do people wait for a call to end before sending a text?
Title: Why I Wait for the Call to End Before I Text
Body: A tiny everyday habit, followed until it becomes an observation about attention.
MEDIUM: PERSONAL VIDEO ESSAY
DEMONSTRATES: HUMAN OBSERVATION AND NARRATIVE STRUCTURE
Action: Watch

### Observation 02
Question: Why do builders ship for everyone except themselves?
Title: I ship apps for everyone except myself.
Body: A developer's confession about building products for everyone else while
putting your own on hold.
MEDIUM: DEVELOPER REFLECTION
DEMONSTRATES: PRODUCT REFLECTION AND TECHNICAL COMMUNICATION
Action: Watch

### Observation 03
Question: Can an alarm demand proof that you're actually awake?
Title: Stupid Alarm — building in public
Body: The build story behind the behavioural alarm experiment: the hypothesis,
the sensor problem, and what breaks.
MEDIUM: BUILD-IN-PUBLIC DEV SERIES
DEMONSTRATES: BUILDING IN PUBLIC AND PRODUCT IDEATION
Status: IN PRODUCTION

---

## 7. About — "04 / ABOUT"

Photo label: THE PERSON BEHIND THE EXPERIMENTS
Caption: Karachi → remote · Flutter by trade, storytelling by habit

Heading: Engineering gave structure to my creativity.

Body: I spent years experimenting with video, design, photography, and
storytelling before moving deeply into mobile development. Those interests were
never separate — they taught me how people notice, understand, and respond to
experiences. Today, I use that perspective to build mobile products that are
reliable, thoughtful, and easier to communicate.

Pull quote: I want to understand why something should exist — not only how it
should be built.

Link: Read the full story

---

## 8. Contact — "05 / CONTACT"

Heading: Building a mobile product or team?

Body: I'm open to remote mobile roles, startup teams, and selected
product-development opportunities where thoughtful execution and ownership matter.

Email: syeduzaifamin@gmail.com
Links: GITHUB ↗ · LINKEDIN ↗ · YOUTUBE ↗ · DOWNLOAD RÉSUMÉ ↗

Note: BASED IN KARACHI, OPEN TO REMOTE OPPORTUNITIES AND RELOCATION TO
ISLAMABAD OR RAWALPINDI.

---

## Footer

© 2026 SYED UZAIF / PRODUCT LAB — MOBILE PRODUCT ENGINEER
