"use client";

import { Fragment, useRef, useState } from "react";
import type { ProcessStage } from "@/data/process";
import { HandDrawnArrow } from "./HandDrawnArrow";
import { Annotation } from "./Annotation";
import { cn } from "@/lib/utils";

/**
 * "How I think" as a connected, non-linear sequence. Proper tabs semantics:
 * arrow keys move between stages, each stage reveals a real example from
 * shipped work. The loop-back arrow makes the revision cycle explicit.
 * All panel content is server-rendered into the DOM (hidden attr), so the
 * information survives without JavaScript and stays indexable.
 */
export function ProcessFlow({
  stages,
  loopNote,
}: {
  stages: ProcessStage[];
  loopNote: string;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + stages.length) % stages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusTab(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusTab(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(stages.length - 1);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="How I think — stages"
        className="flex flex-wrap items-center gap-y-3"
      >
        {stages.map((s, i) => (
          <Fragment key={s.id}>
            <button
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`stage-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`stage-panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex items-center gap-2 border px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
                i === active
                  ? "border-ink bg-ink text-paper-soft"
                  : "border-ink/25 text-ink hover:border-ink",
              )}
            >
              <span
                aria-hidden
                className={i === active ? "text-yellow" : "text-grey"}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
            </button>
            {i < stages.length - 1 && (
              <HandDrawnArrow
                variant="right"
                className="mx-1.5 hidden h-3.5 w-7 text-grey sm:block"
              />
            )}
          </Fragment>
        ))}
        <span
          aria-hidden
          className="ml-3 hidden items-center gap-1.5 text-orange-deep lg:flex"
        >
          <HandDrawnArrow variant="loop" className="h-8 w-14" />
          <Annotation className="text-[0.95rem] text-orange-deep">
            and back again
          </Annotation>
        </span>
      </div>

      {stages.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`stage-panel-${s.id}`}
          aria-labelledby={`stage-tab-${s.id}`}
          hidden={i !== active}
          className="mt-8 border-l-2 border-ink pl-5 md:pl-7"
        >
          <p
            className="font-display text-[1.35rem] leading-snug text-ink"
            style={{ maxWidth: "var(--width-reading)" }}
          >
            {s.question}
          </p>
          <div className="mt-4 max-w-[34rem] border border-ink/15 bg-paper-soft p-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-grey">
              From {s.project}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-grey">
              {s.example}
            </p>
          </div>
        </div>
      ))}

      <p className="mt-8">
        <Annotation>{loopNote}</Annotation>
      </p>
    </div>
  );
}
