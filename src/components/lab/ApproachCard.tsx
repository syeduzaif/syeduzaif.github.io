import type { ProjectOption } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Verdict tones. `chosen`/`exploring` use the -deep variants because the base
 * green and orange fail AA on paper at this size.
 */
const verdictStyle: Record<ProjectOption["verdict"], { label: string; className: string }> = {
  chosen: { label: "chosen", className: "text-green-deep" },
  rejected: { label: "rejected", className: "text-grey" },
  exploring: { label: "exploring", className: "text-orange-deep" },
};

/** An approach that was weighed — rejected ideas shown, not hidden. */
export function ApproachCard({ option }: { option: ProjectOption }) {
  const v = verdictStyle[option.verdict];

  return (
    <div className="border border-rule bg-paper-soft p-4">
      <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-2.5">
        <span className="font-medium text-ink">{option.approach}</span>
        <span
          className={cn(
            "shrink-0 font-mono text-[0.58rem] font-semibold tracking-[0.14em] uppercase",
            v.className,
          )}
        >
          {v.label}
        </span>
      </div>
      {option.note && (
        <p className="mt-2.5 text-sm leading-relaxed text-grey">{option.note}</p>
      )}
    </div>
  );
}
