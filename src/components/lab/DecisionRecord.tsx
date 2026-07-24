import type { Decision } from "@/lib/types";
import { EditorialLabel } from "./EditorialLabel";
import { Glyph, type GlyphKind } from "./Glyph";

function Row({
  k,
  glyph,
  children,
}: {
  k: string;
  glyph?: GlyphKind;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <dt className="flex w-[4.6rem] shrink-0 items-start gap-1.5 pt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-grey">
        {glyph && <Glyph kind={glyph} size={11} className="mt-px" />}
        {k}
      </dt>
      <dd className="text-sm leading-relaxed text-grey">{children}</dd>
    </div>
  );
}

/**
 * A decision told as a lab record — the call, why, what was rejected, the
 * trade-off, and the outcome. The rejected/outcome rows carry the ✕ / ★
 * symbols from the site's legend.
 */
export function DecisionRecord({
  n,
  decision,
}: {
  n: string;
  decision: Decision;
}) {
  return (
    <article className="border border-ink/15 bg-paper-soft p-5 shadow-[3px_4px_0_rgb(23_23_23/0.08)]">
      <header className="flex items-center gap-2">
        <Glyph kind="decision" className="text-(--accent-ink)" />
        <EditorialLabel className="text-(--accent-ink)">
          Decision {n}
        </EditorialLabel>
      </header>
      <p className="mt-3 font-serif text-xl leading-snug text-ink">
        {decision.decision}
      </p>
      <dl className="mt-4 space-y-3 border-t border-ink/10 pt-4">
        {decision.why && <Row k="Why">{decision.why}</Row>}
        {decision.rejected && (
          <Row k="Rejected" glyph="rejected">
            {decision.rejected}
          </Row>
        )}
        <Row k="Trade-off">{decision.tradeoff}</Row>
        {decision.outcome && (
          <Row k="Outcome" glyph="result">
            {decision.outcome}
          </Row>
        )}
      </dl>
    </article>
  );
}
