/**
 * Ownership as an honest, three-tier hierarchy — what I own now, what I regularly
 * contribute to, and what I'm growing toward. Ambitious but evidence-based: every
 * item is supported by the case studies and résumé. Rendered as a compact strip
 * on the homepage (the old standalone "Beyond writing code" grid + the separate
 * "What I'm working toward" section are folded into this).
 */
export interface OwnershipTier {
  title: string;
  note: string;
  points: string[];
}

export const ownershipTiers: OwnershipTier[] = [
  {
    title: "I currently own",
    note: "Day-to-day responsibility",
    points: [
      "Flutter implementation",
      "Mobile architecture",
      "Offline behaviour",
      "Performance investigations",
      "Release execution",
    ],
  },
  {
    title: "I regularly contribute to",
    note: "Alongside the team",
    points: [
      "Requirement clarification",
      "API coordination",
      "QA coordination",
      "User-flow improvements",
      "Production debugging",
    ],
  },
  {
    title: "I'm growing toward",
    note: "Deliberately, next",
    points: [
      "Product prioritisation",
      "Roadmap decisions",
      "Business outcomes",
      "Mentoring",
      "Team leadership",
    ],
  },
];
