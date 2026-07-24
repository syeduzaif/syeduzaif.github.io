import { Fragment } from "react";
import type { FlowStep } from "@/lib/types";
import { Glyph } from "@/components/lab/Glyph";
import { HandDrawnArrow } from "@/components/lab/HandDrawnArrow";

/**
 * A technical flow on working-grid paper — ordered steps joined by hand-drawn
 * arrows. Semantic ordered list (screen-reader friendly); arrows are
 * decorative. Left→right on desktop, top→bottom on mobile. No client JS.
 */
export function ArchitectureDiagram({
  title,
  steps,
  note,
}: {
  title?: string;
  steps: FlowStep[];
  note?: string;
}) {
  return (
    <figure className="grid-paper border border-ink/15 bg-paper-soft p-5 md:p-7">
      {title && (
        <figcaption className="mb-5 flex items-center gap-2">
          <Glyph kind="progression" className="text-(--accent-ink)" />
          <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink">
            {title}
          </span>
        </figcaption>
      )}
      <ol className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <li className="flex flex-1 flex-col border border-ink/20 bg-paper px-4 py-3 shadow-[2px_3px_0_rgb(23_23_23/0.07)] md:min-w-[8.5rem]">
              <span className="text-sm font-medium text-ink">{step.label}</span>
              {step.detail && (
                <span className="mt-1 font-mono text-[0.68rem] leading-snug text-grey">
                  {step.detail}
                </span>
              )}
            </li>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="flex items-center justify-center self-center text-(--accent-ink)"
              >
                <HandDrawnArrow variant="down" className="h-7 w-4 md:hidden" />
                <HandDrawnArrow
                  variant="right"
                  className="hidden h-4 w-8 md:block"
                />
              </span>
            )}
          </Fragment>
        ))}
      </ol>
      {note && (
        <p
          className="mt-5 border-l-2 pl-4 text-sm text-grey"
          style={{ borderColor: "var(--accent)" }}
        >
          {note}
        </p>
      )}
    </figure>
  );
}
