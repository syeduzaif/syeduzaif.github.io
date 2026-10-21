import { Fragment } from "react";
import type { FlowStep } from "@/lib/types";
import { Eyebrow } from "./Eyebrow";

/**
 * A technical flow as a ruled strip of cells joined by plain arrows — the
 * same language as the write-path flow on the homepage. Semantic ordered
 * list (screen-reader friendly); the arrows are decorative. Left→right on
 * desktop, top→bottom on mobile. No client JS.
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
    <figure className="border border-rule bg-paper-soft p-5 md:p-7">
      {title && (
        <figcaption className="mb-5">
          <Eyebrow tone="accent">{title}</Eyebrow>
        </figcaption>
      )}
      <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <li className="flex flex-1 flex-col border border-ink/20 bg-paper px-4 py-3 md:min-w-[8.5rem]">
              <span className="text-sm font-medium text-ink">{step.label}</span>
              {step.detail && (
                <span className="mt-1 font-mono text-[0.66rem] leading-snug text-grey">
                  {step.detail}
                </span>
              )}
            </li>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="flex items-center justify-center self-center text-grey"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden px-1 md:inline">→</span>
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
