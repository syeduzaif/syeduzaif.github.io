/**
 * "How I think" — six connected stages with a deliberate loop back from Learn
 * to Notice. Every stage is grounded in a real example from the case studies;
 * nothing here is invented.
 */
export interface ProcessStage {
  id: string;
  label: string;
  question: string;
  /** A brief, real example grounded in shipped work. */
  example: string;
  /** Which project the example comes from. */
  project: string;
}

export const processStages: ProcessStage[] = [
  {
    id: "notice",
    label: "Notice",
    question:
      "What is frustrating, confusing, slow, repetitive, or unnecessarily difficult?",
    example:
      "Watching people silence an alarm without actually waking up became the seed for Stupid Alarm.",
    project: "Stupid Alarm",
  },
  {
    id: "question",
    label: "Question",
    question: "What is the real problem — and which part is worth solving first?",
    example:
      "For Budget Buddy, the real problem wasn't recording expenses — it was reducing the effort to keep recording them consistently.",
    project: "Budget Buddy",
  },
  {
    id: "shape",
    label: "Shape",
    question: "What should the user experience, understand, and do?",
    example:
      "On SimpliEd, that meant deciding what students, parents, and schools each needed to see first — and what could wait.",
    project: "SimpliEd",
  },
  {
    id: "build",
    label: "Build",
    question: "Which technical decisions make the product reliable and maintainable?",
    example:
      "On SimpliEd's Teacher app I made the local database the single source of truth, with a durable outbox that replays offline writes in order on reconnect — so a dropped connection never loses work.",
    project: "SimpliEd",
  },
  {
    id: "release",
    label: "Release",
    question: "What does it take to ship safely, on both stores, without breaking anyone?",
    example:
      "Coordinating Android and iOS releases through TestFlight and Play Internal Testing — including 28+ on-device schema migrations shipped with zero data loss.",
    project: "SimpliEd",
  },
  {
    id: "learn",
    label: "Learn",
    question: "What actually happened in production — and what should change next?",
    example:
      "Profiling SimpliEd's startup with Flutter DevTools cut initial load from 3.2s to 1.76s — and pointed at what to optimise next.",
    project: "SimpliEd",
  },
];

/** The honest caveat drawn on the diagram itself. */
export const processLoopNote =
  "It rarely runs in a straight line — what production teaches loops straight back into what I notice next.";
