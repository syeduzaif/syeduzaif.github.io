import type { CaseStudy } from "@/data/caseStudies";
import type { SpecRow } from "@/components/ui/SpecTable";

/**
 * The three-beat inquiry as spec rows. Shared by the homepage entries and the
 * /work index so both read the same way — and so the beats stay in one order.
 */
export function inquiryRows(inquiry: CaseStudy["inquiry"]): SpecRow[] {
  return [
    { label: "Observation", value: inquiry.observation },
    { label: "Question", value: inquiry.question },
    { label: "Response", value: inquiry.response },
  ];
}

/** Header facts for a case study — only the fields that exist are rendered. */
export function factRows(cs: CaseStudy): SpecRow[] {
  const rows: SpecRow[] = [];
  if (cs.role) rows.push({ label: "Role", value: cs.role });
  if (cs.timeframe) rows.push({ label: "Timeline", value: cs.timeframe });
  if (cs.platforms)
    rows.push({ label: "Platforms", value: cs.platforms.join(" · ") });
  rows.push({
    label: "Key result",
    value: `${cs.keyMetric.value} — ${cs.keyMetric.label}`,
  });
  return rows;
}
