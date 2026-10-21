"use client";

import { useRef, useState } from "react";
import { Undo2 } from "lucide-react";
import type { ProcessStage } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * "How I think" as a connected, non-linear sequence, rendered on the night
 * band. Proper tabs semantics: arrow keys move between stages, each stage
 * reveals a real example from shipped work. All panel content is
 * server-rendered into the DOM (hidden attr), so the information survives
 * without JavaScript and stays indexable.
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
      <div className="flex flex-wrap items-stretch gap-2">
        <div
          role="tablist"
          aria-label="How I think — stages"
          className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {stages.map((s, i) => (
            <button
              key={s.id}
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
                "flex flex-col items-start gap-5 px-4 py-3.5 text-left transition-colors",
                i === active
                  ? "bg-yellow text-ink"
                  : "bg-night-2 text-on-night hover:bg-[#282930]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "font-mono text-[0.6rem] tracking-[0.14em]",
                  i === active ? "text-ink/70" : "text-on-night-2",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.05rem] font-semibold tracking-tight uppercase">
                {s.label}
              </span>
            </button>
          ))}
        </div>
        <p
          aria-hidden
          className="hidden shrink-0 flex-col justify-center gap-1 pl-3 text-yellow lg:flex"
        >
          <Undo2 size={18} />
          <span className="font-display text-[0.95rem] italic text-on-night-2">
            and back again
          </span>
        </p>
      </div>

      {stages.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`stage-panel-${s.id}`}
          aria-labelledby={`stage-tab-${s.id}`}
          hidden={i !== active}
          className="mt-12 border-t border-[#F1F1EC1F] pt-10"
        >
          <div className="gap-12 md:grid md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-on-night-2 uppercase">
                {String(i + 1).padStart(2, "0")} {s.label} — Question
              </p>
              <p className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight font-medium [font-stretch:92%] text-on-night text-balance">
                {s.question}
              </p>
            </div>
            <div className="mt-8 border-l-2 border-yellow pl-5 md:mt-0">
              <p className="font-mono text-[0.6rem] font-medium tracking-[0.16em] text-yellow uppercase">
                From {s.project}
              </p>
              <p className="mt-3 leading-relaxed text-on-night">{s.example}</p>
            </div>
          </div>

          <p className="mt-12 max-w-[60ch] text-[0.92rem] text-on-night-2">
            {loopNote}
          </p>
        </div>
      ))}
    </div>
  );
}
