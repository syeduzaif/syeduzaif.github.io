/** The five-stage approach shown in the "How I approach products" section. */
export interface ProcessStage {
  number: string;
  name: string;
  question: string;
  /** A brief, real example grounded in shipped work. */
  example: string;
}

export const processStages: ProcessStage[] = [
  {
    number: "01",
    name: "Observe",
    question:
      "What is frustrating, confusing, slow, repetitive, or unnecessarily difficult?",
    example:
      "Watching people silence an alarm without actually waking up became the seed for Stupid Alarm.",
  },
  {
    number: "02",
    name: "Define",
    question: "What is the real problem, and which part is worth solving first?",
    example:
      "For Budget Buddy, the real problem wasn't recording expenses — it was reducing the effort to remember and categorise them consistently.",
  },
  {
    number: "03",
    name: "Shape",
    question: "What should the user experience, understand, and do?",
    example:
      "On SimpliEd, that meant deciding what students, parents, and schools each needed to see first — and what could wait.",
  },
  {
    number: "04",
    name: "Build",
    question:
      "Which technical decisions make the product reliable and maintainable?",
    example:
      "On SimpliEd's Teacher app I made the local database the single source of truth, with a durable outbox that queues writes offline and replays them in order on reconnect — so users never lose work through a dropped connection.",
  },
  {
    number: "05",
    name: "Ship & learn",
    question: "What happens in production, and what should change next?",
    example:
      "Profiling SimpliEd's startup with Flutter DevTools cut initial load from 3.2s to 1.76s — and pointed at what to optimise next.",
  },
];
