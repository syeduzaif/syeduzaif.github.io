import type { Decision } from "@/lib/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecTable, type SpecRow } from "@/components/ui/SpecTable";

/**
 * A decision as a record: the call itself in display type, then why, what was
 * rejected, the trade-off it carried, and what it produced — as spec rows.
 */
export function DecisionRecord({
  n,
  decision,
}: {
  n: string;
  decision: Decision;
}) {
  const rows: SpecRow[] = [];
  if (decision.why) rows.push({ label: "Why", value: decision.why });
  if (decision.rejected)
    rows.push({ label: "Rejected", value: decision.rejected });
  rows.push({ label: "Trade-off", value: decision.tradeoff });
  if (decision.outcome)
    rows.push({ label: "Outcome", value: decision.outcome });

  return (
    <article className="border border-rule bg-paper-soft p-5">
      <Eyebrow tone="accent">Decision {n}</Eyebrow>
      <p className="mt-3 font-display text-[1.2rem] leading-snug font-semibold [font-stretch:94%] text-ink text-balance">
        {decision.decision}
      </p>
      <SpecTable className="mt-5" labelWidth="5.25rem" rows={rows} />
    </article>
  );
}
