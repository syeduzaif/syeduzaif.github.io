/** The "Beyond writing code" ownership areas. */
export interface OwnershipArea {
  title: string;
  points: string[];
}

export const ownershipAreas: OwnershipArea[] = [
  {
    title: "Product ownership",
    points: [
      "Clarifying incomplete requirements",
      "Identifying edge cases",
      "Simplifying user flows",
      "Prioritising workable releases",
    ],
  },
  {
    title: "Engineering ownership",
    points: [
      "Architecture",
      "API integration",
      "Offline behaviour",
      "Performance",
      "Stability",
    ],
  },
  {
    title: "Delivery ownership",
    points: [
      "QA coordination",
      "Internal testing & TestFlight",
      "Play Store & App Store releases",
      "Production monitoring",
    ],
  },
  {
    title: "Communication ownership",
    points: [
      "Explaining trade-offs",
      "Coordinating with backend teams",
      "Documenting decisions",
      "Communicating delays and dependencies",
    ],
  },
];
