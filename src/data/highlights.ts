import type { EvidenceFact } from "@/lib/types";

/**
 * Evidence strip — only defensible facts from real production work, presented
 * as annotated margin notes rather than four identical stat cards. The `note`
 * carries the honesty boundary (e.g. downloads are a team/product outcome).
 */
export const credibilityFacts: EvidenceFact[] = [
  {
    value: "10,000+",
    label: "cumulative downloads",
    note: "team/product outcome — I build & ship the mobile layer",
  },
  {
    value: "3.2s → 1.76s",
    label: "initial load",
    note: "profiled first, then restructured",
  },
  {
    value: "Android / iOS",
    label: "production releases",
    note: "TestFlight · Play Internal Testing",
  },
  {
    value: "build → test → release",
    label: "end-to-end contribution",
    note: "code to store, both platforms",
  },
];
