import type { Metric } from "@/lib/types";

/**
 * Credibility strip — only defensible facts, drawn from real production work.
 * No skill percentages (per positioning guidance).
 */
export const credibilityFacts: Metric[] = [
  { value: "10K+", label: "Cumulative downloads" },
  { value: "2 platforms", label: "Android and iOS releases" },
  { value: "~45% faster", label: "Initial load: 3.2s → 1.76s" },
  { value: "End-to-end", label: "Build, QA & release ownership" },
];

/** "What I'm working toward" — ambition without inventing job titles. */
export const currentDirection: string[] = [
  "Building stronger product case studies",
  "Deepening offline-first architecture",
  "Improving testing and delivery systems",
  "Building independent mobile products",
  "Sharing product and creative experiments",
  "Growing toward product ownership and leadership",
];
