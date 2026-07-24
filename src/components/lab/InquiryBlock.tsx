import { Glyph, type GlyphKind } from "./Glyph";

function Beat({
  glyph,
  label,
  children,
}: {
  glyph: GlyphKind;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 text-(--accent-ink)">
        <Glyph kind={glyph} />
      </span>
      <div>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-grey">
          {label}
        </span>
        <p className="mt-0.5 text-sm leading-relaxed text-ink/85">{children}</p>
      </div>
    </div>
  );
}

/**
 * The project's thinking in three beats: observation → question → response.
 * The observation is always visible; on pointer-fine devices the question and
 * response unfold on hover/focus-within (see `.inquiry` in globals.css). Touch
 * and no-hover contexts see everything expanded — nothing is hover-only, and
 * the content is always in the DOM.
 */
export function InquiryBlock({
  inquiry,
  cta,
}: {
  inquiry: { observation: string; question: string; response: string };
  cta?: React.ReactNode;
}) {
  return (
    <div className="inquiry border border-ink/15 bg-paper-soft p-4">
      <div className="flex items-start justify-between gap-3">
        <Beat glyph="observation" label="Observation">
          {inquiry.observation}
        </Beat>
        <span
          aria-hidden
          className="inquiry-hint shrink-0 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-grey/70"
        >
          Unfolds on hover
        </span>
      </div>
      <div className="inquiry-more">
        <div>
          <div className="mt-3.5 space-y-3.5 border-t border-dashed border-ink/15 pt-3.5">
            <Beat glyph="unresolved" label="Question">
              {inquiry.question}
            </Beat>
            <Beat glyph="decision" label="Response">
              {inquiry.response}
            </Beat>
          </div>
        </div>
      </div>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}
